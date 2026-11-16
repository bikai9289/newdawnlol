export function siteOrigin(value) {
  let url;
  try { url = new URL(value); } catch { throw Error('SITE_URL: expected an absolute HTTP(S) origin'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password)
    throw Error('SITE_URL: expected a plain HTTP(S) origin without credentials, path, query or hash');
  return url.origin;
}
export function validateContent(content, dates, site, locales) {
  const fail = message => { throw Error(`CONTENT_INVALID: ${message}`); };
  const text = value => typeof value === 'string' && value.trim().length > 0;
  const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(new Date(value).getTime()) && new Date(value).toISOString().slice(0,10) === value;
  if (typeof site.indexing !== 'boolean') fail('indexing must be boolean');
  if (!Array.isArray(content.releaseStatus) || content.releaseStatus.length !== 3 || content.releaseStatus.some(s => !text(s.label) || !text(s.value))) fail('three release status labels and values are required');
  if (!Array.isArray(site.languages) || !site.languages.includes('en')) fail('English must be enabled');
  for (const lang of site.languages) if (!locales[lang]?.enabled) fail(`locale ${lang} is not enabled`);
  if (!Array.isArray(content.sources) || !content.sources.length || !Array.isArray(content.pages)) fail('sources and pages are required');
  const sourceIds = new Set();
  for (const source of content.sources) {
    if (!text(source.id) || sourceIds.has(source.id) || !text(source.title) || !text(source.note)) fail('incomplete or duplicate source');
    let url; try { url = new URL(source.url); } catch { fail('invalid source URL'); }
    if (url.protocol !== 'https:') fail('sources must use HTTPS');
    if (source.checked && !date(source.checked)) fail('invalid source check date');
    sourceIds.add(source.id);
  }
  const routes = new Set();
  const image = value => {
    if(!value)return;
    if(!/^\/assets\/[a-z0-9-]+\.webp$/.test(value.src)||!text(value.alt)||!text(value.caption)||!sourceIds.has(value.sourceId))fail('invalid editorial image');
  };
  for (const page of content.pages) {
    if (!/^\/(?:[a-z0-9-]+\/)*$/.test(page.route) || routes.has(page.route)) fail('invalid or duplicate route');
    routes.add(page.route);
    if (typeof page.published !== 'boolean') fail('published must be boolean');
    if (!page.published) continue;
    image(page.heroImage);
    if (!site.languages.includes(page.lang)) fail(`disabled language on ${page.route}`);
    if (page.lang !== 'en' && !page.route.startsWith(locales[page.lang].prefix + '/')) fail('translated route prefix mismatch');
    for (const field of ['title','description','heading','eyebrow','lead','intro']) if (!text(page[field])) fail(`missing ${field} on ${page.route}`);
    if (!date(dates[page.route])) fail(`missing or invalid lastmod on ${page.route}`);
    if (!Array.isArray(page.sections) || !page.sections.length || !Array.isArray(page.faq)) fail('sections and faq must be arrays');
    const ids = new Set(['timeline','faq','sources']);
    for (const section of page.sections) {
      if (!/^[a-z][a-z0-9-]*$/.test(section.id) || ids.has(section.id)) fail('invalid or duplicate section id');
      ids.add(section.id);
      for (const field of ['label','heading','text']) if (!text(section[field])) fail(`missing section ${field}`);
      if (!Array.isArray(section.sourceIds) || !section.sourceIds.length || section.sourceIds.some(id => !sourceIds.has(id))) fail('unknown or missing section sources');
      if(section.paragraphs && (!Array.isArray(section.paragraphs)||section.paragraphs.some(p=>!text(p))))fail('invalid paragraphs');
      if(section.table && (!Array.isArray(section.table.headers)||!section.table.headers.length||section.table.headers.some(h=>!text(h))||!Array.isArray(section.table.rows)||section.table.rows.some(r=>!Array.isArray(r)||r.length!==section.table.headers.length||r.some(v=>!text(v)))))fail('invalid comparison table');
      if(section.related && (!/^\/(?:[a-z0-9-]+\/)*(?:#[a-z0-9-]+)?$/.test(section.related.href)||!text(section.related.label)))fail('invalid contextual link');
      image(section.image);
    }
    for (const item of page.faq) if (!text(item.question) || !text(item.answer)) fail('incomplete FAQ');
  }
  if (!content.pages.some(p => p.route === '/' && p.published)) fail('published home page required');
  const publishedRoutes=new Set(content.pages.filter(p=>p.published).map(p=>p.route));
  for(const page of content.pages.filter(p=>p.published)){
    if(page.relatedRoutes && (!Array.isArray(page.relatedRoutes)||page.relatedRoutes.some(r=>r===page.route||!publishedRoutes.has(r))))fail('invalid related guide route');
    if(page.showTimeline!==undefined && typeof page.showTimeline!=='boolean')fail('showTimeline must be boolean');
  }
  if (!Array.isArray(content.timeline) || !content.timeline.length) fail('timeline required');
  for (const item of content.timeline) {
    for (const field of ['date','label','detail','status']) if (!text(item[field])) fail(`missing timeline ${field}`);
    if (!sourceIds.has(item.sourceId)) fail('unknown timeline source');
  }
  return content;
}
