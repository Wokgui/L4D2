(()=>{
  const style=document.createElement('style');
  style.textContent=`
    /* Nouveautés : Steam doit avoir la même présence visuelle que l'icône Abonnements.
       Le badge + conserve exactement sa taille actuelle. */
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon{
      overflow:visible!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      width:112%!important;
      height:112%!important;
      max-width:none!important;
      max-height:none!important;
      transform:translate(-50%,-50%)!important;
      object-fit:contain!important;
    }
  `;
  document.head.appendChild(style);
})();
