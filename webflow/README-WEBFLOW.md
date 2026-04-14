# CogniFit Longevity — Webflow Integration Guide

## Files in this folder

| File | Where to paste in Webflow | Size |
|------|--------------------------|------|
| `01-HEAD-CODE.html` | Page Settings > Custom Code > **Head Code** | Meta tags, SEO, Schema.org, fonts |
| `02-STYLES.css` | Page Settings > Custom Code > **Head Code** (wrap in `<style>...</style>`) | All CSS |
| `03-BODY-JS.html` | Page Settings > Custom Code > **Before </body> tag** | All JavaScript |
| `04-BODY-HTML.html` | Page body via **Embed** components | All HTML sections |

## Step-by-step Instructions

### 1. Head Code (SEO + CSS)

1. Open Webflow Designer
2. Go to **Page Settings** (gear icon) > **Custom Code** > **Head Code**
3. Paste the ENTIRE content of `01-HEAD-CODE.html`
4. Below that, add: `<style>` then paste the ENTIRE content of `02-STYLES.css` then `</style>`

### 2. Body HTML

1. In the Webflow Designer canvas, add an **Embed** component (+ > Components > Embed)
2. Paste the ENTIRE content of `04-BODY-HTML.html`
3. Alternative: Split into multiple Embed components per section for easier management

### 3. Body Scripts

1. Go to **Page Settings** > **Custom Code** > **Before </body> tag**
2. Paste the ENTIRE content of `03-BODY-JS.html`

### 4. Page Settings in Webflow

Set these in Webflow's Page Settings (NOT in custom code):

- **SEO Title:** `Brain Longevity Program, Live Longer, Think Better | CogniFit`
- **Meta Description:** `Cognitive training for healthy aging, backed by 1,083+ clinical trials. Assess 20+ brain skills, prevent cognitive decline, and stay independent. Used by 6M+ people. 4.8★ rated. Free assessment.`
- **Canonical URL:** `https://brain.cognifit.com/longevity`
- **Open Graph Image:** Upload the OG image to Webflow Assets

### 5. Publish

1. Click **Publish** in Webflow
2. Test the published site for scroll, animations, and responsiveness
3. Verify SEO with Google Rich Results Test: https://search.google.com/test/rich-results

## Important Notes

- The i18n.js (translations) is loaded from Vercel CDN — this handles all 22 languages
- Images (logos, device mockups) are referenced as relative paths or base64
- The neural canvas animation respects `prefers-reduced-motion`
- All CSS iframe/Wix overrides have been removed — this is for native Webflow only
