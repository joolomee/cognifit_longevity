# IndexNow Setup

**Generated key**: `o49gp0kbnyigzgwaefocy2a47ncni9rq` (32 lowercase alphanumeric)

## 1. Host the key file

Webflow Starter does not allow arbitrary files at root. Two options:

### Option A — Hosted via this repo (jsDelivr)

The file `o49gp0kbnyigzgwaefocy2a47ncni9rq.txt` is committed in this folder.
Once merged to `main`, it is served at:

```
https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/webflow/seo/07-indexnow/o49gp0kbnyigzgwaefocy2a47ncni9rq.txt
```

Use that as `keyLocation` in the IndexNow payload below. IndexNow accepts
keyLocation on a different host as long as the host is publicly reachable
and serves the exact key string.

### Option B — Webflow hidden page

In Webflow:

1. Pages → New page → Slug: `o49gp0kbnyigzgwaefocy2a47ncni9rq.txt`
2. Page Settings → SEO → Disable indexing (`<meta name="robots" content="noindex">`)
3. Body: paste the raw key string `o49gp0kbnyigzgwaefocy2a47ncni9rq` with no
   wrapping HTML (use an Embed component containing only the key)
4. Publish

Verify with:

```
curl -i https://www.cognifit.com/o49gp0kbnyigzgwaefocy2a47ncni9rq.txt
```

Response must return `200 OK`, `Content-Type: text/plain`, body equal to the key.

## 2. Submit URLs on publish

IndexNow API endpoint:

```
POST https://api.indexnow.org/indexnow
Content-Type: application/json
```

Body:

```json
{
  "host": "www.cognifit.com",
  "key": "o49gp0kbnyigzgwaefocy2a47ncni9rq",
  "keyLocation": "https://www.cognifit.com/o49gp0kbnyigzgwaefocy2a47ncni9rq.txt",
  "urlList": ["https://www.cognifit.com/longevity"]
}
```

(Replace `keyLocation` with the jsDelivr URL if you go with Option A.)

## 3. Wire the webhook

When the Webflow MCP becomes available, register a `site_publish` webhook
with:

```
data_webhook_tool action=register
  siteId=<COGNIFIT_SITE_ID>
  triggerType=site_publish
  url=https://api.indexnow.org/indexnow
  payload=<the JSON body above>
```

Until then, you can ping IndexNow manually after each publish:

```bash
curl -X POST https://api.indexnow.org/indexnow \
  -H 'Content-Type: application/json' \
  -d '{
    "host":"www.cognifit.com",
    "key":"o49gp0kbnyigzgwaefocy2a47ncni9rq",
    "keyLocation":"https://www.cognifit.com/o49gp0kbnyigzgwaefocy2a47ncni9rq.txt",
    "urlList":["https://www.cognifit.com/longevity"]
  }'
```

A `200` or `202` response means Bing/Yandex have queued the URLs for
recrawl. `403` = key file mismatch. `422` = invalid URL list.
