# Bing Webmaster verification

The current Webflow Site Settings → Custom code → Head **does not** contain
a `msvalidate.01` meta. Until Bing is verified, IndexNow submissions will
return `403` and Bing won't index `/longevity` proactively.

## Get the code (one-time, ~2 min)

1. Go to https://www.bing.com/webmasters
2. Sign in with a Microsoft account
3. Click **Add a site** → enter `https://www.cognifit.com`
4. Choose verification method: **HTML Meta Tag**
5. Copy the 16-char value from the snippet:
   ```
   <meta name="msvalidate.01" content="XXXXXXXXXXXXXXXX" />
   ```

## Inject into Webflow

**Site Settings → Custom code → Inside `<head>` tag** (not the page-level
field — site-wide so it applies to every page):

```html
<meta name="msvalidate.01" content="REPLACE_WITH_16_CHAR_CODE">
```

Save → Publish → click **Verify** in Bing Webmaster.

## Once verified

- Submit sitemap: Sitemaps → Submit URL
  → `https://www.cognifit.com/sitemap.xml`
- Re-run the IndexNow test in `07-indexnow/README.md` — should now return
  `200` or `202` instead of `403`.

## Send me the code

When you have the 16-char string, paste it here in chat and I will commit
the meta tag into the appropriate file (or once Webflow MCP is connected
I will inject it directly via `data_scripts_tool`).
