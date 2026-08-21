(()=>{
  'use strict';

  const RECENT_PLAYERS_URL='https://steamcommunity.com/my/friends/coplay/';

  function patchPartnersLink(){
    const link=document.querySelector('.welcome-actions .partners');
    if(!link)return;
    link.href=RECENT_PLAYERS_URL;
    link.target='_blank';
    link.rel='noopener';
    link.title='Joueurs avec lesquels j’ai joué récemment';
    link.setAttribute('aria-label','Ouvrir mes joueurs récents Steam');
  }

  function patchBackupLabels(){
    const all=document.querySelector('.cloud-backup-download-all');
    if(all)all.textContent='Télécharger les 10 dernières versions';

    document.querySelectorAll('.cloud-backup-tools h3').forEach(title=>{
      if(/20\s+dernières\s+versions/i.test(title.textContent||'')){
        title.textContent=(title.textContent||'').replace(/20\s+dernières\s+versions/i,'10 dernières versions');
      }
    });

    const status=document.querySelector('.cloud-backup-status');
    if(status&&/20\s+versions/i.test(status.textContent||'')){
      status.textContent=(status.textContent||'').replace(/20\s+versions/i,'10 versions');
    }
  }

  function patch(){
    patchPartnersLink();
    patchBackupLabels();
  }

  patch();

  const observer=new MutationObserver(patch);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();
