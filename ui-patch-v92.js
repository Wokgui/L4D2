(()=>{
  const style=document.createElement('style');
  style.textContent=`
    /* Nouveautés : le logo Steam reprend exactement la taille du rond Abonnements.
       Le badge + conserve sa taille. */
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon{
      overflow:visible!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      width:100%!important;
      height:100%!important;
      max-width:100%!important;
      max-height:100%!important;
      transform:translate(-50%,-50%)!important;
      object-fit:contain!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
      right:-2px!important;
      bottom:-2px!important;
    }
    @media(max-width:420px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:100%!important;
        height:100%!important;
      }
    }
    @media(max-height:720px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:100%!important;
        height:100%!important;
      }
    }
  `;
  document.head.appendChild(style);
})();
