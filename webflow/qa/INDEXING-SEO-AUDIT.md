# Indexing / SEO / Robots Audit — www.cognifit.com/longevity

**Audited:** 2026-04-18
**Canonical target (user-confirmed):** `https://www.cognifit.com/longevity`
**Competing URL seen in repo:** `https://brain.cognifit.com/longevity` (in `sitemap.xml`, in legacy `schema.jsonld`)
**Webflow staging:** `https://cognifit-df2ae7.webflow.io/longevity`

Meticulous pass focused on Google + Bing discoverability, crawl budget,
indexation, duplicate content risk, meta tags, `hreflang`, `robots.txt`,
`sitemap.xml`, local/GEO signals, and E-E-A-T. Every finding cross-checked
in source before inclusion. Cannot fetch live URLs from this sandbox
(network allowlist) — validate the live state on-device after publish.

Severity: **P0 index-blocking** · **P1 index-suppressing** · **P2 polish**
· **P3 monitor-only**.

---

## Quick scorecard

| Area | Status | Severity |
| --- | --- | --- |
| `<meta name="robots">` | `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1` ✓ | — |
| `<meta name="googlebot">` | `index, follow` ✓ | — |
| `<meta name="bingbot">` | **MISSING** | P2 |
| Canonical URL in head | `https://www.cognifit.com/longevity` ✓ (matches user target) | — |
| Canonical URL in sitemap.xml | `https://brain.cognifit.com/longevity` ✗ | **P0** |
| Canonical URL in schema.jsonld (root) | `https://brain.cognifit.com/longevity` ✗ | **P0** |
| robots.txt (repo) | `Disallow: /` — applies to Vercel mirror, OK | — |
| robots.txt on `www.cognifit.com` (Webflow) | **unverified — must confirm** | P1 |
| Sitemap submitted to Google Search Console | unknown | **P1** |
| Sitemap submitted to Bing Webmaster Tools | unknown (no `msvalidate.01` yet) | **P1** |
| hreflang set | 23 languages in sitemap.xml, **NONE in head** | P1 |
| IndexNow key | generated (`o49gp0kbnyigzgwaefocy2a47ncni9rq`) | P2 – file host needed |
| Title length | 43 chars (≤60 ✓) | — |
| Meta description length | 144 chars (≤160 ✓) | — |
| `meta keywords` present | yes — Google ignores, Bing mildly uses it, leave it | — |
| Open Graph complete | title / description / url / image / image:width / image:height ✓ | — |
| Twitter Card | `summary_large_image` ✓ | — |
| Schema JSON-LD | ready in `webflow/seo/00-combined-jsonld.json` | must paste |
| E-E-A-T block | ready in `webflow/seo/05-reviewer-block.html` | must paste |
| GEO targeting | no `geo.*` tags or Business schema with `address` | **P2** |
| Mobile-friendly | verified (see `MOBILE-QA-REPORT.md`) | — |

---

## P0 — Index-blocking / duplicate-content risk

### P0-A · Sitemap still advertises the wrong host

**Symptom.** `/sitemap.xml` at repo root lists 23 `<loc>` entries, every one
of them under `https://brain.cognifit.com/longevity`. None match the
user-confirmed canonical `https://www.cognifit.com/longevity`.

**Consequence.** Google and Bing will happily crawl and **index the wrong
URL**. Your canonical tag says `www.cognifit.com/longevity` but the
sitemap pushes `brain.cognifit.com/longevity`. At best you split link
equity; at worst Google picks `brain.*` as canonical against your wishes.

**Where.** `/sitemap.xml` (repo root)

**Fix.** Rewrite the sitemap to use `www.cognifit.com/longevity`
everywhere. If the `brain.*` page still exists as a real page, **decide
one of**:

1. Redirect `brain.cognifit.com/longevity` → `www.cognifit.com/longevity`
   with HTTP 301 (preferred).
2. Add `<link rel="canonical" href="https://www.cognifit.com/longevity">`
   on the `brain.*` page (second-best).
3. Remove the `brain.*` page from its own sitemap.

A corrected sitemap file is committed at
`webflow/qa/sitemap.www.cognifit.com.xml`. After editing, submit the new
sitemap to:

- Google Search Console → Sitemaps → `https://www.cognifit.com/sitemap.xml`
- Bing Webmaster Tools → Sitemaps → `https://www.cognifit.com/sitemap.xml`

### P0-B · Legacy `schema.jsonld` file at repo root still uses `brain.cognifit.com`

**Symptom.** `/schema.jsonld` has `@id`, `url`, and `isPartOf` references to
`brain.cognifit.com/longevity`. If any build pipeline still injects this
into the Webflow head (it shouldn't — we use the per-page JSON-LD in
`webflow/seo/`), Google will see a mismatched `WebPage.url` and your
canonical.

**Where.** `/schema.jsonld` (repo root, legacy)

**Fix.** Either delete the legacy file (we already have
`webflow/seo/00-combined-jsonld.json` as the source of truth) or rewrite
its URLs to match the canonical. Recommended: **delete** to prevent
confusion.

---

## P1 — Index-suppressing or losing ranking signal

### P1-A · No `hreflang` tags in the live head code

**Symptom.** `sitemap.xml` lists 23 language variants with `hreflang`
alternates, but the **live page head** has **no** `<link rel="alternate"
hreflang="...">` tags. Google treats hreflang as a hint, not a directive
— if both the sitemap and the head carry them, the signal is strongest.
With only the sitemap signal and no language-specific URLs actually
rendered (the page ships all languages as a single document with `?lang=`
query params), Google will likely **not serve the correct localised
version in non-English markets**.

**Where.** `webflow/01-HEAD-CODE.html` — no `alternate hreflang` tags
(the previous version had them pointing at webflow staging, removed).

**Fix (two steps).**

1. Decide the URL pattern for languages:
   - **Query param** (`?lang=es`): easier, what the repo uses now, but
     Google may treat variants as duplicates of the English page.
   - **Subfolder** (`/es/longevity`): best for SEO. Requires Webflow
     pages per language.

2. If you stay with query params, add these to the Webflow Page Settings
   → Custom code → Head (patch committed at
   `webflow/qa/PATCH-04-hreflang.html`).

### P1-B · robots.txt on the live production host not yet verified

**Symptom.** The repo-level `/robots.txt` is **Vercel-specific**
(`Disallow: /`). We don't know what `www.cognifit.com/robots.txt` returns
after Webflow publish. If the CogniFit main site has a global
`Disallow: /longevity` or a stale `noindex` somewhere, the page won't
be indexed at all.

**Fix.**

```bash
curl -sI https://www.cognifit.com/robots.txt | head -3
curl -s  https://www.cognifit.com/robots.txt
curl -sI https://www.cognifit.com/longevity | grep -i 'x-robots-tag'
```

Expected: robots.txt reachable (200), no `Disallow: /longevity`, no
`X-Robots-Tag: noindex` response header on `/longevity`.

If Webflow generates a default `robots.txt`, add in Webflow Site Settings
→ SEO → robots.txt:

```
User-agent: *
Allow: /
Sitemap: https://www.cognifit.com/sitemap.xml
```

### P1-C · Sitemap not yet submitted to Google or Bing

**Symptom.** Without a submission, crawlers discover the page only via
inbound links or organic crawl (slow). First indexation typically
takes 1–6 weeks.

**Fix.**

1. Google Search Console → Add Property `https://www.cognifit.com`
   → Verify ownership (DNS TXT or HTML meta) → **Sitemaps → submit
   `https://www.cognifit.com/sitemap.xml`**.
2. Bing Webmaster Tools → Add `https://www.cognifit.com`
   → Verify via `msvalidate.01` meta (see `webflow/seo/09-bing-verification.md`)
   → **Sitemaps → submit `https://www.cognifit.com/sitemap.xml`**.
3. After each content update on `/longevity`, use **URL Inspection →
   Request indexing** in both consoles to push a priority recrawl.

### P1-D · No Bing-specific `bingbot` meta

**Symptom.** Google gets its own `<meta name="googlebot">`. Bing has
`<meta name="bingbot">` which lets you set Bing-specific directives
(e.g., different snippet length, freshness hints).

**Where.** `webflow/01-HEAD-CODE.html`

**Fix.** Add next to the existing googlebot tag:

```html
<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large">
```

---

## P2 — Polish and hardening

### P2-A · No GEO / locality signals

**Symptom.** Your Organization schema has no `address`. The page has no
`<meta name="geo.region">`, no `ICBM`, no LocalBusiness / MedicalBusiness
with `address`. For a global product this is fine, but if you want
presence in Google Business Profile for a specific country/city (Spain /
Israel / US HQ), you'd add these.

**Fix (optional, only if you actually operate from a physical address
that should rank locally).** Add to the Organization entity in the
combined JSON-LD:

```json
"address": {
  "@type": "PostalAddress",
  "addressCountry": "ES",
  "addressLocality": "Madrid"
}
```

Also consider adding `<meta name="geo.region" content="ES">` and
`<meta name="geo.placename" content="Madrid">` in the head. Don't invent
an address — use your real registered one.

### P2-B · Meta keywords: low signal but harmless

**Symptom.** `<meta name="keywords">` is ignored by Google since ~2009.
Bing gives it tiny weight (mostly as a spam signal: too many → penalty).

**Current.** 10 keywords, comma-separated, all on-topic ✓. Leave as-is.

### P2-C · Meta description uses the "&" character — confirm not HTML-escaped

**Symptom.** Your meta description and title both contain `&` as literal
ampersands. Most search engines render these correctly, but some social
scrapers expect `&amp;` in the HTML source. Modern practice is to use
`&amp;` in the HTML, which the browser decodes to `&` when displayed.

**Where.** `webflow/01-HEAD-CODE.html:19, 26` (og:title / twitter:title
both contain literal `&`).

**Fix.** Replace `Brain Longevity Test & Training — CogniFit` with
`Brain Longevity Test &amp; Training — CogniFit` in:
- `og:title`
- `twitter:title`
- (Webflow auto-generates the `<title>` tag from Page Settings → SEO →
  Title; Webflow handles escaping there, so you can leave the raw `&`.)

### P2-D · `og:locale` is `en_US` only

**Symptom.** If you're serving multiple languages, each language variant
should ideally set its own `og:locale` and add `og:locale:alternate` for
the others. With a single-page multilingual site using query params, the
simplest option is:

```html
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="es_ES">
<meta property="og:locale:alternate" content="pt_PT">
<meta property="og:locale:alternate" content="fr_FR">
<meta property="og:locale:alternate" content="de_DE">
<meta property="og:locale:alternate" content="it_IT">
```

Committed in the hreflang patch file.

---

## P3 — Monitor-only

### P3-A · Preconnect to DNS-heavy third parties

Current head preconnects: fonts.googleapis.com, fonts.gstatic.com,
cdn.jsdelivr.net. ✓ Good. No changes.

### P3-B · Reading-progress bar uses `:lang()` in CSS?

Not relevant — the page ships all languages statically through i18n.js.
No concern.

### P3-C · Structured data for Breadcrumb shows two levels (Home → Brain Longevity)

Good minimum, fine to expand to three levels later if you add a
`Programs` hub page between Home and `/longevity`.

---

## Implementation plan (ranked by impact)

1. **Now** — delete repo-level `/schema.jsonld` or rewrite URLs (P0-B).
2. **Now** — apply `webflow/qa/sitemap.www.cognifit.com.xml` in place of
   `/sitemap.xml` so crawlers stop following `brain.*` URLs (P0-A).
3. **Before publish** — paste `webflow/qa/PATCH-04-hreflang.html` into
   Webflow head custom code (P1-A, P2-D).
4. **Before publish** — add `bingbot` meta (P1-D), in the same head
   custom code block.
5. **After publish** — submit sitemap + request indexing in Google
   Search Console and Bing Webmaster Tools (P1-B, P1-C).
6. **Optional** — decide on local/GEO schema if you want to rank for a
   specific country (P2-A).
7. **Monitor** — check Search Console "Coverage" and "Experience" reports
   weekly for the first month after publish.

---

## What this audit did NOT check

These require network access or live credentials that this sandbox lacks.
You (or a CI job) must run them yourself:

- `curl https://www.cognifit.com/robots.txt` — verify no blanket disallow
- `curl -sI https://www.cognifit.com/longevity` — check `x-robots-tag` header
- Google Search Console → Coverage → Indexed pages
- Bing Webmaster Tools → Site Explorer → Crawl status
- Rich Results Test → all 4 schemas recognized
- Mobile-Friendly Test → passes
- PageSpeed Insights → Core Web Vitals (commands in
  `webflow/seo/10-pagespeed-and-pings.md`)
- Semrush / Ahrefs / Moz → external backlink audit
