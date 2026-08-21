(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* Match the drawn campaign Steam icon to the 40px icons used in Campagnes gardées. */
    html body .draw .res:not(.home-res) .result-card .rhead{
      padding-left:40px!important;
      padding-right:40px!important;
    }
    html body .draw .res:not(.home-res) .result-card .wk{
      width:40px!important;
      height:40px!important;
    }
  `;
  document.head.appendChild(s);
})();
