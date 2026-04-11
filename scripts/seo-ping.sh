#!/usr/bin/env bash
# SEO ping script — submits the brain longevity URLs to all major search
# engines and AI crawlers via IndexNow + classic sitemap pings.
#
# Usage:
#   bash scripts/seo-ping.sh
#
# Requires: curl. No auth, no API keys (uses IndexNow keyfile).
# Run this from any machine with network access (your laptop, a server,
# or just trigger the GitHub Action which does the same thing daily).

set -e

KEY="31e17b6fe618041ce972cdeab51467e8"
KEY_URL="https://brain.cognifit.com/${KEY}.txt"
HOST="brain.cognifit.com"

URLS='[
  "https://brain.cognifit.com/longevity",
  "https://brain.cognifit.com/longevity?lang=en",
  "https://brain.cognifit.com/longevity?lang=es",
  "https://brain.cognifit.com/longevity?lang=fr",
  "https://brain.cognifit.com/longevity?lang=de",
  "https://brain.cognifit.com/longevity?lang=it",
  "https://brain.cognifit.com/longevity?lang=pt",
  "https://brain.cognifit.com/longevity?lang=nl",
  "https://brain.cognifit.com/longevity?lang=pl",
  "https://brain.cognifit.com/longevity?lang=ru",
  "https://brain.cognifit.com/longevity?lang=ar",
  "https://brain.cognifit.com/longevity?lang=he",
  "https://brain.cognifit.com/longevity?lang=zh",
  "https://brain.cognifit.com/longevity?lang=zh-HK",
  "https://brain.cognifit.com/longevity?lang=ja",
  "https://brain.cognifit.com/longevity?lang=ko",
  "https://brain.cognifit.com/longevity?lang=tr",
  "https://brain.cognifit.com/longevity?lang=id",
  "https://brain.cognifit.com/longevity?lang=bn",
  "https://brain.cognifit.com/longevity?lang=mn",
  "https://brain.cognifit.com/longevity?lang=ur",
  "https://brain.cognifit.com/longevity?lang=sr",
  "https://brain.cognifit.com/longevity?lang=el"
]'

PAYLOAD=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_URL}",
  "urlList": ${URLS}
}
EOF
)

echo "==> Submitting to IndexNow API (api.indexnow.org)..."
curl -sS -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}" -w "\nHTTP %{http_code}\n" || true

echo "==> Submitting to Bing IndexNow endpoint..."
curl -sS -X POST "https://www.bing.com/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}" -w "\nHTTP %{http_code}\n" || true

echo "==> Submitting to Yandex IndexNow endpoint..."
curl -sS -X POST "https://yandex.com/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "${PAYLOAD}" -w "\nHTTP %{http_code}\n" || true

echo "==> Pinging Google sitemap submission..."
curl -sS "https://www.google.com/ping?sitemap=https://brain.cognifit.com/longevity/sitemap.xml" \
  -w "\nHTTP %{http_code}\n" || true

echo "==> Pinging Bing sitemap submission..."
curl -sS "https://www.bing.com/ping?sitemap=https://brain.cognifit.com/longevity/sitemap.xml" \
  -w "\nHTTP %{http_code}\n" || true

echo ""
echo "==> Done. Check the HTTP status above:"
echo "    200/202 = success"
echo "    400     = invalid request (check JSON)"
echo "    403     = key file not accessible at ${KEY_URL}"
echo "             → upload ${KEY}.txt to the Wix root for brain.cognifit.com"
echo "    422     = URL not on host"
