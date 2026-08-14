(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* Le sélecteur reste lisible mais libère davantage de hauteur au résultat. */
    .draw .selector-card{
      margin:3px 0 6px!important;
      padding:8px 11px 10px!important;
    }
    .draw .selector-card .selector-title{
      margin:0 0 6px!important;
    }
    .draw .selector-card .filter-row{
      margin:2px 0!important;
    }
    .draw .selector-card .drawbtn{
      margin:6px auto 1px!important;
      min-height:42px!important;
      padding:8px 18px!important;
    }

    /* La fiche entière doit toujours finir avant la navigation. */
    .draw .res:not(.home-res){
      padding-top:3px!important;
      padding-bottom:6px!important;
      overflow:hidden!important;
    }
    .draw .res:not(.home-res) .result-card.has-last-played{
      width:100%!important;
      height:100%!important;
      min-height:0!important;
      max-height:100%!important;
      margin:0!important;
      align-self:stretch!important;
      overflow:hidden!important;
      display:flex!important;
      flex-direction:column!important;
      box-sizing:border-box!important;
    }

    /* La photo est la zone flexible : grande quand il y a de la place, elle seule se réduit si nécessaire. */
    .draw .result-card.has-last-played>img,
    .draw .result-card.has-last-played>.photo-fallback{
      flex:1 1 180px!important;
      width:100%!important;
      height:auto!important;
      min-height:145px!important;
      max-height:220px!important;
      object-fit:cover!important;
    }

    /* Tout le reste garde sa taille naturelle : plus rien ne pousse la dernière tuile sous la barre du bas. */
    .result-card.has-last-played .result-content{
      flex:0 0 auto!important;
      min-height:0!important;
      padding:7px 12px 8px!important;
      gap:0!important;
      display:flex!important;
      flex-direction:column!important;
      box-sizing:border-box!important;
    }

    /* Titre réellement centré, Steam ne décale pas le texte. */
    .result-card.has-last-played .rhead{
      position:relative!important;
      min-height:54px!important;
      height:54px!important;
      margin:0 0 7px!important;
      padding:5px 54px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      box-sizing:border-box!important;
    }
    .result-card.has-last-played .rname{
      width:100%!important;
      min-width:0!important;
      min-height:44px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      text-align:center!important;
      white-space:normal!important;
      overflow:visible!important;
      text-overflow:clip!important;
      font-size:clamp(19px,5.3vw,27px)!important;
      line-height:1.05!important;
      font-weight:900!important;
      text-decoration:none!important;
      border:0!important;
      outline:0!important;
      cursor:text!important;
    }
    .result-card.has-last-played .rhead .wk{
      position:absolute!important;
      right:4px!important;
      top:50%!important;
      transform:translateY(-50%)!important;
      width:42px!important;
      height:42px!important;
      min-width:42px!important;
      min-height:42px!important;
      padding:0!important;
      border-radius:50%!important;
    }
    .result-card.has-last-played .rhead .wk img{
      width:42px!important;
      height:42px!important;
      max-height:42px!important;
      border-radius:50%!important;
      object-fit:contain!important;
    }

    /* Métadonnées compactes et constantes. */
    .result-card.has-last-played .meta{
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:6px!important;
      margin:0!important;
    }
    .result-card.has-last-played .meta span{
      min-height:46px!important;
      padding:5px 3px!important;
      display:flex!important;
      flex-direction:column!important;
      align-items:center!important;
      justify-content:center!important;
      box-sizing:border-box!important;
    }

    /* Descriptif : hauteur déterminée uniquement par le nombre réel de lignes. */
    .result-card.has-last-played .campaign-description{
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      text-align:center!important;
      white-space:normal!important;
      overflow:hidden!important;
      overflow-wrap:anywhere!important;
      margin:6px 0 0!important;
      padding:6px 12px!important;
      border-radius:12px!important;
      box-sizing:border-box!important;
      font-family:inherit!important;
      font-weight:800!important;
      line-height:1.18!important;
      color:#343a33!important;
    }
    .result-card.has-last-played .campaign-description.desc-lines-1{
      min-height:42px!important;
      height:42px!important;
      font-size:12px!important;
    }
    .result-card.has-last-played .campaign-description.desc-lines-2{
      min-height:54px!important;
      height:54px!important;
      font-size:11.5px!important;
    }
    .result-card.has-last-played .campaign-description.desc-lines-3{
      min-height:66px!important;
      height:66px!important;
      font-size:11px!important;
    }
    .result-card.has-last-played .campaign-description.desc-lines-4{
      min-height:76px!important;
      height:76px!important;
      font-size:10.5px!important;
    }

    /* La dernière campagne reste toujours entièrement visible. */
    .result-card.has-last-played .last-played-inline{
      position:relative!important;
      flex:0 0 50px!important;
      min-height:50px!important;
      height:50px!important;
      max-height:50px!important;
      margin:6px 0 0!important;
      padding:4px 54px 4px 9px!important;
      display:flex!important;
      align-items:center!important;
      overflow:hidden!important;
      box-sizing:border-box!important;
    }
    .result-card.has-last-played .last-played-copy{
      min-width:0!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      line-height:1.06!important;
    }
    .result-card.has-last-played .last-played-copy b{
      white-space:nowrap!important;
    }
    .result-card.has-last-played .last-played-copy span{
      white-space:nowrap!important;
      overflow:hidden!important;
      text-overflow:ellipsis!important;
    }
    .result-card.has-last-played .last-played-steam{
      position:absolute!important;
      right:7px!important;
      top:50%!important;
      transform:translateY(-50%)!important;
      width:40px!important;
      height:40px!important;
      min-width:40px!important;
      min-height:40px!important;
      padding:0!important;
      border-radius:50%!important;
    }
    .result-card.has-last-played .last-played-steam img{
      width:40px!important;
      height:40px!important;
      max-height:40px!important;
      border-radius:50%!important;
      object-fit:contain!important;
    }

    /* Aucun indice visuel permanent pour le renommage. */
    #k .rename-campaign{display:none!important}
    #k .item .name,#k .item.open .name{
      text-decoration:none!important;
      border:0!important;
      outline:0!important;
    }
    #k .item.open .name{cursor:text!important}
    #k .campaign-name-block{margin:0 0 10px!important}
    #k .campaign-name-block .dlab{margin-top:0!important}
    #k .campaign-name-edit{
      width:100%!important;
      min-height:50px!important;
      height:auto!important;
      resize:none!important;
      overflow:hidden!important;
      white-space:pre-wrap!important;
      overflow-wrap:anywhere!important;
      padding:10px 11px!important;
      box-sizing:border-box!important;
      font:inherit!important;
      font-size:16px!important;
      line-height:1.25!important;
      font-weight:900!important;
    }
    .draw-title-editor{
      width:100%!important;
      min-width:0!important;
      border:0!important;
      outline:0!important;
      background:transparent!important;
      padding:0!important;
      margin:0!important;
      text-align:center!important;
      color:var(--i)!important;
      font:inherit!important;
      font-size:clamp(19px,5.3vw,27px)!important;
      line-height:1.05!important;
      font-weight:900!important;
      box-shadow:none!important;
    }

    @media(max-height:720px){
      .draw .selector-card{padding:6px 9px 7px!important;margin:2px 0 4px!important}
      .draw .selector-card .selector-title{margin-bottom:4px!important}
      .draw .selector-card .filter-row{margin:1px 0!important}
      .draw .selector-card .drawbtn{margin-top:4px!important;min-height:36px!important;padding:6px 15px!important}
      .draw .res:not(.home-res){padding-bottom:4px!important}
      .draw .result-card.has-last-played>img,.draw .result-card.has-last-played>.photo-fallback{min-height:125px!important;max-height:185px!important}
      .result-card.has-last-played .result-content{padding:5px 9px 6px!important}
      .result-card.has-last-played .rhead{height:48px!important;min-height:48px!important;margin-bottom:5px!important;padding:3px 50px!important}
      .result-card.has-last-played .meta span{min-height:42px!important;padding:4px 2px!important}
      .result-card.has-last-played .campaign-description{margin-top:5px!important;padding:5px 9px!important}
      .result-card.has-last-played .campaign-description.desc-lines-1{height:38px!important;min-height:38px!important}
      .result-card.has-last-played .campaign-description.desc-lines-2{height:48px!important;min-height:48px!important}
      .result-card.has-last-played .campaign-description.desc-lines-3{height:58px!important;min-height:58px!important}
      .result-card.has-last-played .campaign-description.desc-lines-4{height:68px!important;min-height:68px!important}
      .result-card.has-last-played .last-played-inline{height:46px!important;min-height:46px!important;max-height:46px!important;flex-basis:46px!important;margin-top:5px!important}
    }
  `;
  document.head.appendChild(s);

  function autoHeight(textarea){
    if(!textarea)return;
    textarea.style.height='auto';
    textarea.style.height=Math.max(50,textarea.scrollHeight)+'px';
  }

  function getLineCount(desc){
    if(!desc)return 1;
    const text=(desc.textContent||'').trim();
    if(!text)return 1;
    const cs=getComputedStyle(desc);
    const clone=document.createElement('div');
    clone.textContent=text;
    Object.assign(clone.style,{
      position:'fixed',visibility:'hidden',pointerEvents:'none',left:'-10000px',top:'0',
      width:Math.max(40,desc.clientWidth-24)+'px',fontFamily:cs.fontFamily,
      fontSize:'12px',fontWeight:'800',lineHeight:'14.16px',whiteSpace:'normal',
      overflowWrap:'anywhere',padding:'0',border:'0',boxSizing:'border-box'
    });
    document.body.appendChild(clone);
    const lines=Math.max(1,Math.ceil((clone.scrollHeight-.5)/14.16));
    clone.remove();
    return Math.min(4,lines);
  }

  function harmonizeDrawCard(){
    const card=document.querySelector('#res .result-card.has-last-played');
    const desc=card&&card.querySelector('.campaign-description');
    if(!card||!desc)return;

    /* Efface tout réglage inline laissé par les anciens patches. */
    ['font-size','line-height','padding-top','padding-bottom','height','min-height'].forEach(p=>desc.style.removeProperty(p));
    desc.classList.remove('desc-lines-1','desc-lines-2','desc-lines-3','desc-lines-4');

    requestAnimationFrame(()=>{
      desc.classList.add('desc-lines-'+getLineCount(desc));

      /* Si un cas extrême déborde encore, la photo absorbe l'écart avant toute autre chose. */
      requestAnimationFrame(()=>{
        const image=card.querySelector(':scope>img,:scope>.photo-fallback');
        if(!image)return;
        let guard=0;
        while(card.scrollHeight>card.clientHeight+1&&image.getBoundingClientRect().height>125&&guard<30){
          const h=image.getBoundingClientRect().height-2;
          image.style.setProperty('flex','0 0 '+h+'px','important');
          image.style.setProperty('height',h+'px','important');
          guard++;
        }
      });
    });
  }

  function renameCurrentDrawnCampaign(){
    const title=document.querySelector('#res .result-card.has-last-played .rname');
    if(!title||title.dataset.renameReady)return;
    title.dataset.renameReady='1';
    title.onclick=e=>{
      e.stopPropagation();
      const campaign=(LP&&C.find(c=>String(c.id)===String(LP.id)))||C.find(c=>c.name===title.textContent.trim());
      if(!campaign)return;
      const original=campaign.name||title.textContent.trim();
      const input=document.createElement('input');
      input.type='text';
      input.className='draw-title-editor';
      input.value=original;
      title.replaceChildren(input);
      input.focus();
      input.select();
      let done=false;
      const finish=saveIt=>{
        if(done)return;
        done=true;
        const value=input.value.trim();
        if(saveIt&&value){
          campaign.name=value;
          if(LP&&String(LP.id)===String(campaign.id)){
            LP.name=value;
            localStorage.setItem(LPK,JSON.stringify(LP));
          }
          save();
          title.textContent=value;
        }else title.textContent=original;
        title.dataset.renameReady='';
        renameCurrentDrawnCampaign();
        harmonizeDrawCard();
      };
      input.addEventListener('keydown',ev=>{
        if(ev.key==='Enter'){ev.preventDefault();finish(true)}
        if(ev.key==='Escape'){ev.preventDefault();finish(false)}
      });
      input.addEventListener('blur',()=>finish(true),{once:true});
    };
  }

  /* Remplace complètement les anciens calculs de v88/v89. */
  fitDescription=function(){
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      harmonizeDrawCard();
      renameCurrentDrawnCampaign();
    }));
  };

  const previousKept=kept;
  function enhanceKept(){
    const root=document.getElementById('kl');
    if(!root)return;
    root.querySelectorAll('.rename-campaign').forEach(b=>b.remove());
    root.querySelectorAll('.item').forEach(item=>{
      const campaign=C.find(c=>String(c.id)===String(item.dataset.id));
      if(!campaign)return;
      const main=item.querySelector('.main');
      const name=main&&main.querySelector('.name');
      const det=item.querySelector('.det');
      const grid=det&&det.querySelector('.grid');
      if(!name||!det||!grid)return;
      const oldLine=name.closest('.campaign-name-line');
      if(oldLine){oldLine.parentNode.insertBefore(name,oldLine);oldLine.remove()}
      let editor=det.querySelector('.campaign-name-edit');
      if(!editor){
        const block=document.createElement('div');
        block.className='campaign-name-block';
        block.innerHTML=`<div class="dlab">Nom de la campagne</div><textarea class="campaign-name-edit" rows="1">${E(campaign.name||'')}</textarea>`;
        det.insertBefore(block,grid);
        editor=block.querySelector('.campaign-name-edit');
      }
      autoHeight(editor);
      if(!editor.dataset.heightReady){
        editor.dataset.heightReady='1';
        editor.addEventListener('input',()=>autoHeight(editor));
      }
      name.onclick=e=>{
        if(!item.classList.contains('open'))return;
        e.stopPropagation();
        editor.value=campaign.name||'';
        autoHeight(editor);
        editor.focus({preventScroll:true});
        editor.setSelectionRange(0,editor.value.length);
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
  kept=function(){previousKept();enhanceKept()};

  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    if(document.getElementById('k')?.classList.contains('on'))kept();
    harmonizeDrawCard();
    renameCurrentDrawnCampaign();
  }));
  window.addEventListener('resize',harmonizeDrawCard);
})();
