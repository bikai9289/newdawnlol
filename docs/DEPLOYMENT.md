# Cloudflare Pages deployment — 2026-11-16

## Published

- Source repository: https://github.com/bikai9289/newdawnlol
- Pages project: `newdawnlol`
- Live Pages URL: https://newdawnlol.pages.dev/
- Release page: https://newdawnlol.pages.dev/release-date/
- Production branch: `main`, connected to GitHub; production deployments enabled, preview deployments disabled.
- Build command: `npm run check`; output: `dist`; `NODE_VERSION=22`.
- Production `SITE_URL=https://newdawnlol.com`; canonical, sharing URLs and sitemap deliberately use the intended custom domain.
- No Cloudflare Web Analytics was enabled (`web_analytics_tag` and `web_analytics_token` are null).

Initial deployment `f7aa04db-6407-4591-a9fc-12eecd65d696` successfully cloned and built commit `61f65ef9e71c9335f2dc24a2ecd46ad4dd799cba`, finishing at 15:03:42 Asia/Shanghai. Publishing did not require re-authentication: Git push credentials work even though the separate `gh` token reports invalid.

## Live verification

Twelve routes/resources were fetched from the live Pages hostname. Home and release returned HTTP 200 with correct intended-domain canonical, one H1, parseable JSON-LD and security headers; neither contains noindex. Sitemap contains exactly the two editorial URLs with maintained 2026-11-16 dates. Robots, CSS, favicon, artwork provenance and the 1200×630 PNG returned 200. About is noindex. Unknown, draft and old timer routes return genuine 404 with noindex.

This proves the Pages deployment is operational. It does not prove that the custom domain or GSC is ready.

## Custom domain: awaiting DNS onboarding

`newdawnlol.com` was added under the Pages project's custom domains and is awaiting validation. Public nameservers are currently:

- `launch1.spaceship.net`
- `launch2.spaceship.net`

There is no `newdawnlol.com` zone in the connected Cloudflare account. Creating one with the existing Wrangler OAuth credential returned HTTP 403, requiring `com.cloudflare.api.account.zone.create`. The credential has Pages write permission but cannot create a domain zone.

Required account-owner action:

1. In the **same Cloudflare account** as Pages project `newdawnlol`, add `newdawnlol.com` as a website/zone on the Free plan.
2. Review imported DNS records, preserving any existing email or other services. Copy the **two nameservers assigned to this exact zone**.
3. In Spaceship's domain nameserver settings, replace its current nameservers with those two Cloudflare nameservers. Do not guess nameservers or use those from a different zone.
4. After delegation activates, verify the apex CNAME points to `newdawnlol.pages.dev` and the Pages custom domain reaches Active with a valid certificate. If Cloudflare does not create the record automatically, add it in the zone after checking existing apex records.
5. Fetch both custom-domain pages, sitemap, robots, share image and a missing route again. Then configure GSC Domain verification and submit the custom-domain sitemap. No GSC action has been taken yet.

Cloudflare documents that a Pages apex domain must be a zone in the same account and use Cloudflare nameservers: https://developers.cloudflare.com/pages/configuration/custom-domains/
