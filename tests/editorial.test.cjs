const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const c=require('../src/data/content.json');
require('node:child_process').execFileSync(process.execPath,['scripts/build.mjs']);
test('full keyword, sourced clarifications, comparison and FAQ answer the requested intents',()=>{
 assert.match(c.pages[0].title,/League of Legends New Dawn/);
 assert.ok(c.pages[0].faq.length>=6);
 assert.ok(c.pages[0].sections.some(s=>s.id==='lol-2'));
 assert.ok(c.pages[0].sections.some(s=>s.table));
 for(const id of ['why-no-date','history','regions','countdowns'])assert.ok(c.pages[1].sections.some(s=>s.id===id));
});
test('generated pages include real images, paragraph breaks, accessible tables and contextual links',()=>{
 for(const file of ['dist/index.html','dist/release-date/index.html']){
  const html=fs.readFileSync(file,'utf8');
  assert.match(html,/<figure/);assert.match(html,/<img[^>]+width=/);assert.match(html,/<figcaption/);
  assert.match(html,/<th scope="col">/);assert.match(html,/class="context-link"/);
  assert.ok((html.match(/<p>/g)||[]).length>15);
 }
});
