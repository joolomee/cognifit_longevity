# SEO Deployment — Manual Steps for Maximum Ranking

This document lists the **only** SEO actions that can't be automated in
code and require you to do them in third-party UIs. Everything else
(meta tags, schema, sitemap, robots, IndexNow client + GitHub Action,
hreflang, GEO meta) is already in place.

Do these once, in order. Each one takes 2–5 minutes.

---

## 1. Upload IndexNow keyfile to Wix (CRITICAL — 2 min)

The IndexNow protocol pings Bing/Yandex/Seznam/Naver/Yep with new URLs
within ~minutes. It needs a verification keyfile hosted at the site root.

**What to do:**
1. Open Wix → your site → **Settings** → **File Manager** (or "Upload Site Files")
2. Upload the file `31e17b6fe618041ce972cdeab51467e8.txt` from this repo
3. The file MUST be accessible at:
   `https://brain.cognifit.com/31e17b6fe618041ce972cdeab51467e8.txt`
4. Verify it works by opening that URL in a browser. You should see a
   single line: `31e17b6fe618041ce972cdeab51467e8`

If Wix doesn't let you upload arbitrary text files at the root, the
fallback is to host them on Vercel (already deployed there) — the keyfile
is already at `cognifit-longevity.vercel.app/31e17b6fe618041ce972cdeab51467e8.txt`.

---

## 2. Submit to Google Search Console (CRITICAL — 5 min)

The page is currently **not in Google's index**. This is the #1 reason
it doesn't rank. Submitting via Search Console forces Google to crawl
and index it within 24–48h.

**What to do:**
1. Go to https://search.google.com/search-console
2. Add property: `https://brain.cognifit.com` (Domain property is best;
   URL prefix property also works)
3. Verify ownership using the existing meta tag — the site already has:
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

**What to do:**
1. Go to https://www.bing.com/webmasters
2. Add site: `https://brain.cognifit.com`
3. Verify ownership (Bing supports importing directly from Google
   Search Console — one click)
4. Sidebar → **Sitemaps** → Submit:
   `https://brain.cognifit.com/longevity/sitemap.xml`
5. Sidebar → **IndexNow** → confirm the keyfile is detected at
   `https://brain.cognifit.com/31e17b6fe618041ce972cdeab51467e8.txt`
   (this enables auto-IndexNow without daily pings, although the GitHub
   Action will keep firing them anyway)
6. Sidebar → **URL Submission** → submit
   `https://brain.cognifit.com/longevity` manually (free quota: 10k/day)

---

## 4. Yandex Webmaster (optional but recommended — 3 min)

**What to do:**
1. Go to https://webmaster.yandex.com
2. Add site: `https://brain.cognifit.com`
3. Verify ownership (HTML meta tag method)
4. Submit sitemap: `https://brain.cognifit.com/longevity/sitemap.xml`

---

## 5. Backlinks from cognifit.com (HIGH IMPACT — 10 min)

The biggest single ranking factor for `brain.cognifit.com/longevity`
is backlinks from `cognifit.com` (the main brand domain has high DA).

**What to do:**
Add an internal link from these pages on cognifit.com to
`brain.cognifit.com/longevity`:

1. **Homepage** (`https://www.cognifit.com/`) — add a hero CTA or
   secondary nav link "Brain Longevity Test"
2. **Brain training page** (`https://www.cognifit.com/brain-training`)
   — link from "Related" or "Test Your Brain Longevity" sidebar
3. **Cognitive assessment page** (`https://www.cognifit.com/assessments`)
   — link "Take the free Brain Longevity Test"
4. **Active aging page** (`https://www.cognifit.com/brain-training-active-aging`)
   — link "Measure your Brain Longevity Score"
5. **Blog footer** (`https://blog.cognifit.com/`) — link in every post
   footer "Test your Brain Longevity"

Anchor text matters: use "Brain Longevity Test", "Brain Longevity
Training", "Free Brain Longevity Assessment" — NOT "click here".

---

## 6. PR / Outreach (highest impact, longest to do)

The fastest way to rank #1 for a competitive head term like "brain
longevity test" is to be cited by a top-DA publication. Pitch the
following outlets:

| Outlet | DA | Pitch angle |
|---|---|---|
| Mindbodygreen | 91 | "We're the only platform with 1,083+ clinical trials" |
| Yahoo Health | 95 | "Free Brain Longevity Test launches with 6.2M users worldwide" |
| HuffPost | 93 | Same |
| Healthline | 92 | "How CogniFit's Brain Longevity Test works" — explainer |
| Wired | 94 | "Inside CogniFit's 25-year cognitive science database" |
| TechCrunch | 94 | "CogniFit launches Brain Longevity System" — product launch |
| Nature.com | 96 | Submit a peer-reviewed methods paper |
| The Verge | 92 | Product review angle |

Each backlink from a DA 90+ outlet typically moves a brand-new page
from "page 5" to "page 1" within 4–6 weeks.

---

## 7. Verify everything is working (after steps 1–4)

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
- `brain longevity test` → should be on page 1 (within 4–8 weeks)

---

## What's already automated (no action needed)

- ✅ `<meta name="robots" content="index, follow, ...">` + per-bot allow
- ✅ `robots.txt` open to all major crawlers + AI/LLM agents
- ✅ `sitemap.xml` with hreflang for 22 languages, daily changefreq
- ✅ 14-entity Schema.org @graph (Org, WebSite, MedicalWebPage,
  WebApplication, SoftwareApplication × 2, Product, MedicalTest,
  MedicalCondition, Service, BreadcrumbList, HowTo, FAQPage)
- ✅ IndexNow client-side ping on every page load (throttled 6h)
- ✅ GitHub Action pings IndexNow + Google + Bing sitemap endpoints
  daily at 06:00 UTC and on every push
- ✅ `llms.txt` for AI crawlers
- ✅ hreflang link tags for all 22 languages + x-default
- ✅ Open Graph + Twitter card with OG image
- ✅ X-Robots-Tag header at the Vercel layer
- ✅ Geo / international targeting meta tags
- ✅ Canonical URL set to `brain.cognifit.com/longevity`
- ✅ wix-head-injection.html with all the above (for Wix parent page)
