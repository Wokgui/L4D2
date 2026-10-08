const {test}=require('node:test');
const assert=require('node:assert/strict');
const handler=require('../api/drive-backup.js');
test('Drive export writes the configured folder and import rejects files outside it',async()=>{
 const original=global.fetch;let exported,mediaReads=0;
 for(const name of ['CLIENT_ID','CLIENT_SECRET','REFRESH_TOKEN','DRIVE_FOLDER_ID'])process.env['L4D2_GOOGLE_'+name]='test';
 process.env.L4D2_DRIVE_FOLDER_ID='dedicated-folder';
 const payload={campaigns:[{name:'Current'}],otherCampaigns:[],lastPlayed:null};
 global.fetch=async(url,options={})=>{
  let data;
  if(url.includes('/auth/v1/user'))data={id:'owner'};
  else if(url.includes('wokgui_is_app_owner'))data=true;
  else if(url.includes('oauth2'))data={access_token:'test'};
  else if(url.includes('upload/')){exported=JSON.parse(options.body.split('\r\n\r\n')[1].split('\r\n')[0]);assert(options.body.includes('Current'));data={id:'export',name:exported.name};}
  else if(url.includes('alt=media')){mediaReads++;data=payload;}
  else {assert(new URL(url).searchParams.get('q').includes("'dedicated-folder' in parents"));data={files:[{id:'export',name:'Export.json'}]};}
  return {ok:true,json:async()=>data};
 };
 async function request(method,query,body){let status,result;await handler({method,query,body,headers:{authorization:'Bearer test-session'}},{setHeader(){},status(code){status=code;return this;},json(value){result=value;}});return {status,result};}
 try{
  assert.equal((await request('POST',{}, {action:'export',payload})).status,200);
  assert.deepEqual(exported.parents,['dedicated-folder']);assert.equal(exported.appProperties.kind,'export');
  assert.equal((await request('GET',{action:'import',id:'outside'})).status,404);assert.equal(mediaReads,0);
  const result=await request('GET',{action:'import',id:'export'});assert.equal(result.status,200);assert.deepEqual(result.result.payload,payload);
 }finally{global.fetch=original;}
});
