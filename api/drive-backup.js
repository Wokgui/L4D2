const {createHash}=require('node:crypto');
const SUPABASE_URL='https://oxdrhwveuctrorrkuurw.supabase.co';
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZHJod3ZldWN0cm9ycmt1dXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2MjYzNDQsImV4cCI6MjEwMTIwMjM0NH0.lrdF-JILpgAwSrMLVjeU0fcKd2anOhp_T0qtEtJTVc0';
const APP='l4d2-selector';
const required=['L4D2_GOOGLE_CLIENT_ID','L4D2_GOOGLE_CLIENT_SECRET','L4D2_GOOGLE_REFRESH_TOKEN','L4D2_DRIVE_FOLDER_ID'];
async function owner(req){
  const authorization=String(req.headers.authorization||'');
  if(!authorization.startsWith('Bearer '))return null;
  const headers={apikey:SUPABASE_KEY,Authorization:authorization};
  const [identity,permission]=await Promise.all([
    fetch(`${SUPABASE_URL}/auth/v1/user`,{headers}),
    fetch(`${SUPABASE_URL}/rest/v1/rpc/wokgui_is_app_owner`,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({p_app_id:APP})})
  ]);
  if(!identity.ok||!permission.ok||await permission.json()!==true)return null;
  return (await identity.json()).id;
}
async function accessToken(){
  const response=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:process.env.L4D2_GOOGLE_CLIENT_ID,client_secret:process.env.L4D2_GOOGLE_CLIENT_SECRET,refresh_token:process.env.L4D2_GOOGLE_REFRESH_TOKEN,grant_type:'refresh_token'})});
  const data=await response.json();
  if(!response.ok||!data.access_token)throw Error('La connexion Google Drive doit être renouvelée.');
  return data.access_token;
}
async function drive(token,path,options={}){
  const response=await fetch(`https://www.googleapis.com/${path}`,{...options,headers:{Authorization:`Bearer ${token}`,...options.headers}});
  if(!response.ok)throw Error(`Google Drive a refusé cette opération (${response.status}).`);
  return response.json();
}
const quote=value=>String(value).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
async function versions(token,uid){
  const q=`'${quote(process.env.L4D2_DRIVE_FOLDER_ID)}' in parents and trashed=false and appProperties has { key='app' and value='${APP}' } and appProperties has { key='owner' and value='${quote(uid)}' }`;
  const files=[];let pageToken;
  do{
    const params=new URLSearchParams({q,orderBy:'modifiedTime desc',pageSize:'100',fields:'nextPageToken,files(id,name,modifiedTime,appProperties)'});
    if(pageToken)params.set('pageToken',pageToken);
    const result=await drive(token,`drive/v3/files?${params}`);files.push(...result.files);pageToken=result.nextPageToken;
  }while(pageToken);
  return files.sort((a,b)=>Number(b.appProperties.revision)-Number(a.appProperties.revision)||b.modifiedTime.localeCompare(a.modifiedTime));
}
function valid(payload){return Array.isArray(payload?.campaigns)&&Array.isArray(payload?.otherCampaigns);}
async function saveVersion(token,uid,payload,revision){
  const content=JSON.stringify(payload,null,2),digest=createHash('sha256').update(content).digest('hex');
  const before=await versions(token,uid);
  if(before[0]?.appProperties.digest===digest)return before.slice(0,5);
  // A stale concurrent upload must never overwrite a more recent revision.
  if(before[0]&&Number(before[0].appProperties.revision)>=revision)return before.slice(0,5);
  const boundary='l4d2_'+createHash('sha256').update(`${uid}:${revision}`).digest('hex').slice(0,24);
  const metadata={name:`L4D2-v${revision}.json`,mimeType:'application/json',appProperties:{app:APP,owner:uid,revision:String(revision),digest}};
  metadata.parents=[process.env.L4D2_DRIVE_FOLDER_ID];
  const body=`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${content}\r\n--${boundary}--\r\n`;
  await drive(token,'upload/drive/v3/files?uploadType=multipart&fields=id',{method:'POST',headers:{'Content-Type':`multipart/related; boundary=${boundary}`},body});
  const after=await versions(token,uid);
  // Recoverable trash only, after the new version has been uploaded successfully.
  const distinct=[],extra=[];const seen=new Set();
  for(const file of after){if(seen.has(file.appProperties.revision)||distinct.length>=5)extra.push(file);else{seen.add(file.appProperties.revision);distinct.push(file);}}
  for(const file of extra)await drive(token,`drive/v3/files/${encodeURIComponent(file.id)}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({trashed:true})});
  return distinct;
}
async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(!['GET','POST'].includes(req.method))return res.status(405).json({error:'Méthode non autorisée'});
  try{
    const uid=await owner(req);if(!uid)return res.status(403).json({error:'Connexion à la sauvegarde nécessaire'});
    if(required.some(name=>!process.env[name]))return res.status(503).json({configured:false,error:'Google Drive reste à connecter pour cette application.'});
    const token=await accessToken();
    if(req.method==='GET'){
      const files=await versions(token,uid);
      if(req.query?.id){
        if(!files.slice(0,5).some(file=>file.id===req.query.id))return res.status(404).json({error:'Version introuvable'});
        const payload=await drive(token,`drive/v3/files/${encodeURIComponent(req.query.id)}?alt=media`);
        if(!valid(payload))return res.status(422).json({error:'Sauvegarde invalide'});
        return res.status(200).json({payload});
      }
      return res.status(200).json({configured:true,versions:files.slice(0,5)});
    }
    const data=typeof req.body==='string'?JSON.parse(req.body):req.body;
    if(!valid(data?.payload)||!Number.isSafeInteger(data?.revision)||data.revision<1)return res.status(400).json({error:'Données de sauvegarde invalides'});
    const files=await saveVersion(token,uid,data.payload,data.revision);
    return res.status(200).json({configured:true,versions:files});
  }catch(error){return res.status(502).json({error:error.message||'Google Drive est indisponible'});}
}
module.exports=handler;
module.exports.saveVersion=saveVersion;
