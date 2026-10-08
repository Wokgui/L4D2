(function () {
  'use strict';

  const SUPABASE_URL = 'https://oxdrhwveuctrorrkuurw.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZHJod3ZldWN0cm9ycmt1dXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2MjYzNDQsImV4cCI6MjEwMTIwMjM0NH0.lrdF-JILpgAwSrMLVjeU0fcKd2anOhp_T0qtEtJTVc0';

  function create(options) {
    if (!window.supabase?.createClient) return;
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: true, detectSessionInUrl: true, autoRefreshToken: true }
    });
    let user = null;
    let busy = false;
    let applying = false;
    let timer = null;
    let syncPromise = null;
    let lastSyncAt = 0;

    const style = document.createElement('style');
    style.textContent = '.cloud-backup-button{position:fixed;right:14px;bottom:calc(56px + env(safe-area-inset-bottom));z-index:9998;border:0;border-radius:999px;padding:11px 16px;background:#173b32;color:#fff;font:700 14px system-ui;box-shadow:0 6px 22px #0004}.cloud-backup-panel{position:fixed;inset:0;z-index:9999;background:#0008;display:grid;place-items:center;padding:16px}.cloud-backup-card{width:min(520px,100%);max-height:88vh;overflow:auto;background:#fff;color:#17221f;border-radius:18px;padding:20px;font:15px/1.4 system-ui;box-shadow:0 20px 60px #0008}.cloud-backup-card h2{margin:0 0 8px}.cloud-backup-card input,.cloud-backup-card button,.cloud-backup-card select{box-sizing:border-box;width:100%;margin-top:9px;padding:11px;border:1px solid #bcc9c5;border-radius:10px;font:inherit}.cloud-backup-card button{background:#173b32;color:#fff;font-weight:700}.cloud-backup-card button.secondary{background:#eef3f1;color:#173b32}.cloud-backup-close{float:right;width:auto!important;margin:0!important;padding:5px 9px!important}.cloud-backup-status{padding:9px 0;color:#36544b}.cloud-backup-note{font-size:13px;color:#52655f}.cloud-backup-history{margin:10px 0 0;padding:0;list-style:none}.cloud-backup-history li{display:flex;gap:8px;align-items:center;justify-content:space-between;border-top:1px solid #e2e8e6;padding:8px 0}.cloud-backup-history-actions{display:flex;align-items:center;justify-content:flex-end;gap:6px;flex-wrap:wrap}.cloud-backup-history button{width:auto;margin:0;padding:7px 9px}.cloud-backup-history small{color:#65736f}.cloud-backup-hidden{display:none!important}';
    document.head.appendChild(style);

    let button = options.triggerElement || (options.triggerSelector && document.querySelector(options.triggerSelector));
    if (button && options.replaceTrigger) {
      const replacement = button.cloneNode(true);
      button.replaceWith(replacement);
      button = replacement;
    }
    if (!button) {
      button = document.createElement('button');
      button.className = 'cloud-backup-button';
      button.textContent = '☁ Sauvegarde';
      button.type = 'button';
      document.body.appendChild(button);
    }
    if (options.triggerAriaLabel) button.setAttribute('aria-label', options.triggerAriaLabel);

    const panel = document.createElement('div');
    panel.className = 'cloud-backup-panel cloud-backup-hidden';
    panel.innerHTML = '<div class="cloud-backup-card"><button class="cloud-backup-close secondary" type="button" aria-label="Fermer">✕</button><h2>Sauvegardes automatiques</h2><div class="cloud-backup-status">Vérification…</div><div class="cloud-backup-auth"><p>Utilisez la même adresse et le même mot de passe dans les trois applications. Cette connexion n’est à faire qu’une fois par appareil.</p><input class="cloud-backup-email" type="email" inputmode="email" autocomplete="email" placeholder="votre@email.fr"><input class="cloud-backup-password" type="password" autocomplete="current-password" minlength="6" placeholder="Mot de passe (6 caractères minimum)"><button class="cloud-backup-login" type="button">Se connecter</button><button class="cloud-backup-signup secondary" type="button">Créer mon accès de sauvegarde</button></div><div class="cloud-backup-tools cloud-backup-hidden"><button class="cloud-backup-now" type="button">Sauvegarder maintenant</button><button class="cloud-backup-download secondary" type="button">Exporter</button><h3>5 dernières versions Google Drive</h3><div class="cloud-backup-drive-status">Vérification Google Drive…</div><ul class="cloud-backup-history"></ul><button class="cloud-backup-logout secondary" type="button">Déconnecter cet appareil</button></div><p class="cloud-backup-note">Google Drive conserve la dernière sauvegarde et les quatre précédentes. L’export contient tes données actuelles, même hors connexion.</p></div>';
    document.body.appendChild(panel);

    const $ = selector => panel.querySelector(selector);
    const status = message => { $('.cloud-backup-status').textContent = message; options.onStatus?.(message); };
    const migratedKey = uid => `cloud_backup_migrated_${options.appId}_${uid}`;
    const revisionKey = uid => `cloud_backup_revision_${options.appId}_${uid}`;
    const releaseKey = uid => `cloud_backup_release_${options.appId}_${options.release?.version || 'legacy'}_${uid}`;
    const envelopeFormat = 'wokgui-complete-backup-v2';
    const storedPayload = () => ({ format: envelopeFormat, appId: options.appId, release: { ...(options.release || {}) }, data: options.getPayload() });
    const applicationPayload = payload => payload?.format === envelopeFormat && payload.appId === options.appId ? payload.data : payload;
    const payloadRelease = payload => payload?.format === envelopeFormat && payload.appId === options.appId ? payload.release : null;

    const downloadJson = (content, filename) => {
      const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    };

    async function currentMeta() {
      const { data, error } = await client.from('user_app_backup_current').select('revision,updated_at').eq('user_id', user.id).eq('app_id', options.appId).maybeSingle();
      if (error) throw error;
      return data;
    }

    async function currentFull() {
      const { data, error } = await client.from('user_app_backup_current').select('payload,revision,updated_at,source').eq('user_id', user.id).eq('app_id', options.appId).maybeSingle();
      if (error) throw error;
      return data;
    }

    async function historyPayload(revision) {
      const { data, error } = await client.from('user_app_backup_history').select('payload,revision,created_at,source').eq('user_id', user.id).eq('app_id', options.appId).eq('revision', revision).single();
      if (error) throw error;
      return data;
    }

    async function upload(source) {
      if (!user || busy || applying) return false;
      busy = true;
      try {
        status('Sauvegarde en cours…');
        const payload = storedPayload();
        const storedSource = source === 'phone-migration' ? 'phone-migration' : source === 'first-device' ? 'seed' : source.startsWith('restore') ? 'restore' : 'app';
        const { data, error } = await client.from('user_app_backup_current').upsert({ user_id: user.id, app_id: options.appId, payload, source: storedSource }, { onConflict: 'user_id,app_id' }).select('revision,updated_at').maybeSingle();
        if (error) throw error;
        const saved = data || await currentMeta();
        if (saved) localStorage.setItem(revisionKey(user.id), String(saved.revision));
        status(saved ? `Sauvegardé automatiquement — version ${saved.revision}` : 'Déjà à jour');
        if(saved)await mirrorDrive(payload,saved.revision);
        return true;
      } catch (error) {
        status(`Sauvegarde impossible : ${error.message}`);
        return false;
      } finally {
        busy = false;
      }
    }

    function scheduleUpload() {
      if (!user || applying) return;
      clearTimeout(timer);
      timer = setTimeout(() => upload('automatic'), 1400);
    }

    async function apply(payload, message) {
      applying = true;
      try { await options.applyPayload(applicationPayload(payload)); status(message); }
      finally { applying = false; }
    }

    async function initialSync() {
      const remote = await currentMeta();
      const migrated = localStorage.getItem(migratedKey(user.id)) === '1';
      if (!migrated) {
        if (options.localExisted) {
          await upload('phone-migration');
        } else if (remote) {
          const full = await currentFull();
          await apply(full.payload, `Version ${full.revision} restaurée sur cet appareil`);
          localStorage.setItem(revisionKey(user.id), String(full.revision));
        } else {
          await upload('first-device');
        }
        localStorage.setItem(migratedKey(user.id), '1');
      } else if (remote) {
        const localRevision = Number(localStorage.getItem(revisionKey(user.id)) || 0);
        if (remote.revision > localRevision) {
          const full = await currentFull();
          await apply(full.payload, `Version ${full.revision} récupérée automatiquement`);
          localStorage.setItem(revisionKey(user.id), String(full.revision));
        } else {
          status(`Sauvegarde active — version ${remote.revision}`);
        }
      } else {
        await upload('recovery');
      }
      if (options.release?.version && localStorage.getItem(releaseKey(user.id)) !== '1') {
        if (await upload('release')) localStorage.setItem(releaseKey(user.id), '1');
      }
      await loadHistory();
      const driveCurrent = await currentFull();
      if (driveCurrent) await mirrorDrive(driveCurrent.payload, driveCurrent.revision);
    }

    async function driveRequest(path='',body) {
      const {data}=await client.auth.getSession();
      const token=data.session?.access_token;
      if(!token)throw Error('Connexion nécessaire.');
      let encoded=body;
      if(body&&JSON.stringify(body).length>1000000){
        const compressed=await new Response(new Blob([JSON.stringify(body)]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer();
        const bytes=new Uint8Array(compressed);let binary='';
        for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));
        encoded={encoding:'gzip-base64',content:btoa(binary)};
      }
      const response=await fetch('/api/drive-backup'+path,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${token}`,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(encoded)}:{})});
      let result;try{result=await response.json();}catch{throw Error('Le transfert Google Drive a échoué ('+response.status+').');}
      if(result?.encoding==='gzip-base64'){
        const bytes=Uint8Array.from(atob(result.content),c=>c.charCodeAt(0));
        result=JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
      }
      if(!response.ok)throw Error(result.error||'Google Drive est indisponible.');
      return result;
    }

    function showDriveVersions(versions) {
      const list=$('.cloud-backup-history');list.replaceChildren();
      for(const item of versions||[]){
        const li=document.createElement('li'),label=document.createElement('span'),restore=document.createElement('button');
        label.textContent=`Version ${item.appProperties.revision} · ${new Date(item.modifiedTime).toLocaleString('fr-FR')}`;
        restore.type='button';restore.textContent='Restaurer';restore.dataset.driveId=item.id;
        li.append(label,restore);list.append(li);
      }
      if(!list.children.length){const li=document.createElement('li');li.textContent='Aucune version Google Drive pour le moment.';list.append(li);}
    }

    async function mirrorDrive(payload,revision) {
      try{
        const result=await driveRequest('',{payload:applicationPayload(payload),revision:Number(revision)});
        showDriveVersions(result.versions);
        $('.cloud-backup-drive-status').textContent='Sauvegarde Google Drive à jour.';
      }catch(error){
        $('.cloud-backup-drive-status').textContent=error.message+' Les données restent sauvegardées dans le cloud.';
      }
    }

    async function loadHistory() {
      if(!user)return;
      try{
        const result=await driveRequest();showDriveVersions(result.versions);
        $('.cloud-backup-drive-status').textContent=result.versions.length?'Dernière sauvegarde et quatre précédentes.':'Aucune sauvegarde Google Drive pour le moment.';
      }catch(error){
        showDriveVersions([]);$('.cloud-backup-drive-status').textContent=error.message;
      }
    }

    async function restoreDrive(id) {
      if(!confirm('Restaurer cette version Google Drive ?'))return;
      try{
        const result=await driveRequest('?id='+encodeURIComponent(id));
        await apply(result.payload,'Version Google Drive restaurée');
        await upload('restore-drive');
      }catch(error){status('Restauration impossible : '+error.message);}
    }

    async function setSession(session) {
      user = session?.user || null;
      $('.cloud-backup-auth').classList.toggle('cloud-backup-hidden', !!user);
      $('.cloud-backup-tools').classList.toggle('cloud-backup-hidden', !user);
      if (!user) {
        syncPromise = null;
        lastSyncAt = 0;
        return status('Connexion nécessaire pour activer la sauvegarde automatique.');
      }
      status(`Connecté : ${user.email}`);
      if (syncPromise) return syncPromise;
      if (Date.now() - lastSyncAt < 5000) return;
      syncPromise = (async () => {
        try {
          await initialSync();
          lastSyncAt = Date.now();
        } catch (error) {
          status(`Synchronisation impossible : ${error.message}`);
        } finally {
          syncPromise = null;
        }
      })();
      return syncPromise;
    }

    button.addEventListener('click', () => {
      panel.classList.remove('cloud-backup-hidden');
      if (user) loadHistory().catch(() => {});
    });
    $('.cloud-backup-close').addEventListener('click', () => panel.classList.add('cloud-backup-hidden'));
    panel.addEventListener('click', event => { if (event.target === panel) panel.classList.add('cloud-backup-hidden'); });

    function credentials() {
      const email = $('.cloud-backup-email').value.trim();
      const password = $('.cloud-backup-password').value;
      if (!email || password.length < 6) { status('Entrez votre e-mail et un mot de passe d’au moins 6 caractères.'); return null; }
      return { email, password };
    }

    $('.cloud-backup-login').addEventListener('click', async () => {
      const values = credentials(); if (!values) return;
      status('Connexion…');
      const { error } = await client.auth.signInWithPassword(values);
      status(error ? `Connexion impossible : ${error.message}` : 'Connexion réussie.');
    });
    $('.cloud-backup-signup').addEventListener('click', async () => {
      const values = credentials(); if (!values) return;
      status('Création de votre accès…');
      const { data, error } = await client.auth.signUp(values);
      if (error) return status(`Création impossible : ${error.message}`);
      status(data.session ? 'Accès créé et sauvegarde activée.' : 'Accès créé. Confirmez l’e-mail reçu, revenez ici, puis appuyez sur « Se connecter ».');
    });
    $('.cloud-backup-now').addEventListener('click', () => upload('manual'));
    $('.cloud-backup-download').addEventListener('click', () => document.getElementById('exp').click());
    $('.cloud-backup-logout').addEventListener('click', () => client.auth.signOut());
    $('.cloud-backup-history').addEventListener('click', event => {
      const id=event.target.closest('[data-drive-id]')?.dataset.driveId;
      if(id)restoreDrive(id);
    });
    window.addEventListener(options.eventName, scheduleUpload);
    client.auth.onAuthStateChange((_event, session) => setTimeout(() => setSession(session), 0));
    client.auth.getSession().then(({ data }) => setSession(data.session));
  }

  window.AutoBackupCloud = { create };
})();
