# Cloudflare Pages deployment — 2026-11-16

## Published

- Source repository: https://github.com/bikai9289/newdawnlol
- Pages project: `newdawnlol`
- Live custom domain: https://newdawnlol.com/
- Live Pages URL: https://newdawnlol.pages.dev/
- Release page: https://newdawnlol.pages.dev/release-date/
- Production branch: `main`, connected to GitHub; production deployments enabled, preview deployments disabled.
- Build command: `npm run check`; output: `dist`; `NODE_VERSION=22`.
- Production `SITE_URL=https://newdawnlol.com`; canonical, sharing URLs and sitemap deliberately use the intended custom domain.
- No Cloudflare Web Analytics was enabled (`web_analytics_tag` and `web_analytics_token` are null).

Initial deployment `f7aa04db-6407-4591-a9fc-12eecd65d696` successfully cloned and built commit `61f65ef9e71c9335f2dc24a2ecd46ad4dd799cba`, finishing at 15:03:42 Asia/Shanghai. Publishing did not require re-authentication: Git push credentials work even though the separate `gh` token reports invalid.

## Live verification

Twelve routes/resources were fetched from the live Pages hostname. Home and release returned HTTP 200 with correct intended-domain canonical, one H1, parseable JSON-LD and security headers; neither contains noindex. Sitemap contains exactly the two editorial URLs with maintained 2026-11-16 dates. Robots, CSS, favicon, artwork provenance and the 1200×630 PNG returned 200. About is noindex. Unknown, draft and old timer routes return genuine 404 with noindex.

The same twelve checks subsequently passed against **https://newdawnlol.com**, using default TLS certificate verification. Live Chromium/Edge checks also passed on the custom domain for both editorial pages at 390 and 1440 px, without JavaScript: no horizontal overflow or browser errors, native FAQ works. Plain HTTP redirects to HTTPS with HTTP 301. This proves the custom-domain site is operational; it does not establish Google indexing.

## Custom domain: serving successfully

The account owner added `newdawnlol.com` to Cloudflare and updated nameservers in Spaceship. The Cloudflare zone now reports **Active**, with assigned nameservers:

- `jo.ns.cloudflare.com`
- `norm.ns.cloudflare.com`

The owner added the proxied apex CNAME to `newdawnlol.pages.dev`. After a Pages validation retry, `verification_data.status` changed to **active**, the previous `CNAME record not set` error disappeared, and the custom-domain site began returning HTTP 200 over trusted HTTPS. At the latest API check, the overall Pages domain and its separate HTTP certificate-validation status still reported **pending**; those control-plane statuses had not yet caught up with working public HTTPS.

The existing Wrangler OAuth credential has Pages write access but DNS-record listing returns HTTP 403 `Authentication error`. DNS record changes were therefore performed by the account owner, not this deployment process. Initial ENOTFOUND and temporary 522 responses resolved after DNS onboarding and validation.

## Google Search Console: not submitted

No callable Google Search Console connection is available in this session. No property, ownership TXT record, sitemap submission, URL indexing request or indexed-status claim has been made.

1. Add the **Domain** property `newdawnlol.com` in Google Search Console. Use Google's exact ownership TXT value; do not invent or reuse another site's value.
2. Add that TXT record in this domain's Cloudflare DNS and complete Google's verification.
3. Submit `https://newdawnlol.com/sitemap.xml`.
4. Inspect `https://newdawnlol.com/` and `https://newdawnlol.com/release-date/` and request indexing once each. Later verify indexed status and Google's selected canonical; submission does not prove indexation.

Cloudflare documents that a Pages apex domain must be a zone in the same account and use Cloudflare nameservers: https://developers.cloudflare.com/pages/configuration/custom-domains/
