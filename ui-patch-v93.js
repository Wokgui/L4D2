(()=>{
  const s=document.createElement('style');
  s.textContent=`
    html body .draw.page.on{
      padding-bottom:0!important;
    }
    html body .draw .res:not(.home-res){
      padding-bottom:4.5px!important;
    }
    html body .draw .res:not(.home-res) .result-card.has-last-played .result-content{
      padding-bottom:4.5px!important;
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
        padding-bottom:3px!important;
      }
      html body .draw .res:not(.home-res) .result-card.has-last-played .result-content{
        padding-bottom:3px!important;
      }
    }
  `;
  document.head.appendChild(s);

  /* app.js et l'ancien patch v88 recalculaient encore les tailles de texte
     sur plusieurs requestAnimationFrame après chaque tirage. Ce recalcul
     tardif était la dernière source du mouvement visible. La géométrie est
     désormais entièrement gérée par le CSS fixe. */
  window.fitDescription=function(){};
})();
