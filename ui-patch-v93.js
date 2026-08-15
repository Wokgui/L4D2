(()=>{
  const s=document.createElement('style');
  s.textContent=`
    html body .draw.page.on{
      padding-bottom:0!important;
    }
    html body .draw .res:not(.home-res){
      padding-bottom:2.25px!important;
    }
    html body .draw .res:not(.home-res) .result-card.has-last-played .result-content{
      padding-bottom:4.5px!important;
    }
    html body .draw .res:not(.home-res) .result-card.has-last-played .last-played-inline{
      margin-bottom:0!important;
    }
    @media(max-height:720px){
      html body .draw .res:not(.home-res){
        padding-bottom:1.5px!important;
      }
      html body .draw .res:not(.home-res) .result-card.has-last-played .result-content{
        padding-bottom:3px!important;
      }
    }
  `;
  document.head.appendChild(s);
})();
