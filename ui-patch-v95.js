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
