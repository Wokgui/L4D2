(()=>{
  fitDescription=function(){
    const d=document.querySelector('#res .campaign-description');
    if(d){d.style.fontSize='11.5px';d.style.lineHeight='1.3'}
  };
  const s=document.createElement('style');
  s.textContent='.result-card .campaign-description{font-size:11.5px!important;line-height:1.3!important}.result-card .rname{white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;min-width:0!important}@media(max-height:720px){.result-card .campaign-description{font-size:10px!important}}';
  document.head.appendChild(s);
})();