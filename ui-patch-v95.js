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
    const chat=document.querySelector('#d .steam-chat-top');
    if(!actions||!chat)return;

    if(chat.parentElement!==actions)actions.appendChild(chat);

    actions.style.setProperty('position','relative','important');
    actions.style.setProperty('overflow','visible','important');

    chat.style.setProperty('position','absolute','important');
    chat.style.setProperty('left','50%','important');
    chat.style.setProperty('top','50%','important');
    chat.style.setProperty('transform','translate(-50%,-50%)','important');
    chat.style.setProperty('width','36px','important');
    chat.style.setProperty('height','36px','important');
    chat.style.setProperty('min-width','36px','important');
    chat.style.setProperty('min-height','36px','important');
    chat.style.setProperty('max-width','36px','important');
    chat.style.setProperty('max-height','36px','important');
    chat.style.setProperty('margin','0','important');
    chat.style.setProperty('padding','3px','important');
    chat.style.setProperty('display','block','important');
    chat.style.setProperty('box-sizing','border-box','important');
    chat.style.setProperty('border','3px solid #f6efe2','important');
    chat.style.setProperty('border-radius','50%','important');
    chat.style.setProperty('background-color','#f6efe2','important');
    chat.style.setProperty('background-image',"url('/chat-icon-top-v127.svg')",'important');
    chat.style.setProperty('background-position','center','important');
    chat.style.setProperty('background-repeat','no-repeat','important');
    chat.style.setProperty('background-size','28px 28px','important');
    chat.style.setProperty('box-shadow','0 3px 10px rgba(62,52,38,.18)','important');
    chat.style.setProperty('overflow','visible','important');
    chat.style.setProperty('z-index','12','important');
    chat.style.setProperty('text-decoration','none','important');

    const glyph=chat.querySelector('.steam-chat-glyph');
    if(glyph)glyph.style.setProperty('display','none','important');
    chat.querySelectorAll('img,.steam-chat-badge,.steam-chat-corner-badge').forEach(node=>{
      node.style.setProperty('display','none','important');
    });
  }

  placeChatBetweenSteamTiles();
  requestAnimationFrame(placeChatBetweenSteamTiles);
})();
