(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    /* Steam v124 : logo retracé depuis l'image fournie, sans fond ni anneau ajouté. */
    html body .app .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon,
    html body .app .draw .res.home-res .welcome-actions .news .welcome-steam-icon{
      position:relative!important;
      display:grid!important;
      place-items:center!important;
      box-sizing:border-box!important;
      padding:0!important;
      background:none!important;
      border-radius:50%!important;
      overflow:visible!important;
      contain:none!important;
      clip-path:none!important;
    }
    html body .app .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon>img,
    html body .app .draw .res.home-res .welcome-actions .news .welcome-steam-icon>img{
      position:static!important;
      left:auto!important;
      top:auto!important;
      inset:auto!important;
      display:block!important;
      visibility:visible!important;
      width:100%!important;
      height:100%!important;
      min-width:0!important;
      min-height:0!important;
      max-width:100%!important;
      max-height:100%!important;
      margin:0!important;
      padding:0!important;
      transform:none!important;
      object-fit:contain!important;
      object-position:center!important;
      border:0!important;
      border-radius:50%!important;
      background:transparent!important;
      z-index:1!important;
    }
    html body .app .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon:after,
    html body .app .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
      z-index:3!important;
    }

    /* Chat v126 : option C, uniquement une bulle de discussion verte. */
    html body .app .draw .title .steam-chat-top{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      transform:translate(-50%,-50%)!important;
      width:26px!important;
      height:26px!important;
      min-width:26px!important;
      min-height:26px!important;
      max-width:26px!important;
      max-height:26px!important;
      padding:0!important;
      display:grid!important;
      place-items:center!important;
      border:0!important;
      border-radius:50%!important;
      background:var(--g)!important;
      color:var(--g)!important;
      text-decoration:none!important;
      box-shadow:none!important;
      overflow:hidden!important;
      transition:none!important;
      animation:none!important;
      -webkit-tap-highlight-color:transparent!important;
    }
    html body .app .draw .title .steam-chat-top>img,
    html body .app .draw .title .steam-chat-top .steam-chat-glyph,
    html body .app .draw .title .steam-chat-top .steam-chat-badge{
      display:none!important;
    }
    html body .app .draw .title .steam-chat-top:before{
      content:""!important;
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      width:15px!important;
      height:11px!important;
      transform:translate(-50%,-52%)!important;
      background:#fff!important;
      border-radius:6px!important;
      clip-path:polygon(0 0,100% 0,100% 76%,58% 76%,39% 100%,40% 76%,0 76%)!important;
      z-index:1!important;
    }
    html body .app .draw .title .steam-chat-top:after{
      content:"•••"!important;
      position:absolute!important;
      left:0!important;
      right:0!important;
      top:8px!important;
      z-index:2!important;
      color:var(--g)!important;
      font-size:5.5px!important;
      font-weight:900!important;
      line-height:1!important;
      letter-spacing:.2px!important;
      text-align:center!important;
    }
    html body .app .draw .title .steam-chat-top:hover,
    html body .app .draw .title .steam-chat-top:focus,
    html body .app .draw .title .steam-chat-top:active{
      transform:translate(-50%,-50%)!important;
      background:var(--g)!important;
      color:var(--g)!important;
      outline:0!important;
    }

    /* Gardées v125 : légèrement plus grand, sans changer la zone tactile. */
    html body #k .wk{
      position:relative!important;
      display:grid!important;
      place-items:center!important;
      box-sizing:border-box!important;
      padding:0!important;
      background:none!important;
      border-radius:50%!important;
      overflow:visible!important;
      contain:none!important;
      clip-path:none!important;
    }
    html body #k .wk>img{
      position:static!important;
      display:block!important;
      visibility:visible!important;
      width:64%!important;
      height:64%!important;
      min-width:0!important;
      min-height:0!important;
      max-width:64%!important;
      max-height:64%!important;
      margin:auto!important;
      padding:0!important;
      transform:none!important;
      object-fit:contain!important;
      object-position:center!important;
      border:0!important;
      border-radius:50%!important;
      background:transparent!important;
    }

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

  function upgradeSteamImages(root=document){
    root.querySelectorAll?.('img[src="/steam-icon.png"],img[src="/steam-icon-fast.svg"],img[src="/steam-icon-user.png"]').forEach(img=>{
      if(img.getAttribute('src')!=='/steam-icon-exact-v124.svg')img.setAttribute('src','/steam-icon-exact-v124.svg');
    });
  }

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
    upgradeSteamImages();
    const card=document.querySelector('#res .result-card');
    if(!card)return;
    fitTitle(card.querySelector('.rname'));
    fitDescriptionBox(card.querySelector('.campaign-description'));
  }

  /* Tout est mesuré dans le même rendu que l'insertion : aucun état intermédiaire visible. */
  window.fitDescription=fitDrawText;
  upgradeSteamImages();
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
        upgradeSteamImages(result);
        fitDrawText();
      });
    }).observe(result,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['style']});
  }

  const kept=document.getElementById('k');
  if(kept){
    new MutationObserver(()=>upgradeSteamImages(kept)).observe(kept,{childList:true,subtree:true});
  }

  window.addEventListener('resize',fitDrawText,{passive:true});
})();
