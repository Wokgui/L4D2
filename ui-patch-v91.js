(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .app{padding-bottom:var(--l4d2-nav-height,43px)!important}
    .draw.page.on{height:calc(100dvh - var(--l4d2-nav-height,43px))!important;max-height:calc(100dvh - var(--l4d2-nav-height,43px))!important}

    /* Géométrie fixe : la fiche remplit réellement tout l'espace disponible. */
    .draw .res:not(.home-res){min-height:0!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:stretch!important;box-sizing:border-box!important}
    .draw .res:not(.home-res) .result-card.has-last-played{flex:1 1 0!important;height:auto!important;min-height:0!important;max-height:none!important;align-self:stretch!important;overflow:hidden!important;box-sizing:border-box!important;transition:none!important;transform:none!important}
    .draw .result-card.has-last-played>img,.draw .result-card.has-last-played>.photo-fallback{flex:1 1 0!important;min-height:0!important;height:auto!important;max-height:none!important;object-fit:cover!important;transition:none!important;transform:none!important}
    .result-card.has-last-played .result-content{flex:0 0 auto!important;min-height:0!important;transition:none!important;transform:none!important}
    .result-card.has-last-played .rhead,.result-card.has-last-played .rname,.result-card.has-last-played .meta,.result-card.has-last-played .campaign-description,.result-card.has-last-played .last-played-inline{transition:none!important}

    .result-card.has-last-played .last-played-inline{padding-left:9px!important;padding-right:58px!important}
    .result-card.has-last-played .last-played-copy{position:absolute!important;left:50%!important;top:50%!important;width:calc(100% - 116px)!important;transform:translate(-50%,-50%)!important;text-align:center!important;align-items:center!important}
    .result-card.has-last-played .last-played-copy b,.result-card.has-last-played .last-played-copy span{width:100%!important;text-align:center!important}

    .draw .res.home-res{padding-top:11px!important;gap:16.5px!important}
    .draw .res.home-res .welcome{flex:1 1 auto!important;min-height:0!important;max-height:none!important}
    .draw .res.home-res .steam-access{flex:0 0 auto!important;min-height:0!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;padding:0 0 11px!important}
    .draw .res.home-res .steam-access-title{margin-bottom:16.5px!important}
    .draw .res.home-res .welcome-actions{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px 10px!important;width:100%!important;margin:0!important}
    .draw .res.home-res .welcome-actions a{min-height:104px!important;padding:12px 8px 10px!important;gap:8px!important;font-size:13px!important}
    .draw .res.home-res .welcome-steam-icon{width:42px!important;height:42px!important;flex-basis:42px!important}

    .draw .title{position:relative!important}
    .draw .steam-chat-top{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;z-index:6!important;width:36px!important;height:36px!important;padding:0!important;display:grid!important;place-items:center!important;border:1px solid var(--l)!important;border-radius:50%!important;background:var(--p)!important;color:var(--g)!important;text-decoration:none!important;box-shadow:0 3px 10px rgba(37,38,31,.08)!important;overflow:visible!important}
    .draw .steam-chat-top img{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;display:block!important;width:32px!important;height:32px!important;min-width:32px!important;object-fit:contain!important;border-radius:50%!important}
    .draw .steam-chat-top .steam-chat-bubble{position:absolute!important;right:-1px!important;bottom:-1px!important;width:15px!important;height:15px!important;padding:1px!important;border-radius:50%!important;background:var(--g)!important;color:#fff!important;border:1.5px solid var(--p)!important;overflow:visible!important;box-sizing:border-box!important}
    .draw .steam-chat-top .steam-chat-bubble path{fill:currentColor!important}
    .draw .steam-chat-top:active{transform:translate(-50%,-50%) scale(.94)!important}

    @media(max-width:420px){
      .draw .res.home-res{padding-top:9px!important;gap:13.5px!important}
      .draw .res.home-res .steam-access{padding:0 0 9px!important}
      .draw .res.home-res .steam-access-title{margin-bottom:13.5px!important}
      .draw .res.home-res .welcome-actions{gap:9px 8px!important}
      .draw .res.home-res .welcome-actions a{min-height:90px!important;padding:9px 6px 8px!important;font-size:11.5px!important}
      .draw .res.home-res .welcome-steam-icon{width:37px!important;height:37px!important;flex-basis:37px!important}
      .draw .steam-chat-top{width:34px!important;height:34px!important;overflow:visible!important}
      .draw .steam-chat-top img{width:42px!important;height:42px!important;min-width:42px!important;max-width:42px!important}
      .draw .steam-chat-top .steam-chat-bubble{width:16px!important;height:16px!important;padding:.8px!important;right:0!important;bottom:0!important}
    }
    @media(max-height:720px){
      .draw .res.home-res{padding-top:7px!important;gap:9.5px!important}
      .draw .res.home-res .steam-access{padding:0 0 7px!important}
      .draw .res.home-res .steam-access-title{margin-bottom:9.5px!important}
      .draw .res.home-res .welcome-actions{gap:6px 7px!important}
      .draw .res.home-res .welcome-actions a{min-height:67px!important;padding:5px!important;gap:4px!important;font-size:10.5px!important}
      .draw .res.home-res .welcome-steam-icon{width:29px!important;height:29px!important;flex-basis:29px!important}
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
    link.innerHTML='<img src="/steam-icon.png" alt=""><svg class="steam-chat-bubble" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v12H9l-5 4V4zm3 4v2h10V8H7zm0 4v2h7v-2H7z"/></svg>';
    title.appendChild(link);
  }

  function setRealNavHeight(){
    const nav=document.querySelector('.nav');
    const height=nav?Math.ceil(nav.getBoundingClientRect().height):43;
    document.documentElement.style.setProperty('--l4d2-nav-height',height+'px');
  }

  /* Aucun calcul après affichage : le CSS gère désormais toute la géométrie. */
  window.fitDescription=function(){};

  installSteamChatShortcut();
  setRealNavHeight();
  window.addEventListener('resize',setRealNavHeight,{passive:true});
  if(window.visualViewport)window.visualViewport.addEventListener('resize',setRealNavHeight,{passive:true});
})();
