(()=>{
  fitDescription=function(){
    const d=document.querySelector('#res .campaign-description');
    if(!d)return;

    const reference=document.querySelector('#res .last-played-copy b');
    const baseSize=reference?(parseFloat(getComputedStyle(reference).fontSize)||8.5):8.5;

    d.style.fontFamily='inherit';
    d.style.fontSize=baseSize+'px';
    d.style.lineHeight='1.15';
    d.style.fontWeight='900';

    requestAnimationFrame(()=>{
      const lh=parseFloat(getComputedStyle(d).lineHeight)||baseSize*1.15;
      const lines=Math.max(1,Math.ceil(d.scrollHeight/lh));
      if(lines===2){d.style.fontSize=Math.max(6,baseSize-.5)+'px';d.style.lineHeight='1.2';d.style.fontWeight='750'}
      else if(lines===3){d.style.fontSize=Math.max(6,baseSize-1)+'px';d.style.lineHeight='1.2';d.style.fontWeight='750'}
      else if(lines>=4){d.style.fontSize=Math.max(6,baseSize-2)+'px';d.style.lineHeight='1.18';d.style.fontWeight='750'}
    });
  };

  const s=document.createElement('style');
  s.textContent=`
    .result-card.has-last-played .result-content{gap:6px!important}
    .result-card.has-last-played .meta{margin:0!important}
    .result-card.has-last-played .campaign-description{margin:0!important}
    .result-card.has-last-played .last-played-inline{margin:0!important}

    /* Bloc d'état en haut à droite : centré verticalement sur l'icône de gauche. */
    .draw .title .header-status{
      top:50%!important;
      transform:translateY(-50%)!important;
      justify-content:center!important;
    }

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
})();
