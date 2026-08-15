(()=>{
  const style=document.createElement('style');
  style.textContent=`
    /* Nouveautés : compense les marges transparentes du PNG Steam pour que
       sa présence visuelle corresponde au rond Abonnements. Le badge + garde sa taille. */
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon{
      overflow:visible!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      width:150%!important;
      height:150%!important;
      max-width:none!important;
      max-height:none!important;
      transform:translate(-50%,-50%)!important;
      object-fit:contain!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
      right:-6px!important;
      bottom:-5px!important;
    }
    @media(max-width:420px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:150%!important;
        height:150%!important;
      }
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
        right:-5px!important;
        bottom:-4px!important;
      }
    }
    @media(max-height:720px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:150%!important;
        height:150%!important;
      }
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
        right:-4px!important;
        bottom:-3px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();
