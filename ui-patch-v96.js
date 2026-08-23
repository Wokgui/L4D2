(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    html body .campaign-add-modal{
      position:fixed!important;inset:0!important;z-index:10000!important;
      display:grid!important;place-items:center!important;
      padding:18px!important;background:rgba(37,38,31,.38)!important;
      backdrop-filter:blur(2px)!important;-webkit-backdrop-filter:blur(2px)!important;
    }
    html body .campaign-add-panel{
      width:min(430px,100%)!important;max-height:min(760px,calc(100dvh - 36px))!important;
      overflow:auto!important;box-sizing:border-box!important;
      padding:18px!important;border:1px solid var(--l)!important;border-radius:18px!important;
      background:var(--p)!important;color:var(--i)!important;
      box-shadow:0 18px 48px rgba(37,38,31,.18)!important;
    }
    html body .campaign-add-head{
      position:relative!important;display:flex!important;align-items:center!important;justify-content:center!important;
      min-height:36px!important;margin-bottom:14px!important;
    }
    html body .campaign-add-head strong{
      display:block!important;width:100%!important;padding:0 42px!important;text-align:center!important;
      font-size:20px!important;line-height:1.1!important;
    }
    html body .campaign-add-close{
      position:absolute!important;right:0!important;top:50%!important;transform:translateY(-50%)!important;
      width:34px!important;height:34px!important;padding:0!important;border:0!important;border-radius:50%!important;
      background:var(--p2)!important;color:var(--i)!important;font-size:23px!important;line-height:1!important;
    }
    html body .campaign-add-form{display:grid!important;gap:11px!important}
    html body .campaign-add-form label{display:grid!important;gap:5px!important;font-size:11px!important;font-weight:900!important;text-transform:uppercase!important;letter-spacing:.04em!important;color:var(--m)!important}
    html body .campaign-add-form input,
    html body .campaign-add-form select,
    html body .campaign-add-form textarea{
      width:100%!important;min-height:43px!important;box-sizing:border-box!important;
      border:1px solid var(--l)!important;border-radius:11px!important;
      background:#fff!important;color:var(--i)!important;padding:10px 11px!important;
      font:inherit!important;text-transform:none!important;letter-spacing:normal!important;font-weight:700!important;outline:none!important;
    }
    html body .campaign-add-form textarea{min-height:82px!important;resize:vertical!important}
    html body .campaign-add-form input:focus,
    html body .campaign-add-form select:focus,
    html body .campaign-add-form textarea:focus{border-color:var(--g)!important;box-shadow:0 0 0 2px rgba(47,121,109,.12)!important}
    html body .campaign-add-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important}
    html body .campaign-add-actions{display:grid!important;grid-template-columns:1fr 1.35fr!important;gap:8px!important;margin-top:3px!important}
    html body .campaign-add-actions button{min-height:43px!important;border:0!important;border-radius:11px!important;font-weight:900!important}
    html body .campaign-add-cancel{background:var(--p2)!important;color:var(--i)!important}
    html body .campaign-add-submit{background:var(--g)!important;color:#fff!important}
    @media(max-width:520px){
      html body .campaign-add-modal{padding:12px!important}
      html body .campaign-add-panel{padding:15px!important;border-radius:16px!important}
      html body .campaign-add-grid{grid-template-columns:1fr!important;gap:10px!important}
    }

    /* Logo Steam + badge vert réellement superposé au coin inférieur droit. */
    html body .draw .title .steam-chat-top{
      position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;
      width:var(--steam-chat-v96-size,44px)!important;height:var(--steam-chat-v96-size,44px)!important;
      min-width:var(--steam-chat-v96-size,44px)!important;min-height:var(--steam-chat-v96-size,44px)!important;
      max-width:var(--steam-chat-v96-size,44px)!important;max-height:var(--steam-chat-v96-size,44px)!important;
      padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;
      box-shadow:none!important;overflow:visible!important;z-index:9!important;text-decoration:none!important;
      transition:none!important;animation:none!important;-webkit-tap-highlight-color:transparent!important;
    }
    html body .draw .title .steam-chat-top .steam-chat-glyph{
      position:relative!important;display:block!important;width:100%!important;height:100%!important;overflow:visible!important;
    }
    html body .draw .title .steam-chat-top .steam-chat-glyph>img{
      position:absolute!important;inset:0!important;display:block!important;
      width:100%!important;height:100%!important;min-width:100%!important;min-height:100%!important;max-width:100%!important;max-height:100%!important;
      margin:0!important;padding:0!important;transform:none!important;object-fit:contain!important;border:0!important;border-radius:50%!important;
      background:transparent!important;box-shadow:none!important;transition:none!important;animation:none!important;
    }
    html body .draw .title .steam-chat-top .steam-chat-corner-badge{
      position:absolute!important;right:4px!important;bottom:4px!important;z-index:3!important;
      width:16px!important;height:16px!important;box-sizing:border-box!important;padding:0!important;
      display:block!important;border-radius:50%!important;
      background:var(--g)!important;border:1.5px solid var(--b)!important;box-shadow:none!important;pointer-events:none!important;
    }
    html body .draw .title .steam-chat-top .steam-chat-corner-badge svg{
      position:absolute!important;left:50%!important;top:50%!important;
      transform:translate(-50%,-50%)!important;
      display:block!important;width:11px!important;height:11px!important;overflow:visible!important;
    }
    html body .draw .title .steam-chat-top:hover,
    html body .draw .title .steam-chat-top:focus,
    html body .draw .title .steam-chat-top:active{
      transform:translate(-50%,-50%)!important;background:transparent!important;border:0!important;box-shadow:none!important;outline:0!important;
    }
  `;
  document.head.appendChild(style);

  function mapOptions(){
    const values=[];
    if(Array.isArray(C))C.forEach(c=>{const n=parseInt(c.maps,10);if(Number.isFinite(n)&&n>0)values.push(n)});
    if(Array.isArray(A))A.forEach(c=>{const n=parseInt(c.maps,10);if(Number.isFinite(n)&&n>0)values.push(n)});
    const max=Math.max(10,...values);
    let html='<option value="">Non renseigné</option>';
    for(let n=1;n<=max;n++)html+=`<option value="${n}">${n} carte${n>1?'s':''}</option>`;
    return html;
  }

  function openAddCampaign(){
    document.querySelector('.campaign-add-modal')?.remove();
    const modal=document.createElement('div');
    modal.className='campaign-add-modal';
    modal.innerHTML=`<div class="campaign-add-panel" role="dialog" aria-modal="true" aria-label="Ajouter une campagne">
      <div class="campaign-add-head"><strong>Ajouter une campagne</strong><button type="button" class="campaign-add-close" aria-label="Fermer">×</button></div>
      <form class="campaign-add-form">
        <label>Nom de la campagne<input class="campaign-add-name" required autocomplete="off" placeholder="Nom"></label>
        <div class="campaign-add-grid">
          <label>Catégorie<select class="campaign-add-category"><option>Oui</option><option>Pourquoi pas</option><option>Bof</option><option>Non</option></select></label>
          <label>Nombre de cartes<select class="campaign-add-maps">${mapOptions()}</select></label>
          <label>Difficulté<select class="campaign-add-difficulty"><option value="facile">Facile</option><option value="moyen" selected>Moyen</option><option value="difficile">Difficile</option></select></label>
        </div>
        <label>Notes personnelles<textarea class="campaign-add-notes" placeholder="Facultatif"></textarea></label>
        <label>Lien Workshop Steam<input class="campaign-add-workshop" inputmode="url" autocomplete="off" placeholder="Facultatif"></label>
        <div class="campaign-add-actions"><button type="button" class="campaign-add-cancel">Annuler</button><button type="submit" class="campaign-add-submit">Ajouter</button></div>
      </form>
    </div>`;
    document.body.appendChild(modal);

    const close=()=>{
      document.removeEventListener('keydown',esc);
      modal.remove();
    };
    const esc=e=>{if(e.key==='Escape')close()};
    modal.querySelector('.campaign-add-close').onclick=close;
    modal.querySelector('.campaign-add-cancel').onclick=close;
    modal.onclick=e=>{if(e.target===modal)close()};
    document.addEventListener('keydown',esc);

    const form=modal.querySelector('.campaign-add-form');
    form.onsubmit=e=>{
      e.preventDefault();
      const name=form.querySelector('.campaign-add-name').value.trim();
      if(!name)return;
      const category=form.querySelector('.campaign-add-category').value;
      const mapsRaw=form.querySelector('.campaign-add-maps').value;
      const maps=mapsRaw?parseInt(mapsRaw,10):null;
      const difficulty=form.querySelector('.campaign-add-difficulty').value;
      const notes=form.querySelector('.campaign-add-notes').value.trim();
      const workshopUrl=form.querySelector('.campaign-add-workshop').value.trim();
      const base={name,maps,difficulty,workshopUrl,notes,excelRemark:notes,photo:''};
      if(category==='Oui')C.push({...base,id:'x'+Date.now(),category});
      else A.push({name,remark:notes,category,excelRow:Date.now(),workshopUrl,maps,difficulty});
      save();
      if(typeof kept==='function')kept();
      if(typeof cats==='function')cats();
      if(typeof others==='function')others();
      close();
    };
    requestAnimationFrame(()=>modal.querySelector('.campaign-add-name')?.focus());
  }

  function installAddForm(){
    const add=document.getElementById('add');
    if(add)add.onclick=openAddCampaign;
  }

  function syncSteamSize(){
    const title=document.querySelector('.draw .title');
    if(!title)return;
    const campaignSteam=document.querySelector('#res .result-card .rhead .wk img')||document.querySelector('#res .result-card .rhead .wk');
    let size=44;
    if(campaignSteam){
      const r=campaignSteam.getBoundingClientRect();
      const measured=Math.round(Math.min(r.width||0,r.height||r.width||0));
      if(measured>0)size=measured;
    }
    title.style.setProperty('--steam-chat-v96-size',size+'px');
  }

  function fixSteamChat(){
    const title=document.querySelector('.draw .title');
    if(!title)return;
    let link=title.querySelector('.steam-chat-top');
    if(!link){
      link=document.createElement('a');
      link.className='steam-chat-top';
      title.appendChild(link);
    }
    link.href='https://steamcommunity.com/chat/';
    link.target='_blank';
    link.rel='noopener';
    link.title='Chat Steam';
    link.setAttribute('aria-label','Ouvrir le Chat Steam');
    link.innerHTML='<span class="steam-chat-glyph"><img src="/steam-icon.png" alt=""><span class="steam-chat-corner-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="#fff" d="M5.5 5.5h13v9h-7l-3.5 3v-3H5.5z"/><path d="M9 8.6h6M9 11.3h6M9 14h4" fill="none" stroke="#2f796d" stroke-width="1.8" stroke-linecap="round"/></svg></span></span>';
    syncSteamSize();
  }

  function apply(){installAddForm();fixSteamChat();syncSteamSize()}
  apply();
  requestAnimationFrame(apply);

  const res=document.getElementById('res');
  if(res){
    let queued=false;
    new MutationObserver(()=>{
      if(queued)return;
      queued=true;
      requestAnimationFrame(()=>{queued=false;fixSteamChat();syncSteamSize()});
    }).observe(res,{childList:true,subtree:true});
  }
  window.addEventListener('resize',syncSteamSize,{passive:true});
})();
