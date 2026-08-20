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
      position:absolute!important;left:50%!important;top:50%!important;width:178%!important;height:178%!important;max-width:none!important;max-height:none!important;transform:translate(-50%,-50%)!important;object-fit:contain!important;border-radius:50%!important
    }
    .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon:after{content:"+"!important;display:grid!important;background:#2f796d!important;color:#fff!important;right:-8px!important;bottom:-6px!important}
    .draw .res.home-res .welcome-actions .favorites .welcome-steam-icon:after{content:"★"!important;display:grid!important;background:#2f796d!important;color:#fff!important}
    .draw .res.home-res .welcome-actions .news .welcome-steam-icon:after{content:"✦"!important;display:grid!important;background:#d8841f!important;color:#fff!important}
    @media(max-width:420px){
      .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon img{width:178%!important;height:178%!important}
      .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon:after{right:-7px!important;bottom:-5px!important}
    }
    @media(max-height:720px){
      .description-edit-text{min-height:190px;max-height:50dvh}
      .draw .res.home-res .welcome-actions .subscriptions .welcome-steam-icon img{width:178%!important;height:178%!important}
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
    a.innerHTML='<span class="welcome-steam-icon"><img src="/steam-icon.png" alt=""></span><span>Abonnements</span>';
  }

  patchSubscriptions();
  requestAnimationFrame(patchSubscriptions);
})();
