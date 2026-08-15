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

  window.fitDescription=function(){};
})();
