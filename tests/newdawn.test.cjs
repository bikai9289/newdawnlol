const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,'dist',p),'utf8');
const build=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:root,encoding:'utf8'});
test('build succeeds',()=>assert.equal(build.status,0,build.stderr));
test('only published editorial routes are in sitemap with maintained dates',()=>{
 const xml=read('sitemap.xml');
 assert.deepEqual([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]),['/','/release-date/','/changes/','/teaser/','/lol-2/','/map/'].map(r=>'https://newdawnlol.com'+r));
 const dates=JSON.parse(fs.readFileSync(path.join(root,'src/data/page-dates.json'),'utf8'));
 for(const route of ['/','/release-date/'])assert.ok(xml.includes(`<lastmod>${dates[route]}</lastmod>`));
});
test('indexable pages have unique titles, canonical, sharing tags, one h1 and parseable schema',()=>{
 const titles=[];
 for(const [file,route] of [['index.html','/'],['release-date/index.html','/release-date/']]){
  const html=read(file);titles.push(html.match(/<title>(.*?)<\/title>/)[1]);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  assert.ok(html.includes(`rel="canonical" href="https://newdawnlol.com${route}"`));
  assert.ok(html.includes('property="og:image"'));assert.ok(html.includes('name="twitter:card"'));
  assert.doesNotMatch(html,/noindex|WebApplication|2019/);
  for(const [,json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))JSON.parse(json);
 }
 assert.notEqual(titles[0],titles[1]);
});
test('all local page links and image references resolve; draft routes stay unpublished',()=>{
 for(const file of ['index.html','release-date/index.html','changes/index.html','teaser/index.html','lol-2/index.html','map/index.html','about/index.html','404.html']){
  for(const [,url] of read(file).matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){
   const dest=path.join(root,'dist',url.endsWith('/')?url+'index.html':url);
   assert.ok(fs.existsSync(dest),`${file}: ${url}`);
  }
 }
 for(const route of ['characters','leaks','runes','news','rift-timer'])assert.ok(!fs.existsSync(path.join(root,'dist',route)));
});
test('public output contains no old game content, service worker or vendor artwork',()=>{
 const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
 for(const file of walk(path.join(root,'dist'))){
  if(/\.(html|css|js|json|xml|txt|svg)$/.test(file))assert.doesNotMatch(fs.readFileSync(file,'utf8'),/aion|ncsoft|shugo|metabot|no filter fighters|rift-timer|schedules\.json|serviceWorker|workers\.dev/i,file);
 }
 assert.ok(!fs.existsSync(path.join(root,'dist','sw.js')));
 assert.ok(!fs.existsSync(path.join(root,'src','data','schedules.json')));
});
test('release answer distinguishes reveal from release and includes dated sources',()=>{
 const html=read('release-date/index.html');
 assert.match(html,/January 2027/);assert.match(html,/later in 2027/);assert.match(html,/exact.*date.*not.*announced/i);
 assert.match(html,/leagueoflegends\.com/);assert.match(html,/2026-11-16/);
});
test('robots, attribution and noindex 404 are correct',()=>{
 assert.match(read('robots.txt'),/Sitemap: https:\/\/newdawnlol.com\/sitemap.xml/);
 assert.match(read('about/index.html'),/dburr/);assert.match(read('about/index.html'),/CC BY-SA 4.0/);
 assert.match(read('404.html'),/noindex/);
 assert.doesNotMatch(read('_redirects'),/rift|aion/i);
});
test('invalid SITE_URL fails before modifying the existing build',()=>{
 const before=read('index.html');
 const result=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:root,encoding:'utf8',env:{...process.env,SITE_URL:'https://example.com/path'}});
 assert.notEqual(result.status,0);assert.match(result.stderr,/SITE_URL/);assert.equal(read('index.html'),before);
});
