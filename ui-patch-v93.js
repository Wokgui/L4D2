(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* Deux respirations identiques : sous la dernière campagne et avant le menu bas. */
    html body .draw.page.on{
      padding-bottom:0!important;
    }
    html body .draw .res:not(.home-res){
      padding-bottom:9px!important;
    }
    html body .draw .res:not(.home-res) .result-card.has-last-played .result-content{
      padding-bottom:9px!important;
    }
    html body .draw .res:not(.home-res) .result-card.has-last-played .last-played-inline{
      margin-bottom:0!important;
    }

    /* Aucun élément de la fiche ne doit s'animer ou changer de géométrie après le tirage. */
    html body .draw .res:not(.home-res) .result-card,
    html body .draw .res:not(.home-res) .result-card *,
    html body .draw .res:not(.home-res) .result-card>img,
    html body .draw .res:not(.home-res) .result-card>.photo-fallback{
      transition:none!important;
      animation:none!important;
    }

    @media(max-height:720px){
      html body .draw .res:not(.home-res){
        padding-bottom:6px!important;
      }
      html body .draw .res:not(.home-res) .result-card.has-last-played .result-content{
        padding-bottom:6px!important;
      }
    }
  `;
  document.head.appendChild(s);

  /* Plus aucun recalcul différé du texte. */
  window.fitDescription=function(){};

  /* Évite le dernier "pompage" visible : la fiche actuelle reste en place
     jusqu'à ce que la photo de la prochaine campagne soit déjà décodée. */
  const go=document.getElementById('go');
  if(go){
    go.onclick=async()=>{
      const p=typeof pool==='function'?pool():[];
      const res=document.getElementById('res');
      if(!p.length){
        if(res){
          res.classList.remove('home-res');
          res.innerHTML='<div class=err>Aucune campagne avec ces filtres.</div>';
        }
        return;
      }

      const c=p[Math.floor(Math.random()*p.length)];
      if(c&&c.photo){
        const preload=new Image();
        preload.src=c.photo;
        try{
          if(typeof preload.decode==='function') await preload.decode();
          else await new Promise(resolve=>{preload.onload=preload.onerror=resolve});
        }catch(_){/* En cas d'échec, on affiche quand même la campagne. */}
      }

      if(typeof setLastPlayed==='function') setLastPlayed(c);
      else if(typeof draw==='function') draw(c);
    };
  }
})();
