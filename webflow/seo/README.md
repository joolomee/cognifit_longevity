# SEO deliverables for `/longevity` (Webflow)

Canonical URL (production): **`https://www.cognifit.com/longevity`**
Webflow staging: `https://cognifit-df2ae7.webflow.io/longevity`
Reviewer of record: **Prof. Jon Andoni Duñabeitia, PhD** — CSO, CogniFit (verbatim from `stanford.edu/~ashford/bhp.html`)

All payloads use **only** verified data from the Reference Data block. No
invented authors, studies, DOIs, or rating numbers.

---

## File map

| File | Purpose | Where it goes in Webflow |
| --- | --- | --- |
| `00-combined-jsonld.json` | All 4 schemas in one `@graph` | Page Settings → Schema markup → JSON-LD |
| `01-medicalwebpage.json` | MedicalWebPage + reviewedBy | Alternative if you prefer 4 separate scripts via Embed components |
| `02-faqpage.json` | FAQPage with verbatim Q&A from the live page | (same) |
| `03-breadcrumblist.json` | Breadcrumb chain | (same) |
| `04-product-rating.json` | Product + AggregateRating (4.8 / 6,249,358) | (same) |
| `05-reviewer-block.html` | "Scientifically reviewed by" credibility block | Drop into an Embed component immediately AFTER the hero section |
| `06-scientific-evidence-block.html` | Three peer-reviewed citations | Drop into an Embed component immediately BEFORE the FAQ section |
| `07-indexnow/` | IndexNow key file + setup notes | See its own README |
| `08-meta-page-settings.md` | Title / description / OG / canonical values | Page Settings → SEO + Open Graph |
| `09-bing-verification.md` | msvalidate.01 instructions + verification steps | Site Settings → Custom code → Head |
| `10-pagespeed-and-pings.md` | PageSpeed run, fix recipes, sitemap pings | One-off after publish |

---

## Step-by-step (manual until Webflow MCP is connected)

1. **Page Settings → SEO** — paste values from `08-meta-page-settings.md`.
2. **Page Settings → Open Graph** — same values, mirror to OG / Twitter.
3. **Page Settings → Schema markup → JSON-LD** — paste contents of
   `00-combined-jsonld.json`.
4. **Add Embed component AFTER hero** — paste `05-reviewer-block.html`.
5. **Add Embed component BEFORE FAQ section** — paste `06-scientific-evidence-block.html`.
6. **Site Settings → Custom code → Head** — append the `<meta name="msvalidate.01">`
   tag (see `09-bing-verification.md` once you have the code from Bing Webmaster).
7. **Publish** the site.
8. **Run** the verifications listed in `10-pagespeed-and-pings.md`.

---

## Hard rules respected

- ✅ No invented authors / studies / DOIs / metrics
- ✅ FAQ schema text is verbatim from `04-BODY-HTML.html`
- ✅ Cited papers are verbatim from the Reference Data block
- ✅ Canonical pinned to `www.cognifit.com/longevity` (confirmed by user as
  the published target of this Webflow site)
- ✅ AggregateRating only included because rating is publicly displayed in
  the hero (`.rating-n` = 4.8, `.rating-number` = 6,249,358)
- ❌ No "#1 ranking" language anywhere
