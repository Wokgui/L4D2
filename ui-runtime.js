// Existing UI module 84
(()=>{
  fitDescription=function(){
    const card=$("res").querySelector(".result-card"),desc=card&&card.querySelector(".campaign-description"),title=card&&card.querySelector(".rname"),values=card?[...card.querySelectorAll(".meta span")]:[],labels=card?[...card.querySelectorAll(".meta b")]:[];
    if(!card||!desc||!title)return;
    const fit=()=>{
      title.style.fontSize="";title.style.lineHeight="";
      [...values,...labels].forEach(e=>{e.style.fontSize="";e.style.lineHeight=""});
      desc.style.fontSize="";desc.style.lineHeight="";
      const base=parseFloat(getComputedStyle(desc).fontSize)||13;
      let scale=1;
      while((desc.scrollHeight>desc.clientHeight+1||card.scrollHeight>card.clientHeight+1)&&scale>.58){
        scale-=.04;
        desc.style.fontSize=base*scale+"px";
        desc.style.lineHeight="1.2";
      }
    };
    requestAnimationFrame(()=>requestAnimationFrame(fit));
  };

  function editDescriptionFull(c){
    const modal=document.createElement('div');
    modal.className='description-edit-modal';
    modal.innerHTML='<div class="description-edit-panel"><div class="description-edit-head"><strong>Descriptif de la campagne</strong><button type="button" class="description-edit-close" aria-label="Fermer">×</button></div><textarea class="description-edit-text"></textarea><div class="description-edit-actions"><button type="button" class="description-edit-cancel">Annuler</button><button type="button" class="description-edit-save">Enregistrer</button></div></div>';
    document.body.appendChild(modal);
    const ta=modal.querySelector('.description-edit-text');
    ta.value=c.notes||c.excelRemark||'';
    const close=()=>modal.remove();
    modal.querySelector('.description-edit-close').onclick=close;
    modal.querySelector('.description-edit-cancel').onclick=close;
    modal.onclick=e=>{if(e.target===modal)close()};
    modal.querySelector('.description-edit-save').onclick=()=>{c.notes=ta.value.trim();c.excelRemark=c.notes;save();close();draw(c)};
    requestAnimationFrame(()=>{ta.focus();ta.setSelectionRange(ta.value.length,ta.value.length)});
  }

  const editResultBase=editResult;
  editResult=function(c,field){if(field==='description')return editDescriptionFull(c);return editResultBase(c,field)};

  const style=document.createElement('style');
  style.textContent=`
    .description-edit-modal{position:fixed;inset:0;z-index:1000;background:#25261f88;display:flex;align-items:center;justify-content:center;padding:18px}
    .description-edit-panel{width:min(100%,620px);max-height:86dvh;background:var(--p);border:1px solid var(--l);border-radius:18px;padding:14px;box-shadow:0 20px 60px #0004;display:flex;flex-direction:column;gap:12px}
    .description-edit-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.description-edit-head strong{font-size:18px}
    .description-edit-close{border:0;background:var(--p2);width:36px;height:36px;border-radius:10px;font-size:24px;line-height:1}
    .description-edit-text{width:100%;min-height:260px;max-height:58dvh;resize:vertical;border:1px solid var(--l);border-radius:12px;background:#fff;padding:12px;font:16px/1.4 system-ui;color:var(--i);overflow:auto}
    .description-edit-actions{display:flex;gap:8px;justify-content:flex-end}.description-edit-actions button{border:1px solid var(--l);border-radius:10px;padding:10px 14px;font-weight:800}.description-edit-cancel{background:var(--p2)}.description-edit-save{background:var(--g);color:#fff;border-color:var(--g)!important}
    .draw .res.home-res .welcome-actions{grid-template-columns:repeat(2,minmax(0,1fr))!important}
    .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon,
    .draw .res.home-res .welcome-actions .favorites .welcome-steam-icon,
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon{overflow:visible!important;contain:layout!important}
    .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon img{
      position:absolute!important;left:50%!important;top:50%!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;transform:translate(-50%,-50%)!important;object-fit:contain!important;border-radius:50%!important
    }
    .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon:after{content:"+"!important;display:grid!important;background:#2f796d!important;color:#fff!important;right:-8px!important;bottom:-6px!important}
    .draw .res.home-res .welcome-actions .favorites .welcome-steam-icon:after{content:"★"!important;display:grid!important;background:#2f796d!important;color:#fff!important}
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{content:"✦"!important;display:grid!important;background:#d8841f!important;color:#fff!important}
    @media(max-width:420px){
      .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon img{width:100%!important;height:100%!important}
      .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon:after{right:-7px!important;bottom:-5px!important}
    }
    @media(max-height:720px){
      .description-edit-text{min-height:190px;max-height:50dvh}
      .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon img{width:100%!important;height:100%!important}
      .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon:after{right:-6px!important;bottom:-4px!important}
    }
  `;
  document.head.appendChild(style);

  function patchSubscriptions(){
    const actions=document.querySelector('.welcome-actions');
    if(!actions)return;
    const a=actions.querySelector('.subscriptions')||actions.querySelector('.favorites');
    if(!a||a.dataset.subscriptionPatched==='1')return;
    a.className='subscriptions';
    a.dataset.subscriptionPatched='1';
    a.href='https://steamcommunity.com/my/myworkshopfiles/?appid=550&browsefilter=mysubscriptions';
    a.setAttribute('aria-label','Mes abonnements Workshop Steam');
    a.innerHTML='<span class="welcome-steam-icon"><img src="/steam-icon-user.png" alt=""></span><span>Abonnements</span>';
  }

  patchSubscriptions();
  requestAnimationFrame(patchSubscriptions);
})();

;
// Existing UI module 85
(()=>{
const oldEdit=editResult;
function pick(c,field){
 const data=field==='category'?['Catégorie',['Oui','Pourquoi pas','Bof','Non'],c.category||'Oui']:field==='difficulty'?['Difficulté',['facile','moyen','difficile'],c.difficulty||'moyen']:['Cartes',[...new Set(C.map(x=>x.maps).filter(Boolean))].sort((a,b)=>a-b).map(String),String(c.maps||'')];
 const m=document.createElement('div');m.className='pick-modal';
 const p=document.createElement('div');p.className='pick-panel';
 const h=document.createElement('strong');h.textContent=data[0];
 const s=document.createElement('select');data[1].forEach(v=>{let o=document.createElement('option');o.value=v;o.textContent=field==='difficulty'?({facile:'Facile',moyen:'Moyen',difficile:'Difficile'}[v]):v;if(String(v)===String(data[2]))o.selected=true;s.appendChild(o)});
 const row=document.createElement('div');row.className='pick-actions';
 const cancel=document.createElement('button');cancel.textContent='Annuler';
 const ok=document.createElement('button');ok.textContent='Enregistrer';ok.className='pick-save';
 row.append(cancel,ok);p.append(h,s,row);m.appendChild(p);document.body.appendChild(m);
 cancel.onclick=()=>m.remove();m.onclick=e=>{if(e.target===m)m.remove()};
 ok.onclick=()=>{let v=s.value;if(field==='maps')c.maps=parseInt(v,10);else if(field==='difficulty')c.difficulty=v;else{c.category=v;if(v!=='Oui'){let x=A.find(a=>a.name.toLowerCase()===c.name.toLowerCase());if(x){x.category=v;x.remark=c.notes||c.excelRemark||''}else A.push({name:c.name,remark:c.notes||c.excelRemark||'',category:v,excelRow:Date.now()});C=C.filter(x=>String(x.id)!==String(c.id))}}save();m.remove();draw(c)};
}
editResult=(c,f)=>['category','maps','difficulty'].includes(f)?pick(c,f):oldEdit(c,f);
const st=document.createElement('style');st.textContent='.pick-modal{position:fixed;inset:0;z-index:1200;background:#25261f88;display:flex;align-items:center;justify-content:center;padding:18px}.pick-panel{width:min(100%,390px);background:var(--p);border:1px solid var(--l);border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:14px;box-shadow:0 20px 60px #0004}.pick-panel strong{font-size:18px}.pick-panel select{width:100%;font-size:17px;padding:12px;border:1px solid var(--l);border-radius:12px;background:#fff}.pick-actions{display:flex;justify-content:flex-end;gap:8px}.pick-actions button{padding:10px 14px;border:1px solid var(--l);border-radius:10px;font-weight:850}.pick-save{background:var(--g);color:#fff}.result-card .rhead .wk,.last-played-steam img{width:27px!important;height:27px!important;min-width:27px!important}.result-card .rhead .wk{border-radius:50%!important}.result-card .rhead .wk img{width:27px!important;height:27px!important;border-radius:50%!important;object-fit:contain!important}#o .item>.row{align-items:flex-start}#o .item>.row>.badge,#o .item>.row .name{font-size:16px!important;line-height:1.15!important;font-weight:900!important}#o .item>.row>.badge{align-self:flex-start;margin-top:0;white-space:nowrap}@media(max-height:720px){.result-card .rhead .wk,.last-played-steam img,.result-card .rhead .wk img{width:23px!important;height:23px!important;min-width:23px!important}}';document.head.appendChild(st);
})();
;
// Existing UI module 87
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
;
// Existing UI module 88
(()=>{
  const HEADER_OFFSET_KEY='l4d2_header_status_offset_v1';
  const STEAM_SIZE=44;
  const LAST_TILE_HEIGHT=46;

  function fitCampaignTitle(card){
    const title=card&&card.querySelector('.rname');
    if(!title)return;

    title.style.removeProperty('font-size');
    title.style.setProperty('white-space','nowrap','important');
    title.style.setProperty('overflow','visible','important');
    title.style.setProperty('text-overflow','clip','important');
    title.style.setProperty('max-width','100%','important');

    requestAnimationFrame(()=>{
      let size=parseFloat(getComputedStyle(title).fontSize)||27;
      let guard=0;
      while(title.scrollWidth>title.clientWidth+1&&size>12&&guard<40){
        size=Math.max(12,size-.5);
        title.style.setProperty('font-size',size+'px','important');
        guard++;
      }
    });
  }

  function lowerLastTile(card){
    const tile=card&&card.querySelector('.last-played-inline');
    if(!card||!tile)return;
    tile.style.setProperty('transform','none','important');
  }

  fitDescription=function(){
    const card=document.querySelector('#res .result-card');
    const d=card&&card.querySelector('.campaign-description');
    if(!card||!d)return;

    fitCampaignTitle(card);
    d.style.removeProperty('padding-top');
    d.style.removeProperty('padding-bottom');

    const reference=card.querySelector('.last-played-copy span');
    const baseSize=reference?(parseFloat(getComputedStyle(reference).fontSize)||11.5):11.5;

    d.style.fontFamily='inherit';
    d.style.setProperty('font-size',baseSize+'px','important');
    d.style.setProperty('line-height','1.15','important');
    d.style.fontWeight='900';

    requestAnimationFrame(()=>{
      const cs=getComputedStyle(d);
      const lh=parseFloat(cs.lineHeight)||baseSize*1.15;
      const pad=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);
      const contentHeight=Math.max(lh,d.scrollHeight-pad);
      const lines=Math.max(1,Math.ceil((contentHeight-.5)/lh));

      if(lines===2){
        d.style.setProperty('font-size',Math.max(7,baseSize-.75)+'px','important');
        d.style.setProperty('line-height','1.18','important');
        d.style.fontWeight='800';
        d.style.setProperty('padding-top','12px','important');
        d.style.setProperty('padding-bottom','12px','important');
      }else if(lines===3){
        d.style.setProperty('font-size',Math.max(7,baseSize-1.5)+'px','important');
        d.style.setProperty('line-height','1.17','important');
        d.style.fontWeight='780';
        d.style.setProperty('padding-top','12.5px','important');
        d.style.setProperty('padding-bottom','12.5px','important');
      }else if(lines>=4){
        d.style.setProperty('font-size',Math.max(7,baseSize-2.25)+'px','important');
        d.style.setProperty('line-height','1.15','important');
        d.style.fontWeight='750';
        d.style.setProperty('padding-top','13px','important');
        d.style.setProperty('padding-bottom','13px','important');
      }

      requestAnimationFrame(()=>{
        const res=document.getElementById('res');
        if(!res)return;
        let size=parseFloat(getComputedStyle(d).fontSize)||baseSize;
        let guard=0;
        while(card.getBoundingClientRect().bottom>res.getBoundingClientRect().bottom-1&&size>7&&guard<24){
          size=Math.max(7,size-.25);
          d.style.setProperty('font-size',size+'px','important');
          d.style.setProperty('line-height','1.12','important');
          guard++;
        }
        lowerLastTile(card);
      });
    });
  };

  const s=document.createElement('style');
  s.textContent=`
    .result-card.has-last-played .result-content{gap:0!important;padding-top:10.8px!important}
    .result-card.has-last-played .meta{margin:0!important}
    .result-card.has-last-played .campaign-description{margin:0!important}
    .result-card.has-last-played .meta + .campaign-description{margin-top:4.5px!important}
    .result-card.has-last-played .campaign-description + .last-played-inline{margin-top:4.5px!important}
    .result-card.has-last-played .last-played-inline{margin-left:0!important;margin-right:0!important;margin-bottom:0!important;flex:0 0 ${LAST_TILE_HEIGHT}px!important;position:relative!important;grid-template-columns:minmax(0,1fr)!important;align-items:center!important;height:${LAST_TILE_HEIGHT}px!important;min-height:${LAST_TILE_HEIGHT}px!important;max-height:${LAST_TILE_HEIGHT}px!important;padding:1px 58px 1px 9px!important;box-sizing:border-box!important;overflow:visible!important;will-change:transform}
    .result-card.has-last-played .last-played-copy{align-self:center!important;line-height:1.05!important}
    .result-card.has-last-played .rhead{min-height:${STEAM_SIZE}px!important;height:${STEAM_SIZE}px!important;margin:0 0 10.8px!important;display:flex!important;align-items:center!important;padding-left:50px!important;padding-right:50px!important}
    .result-card.has-last-played .rname{display:flex!important;align-items:center!important;justify-content:center!important;min-height:${STEAM_SIZE}px!important;line-height:1.05!important;min-width:0!important;width:100%!important}
    .result-card.has-last-played .rhead .wk,.result-card.has-last-played .last-played-steam{width:${STEAM_SIZE}px!important;height:${STEAM_SIZE}px!important;min-width:${STEAM_SIZE}px!important;min-height:${STEAM_SIZE}px!important;flex:0 0 ${STEAM_SIZE}px!important;padding:0!important;border-radius:50%!important}
    .result-card.has-last-played .rhead .wk{top:50%!important;right:0!important;transform:translateY(-50%)!important}
    .result-card.has-last-played .last-played-steam{position:absolute!important;right:10px!important;top:50%!important;transform:translateY(-50%)!important;margin:0!important}
    .result-card.has-last-played .rhead .wk img,.result-card.has-last-played .last-played-steam img{display:block!important;width:${STEAM_SIZE}px!important;height:${STEAM_SIZE}px!important;min-width:${STEAM_SIZE}px!important;max-width:${STEAM_SIZE}px!important;min-height:${STEAM_SIZE}px!important;max-height:${STEAM_SIZE}px!important;object-fit:contain!important;border-radius:50%!important}
    .draw .header-status{touch-action:none;user-select:none;-webkit-user-select:none;cursor:ns-resize}
    .draw .res:not(.home-res){padding-top:4px!important}
    .draw .res:not(.home-res) .result-card{transform:none!important;margin-top:0!important}
    @media(max-width:420px){.draw .res:not(.home-res){padding-top:3px!important}}
    @media(max-height:720px){.result-card.has-last-played .result-content{padding-top:8px!important}.result-card.has-last-played .rhead{margin-bottom:8px!important}.result-card.has-last-played .meta + .campaign-description{margin-top:3px!important}.result-card.has-last-played .campaign-description + .last-played-inline{margin-top:3px!important}.draw .res:not(.home-res){padding-top:2px!important}}
  `;
  document.head.appendChild(s);

  function getHeaderOffset(){
    const n=parseFloat(localStorage.getItem(HEADER_OFFSET_KEY)||'0');
    return Number.isFinite(n)?Math.max(-40,Math.min(40,n)):0;
  }

  function applyHeaderOffset(){
    const status=document.querySelector('.draw .header-status');
    if(!status)return;
    const offset=getHeaderOffset();
    status.style.setProperty('top','50%','important');
    status.style.setProperty('transform',`translateY(calc(-50% + ${offset}px))`,'important');
  }

  function enableHeaderDrag(){
    const status=document.querySelector('.draw .header-status');
    if(!status||status.dataset.dragReady)return;
    status.dataset.dragReady='1';
    status.title='Faire glisser verticalement pour régler la position';

    let startY=0;
    let startOffset=0;
    let dragging=false;

    status.addEventListener('pointerdown',e=>{
      if(e.target.closest('button,a'))return;
      startY=e.clientY;
      startOffset=getHeaderOffset();
      dragging=true;
      try{status.setPointerCapture(e.pointerId)}catch{}
    });

    status.addEventListener('pointermove',e=>{
      if(!dragging)return;
      const next=Math.max(-40,Math.min(40,startOffset+(e.clientY-startY)));
      localStorage.setItem(HEADER_OFFSET_KEY,String(Math.round(next*10)/10));
      applyHeaderOffset();
    });

    const stop=e=>{
      if(!dragging)return;
      dragging=false;
      try{status.releasePointerCapture(e.pointerId)}catch{}
    };
    status.addEventListener('pointerup',stop);
    status.addEventListener('pointercancel',stop);

    status.addEventListener('dblclick',e=>{
      if(e.target.closest('button,a'))return;
      localStorage.removeItem(HEADER_OFFSET_KEY);
      applyHeaderOffset();
    });
  }

  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    applyHeaderOffset();
    enableHeaderDrag();
    fitDescription();
  }));

  window.addEventListener('resize',()=>{
    applyHeaderOffset();
    fitDescription();
    const card=document.querySelector('#res .result-card');
    if(card)lowerLastTile(card);
  });
})();


;
// Existing UI module 91
(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .app{padding-bottom:var(--l4d2-nav-height,43px)!important}
    .draw.page.on{height:calc(100dvh - var(--l4d2-nav-height,43px))!important;max-height:calc(100dvh - var(--l4d2-nav-height,43px))!important}

    /* Géométrie fixe : la fiche remplit réellement tout l'espace disponible. */
    .draw .res:not(.home-res){min-height:0!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:stretch!important;box-sizing:border-box!important}
    .draw .res:not(.home-res) .result-card.has-last-played{flex:1 1 0!important;height:auto!important;min-height:0!important;max-height:none!important;align-self:stretch!important;overflow:hidden!important;box-sizing:border-box!important;transition:none!important;transform:none!important}
    .draw .result-card.has-last-played>img,.draw .result-card.has-last-played>.photo-fallback{flex:1 1 0!important;min-height:0!important;height:auto!important;max-height:none!important;object-fit:cover!important;transition:none!important;transform:none!important}
    .result-card.has-last-played .result-content{flex:0 0 auto!important;min-height:0!important;transition:none!important;transform:none!important}
    .result-card.has-last-played .rhead,.result-card.has-last-played .rname,.result-card.has-last-played .meta,.result-card.has-last-played .campaign-description,.result-card.has-last-played .last-played-inline{transition:none!important}

    .result-card.has-last-played .last-played-inline{padding-left:9px!important;padding-right:58px!important}
    .result-card.has-last-played .last-played-copy{position:absolute!important;left:50%!important;top:50%!important;width:calc(100% - 116px)!important;transform:translate(-50%,-50%)!important;text-align:center!important;align-items:center!important}
    .result-card.has-last-played .last-played-copy b,.result-card.has-last-played .last-played-copy span{width:100%!important;text-align:center!important}

    .draw .res.home-res{padding-top:11px!important;gap:16.5px!important}
    .draw .res.home-res .welcome{flex:1 1 auto!important;min-height:0!important;max-height:none!important}
    .draw .res.home-res .steam-access{flex:0 0 auto!important;min-height:0!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;padding:0 0 11px!important}
    .draw .res.home-res .steam-access-title{margin-bottom:16.5px!important}
    .draw .res.home-res .welcome-actions{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px 10px!important;width:100%!important;margin:0!important}
    .draw .res.home-res .welcome-actions a{min-height:104px!important;padding:12px 8px 10px!important;gap:8px!important;font-size:13px!important}
    .draw .res.home-res .welcome-steam-icon{width:42px!important;height:42px!important;flex-basis:42px!important}

    .draw .title{position:relative!important}
    .draw .steam-chat-top{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;z-index:6!important;width:36px!important;height:36px!important;padding:0!important;display:grid!important;place-items:center!important;border:1px solid var(--l)!important;border-radius:50%!important;background:var(--p)!important;color:var(--g)!important;text-decoration:none!important;box-shadow:0 3px 10px rgba(37,38,31,.08)!important;overflow:visible!important}
    .draw .steam-chat-top img{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;display:block!important;width:32px!important;height:32px!important;min-width:32px!important;object-fit:contain!important;border-radius:50%!important}
    .draw .steam-chat-top .steam-chat-bubble{position:absolute!important;right:-1px!important;bottom:-1px!important;width:15px!important;height:15px!important;padding:1px!important;border-radius:50%!important;background:var(--g)!important;color:#fff!important;border:1.5px solid var(--p)!important;overflow:visible!important;box-sizing:border-box!important}
    .draw .steam-chat-top .steam-chat-bubble path{fill:currentColor!important}
    .draw .steam-chat-top:active{transform:translate(-50%,-50%) scale(.94)!important}

    @media(max-width:420px){
      .draw .res.home-res{padding-top:9px!important;gap:13.5px!important}
      .draw .res.home-res .steam-access{padding:0 0 9px!important}
      .draw .res.home-res .steam-access-title{margin-bottom:13.5px!important}
      .draw .res.home-res .welcome-actions{gap:9px 8px!important}
      .draw .res.home-res .welcome-actions a{min-height:90px!important;padding:9px 6px 8px!important;font-size:11.5px!important}
      .draw .res.home-res .welcome-steam-icon{width:37px!important;height:37px!important;flex-basis:37px!important}
      .draw .steam-chat-top{width:34px!important;height:34px!important;overflow:visible!important}
      .draw .steam-chat-top img{width:42px!important;height:42px!important;min-width:42px!important;max-width:42px!important}
      .draw .steam-chat-top .steam-chat-bubble{width:16px!important;height:16px!important;padding:.8px!important;right:0!important;bottom:0!important}
    }
    @media(max-height:720px){
      .draw .res.home-res{padding-top:7px!important;gap:9.5px!important}
      .draw .res.home-res .steam-access{padding:0 0 7px!important}
      .draw .res.home-res .steam-access-title{margin-bottom:9.5px!important}
      .draw .res.home-res .welcome-actions{gap:6px 7px!important}
      .draw .res.home-res .welcome-actions a{min-height:67px!important;padding:5px!important;gap:4px!important;font-size:10.5px!important}
      .draw .res.home-res .welcome-steam-icon{width:29px!important;height:29px!important;flex-basis:29px!important}
    }
  `;
  document.head.appendChild(style);

  function installSteamChatShortcut(){
    const title=document.querySelector('.draw .title');
    if(!title||title.querySelector('.steam-chat-top'))return;
    const link=document.createElement('a');
    link.className='steam-chat-top';
    link.href='https://steamcommunity.com/chat/';
    link.target='_blank';
    link.rel='noopener';
    link.setAttribute('aria-label','Ouvrir le Chat Steam');
    link.title='Chat Steam';
    link.innerHTML='<img src="/steam-icon.png" alt=""><svg class="steam-chat-bubble" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v12H9l-5 4V4zm3 4v2h10V8H7zm0 4v2h7v-2H7z"/></svg>';
    title.appendChild(link);
  }

  /* La hauteur de navigation est fixée dans le <head> avant le premier rendu.
     Ne jamais la remesurer ici : sur Android/PWA, cette mesure tardive pouvait
     modifier la hauteur utile pendant le fondu du splash. */
  window.fitDescription=function(){};
  installSteamChatShortcut();
})();

;
// Existing UI module 93
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
  const tools=document.querySelector('.cloud-backup-tools');
  const input=document.getElementById('imp');
  if(!tools||!input||tools.querySelector('.cloud-backup-import'))return;
  const button=document.createElement('button');
  button.type='button';
  button.className='cloud-backup-import secondary';
  button.textContent='Importer';
  button.addEventListener('click',()=>window.L4D2Drive?.import());
  const exportButton=tools.querySelector('.cloud-backup-export');
  if(exportButton) exportButton.insertAdjacentElement('afterend',button);
  else {
    const before=tools.querySelector('.cloud-backup-download')||tools.querySelector('h3');
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

      /* Arrivée immédiate sur la campagne ouverte : aucune animation de défilement. */
      const root=document.documentElement;
      const body=document.body;
      const oldRootBehavior=root.style.scrollBehavior;
      const oldBodyBehavior=body.style.scrollBehavior;
      root.style.scrollBehavior='auto';
      body.style.scrollBehavior='auto';
      const top=Math.max(0,window.scrollY+item.getBoundingClientRect().top-10);
      window.scrollTo(0,top);
      root.style.scrollBehavior=oldRootBehavior;
      body.style.scrollBehavior=oldBodyBehavior;

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

;
// Existing UI module 97
(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    /* Steam : neutralise définitivement les anciens fonds, recadrages et clips. */
    html body .app .draw .res.home-res .welcome-actions .welcome-steam-icon{
      position:relative!important;
      width:42px!important;
      height:42px!important;
      min-width:42px!important;
      min-height:42px!important;
      max-width:42px!important;
      max-height:42px!important;
      flex:0 0 42px!important;
      overflow:visible!important;
      contain:none!important;
      background:none!important;
      border-radius:0!important;
      clip-path:none!important;
    }
    html body .app .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon>img,
    html body .app .draw .res.home-res .welcome-actions .news .welcome-steam-icon>img{
      position:static!important;
      left:auto!important;
      top:auto!important;
      display:block!important;
      visibility:visible!important;
      width:100%!important;
      height:100%!important;
      min-width:100%!important;
      min-height:100%!important;
      max-width:100%!important;
      max-height:100%!important;
      margin:0!important;
      transform:none!important;
      object-fit:contain!important;
      object-position:center!important;
      border-radius:50%!important;
      clip-path:none!important;
      background:transparent!important;
    }
    html body .app .draw .res.home-res .welcome-actions .shortcut-custom>svg{
      display:block!important;
      width:100%!important;
      height:100%!important;
      max-width:100%!important;
      max-height:100%!important;
    }

    /* Chat Steam : même image, volontairement plus petite dans sa cible tactile. */
    html body .app .draw .title .steam-chat-top .steam-chat-glyph{
      display:grid!important;
      place-items:center!important;
      overflow:visible!important;
      contain:none!important;
      background:none!important;
      clip-path:none!important;
    }
    html body .app .draw .title .steam-chat-top .steam-chat-glyph>img,
    html body .app .draw .title .steam-chat-top>img{
      position:static!important;
      left:auto!important;
      top:auto!important;
      display:block!important;
      visibility:visible!important;
      width:78%!important;
      height:78%!important;
      min-width:0!important;
      min-height:0!important;
      max-width:78%!important;
      max-height:78%!important;
      margin:auto!important;
      transform:none!important;
      object-fit:contain!important;
      object-position:center!important;
      border-radius:50%!important;
      clip-path:none!important;
      background:transparent!important;
    }

    /* Gardées : même icône complète, avec davantage d'air. */
    html body #k .wk{
      display:grid!important;
      place-items:center!important;
      overflow:visible!important;
      contain:none!important;
      background:none!important;
      clip-path:none!important;
    }
    html body #k .wk img{
      position:static!important;
      display:block!important;
      visibility:visible!important;
      width:78%!important;
      height:78%!important;
      min-width:0!important;
      min-height:0!important;
      max-width:78%!important;
      max-height:78%!important;
      margin:auto!important;
      transform:none!important;
      object-fit:contain!important;
      object-position:center!important;
      border-radius:50%!important;
      clip-path:none!important;
      background:transparent!important;
    }

    @media(max-width:420px){
      html[data-l4d2-height="regular"] body .app .draw .res.home-res .welcome-actions .welcome-steam-icon{
        width:37px!important;height:37px!important;min-width:37px!important;min-height:37px!important;max-width:37px!important;max-height:37px!important;flex-basis:37px!important;
      }
      html[data-l4d2-height="compact"] body .app .draw .res.home-res .welcome-actions .welcome-steam-icon{
        width:29px!important;height:29px!important;min-width:29px!important;min-height:29px!important;max-width:29px!important;max-height:29px!important;flex-basis:29px!important;
      }
    }
  `;
  document.head.appendChild(style);

  /* Les anciens balisages restent compatibles, mais utilisent tous la ressource fournie. */
  const normalizeSteamImages=root=>{
    (root||document).querySelectorAll('.welcome-actions .subscriptions .welcome-steam-icon img,.welcome-actions .news .welcome-steam-icon img,.steam-chat-top img,#k .wk img').forEach(img=>{
      if(img.getAttribute('src')!=='/steam-icon-user.png')img.setAttribute('src','/steam-icon-user.png');
    });
  };
  normalizeSteamImages(document);
  requestAnimationFrame(()=>normalizeSteamImages(document));

  const saved=document.getElementById('kl');
  if(saved){
    let queued=false;
    new MutationObserver(()=>{
      if(queued)return;
      queued=true;
      queueMicrotask(()=>{
        queued=false;
        normalizeSteamImages(saved);
      });
    }).observe(saved,{childList:true,subtree:true});
  }
})();

(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    /* Autres campagnes : le bouton Modifier reste seul et centré quand la fiche est fermée. */
    #o .item > .acts{
      width:100%!important;
      display:flex!important;
      justify-content:center!important;
      align-items:center!important;
    }
    #o .item > .acts .eo{
      margin-left:auto!important;
      margin-right:auto!important;
    }
    /* Cache immédiatement Supprimer tant qu'il n'a pas été déplacé dans la zone dépliée. */
    #o .item > .acts .do{display:none!important}

    /* Enregistrer et Supprimer sont centrés dans la partie dépliée. */
    #o .item .det .so{
      display:block!important;
      width:max-content!important;
      margin:7px auto 0!important;
    }
    #o .item .det .other-delete-row{
      display:flex!important;
      justify-content:center!important;
      align-items:center!important;
      margin-top:8px!important;
    }
    #o .item .det .other-delete-row .do{
      display:inline-flex!important;
      align-items:center!important;
      justify-content:center!important;
    }
  `;
  document.head.appendChild(style);

  function patchOtherItem(item){
    if(!item)return;
    const acts=[...item.children].find(node=>node.classList&&node.classList.contains('acts'));
    const det=[...item.children].find(node=>node.classList&&node.classList.contains('det'));
    if(!det)return;

    const edit=acts&&acts.querySelector('.eo');
    if(acts){
      acts.style.setProperty('justify-content','center','important');
      acts.style.setProperty('width','100%','important');
    }
    if(edit){
      edit.style.setProperty('margin-left','auto','important');
      edit.style.setProperty('margin-right','auto','important');
    }

    const save=det.querySelector('.so');
    if(save){
      save.style.setProperty('display','block','important');
      save.style.setProperty('width','max-content','important');
      save.style.setProperty('margin','7px auto 0','important');
    }

    const del=item.querySelector('.do');
    if(!del)return;
    let row=det.querySelector('.other-delete-row');
    if(!row){
      row=document.createElement('div');
      row.className='other-delete-row';
      det.appendChild(row);
    }
    if(del.parentElement!==row)row.appendChild(del);
  }

  function patchOthers(){
    const root=document.getElementById('ol');
    if(!root)return;
    root.querySelectorAll('.item').forEach(patchOtherItem);
  }

  patchOthers();
  const root=document.getElementById('ol');
  if(root){
    let queued=false;
    new MutationObserver(()=>{
      if(queued)return;
      queued=true;
      queueMicrotask(()=>{
        queued=false;
        patchOthers();
      });
    }).observe(root,{childList:true,subtree:true});
  }
})();

;
(function(){
  'use strict';

  const SUPABASE_URL='https://oxdrhwveuctrorrkuurw.supabase.co';
  const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZHJod3ZldWN0cm9ycmt1dXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2MjYzNDQsImV4cCI6MjEwMTIwMjM0NH0.lrdF-JILpgAwSrMLVjeU0fcKd2anOhp_T0qtEtJTVc0';
  if(!window.supabase?.createClient)return;

  const authClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{
    auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
  });

  githubSave=async function(showAlert=false){
    if(syncing)return;
    syncing=true;
    syncLabel('Sauvegarde externe en cours…');
    try{
      const {data}=await authClient.auth.getSession();
      const token=data?.session?.access_token;
      if(!token)throw new Error('Connectez-vous d’abord à la sauvegarde cloud.');
      const response=await fetch('/api/save',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},
        body:JSON.stringify({campaigns:C,otherCampaigns:A,lastPlayed:LP})
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok||!result.ok)throw new Error(result.error||'Échec sauvegarde');
      syncLabel('Sauvegarde externe '+new Date(result.savedAt).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}));
      if(showAlert)alert('Sauvegarde externe enregistrée');
    }catch(error){
      syncLabel('Sauvegarde externe indisponible');
      if(showAlert)alert(error.message||'Sauvegarde externe indisponible');
    }finally{
      syncing=false;
    }
  };
})();

;
// Existing UI module 89
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

;
// Existing UI module 90
(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* Le sélecteur reste lisible mais libère davantage de hauteur au résultat. */
    .draw .selector-card{
      margin:3px 0 6px!important;
      padding:8px 11px 10px!important;
    }
    .draw .selector-card .selector-title{
      margin:0 0 6px!important;
    }
    .draw .selector-card .filter-row{
      margin:2px 0!important;
    }
    .draw .selector-card .drawbtn{
      margin:6px auto 1px!important;
      min-height:42px!important;
      padding:8px 18px!important;
    }

    /* La fiche entière doit toujours finir avant la navigation. */
    .draw .res:not(.home-res){
      padding-top:3px!important;
      padding-bottom:6px!important;
      overflow:hidden!important;
    }
    .draw .res:not(.home-res) .result-card.has-last-played{
      width:100%!important;
      height:100%!important;
      min-height:0!important;
      max-height:100%!important;
      margin:0!important;
      align-self:stretch!important;
      overflow:hidden!important;
      display:flex!important;
      flex-direction:column!important;
      box-sizing:border-box!important;
    }

    /* La photo est la zone flexible : grande quand il y a de la place, elle seule se réduit si nécessaire. */
    .draw .result-card.has-last-played>img,
    .draw .result-card.has-last-played>.photo-fallback{
      flex:1 1 180px!important;
      width:100%!important;
      height:auto!important;
      min-height:145px!important;
      max-height:220px!important;
      object-fit:cover!important;
    }

    /* Tout le reste garde sa taille naturelle : plus rien ne pousse la dernière tuile sous la barre du bas. */
    .result-card.has-last-played .result-content{
      flex:0 0 auto!important;
      min-height:0!important;
      padding:7px 12px 8px!important;
      gap:0!important;
      display:flex!important;
      flex-direction:column!important;
      box-sizing:border-box!important;
    }

    /* Titre réellement centré, Steam ne décale pas le texte. */
    .result-card.has-last-played .rhead{
      position:relative!important;
      min-height:54px!important;
      height:54px!important;
      margin:0 0 7px!important;
      padding:5px 54px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      box-sizing:border-box!important;
    }
    .result-card.has-last-played .rname{
      width:100%!important;
      min-width:0!important;
      min-height:44px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      text-align:center!important;
      white-space:normal!important;
      overflow:visible!important;
      text-overflow:clip!important;
      font-size:clamp(19px,5.3vw,27px)!important;
      line-height:1.05!important;
      font-weight:900!important;
      text-decoration:none!important;
      border:0!important;
      outline:0!important;
      cursor:text!important;
    }
    .result-card.has-last-played .rhead .wk{
      position:absolute!important;
      right:4px!important;
      top:50%!important;
      transform:translateY(-50%)!important;
      width:42px!important;
      height:42px!important;
      min-width:42px!important;
      min-height:42px!important;
      padding:0!important;
      border-radius:50%!important;
    }
    .result-card.has-last-played .rhead .wk img{
      width:42px!important;
      height:42px!important;
      max-height:42px!important;
      border-radius:50%!important;
      object-fit:contain!important;
    }

    /* Métadonnées compactes et constantes. */
    .result-card.has-last-played .meta{
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:6px!important;
      margin:0!important;
    }
    .result-card.has-last-played .meta span{
      min-height:46px!important;
      padding:5px 3px!important;
      display:flex!important;
      flex-direction:column!important;
      align-items:center!important;
      justify-content:center!important;
      box-sizing:border-box!important;
    }

    /* Descriptif : hauteur déterminée uniquement par le nombre réel de lignes. */
    .result-card.has-last-played .campaign-description{
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      text-align:center!important;
      white-space:normal!important;
      overflow:hidden!important;
      overflow-wrap:anywhere!important;
      margin:6px 0 0!important;
      padding:6px 12px!important;
      border-radius:12px!important;
      box-sizing:border-box!important;
      font-family:inherit!important;
      font-weight:800!important;
      line-height:1.18!important;
      color:#343a33!important;
    }
    .result-card.has-last-played .campaign-description.desc-lines-1{
      min-height:42px!important;
      height:42px!important;
      font-size:12px!important;
    }
    .result-card.has-last-played .campaign-description.desc-lines-2{
      min-height:54px!important;
      height:54px!important;
      font-size:11.5px!important;
    }
    .result-card.has-last-played .campaign-description.desc-lines-3{
      min-height:66px!important;
      height:66px!important;
      font-size:11px!important;
    }
    .result-card.has-last-played .campaign-description.desc-lines-4{
      min-height:76px!important;
      height:76px!important;
      font-size:10.5px!important;
    }

    /* La dernière campagne reste toujours entièrement visible. */
    .result-card.has-last-played .last-played-inline{
      position:relative!important;
      flex:0 0 50px!important;
      min-height:50px!important;
      height:50px!important;
      max-height:50px!important;
      margin:6px 0 0!important;
      padding:4px 54px 4px 9px!important;
      display:flex!important;
      align-items:center!important;
      overflow:hidden!important;
      box-sizing:border-box!important;
    }
    .result-card.has-last-played .last-played-copy{
      min-width:0!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      line-height:1.06!important;
    }
    .result-card.has-last-played .last-played-copy b{
      white-space:nowrap!important;
    }
    .result-card.has-last-played .last-played-copy span{
      white-space:nowrap!important;
      overflow:hidden!important;
      text-overflow:ellipsis!important;
    }
    .result-card.has-last-played .last-played-steam{
      position:absolute!important;
      right:7px!important;
      top:50%!important;
      transform:translateY(-50%)!important;
      width:40px!important;
      height:40px!important;
      min-width:40px!important;
      min-height:40px!important;
      padding:0!important;
      border-radius:50%!important;
    }
    .result-card.has-last-played .last-played-steam img{
      width:40px!important;
      height:40px!important;
      max-height:40px!important;
      border-radius:50%!important;
      object-fit:contain!important;
    }

    /* Aucun indice visuel permanent pour le renommage. */
    #k .rename-campaign{display:none!important}
    #k .item .name,#k .item.open .name{
      text-decoration:none!important;
      border:0!important;
      outline:0!important;
    }
    #k .item.open .name{cursor:text!important}
    #k .campaign-name-block{margin:0 0 10px!important}
    #k .campaign-name-block .dlab{margin-top:0!important}
    #k .campaign-name-edit{
      width:100%!important;
      min-height:38px!important;
      height:auto!important;
      field-sizing:content!important;
      resize:none!important;
      overflow:hidden!important;
      white-space:pre-wrap!important;
      overflow-wrap:anywhere!important;
      padding:8px 11px!important;
      box-sizing:border-box!important;
      font:inherit!important;
      font-size:16px!important;
      line-height:1.25!important;
      font-weight:900!important;
    }
    .draw-title-editor{
      width:100%!important;
      min-width:0!important;
      border:0!important;
      outline:0!important;
      background:transparent!important;
      padding:0!important;
      margin:0!important;
      text-align:center!important;
      color:var(--i)!important;
      font:inherit!important;
      font-size:clamp(19px,5.3vw,27px)!important;
      line-height:1.05!important;
      font-weight:900!important;
      box-shadow:none!important;
    }

    @media(max-height:720px){
      .draw .selector-card{padding:6px 9px 7px!important;margin:2px 0 4px!important}
      .draw .selector-card .selector-title{margin-bottom:4px!important}
      .draw .selector-card .filter-row{margin:1px 0!important}
      .draw .selector-card .drawbtn{margin-top:4px!important;min-height:36px!important;padding:6px 15px!important}
      .draw .res:not(.home-res){padding-bottom:4px!important}
      .draw .result-card.has-last-played>img,.draw .result-card.has-last-played>.photo-fallback{min-height:125px!important;max-height:185px!important}
      .result-card.has-last-played .result-content{padding:5px 9px 6px!important}
      .result-card.has-last-played .rhead{height:48px!important;min-height:48px!important;margin-bottom:5px!important;padding:3px 50px!important}
      .result-card.has-last-played .meta span{min-height:42px!important;padding:4px 2px!important}
      .result-card.has-last-played .campaign-description{margin-top:5px!important;padding:5px 9px!important}
      .result-card.has-last-played .campaign-description.desc-lines-1{height:38px!important;min-height:38px!important}
      .result-card.has-last-played .campaign-description.desc-lines-2{height:48px!important;min-height:48px!important}
      .result-card.has-last-played .campaign-description.desc-lines-3{height:58px!important;min-height:58px!important}
      .result-card.has-last-played .campaign-description.desc-lines-4{height:68px!important;min-height:68px!important}
      .result-card.has-last-played .last-played-inline{height:46px!important;min-height:46px!important;max-height:46px!important;flex-basis:46px!important;margin-top:5px!important}
    }
  `;
  document.head.appendChild(s);

  function autoHeight(textarea){
    if(!textarea)return;
    textarea.style.height='auto';
    textarea.style.height=Math.max(50,textarea.scrollHeight)+'px';
  }

  function getLineCount(desc){
    if(!desc)return 1;
    const text=(desc.textContent||'').trim();
    if(!text)return 1;
    const cs=getComputedStyle(desc);
    const clone=document.createElement('div');
    clone.textContent=text;
    Object.assign(clone.style,{
      position:'fixed',visibility:'hidden',pointerEvents:'none',left:'-10000px',top:'0',
      width:Math.max(40,desc.clientWidth-24)+'px',fontFamily:cs.fontFamily,
      fontSize:'12px',fontWeight:'800',lineHeight:'14.16px',whiteSpace:'normal',
      overflowWrap:'anywhere',padding:'0',border:'0',boxSizing:'border-box'
    });
    document.body.appendChild(clone);
    const lines=Math.max(1,Math.ceil((clone.scrollHeight-.5)/14.16));
    clone.remove();
    return Math.min(4,lines);
  }

  function harmonizeDrawCard(){
    const card=document.querySelector('#res .result-card.has-last-played');
    const desc=card&&card.querySelector('.campaign-description');
    if(!card||!desc)return;

    /* Efface tout réglage inline laissé par les anciens patches. */
    ['font-size','line-height','padding-top','padding-bottom','height','min-height'].forEach(p=>desc.style.removeProperty(p));
    desc.classList.remove('desc-lines-1','desc-lines-2','desc-lines-3','desc-lines-4');

    requestAnimationFrame(()=>{
      desc.classList.add('desc-lines-'+getLineCount(desc));

      /* Si un cas extrême déborde encore, la photo absorbe l'écart avant toute autre chose. */
      requestAnimationFrame(()=>{
        const image=card.querySelector(':scope>img,:scope>.photo-fallback');
        if(!image)return;
        let guard=0;
        while(card.scrollHeight>card.clientHeight+1&&image.getBoundingClientRect().height>125&&guard<30){
          const h=image.getBoundingClientRect().height-2;
          image.style.setProperty('flex','0 0 '+h+'px','important');
          image.style.setProperty('height',h+'px','important');
          guard++;
        }
      });
    });
  }

  function renameCurrentDrawnCampaign(){
    const title=document.querySelector('#res .result-card.has-last-played .rname');
    if(!title||title.dataset.renameReady)return;
    title.dataset.renameReady='1';
    title.onclick=e=>{
      e.stopPropagation();
      const campaign=(LP&&C.find(c=>String(c.id)===String(LP.id)))||C.find(c=>c.name===title.textContent.trim());
      if(!campaign)return;
      const original=campaign.name||title.textContent.trim();
      const input=document.createElement('input');
      input.type='text';
      input.className='draw-title-editor';
      input.value=original;
      title.replaceChildren(input);
      input.focus();
      input.select();
      let done=false;
      const finish=saveIt=>{
        if(done)return;
        done=true;
        const value=input.value.trim();
        if(saveIt&&value){
          campaign.name=value;
          if(LP&&String(LP.id)===String(campaign.id)){
            LP.name=value;
            localStorage.setItem(LPK,JSON.stringify(LP));
          }
          save();
          title.textContent=value;
        }else title.textContent=original;
        title.dataset.renameReady='';
        renameCurrentDrawnCampaign();
        harmonizeDrawCard();
      };
      input.addEventListener('keydown',ev=>{
        if(ev.key==='Enter'){ev.preventDefault();finish(true)}
        if(ev.key==='Escape'){ev.preventDefault();finish(false)}
      });
      input.addEventListener('blur',()=>finish(true),{once:true});
    };
  }

  /* Remplace complètement les anciens calculs de v88/v89. */
  fitDescription=function(){
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      harmonizeDrawCard();
      renameCurrentDrawnCampaign();
    }));
  };

  const previousKept=kept;
  function enhanceKept(){
    const root=document.getElementById('kl');
    if(!root)return;
    root.querySelectorAll('.rename-campaign').forEach(b=>b.remove());
    root.querySelectorAll('.item').forEach(item=>{
      const campaign=C.find(c=>String(c.id)===String(item.dataset.id));
      if(!campaign)return;
      const main=item.querySelector('.main');
      const name=main&&main.querySelector('.name');
      const det=item.querySelector('.det');
      const grid=det&&det.querySelector('.grid');
      if(!name||!det||!grid)return;
      const oldLine=name.closest('.campaign-name-line');
      if(oldLine){oldLine.parentNode.insertBefore(name,oldLine);oldLine.remove()}
      let editor=det.querySelector('.campaign-name-edit');
      if(!editor){
        const block=document.createElement('div');
        block.className='campaign-name-block';
        block.innerHTML=`<div class="dlab">Nom de la campagne</div><textarea class="campaign-name-edit" rows="1">${E(campaign.name||'')}</textarea>`;
        det.insertBefore(block,grid);
        editor=block.querySelector('.campaign-name-edit');
      }
      autoHeight(editor);
      if(!editor.dataset.heightReady){
        editor.dataset.heightReady='1';
        editor.addEventListener('input',()=>autoHeight(editor));
      }
      name.onclick=e=>{
        if(!item.classList.contains('open'))return;
        e.stopPropagation();
        editor.value=campaign.name||'';
        autoHeight(editor);
        editor.focus({preventScroll:true});
        editor.setSelectionRange(0,editor.value.length);
        editor.scrollIntoView({behavior:'smooth',block:'center'});
      };
      const saveButton=item.querySelector('.sv');
      if(saveButton&&!saveButton.dataset.nameSaveReady){
        saveButton.dataset.nameSaveReady='1';
        saveButton.addEventListener('click',event=>{
          const current=C.find(c=>String(c.id)===String(item.dataset.id));
          if(!current)return;
          const value=editor.value.trim();
          if(!value){
            event.preventDefault();
            event.stopImmediatePropagation();
            alert('Le nom de la campagne ne peut pas être vide.');
            return;
          }
          current.name=value;
          if(LP&&String(LP.id)===String(current.id)){
            LP.name=value;
            localStorage.setItem(LPK,JSON.stringify(LP));
          }
        },true);
      }
    });
  }
  kept=function(){previousKept();enhanceKept()};

  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    if(document.getElementById('k')?.classList.contains('on'))kept();
    harmonizeDrawCard();
    renameCurrentDrawnCampaign();
  }));
  window.addEventListener('resize',harmonizeDrawCard);
})();

;
// Existing UI module 92
(()=>{
  const style=document.createElement('style');
  style.textContent=`
    /* Nouveautés : le logo Steam utilise désormais son gabarit réel.
       Aucun surdimensionnement historique : le badge reste simplement superposé. */
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon{
      overflow:visible!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
      position:absolute!important;
      left:50%!important;
      top:50%!important;
      width:100%!important;
      height:100%!important;
      max-width:100%!important;
      max-height:100%!important;
      transform:translate(-50%,-50%)!important;
      object-fit:contain!important;
    }
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
      right:-8px!important;
      bottom:-6px!important;
    }
    @media(max-width:420px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:100%!important;
        height:100%!important;
      }
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
        right:-7px!important;
        bottom:-5px!important;
      }
    }
    @media(max-height:720px){
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon img{
        width:100%!important;
        height:100%!important;
      }
      .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
        right:-6px!important;
        bottom:-4px!important;
      }
    }
  `;
  document.head.appendChild(style);

  function patchPartners(){
    const a=document.querySelector('.welcome-actions .partners');
    if(!a)return;
    a.href='https://steamcommunity.com/my/friends/coplay';
    a.setAttribute('aria-label','Joueurs récemment rencontrés sur Steam');
    a.title='Joueurs récemment rencontrés';
  }
  patchPartners();
  requestAnimationFrame(patchPartners);
})();

(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    /* Deux petits boutons à gauche du titre : modifier puis campagne précédente. */
    html body .draw .res:not(.home-res) .result-card .rhead{
      position:relative!important;
      padding-left:70px!important;
      padding-right:70px!important;
    }
    html body .draw .res:not(.home-res) .draw-kept-edit,
    html body .draw .res:not(.home-res) .draw-previous-icon{
      position:absolute!important;
      top:50%!important;
      transform:translateY(-50%)!important;
      width:29px!important;
      height:29px!important;
      min-width:29px!important;
      min-height:29px!important;
      max-width:29px!important;
      max-height:29px!important;
      padding:0!important;
      border:0!important;
      border-radius:50%!important;
      background:var(--p2)!important;
      color:var(--g)!important;
      display:grid!important;
      place-items:center!important;
      box-shadow:inset 0 0 0 1px var(--l)!important;
      z-index:5!important;
    }
    html body .draw .res:not(.home-res) .draw-kept-edit{left:3px!important}
    html body .draw .res:not(.home-res) .draw-previous-icon{left:38px!important}
    html body .draw .res:not(.home-res) .draw-kept-edit svg,
    html body .draw .res:not(.home-res) .draw-previous-icon svg{
      display:block!important;
      width:17px!important;
      height:17px!important;
      fill:none!important;
      stroke:currentColor!important;
      stroke-linecap:round!important;
      stroke-linejoin:round!important;
    }
    html body .draw .res:not(.home-res) .draw-kept-edit svg{stroke-width:2.2!important}
    html body .draw .res:not(.home-res) .draw-previous-icon svg{stroke-width:2.35!important}

    /* L'ancienne grande tuile "Campagne précédente" disparaît. */
    html body .draw .res:not(.home-res) .previous-draw-slot{display:none!important}

    /* Le raccourci de chat historique du bandeau ne doit plus apparaître. */
    html body #d .title .steam-chat-top{display:none!important}

    @media(max-height:720px){
      html body .draw .res:not(.home-res) .result-card .rhead{padding-left:62px!important;padding-right:62px!important}
      html body .draw .res:not(.home-res) .draw-kept-edit,
      html body .draw .res:not(.home-res) .draw-previous-icon{width:26px!important;height:26px!important;min-width:26px!important;min-height:26px!important;max-width:26px!important;max-height:26px!important}
      html body .draw .res:not(.home-res) .draw-kept-edit{left:3px!important}
      html body .draw .res:not(.home-res) .draw-previous-icon{left:34px!important}
      html body .draw .res:not(.home-res) .draw-kept-edit svg,
      html body .draw .res:not(.home-res) .draw-previous-icon svg{width:15px!important;height:15px!important}
    }
  `;
  document.head.appendChild(style);

  function removeLegacyTopChat(){
    document.querySelectorAll('#d .title .steam-chat-top').forEach(link=>link.remove());
  }

  function compactPreviousButton(){
    const card=document.querySelector('#res .result-card');
    const rhead=card&&card.querySelector('.rhead');
    if(!card||!rhead)return;

    const slot=card.querySelector('.previous-draw-slot');
    const previous=slot&&slot.querySelector('.previous-draw-button');
    if(previous&&!rhead.querySelector('.draw-previous-icon')){
      previous.className='draw-previous-icon';
      previous.removeAttribute('style');
      previous.setAttribute('aria-label',previous.getAttribute('aria-label')||'Afficher la campagne précédente');
      previous.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7H4v4"/><path d="M4.6 10A8 8 0 1 1 6.8 17.3"/></svg>';
      rhead.appendChild(previous);
    }
    if(slot)slot.remove();
  }

  function apply(){
    removeLegacyTopChat();
    compactPreviousButton();
  }

  apply();
  requestAnimationFrame(apply);

  const root=document.getElementById('res');
  if(root){
    let scheduled=false;
    const observer=new MutationObserver(()=>{
      if(scheduled)return;
      scheduled=true;
      requestAnimationFrame(()=>{
        scheduled=false;
        apply();
      });
    });
    observer.observe(root,{childList:true,subtree:true});
  }
})();

;
// Existing UI module 96
(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    html body .campaign-add-modal{
      position:fixed!important;inset:0!important;z-index:10000!important;
      display:grid!important;place-items:center!important;
      padding:18px!important;background:rgba(37,38,31,.38)!important;
      backdrop-filter:blur(2px)!important;-webkit-backdrop-filter:blur(2px)!important;
    }
    html body .campaign-add-panel{
      width:min(430px,100%)!important;max-height:min(760px,calc(100dvh - 36px))!important;
      overflow:auto!important;box-sizing:border-box!important;
      padding:18px!important;border:1px solid var(--l)!important;border-radius:18px!important;
      background:var(--p)!important;color:var(--i)!important;
      box-shadow:0 18px 48px rgba(37,38,31,.18)!important;
    }
    html body .campaign-add-head{
      position:relative!important;display:flex!important;align-items:center!important;justify-content:center!important;
      min-height:36px!important;margin-bottom:14px!important;
    }
    html body .campaign-add-head strong{
      display:block!important;width:100%!important;padding:0 42px!important;text-align:center!important;
      font-size:20px!important;line-height:1.1!important;
    }
    html body .campaign-add-close{
      position:absolute!important;right:0!important;top:50%!important;transform:translateY(-50%)!important;
      width:34px!important;height:34px!important;padding:0!important;border:0!important;border-radius:50%!important;
      background:var(--p2)!important;color:var(--i)!important;font-size:23px!important;line-height:1!important;
    }
    html body .campaign-add-form{display:grid!important;gap:11px!important}
    html body .campaign-add-form label{display:grid!important;gap:5px!important;font-size:11px!important;font-weight:900!important;text-transform:uppercase!important;letter-spacing:.04em!important;color:var(--m)!important}
    html body .campaign-add-form input,
    html body .campaign-add-form select,
    html body .campaign-add-form textarea{
      width:100%!important;min-height:43px!important;box-sizing:border-box!important;
      border:1px solid var(--l)!important;border-radius:11px!important;
      background:#fff!important;color:var(--i)!important;padding:10px 11px!important;
      font:inherit!important;text-transform:none!important;letter-spacing:normal!important;font-weight:700!important;outline:none!important;
    }
    html body .campaign-add-form textarea{min-height:82px!important;resize:vertical!important}
    html body .campaign-add-form input:focus,
    html body .campaign-add-form select:focus,
    html body .campaign-add-form textarea:focus{border-color:var(--g)!important;box-shadow:0 0 0 2px rgba(47,121,109,.12)!important}
    html body .campaign-add-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important}
    html body .campaign-add-actions{display:grid!important;grid-template-columns:1fr 1.35fr!important;gap:8px!important;margin-top:3px!important}
    html body .campaign-add-actions button{min-height:43px!important;border:0!important;border-radius:11px!important;font-weight:900!important}
    html body .campaign-add-cancel{background:var(--p2)!important;color:var(--i)!important}
    html body .campaign-add-submit{background:var(--g)!important;color:#fff!important}
    @media(max-width:520px){
      html body .campaign-add-modal{padding:12px!important}
      html body .campaign-add-panel{padding:15px!important;border-radius:16px!important}
      html body .campaign-add-grid{grid-template-columns:1fr!important;gap:10px!important}
    }

    /* Logo Steam + badge vert réellement superposé au coin inférieur droit. */
    html body .draw .title .steam-chat-top{
      position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;
      width:var(--steam-chat-v96-size,44px)!important;height:var(--steam-chat-v96-size,44px)!important;
      min-width:var(--steam-chat-v96-size,44px)!important;min-height:var(--steam-chat-v96-size,44px)!important;
      max-width:var(--steam-chat-v96-size,44px)!important;max-height:var(--steam-chat-v96-size,44px)!important;
      padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;
      box-shadow:none!important;overflow:visible!important;z-index:9!important;text-decoration:none!important;
      transition:none!important;animation:none!important;-webkit-tap-highlight-color:transparent!important;
    }
    html body .draw .title .steam-chat-top .steam-chat-glyph{
      position:relative!important;display:block!important;width:100%!important;height:100%!important;overflow:visible!important;
    }
    html body .draw .title .steam-chat-top .steam-chat-glyph>img{
      position:absolute!important;inset:0!important;display:block!important;
      width:100%!important;height:100%!important;min-width:100%!important;min-height:100%!important;max-width:100%!important;max-height:100%!important;
      margin:0!important;padding:0!important;transform:none!important;object-fit:contain!important;border:0!important;border-radius:50%!important;
      background:transparent!important;box-shadow:none!important;transition:none!important;animation:none!important;
    }
    html body .draw .title .steam-chat-top .steam-chat-corner-badge{
      position:absolute!important;right:4px!important;bottom:4px!important;z-index:3!important;
      width:16px!important;height:16px!important;box-sizing:border-box!important;padding:0!important;
      display:block!important;border-radius:50%!important;
      background:var(--g)!important;border:1.5px solid var(--b)!important;box-shadow:none!important;pointer-events:none!important;
    }
    html body .draw .title .steam-chat-top .steam-chat-corner-badge svg{
      position:absolute!important;left:50%!important;top:50%!important;
      transform:translate(-50%,calc(-50% + .32px))!important;
      display:block!important;width:11px!important;height:11px!important;overflow:visible!important;
    }
    html body .draw .title .steam-chat-top:hover,
    html body .draw .title .steam-chat-top:focus,
    html body .draw .title .steam-chat-top:active{
      transform:translate(-50%,-50%)!important;background:transparent!important;border:0!important;box-shadow:none!important;outline:0!important;
    }
  `;
  document.head.appendChild(style);

  function mapOptions(){
    const values=[];
    if(Array.isArray(C))C.forEach(c=>{const n=parseInt(c.maps,10);if(Number.isFinite(n)&&n>0)values.push(n)});
    if(Array.isArray(A))A.forEach(c=>{const n=parseInt(c.maps,10);if(Number.isFinite(n)&&n>0)values.push(n)});
    const max=Math.max(10,...values);
    let html='<option value="">Non renseigné</option>';
    for(let n=1;n<=max;n++)html+=`<option value="${n}">${n} carte${n>1?'s':''}</option>`;
    return html;
  }

  function openAddCampaign(){
    document.querySelector('.campaign-add-modal')?.remove();
    const modal=document.createElement('div');
    modal.className='campaign-add-modal';
    modal.innerHTML=`<div class="campaign-add-panel" role="dialog" aria-modal="true" aria-label="Ajouter une campagne">
      <div class="campaign-add-head"><strong>Ajouter une campagne</strong><button type="button" class="campaign-add-close" aria-label="Fermer">×</button></div>
      <form class="campaign-add-form">
        <label>Nom de la campagne<input class="campaign-add-name" required autocomplete="off" placeholder="Nom"></label>
        <div class="campaign-add-grid">
          <label>Catégorie<select class="campaign-add-category"><option>Oui</option><option>Pourquoi pas</option><option>Bof</option><option>Non</option></select></label>
          <label>Nombre de cartes<select class="campaign-add-maps">${mapOptions()}</select></label>
          <label>Difficulté<select class="campaign-add-difficulty"><option value="facile">Facile</option><option value="moyen" selected>Moyen</option><option value="difficile">Difficile</option></select></label>
        </div>
        <label>Notes personnelles<textarea class="campaign-add-notes" placeholder="Facultatif"></textarea></label>
        <label>Lien Workshop Steam<input class="campaign-add-workshop" inputmode="url" autocomplete="off" placeholder="Facultatif"></label>
        <div class="campaign-add-actions"><button type="button" class="campaign-add-cancel">Annuler</button><button type="submit" class="campaign-add-submit">Ajouter</button></div>
      </form>
    </div>`;
    document.body.appendChild(modal);

    const close=()=>{
      document.removeEventListener('keydown',esc);
      modal.remove();
    };
    const esc=e=>{if(e.key==='Escape')close()};
    modal.querySelector('.campaign-add-close').onclick=close;
    modal.querySelector('.campaign-add-cancel').onclick=close;
    modal.onclick=e=>{if(e.target===modal)close()};
    document.addEventListener('keydown',esc);

    const form=modal.querySelector('.campaign-add-form');
    form.onsubmit=e=>{
      e.preventDefault();
      const name=form.querySelector('.campaign-add-name').value.trim();
      if(!name)return;
      const category=form.querySelector('.campaign-add-category').value;
      const mapsRaw=form.querySelector('.campaign-add-maps').value;
      const maps=mapsRaw?parseInt(mapsRaw,10):null;
      const difficulty=form.querySelector('.campaign-add-difficulty').value;
      const notes=form.querySelector('.campaign-add-notes').value.trim();
      const workshopUrl=form.querySelector('.campaign-add-workshop').value.trim();
      const base={name,maps,difficulty,workshopUrl,notes,excelRemark:notes,photo:''};
      if(category==='Oui')C.push({...base,id:'x'+Date.now(),category});
      else A.push({name,remark:notes,category,excelRow:Date.now(),workshopUrl,maps,difficulty});
      save();
      if(typeof kept==='function')kept();
      if(typeof cats==='function')cats();
      if(typeof others==='function')others();
      close();
    };
    requestAnimationFrame(()=>modal.querySelector('.campaign-add-name')?.focus());
  }

  function installAddForm(){
    const add=document.getElementById('add');
    if(add)add.onclick=openAddCampaign;
  }

  function syncSteamSize(){
    const title=document.querySelector('.draw .title');
    if(!title)return;
    const campaignSteam=document.querySelector('#res .result-card .rhead .wk img')||document.querySelector('#res .result-card .rhead .wk');
    let size=44;
    if(campaignSteam){
      const r=campaignSteam.getBoundingClientRect();
      const measured=Math.round(Math.min(r.width||0,r.height||r.width||0));
      if(measured>0)size=measured;
    }
    title.style.setProperty('--steam-chat-v96-size',size+'px');
  }

  function fixSteamChat(){
    const title=document.querySelector('.draw .title');
    if(!title)return;
    let link=title.querySelector('.steam-chat-top');
    if(!link){
      link=document.createElement('a');
      link.className='steam-chat-top';
      title.appendChild(link);
    }
    link.href='https://steamcommunity.com/chat/';
    link.target='_blank';
    link.rel='noopener';
    link.title='Chat Steam';
    link.setAttribute('aria-label','Ouvrir le Chat Steam');
    if(!link.querySelector('.steam-chat-glyph')){
      link.innerHTML='<span class="steam-chat-glyph"><img src="/steam-icon.png" width="44" height="44" alt=""><span class="steam-chat-corner-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="#fff" d="M5.5 5.5h13v9h-7l-3.5 3v-3H5.5z"/><path d="M9 8.6h6M9 11.3h6M9 14h4" fill="none" stroke="#2f796d" stroke-width="1.8" stroke-linecap="round"/></svg></span></span>';
    }
    syncSteamSize();
  }

  function apply(){installAddForm();fixSteamChat();syncSteamSize()}
  apply();
  requestAnimationFrame(apply);

  const res=document.getElementById('res');
  if(res){
    let queued=false;
    new MutationObserver(()=>{
      if(queued)return;
      queued=true;
      requestAnimationFrame(()=>{queued=false;fixSteamChat();syncSteamSize()});
    }).observe(res,{childList:true,subtree:true});
  }
  window.addEventListener('resize',syncSteamSize,{passive:true});
})();

/* Ouvrir directement, dans le même rendu, la campagne gardée correspondant au tirage. */
(()=>{
  'use strict';
  document.addEventListener('click',e=>{
    const trigger=e.target.closest&&e.target.closest('.draw-kept-edit');
    if(!trigger)return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const drawnName=(document.querySelector('#res .result-card .rname')?.textContent||'').trim();
    let campaign=null;
    if(Array.isArray(C)){
      campaign=C.find(c=>String(c.name||'').trim()===drawnName)||null;
      if(!campaign&&LP)campaign=C.find(c=>String(c.id)===String(LP.id))||null;
    }
    if(!campaign)return;

    /* Changement d'onglet, préparation, ouverture et positionnement dans le même rendu. */
    const page=document.getElementById('k');
    document.querySelectorAll('.page').forEach(node=>node.classList.toggle('on',node===page));
    document.querySelectorAll('.nav button[data-p]').forEach(button=>button.classList.toggle('on',button.dataset.p==='k'));

    if(typeof kept==='function')kept();

    const items=[...document.querySelectorAll('#kl .item')];
    const item=items.find(node=>String(node.dataset.id)===String(campaign.id))
      ||items.find(node=>(node.querySelector('.name')?.textContent||'').trim()===drawnName);
    if(!item||!page)return;

    items.forEach(node=>{if(node!==item)node.classList.remove('open')});
    if(!item.classList.contains('open')){
      const edit=item.querySelector('.edit');
      if(edit&&typeof edit.click==='function')edit.click();
      else item.classList.add('open');
    }
    if(!item.classList.contains('open'))item.classList.add('open');

    /* #k est le vrai conteneur défilable : on le positionne directement sur la fiche. */
    void item.offsetHeight;
    const oldBehavior=page.style.scrollBehavior;
    page.style.scrollBehavior='auto';
    const pageRect=page.getBoundingClientRect();
    const itemRect=item.getBoundingClientRect();
    page.scrollTop=Math.max(0,page.scrollTop+(itemRect.top-pageRect.top)-8);
    page.style.scrollBehavior=oldBehavior;

    const editor=item.querySelector('.campaign-name-edit,.nt,.ca,.ma,.di,.wu');
    if(editor)editor.setAttribute('data-opened-from-draw','1');
  },true);
})();

;
// Existing UI module 98
(()=>{
  'use strict';

  const style=document.createElement('style');
  style.textContent=`
    /* Steam v124 : logo retracé depuis l'image fournie, sans fond ni anneau ajouté. */
    html body .app .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon,
    html body .app .draw .res.home-res .welcome-actions .news .welcome-steam-icon{
      position:relative!important;
      display:grid!important;
      place-items:center!important;
      box-sizing:border-box!important;
      padding:0!important;
      background:none!important;
      border-radius:50%!important;
      overflow:visible!important;
      contain:none!important;
      clip-path:none!important;
    }
    html body .app .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon>img,
    html body .app .draw .res.home-res .welcome-actions .news .welcome-steam-icon>img{
      position:static!important;
      left:auto!important;
      top:auto!important;
      inset:auto!important;
      display:block!important;
      visibility:visible!important;
      width:100%!important;
      height:100%!important;
      min-width:0!important;
      min-height:0!important;
      max-width:100%!important;
      max-height:100%!important;
      margin:0!important;
      padding:0!important;
      transform:none!important;
      object-fit:contain!important;
      object-position:center!important;
      border:0!important;
      border-radius:50%!important;
      background:transparent!important;
      z-index:1!important;
    }
    html body .app .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon:after,
    html body .app .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{
      z-index:3!important;
    }

    /* Chat v127 : pictogramme vectoriel propre, aligné sur la ligne principale du bandeau. */
    html body .app .draw .title{
      position:relative!important;
    }
    html body .app .draw .title .steam-chat-top{
      position:absolute!important;
      left:50%!important;
      top:calc(50% - 14px)!important;
      transform:translate(-50%,-50%)!important;
      width:26px!important;
      height:26px!important;
      min-width:26px!important;
      min-height:26px!important;
      max-width:26px!important;
      max-height:26px!important;
      padding:0!important;
      margin:0!important;
      display:block!important;
      border:0!important;
      border-radius:50%!important;
      background-color:transparent!important;
      background-image:url('/chat-icon-top-v127.svg')!important;
      background-position:center!important;
      background-repeat:no-repeat!important;
      background-size:26px 26px!important;
      color:inherit!important;
      text-decoration:none!important;
      box-shadow:none!important;
      overflow:visible!important;
      transition:none!important;
      animation:none!important;
      -webkit-tap-highlight-color:transparent!important;
      z-index:8!important;
    }
    html body .app .draw .title .steam-chat-top>img,
    html body .app .draw .title .steam-chat-top .steam-chat-glyph,
    html body .app .draw .title .steam-chat-top .steam-chat-badge{
      display:none!important;
    }
    html body .app .draw .title .steam-chat-top:before,
    html body .app .draw .title .steam-chat-top:after{
      content:none!important;
      display:none!important;
    }
    html body .app .draw .title .steam-chat-top:hover,
    html body .app .draw .title .steam-chat-top:focus,
    html body .app .draw .title .steam-chat-top:active{
      transform:translate(-50%,-50%)!important;
      background-color:transparent!important;
      background-image:url('/chat-icon-top-v127.svg')!important;
      background-position:center!important;
      background-repeat:no-repeat!important;
      background-size:26px 26px!important;
      border:0!important;
      box-shadow:none!important;
      outline:0!important;
    }

    /* Gardées v125 : légèrement plus grand, sans changer la zone tactile. */
    html body #k .wk{
      position:relative!important;
      display:grid!important;
      place-items:center!important;
      box-sizing:border-box!important;
      padding:0!important;
      background:none!important;
      border-radius:50%!important;
      overflow:visible!important;
      contain:none!important;
      clip-path:none!important;
    }
    html body #k .wk>img{
      position:static!important;
      display:block!important;
      visibility:visible!important;
      width:64%!important;
      height:64%!important;
      min-width:0!important;
      min-height:0!important;
      max-width:64%!important;
      max-height:64%!important;
      margin:auto!important;
      padding:0!important;
      transform:none!important;
      object-fit:contain!important;
      object-position:center!important;
      border:0!important;
      border-radius:50%!important;
      background:transparent!important;
    }

    /* Le titre réserve une ou deux lignes dans la zone réellement libre entre les boutons. */
    html body .app .draw .res:not(.home-res) .result-card .rhead{
      --draw-title-inset:70px;
      position:relative!important;
      box-sizing:border-box!important;
      height:auto!important;
      min-height:54px!important;
      max-height:none!important;
      padding-top:6px!important;
      padding-bottom:6px!important;
      padding-left:var(--draw-title-inset)!important;
      padding-right:var(--draw-title-inset)!important;
      align-items:center!important;
    }
    html body .app .draw .res:not(.home-res) .result-card .rname{
      display:block!important;
      flex:1 1 0!important;
      width:auto!important;
      min-width:0!important;
      max-width:100%!important;
      min-height:0!important;
      max-height:2.1em!important;
      overflow:hidden!important;
      overflow-wrap:anywhere!important;
      white-space:normal!important;
      text-overflow:clip!important;
      text-align:center!important;
      text-wrap:balance;
      font-size:var(--draw-title-font-size,clamp(19px,5.3vw,27px))!important;
      line-height:1.05!important;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
    @media(max-height:720px){
      html body .app .draw .res:not(.home-res) .result-card .rhead{
        min-height:48px!important;
        padding-top:4px!important;
        padding-bottom:4px!important;
      }
    }
  `;
  document.head.appendChild(style);

  function upgradeSteamImages(root=document){
    root.querySelectorAll?.('img[src="/steam-icon.png"],img[src="/steam-icon-fast.svg"],img[src="/steam-icon-user.png"]').forEach(img=>{
      if(img.getAttribute('src')!=='/steam-icon-exact-v124.svg')img.setAttribute('src','/steam-icon-exact-v124.svg');
    });
  }

  function reserveActionSpace(title){
    const head=title&&title.closest('.rhead');
    if(!head)return;

    const headRect=head.getBoundingClientRect();
    let leftUsed=0;
    let rightUsed=0;

    head.querySelectorAll('.draw-kept-edit,.draw-previous-icon').forEach(control=>{
      const rect=control.getBoundingClientRect();
      if(rect.width>0)leftUsed=Math.max(leftUsed,rect.right-headRect.left);
    });

    const workshop=head.querySelector('.wk');
    if(workshop){
      const rect=workshop.getBoundingClientRect();
      if(rect.width>0)rightUsed=Math.max(rightUsed,headRect.right-rect.left);
    }

    /* On réserve la même marge des deux côtés : le titre reste centré et ne passe jamais sous une icône. */
    const inset=Math.max(50,Math.ceil(Math.max(leftUsed,rightUsed)+6));
    head.style.setProperty('--draw-title-inset',inset+'px');
  }

  function fitTitle(title){
    if(!title)return;

    reserveActionSpace(title);
    title.style.setProperty('flex','1 1 0','important');
    title.style.setProperty('width','auto','important');
    title.style.setProperty('min-width','0','important');
    title.style.setProperty('max-width','100%','important');
    title.style.setProperty('white-space','normal','important');
    title.style.setProperty('overflow','hidden','important');

    const width=Math.max(40,title.clientWidth);
    let size=Math.min(27,Math.max(19,window.innerWidth*0.053));
    const clone=document.createElement('div');
    clone.textContent=title.textContent||'';
    Object.assign(clone.style,{
      position:'fixed',
      visibility:'hidden',
      pointerEvents:'none',
      left:'-10000px',
      top:'0',
      width:width+'px',
      padding:'0',
      border:'0',
      boxSizing:'border-box',
      whiteSpace:'normal',
      overflowWrap:'anywhere',
      fontFamily:getComputedStyle(title).fontFamily,
      fontWeight:'900',
      lineHeight:'1.05',
      textAlign:'center'
    });
    clone.style.textWrap='balance';
    document.body.appendChild(clone);

    let guard=0;
    while(guard<40){
      clone.style.fontSize=size+'px';
      const lineHeight=size*1.05;
      if(clone.scrollHeight<=lineHeight*2+1||size<=13.5)break;
      size-=0.5;
      guard++;
    }

    const lineHeight=size*1.05;
    const isTwoLines=clone.scrollHeight>lineHeight+1;
    clone.remove();

    const value=size+'px';
    if(title.style.getPropertyValue('font-size')!==value||title.style.getPropertyPriority('font-size')!=='important'){
      title.style.setProperty('font-size',value,'important');
    }
    title.closest('.rhead')?.classList.toggle('draw-title-two-lines',isTwoLines);
  }

  function fitDescriptionBox(desc){
    if(!desc)return;
    desc.style.removeProperty('font-size');
    let size=parseFloat(getComputedStyle(desc).fontSize)||11.5;
    let guard=0;
    while(desc.scrollHeight>desc.clientHeight+1&&size>8&&guard<20){
      size-=0.25;
      desc.style.setProperty('font-size',size+'px','important');
      guard++;
    }
  }

  function fitDrawText(){
    upgradeSteamImages();
    const card=document.querySelector('#res .result-card');
    if(!card)return;
    fitTitle(card.querySelector('.rname'));
    fitDescriptionBox(card.querySelector('.campaign-description'));
  }

  /* Tout est mesuré dans le même rendu que l'insertion : aucun état intermédiaire visible. */
  window.fitDescription=fitDrawText;
  upgradeSteamImages();
  fitDrawText();

  const result=document.getElementById('res');
  if(result){
    let queued=false;
    new MutationObserver(records=>{
      const relevant=records.some(record=>record.type!=='attributes'||record.target.classList?.contains('rname'));
      if(!relevant)return;
      if(queued)return;
      queued=true;
      queueMicrotask(()=>{
        queued=false;
        upgradeSteamImages(result);
        fitDrawText();
      });
    }).observe(result,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['style']});
  }

  const kept=document.getElementById('k');
  if(kept){
    new MutationObserver(()=>upgradeSteamImages(kept)).observe(kept,{childList:true,subtree:true});
  }

  window.addEventListener('resize',fitDrawText,{passive:true});
})();

;
// Existing UI module 94
(()=>{
  const s=document.createElement('style');
  s.textContent=`
    /* Exactement la même taille que les icônes Steam de Campagnes gardées.
       Ne dépend pas de has-last-played : toute fiche issue d'un tirage est couverte. */
    html body .draw .res:not(.home-res) .result-card .rhead{
      padding-left:44px!important;
      padding-right:44px!important;
    }
    html body .draw .res:not(.home-res) .result-card .rhead .wk{
      width:40px!important;
      height:40px!important;
      min-width:40px!important;
      min-height:40px!important;
      max-width:40px!important;
      max-height:40px!important;
      flex:0 0 40px!important;
      right:4px!important;
      top:50%!important;
      transform:translateY(-50%)!important;
      padding:0!important;
      border-radius:50%!important;
      overflow:visible!important;
      background:transparent!important;
      box-shadow:none!important;
    }
    html body .draw .res:not(.home-res) .result-card .rhead .wk img{
      display:block!important;
      width:40px!important;
      height:40px!important;
      min-width:40px!important;
      min-height:40px!important;
      max-width:40px!important;
      max-height:40px!important;
      object-fit:contain!important;
      border-radius:50%!important;
    }
  `;
  document.head.appendChild(s);
})();

;
// Existing UI module 95
(()=>{
  'use strict';

  const RECENT_PLAYERS_URL='https://steamcommunity.com/my/friends/coplay/';

  const link=document.querySelector('.welcome-actions .partners');
  if(link){
    link.href=RECENT_PLAYERS_URL;
    link.target='_blank';
    link.rel='noopener';
    link.title='Joueurs avec lesquels j’ai joué récemment';
    link.setAttribute('aria-label','Ouvrir mes joueurs récents Steam');
  }

})();

(()=>{
  'use strict';

  function placeChatBetweenSteamTiles(){
    const actions=document.querySelector('#d .welcome-actions');
    if(!actions)return;

    const oldTop=document.querySelector('#d .title .steam-chat-top');
    const legacyCenter=actions.querySelector('.steam-chat-top');
    let chat=actions.querySelector('.steam-chat-center');

    if(!chat){
      chat=document.createElement('a');
      chat.className='steam-chat-center';
      chat.href=oldTop?.href||legacyCenter?.href||'https://steamcommunity.com/chat/';
      chat.target='_blank';
      chat.rel='noopener';
      chat.title='Chat Steam';
      chat.setAttribute('aria-label','Ouvrir le Chat Steam');
      actions.appendChild(chat);
    }

    oldTop?.remove();
    legacyCenter?.remove();

    actions.style.setProperty('position','relative','important');
    actions.style.setProperty('overflow','visible','important');

    chat.style.setProperty('position','absolute','important');
    chat.style.setProperty('left','50%','important');
    chat.style.setProperty('top','50%','important');
    chat.style.setProperty('transform','translate(-50%,-50%)','important');
    chat.style.setProperty('width','50px','important');
    chat.style.setProperty('height','50px','important');
    chat.style.setProperty('min-width','50px','important');
    chat.style.setProperty('min-height','50px','important');
    chat.style.setProperty('max-width','50px','important');
    chat.style.setProperty('max-height','50px','important');
    chat.style.setProperty('margin','0','important');
    chat.style.setProperty('padding','0','important');
    chat.style.setProperty('display','block','important');
    chat.style.setProperty('box-sizing','border-box','important');
    chat.style.setProperty('border','0','important');
    chat.style.setProperty('outline','0','important');
    chat.style.setProperty('border-radius','50%','important');
    chat.style.setProperty('background-color','#2f8d7c','important');
    chat.style.setProperty('background-image',"url('/chat-icon-top-v127.svg')",'important');
    chat.style.setProperty('background-position','center','important');
    chat.style.setProperty('background-repeat','no-repeat','important');
    chat.style.setProperty('background-size','50px 50px','important');
    chat.style.setProperty('box-shadow','none','important');
    chat.style.setProperty('filter','none','important');
    chat.style.setProperty('overflow','visible','important');
    chat.style.setProperty('z-index','12','important');
    chat.style.setProperty('text-decoration','none','important');
    chat.style.setProperty('-webkit-tap-highlight-color','transparent','important');
  }

  let scheduled=false;
  function scheduleChatPlacement(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{
      scheduled=false;
      placeChatBetweenSteamTiles();
    });
  }

  placeChatBetweenSteamTiles();
  scheduleChatPlacement();

  /* La navigation masque/affiche les pages. On revérifie le bouton après chaque changement d’onglet. */
  document.querySelectorAll('.nav button').forEach(button=>{
    button.addEventListener('click',scheduleChatPlacement,{passive:true});
  });

  /* Si l’accueil est reconstruit par un autre patch, le bouton est recréé une seule fois. */
  const drawPage=document.getElementById('d');
  if(drawPage){
    const observer=new MutationObserver(records=>{
      if(!records.some(record=>record.type==='childList'))return;
      const actions=drawPage.querySelector('.welcome-actions');
      if(actions&&!actions.querySelector('.steam-chat-center'))scheduleChatPlacement();
    });
    observer.observe(drawPage,{childList:true,subtree:true});
  }

  /* Couvre aussi un aller-retour vers un autre onglet du navigateur/PWA. */
  document.addEventListener('visibilitychange',()=>{
    if(!document.hidden)scheduleChatPlacement();
  },{passive:true});
})();

;
(()=>{
  'use strict';
  const normalized=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr');
  function attachSearch(query,results,keptOnly){
  query.oninput=()=>{
    const needle=normalized(query.value.trim());
    results.replaceChildren();
    results.classList.toggle('on',!!needle);
    if(!needle)return;
    const matches=[...C.map(c=>({c,kept:true})),...(keptOnly?[]:A.map(c=>({c,kept:false})))].filter(({c})=>normalized([c.name,c.notes,c.excelRemark,c.remark].join(' ')).includes(needle)).slice(0,30);
    for(const {c,kept} of matches){
      const button=document.createElement('button');button.type='button';
      const title=document.createElement('b');title.textContent=c.name;
      const detail=document.createElement('small');detail.textContent=kept?'Ma sélection':`Hors sélection · ${c.category}`;
      button.append(title,detail);results.append(button);
      button.onclick=()=>{
        results.classList.remove('on');query.value=c.name;
        if(kept){document.querySelector('[data-p="d"]').click();draw(c);}
        else{
          ac='Toutes';
          document.querySelector('[data-p="o"]').click();
          const item=[...document.querySelectorAll('#ol .item')].find(item=>String(item.dataset.r)===String(c.excelRow));
          if(item){item.classList.add('open');item.scrollIntoView({block:'center'});}
        }
      };
    }
    if(!matches.length){const empty=document.createElement('p');empty.textContent='Aucune campagne trouvée';results.append(empty);}
  };
  document.addEventListener('click',event=>{if(!query.parentElement.contains(event.target))results.classList.remove('on');});
  }
  attachSearch(document.getElementById('kq'),document.getElementById('ksr'),true);
  attachSearch(document.getElementById('q'),document.getElementById('sr'),false);
  const exportStatus=document.createElement('div');exportStatus.className='drive-export-status';exportStatus.setAttribute('role','status');
  document.querySelector('#k .backup').after(exportStatus);
  document.getElementById('drive-import').onclick=()=>window.L4D2Drive?.import();
  document.getElementById('exp').onclick=async()=>{
    const button=document.getElementById('exp');button.disabled=true;exportStatus.textContent='Exportation vers Google Drive…';
    try{
      if(!window.L4D2Drive)throw Error('La connexion de sauvegarde est indisponible.');
      const {file}=await window.L4D2Drive.export({campaigns:C,otherCampaigns:A,lastPlayed:LP,lastDrawn:LP,exportedAt:new Date().toISOString()});
      const link=document.createElement('a');link.href=file.url;link.target='_blank';link.rel='noopener';link.textContent='Voir le fichier dans Google Drive';
      exportStatus.replaceChildren(document.createTextNode('Export enregistré dans L4D2 – Sauvegardes. '),link);
    }catch(error){exportStatus.textContent='Exportation impossible : '+error.message;}
    finally{button.disabled=false;}
  };
  const oldKept=kept;
  kept=function(){oldKept();const visible=document.querySelectorAll('#kl .item').length;document.getElementById('kn').textContent=`${visible}/${C.length}`;};
  document.getElementById('sort').onchange=kept;
  document.head.appendChild(document.querySelector('link[href^="/ui-current.css"]'));
})();

;
document.documentElement.classList.remove('l4d2-loading');
