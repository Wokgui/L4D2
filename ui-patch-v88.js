(()=>{
  fitDescription=function(){
    const d=document.querySelector('#res .campaign-description');
    if(!d)return;

    d.style.fontFamily='inherit';
    d.style.fontSize='11.5px';
    d.style.lineHeight='1.15';
    d.style.fontWeight='900';

    requestAnimationFrame(()=>{
      const lh=parseFloat(getComputedStyle(d).lineHeight)||13.25;
      const lines=Math.max(1,Math.ceil(d.scrollHeight/lh));
      if(lines===2){d.style.fontSize='11px';d.style.lineHeight='1.2';d.style.fontWeight='750'}
      else if(lines===3){d.style.fontSize='10.5px';d.style.lineHeight='1.2';d.style.fontWeight='750'}
      else if(lines>=4){d.style.fontSize='9.5px';d.style.lineHeight='1.18';d.style.fontWeight='750'}
    });
  };

  const s=document.createElement('style');
  s.textContent='.result-card.has-last-played .result-content{gap:8px!important}.last-played-inline{margin-top:0!important}@media(max-height:720px){.result-card.has-last-played .result-content{gap:6px!important}.last-played-inline{margin-top:0!important}}';
  document.head.appendChild(s);
})();