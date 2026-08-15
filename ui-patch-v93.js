(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* Deux respirations identiques : sous la dernière campagne et avant le menu bas. */
    html body .draw.page.on{padding-bottom:0!important}
    html body .draw .res:not(.home-res){padding-bottom:9px!important}
    html body .draw .res:not(.home-res) .result-card.has-last-played .result-content{padding-bottom:9px!important}
    html body .draw .res:not(.home-res) .result-card.has-last-played .last-played-inline{margin-bottom:0!important}

    /* Le descriptif a désormais la même hauteur visuelle que la tuile du dessous.
       Comme la photo est le seul élément flexible de la fiche, tout l'espace libéré
       lui revient automatiquement, sans toucher au centrage du titre ni des logos. */
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description,
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-1,
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-2,
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-3,
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-4{
      box-sizing:border-box!important;
      height:43px!important;
      min-height:43px!important;
      max-height:43px!important;
      margin-top:4.5px!important;
      padding:4px 10px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      overflow:hidden!important;
      font-size:11.5px!important;
      line-height:1.12!important;
    }
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description + .last-played-inline{
      margin-top:4.5px!important;
    }

    /* Sur la largeur d'un téléphone, la tuile du dessous mesure environ 41 px. */
    @media(max-width:420px){
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-1,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-2,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-3,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-4{
        height:41px!important;
        min-height:41px!important;
        max-height:41px!important;
        padding:3px 8px!important;
      }
    }

    /* Aucun élément de la fiche ne s'anime. */
    html body .draw .res:not(.home-res) .result-card,
    html body .draw .res:not(.home-res) .result-card *,
    html body .draw .res:not(.home-res) .result-card>img,
    html body .draw .res:not(.home-res) .result-card>.photo-fallback{
      transition:none!important;
      animation:none!important;
    }

    @media(max-height:720px){
      html body .draw .res:not(.home-res){padding-bottom:6px!important}
      html body .draw .res:not(.home-res) .result-card.has-last-played .result-content{padding-bottom:6px!important}
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-1,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-2,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-3,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-4{
        height:35px!important;
        min-height:35px!important;
        max-height:35px!important;
        margin-top:3px!important;
        padding:2px 8px!important;
        font-size:10.5px!important;
        line-height:1.08!important;
      }
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description + .last-played-inline{margin-top:3px!important}
    }
  `;
  document.head.appendChild(s);

  /* Ajustement du texte entièrement synchrone : il se termine dans le même
     rendu que l'insertion de la fiche, sans requestAnimationFrame ni second état visible. */
  window.fitDescription=function(){
    const card=document.querySelector('#res .result-card.has-last-played');
    if(!card)return;
    const desc=card.querySelector('.campaign-description');
    const title=card.querySelector('.rname');

    if(desc){
      desc.style.removeProperty('font-size');
      let size=parseFloat(getComputedStyle(desc).fontSize)||11.5;
      let guard=0;
      while(desc.scrollHeight>desc.clientHeight+1&&size>8&&guard<20){
        size-=0.25;
        desc.style.setProperty('font-size',size+'px','important');
        guard++;
      }
    }

    if(title){
      title.style.removeProperty('font-size');
      let size=parseFloat(getComputedStyle(title).fontSize)||27;
      let guard=0;
      while(title.scrollWidth>title.clientWidth+1&&size>13&&guard<30){
        size-=0.5;
        title.style.setProperty('font-size',size+'px','important');
        guard++;
      }
    }
  };

  /* L'ancienne fiche reste affichée tant que la prochaine photo n'est pas décodée. */
  const go=document.getElementById('go');
  if(go){
    go.onclick=async()=>{
      const p=typeof pool==='function'?pool():[];
      const res=document.getElementById('res');
      if(!p.length){
        if(res){res.classList.remove('home-res');res.innerHTML='<div class=err>Aucune campagne avec ces filtres.</div>'}
        return;
      }
      const c=p[Math.floor(Math.random()*p.length)];
      if(c&&c.photo){
        const preload=new Image();
        preload.src=c.photo;
        try{
          if(typeof preload.decode==='function') await preload.decode();
          else await new Promise(resolve=>{preload.onload=preload.onerror=resolve});
        }catch(_){}
      }
      if(typeof setLastPlayed==='function') setLastPlayed(c);
      else if(typeof draw==='function') draw(c);
    };
  }
})();

/* Le bouton Tirage de la barre du bas sert aussi de bouton Accueil :
   il recharge l'écran initial avec les quatre raccourcis Steam. */
(()=>{
  const tirage=document.querySelector('.nav button[data-p="d"]');
  if(!tirage)return;
  tirage.addEventListener('click',event=>{
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.reload();
  },true);
})();
