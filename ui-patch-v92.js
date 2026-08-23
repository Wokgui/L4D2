(()=>{
  const style=document.createElement('style');
  style.textContent=`
    /* Nouveautés : on aligne la présence visuelle de la partie pleine du logo Steam
       sur celle du rond Abonnements. Le badge + conserve sa taille. */
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon{
      overflow:visible!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      width:178%!important;
      height:178%!important;
      max-width:none!important;
      max-height:none!important;
      transform:translate(-50%,-50%)!important;
      object-fit:contain!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
      right:-8px!important;
      bottom:-6px!important;
    }
    @media(max-width:420px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:178%!important;
        height:178%!important;
      }
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
        right:-7px!important;
        bottom:-5px!important;
      }
    }
    @media(max-height:720px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:178%!important;
        height:178%!important;
      }
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
        right:-6px!important;
        bottom:-4px!important;
      }
    }
  `;
  document.head.appendChild(style);

  function patchPartners(){
    const a=document.querySelector('.welcome-actions .partners');
    if(!a)return;
    a.href='https://steamcommunity.com/my/friends/coplay';
    a.setAttribute('aria-label','Joueurs récemment rencontrés sur Steam');
    a.title='Joueurs récemment rencontrés';
  }
  patchPartners();
  requestAnimationFrame(patchPartners);
})();

(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    /* Deux petits boutons à gauche du titre : modifier puis campagne précédente. */
    html body .draw .res:not(.home-res) .result-card .rhead{
      position:relative!important;
      padding-left:70px!important;
      padding-right:70px!important;
    }
    html body .draw .res:not(.home-res) .draw-kept-edit,
    html body .draw .res:not(.home-res) .draw-previous-icon{
      position:absolute!important;
      top:50%!important;
      transform:translateY(-50%)!important;
      width:29px!important;
      height:29px!important;
      min-width:29px!important;
      min-height:29px!important;
      max-width:29px!important;
      max-height:29px!important;
      padding:0!important;
      border:0!important;
      border-radius:50%!important;
      background:var(--p2)!important;
      color:var(--g)!important;
      display:grid!important;
      place-items:center!important;
      box-shadow:inset 0 0 0 1px var(--l)!important;
      z-index:5!important;
    }
    html body .draw .res:not(.home-res) .draw-kept-edit{left:3px!important}
    html body .draw .res:not(.home-res) .draw-previous-icon{left:38px!important}
    html body .draw .res:not(.home-res) .draw-kept-edit svg,
    html body .draw .res:not(.home-res) .draw-previous-icon svg{
      display:block!important;
      width:17px!important;
      height:17px!important;
      fill:none!important;
      stroke:currentColor!important;
      stroke-linecap:round!important;
      stroke-linejoin:round!important;
    }
    html body .draw .res:not(.home-res) .draw-kept-edit svg{stroke-width:2.2!important}
    html body .draw .res:not(.home-res) .draw-previous-icon svg{stroke-width:2.35!important}

    /* L'ancienne grande tuile "Campagne précédente" disparaît. */
    html body .draw .res:not(.home-res) .previous-draw-slot{display:none!important}

    /* Raccourci Chat Steam au centre de l'en-tête, comme avant. */
    .draw .title{position:relative!important}
    .draw .steam-chat-top{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      transform:translate(-50%,-50%)!important;
      z-index:8!important;
      width:36px!important;
      height:36px!important;
      padding:0!important;
      display:grid!important;
      place-items:center!important;
      border:1px solid var(--l)!important;
      border-radius:50%!important;
      background:var(--p)!important;
      color:var(--g)!important;
      text-decoration:none!important;
      box-shadow:0 3px 10px rgba(37,38,31,.08)!important;
      overflow:visible!important;
    }
    .draw .steam-chat-top>img{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      transform:translate(-50%,-50%)!important;
      width:32px!important;
      height:32px!important;
      min-width:32px!important;
      max-width:32px!important;
      object-fit:contain!important;
      border-radius:50%!important;
    }
    .draw .steam-chat-top .steam-chat-bubble{
      position:absolute!important;
      right:-1px!important;
      bottom:-1px!important;
      width:15px!important;
      height:15px!important;
      padding:1px!important;
      border-radius:50%!important;
      background:var(--g)!important;
      color:#fff!important;
      border:1.5px solid var(--p)!important;
      box-sizing:border-box!important;
    }
    .draw .steam-chat-top .steam-chat-bubble path{fill:currentColor!important}

    @media(max-height:720px){
      html body .draw .res:not(.home-res) .result-card .rhead{padding-left:62px!important;padding-right:62px!important}
      html body .draw .res:not(.home-res) .draw-kept-edit,
      html body .draw .res:not(.home-res) .draw-previous-icon{width:26px!important;height:26px!important;min-width:26px!important;min-height:26px!important;max-width:26px!important;max-height:26px!important}
      html body .draw .res:not(.home-res) .draw-kept-edit{left:3px!important}
      html body .draw .res:not(.home-res) .draw-previous-icon{left:34px!important}
      html body .draw .res:not(.home-res) .draw-kept-edit svg,
      html body .draw .res:not(.home-res) .draw-previous-icon svg{width:15px!important;height:15px!important}
    }
  `;
  document.head.appendChild(style);

  function ensureSteamChat(){
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

  function compactPreviousButton(){
    const card=document.querySelector('#res .result-card');
    const rhead=card&&card.querySelector('.rhead');
    if(!card||!rhead)return;

    const slot=card.querySelector('.previous-draw-slot');
    const previous=slot&&slot.querySelector('.previous-draw-button');
    if(previous&&!rhead.querySelector('.draw-previous-icon')){
      previous.className='draw-previous-icon';
      previous.removeAttribute('style');
      previous.setAttribute('aria-label',previous.getAttribute('aria-label')||'Afficher la campagne précédente');
      previous.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7H4v4"/><path d="M4.6 10A8 8 0 1 1 6.8 17.3"/></svg>';
      rhead.appendChild(previous);
    }
    if(slot)slot.remove();
  }

  function apply(){
    ensureSteamChat();
    compactPreviousButton();
  }

  apply();
  requestAnimationFrame(apply);

  const root=document.getElementById('res');
  if(root){
    let scheduled=false;
    const observer=new MutationObserver(()=>{
      if(scheduled)return;
      scheduled=true;
      requestAnimationFrame(()=>{
        scheduled=false;
        apply();
      });
    });
    observer.observe(root,{childList:true,subtree:true});
  }
})();
