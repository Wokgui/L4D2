(()=>{
  'use strict';

  const RECENT_PLAYERS_URL='https://steamcommunity.com/my/friends/coplay/';

  const link=document.querySelector('.welcome-actions .partners');
  if(link){
    link.href=RECENT_PLAYERS_URL;
    link.target='_blank';
    link.rel='noopener';
    link.title='Joueurs avec lesquels j’ai joué récemment';
    link.setAttribute('aria-label','Ouvrir mes joueurs récents Steam');
  }

  const all=document.querySelector('.cloud-backup-download-all');
  if(all&&all.textContent!=='Télécharger les 10 dernières versions'){
    all.textContent='Télécharger les 10 dernières versions';
  }

  document.querySelectorAll('.cloud-backup-tools h3').forEach(title=>{
    const text=title.textContent||'';
    if(/20\s+dernières\s+versions/i.test(text)){
      title.textContent=text.replace(/20\s+dernières\s+versions/i,'10 dernières versions');
    }
  });
})();

(()=>{
  'use strict';

  function placeChatBetweenSteamTiles(){
    const actions=document.querySelector('#d .welcome-actions');
    if(!actions)return;

    const oldTop=document.querySelector('#d .title .steam-chat-top');
    const legacyCenter=actions.querySelector('.steam-chat-top');
    let chat=actions.querySelector('.steam-chat-center');

    if(!chat){
      chat=document.createElement('a');
      chat.className='steam-chat-center';
      chat.href=oldTop?.href||legacyCenter?.href||'https://steamcommunity.com/chat/';
      chat.target='_blank';
      chat.rel='noopener';
      chat.title='Chat Steam';
      chat.setAttribute('aria-label','Ouvrir le Chat Steam');
      actions.appendChild(chat);
    }

    oldTop?.remove();
    legacyCenter?.remove();

    actions.style.setProperty('position','relative','important');
    actions.style.setProperty('overflow','visible','important');

    chat.style.setProperty('position','absolute','important');
    chat.style.setProperty('left','50%','important');
    chat.style.setProperty('top','50%','important');
    chat.style.setProperty('transform','translate(-50%,-50%)','important');
    chat.style.setProperty('width','50px','important');
    chat.style.setProperty('height','50px','important');
    chat.style.setProperty('min-width','50px','important');
    chat.style.setProperty('min-height','50px','important');
    chat.style.setProperty('max-width','50px','important');
    chat.style.setProperty('max-height','50px','important');
    chat.style.setProperty('margin','0','important');
    chat.style.setProperty('padding','0','important');
    chat.style.setProperty('display','block','important');
    chat.style.setProperty('box-sizing','border-box','important');
    chat.style.setProperty('border','0','important');
    chat.style.setProperty('outline','0','important');
    chat.style.setProperty('border-radius','50%','important');
    chat.style.setProperty('background-color','#2f8d7c','important');
    chat.style.setProperty('background-image',"url('/chat-icon-top-v127.svg')",'important');
    chat.style.setProperty('background-position','center','important');
    chat.style.setProperty('background-repeat','no-repeat','important');
    chat.style.setProperty('background-size','50px 50px','important');
    chat.style.setProperty('box-shadow','none','important');
    chat.style.setProperty('filter','none','important');
    chat.style.setProperty('overflow','visible','important');
    chat.style.setProperty('z-index','12','important');
    chat.style.setProperty('text-decoration','none','important');
    chat.style.setProperty('-webkit-tap-highlight-color','transparent','important');
  }

  let scheduled=false;
  function scheduleChatPlacement(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{
      scheduled=false;
      placeChatBetweenSteamTiles();
    });
  }

  placeChatBetweenSteamTiles();
  scheduleChatPlacement();

  /* La navigation masque/affiche les pages. On revérifie le bouton après chaque changement d’onglet. */
  document.querySelectorAll('.nav button').forEach(button=>{
    button.addEventListener('click',scheduleChatPlacement,{passive:true});
  });

  /* Si l’accueil est reconstruit par un autre patch, le bouton est recréé une seule fois. */
  const drawPage=document.getElementById('d');
  if(drawPage){
    const observer=new MutationObserver(records=>{
      if(!records.some(record=>record.type==='childList'))return;
      const actions=drawPage.querySelector('.welcome-actions');
      if(actions&&!actions.querySelector('.steam-chat-center'))scheduleChatPlacement();
    });
    observer.observe(drawPage,{childList:true,subtree:true});
  }

  /* Couvre aussi un aller-retour vers un autre onglet du navigateur/PWA. */
  document.addEventListener('visibilitychange',()=>{
    if(!document.hidden)scheduleChatPlacement();
  },{passive:true});
})();
