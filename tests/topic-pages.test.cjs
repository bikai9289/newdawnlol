const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const c=require('../src/data/content.json');
const routes=['/','/release-date/','/changes/','/teaser/','/lol-2/','/map/'];
require('node:child_process').execFileSync(process.execPath,['scripts/build.mjs']);
test('published topic pages have shared navigation, canonical, breadcrumbs and sibling links',()=>{
 const titles=[];
 for(const route of routes){
  const html=fs.readFileSync('dist/'+(route==='/'?'index.html':route.slice(1)+'index.html'),'utf8');
  const nav=html.match(/<nav aria-label="Main navigation">(.*?)<\/nav>/s)[1];
  for(const dest of routes)assert.ok(nav.includes(`href="${dest}"`),`${route} nav ${dest}`);
  assert.ok(html.includes(`rel="canonical" href="https://newdawnlol.com${route}"`));
  titles.push(html.match(/<title>(.*?)<\/title>/s)[1]);
  if(route!=='/')assert.match(html,/BreadcrumbList/);
  if(['/changes/','/teaser/','/lol-2/'].includes(route)){
   const related=html.match(/<nav class="related-pages"[^>]*>(.*?)<\/nav>/s)[1];
   for(const sibling of ['/','/changes/','/teaser/','/lol-2/'].filter(r=>r!==route))assert.ok(related.includes(`href="${sibling}"`));
  }
 }
 assert.equal(new Set(titles).size,routes.length);
});
test('sitemap contains exactly the published routes with authored dates',()=>{
 const xml=fs.readFileSync('dist/sitemap.xml','utf8');
 assert.deepEqual([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]),routes.map(r=>'https://newdawnlol.com'+r));
 for(const route of routes)assert.ok(c.pages.some(p=>p.published&&p.route===route));
});
test('all internal fragment links point to an existing section',()=>{
 for(const route of routes){
  const file='dist/'+(route==='/'?'index.html':route.slice(1)+'index.html');
  const html=fs.readFileSync(file,'utf8');
  for(const [,href] of html.matchAll(/href="((?:\/[^" ]*)?#[^"]+)"/g)){
   const url=new URL(href,'https://newdawnlol.com'+route);
   const dest=fs.readFileSync('dist/'+(url.pathname==='/'?'index.html':url.pathname.slice(1)+'index.html'),'utf8');
   assert.ok(dest.includes(`id="${url.hash.slice(1)}"`),`${route} link ${href}`);
  }
 }
});
