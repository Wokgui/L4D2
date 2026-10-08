(()=>{
  'use strict';
  const normalized=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('fr');
  const query=document.getElementById('q'),results=document.getElementById('sr');
  query.oninput=()=>{
    const needle=normalized(query.value.trim());
    results.replaceChildren();
    results.classList.toggle('on',!!needle);
    if(!needle)return;
    const matches=[...C.map(c=>({c,kept:true})),...A.map(c=>({c,kept:false}))].filter(({c})=>normalized([c.name,c.notes,c.excelRemark,c.remark].join(' ')).includes(needle)).slice(0,30);
    for(const {c,kept} of matches){
      const button=document.createElement('button');button.type='button';
      const title=document.createElement('b');title.textContent=c.name;
      const detail=document.createElement('small');detail.textContent=kept?'Ma sélection':`Hors sélection · ${c.category}`;
      button.append(title,detail);results.append(button);
      button.onclick=()=>{
        results.classList.remove('on');query.value=c.name;
        if(kept){document.querySelector('[data-p="d"]').click();draw(c);}
        else{
          ac='Toutes';document.getElementById('oq').value=c.name;
          document.querySelector('[data-p="o"]').click();
          const item=[...document.querySelectorAll('#ol .item')].find(item=>String(item.dataset.r)===String(c.excelRow));
          if(item){item.classList.add('open');item.scrollIntoView({block:'center'});}
        }
      };
    }
    if(!matches.length){const empty=document.createElement('p');empty.textContent='Aucune campagne trouvée';results.append(empty);}
  };
  document.getElementById('oq').oninput=others;
  document.addEventListener('click',event=>{if(!event.target.closest('#k .search'))results.classList.remove('on');});
  document.getElementById('exp').onclick=async()=>{
    const payload={campaigns:C,otherCampaigns:A,lastPlayed:LP,lastDrawn:LP,exportedAt:new Date().toISOString()};
    const file=new File([JSON.stringify(payload,null,2)],`campagnes-l4d2-${new Date().toISOString().slice(0,10)}.json`,{type:'application/json'});
    if(navigator.canShare?.({files:[file]})){
      try{await navigator.share({files:[file],title:'Sauvegarde L4D2'});return;}
      catch(error){if(error.name==='AbortError')return;}
    }
    const url=URL.createObjectURL(file),link=document.createElement('a');link.href=url;link.download=file.name;
    document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
  };
  const oldKept=kept;
  kept=function(){oldKept();const visible=document.querySelectorAll('#kl .item').length;document.getElementById('kn').textContent=`${visible}/${C.length}`;};
  document.getElementById('sort').onchange=kept;
  document.head.appendChild(document.querySelector('link[href^="/ui-current.css"]'));
})();
