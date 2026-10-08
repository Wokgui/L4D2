const {test}=require('node:test');
const assert=require('node:assert/strict');
const handler=require('../api/drive-backup.js');
test('seven uploads retain the latest five, errors keep existing versions, and duplicate/stale uploads do not replace the latest',async()=>{
  const original=global.fetch,files=[];let failed=false;
  process.env.L4D2_DRIVE_FOLDER_ID='dedicated-folder';
  global.fetch=async(url,options={})=>{
    if(url.includes('upload/')){
      if(failed)return {ok:false,status:503};
      const metadata=JSON.parse(options.body.split('\r\n\r\n')[1].split('\r\n')[0]);
      files.push({...metadata,id:'file-'+files.length,modifiedTime:new Date().toISOString(),trashed:false});
      return {ok:true,json:async()=>({id:files.at(-1).id})};
    }
    if(options.method==='PATCH'){
      const id=url.split('/').at(-1);const file=files.find(x=>x.id===id);file.trashed=true;
      return {ok:true,json:async()=>file};
    }
    return {ok:true,json:async()=>({files:files.filter(x=>!x.trashed)})};
  };
  try{
    for(let i=1;i<=7;i++)await handler.saveVersion('token','owner',{campaigns:[{name:'version '+i}],otherCampaigns:[]},i);
    assert.deepEqual(files.filter(x=>!x.trashed).map(x=>+x.appProperties.revision).sort((a,b)=>a-b),[3,4,5,6,7]);
    const count=files.length;
    await handler.saveVersion('token','owner',{campaigns:[{name:'version 7'}],otherCampaigns:[]},8);
    assert.equal(files.length,count);
    await handler.saveVersion('token','owner',{campaigns:[{name:'stale'}],otherCampaigns:[]},2);
    assert.equal(files.length,count);
    failed=true;await assert.rejects(handler.saveVersion('token','owner',{campaigns:[],otherCampaigns:[]},9));
    assert.deepEqual(files.filter(x=>!x.trashed).map(x=>+x.appProperties.revision).sort((a,b)=>a-b),[3,4,5,6,7]);
  }finally{global.fetch=original;}
});
test('requests without authentication are rejected before Google access',async()=>{
  let status,result;const response={setHeader(){},status(code){status=code;return this;},json(data){result=data;}};
  await handler({method:'GET',headers:{}},response);
  assert.equal(status,403);assert.ok(result.error);
});
test('large campaign photos cross the uncompressed limit and survive browser/server compression in both directions',async()=>{
  const {randomBytes}=require('node:crypto');
  const value={payload:{campaigns:[{name:'Campaign',image:randomBytes(3000000).toString('base64'),description:'campagne '.repeat(60000)}],otherCampaigns:[],lastPlayed:null},revision:102};
  const json=JSON.stringify(value);assert(Buffer.byteLength(json)>4500000);
  const compressed=await new Response(new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer();
  const encoded={encoding:'gzip-base64',content:Buffer.from(compressed).toString('base64')};
  assert(Buffer.byteLength(JSON.stringify(encoded))<4500000);
  assert.deepEqual(handler.unpack(encoded),value);
  const restore=handler.pack({payload:value.payload});
  const decoded=await new Response(new Blob([Buffer.from(restore.content,'base64')]).stream().pipeThrough(new DecompressionStream('gzip'))).json();
  assert.deepEqual(decoded,{payload:value.payload});
});
test('existing owner history backfills older versions without replacing a newer Drive backup',async()=>{
  const original=global.fetch,files=[{id:'current',modifiedTime:new Date().toISOString(),appProperties:{revision:'9'},trashed:false}];
  global.fetch=async(url,options={})=>{
    if(url.includes('/rest/v1/user_app_backup_history?')){
      const query=new URL(url).searchParams;assert.equal(query.get('user_id'),'eq.owner');assert.equal(query.get('app_id'),'eq.l4d2-selector');assert.equal(options.headers.Authorization,'Bearer owner-session');
      return {ok:true,json:async()=>[8,7,6,5,4].map(revision=>({revision,payload:{format:'wokgui-complete-backup-v2',appId:'l4d2-selector',data:{campaigns:[{name:'v'+revision}],otherCampaigns:[]}}}))};
    }
    if(url.includes('upload/')){const metadata=JSON.parse(options.body.split('\r\n\r\n')[1].split('\r\n')[0]);files.push({...metadata,id:'file-'+files.length,modifiedTime:new Date().toISOString(),trashed:false});return {ok:true,json:async()=>({id:files.at(-1).id})};}
    if(options.method==='PATCH'){files.find(x=>x.id===url.split('/').at(-1)).trashed=true;return {ok:true,json:async()=>({})};}
    return {ok:true,json:async()=>({files:files.filter(x=>!x.trashed)})};
  };
  try{const result=await handler.seedHistory('google-token','owner','Bearer owner-session');assert.deepEqual(result.map(x=>Number(x.appProperties.revision)),[9,8,7,6,5]);assert.equal(result[0].id,'current');}finally{global.fetch=original;}
});
