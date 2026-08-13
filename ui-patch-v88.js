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
  s.textContent='.result-card.has-last-played .result-content{gap:6px!important}.result-card.has-last-played .meta{margin:0!important}.result-card.has-last-played .campaign-description{margin:0!important}.result-card.has-last-played .last-played-inline{margin:0!important}.draw .res:not(.home-res){padding-top:4px!important}@media(max-width:420px){.draw .res:not(.home-res){padding-top:3px!important}}@media(max-height:720px){.result-card.has-last-played .result-content{gap:5px!important}.result-card.has-last-played .meta{margin:0!important}.result-card.has-last-played .campaign-description{margin:0!important}.result-card.has-last-played .last-played-inline{margin:0!important}.draw .res:not(.home-res){padding-top:2px!important}}';
  document.head.appendChild(s);

  let homeGap=null;
  const res=document.getElementById('res');
  const selector=document.querySelector('.selector-card');

  function rememberHomePosition(){
    const welcome=res&&res.classList.contains('home-res')&&res.querySelector('.welcome');
    if(!welcome||!selector)return;
    homeGap=welcome.getBoundingClientRect().top-selector.getBoundingClientRect().bottom;
  }

  function alignDrawnBlock(){
    if(homeGap===null||!selector||!res||res.classList.contains('home-res'))return;
    const card=res.querySelector('.result-card');
    if(!card)return;
    const photo=card.querySelector(':scope > img, :scope > .photo-fallback');
    if(!photo)return;

    card.style.transform='none';
    requestAnimationFrame(()=>{
      const targetPhotoTop=selector.getBoundingClientRect().bottom+homeGap;
      const currentPhotoTop=photo.getBoundingClientRect().top;
      const delta=Math.round(targetPhotoTop-currentPhotoTop);
      card.style.transform=`translateY(${delta}px)`;
    });
  }

  requestAnimationFrame(()=>requestAnimationFrame(rememberHomePosition));
  if(res){
    new MutationObserver(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(res.classList.contains('home-res'))rememberHomePosition();
      else alignDrawnBlock();
    }))).observe(res,{childList:true,subtree:false,attributes:true,attributeFilter:['class']});
  }
  window.addEventListener('resize',()=>requestAnimationFrame(()=>{
    if(res&&res.classList.contains('home-res'))rememberHomePosition();
    else alignDrawnBlock();
  }));
})();
