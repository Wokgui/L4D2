(()=>{
  const style=document.createElement('style');
  style.textContent=`
    /* Utilise la hauteur réelle de la barre du bas au lieu d'une valeur fixe. */
    .app{
      padding-bottom:var(--l4d2-nav-height,43px)!important;
    }
    .draw.page.on{
      height:calc(100dvh - var(--l4d2-nav-height,43px))!important;
      max-height:calc(100dvh - var(--l4d2-nav-height,43px))!important;
    }

    /* La fiche doit toujours tenir entièrement au-dessus de la navigation. */
    .draw .res:not(.home-res){
      min-height:0!important;
      padding-bottom:8px!important;
      overflow:hidden!important;
    }
    .draw .res:not(.home-res) .result-card.has-last-played{
      height:100%!important;
      min-height:0!important;
      max-height:100%!important;
      overflow:hidden!important;
      box-sizing:border-box!important;
    }

    /* La photo absorbe toute réduction nécessaire. Le contenu du bas n'est plus sacrifié. */
    .draw .result-card.has-last-played>img,
    .draw .result-card.has-last-played>.photo-fallback{
      flex:1 1 0!important;
      min-height:0!important;
      height:auto!important;
      max-height:220px!important;
      object-fit:cover!important;
    }
    .result-card.has-last-played .result-content{
      flex:0 0 auto!important;
      min-height:0!important;
      padding-bottom:8px!important;
    }
  `;
  document.head.appendChild(style);

  function setRealNavHeight(){
    const nav=document.querySelector('.nav');
    const height=nav?Math.ceil(nav.getBoundingClientRect().height):43;
    document.documentElement.style.setProperty('--l4d2-nav-height',height+'px');
  }

  function settleDrawCard(){
    setRealNavHeight();
    const card=document.querySelector('#res .result-card.has-last-played');
    const image=card&&card.querySelector(':scope>img,:scope>.photo-fallback');
    if(!card||!image)return;

    /* Annule les anciennes hauteurs forcées : le flex calcule d'abord l'espace réellement disponible. */
    image.style.removeProperty('height');
    image.style.setProperty('min-height','0px','important');
    image.style.setProperty('flex','1 1 0px','important');

    requestAnimationFrame(()=>{
      const overflow=card.scrollHeight-card.clientHeight;
      if(overflow<=1)return;
      const current=image.getBoundingClientRect().height;
      const target=Math.max(0,current-overflow-2);
      image.style.setProperty('flex','0 0 '+target+'px','important');
      image.style.setProperty('height',target+'px','important');
    });
  }

  function scheduleSettle(){
    requestAnimationFrame(()=>requestAnimationFrame(settleDrawCard));
    setTimeout(settleDrawCard,120);
  }

  const res=document.getElementById('res');
  if(res)new MutationObserver(scheduleSettle).observe(res,{childList:true,subtree:true});

  window.addEventListener('resize',scheduleSettle,{passive:true});
  if(window.visualViewport)window.visualViewport.addEventListener('resize',scheduleSettle,{passive:true});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(scheduleSettle).catch(()=>{});

  setRealNavHeight();
  scheduleSettle();
})();
