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

    /* Le texte de la dernière campagne est centré sur la tuile entière,
       indépendamment du bouton Steam à droite. */
    .result-card.has-last-played .last-played-inline{
      padding-left:9px!important;
      padding-right:58px!important;
    }
    .result-card.has-last-played .last-played-copy{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      width:calc(100% - 116px)!important;
      transform:translate(-50%,-50%)!important;
      text-align:center!important;
      align-items:center!important;
    }
    .result-card.has-last-played .last-played-copy b,
    .result-card.has-last-played .last-played-copy span{
      width:100%!important;
      text-align:center!important;
    }

    /* Accueil : même espace au-dessus et au-dessous de la photo. */
    .draw .res.home-res{
      padding-top:11px!important;
      gap:16.5px!important;
    }
    .draw .res.home-res .welcome{
      flex:1 1 auto!important;
      min-height:0!important;
      max-height:none!important;
    }
    .draw .res.home-res .steam-access{
      flex:0 0 auto!important;
      min-height:0!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:flex-start!important;
      padding:0 0 11px!important;
    }
    .draw .res.home-res .steam-access-title{
      margin-bottom:16.5px!important;
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

    /* Raccourci Chat Steam intégré, exactement centré dans l'en-tête. */
    .draw .title{
      position:relative!important;
    }
    .draw .steam-chat-top{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      transform:translate(-50%,-50%)!important;
      z-index:6!important;
      height:30px!important;
      padding:0 10px!important;
      display:inline-flex!important;
      align-items:center!important;
      justify-content:center!important;
      gap:6px!important;
      border:1px solid var(--l)!important;
      border-radius:999px!important;
      background:var(--p)!important;
      color:var(--i)!important;
      text-decoration:none!important;
      box-shadow:0 3px 10px rgba(37,38,31,.08)!important;
      font-size:11px!important;
      line-height:1!important;
      font-weight:900!important;
      white-space:nowrap!important;
    }
    .draw .steam-chat-top img{
      display:block!important;
      width:18px!important;
      height:18px!important;
      min-width:18px!important;
      object-fit:contain!important;
      border-radius:50%!important;
    }
    .draw .steam-chat-top:active{
      transform:translate(-50%,-50%) scale(.96)!important;
    }

    @media(max-width:420px){
      .draw .res.home-res{
        padding-top:9px!important;
        gap:13.5px!important;
      }
      .draw .res.home-res .steam-access{
        padding:0 0 9px!important;
      }
      .draw .res.home-res .steam-access-title{
        margin-bottom:13.5px!important;
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
      .draw .steam-chat-top{
        height:28px!important;
        padding:0 8px!important;
        gap:5px!important;
        font-size:10px!important;
      }
      .draw .steam-chat-top img{
        width:16px!important;
        height:16px!important;
        min-width:16px!important;
      }
    }

    @media(max-height:720px){
      .draw .res.home-res{
        padding-top:7px!important;
        gap:9.5px!important;
      }
      .draw .res.home-res .steam-access{
        padding:0 0 7px!important;
      }
      .draw .res.home-res .steam-access-title{
        margin-bottom:9.5px!important;
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

  function installSteamChatShortcut(){
    const title=document.querySelector('.draw .title');
    if(!title||title.querySelector('.steam-chat-top'))return;
    const link=document.createElement('a');
    link.className='steam-chat-top';
    link.href='https://steamcommunity.com/chat/';
    link.target='_blank';
    link.rel='noopener';
    link.setAttribute('aria-label','Ouvrir le Chat Steam');
    link.title='Chat Steam';
    link.innerHTML='<img src="/steam-icon.png" alt=""><span>Chat Steam</span>';
    title.appendChild(link);
  }

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

  installSteamChatShortcut();
  setRealNavHeight();
  scheduleSettle();
})();
