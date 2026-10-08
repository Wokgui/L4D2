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
          ac='Toutes';document.getElementById('oq').value=c.name;
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
  document.getElementById('oq').oninput=others;
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
