(()=>{
  fitDescription=function(){
    const d=document.querySelector('#res .campaign-description');
    if(!d)return;

    /* Même taille que le nom de la dernière campagne (ex. « Lost ») sur une ligne. */
    const reference=document.querySelector('#res .last-played-copy span');
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
      }else if(lines===3){
        d.style.setProperty('font-size',Math.max(7,baseSize-1.5)+'px','important');
        d.style.setProperty('line-height','1.17','important');
        d.style.fontWeight='780';
      }else if(lines>=4){
        d.style.setProperty('font-size',Math.max(7,baseSize-2.25)+'px','important');
        d.style.setProperty('line-height','1.15','important');
        d.style.fontWeight='750';
      }
    });
  };

  const s=document.createElement('style');
  s.textContent=`
    .result-card.has-last-played .result-content{gap:6px!important}
    .result-card.has-last-played .meta{margin:0!important}
    .result-card.has-last-played .campaign-description{margin:0!important}
    .result-card.has-last-played .last-played-inline{margin:0!important}

    /* Le bloc tiré commence exactement au même niveau que la photo d'accueil. */
    .draw .res:not(.home-res){padding-top:4px!important}
    .draw .res:not(.home-res) .result-card{transform:none!important;margin-top:0!important}

    @media(max-width:420px){
      .draw .res:not(.home-res){padding-top:3px!important}
    }

    @media(max-height:720px){
      .result-card.has-last-played .result-content{gap:5px!important}
      .result-card.has-last-played .meta{margin:0!important}
      .result-card.has-last-played .campaign-description{margin:0!important}
      .result-card.has-last-played .last-played-inline{margin:0!important}
      .draw .res:not(.home-res){padding-top:2px!important}
    }
  `;
  document.head.appendChild(s);

  function alignHeaderStatus(){
    const title=document.querySelector('.draw .title');
    const icon=title&&title.querySelector('.title-icon');
    const status=title&&title.querySelector('.header-status');
    if(!title||!icon||!status)return;

    status.style.setProperty('transform','none','important');
    status.style.setProperty('top','0px','important');

    requestAnimationFrame(()=>{
      const tr=title.getBoundingClientRect();
      const ir=icon.getBoundingClientRect();
      const sr=status.getBoundingClientRect();
      /* +6 px : centrage optique constaté sur l'écran mobile, le bloc paraissait trop haut. */
      const top=(ir.top-tr.top)+(ir.height-sr.height)/2+6;
      status.style.setProperty('top',(Math.round(top*10)/10)+'px','important');
    });
  }

  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    alignHeaderStatus();
    fitDescription();
  }));
  window.addEventListener('resize',()=>{
    alignHeaderStatus();
    fitDescription();
  });

  if('ResizeObserver' in window){
    const title=document.querySelector('.draw .title');
    const icon=title&&title.querySelector('.title-icon');
    const status=title&&title.querySelector('.header-status');
    if(icon&&status){
      const ro=new ResizeObserver(alignHeaderStatus);
      ro.observe(icon);
      ro.observe(status);
    }
  }
})();
