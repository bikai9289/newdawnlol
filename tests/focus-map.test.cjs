const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const c=require('../src/data/content.json');
require('node:child_process').execFileSync(process.execPath,['scripts/build.mjs']);
test('sequel page names the full game in title, H1 and introduction without changing URL',()=>{
 const page=c.pages.find(p=>p.route==='/lol-2/');
 assert.match(page.title,/^League of Legends 2:/);
 assert.equal(page.heading,'Is League of Legends 2 Coming Out?');
 assert.match(page.intro,/League of Legends 2/);
});
test('changes consolidate runes, champions and labeled rumors; teaser provides a viewing checklist',()=>{
 const changes=c.pages.find(p=>p.route==='/changes/');
 for(const id of ['runes-talents','champion-continuity','client-visuals','unconfirmed'])assert.ok(changes.sections.some(s=>s.id===id));
 assert.ok(c.pages.find(p=>p.route==='/teaser/').sections.some(s=>s.id==='viewing-checklist'));
});
test('map page has a distinct evidence ledger, context and links rather than invented final geometry',()=>{
 const page=c.pages.find(p=>p.route==='/map/');assert.equal(page.published,true);
 assert.match(page.title,/New Dawn Map/);
 assert.ok(page.sections.some(s=>s.id==='evidence-ledger'&&s.table));
 assert.ok(page.sections.some(s=>s.id==='current-baseline'));
 assert.ok(page.relatedRoutes.includes('/changes/'));
 assert.ok(fs.existsSync('dist/map/index.html'));
});
