(()=>{
  const previousFitDescription=fitDescription;

  fitDescription=function(){
    previousFitDescription();

    requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const d=document.querySelector('#res .result-card .campaign-description');
      if(!d)return;

      const current=parseFloat(d.style.paddingTop)||0;
      let padding=null;

      if(current>=12.75)padding=9;
      else if(current>=12.25)padding=8;
      else if(current>=11.5)padding=7;

      if(padding!==null){
        d.style.setProperty('padding-top',padding+'px','important');
        d.style.setProperty('padding-bottom',padding+'px','important');
      }
    })));
  };
})();
