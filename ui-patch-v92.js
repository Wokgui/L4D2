(()=>{
  const style=document.createElement('style');
  style.textContent=`
    /* Nouveautés : le logo Steam doit avoir la même présence visuelle que l'icône Abonnements.
       Le badge + conserve exactement sa taille ; seule sa position suit le bord du logo agrandi. */
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon{
      overflow:visible!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      width:160%!important;
      height:160%!important;
      max-width:none!important;
      max-height:none!important;
      transform:translate(-50%,-50%)!important;
      object-fit:contain!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
      right:-11px!important;
      bottom:-8px!important;
    }
    @media(max-width:420px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:160%!important;
        height:160%!important;
      }
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
        right:-10px!important;
        bottom:-7px!important;
      }
    }
    @media(max-height:720px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:160%!important;
        height:160%!important;
      }
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
        right:-9px!important;
        bottom:-6px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();
