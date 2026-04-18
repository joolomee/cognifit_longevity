# PageSpeed Insights + Sitemap pings

## 1. Run PageSpeed Insights (Mobile)

```bash
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.cognifit.com/longevity&strategy=mobile&category=PERFORMANCE" \
  | jq '.lighthouseResult.audits | {
      LCP: ."largest-contentful-paint".displayValue,
      CLS: ."cumulative-layout-shift".displayValue,
      INP: ."interaction-to-next-paint".displayValue,
      TBT: ."total-blocking-time".displayValue,
      TTFB: ."server-response-time".displayValue
    }'
```

## Thresholds (Core Web Vitals)

| Metric | Good | Needs improvement | Poor |
| --- | --- | --- | --- |
| LCP | ≤ 2.5s | 2.5s – 4.0s | > 4.0s |
| CLS | ≤ 0.1 | 0.1 – 0.25 | > 0.25 |
| INP | ≤ 200ms | 200ms – 500ms | > 500ms |
| TBT | ≤ 200ms | 200ms – 600ms | > 600ms |

## Fix recipes

### LCP > 2.5s
- Identify LCP element from PSI report (usually the hero H1 background or hero image)
- Add to **Site Settings → Custom code → Head**:
  ```html
  <link rel="preload" as="image" fetchpriority="high"
        href="https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/4524727-middle.png">
  ```
- Verify all hero images have explicit `width` and `height` attributes
- Confirm fonts are `font-display: swap` (already in `02-STYLES.css`)

### CLS > 0.1
- Audit hero, stats-row, and any dynamically injected blocks (visual-inject.js)
- Reserve space with explicit dimensions on `<img>` and `min-height` on
  `.hero-phones`, `.skills-panel`, `.stats-row`
- Already done in `06-HERO-FIX.html` (min-height: 560px on .hero-phones)

### INP > 200ms
- Move counter animation off the main thread via `requestIdleCallback`
- Already deferred in `webflow/counters.js` — verify all `<script>` tags
  use `defer` (confirmed in latest `03-BODY-JS.html`)

## 2. Sitemap pings (after publish)

```bash
# Bing (still works)
curl -s "https://www.bing.com/ping?sitemap=https://www.cognifit.com/sitemap.xml"

# Google deprecated /ping in 2023 — use Search Console manually instead:
# https://search.google.com/search-console → URL inspection → Request indexing
```

## 3. Rich Results Test

Programmatic API is restricted. Run manually:

- https://search.google.com/test/rich-results?url=https%3A%2F%2Fwww.cognifit.com%2Flongevity
- Expected detections: **MedicalWebPage**, **FAQPage**, **BreadcrumbList**, **Product (with AggregateRating)**
- Bing equivalent: https://www.bing.com/webmasters/markupvalidator
