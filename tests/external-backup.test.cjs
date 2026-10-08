const {test}=require('node:test'),assert=require('node:assert/strict');
const {pack}=require('../api/drive-backup.js');
const save=require('../api/save.js');
test('external backup decompresses complete data and preserves the last draw',async()=>{
 const original=global.fetch;process.env.GITHUB_TOKEN='test';
 const payload={campaigns:[{name:'Campaign',photo:'x'.repeat(1100000)}],otherCampaigns:[{name:'Other'}],lastPlayed:{name:'Last',drawnAt:'2026-10-08T16:00:00Z'}};
 const body=pack(payload);assert.equal(body.encoding,'gzip-base64');let stored,status;
 global.fetch=async(url,options={})=>{
  if(url.includes('wokgui_is_app_owner'))return {ok:true,json:async()=>true};
  if(options.method==='PUT'){const request=JSON.parse(options.body);stored=JSON.parse(Buffer.from(request.content,'base64').toString('utf8'));return {ok:true};}
  return {ok:true,json:async()=>({sha:'previous'})};
 };
 try{await save({method:'POST',headers:{authorization:'Bearer test'},body},{status(code){status=code;return this;},json(){}});assert.equal(status,200);assert.deepEqual(stored.campaigns,payload.campaigns);assert.deepEqual(stored.otherCampaigns,payload.otherCampaigns);assert.deepEqual(stored.lastPlayed,payload.lastPlayed);assert.deepEqual(stored.lastDrawn,payload.lastPlayed);}finally{global.fetch=original;}
});
