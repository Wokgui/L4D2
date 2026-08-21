(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* The Steam PNG has a large transparent margin. Enlarge the rendered box so the
       visible Steam mark matches the apparent size of the icons in Campagnes gardées. */
    html body .draw .res:not(.home-res) .result-card.has-last-played .rhead{
      min-height:60px!important;
      height:60px!important;
      padding-left:64px!important;
      padding-right:64px!important;
    }
    html body .draw .res:not(.home-res) .result-card.has-last-played .rhead .wk{
      width:60px!important;
      height:60px!important;
      min-width:60px!important;
      min-height:60px!important;
      flex:0 0 60px!important;
      right:0!important;
      top:50%!important;
      transform:translateY(-50%)!important;
      overflow:visible!important;
    }
    html body .draw .res:not(.home-res) .result-card.has-last-played .rhead .wk img{
      display:block!important;
      width:60px!important;
      height:60px!important;
      min-width:60px!important;
      max-width:60px!important;
      min-height:60px!important;
      max-height:60px!important;
      object-fit:contain!important;
      border-radius:50%!important;
    }
  `;
  document.head.appendChild(s);
})();
