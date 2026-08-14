(()=>{
  fitDescription=function(){
    const card=document.querySelector('#res .result-card');
    const d=card&&card.querySelector('.campaign-description');
    if(!card||!d)return;

    const content=card.querySelector('.result-content');
    const rhead=card.querySelector('.rhead');
    const titleSteam=card.querySelector('.rhead .wk');
    const lastSteam=card.querySelector('.last-played-steam img');

    /* 10 % de moins au-dessus et au-dessous du titre, sans toucher à la photo. */
    if(content&&rhead&&!content.dataset.titleSpacingCompact){
      const cs=getComputedStyle(content);
      const paddingTop=parseFloat(cs.paddingTop)||0;
      const gap=parseFloat(cs.rowGap)||parseFloat(cs.gap)||0;
      content.style.setProperty('padding-top',(paddingTop*.9)+'px','important');
      if(gap>0)rhead.style.setProperty('margin-bottom',(-gap*.1)+'px','important');
      content.dataset.titleSpacingCompact='1';
    }

    /* L'icône Steam à droite du titre a exactement la taille de celle du bloc du bas. */
    if(titleSteam&&lastSteam){
      const size=lastSteam.getBoundingClientRect().width||parseFloat(getComputedStyle(lastSteam).width)||27;
      titleSteam.style.setProperty('width',size+'px','important');
      titleSteam.style.setProperty('height',size+'px','important');
      titleSteam.style.setProperty('min-width',size+'px','important');
      titleSteam.style.setProperty('flex-basis',size+'px','important');
      const img=titleSteam.querySelector('img');
      if(img){
        img.style.setProperty('width','100%','important');
        img.style.setProperty('height','100%','important');
      }
    }

    /* Même taille que le nom de la dernière campagne sur une ligne. */
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
      }else if(lines===3){
        d.style.setProperty('font-size',Math.max(7,baseSize-1.5)+'px','important');
        d.style.setProperty('line-height','1.17','important');
        d.style.fontWeight='780';
      }else if(lines>=4){
        d.style.setProperty('font-size',Math.max(7,baseSize-2.25)+'px','important');
        d.style.setProperty('line-height','1.15','important');
        d.style.fontWeight='750';
      }

      /* Si le descriptif reste haut, on réduit uniquement son texte : jamais la photo. */
      requestAnimationFrame(()=>{
        let size=parseFloat(getComputedStyle(d).fontSize)||baseSize;
        let guard=0;
        while(card.scrollHeight>card.clientHeight+1&&size>7&&guard<20){
          size=Math.max(7,size-.25);
          d.style.setProperty('font-size',size+'px','important');
          d.style.setProperty('line-height','1.14','important');
          guard++;
        }
      });
    });
  };

  const s=document.createElement('style');
  s.textContent=`
    .result-card.has-last-played .result-content{gap:6px!important}
    .result-card.has-last-played .meta{margin:0!important}
    .result-card.has-last-played .campaign-description{margin:0!important}
    .result-card.has-last-played .last-played-inline{margin:0!important;flex:0 0 auto!important}
    .result-card.has-last-played .rhead .wk{padding:0!important;border-radius:50%!important}

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
    const count=status&&status.querySelector('.count');
    const syncRow=status&&status.querySelector('.sync-row');
    if(!title||!icon||!status||!count||!syncRow)return;

    status.style.setProperty('transform','none','important');
    status.style.setProperty('top','0px','important');

    requestAnimationFrame(()=>{
      const tr=title.getBoundingClientRect();
      const ir=icon.getBoundingClientRect();
      const cr=count.getBoundingClientRect();
      const rr=syncRow.getBoundingClientRect();
      const iconCenter=(ir.top-tr.top)+(ir.height/2);
      const countCenter=(cr.top-tr.top)+(cr.height/2);
      const syncCenter=(rr.top-tr.top)+(rr.height/2);
      const virtualCenter=(countCenter+syncCenter)/2;
      const top=iconCenter-virtualCenter;
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
