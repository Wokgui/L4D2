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
