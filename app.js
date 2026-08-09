(() => {
  'use strict';
  const BASE = window.L4D2_DATA;
  const STORAGE = 'l4d2-archives-overrides-v1';
  const CUSTOM_STORAGE = 'l4d2-archives-custom-v1';
  const cats = ['OUI','POURQUOI PAS','BOF','NON'];
  const colors = {'OUI':'var(--acid)','BIEN AUSSI':'var(--green)','POURQUOI PAS':'var(--gold)','BOF':'var(--orange)','NON':'var(--red)'};
  const state = {category:'OUI', search:'', sort:'name', randomDifficulty:'all', randomLength:'all', overrides:loadOverrides(), custom:loadCustom()};
  const $ = s => document.querySelector(s);
  const escape = s => String(s ?? '').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const normalize = s => String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const edited = c => ({...c,...(state.overrides[c.id]||{})});
  const detailed = () => [...BASE.detailed,...state.custom.filter(c=>c.category==='OUI')].map(edited);
  function loadOverrides(){try{return JSON.parse(localStorage.getItem(STORAGE)||'{}')}catch{return {}}}
  function loadCustom(){try{return JSON.parse(localStorage.getItem(CUSTOM_STORAGE)||'[]')}catch{return []}}
  function saveOverrides(){localStorage.setItem(STORAGE,JSON.stringify(state.overrides))}
  function saveCustom(){localStorage.setItem(CUSTOM_STORAGE,JSON.stringify(state.custom))}
  function allRows(){return [...detailed().map(c=>({...c,kind:'detailed'})),...BASE.compact.map(c=>({...c,kind:'compact'})),...state.custom.filter(c=>c.category!=='OUI').map(c=>({...c,kind:'compact'}))]}
  function categoryOf(c){return c.kind==='detailed'?'OUI':c.category}
  function searchable(c){return normalize([c.name,c.excelName,c.category,c.excelCategory,c.remarks,c.catalogRemarks,c.notes,c.difficulty,c.maps].join(' '))}
  function filtered(){
    let rows=allRows().filter(c=>categoryOf(c)===state.category&&searchable(c).includes(normalize(state.search)));
    const rank={'OUI':0,'BIEN AUSSI':1,'POURQUOI PAS':2,'BOF':3,'NON':4};
    rows.sort((a,b)=>state.sort==='category'?(rank[categoryOf(a)]-rank[categoryOf(b)]||a.name.localeCompare(b.name,'fr')):state.sort==='maps'?((b.maps||0)-(a.maps||0)||a.name.localeCompare(b.name,'fr')):state.sort==='played'?((b.playCount||0)-(a.playCount||0)||a.name.localeCompare(b.name,'fr')):a.name.localeCompare(b.name,'fr'));
    return rows;
  }
  function stats(){
    const rows=allRows(); const counts=Object.fromEntries(cats.map(c=>[c,rows.filter(x=>categoryOf(x)===c).length]));
    $('#stats').innerHTML=[['Oui',counts.OUI,'var(--acid)'],['Pourquoi pas',counts['POURQUOI PAS'],'var(--gold)'],['Bof',counts.BOF,'var(--orange)'],['Non',counts.NON,'var(--red)']].map(([l,n,color])=>`<div class="stat" style="--stat-color:${color}"><strong>${n}</strong><span>${l}</span></div>`).join('');
  }
  function renderChips(){
    const counts=Object.fromEntries(cats.map(c=>[c,allRows().filter(x=>categoryOf(x)===c).length]));
    $('#chips').innerHTML=cats.map(c=>`<button class="chip ${state.category===c?'active':''}" data-cat="${c}">${c} · ${counts[c]}</button>`).join('');
  }
  function detailedCard(c){
    const img=c.photo?`style="background-image:url('${c.photo.replace(/'/g,'%27')}')"`:'';
    return `<article class="card" data-id="${escape(c.id)}"><div class="cover" ${img}><span class="badge">✓ GARDÉE</span></div><div class="cardbody"><h3>${escape(c.name)}</h3><div class="meta"><span>${c.maps??'–'} carte${c.maps===1?'':'s'}</span><span>${escape(c.difficulty||'À renseigner')}</span>${c.playCount?`<span>${c.playCount} partie${c.playCount>1?'s':''}</span>`:''}</div><p class="remark">${escape(c.catalogRemarks||c.notes||'Aucune remarque pour le moment.')}</p><div class="cardfoot"><span class="cat cat-BIEN">Fiche détaillée</span><button class="linkbtn" data-open="${escape(c.id)}">Voir la fiche →</button></div></div></article>`;
  }
  function compactRow(c){const token=c.category.split(' ')[0],rowColor=colors[c.category]||'var(--line)';return `<article class="row" style="--row-color:${rowColor}"><div class="row-name">${escape(c.name)}</div><span class="cat cat-${token}">${escape(c.category)}</span><div class="row-note">${escape(c.remarks||c.catalogRemarks||'Sans remarque')}</div><button class="linkbtn" data-compact="${escape(c.id)}">Détails</button></article>`}
  function render(){
    const rows=filtered(), ds=rows.filter(x=>x.kind==='detailed'), cs=rows.filter(x=>x.kind==='compact');
    $('#detailedGrid').innerHTML=ds.map(detailedCard).join(''); $('#compactList').innerHTML=cs.map(compactRow).join('');
    $('#detailedGrid').classList.toggle('hidden',!ds.length); $('#detailedTitle').classList.toggle('hidden',!ds.length); $('#compactList').classList.toggle('hidden',!cs.length); $('#compactTitle').classList.toggle('hidden',!cs.length); $('#empty').classList.toggle('hidden',!!rows.length); $('#resultCount').textContent=rows.length; renderChips();
  }
  function openDetail(id){
    const c=detailed().find(x=>x.id===id); if(!c)return;
    $('#modalTitle').textContent=c.name;
    $('#modalBody').innerHTML=`${c.photo?`<img class="hero-img" src="${c.photo}" alt="Illustration de ${escape(c.name)}">`:''}<div class="details"><div class="detail"><label>Cartes</label><strong>${c.maps??'À renseigner'}</strong></div><div class="detail"><label>Difficulté</label><strong>${escape(c.difficulty||'À renseigner')}</strong></div><div class="detail"><label>Parties</label><strong>${c.playCount||0}</strong></div></div>${c.catalogRemarks?`<div class="section"><h3>Remarque du catalogue Excel</h3><p>${escape(c.catalogRemarks)}</p>${c.excelCategory!=='OUI'?`<span class="badge" style="color:${colors[c.excelCategory]||'var(--muted)'};border:1px solid currentColor">Catégorie Excel : ${escape(c.excelCategory)}</span>`:''}</div>`:''}<div class="section"><h3>Données de la fiche</h3><div class="formgrid"><div class="field"><label>Nom</label><input id="fName" value="${escape(c.name)}"></div><div class="field"><label>Nombre de cartes</label><input id="fMaps" type="number" min="1" value="${c.maps??''}"></div><div class="field"><label>Difficulté</label><input id="fDifficulty" value="${escape(c.difficulty||'')}"></div><div class="field"><label>Nombre de parties</label><input id="fPlayed" type="number" min="0" value="${c.playCount||0}"></div><div class="field span2"><label>Lien Workshop</label><input id="fWorkshop" type="url" value="${escape(c.workshopUrl||'')}"></div><div class="field span2"><label>Notes personnelles</label><textarea id="fNotes">${escape(c.notes||'')}</textarea></div></div></div><div class="modal-actions">${c.workshopUrl?`<a class="btn" href="${escape(c.workshopUrl)}" target="_blank" rel="noopener">Ouvrir Workshop</a>`:''}<button class="btn primary" id="saveCard">Enregistrer</button></div>`;
    $('#saveCard').onclick=()=>{state.overrides[id]={name:$('#fName').value.trim()||c.name,maps:$('#fMaps').value?Number($('#fMaps').value):null,difficulty:$('#fDifficulty').value.trim(),playCount:Number($('#fPlayed').value)||0,workshopUrl:$('#fWorkshop').value.trim(),notes:$('#fNotes').value.trim()};saveOverrides();stats();render();$('#detailDialog').close();toast('Fiche enregistrée sur cet appareil')};
    $('#detailDialog').showModal();
  }
  function openCompact(id){const c=allRows().find(x=>x.id===id&&x.kind==='compact');if(!c)return;$('#modalTitle').textContent=c.name;$('#modalBody').innerHTML=`<div class="details"><div class="detail"><label>Catégorie</label><strong>${escape(c.category)}</strong></div>${c.excelRow?`<div class="detail"><label>Ligne Excel</label><strong>${c.excelRow}</strong></div>`:''}</div><div class="section"><h3>Remarque</h3><p>${escape(c.remarks||c.catalogRemarks||'Sans remarque')}</p></div>`;$('#detailDialog').showModal()}
  function randomPool(){return detailed().filter(c=>{const maps=c.maps||0;const difficultyOk=state.randomDifficulty==='all'||normalize(c.difficulty).includes(state.randomDifficulty);const lengthOk=state.randomLength==='all'||(state.randomLength==='short'&&maps>=1&&maps<=3)||(state.randomLength==='medium'&&maps>=4&&maps<=5)||(state.randomLength==='long'&&maps>=6);return difficultyOk&&lengthOk})}
  function randomSetup(){
    $('#randomBody').innerHTML=`<div class="random-config"><h3>Choisir les règles du tirage</h3><p>Le tirage utilise uniquement les campagnes gardées et respecte ces filtres.</p><div class="random-grid"><select class="control" id="randomDifficulty"><option value="all">Toutes les difficultés</option><option value="facile">Facile</option><option value="moyen">Moyen</option><option value="difficile">Difficile</option></select><select class="control" id="randomLength"><option value="all">Toutes les longueurs</option><option value="short">Courte · 1 à 3 cartes</option><option value="medium">Moyenne · 4 à 5 cartes</option><option value="long">Longue · 6 cartes et plus</option></select></div></div><button class="btn primary" id="launchRandom" style="width:100%">⚄ Choisir une campagne</button>`;
    $('#randomDifficulty').value=state.randomDifficulty;$('#randomLength').value=state.randomLength;$('#launchRandom').onclick=()=>{state.randomDifficulty=$('#randomDifficulty').value;state.randomLength=$('#randomLength').value;randomPick()};if(!$('#randomDialog').open)$('#randomDialog').showModal();
  }
  function randomPick(){
    const pool=randomPool(); if(!pool.length){toast('Aucune campagne avec ces filtres');return} const c=pool[Math.floor(Math.random()*pool.length)];
    $('#randomBody').innerHTML=`<div class="random-result"><div class="dice">⚄</div>${c.photo?`<img class="hero-img" src="${c.photo}" alt="">`:''}<h2>${escape(c.name)}</h2><div class="meta" style="justify-content:center"><span>${c.maps??'–'} cartes</span><span>${escape(c.difficulty||'À renseigner')}</span><span>${c.playCount||0} partie(s)</span></div><p>${escape(c.catalogRemarks||c.notes||'')}</p><div class="modal-actions" style="justify-content:center"><button class="btn" id="reroll">Relancer</button><button class="btn primary" id="pickedDetail">Voir la fiche</button></div></div>`;
    $('#reroll').onclick=randomPick; $('#pickedDetail').onclick=()=>{$('#randomDialog').close();openDetail(c.id)}; if(!$('#randomDialog').open)$('#randomDialog').showModal();
  }
  function addCampaign(){
    const name=$('#addName').value.trim();if(!name){toast('Indique un nom de campagne');$('#addName').focus();return}
    const category=$('#addCategory').value;const item={id:`custom-${Date.now()}`,name,category,maps:$('#addMaps').value?Number($('#addMaps').value):null,difficulty:$('#addDifficulty').value.trim()||'à renseigner',workshopUrl:$('#addWorkshop').value.trim(),notes:$('#addRemarks').value.trim(),remarks:$('#addRemarks').value.trim(),catalogRemarks:$('#addRemarks').value.trim(),photo:'',playCount:0,source:'user-created',userCreated:true};state.custom.push(item);saveCustom();state.category=category;stats();render();$('#addDialog').close();['#addName','#addMaps','#addDifficulty','#addWorkshop','#addRemarks'].forEach(s=>$(s).value='');$('#addCategory').value='OUI';toast('Campagne ajoutée')
  }
  function exportData(){const payload={type:'l4d2-archives-user-data',version:2,exportedAt:new Date().toISOString(),overrides:state.overrides,custom:state.custom};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='mes-donnees-l4d2.json';a.click();URL.revokeObjectURL(a.href);toast('Données exportées')}
  function importData(file){const reader=new FileReader();reader.onload=()=>{try{const value=JSON.parse(reader.result);state.overrides=value.overrides||{};state.custom=value.custom||[];saveOverrides();saveCustom();stats();render();toast('Données importées')}catch{toast('Fichier non reconnu')}};reader.readAsText(file)}
  function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2300)}
  $('#search').addEventListener('input',e=>{state.search=e.target.value;render()});$('#sort').addEventListener('change',e=>{state.sort=e.target.value;render()});
  $('#chips').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(b){state.category=b.dataset.cat;render()}});document.addEventListener('click',e=>{const o=e.target.closest('[data-open]'),c=e.target.closest('[data-compact]'),x=e.target.closest('[data-close]');if(o)openDetail(o.dataset.open);if(c)openCompact(c.dataset.compact);if(x)document.getElementById(x.dataset.close).close()});
  $('#clearBtn').onclick=()=>{state.search='';state.sort='name';$('#search').value='';$('#sort').value='name';render()};$('#addBtn').onclick=()=>{$('#addDialog').showModal();$('#addName').focus()};$('#saveNewCampaign').onclick=addCampaign;$('#randomBtn').onclick=randomSetup;$('#exportBtn').onclick=exportData;$('#importFile').onchange=e=>e.target.files[0]&&importData(e.target.files[0]);document.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();$('#search').focus()}if(e.key==='Escape')document.querySelectorAll('dialog[open]').forEach(d=>d.close())});
  stats();render();if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js');
})();
