# New Dawn LoL

Independent English information site for League of Legends New Dawn. Production origin: **https://newdawnlol.com**. Repository name: **newdawnlol**; the local directory name stays unchanged. Adapted in an isolated copy of the TimeLord-derived static foundation.

Node.js 20+, no build/runtime dependencies. No Astro, login, payments, analytics, installers, service worker or countdown.

Live site: https://newdawnlol.com/ — GitHub `main` is connected for automatic Cloudflare Pages deployments. The custom domain has passed HTTPS and page/resource checks; see [deployment status](docs/DEPLOYMENT.md).

```sh
npm run check
npm run dev
npm run build
npm start
```

`dev` builds and serves http://127.0.0.1:4320. `start` previews existing output. On Windows use `npm.cmd` if PowerShell blocks the shim.

## First release

- `/`: overview, confirmed/unknown facts, timeline, FAQ and historical cinematic distinction.
- `/release-date/`: release intent. January 2027 is the reveal; release is planned later in 2027. No exact launch day is invented.
- `/about/`: editorial policy, privacy and attribution; noindex, excluded from sitemap.
- `404.html`: real Pages 404, noindex. Seven draft topic routes remain unpublished and return 404.

Draft intents in `src/data/content.json`: changes, characters, leaks, teaser, runes, lol-2 and news. Publish only after supplying useful sourced content and a route date. No empty placeholders.

## Source data

`src/data/site.json` owns the canonical origin and indexing switch. `SITE_URL` can override the origin, but must be a plain HTTP(S) origin. `publication.artworkCleared=false` records pending operator review; it never controls indexing and is not third-party permission.

`src/data/content.json` owns pages, FAQ, source notes, timeline and the shared `releaseStatus` strip. Update all affected facts together when timing changes. Confirmed claims require traceable sources; reporting and rumors remain labeled. The historical A New Dawn film dates to 2014. Its original YouTube link was rate-limited during review; contemporary coverage corroborates the year.

`src/data/page-dates.json` owns per-route lastmod. **Only update a route date when its actual text, sources or artwork changes. Build time never replaces it.** Inputs are validated and a temporary build is fully rendered before replacing output; promotion failure restores the previous output.

`src/data/locales.json` retains disabled es/pt/tr metadata. To publish translations, enable the locale and site language, provide translated page data and dates, and assign the same `translationKey` to all versions including English. Only published members receive reciprocal hreflang and x-default. No unpublished translation URLs are emitted.

`scripts/build.mjs` generates canonical, OG/Twitter, WebSite/WebPage and breadcrumb data, sitemap, robots, redirects and security headers. No WebApplication or FAQ rich-result claim is used. All content and FAQ work without browser JavaScript.

## Cloudflare Pages and GitHub

1. Create a **new** GitHub repository named `newdawnlol` containing these source and license files. Connect it to a new Cloudflare Pages project. Do not change the original live project.
2. Framework: None. Build: `npm run check`. Output: `dist`. Node: `22` (20+ supported). Production branch: `main`.
3. Production environment: `SITE_URL=https://newdawnlol.com`. For previews use a preview-only config/branch with indexing false, or Cloudflare preview protection. Never submit preview URLs to GSC.
4. Add `newdawnlol.com` as the Pages custom domain and follow its DNS instructions.
5. Verify live `/`, `/release-date/`, sitemap, robots and sharing image; verify unknown paths return HTTP 404. Check canonical and production headers for accidental noindex.
6. Add a GSC Domain property using Google's DNS TXT record. Submit `https://newdawnlol.com/sitemap.xml`; inspect both content URLs and request indexing once each. A request is not proof of indexing: check indexed status and Google's selected canonical afterward.

GitHub Actions runs `npm run check`. Direct Pages/GitHub integration needs no deployment secret in this repository. `dist/`, `.wrangler/`, `.env*` and browser results are ignored.

## Verification

`npm run check`: Node acceptance tests plus clean build. `npm run test:browser`: existing Playwright via `PLAYWRIGHT_MODULE` or resolvable `playwright`; starts its own preview, checks 320/390/768/1440 px, FAQ, browser errors and missing routes, and saves ignored screenshots. Browser tooling is optional, not a build dependency.

`scripts/create-social-card.py` is an optional Python/Pillow maintenance helper. The committed 1200×630 PNG is copied directly in normal builds. Geometric graphics are original; official video thumbnails retain Riot copyright. Provenance is in `public/art-sources.json`.

## License

Original work: **TimeLord by dburr**, CC BY-SA 4.0. Attribution and share-alike notices remain in [LICENSE.md](LICENSE.md) and [docs/UPSTREAM-README.md](docs/UPSTREAM-README.md). New data, layout, graphics and validation use the same license. Riot trademarks are not relicensed. The About page exposes the required credits.
