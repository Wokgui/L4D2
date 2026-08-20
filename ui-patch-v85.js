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