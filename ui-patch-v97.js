(()=>{
  'use strict';

  /* v111 — aucun changement de géométrie après le premier rendu.
     v91 recalcule encore la hauteur de navigation et layout-air v109 réactive 100dvh.
     On verrouille ici les valeurs déterminées avant le premier rendu, puis on les
     réapplique dans le même événement si Chrome modifie son viewport visuel. */
  const root=document.documentElement;
  const lockViewportGeometry=()=>{
    const compact=root.dataset.l4d2Height==='compact';
    root.style.setProperty('--l4d2-nav-height',compact?'56px':'58px');
  };
  lockViewportGeometry();

  const stableStyle=document.createElement('style');
  stableStyle.textContent=`
    @media(max-width:420px){
      html[data-l4d2-height] body .app>.draw.page.on{
        height:calc(var(--l4d2-start-height) - var(--l4d2-nav-height))!important;
        max-height:calc(var(--l4d2-start-height) - var(--l4d2-nav-height))!important;
      }
    }
    #k .wk{
      width:40px!important;
      height:40px!important;
      min-width:40px!important;
      min-height:40px!important;
      max-width:40px!important;
      max-height:40px!important;
      contain:layout paint!important;
    }
    #k .wk img{
      display:block!important;
      width:40px!important;
      height:40px!important;
      min-width:40px!important;
      min-height:40px!important;
      max-width:40px!important;
      max-height:40px!important;
      object-fit:contain!important;
    }
  `;
  document.head.appendChild(stableStyle);

  /* Le PNG Steam est déjà préchargé dans index.html. decode() le prépare aussi
     pour la première ouverture de « Gardées » afin d'éviter une frame vide. */
  const primeSteamIcon=new Image(40,40);
  primeSteamIcon.decoding='sync';
  primeSteamIcon.fetchPriority='high';
  primeSteamIcon.src='/steam-icon.png';
  if(typeof primeSteamIcon.decode==='function')primeSteamIcon.decode().catch(()=>{});
  document.querySelectorAll('img[src="/steam-icon.png"]').forEach(img=>{
    img.decoding='sync';
    img.fetchPriority='high';
  });

  /* Les icônes créées par kept() ont dès leur insertion leurs dimensions finales
     et demandent un décodage synchrone du fichier déjà en cache. */
  if(typeof w==='function'){
    w=function(u,id){
      const icon='<img src="/steam-icon.png" alt="Steam" width="40" height="40" decoding="sync" fetchpriority="high">';
      return u
        ?`<a class=wk target=_blank rel=noopener href="${E(u)}" aria-label="Ouvrir sur le Workshop Steam">${icon}</a>`
        :`<button type=button class="wk empty-workshop" data-wid="${E(id)}" aria-label="Ajouter le lien Workshop Steam">${icon}</button>`;
    };
  }

  window.addEventListener('resize',lockViewportGeometry,{passive:true});
  if(window.visualViewport)window.visualViewport.addEventListener('resize',lockViewportGeometry,{passive:true});
})();

(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    /* Autres campagnes : le bouton Modifier reste seul et centré quand la fiche est fermée. */
    #o .item > .acts{
      width:100%!important;
      display:flex!important;
      justify-content:center!important;
      align-items:center!important;
    }
    #o .item > .acts .eo{
      margin-left:auto!important;
      margin-right:auto!important;
    }
    /* Cache immédiatement Supprimer tant qu'il n'a pas été déplacé dans la zone dépliée. */
    #o .item > .acts .do{display:none!important}

    /* Enregistrer et Supprimer sont centrés dans la partie dépliée. */
    #o .item .det .so{
      display:block!important;
      width:max-content!important;
      margin:7px auto 0!important;
    }
    #o .item .det .other-delete-row{
      display:flex!important;
      justify-content:center!important;
      align-items:center!important;
      margin-top:8px!important;
    }
    #o .item .det .other-delete-row .do{
      display:inline-flex!important;
      align-items:center!important;
      justify-content:center!important;
    }
  `;
  document.head.appendChild(style);

  function patchOtherItem(item){
    if(!item)return;
    const acts=[...item.children].find(node=>node.classList&&node.classList.contains('acts'));
    const det=[...item.children].find(node=>node.classList&&node.classList.contains('det'));
    if(!det)return;

    const edit=acts&&acts.querySelector('.eo');
    if(acts){
      acts.style.setProperty('justify-content','center','important');
      acts.style.setProperty('width','100%','important');
    }
    if(edit){
      edit.style.setProperty('margin-left','auto','important');
      edit.style.setProperty('margin-right','auto','important');
    }

    const save=det.querySelector('.so');
    if(save){
      save.style.setProperty('display','block','important');
      save.style.setProperty('width','max-content','important');
      save.style.setProperty('margin','7px auto 0','important');
    }

    const del=item.querySelector('.do');
    if(!del)return;
    let row=det.querySelector('.other-delete-row');
    if(!row){
      row=document.createElement('div');
      row.className='other-delete-row';
      det.appendChild(row);
    }
    if(del.parentElement!==row)row.appendChild(del);
  }

  function patchOthers(){
    const root=document.getElementById('ol');
    if(!root)return;
    root.querySelectorAll('.item').forEach(patchOtherItem);
  }

  patchOthers();
  const root=document.getElementById('ol');
  if(root){
    let queued=false;
    new MutationObserver(()=>{
      if(queued)return;
      queued=true;
      queueMicrotask(()=>{
        queued=false;
        patchOthers();
      });
    }).observe(root,{childList:true,subtree:true});
  }
})();
