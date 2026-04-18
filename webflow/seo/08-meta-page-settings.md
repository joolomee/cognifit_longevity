# Page Settings → SEO + Open Graph

Paste these values verbatim. Character counts verified.

## SEO tab

| Field | Value | Length |
| --- | --- | --- |
| **Title** | `Brain Longevity Test & Training — CogniFit` | 43 chars (under 60) |
| **Description** | `Measure your brain age, train 20+ cognitive skills. Scientifically validated across 1,083+ clinical trials. Used by 6.2M people. Free assessment.` | 144 chars (under 160) |
| **Indexing** | ✅ Allow Google to index this page (NO noindex) |

## Open Graph tab

| Field | Value |
| --- | --- |
| **Title** | `Brain Longevity Test & Training — CogniFit` |
| **Description** | `Measure your brain age, train 20+ cognitive skills. Scientifically validated across 1,083+ clinical trials. Used by 6.2M people. Free assessment.` |
| **Image** | `https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/og-image.png` (1200x630) |

Twitter card auto-derives from OG. If a Twitter override field exists in Webflow, mirror the same values.

## Canonical

Webflow sets canonical automatically to the published URL. Confirmed target
domain: `https://www.cognifit.com/longevity`. **Do not** override unless you
add a Site Settings → Custom code → Head `<link rel="canonical">` — leaving
it on Webflow's auto-generated value is correct.

## Verification after publish

```bash
curl -sI https://www.cognifit.com/longevity | grep -i 'x-robots\|content-type'
curl -s  https://www.cognifit.com/longevity | grep -E '<title|description|canonical|og:title|og:description'
```

Expected: `<title>Brain Longevity Test & Training — CogniFit</title>`,
description matches, og:title/description match, canonical points to
`https://www.cognifit.com/longevity`.
