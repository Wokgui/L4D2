(()=>{
  fitDescription=function(){
    const card=document.querySelector('#res .result-card');
    const d=card&&card.querySelector('.campaign-description');
    if(!card||!d)return;

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

      /* La photo ne bouge jamais : si le bas risque d'être rogné, seul le descriptif rétrécit. */
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
      });
    });
  };

  const s=document.createElement('style');
  s.textContent=`
    .result-card.has-last-played .result-content{
      gap:0!important;
      padding-top:12px!important;
    }
    .result-card.has-last-played .meta{margin:0!important}
    .result-card.has-last-played .campaign-description{margin-top:14px!important;margin-bottom:0!important}
    .result-card.has-last-played .last-played-inline{margin:0!important;flex:0 0 auto!important}

    /* Titre + Steam exactement au milieu entre le bas de l'image et le haut des tuiles. */
    .result-card.has-last-played .rhead{
      min-height:27px!important;
      margin:0 0 12px!important;
      display:flex!important;
      align-items:center!important;
    }
    .result-card.has-last-played .rhead .wk{
      width:27px!important;
      height:27px!important;
      min-width:27px!important;
      padding:0!important;
      border-radius:50%!important;
      top:50%!important;
      transform:translateY(-50%)!important;
    }
    .result-card.has-last-played .rhead .wk img,
    .result-card.has-last-played .last-played-steam img{
      width:27px!important;
      height:27px!important;
      min-width:27px!important;
      max-width:27px!important;
      min-height:27px!important;
      max-height:27px!important;
      object-fit:contain!important;
      border-radius:50%!important;
    }

    /* Le bloc tiré commence exactement au même niveau que la photo d'accueil. */
    .draw .res:not(.home-res){padding-top:4px!important}
    .draw .res:not(.home-res) .result-card{transform:none!important;margin-top:0!important}

    @media(max-width:420px){
      .draw .res:not(.home-res){padding-top:3px!important}
    }

    @media(max-height:720px){
      .result-card.has-last-played .result-content{padding-top:9px!important}
      .result-card.has-last-played .rhead{margin-bottom:9px!important}
      .result-card.has-last-played .campaign-description{margin-top:9px!important}
      .draw .res:not(.home-res){padding-top:2px!important}
    }
  `;
  document.head.appendChild(s);

  function alignHeaderStatus(){
    const title=document.querySelector('.draw .title');
    const icon=title&&title.querySelector('.title-icon');
    const status=title&&title.querySelector('.header-status');
    const count=status&&status.querySelector('.count');
    const sync=status&&status.querySelector('#sync');
    if(!title||!icon||!status||!count||!sync)return;

    /* On repart du centrage CSS, puis on aligne géométriquement le milieu des deux lignes de texte sur le milieu de l'icône. */
    status.style.setProperty('top','50%','important');
    status.style.setProperty('transform','translateY(-50%)','important');

    requestAnimationFrame(()=>{
      const ir=icon.getBoundingClientRect();
      const cr=count.getBoundingClientRect();
      const sr=sync.getBoundingClientRect();
      const iconCenter=(ir.top+ir.bottom)/2;
      const countCenter=(cr.top+cr.bottom)/2;
      const syncCenter=(sr.top+sr.bottom)/2;
      const virtualCenter=(countCenter+syncCenter)/2;
      const delta=iconCenter-virtualCenter;
      status.style.setProperty('transform',`translateY(calc(-50% + ${Math.round(delta*10)/10}px))`,'important');
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
