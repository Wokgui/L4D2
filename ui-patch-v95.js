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

  function alignTopChat(){
    const title=document.querySelector('#d .title');
    const brand=title&&title.querySelector('.title-brand');
    const chat=title&&title.querySelector('.steam-chat-top');
    if(!title||!brand||!chat)return;

    const titleRect=title.getBoundingClientRect();
    const brandRect=brand.getBoundingClientRect();
    const brandCenterY=brandRect.top+(brandRect.height/2)-titleRect.top;

    chat.style.setProperty('left','50%','important');
    chat.style.setProperty('top',brandCenterY+'px','important');
    chat.style.setProperty('transform','translate(-50%,-50%)','important');
  }

  alignTopChat();
  requestAnimationFrame(alignTopChat);
  window.addEventListener('resize',alignTopChat,{passive:true});
})();
