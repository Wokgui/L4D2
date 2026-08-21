(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* Exactement la même taille que les icônes Steam de Campagnes gardées.
       Ne dépend pas de has-last-played : toute fiche issue d'un tirage est couverte. */
    html body .draw .res:not(.home-res) .result-card .rhead{
      padding-left:44px!important;
      padding-right:44px!important;
    }
    html body .draw .res:not(.home-res) .result-card .rhead .wk{
      width:40px!important;
      height:40px!important;
      min-width:40px!important;
      min-height:40px!important;
      max-width:40px!important;
      max-height:40px!important;
      flex:0 0 40px!important;
      right:4px!important;
      top:50%!important;
      transform:translateY(-50%)!important;
      padding:0!important;
      border-radius:50%!important;
      overflow:visible!important;
      background:transparent!important;
      box-shadow:none!important;
    }
    html body .draw .res:not(.home-res) .result-card .rhead .wk img{
      display:block!important;
      width:40px!important;
      height:40px!important;
      min-width:40px!important;
      min-height:40px!important;
      max-width:40px!important;
      max-height:40px!important;
      object-fit:contain!important;
      border-radius:50%!important;
    }
  `;
  document.head.appendChild(s);
})();
