(()=>{
  const style=document.createElement('style');
  style.textContent=`
    /* Nouveautés : on aligne la présence visuelle de la partie pleine du logo Steam
       sur celle du rond Abonnements. Le badge + conserve sa taille. */
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon{
      overflow:visible!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      width:178%!important;
      height:178%!important;
      max-width:none!important;
      max-height:none!important;
      transform:translate(-50%,-50%)!important;
      object-fit:contain!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
      right:-8px!important;
      bottom:-6px!important;
    }
    @media(max-width:420px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:178%!important;
        height:178%!important;
      }
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
        right:-7px!important;
        bottom:-5px!important;
      }
    }
    @media(max-height:720px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:178%!important;
        height:178%!important;
      }
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
        right:-6px!important;
        bottom:-4px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();
