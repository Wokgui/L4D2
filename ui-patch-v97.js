(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    /* Steam : neutralise définitivement les anciens fonds, recadrages et clips. */
    html body .app .draw .res.home-res .welcome-actions .welcome-steam-icon{
      position:relative!important;
      width:42px!important;
      height:42px!important;
      min-width:42px!important;
      min-height:42px!important;
      max-width:42px!important;
      max-height:42px!important;
      flex:0 0 42px!important;
      overflow:visible!important;
      contain:none!important;
      background:none!important;
      border-radius:0!important;
      clip-path:none!important;
    }
    html body .app .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon>img,
    html body .app .draw .res.home-res .welcome-actions .news .welcome-steam-icon>img{
      position:static!important;
      left:auto!important;
      top:auto!important;
      display:block!important;
      visibility:visible!important;
      width:100%!important;
      height:100%!important;
      min-width:100%!important;
      min-height:100%!important;
      max-width:100%!important;
      max-height:100%!important;
      margin:0!important;
      transform:none!important;
      object-fit:contain!important;
      object-position:center!important;
      border-radius:50%!important;
      clip-path:none!important;
      background:transparent!important;
    }
    html body .app .draw .res.home-res .welcome-actions .shortcut-custom>svg{
      display:block!important;
      width:100%!important;
      height:100%!important;
      max-width:100%!important;
      max-height:100%!important;
    }

    /* Chat Steam : même image, volontairement plus petite dans sa cible tactile. */
    html body .app .draw .title .steam-chat-top .steam-chat-glyph{
      display:grid!important;
      place-items:center!important;
      overflow:visible!important;
      contain:none!important;
      background:none!important;
      clip-path:none!important;
    }
    html body .app .draw .title .steam-chat-top .steam-chat-glyph>img,
    html body .app .draw .title .steam-chat-top>img{
      position:static!important;
      left:auto!important;
      top:auto!important;
      display:block!important;
      visibility:visible!important;
      width:78%!important;
      height:78%!important;
      min-width:0!important;
      min-height:0!important;
      max-width:78%!important;
      max-height:78%!important;
      margin:auto!important;
      transform:none!important;
      object-fit:contain!important;
      object-position:center!important;
      border-radius:50%!important;
      clip-path:none!important;
      background:transparent!important;
    }

    /* Gardées : même icône complète, avec davantage d'air. */
    html body #k .wk{
      display:grid!important;
      place-items:center!important;
      overflow:visible!important;
      contain:none!important;
      background:none!important;
      clip-path:none!important;
    }
    html body #k .wk img{
      position:static!important;
      display:block!important;
      visibility:visible!important;
      width:78%!important;
      height:78%!important;
      min-width:0!important;
      min-height:0!important;
      max-width:78%!important;
      max-height:78%!important;
      margin:auto!important;
      transform:none!important;
      object-fit:contain!important;
      object-position:center!important;
      border-radius:50%!important;
      clip-path:none!important;
      background:transparent!important;
    }

    @media(max-width:420px){
      html[data-l4d2-height="regular"] body .app .draw .res.home-res .welcome-actions .welcome-steam-icon{
        width:37px!important;height:37px!important;min-width:37px!important;min-height:37px!important;max-width:37px!important;max-height:37px!important;flex-basis:37px!important;
      }
      html[data-l4d2-height="compact"] body .app .draw .res.home-res .welcome-actions .welcome-steam-icon{
        width:29px!important;height:29px!important;min-width:29px!important;min-height:29px!important;max-width:29px!important;max-height:29px!important;flex-basis:29px!important;
      }
    }
  `;
  document.head.appendChild(style);

  /* Les anciens balisages restent compatibles, mais utilisent tous la ressource fournie. */
  const normalizeSteamImages=root=>{
    (root||document).querySelectorAll('.welcome-actions .subscriptions .welcome-steam-icon img,.welcome-actions .news .welcome-steam-icon img,.steam-chat-top img,#k .wk img').forEach(img=>{
      if(img.getAttribute('src')!=='/steam-icon-user.png')img.setAttribute('src','/steam-icon-user.png');
    });
  };
  normalizeSteamImages(document);
  requestAnimationFrame(()=>normalizeSteamImages(document));

  const saved=document.getElementById('kl');
  if(saved){
    let queued=false;
    new MutationObserver(()=>{
      if(queued)return;
      queued=true;
      queueMicrotask(()=>{
        queued=false;
        normalizeSteamImages(saved);
      });
    }).observe(saved,{childList:true,subtree:true});
  }
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
