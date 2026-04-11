# SEO Deployment — Manual Steps for Maximum Ranking

> **Scope constraint:** You only have permission to edit the
> `brain.cognifit.com/longevity` page. You cannot edit
> `brain.cognifit.com/` (Wix homepage), `cognifit.com/*`, or any other
> CogniFit-owned page. This guide reflects that constraint —
> everything below either runs entirely from this repo or only touches
> the `/longevity` page.

This document lists the **only** SEO actions that can't be automated in
code and require you to do them in third-party UIs. Everything else
(meta tags, schema, sitemap, robots, IndexNow client + GitHub Action,
hreflang, GEO meta, deep on-page content, E-E-A-T schema) is already
in place and only touches the /longevity page.

Do these once, in order. Each one takes 2–5 minutes.

---

## 1. Upload IndexNow keyfile to Wix /longevity (CRITICAL — 2 min)

The IndexNow protocol pings Bing/Yandex/Seznam/Naver/Yep with new URLs
within ~minutes. It needs a verification keyfile hosted **at the same
host as the URL being submitted**.

Because you can only edit /longevity, the keyfile must live at one of:
- `https://brain.cognifit.com/longevity/31e17b6fe618041ce972cdeab51467e8.txt` ← preferred
- `https://brain.cognifit.com/31e17b6fe618041ce972cdeab51467e8.txt` (if you can convince an admin to upload to root)

**What to do (option A — within /longevity):**
1. Open Wix → /longevity page → **Settings** → **SEO** → **Add file**
   (or whatever Wix calls "upload static asset for this page")
2. Upload `31e17b6fe618041ce972cdeab51467e8.txt` from this repo
3. Verify in browser:
   `https://brain.cognifit.com/longevity/31e17b6fe618041ce972cdeab51467e8.txt`
   should return one line: `31e17b6fe618041ce972cdeab51467e8`
4. The Vercel `vercel.json` already proxies `/longevity/31e17b...txt`
   to the root keyfile, so if `/longevity/*` is served by Vercel
   (and not Wix) it works automatically — no upload needed.

**What to do (option B — fallback if option A fails):**
- Use the Bing Webmaster IndexNow integration (step 3 below). Bing
  reads the keyfile from `cognifit-longevity.vercel.app` directly,
  which works without Wix upload.

---

## 2. Submit to Google Search Console (CRITICAL — 5 min)

The page is currently **not in Google's index**. This is the #1 reason
it doesn't rank. Submitting via Search Console forces Google to crawl
and index it within 24–48h.

**What to do:**
1. Go to https://search.google.com/search-console
2. Add property: `https://brain.cognifit.com/longevity` (URL prefix
   property — Domain property requires DNS access you don't have)
3. Verify ownership using the existing meta tag — the /longevity page
   already has:
   `<meta name="google-site-verification" content="r3SvSjiFHNxKMgdXo3bLDFuMMCbEPSaYoP1n_SAcius">`
4. Once verified, in the left sidebar:
   - **URL Inspection** → paste `https://brain.cognifit.com/longevity` →
     click "Request Indexing"
   - **Sitemaps** → submit:
     - `https://brain.cognifit.com/longevity/sitemap.xml`
     - `https://cognifit-longevity.vercel.app/sitemap.xml`
5. Repeat the URL Inspection for the most important language variants:
   - `https://brain.cognifit.com/longevity?lang=es`
   - `https://brain.cognifit.com/longevity?lang=pt`
   - `https://brain.cognifit.com/longevity?lang=fr`
   - `https://brain.cognifit.com/longevity?lang=de`

---

## 3. Submit to Bing Webmaster Tools (3 min)

Bing has the most generous URL submission quota (10k/day free) and
auto-detects IndexNow keyfiles.

**What to do:**
1. Go to https://www.bing.com/webmasters
2. Add site: `https://brain.cognifit.com/longevity` (URL prefix)
3. Verify ownership (Bing supports importing directly from Google
   Search Console — one click — or use the meta tag method)
4. Sidebar → **Sitemaps** → Submit:
   `https://brain.cognifit.com/longevity/sitemap.xml`
5. Sidebar → **IndexNow** → Bing will check both
   `https://brain.cognifit.com/longevity/31e17b6fe618041ce972cdeab51467e8.txt`
   AND `https://cognifit-longevity.vercel.app/31e17b6fe618041ce972cdeab51467e8.txt`
   — at least one should validate.
6. Sidebar → **URL Submission** → submit
   `https://brain.cognifit.com/longevity` manually (free quota: 10k/day)

---

## 4. Yandex Webmaster (optional but recommended — 3 min)

**What to do:**
1. Go to https://webmaster.yandex.com
2. Add site: `https://brain.cognifit.com/longevity`
3. Verify ownership (HTML meta tag method — same tag works)
4. Submit sitemap: `https://brain.cognifit.com/longevity/sitemap.xml`

---

## 5. ⚠️ Constraints you cannot work around without permission

These are the SEO actions that would help most BUT require permission
you don't have. Listed for transparency:

| Action | Why you can't do it | Workaround |
|---|---|---|
| Add backlink from cognifit.com homepage to /longevity | No edit access to cognifit.com main site | Ask a CogniFit admin to do it (it's a 1-line HTML edit). This is the #1 ranking lever. |
| Add banner on brain.cognifit.com/ Wix homepage | No edit access to Wix homepage page | Same as above |
| Add link from blog.cognifit.com posts | No edit access | Same |
| PR / outreach to Mindbodygreen, Yahoo Health, etc. | Requires email outreach + relationships | Hand off to whoever manages CogniFit PR |

If you can get **even one** internal link from `cognifit.com` to
`brain.cognifit.com/longevity`, the page will move from "page 5+" to
"page 1" within 2–4 weeks for branded queries. This is the single
biggest ranking lever and bypasses every other constraint.

---

## 6. Verify everything is working (after steps 1–4)

Run this from any machine with network access:

```bash
bash scripts/seo-ping.sh
```

Or manually trigger the GitHub Action:
1. Go to https://github.com/joolomee/cognifit_longevity/actions
2. Click "SEO Ping (IndexNow + Sitemap)"
3. Click "Run workflow" → main → "Run workflow"
4. Watch the logs — every step should return HTTP 200/202

After 24–48 hours, search Google for:
- `site:brain.cognifit.com/longevity` → should return the page
- `"brain longevity test" cognifit` → should be in top 5
- `brain longevity test` → top 10 within 4–8 weeks (top #3 needs
  external backlinks, see section 5)

---

## What's already automated within /longevity (no action needed)

- ✅ `<meta name="robots" content="index, follow, ...">` + per-bot allow
- ✅ `robots.txt` open to all major crawlers + AI/LLM agents
- ✅ `sitemap.xml` with hreflang for 22 languages, daily changefreq
- ✅ 15+ entity Schema.org @graph (Organization, WebSite,
  MedicalWebPage, WebApplication, SoftwareApplication × 2, Product,
  MedicalTest with ICD-10 codes, MedicalCondition, Service,
  BreadcrumbList, HowTo, FAQPage × 2 (EN+PT), Person:medicalReviewer)
- ✅ 16-question FAQ schema across 4 languages (EN/PT/ES/FR) including
  direct competitor capture (MoCA/SAGE/Mini-Cog comparison)
- ✅ IndexNow client-side ping on every page load (throttled 6h)
- ✅ GitHub Action pings IndexNow + Google + Bing sitemap endpoints
  daily at 06:00 UTC and on every push
- ✅ `llms.txt` for AI crawlers
- ✅ hreflang link tags for all 22 languages + x-default
- ✅ Open Graph + Twitter card with OG image
- ✅ X-Robots-Tag header at the Vercel layer
- ✅ Geo / international targeting meta tags
- ✅ Canonical URL set to `brain.cognifit.com/longevity`
- ✅ Deep semantic content (H2/H3 hierarchy) targeting long-tail
  keywords
- ✅ E-E-A-T author + medical reviewer schema
- ✅ Vercel rewrites so the IndexNow keyfile + sitemap + robots are
  reachable at both root and /longevity/ paths
