(()=>{
  fitDescription=function(){
    const d=document.querySelector('#res .campaign-description');
    if(!d)return;
    d.style.fontSize='11.5px';d.style.lineHeight='1.3';
    requestAnimationFrame(()=>{
      const lh=parseFloat(getComputedStyle(d).lineHeight)||15;
      const lines=Math.ceil(d.scrollHeight/lh);
      d.style.fontSize=(lines>=4?9.5:lines===3?10.5:lines===2?11:11.5)+'px';
    });
  };
  const s=document.createElement('style');
  s.textContent='.result-card .rname{white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;min-width:0!important}';
  document.head.appendChild(s);
})();