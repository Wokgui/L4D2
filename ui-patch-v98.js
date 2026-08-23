(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    /* Le titre réserve naturellement une ou deux lignes et pousse la suite vers le bas. */
    html body .app .draw .res:not(.home-res) .result-card .rhead{
      height:auto!important;
      min-height:54px!important;
      max-height:none!important;
      padding-top:6px!important;
      padding-bottom:6px!important;
      align-items:center!important;
    }
    html body .app .draw .res:not(.home-res) .result-card .rname{
      display:block!important;
      min-height:0!important;
      max-height:2.1em!important;
      overflow:hidden!important;
      overflow-wrap:anywhere!important;
      white-space:normal!important;
      text-overflow:clip!important;
      text-align:center!important;
      text-wrap:balance;
      font-size:var(--draw-title-font-size,clamp(19px,5.3vw,27px))!important;
      line-height:1.05!important;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
    @media(max-height:720px){
      html body .app .draw .res:not(.home-res) .result-card .rhead{
        min-height:48px!important;
        padding-top:4px!important;
        padding-bottom:4px!important;
      }
    }
  `;
  document.head.appendChild(style);

  function fitTitle(title){
    if(!title)return;
    const width=Math.max(40,title.clientWidth);
    let size=Math.min(27,Math.max(19,window.innerWidth*0.053));
    const clone=document.createElement('div');
    clone.textContent=title.textContent||'';
    Object.assign(clone.style,{
      position:'fixed',
      visibility:'hidden',
      pointerEvents:'none',
      left:'-10000px',
      top:'0',
      width:width+'px',
      padding:'0',
      border:'0',
      boxSizing:'border-box',
      whiteSpace:'normal',
      overflowWrap:'anywhere',
      fontFamily:getComputedStyle(title).fontFamily,
      fontWeight:'900',
      lineHeight:'1.05'
    });
    document.body.appendChild(clone);
    let guard=0;
    while(guard<32){
      clone.style.fontSize=size+'px';
      const lineHeight=size*1.05;
      if(clone.scrollHeight<=lineHeight*2+1||size<=14)break;
      size-=0.5;
      guard++;
    }

    const lineHeight=size*1.05;
    const isTwoLines=clone.scrollHeight>lineHeight+1;
    clone.remove();

    const value=size+'px';
    if(title.style.getPropertyValue('font-size')!==value||title.style.getPropertyPriority('font-size')!=='important'){
      title.style.setProperty('font-size',value,'important');
    }
    title.closest('.rhead')?.classList.toggle('draw-title-two-lines',isTwoLines);
  }

  function fitDescriptionBox(desc){
    if(!desc)return;
    desc.style.removeProperty('font-size');
    let size=parseFloat(getComputedStyle(desc).fontSize)||11.5;
    let guard=0;
    while(desc.scrollHeight>desc.clientHeight+1&&size>8&&guard<20){
      size-=0.25;
      desc.style.setProperty('font-size',size+'px','important');
      guard++;
    }
  }

  function fitDrawText(){
    const card=document.querySelector('#res .result-card');
    if(!card)return;
    fitTitle(card.querySelector('.rname'));
    fitDescriptionBox(card.querySelector('.campaign-description'));
  }

  /* Tout est mesuré dans le même rendu que l'insertion : aucun état intermédiaire visible. */
  window.fitDescription=fitDrawText;
  fitDrawText();

  const result=document.getElementById('res');
  if(result){
    let queued=false;
    new MutationObserver(records=>{
      const relevant=records.some(record=>record.type!=='attributes'||record.target.classList?.contains('rname'));
      if(!relevant)return;
      if(queued)return;
      queued=true;
      queueMicrotask(()=>{
        queued=false;
        fitDrawText();
      });
    }).observe(result,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['style']});
  }
  window.addEventListener('resize',fitDrawText,{passive:true});
})();
