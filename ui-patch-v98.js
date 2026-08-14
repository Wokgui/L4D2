(()=>{
  const previousFitDescription=fitDescription;

  function stretchMultilineDescription(){
    const d=document.querySelector('#res .result-card .campaign-description');
    if(!d)return;

    /* Repartir du padding normal pour mesurer le vrai nombre de lignes. */
    d.style.removeProperty('padding-top');
    d.style.removeProperty('padding-bottom');

    requestAnimationFrame(()=>{
      const cs=getComputedStyle(d);
      const lineHeight=parseFloat(cs.lineHeight)||13;
      const pad=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);
      const contentHeight=Math.max(lineHeight,d.scrollHeight-pad);
      const lines=Math.max(1,Math.ceil((contentHeight-.5)/lineHeight));

      if(lines>=2){
        const verticalPadding=lines>=3?12.5:12;
        d.style.setProperty('padding-top',verticalPadding+'px','important');
        d.style.setProperty('padding-bottom',verticalPadding+'px','important');
      }
    });
  }

  fitDescription=function(){
    previousFitDescription();
    requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(stretchMultilineDescription)));
  };

  requestAnimationFrame(()=>requestAnimationFrame(()=>fitDescription()));
})();
