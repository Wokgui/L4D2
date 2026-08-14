(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* La grande fiche descend davantage, sans modifier les espacements internes validés. */
    .result-card.has-last-played .result-content{
      padding-bottom:30px!important;
    }
    @media(max-height:720px){
      .result-card.has-last-played .result-content{
        padding-bottom:22px!important;
      }
    }

    /* Champ de renommage dans Gardées. */
    #k .campaign-name-edit{
      width:100%;
      border:1px solid var(--l);
      border-radius:9px;
      background:#fff;
      padding:8px;
      font:inherit;
      font-weight:800;
    }
  `;
  document.head.appendChild(s);

  const previousKept=kept;

  function addNameEditors(){
    const root=document.getElementById('kl');
    if(!root)return;

    root.querySelectorAll('.item').forEach(item=>{
      const det=item.querySelector('.det');
      if(!det||det.querySelector('.campaign-name-edit'))return;

      const campaign=C.find(c=>String(c.id)===String(item.dataset.id));
      if(!campaign)return;

      const grid=det.querySelector('.grid');
      if(!grid)return;

      grid.insertAdjacentHTML('afterend',`<div class="dlab">Nom de la campagne</div><input class="campaign-name-edit" value="${E(campaign.name||'')}">`);

      const saveButton=item.querySelector('.sv');
      if(saveButton){
        saveButton.addEventListener('click',event=>{
          const input=item.querySelector('.campaign-name-edit');
          const current=C.find(c=>String(c.id)===String(item.dataset.id));
          if(!input||!current)return;
          const newName=input.value.trim();
          if(!newName){
            event.preventDefault();
            event.stopImmediatePropagation();
            alert('Le nom de la campagne ne peut pas être vide.');
            return;
          }
          current.name=newName;
          if(LP&&String(LP.id)===String(current.id)){
            LP.name=newName;
            localStorage.setItem(LPK,JSON.stringify(LP));
          }
        },true);
      }
    });
  }

  kept=function(){
    previousKept();
    addNameEditors();
  };

  if(document.getElementById('k')?.classList.contains('on'))kept();
})();
