const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const sourceRoot=path.resolve(__dirname,'..');
function fixture(run){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'newdawn-build-test-'));
 try {
  for(const dir of ['src','public','scripts'])fs.cpSync(path.join(sourceRoot,dir),path.join(root,dir),{recursive:true});
  fs.writeFileSync(path.join(root,'package.json'),'{"type":"module"}');
  return run(root);
 } finally {fs.rmSync(root,{recursive:true,force:true});}
}
const build=root=>spawnSync(process.execPath,['scripts/build.mjs'],{cwd:root,encoding:'utf8'});
test('shared release status edits reach both pages and two-section articles build safely',()=>fixture(root=>{
 const file=path.join(root,'src/data/content.json');
 const content=JSON.parse(fs.readFileSync(file,'utf8'));
 content.releaseStatus=[{label:'RELEASE WINDOW',value:'NEW RELEASE STATUS'},{label:'NEXT MILESTONE',value:'NEW REVEAL STATUS'},{label:'EXACT LAUNCH DATE',value:'NEW DATE STATUS'}];
 content.pages[0].sections=content.pages[0].sections.slice(0,2);
 fs.writeFileSync(file,JSON.stringify(content));
 const result=build(root);assert.equal(result.status,0,result.stderr);
 for(const name of ['index.html','release-date/index.html']){
  const html=fs.readFileSync(path.join(root,'dist',name),'utf8');
  for(const value of content.releaseStatus.map(s=>s.value))assert.ok(html.includes(value));
 }
}));
test('a render input failure preserves the previous successful output',()=>fixture(root=>{
 assert.equal(build(root).status,0);
 const before=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
 fs.unlinkSync(path.join(root,'src/styles/site.css'));
 const result=build(root);assert.notEqual(result.status,0);
 assert.equal(fs.readFileSync(path.join(root,'dist/index.html'),'utf8'),before);
}));
