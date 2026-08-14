(()=>{
  const s=document.createElement('style');
  s.textContent=`
    .draw .selector-card{margin:5px 0 7px!important;padding:11px 12px 12px!important}
    .draw .selector-card .selector-title{margin:0 0 9px!important}
    .draw .selector-card .filter-row{margin:4px 0!important}
    .draw .selector-card .drawbtn{margin:8px auto 2px!important;min-height:44px!important;padding:9px 18px!important}

    .draw .res:not(.home-res){padding-top:3px!important;padding-bottom:12px!important;overflow:hidden!important}
    .draw .res:not(.home-res) .result-card.has-last-played{width:100%!important;height:100%!important;min-height:0!important;max-height:100%!important;margin:0!important;align-self:stretch!important;overflow:hidden!important;display:flex!important;flex-direction:column!important}

    .draw .result-card.has-last-played>img,.draw .result-card.has-last-played>.photo-fallback{flex:0 0 clamp(190px,27dvh,260px)!important;width:100%!important;height:clamp(190px,27dvh,260px)!important;min-height:190px!important;max-height:260px!important;object-fit:cover!important}

    .result-card.has-last-played .result-content{flex:1 1 auto!important;min-height:0!important;padding:10px 13px 14px!important;gap:0!important;display:flex!important;flex-direction:column!important;box-sizing:border-box!important}

    .result-card.has-last-played .rhead{position:relative!important;min-height:64px!important;height:auto!important;margin:0 0 10px!important;padding:8px 56px!important;display:flex!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important}
    .result-card.has-last-played .rname{width:100%!important;min-width:0!important;min-height:48px!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;font-size:clamp(20px,5.6vw,28px)!important;line-height:1.06!important;font-weight:900!important;cursor:text;text-decoration:none!important;border:0!important}
    .result-card.has-last-played .rhead .wk{position:absolute!important;right:4px!important;top:50%!important;transform:translateY(-50%)!important;width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important;padding:0!important;border-radius:50%!important}
    .result-card.has-last-played .rhead .wk img{width:44px!important;height:44px!important;max-height:44px!important;border-radius:50%!important;object-fit:contain!important}

    .result-card.has-last-played .meta{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:7px!important;margin:0!important}
    .result-card.has-last-played .meta span{min-height:54px!important;padding:7px 4px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important}

    .result-card.has-last-played .campaign-description{display:flex!important;-webkit-box-orient:unset!important;-webkit-line-clamp:unset!important;align-items:center!important;justify-content:center!important;text-align:center!important;white-space:normal!important;overflow:hidden!important;overflow-wrap:anywhere!important;margin:8px 0 0!important;padding:9px 14px!important;border-radius:12px!important;box-sizing:border-box!important;font-family:inherit!important;font-weight:800!important;line-height:1.2!important;color:#343a33!important}
    .result-card.has-last-played .campaign-description.desc-lines-1{min-height:62px!important;font-size:12px!important}
    .result-card.has-last-played .campaign-description.desc-lines-2{min-height:78px!important;font-size:11.5px!important}
    .result-card.has-last-played .campaign-description.desc-lines-3{min-height:90px!important;font-size:11px!important}

    .result-card.has-last-played .last-played-inline{position:relative!important;flex:0 0 auto!important;min-height:54px!important;height:auto!important;max-height:none!important;margin:8px 0 0!important;padding:6px 58px 6px 10px!important;display:flex!important;align-items:center!important;overflow:visible!important;box-sizing:border-box!important}
    .result-card.has-last-played .last-played-copy{min-width:0!important;display:flex!important;flex-direction:column!important;justify-content:center!important;line-height:1.08!important}
    .result-card.has-last-played .last-played-steam{position:absolute!important;right:9px!important;top:50%!important;transform:translateY(-50%)!important;width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;padding:0!important;border-radius:50%!important}
    .result-card.has-last-played .last-played-steam img{width:42px!important;height:42px!important;max-height:42px!important;border-radius:50%!important;object-fit:contain!important}

    #k .rename-campaign{display:none!important}
    #k .item .name,#k .item.open .name{text-decoration:none!important;border:0!important;outline:0!important;cursor:default!important}
    #k .item.open .name{cursor:text!important}
    #k .campaign-name-block{margin:0 0 10px!important}
    #k .campaign-name-block .dlab{margin-top:0!important}
    #k .campaign-name-edit{width:100%!important;min-height:50px!important;height:auto!important;resize:none!important;overflow:hidden!important;white-space:pre-wrap!important;overflow-wrap:anywhere!important;padding:10px 11px!important;box-sizing:border-box!important;font:inherit!important;font-size:16px!important;line-height:1.25!important;font-weight:900!important}

    .draw-title-editor{width:100%!important;min-width:0!important;border:0!important;outline:0!important;background:transparent!important;padding:0!important;margin:0!important;text-align:center!important;color:var(--i)!important;font:inherit!important;font-size:clamp(20px,5.6vw,28px)!important;line-height:1.06!important;font-weight:900!important;box-shadow:none!important}

    @media(max-height:720px){
      .draw .selector-card{padding:8px 10px 9px!important;margin:3px 0 5px!important}
      .draw .selector-card .selector-title{margin-bottom:6px!important}
      .draw .selector-card .drawbtn{margin-top:5px!important;min-height:38px!important;padding:7px 16px!important}
      .draw .res:not(.home-res){padding-bottom:8px!important}
      .draw .result-card.has-last-played>img,.draw .result-card.has-last-played>.photo-fallback{flex-basis:clamp(160px,24dvh,210px)!important;height:clamp(160px,24dvh,210px)!important;min-height:160px!important;max-height:210px!important}
      .result-card.has-last-played .result-content{padding:7px 10px 10px!important}
      .result-card.has-last-played .rhead{min-height:54px!important;padding:5px 52px!important;margin-bottom:7px!important}
      .result-card.has-last-played .meta span{min-height:48px!important;padding:5px 3px!important}
      .result-card.has-last-played .campaign-description{margin-top:6px!important;padding:7px 10px!important}
      .result-card.has-last-played .campaign-description.desc-lines-1{min-height:52px!important}
      .result-card.has-last-played .campaign-description.desc-lines-2{min-height:66px!important}
      .result-card.has-last-played .campaign-description.desc-lines-3{min-height:76px!important}
      .result-card.has-last-played .last-played-inline{min-height:48px!important;margin-top:6px!important;padding-top:4px!important;padding-bottom:4px!important}
    }
  `;
  document.head.appendChild(s);

  function autoHeight(textarea){if(!textarea)return;textarea.style.height='auto';textarea.style.height=Math.max(50,textarea.scrollHeight)+'px'}

  function measureDescription(desc){
    if(!desc)return 1;
    const cs=getComputedStyle(desc),clone=document.createElement('div');
    clone.textContent=desc.textContent||'';
    Object.assign(clone.style,{position:'fixed',visibility:'hidden',pointerEvents:'none',left:'-10000px',top:'0',width:Math.max(40,desc.clientWidth-28)+'px',fontFamily:cs.fontFamily,fontSize:cs.fontSize,fontWeight:cs.fontWeight,lineHeight:cs.lineHeight,whiteSpace:'normal',overflowWrap:'anywhere',padding:'0',border:'0'});
    document.body.appendChild(clone);
    const lh=parseFloat(cs.lineHeight)||14,lines=Math.max(1,Math.ceil((clone.getBoundingClientRect().height-.5)/lh));
    clone.remove();
    return Math.min(3,lines);
  }

  function harmonizeDrawCard(){
    const card=document.querySelector('#res .result-card.has-last-played'),desc=card&&card.querySelector('.campaign-description');
    if(!card||!desc)return;
    desc.classList.remove('desc-lines-1','desc-lines-2','desc-lines-3');
    requestAnimationFrame(()=>{
      desc.classList.add('desc-lines-'+measureDescription(desc));
      requestAnimationFrame(()=>{
        let size=parseFloat(getComputedStyle(desc).fontSize)||12,guard=0;
        while(card.scrollHeight>card.clientHeight+1&&size>8.5&&guard<20){size=Math.max(8.5,size-.25);desc.style.setProperty('font-size',size+'px','important');guard++}
      });
    });
  }

  function renameCurrentDrawnCampaign(){
    const title=document.querySelector('#res .result-card.has-last-played .rname');
    if(!title||title.dataset.renameReady)return;
    title.dataset.renameReady='1';
    title.onclick=e=>{
      e.stopPropagation();
      const currentName=title.textContent.trim();
      const campaign=C.find(c=>c.name===currentName)||(LP&&C.find(c=>String(c.id)===String(LP.id)));
      if(!campaign)return;
      const input=document.createElement('input');
      input.type='text';input.className='draw-title-editor';input.value=campaign.name||currentName;
      title.replaceChildren(input);input.focus();input.select();
      let done=false;
      const finish=saveIt=>{
        if(done)return;done=true;
        const value=input.value.trim();
        if(saveIt&&value){campaign.name=value;if(LP&&String(LP.id)===String(campaign.id)){LP.name=value;localStorage.setItem(LPK,JSON.stringify(LP))}save();title.textContent=value}else title.textContent=campaign.name||currentName;
        title.dataset.renameReady='';renameCurrentDrawnCampaign();harmonizeDrawCard();
      };
      input.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();finish(true)}if(ev.key==='Escape'){ev.preventDefault();finish(false)}});
      input.addEventListener('blur',()=>finish(true),{once:true});
    };
  }

  const previousFit=typeof fitDescription==='function'?fitDescription:null;
  if(previousFit){fitDescription=function(){previousFit();requestAnimationFrame(()=>{harmonizeDrawCard();renameCurrentDrawnCampaign()})}}

  const previousKept=kept;
  function enhanceKept(){
    const root=document.getElementById('kl');if(!root)return;
    root.querySelectorAll('.rename-campaign').forEach(b=>b.remove());
    root.querySelectorAll('.item').forEach(item=>{
      const campaign=C.find(c=>String(c.id)===String(item.dataset.id));if(!campaign)return;
      const main=item.querySelector('.main'),name=main&&main.querySelector('.name'),det=item.querySelector('.det'),grid=det&&det.querySelector('.grid');if(!name||!det||!grid)return;
      const oldLine=name.closest('.campaign-name-line');if(oldLine){oldLine.parentNode.insertBefore(name,oldLine);oldLine.remove()}
      let editor=det.querySelector('.campaign-name-edit');
      if(!editor){const block=document.createElement('div');block.className='campaign-name-block';block.innerHTML=`<div class="dlab">Nom de la campagne</div><textarea class="campaign-name-edit" rows="1">${E(campaign.name||'')}</textarea>`;det.insertBefore(block,grid);editor=block.querySelector('.campaign-name-edit')}
      autoHeight(editor);
      if(!editor.dataset.heightReady){editor.dataset.heightReady='1';editor.addEventListener('input',()=>autoHeight(editor))}
      name.onclick=e=>{if(!item.classList.contains('open'))return;e.stopPropagation();editor.value=campaign.name||'';autoHeight(editor);editor.focus({preventScroll:true});editor.setSelectionRange(0,editor.value.length);editor.scrollIntoView({behavior:'smooth',block:'center'})};
      const saveButton=item.querySelector('.sv');
      if(saveButton&&!saveButton.dataset.nameSaveReady){saveButton.dataset.nameSaveReady='1';saveButton.addEventListener('click',event=>{const current=C.find(c=>String(c.id)===String(item.dataset.id));if(!current)return;const value=editor.value.trim();if(!value){event.preventDefault();event.stopImmediatePropagation();alert('Le nom de la campagne ne peut pas être vide.');return}current.name=value;if(LP&&String(LP.id)===String(current.id)){LP.name=value;localStorage.setItem(LPK,JSON.stringify(LP))}},true)}
    });
  }
  kept=function(){previousKept();enhanceKept()};

  requestAnimationFrame(()=>requestAnimationFrame(()=>{if(document.getElementById('k')?.classList.contains('on'))kept();harmonizeDrawCard();renameCurrentDrawnCampaign()}));
  window.addEventListener('resize',harmonizeDrawCard);
})();
