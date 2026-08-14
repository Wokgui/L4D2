(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* Garde l'aération interne de la grande fiche. */
    .result-card.has-last-played .result-content{
      padding-bottom:30px!important;
    }

    /* Laisse toujours un peu plus d'air entre la grande fiche et la navigation. */
    .draw .res{
      padding-bottom:14px!important;
    }

    @media(max-height:720px){
      .result-card.has-last-played .result-content{
        padding-bottom:22px!important;
      }
      .draw .res{
        padding-bottom:10px!important;
      }
    }

    /* Champ de renommage dans le panneau Modifier. */
    #k .campaign-name-edit{
      width:100%;
      border:2px solid var(--g);
      border-radius:9px;
      background:#fff;
      padding:9px;
      font:inherit;
      font-weight:800;
    }

    /* Bouton de renommage visible directement à côté du nom. */
    #k .campaign-name-line{
      display:flex;
      align-items:center;
      gap:6px;
      min-width:0;
    }
    #k .campaign-name-line .name{
      flex:1;
      min-width:0;
    }
    #k .rename-campaign{
      flex:0 0 auto;
      width:30px;
      height:30px;
      border:1px solid var(--l);
      border-radius:9px;
      background:var(--p2);
      color:var(--i);
      display:grid;
      place-items:center;
      padding:0;
      font-size:17px;
      font-weight:900;
      line-height:1;
    }
  `;
  document.head.appendChild(s);

  const previousKept=kept;

  function renameCampaign(c){
    const value=prompt('Nom de la campagne',c.name||'');
    if(value===null)return;
    const newName=value.trim();
    if(!newName)return alert('Le nom de la campagne ne peut pas être vide.');
    c.name=newName;
    if(LP&&String(LP.id)===String(c.id)){
      LP.name=newName;
      localStorage.setItem(LPK,JSON.stringify(LP));
    }
    save();
    kept();
  }

  function enhanceKept(){
    const root=document.getElementById('kl');
    if(!root)return;

    root.querySelectorAll('.item').forEach(item=>{
      const campaign=C.find(c=>String(c.id)===String(item.dataset.id));
      if(!campaign)return;

      /* Bouton crayon visible directement sur la ligne du nom. */
      const main=item.querySelector('.main');
      const name=main?.querySelector('.name');
      if(main&&name&&!main.querySelector('.rename-campaign')){
        const line=document.createElement('div');
        line.className='campaign-name-line';
        name.parentNode.insertBefore(line,name);
        line.appendChild(name);
        const button=document.createElement('button');
        button.type='button';
        button.className='rename-campaign';
        button.setAttribute('aria-label','Modifier le nom de '+campaign.name);
        button.textContent='✎';
        button.onclick=e=>{
          e.stopPropagation();
          renameCampaign(campaign);
        };
        line.appendChild(button);
      }

      /* Conserve aussi un champ texte complet dans le panneau Modifier. */
      const det=item.querySelector('.det');
      if(!det||det.querySelector('.campaign-name-edit'))return;
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
    enhanceKept();
  };

  if(document.getElementById('k')?.classList.contains('on'))kept();
})();
