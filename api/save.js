const OWNER="Wokgui",REPO="archives-l4d2",PATH="data/catalogue-l4d2-sauvegarde.json",BRANCH="catalogue-backups";
module.exports=async function(req,res){
  if(req.method!=="POST")return res.status(405).json({error:"Méthode non autorisée"});
  const token=process.env.GITHUB_TOKEN;
  if(!token)return res.status(503).json({error:"Sauvegarde GitHub non configurée"});
  try{
    const body=typeof req.body==="string"?JSON.parse(req.body):req.body;
    if(!Array.isArray(body?.campaigns)||!Array.isArray(body?.otherCampaigns))return res.status(400).json({error:"Données invalides"});
    const savedAt=new Date().toISOString(),content=Buffer.from(JSON.stringify({savedAt,campaigns:body.campaigns,otherCampaigns:body.otherCampaigns,lastDrawn:body.lastDrawn||null},null,2)).toString("base64");
    const url=`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`,headers={Authorization:`Bearer ${token}`,Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28","User-Agent":"catalogue-l4d2"};
    const oldResponse=await fetch(`${url}?ref=${encodeURIComponent(BRANCH)}`,{headers}),old=oldResponse.ok?await oldResponse.json():null;
    const response=await fetch(url,{method:"PUT",headers:{...headers,"Content-Type":"application/json"},body:JSON.stringify({message:`Sauvegarde automatique L4D2 ${savedAt}`,content,branch:BRANCH,...(old?.sha?{sha:old.sha}:{})})});
    if(!response.ok){const error=await response.json().catch(()=>({}));return res.status(response.status).json({error:error.message||"Échec GitHub"})}
    return res.status(200).json({ok:true,savedAt});
  }catch(e){return res.status(500).json({error:e.message||"Erreur de sauvegarde"})}
};
