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
