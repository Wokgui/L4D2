(()=>{
  const OUTER_BOTTOM_GAP=14;
  const INNER_BOTTOM_GAP=14;
  const DESC_MIN_HEIGHT=60;

  const s=document.createElement('style');
  s.textContent=`
    /* La grande fiche utilise automatiquement toute la hauteur disponible. */
    .draw .res:not(.home-res){
      padding-bottom:${OUTER_BOTTOM_GAP}px!important;
    }
    .draw .res:not(.home-res) .result-card.has-last-played{
      height:100%!important;
      max-height:100%!important;
      min-height:0!important;
      align-self:stretch!important;
      margin-bottom:0!important;
      box-sizing:border-box!important;
    }
    .result-card.has-last-played .result-content{
      flex:1 1 auto!important;
      min-height:0!important;
      padding-bottom:${INNER_BOTTOM_GAP}px!important;
      box-sizing:border-box!important;
    }

    /* Descriptif : un peu plus haut et texte réellement centré verticalement. */
    .result-card.has-last-played .campaign-description{
      min-height:${DESC_MIN_HEIGHT}px!important;
      box-sizing:border-box!important;
      display:flex!important;
      align-items:center!important;
      justify-content:flex-start!important;
      text-align:left!important;
      overflow:hidden!important;
    }
    .result-card.has-last-played .campaign-description-text{
      display:-webkit-box!important;
      -webkit-box-orient:vertical!important;
      -webkit-line-clamp:4!important;
      overflow:hidden!important;
      width:100%!important;
    }

    @media(max-height:720px){
      .draw .res:not(.home-res){padding-bottom:10px!important}
      .result-card.has-last-played .result-content{padding-bottom:10px!important}
      .result-card.has-last-played .campaign-description{min-height:52px!important}
    }

    /* Aucun indicateur visuel permanent pour signaler que les noms sont modifiables. */
    #k .rename-campaign{display:none!important}
    #k .item.open .name,
    .draw .result-card .rname{
      text-decoration:none!important;
      border:0!important;
      outline:0!important;
    }

    /* Éditeur de titre pleine largeur et multilignes dans Gardées. */
    #k .campaign-name-block{
      margin:0 0 10px;
    }
    #k .campaign-name-block .dlab{
      margin-top:0;
    }
    #k .campaign-name-edit{
      display:block;
      width:100%!important;
      min-height:48px!important;
      height:auto;
      overflow:hidden!important;
      resize:none!important;
      white-space:pre-wrap!important;
      overflow-wrap:anywhere!important;
      border:2px solid var(--g)!important;
      border-radius:10px!important;
      background:#fff!important;
      padding:10px 11px!important;
      box-sizing:border-box!important;
      font:inherit!important;
      font-size:16px!important;
      line-height:1.25!important;
      font-weight:900!important;
      color:var(--i)!important;
    }
    #k .campaign-name-edit:focus{
      outline:2px solid rgba(47,121,109,.18);
      outline-offset:2px;
    }
  `;
  document.head.appendChild(s);

  function autoHeight(textarea){
    if(!textarea)return;
    textarea.style.height='auto';
    textarea.style.height=Math.max(48,textarea.scrollHeight)+'px';
  }

  function wrapDescription(){
    const d=document.querySelector('#res .result-card.has-last-played .campaign-description');
    if(!d||d.querySelector('.campaign-description-text'))return;
    const text=d.textContent||'';
    d.textContent='';
    const span=document.createElement('span');
    span.className='campaign-description-text';
    span.textContent=text;
    d.appendChild(span);
  }

  function fitAdaptiveCard(){
    const res=document.getElementById('res');
    const card=res&&res.querySelector('.result-card.has-last-played');
    const content=card&&card.querySelector('.result-content');
    const desc=card&&card.querySelector('.campaign-description');
    const last=card&&card.querySelector('.last-played-inline');
    if(!res||!card||!content||!desc||!last)return;

    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const shortScreen=window.matchMedia('(max-height:720px)').matches;
      const innerGap=shortScreen?10:INNER_BOTTOM_GAP;
      const targetBottom=card.getBoundingClientRect().bottom-innerGap;

      let size=parseFloat(getComputedStyle(desc).fontSize)||11.5;
      let guard=0;
      while(last.getBoundingClientRect().bottom>targetBottom+.5&&size>7&&guard<30){
        size=Math.max(7,size-.25);
        desc.style.setProperty('font-size',size+'px','important');
        desc.style.setProperty('line-height','1.1','important');
        guard++;
      }
    }));
  }

  /* Le fit existant garde ses règles de descriptif ; on ajoute centrage et marge basse garantie. */
  const previousFit=typeof fitDescription==='function'?fitDescription:null;
  if(previousFit){
    fitDescription=function(){
      previousFit();
      requestAnimationFrame(()=>{
        wrapDescription();
        fitAdaptiveCard();
      });
    };
  }

  function saveRenamedCampaign(c,value){
    const newName=(value||'').trim();
    if(!newName)return false;
    c.name=newName;
    if(LP&&String(LP.id)===String(c.id)){
      LP.name=newName;
      localStorage.setItem(LPK,JSON.stringify(LP));
    }
    save();
    return true;
  }

  /* Dans Tirage, toucher simplement le nom permet de le changer, sans aucun signe visible. */
  const previousDraw=draw;
  draw=function(c){
    previousDraw(c);
    wrapDescription();

    const title=document.querySelector('#res .result-card .rname');
    if(title){
      title.onclick=e=>{
        e.stopPropagation();
        const value=prompt('Nom de la campagne',c.name||'');
        if(value===null)return;
        if(!value.trim())return alert('Le nom de la campagne ne peut pas être vide.');
        if(saveRenamedCampaign(c,value))draw(c);
      };
    }

    if(typeof fitDescription==='function')fitDescription();
    else fitAdaptiveCard();
  };

  const previousKept=kept;

  function enhanceKept(){
    const root=document.getElementById('kl');
    if(!root)return;

    root.querySelectorAll('.rename-campaign').forEach(button=>button.remove());

    root.querySelectorAll('.item').forEach(item=>{
      const campaign=C.find(c=>String(c.id)===String(item.dataset.id));
      if(!campaign)return;

      const main=item.querySelector('.main');
      const name=main&&main.querySelector('.name');
      const det=item.querySelector('.det');
      const grid=det&&det.querySelector('.grid');
      if(!name||!det||!grid)return;

      /* Si l'ancien wrapper du crayon existe encore, remettre simplement le nom dans .main. */
      const oldLine=name.closest('.campaign-name-line');
      if(oldLine){
        oldLine.parentNode.insertBefore(name,oldLine);
        oldLine.remove();
      }

      let editor=det.querySelector('.campaign-name-edit');
      if(!editor){
        const block=document.createElement('div');
        block.className='campaign-name-block';
        block.innerHTML=`<div class="dlab">Nom de la campagne</div><textarea class="campaign-name-edit" rows="1">${E(campaign.name||'')}</textarea>`;
        det.insertBefore(block,grid);
        editor=block.querySelector('.campaign-name-edit');
      }

      autoHeight(editor);
      if(!editor.dataset.autoHeightReady){
        editor.dataset.autoHeightReady='1';
        editor.addEventListener('input',()=>autoHeight(editor));
      }

      /* Un appui sur le nom, une fois la campagne ouverte, amène directement à l'éditeur complet. */
      name.onclick=e=>{
        if(!item.classList.contains('open'))return;
        e.stopPropagation();
        editor.value=campaign.name||'';
        autoHeight(editor);
        editor.focus({preventScroll:true});
        editor.setSelectionRange(editor.value.length,editor.value.length);
        editor.scrollIntoView({behavior:'smooth',block:'center'});
      };

      const saveButton=item.querySelector('.sv');
      if(saveButton&&!saveButton.dataset.nameSaveReady){
        saveButton.dataset.nameSaveReady='1';
        saveButton.addEventListener('click',event=>{
          const current=C.find(c=>String(c.id)===String(item.dataset.id));
          if(!current)return;
          const value=editor.value.trim();
          if(!value){
            event.preventDefault();
            event.stopImmediatePropagation();
            alert('Le nom de la campagne ne peut pas être vide.');
            return;
          }
          current.name=value;
          if(LP&&String(LP.id)===String(current.id)){
            LP.name=value;
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

  requestAnimationFrame(()=>{
    if(document.getElementById('k')?.classList.contains('on'))kept();
    wrapDescription();
    fitAdaptiveCard();
  });

  window.addEventListener('resize',()=>{
    wrapDescription();
    fitAdaptiveCard();
  });
})();
