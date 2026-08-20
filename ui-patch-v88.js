(()=>{
  const HEADER_OFFSET_KEY='l4d2_header_status_offset_v1';
  const STEAM_SIZE=44;
  const LAST_TILE_HEIGHT=46;

  function fitCampaignTitle(card){
    const title=card&&card.querySelector('.rname');
    if(!title)return;

    title.style.removeProperty('font-size');
    title.style.setProperty('white-space','nowrap','important');
    title.style.setProperty('overflow','visible','important');
    title.style.setProperty('text-overflow','clip','important');
    title.style.setProperty('max-width','100%','important');

    requestAnimationFrame(()=>{
      let size=parseFloat(getComputedStyle(title).fontSize)||27;
      let guard=0;
      while(title.scrollWidth>title.clientWidth+1&&size>12&&guard<40){
        size=Math.max(12,size-.5);
        title.style.setProperty('font-size',size+'px','important');
        guard++;
      }
    });
  }

  function lowerLastTile(card){
    const tile=card&&card.querySelector('.last-played-inline');
    if(!card||!tile)return;
    tile.style.setProperty('transform','none','important');
  }

  fitDescription=function(){
    const card=document.querySelector('#res .result-card');
    const d=card&&card.querySelector('.campaign-description');
    if(!card||!d)return;

    fitCampaignTitle(card);
    d.style.removeProperty('padding-top');
    d.style.removeProperty('padding-bottom');

    const reference=card.querySelector('.last-played-copy span');
    const baseSize=reference?(parseFloat(getComputedStyle(reference).fontSize)||11.5):11.5;

    d.style.fontFamily='inherit';
    d.style.setProperty('font-size',baseSize+'px','important');
    d.style.setProperty('line-height','1.15','important');
    d.style.fontWeight='900';

    requestAnimationFrame(()=>{
      const cs=getComputedStyle(d);
      const lh=parseFloat(cs.lineHeight)||baseSize*1.15;
      const pad=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);
      const contentHeight=Math.max(lh,d.scrollHeight-pad);
      const lines=Math.max(1,Math.ceil((contentHeight-.5)/lh));

      if(lines===2){
        d.style.setProperty('font-size',Math.max(7,baseSize-.75)+'px','important');
        d.style.setProperty('line-height','1.18','important');
        d.style.fontWeight='800';
        d.style.setProperty('padding-top','12px','important');
        d.style.setProperty('padding-bottom','12px','important');
      }else if(lines===3){
        d.style.setProperty('font-size',Math.max(7,baseSize-1.5)+'px','important');
        d.style.setProperty('line-height','1.17','important');
        d.style.fontWeight='780';
        d.style.setProperty('padding-top','12.5px','important');
        d.style.setProperty('padding-bottom','12.5px','important');
      }else if(lines>=4){
        d.style.setProperty('font-size',Math.max(7,baseSize-2.25)+'px','important');
        d.style.setProperty('line-height','1.15','important');
        d.style.fontWeight='750';
        d.style.setProperty('padding-top','13px','important');
        d.style.setProperty('padding-bottom','13px','important');
      }

      requestAnimationFrame(()=>{
        const res=document.getElementById('res');
        if(!res)return;
        let size=parseFloat(getComputedStyle(d).fontSize)||baseSize;
        let guard=0;
        while(card.getBoundingClientRect().bottom>res.getBoundingClientRect().bottom-1&&size>7&&guard<24){
          size=Math.max(7,size-.25);
          d.style.setProperty('font-size',size+'px','important');
          d.style.setProperty('line-height','1.12','important');
          guard++;
        }
        lowerLastTile(card);
      });
    });
  };

  const s=document.createElement('style');
  s.textContent=`
    .result-card.has-last-played .result-content{gap:0!important;padding-top:10.8px!important}
    .result-card.has-last-played .meta{margin:0!important}
    .result-card.has-last-played .campaign-description{margin:0!important}
    .result-card.has-last-played .meta + .campaign-description{margin-top:4.5px!important}
    .result-card.has-last-played .campaign-description + .last-played-inline{margin-top:4.5px!important}
    .result-card.has-last-played .last-played-inline{margin-left:0!important;margin-right:0!important;margin-bottom:0!important;flex:0 0 ${LAST_TILE_HEIGHT}px!important;position:relative!important;grid-template-columns:minmax(0,1fr)!important;align-items:center!important;height:${LAST_TILE_HEIGHT}px!important;min-height:${LAST_TILE_HEIGHT}px!important;max-height:${LAST_TILE_HEIGHT}px!important;padding:1px 58px 1px 9px!important;box-sizing:border-box!important;overflow:visible!important;will-change:transform}
    .result-card.has-last-played .last-played-copy{align-self:center!important;line-height:1.05!important}
    .result-card.has-last-played .rhead{min-height:${STEAM_SIZE}px!important;height:${STEAM_SIZE}px!important;margin:0 0 10.8px!important;display:flex!important;align-items:center!important;padding-left:50px!important;padding-right:50px!important}
    .result-card.has-last-played .rname{display:flex!important;align-items:center!important;justify-content:center!important;min-height:${STEAM_SIZE}px!important;line-height:1.05!important;min-width:0!important;width:100%!important}
    .result-card.has-last-played .rhead .wk,.result-card.has-last-played .last-played-steam{width:${STEAM_SIZE}px!important;height:${STEAM_SIZE}px!important;min-width:${STEAM_SIZE}px!important;min-height:${STEAM_SIZE}px!important;flex:0 0 ${STEAM_SIZE}px!important;padding:0!important;border-radius:50%!important}
    .result-card.has-last-played .rhead .wk{top:50%!important;right:0!important;transform:translateY(-50%)!important}
    .result-card.has-last-played .last-played-steam{position:absolute!important;right:10px!important;top:50%!important;transform:translateY(-50%)!important;margin:0!important}
    .result-card.has-last-played .rhead .wk img,.result-card.has-last-played .last-played-steam img{display:block!important;width:${STEAM_SIZE}px!important;height:${STEAM_SIZE}px!important;min-width:${STEAM_SIZE}px!important;max-width:${STEAM_SIZE}px!important;min-height:${STEAM_SIZE}px!important;max-height:${STEAM_SIZE}px!important;object-fit:contain!important;border-radius:50%!important}
    .draw .header-status{touch-action:none;user-select:none;-webkit-user-select:none;cursor:ns-resize}
    .draw .res:not(.home-res){padding-top:4px!important}
    .draw .res:not(.home-res) .result-card{transform:none!important;margin-top:0!important}
    @media(max-width:420px){.draw .res:not(.home-res){padding-top:3px!important}}
    @media(max-height:720px){.result-card.has-last-played .result-content{padding-top:8px!important}.result-card.has-last-played .rhead{margin-bottom:8px!important}.result-card.has-last-played .meta + .campaign-description{margin-top:3px!important}.result-card.has-last-played .campaign-description + .last-played-inline{margin-top:3px!important}.draw .res:not(.home-res){padding-top:2px!important}}
  `;
  document.head.appendChild(s);

  function getHeaderOffset(){
    const n=parseFloat(localStorage.getItem(HEADER_OFFSET_KEY)||'0');
    return Number.isFinite(n)?Math.max(-40,Math.min(40,n)):0;
  }

  function applyHeaderOffset(){
    const status=document.querySelector('.draw .header-status');
    if(!status)return;
    const offset=getHeaderOffset();
    status.style.setProperty('top','50%','important');
    status.style.setProperty('transform',`translateY(calc(-50% + ${offset}px))`,'important');
  }

  function enableHeaderDrag(){
    const status=document.querySelector('.draw .header-status');
    if(!status||status.dataset.dragReady)return;
    status.dataset.dragReady='1';
    status.title='Faire glisser verticalement pour régler la position';

    let startY=0;
    let startOffset=0;
    let dragging=false;

    status.addEventListener('pointerdown',e=>{
      if(e.target.closest('button,a'))return;
      startY=e.clientY;
      startOffset=getHeaderOffset();
      dragging=true;
      try{status.setPointerCapture(e.pointerId)}catch{}
    });

    status.addEventListener('pointermove',e=>{
      if(!dragging)return;
      const next=Math.max(-40,Math.min(40,startOffset+(e.clientY-startY)));
      localStorage.setItem(HEADER_OFFSET_KEY,String(Math.round(next*10)/10));
      applyHeaderOffset();
    });

    const stop=e=>{
      if(!dragging)return;
      dragging=false;
      try{status.releasePointerCapture(e.pointerId)}catch{}
    };
    status.addEventListener('pointerup',stop);
    status.addEventListener('pointercancel',stop);

    status.addEventListener('dblclick',e=>{
      if(e.target.closest('button,a'))return;
      localStorage.removeItem(HEADER_OFFSET_KEY);
      applyHeaderOffset();
    });
  }

  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    applyHeaderOffset();
    enableHeaderDrag();
    fitDescription();
  }));

  window.addEventListener('resize',()=>{
    applyHeaderOffset();
    fitDescription();
    const card=document.querySelector('#res .result-card');
    if(card)lowerLastTile(card);
  });
})();

(()=>{
  const scripts=[
    ['/ui-patch-v89.js','20260814-89'],
    ['/ui-patch-v90.js','20260814-95'],
    ['/ui-patch-v91.js','20260814-96'],
    ['/ui-patch-v92.js','20260815-94']
  ];
  let chain=Promise.resolve();
  scripts.forEach(([src,v])=>{
    chain=chain.then(()=>new Promise(resolve=>{
      if(document.querySelector(`script[src^="${src}"]`))return resolve();
      const s=document.createElement('script');
      s.src=`${src}?v=${v}`;
      s.onload=s.onerror=resolve;
      document.body.appendChild(s);
    }));
  });
})();
