const {spawn}=require('node:child_process');
const {once}=require('node:events');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root=path.resolve(__dirname,'..');
const port=String(4500+process.pid%1000);
const server=spawn(process.execPath,['scripts/serve.mjs'],{cwd:root,env:{...process.env,PORT:port},stdio:['ignore','pipe','pipe'],windowsHide:true});
let browser;
(async()=>{
 await Promise.race([once(server.stdout,'data'),once(server,'exit').then(()=>{throw Error('Preview server exited');}),new Promise((_,reject)=>setTimeout(()=>reject(Error('Preview start timeout')),10000).unref())]);
 const options={headless:true};
 if(process.env.PLAYWRIGHT_EXECUTABLE)options.executablePath=process.env.PLAYWRIGHT_EXECUTABLE;
 browser=await chromium.launch(options);
 const context=await browser.newContext({javaScriptEnabled:false});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const origin='http://127.0.0.1:'+port;
 fs.mkdirSync(path.join(root,'test-results'),{recursive:true});
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:950});
  for(const route of ['/','/release-date/']){
   const response=await page.goto(origin+route);assert.equal(response.status(),200);
   await page.locator('h1').waitFor();
   const sizes=await page.evaluate(()=>({view:innerWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(sizes.scroll<=sizes.view,`Overflow ${route} at ${width}: ${JSON.stringify(sizes)}`);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://newdawnlol.com'+route);
   const faq=page.locator('details').first();await faq.locator('summary').click();assert.notEqual(await faq.getAttribute('open'),null);
   await faq.locator('summary').click();assert.equal(await faq.getAttribute('open'),null);
   await page.evaluate(()=>window.scrollTo(0,0));
   await page.screenshot({path:path.join(root,'test-results',(route==='/'?'home':'release')+'-'+width+'.png'),fullPage:true});
  }
 }
 const response=await page.goto(origin+'/about/');assert.equal(response.status(),200);
 for(const route of ['/missing/','/changes/','/leaks/','/rift-timer/eu/']){
  const r=await context.request.get(origin+route);assert.equal(r.status(),404);assert.match(await r.text(),/noindex/);
 }
 const redirect=await context.request.get(origin+'/release-date',{maxRedirects:0});assert.equal(redirect.status(),301);assert.equal(redirect.headers().location,'/release-date/');
 const image=await context.request.get(origin+'/assets/social-card.png');assert.equal(image.status(),200);assert.match(image.headers()['content-type'],/image\/png/);
 assert.deepEqual(errors,[]);
 console.log('Browser checks passed: 2 pages × 4 widths; no JS; FAQ, metadata, 404s, redirect and sharing image.');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();server.kill();});
