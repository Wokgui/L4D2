const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8').replace(/^\uFEFF/,'').replace(/\r\n/g,'\n');
const parts=[];
for(const version of [84,85,87,88,91,93,97,89,90,92,96,98,94,95]){
  let source=read(`ui-patch-v${version}.js`);
  if(version===88)source=source.slice(0,source.indexOf("(()=>{\n  const scripts=["));
  if(version===93)source=source.replace(/\(\(\)=>\{\n  if\(document.querySelector\('script\[data-secure-github-save\]'\)\)[\s\S]*?\n\}\)\(\);/,'');
  if(version===95)source=source.replace(/  const all=document.querySelector\('.cloud-backup-download-all'\);[\s\S]*?\n\}\)\(\);/,'})();');
  parts.push(`// Existing UI module ${version}\n${source}`);
}
parts.splice(7,0,read('secure-github-save.js').split('\n(()=>{')[0]);
parts.push(read('ui-current.js'),"document.documentElement.classList.remove('l4d2-loading');\n");
fs.writeFileSync(path.join(root,'ui-runtime.js'),parts.join('\n;\n'));
