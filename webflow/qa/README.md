# QA package — mobile + indexing

Everything in this folder is a deliverable audit or a paste-ready patch
for www.cognifit.com/longevity.

## Reports (read first)

| File | What |
| --- | --- |
| `MOBILE-QA-REPORT.md` | 15 mobile findings, severity-ranked, verified in source, with paste-ready fixes |
| `INDEXING-SEO-AUDIT.md` | 14 indexing / SEO / robots / hreflang / GEO findings with fixes |

## Patches (paste-ready)

| File | Where it goes |
| --- | --- |
| `PATCH-01-head-mobile-fixes.html` | Webflow Page Settings → Custom code → Inside `<head>` tag (end of) — CSS for P0-3, P1-1, P1-4, P1-5, P2-2, P2-4, P3-3, P3-1 |
| `PATCH-02-mobile-js-fixes.js` | Load via `<script defer src="https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/webflow/qa/PATCH-02-mobile-js-fixes.js"></script>` after the existing scripts in `03-BODY-JS.html` — fixes P0-1, P0-2, P1-2, P1-3, P3-1, P3-2 |
| `PATCH-03-html-mobile-fixes.md` | Manual body HTML edits (P2-1 already applied to `04-BODY-HTML.html` in this commit) |
| `PATCH-04-hreflang-and-bingbot.html` | Webflow Page Settings → Custom code → Inside `<head>` tag — fixes P1-A, P1-D, P2-D |
| `sitemap.www.cognifit.com.xml` | Replaces repo `/sitemap.xml`. Canonical host now matches the live page. Submit in Google Search Console + Bing Webmaster |

## Recommended publish order

1. Merge PR #15 to `main` so jsDelivr serves the new JS.
2. Paste `PATCH-01-head-mobile-fixes.html` into Webflow head custom code.
3. Paste `PATCH-04-hreflang-and-bingbot.html` into Webflow head custom code (same block).
4. Add `<script defer src=".../PATCH-02-mobile-js-fixes.js"></script>` to Before `</body>` custom code.
5. Paste `webflow/seo/00-combined-jsonld.json` into Schema markup → JSON-LD.
6. Paste `webflow/seo/05-reviewer-block.html` and `webflow/seo/06-scientific-evidence-block.html` into Embed components.
7. Publish.
8. Overwrite the live sitemap with `sitemap.www.cognifit.com.xml` contents (at `https://www.cognifit.com/sitemap.xml`).
9. Submit sitemap in Google Search Console + Bing Webmaster.
10. Run the manual on-device checks listed at the end of `MOBILE-QA-REPORT.md`.

## Work this audit could not do from the sandbox

- Fetch https://cognifit-df2ae7.webflow.io/longevity (blocked: `host_not_allowed`)
- Fetch https://www.cognifit.com/longevity (same)
- Run PageSpeed Insights (googleapis.com blocked)
- Run Rich Results Test (search.google.com blocked)
- Ping Bing sitemap (bing.com blocked)
- Access the user's local `webflow.zip` (not in this filesystem)
- Call Webflow MCP tools (server not connected in this session)

These are listed as user-owned follow-ups in each report.
