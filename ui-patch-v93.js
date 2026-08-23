(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* Deux respirations identiques : sous la dernière campagne et avant le menu bas. */
    html body .draw.page.on{padding-bottom:0!important}
    html body .draw .res:not(.home-res){padding-bottom:9px!important}
    html body .draw .res:not(.home-res) .result-card.has-last-played .result-content{padding-bottom:9px!important}
    html body .draw .res:not(.home-res) .result-card.has-last-played .last-played-inline{margin-bottom:0!important}

    /* Le descriptif a désormais la même hauteur visuelle que la tuile du dessous.
       Comme la photo est le seul élément flexible de la fiche, tout l'espace libéré
       lui revient automatiquement, sans toucher au centrage du titre ni des logos. */
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description,
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-1,
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-2,
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-3,
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-4{
      box-sizing:border-box!important;
      height:43px!important;
      min-height:43px!important;
      max-height:43px!important;
      margin-top:4.5px!important;
      padding:4px 10px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      overflow:hidden!important;
      font-size:11.5px!important;
      line-height:1.12!important;
    }
    html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description + .last-played-inline{
      margin-top:4.5px!important;
    }

    /* Sur la largeur d'un téléphone, la tuile du dessous mesure environ 41 px. */
    @media(max-width:420px){
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-1,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-2,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-3,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-4{
        height:41px!important;
        min-height:41px!important;
        max-height:41px!important;
        padding:3px 8px!important;
      }
    }

    /* Aucun élément de la fiche ne s'anime. */
    html body .draw .res:not(.home-res) .result-card,
    html body .draw .res:not(.home-res) .result-card *,
    html body .draw .res:not(.home-res) .result-card>img,
    html body .draw .res:not(.home-res) .result-card>.photo-fallback{
      transition:none!important;
      animation:none!important;
    }

    @media(max-height:720px){
      html body .draw .res:not(.home-res){padding-bottom:6px!important}
      html body .draw .res:not(.home-res) .result-card.has-last-played .result-content{padding-bottom:6px!important}
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-1,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-2,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-3,
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description.desc-lines-4{
        height:35px!important;
        min-height:35px!important;
        max-height:35px!important;
        margin-top:3px!important;
        padding:2px 8px!important;
        font-size:10.5px!important;
        line-height:1.08!important;
      }
      html body .draw .res:not(.home-res) .result-card.has-last-played .campaign-description + .last-played-inline{margin-top:3px!important}
    }
  `;
  document.head.appendChild(s);

  /* Ajustement du texte entièrement synchrone : il se termine dans le même
     rendu que l'insertion de la fiche, sans requestAnimationFrame ni second état visible. */
  window.fitDescription=function(){
    const card=document.querySelector('#res .result-card.has-last-played');
    if(!card)return;
    const desc=card.querySelector('.campaign-description');
    const title=card.querySelector('.rname');

    if(desc){
      desc.style.removeProperty('font-size');
      let size=parseFloat(getComputedStyle(desc).fontSize)||11.5;
      let guard=0;
      while(desc.scrollHeight>desc.clientHeight+1&&size>8&&guard<20){
        size-=0.25;
        desc.style.setProperty('font-size',size+'px','important');
        guard++;
      }
    }

    if(title){
      title.style.removeProperty('font-size');
      let size=parseFloat(getComputedStyle(title).fontSize)||27;
      let guard=0;
      while(title.scrollWidth>title.clientWidth+1&&size>13&&guard<30){
        size-=0.5;
        title.style.setProperty('font-size',size+'px','important');
        guard++;
      }
    }
  };

  /* L'ancienne fiche reste affichée tant que la prochaine photo n'est pas décodée. */
  const go=document.getElementById('go');
  if(go){
    go.onclick=async()=>{
      const p=typeof pool==='function'?pool():[];
      const res=document.getElementById('res');
      if(!p.length){
        if(res){res.classList.remove('home-res');res.innerHTML='<div class=err>Aucune campagne avec ces filtres.</div>'}
        return;
      }
      const c=p[Math.floor(Math.random()*p.length)];
      if(c&&c.photo){
        const preload=new Image();
        preload.src=c.photo;
        try{
          if(typeof preload.decode==='function') await preload.decode();
          else await new Promise(resolve=>{preload.onload=preload.onerror=resolve});
        }catch(_){}
      }
      if(typeof setLastPlayed==='function') setLastPlayed(c);
      else if(typeof draw==='function') draw(c);
    };
  }
})();

(()=>{
  const result=document.getElementById('res');
  const drawTab=document.querySelector('.nav button[data-p="d"]');
  if(!result||!drawTab||!result.classList.contains('home-res'))return;
  const homeMarkup=result.innerHTML;
  const showHome=()=>{
    result.classList.add('home-res');
    result.innerHTML=homeMarkup;
  };
  drawTab.addEventListener('click',showHome);
  window.showL4D2Home=showHome;
})();

(()=>{
  if(document.querySelector('script[data-secure-github-save]'))return;
  const script=document.createElement('script');
  script.src='/secure-github-save.js?v=1';
  script.dataset.secureGithubSave='1';
  document.head.appendChild(script);
})();

(()=>{
  const tools=document.querySelector('.cloud-backup-tools');
  const input=document.getElementById('imp');
  if(!tools||!input||tools.querySelector('.cloud-backup-import'))return;
  const button=document.createElement('button');
  button.type='button';
  button.className='cloud-backup-import secondary';
  button.textContent='Importer';
  button.addEventListener('click',()=>input.click());
  const exportButton=tools.querySelector('.cloud-backup-export');
  if(exportButton) exportButton.insertAdjacentElement('afterend',button);
  else {
    const before=tools.querySelector('.cloud-backup-download');
    tools.insertBefore(button,before||tools.firstChild);
  }
})();

(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    html body .draw .res:not(.home-res) .result-card .rhead{
      position:relative!important;
      padding-left:calc(var(--draw-side-icon-size,27px) + 8px)!important;
      padding-right:calc(var(--draw-side-icon-size,27px) + 8px)!important;
    }
    html body .draw .res:not(.home-res) .draw-kept-edit{
      position:absolute!important;left:0!important;top:50%!important;transform:translateY(-50%)!important;
      width:var(--draw-side-icon-size,27px)!important;height:var(--draw-side-icon-size,27px)!important;
      min-width:var(--draw-side-icon-size,27px)!important;min-height:var(--draw-side-icon-size,27px)!important;
      max-width:var(--draw-side-icon-size,27px)!important;max-height:var(--draw-side-icon-size,27px)!important;
      padding:0!important;border:0!important;border-radius:50%!important;background:var(--p2)!important;color:var(--g)!important;
      display:grid!important;place-items:center!important;box-shadow:inset 0 0 0 1px var(--l)!important;z-index:3!important;
    }
    html body .draw .res:not(.home-res) .draw-kept-edit svg{width:54%!important;height:54%!important;display:block!important;fill:none!important;stroke:currentColor!important;stroke-width:2.2!important;stroke-linecap:round!important;stroke-linejoin:round!important}
    html body .draw .res:not(.home-res) .previous-draw-slot{
      margin:4.5px 0 0!important;padding:0!important;height:43px!important;min-height:43px!important;max-height:43px!important;
      display:block!important;position:relative!important;overflow:hidden!important;background:transparent!important;border:0!important;
    }
    html body .draw .res:not(.home-res) .previous-draw-button{
      width:100%!important;height:100%!important;border:1px solid var(--l)!important;border-radius:11px!important;background:var(--p2)!important;color:var(--i)!important;
      display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;padding:0 12px!important;font-weight:900!important;font-size:11.5px!important;
    }
    html body .draw .res:not(.home-res) .previous-draw-button svg{width:18px!important;height:18px!important;display:block!important;fill:none!important;stroke:var(--g)!important;stroke-width:2.4!important;stroke-linecap:round!important;stroke-linejoin:round!important}
    @media(max-width:420px){
      html body .draw .res:not(.home-res) .previous-draw-slot{height:41px!important;min-height:41px!important;max-height:41px!important}
      html body .draw .res:not(.home-res) .previous-draw-button{font-size:11px!important}
    }
    @media(max-height:720px){
      html body .draw .res:not(.home-res) .previous-draw-slot{height:35px!important;min-height:35px!important;max-height:35px!important;margin-top:3px!important}
      html body .draw .res:not(.home-res) .previous-draw-button{font-size:10.5px!important}
    }
  `;
  document.head.appendChild(style);

  const originalDraw=typeof draw==='function'?draw:null;
  if(!originalDraw)return;

  function findCampaign(id){
    return Array.isArray(C)?C.find(c=>String(c.id)===String(id)):null;
  }

  function openKeptEditor(c){
    const tab=document.querySelector('.nav button[data-p="k"]');
    if(tab)tab.click();
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(typeof kept==='function')kept();
      const item=[...document.querySelectorAll('#kl .item')].find(node=>String(node.dataset.id)===String(c.id));
      if(!item)return;
      item.classList.add('open');
      item.scrollIntoView({behavior:'smooth',block:'center'});
      const editor=item.querySelector('.campaign-name-edit,.nt,.ca,.ma,.di,.wu');
      if(editor)editor.setAttribute('data-opened-from-draw','1');
    }));
  }

  function addEditShortcut(card,c){
    const rhead=card.querySelector('.rhead');
    if(!rhead)return;
    rhead.querySelector('.draw-kept-edit')?.remove();
    const keptCampaign=findCampaign(c&&c.id);
    if(!keptCampaign)return;
    const steam=rhead.querySelector('.wk');
    const size=steam?Math.max(1,Math.round(steam.getBoundingClientRect().width)):27;
    rhead.style.setProperty('--draw-side-icon-size',size+'px');
    const button=document.createElement('button');
    button.type='button';
    button.className='draw-kept-edit';
    button.setAttribute('aria-label','Ouvrir cette campagne dans les campagnes gardées et modifier');
    button.title='Modifier dans les campagnes gardées';
    button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg>';
    button.onclick=e=>{e.preventDefault();e.stopPropagation();openKeptEditor(keptCampaign)};
    rhead.prepend(button);
  }

  function addPreviousButton(card,c){
    const isCurrent=LP&&c&&String(LP.id)===String(c.id);
    const previous=isCurrent&&LP.previous?findCampaign(LP.previous.id):null;
    let slot=card.querySelector('.last-played-inline')||card.querySelector('.last-drawn-label');
    if(!previous){
      if(slot)slot.remove();
      return;
    }
    if(!slot){
      slot=document.createElement('div');
      slot.className='last-drawn-label';
      const content=card.querySelector('.result-content');
      const rhead=content&&content.querySelector('.rhead');
      if(content)content.insertBefore(slot,rhead||content.firstChild);
    }
    slot.classList.add('previous-draw-slot');
    slot.innerHTML='';
    const button=document.createElement('button');
    button.type='button';
    button.className='previous-draw-button';
    button.setAttribute('aria-label','Afficher la campagne tirée au sort précédemment : '+(previous.name||'campagne précédente'));
    button.title=previous.name||'Campagne précédente';
    button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7 4 12l5 5"/><path d="M5 12h8a6 6 0 1 1 0 12" transform="translate(0 -6)"/></svg><span>Campagne précédente</span>';
    button.onclick=e=>{e.preventDefault();e.stopPropagation();draw(previous)};
    slot.appendChild(button);
  }

  function enhanceDraw(c){
    const card=document.querySelector('#res .result-card');
    if(!card||!c)return;
    addEditShortcut(card,c);
    addPreviousButton(card,c);
    if(typeof fitDescription==='function')fitDescription();
  }

  draw=function(c,remember=false){
    const result=originalDraw(c,remember);
    enhanceDraw(c);
    return result;
  };
})();
