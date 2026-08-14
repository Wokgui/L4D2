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

    /* Accueil : utiliser le vide sous les quatre accès Steam. */
    .draw .res.home-res .steam-access{
      flex:1 1 auto!important;
      min-height:0!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      padding:10px 0 14px!important;
    }
    .draw .res.home-res .steam-access-title{
      margin-bottom:12px!important;
    }
    .draw .res.home-res .welcome-actions{
      grid-template-columns:repeat(2,minmax(0,1fr))!important;
      gap:12px 10px!important;
      width:100%!important;
      margin:0!important;
    }
    .draw .res.home-res .welcome-actions a{
      min-height:104px!important;
      padding:12px 8px 10px!important;
      gap:8px!important;
      font-size:13px!important;
    }
    .draw .res.home-res .welcome-steam-icon{
      width:42px!important;
      height:42px!important;
      flex-basis:42px!important;
    }

    @media(max-width:420px){
      .draw .res.home-res .steam-access{
        padding:8px 0 12px!important;
      }
      .draw .res.home-res .steam-access-title{
        margin-bottom:9px!important;
      }
      .draw .res.home-res .welcome-actions{
        gap:9px 8px!important;
      }
      .draw .res.home-res .welcome-actions a{
        min-height:90px!important;
        padding:9px 6px 8px!important;
        font-size:11.5px!important;
      }
      .draw .res.home-res .welcome-steam-icon{
        width:37px!important;
        height:37px!important;
        flex-basis:37px!important;
      }
    }

    @media(max-height:720px){
      .draw .res.home-res .steam-access{
        padding:5px 0 7px!important;
      }
      .draw .res.home-res .steam-access-title{
        margin-bottom:6px!important;
      }
      .draw .res.home-res .welcome-actions{
        gap:6px 7px!important;
      }
      .draw .res.home-res .welcome-actions a{
        min-height:67px!important;
        padding:5px 5px!important;
        gap:4px!important;
        font-size:10.5px!important;
      }
      .draw .res.home-res .welcome-steam-icon{
        width:29px!important;
        height:29px!important;
        flex-basis:29px!important;
      }
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
