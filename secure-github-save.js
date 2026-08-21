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

(()=>{
  if(document.querySelector('script[data-ui-patch-v94]'))return;
  const script=document.createElement('script');
  script.src='/ui-patch-v94.js?v=20260821-1';
  script.dataset.uiPatchV94='1';
  document.head.appendChild(script);
})();
