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

## Custom domain: zone active, awaiting apex CNAME

The account owner added `newdawnlol.com` to Cloudflare and updated nameservers in Spaceship. The Cloudflare zone now reports **Active**, with assigned nameservers:

- `jo.ns.cloudflare.com`
- `norm.ns.cloudflare.com`

Pages still reports **Pending**, specifically `CNAME record not set`. The existing Wrangler OAuth credential has Pages write access but the DNS-record listing endpoint returns HTTP 403 `Authentication error`; it cannot inspect or edit DNS records. Public resolution on this machine has not yet reached a working custom-domain endpoint (HTTPS lookup returned ENOTFOUND at this check).

Required account-owner action:

1. In Cloudflare → `newdawnlol.com` → DNS → Records, add **CNAME**, name **@**, target **newdawnlol.pages.dev**, proxy **on**, TTL **Auto**. Check existing apex A/AAAA/CNAME records for conflicts first; preserve unrelated records.
2. Wait for the Pages custom domain to reach Active and obtain a valid certificate. Nameserver caches may still show the previous Spaceship servers temporarily.
3. Fetch both custom-domain pages, sitemap, robots, share image and a missing route again. Then configure GSC Domain verification and submit the custom-domain sitemap. No GSC action has been taken yet.

Cloudflare documents that a Pages apex domain must be a zone in the same account and use Cloudflare nameservers: https://developers.cloudflare.com/pages/configuration/custom-domains/
