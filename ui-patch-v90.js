(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* Un peu plus d'air sous la dernière tuile, sans toucher au reste. */
    .result-card.has-last-played .result-content{
      padding-bottom:20px!important;
    }
    @media(max-height:720px){
      .result-card.has-last-played .result-content{
        padding-bottom:15px!important;
      }
    }
  `;
  document.head.appendChild(s);
})();
