# Editorial and readability refresh

User requested richer answers on the existing two pages, larger minimum type and official images to interrupt long text. No GSC submission, repair validation, new route or sitemap expansion was performed.

Home now uses the title `League of Legends New Dawn: Confirmed News & 2027 Guide`. It distinguishes the update from a standalone sequel, explains Meddler’s clarifications, compares confirmed facts with unanswered questions, gives the next reveal window, distinguishes the **2014** cinematic and supplies eight FAQs. Existing page links now point into relevant sections rather than only navigation/footer links.

Release-date content explains reveal versus launch, the unknown reason for the absent exact date, regional uncertainty, countdown verification and testing claims. Historical comparisons use Riot’s Season 2024 preview and Patch 14.1 regional ranked schedule; neither is presented as a prediction for New Dawn.

The main edited prose, comparison rows and FAQ contain approximately **1,197 words on home** and **1,316 on release-date**, excluding navigation, source directories and shared timeline. These counts document scope, not a ranking requirement. No claim is made that word count explains an indexation state or guarantees rankings. The unavailable GSC reports were supplied by the user, not independently inspected in this task.

The primary Meddler X URL returned 403 during research. Its clarification was cross-checked through a readable developer-post mirror and that limitation remains visible next to the source. No large verbatim statement is reproduced. The original film year is backed by contemporary 2014 reporting and its original video link.

Visual composition follows the baoyu cover skill’s scene/low-text/negative-space approach, using existing official raster assets rather than generated artwork. No AI image backend or image-generation confirmation flow was needed. The teaser and historical cinematic thumbnails were fetched from their video URLs; existing Ahri splash comes from Riot’s Data Dragon and is explicitly labeled **not a New Dawn model preview**. Original pixels are not retouched; derivatives are WebP. Provenance, copyright and policy links are recorded in `public/art-sources.json`; third-party images are excluded from CC BY-SA, and artworkCleared remains false.

Body type is 18px, citations 14px, image captions 13px and small section labels 12px. Tables use column headers and stay within the mobile viewport. Image dimensions reserve layout space, hero uses high fetch priority, and inline illustrations lazy-load. Large images divide the prose. All content remains readable without JavaScript.

Verification: 16 Node tests/build; two pages at 320/390/768/1440 with JS disabled; FAQ, canonical, 404s, no horizontal overflow. A discovered race from two acceptance files building the same output was resolved by serializing test files. Independent read-only review found no important/blocking issues; its minor character-encoding findings were corrected.

Route lastmod remains 2026-11-16 because the real editorial change occurred on that date. Deployment uses the existing GitHub→Cloudflare production flow; GSC is untouched.
