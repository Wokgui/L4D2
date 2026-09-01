(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    /* Le titre réserve une ou deux lignes dans la zone réellement libre entre les boutons. */
    html body .app .draw .res:not(.home-res) .result-card .rhead{
      --draw-title-inset:70px;
      position:relative!important;
      box-sizing:border-box!important;
      height:auto!important;
      min-height:54px!important;
      max-height:none!important;
      padding-top:6px!important;
      padding-bottom:6px!important;
      padding-left:var(--draw-title-inset)!important;
      padding-right:var(--draw-title-inset)!important;
      align-items:center!important;
    }
    html body .app .draw .res:not(.home-res) .result-card .rname{
      display:block!important;
      flex:1 1 0!important;
      width:auto!important;
      min-width:0!important;
      max-width:100%!important;
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

  function reserveActionSpace(title){
    const head=title&&title.closest('.rhead');
    if(!head)return;

    const headRect=head.getBoundingClientRect();
    let leftUsed=0;
    let rightUsed=0;

    head.querySelectorAll('.draw-kept-edit,.draw-previous-icon').forEach(control=>{
      const rect=control.getBoundingClientRect();
      if(rect.width>0)leftUsed=Math.max(leftUsed,rect.right-headRect.left);
    });

    const workshop=head.querySelector('.wk');
    if(workshop){
      const rect=workshop.getBoundingClientRect();
      if(rect.width>0)rightUsed=Math.max(rightUsed,headRect.right-rect.left);
    }

    /* On réserve la même marge des deux côtés : le titre reste centré et ne passe jamais sous une icône. */
    const inset=Math.max(50,Math.ceil(Math.max(leftUsed,rightUsed)+6));
    head.style.setProperty('--draw-title-inset',inset+'px');
  }

  function fitTitle(title){
    if(!title)return;

    reserveActionSpace(title);
    title.style.setProperty('flex','1 1 0','important');
    title.style.setProperty('width','auto','important');
    title.style.setProperty('min-width','0','important');
    title.style.setProperty('max-width','100%','important');
    title.style.setProperty('white-space','normal','important');
    title.style.setProperty('overflow','hidden','important');

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
      lineHeight:'1.05',
      textAlign:'center'
    });
    clone.style.textWrap='balance';
    document.body.appendChild(clone);

    let guard=0;
    while(guard<40){
      clone.style.fontSize=size+'px';
      const lineHeight=size*1.05;
      if(clone.scrollHeight<=lineHeight*2+1||size<=13.5)break;
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
