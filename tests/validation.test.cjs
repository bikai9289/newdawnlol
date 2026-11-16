const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const load=name=>JSON.parse(fs.readFileSync(path.join(__dirname,'../src/data',name+'.json'),'utf8'));
const validator=import('../scripts/validate.mjs');
test('origin rejects malformed URLs, credentials and non-root paths',async()=>{
 const {siteOrigin}=await validator;
 for(const value of ['not a URL','file:///tmp/','https://user:pass@example.com','https://example.com/sub/','https://example.com/?a=1','https://example.com/#x'])assert.throws(()=>siteOrigin(value),/SITE_URL/);
 assert.equal(siteOrigin('https://newdawnlol.com/'),'https://newdawnlol.com');
});
test('content validation rejects missing dates, impossible dates, unknown citations, duplicated routes and incomplete FAQ',async()=>{
 const {validateContent}=await validator;
 for(const mutate of [
  (c,d)=>delete d['/release-date/'],
  (c,d)=>d['/']='2026-02-30',
  (c,d)=>d['/']='2026-99-99',
  c=>c.pages[0].sections[0].sourceIds=['missing'],
  c=>c.pages[1].route='/',
  c=>c.pages[0].faq[0].answer='',
  c=>c.pages[0].sections[0].id='timeline',
  c=>c.pages[0].intro='',
  c=>c.sources[0].url='javascript:alert(1)',
  c=>c.timeline[0].sourceId='missing'
 ]){
  const c=load('content'),d=load('page-dates');mutate(c,d);
  assert.throws(()=>validateContent(c,d,load('site'),load('locales')),/CONTENT_INVALID/);
 }
});
test('unpublished drafts can be incomplete but publishing one without content fails',async()=>{
 const {validateContent}=await validator;const c=load('content');
 assert.doesNotThrow(()=>validateContent(c,load('page-dates'),load('site'),load('locales')));
 c.pages.find(p=>!p.published).published=true;
 assert.throws(()=>validateContent(c,load('page-dates'),load('site'),load('locales')),/CONTENT_INVALID/);
});
test('disabled translations and nonboolean indexing are rejected',async()=>{
 const {validateContent}=await validator;const site=load('site');site.languages.push('es');
 assert.throws(()=>validateContent(load('content'),load('page-dates'),site,load('locales')),/not enabled/);
 site.languages=['en'];site.indexing='true';
 assert.throws(()=>validateContent(load('content'),load('page-dates'),site,load('locales')),/boolean/);
});
