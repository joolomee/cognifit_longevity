#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════
# CogniFit Longevity — Webflow publish helper
#
# Run locally (NOT from Claude Code sandbox — api.webflow.com is blocked
# there). Requires a Webflow Data API token with scopes:
#   sites:read, sites:write, custom_code:read, custom_code:write
#
# Usage:
#   1. Put your token in .webflow-token at the repo root (gitignored):
#        echo "YOUR_TOKEN_HERE" > .webflow-token
#        chmod 600 .webflow-token
#   2. Purge jsDelivr cache so Webflow fetches the freshly pushed CSS/JS:
#        ./scripts/publish-webflow.sh --purge
#   3. Publish the Webflow site:
#        ./scripts/publish-webflow.sh --publish
#   4. Or do both:
#        ./scripts/publish-webflow.sh --purge --publish
# ═══════════════════════════════════════════════════════════════════════

set -euo pipefail

SITE_ID="68187102be717016f4f0f17b"       # CogniFit Webflow site
REPO="joolomee/cognifit_longevity"
BRANCH="main"

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TOKEN_FILE="${REPO_ROOT}/.webflow-token"

purge_jsdelivr() {
  echo "› Purging jsDelivr cache for ${REPO}@${BRANCH} ..."
  for f in \
    "webflow/02-STYLES.css" \
    "webflow/webflow-main.js" \
    "webflow/04-BODY-HTML.html" \
    "webflow/03-BODY-JS.html" \
    "webflow/01-HEAD-CODE.html" \
    "i18n.js"
  do
    curl -fsS "https://purge.jsdelivr.net/gh/${REPO}@${BRANCH}/${f}" \
      -o /dev/null && echo "  ✓ ${f}"
  done
  echo "› jsDelivr purge done."
}

publish_webflow() {
  [[ ! -f "$TOKEN_FILE" ]] && { echo "✗ Missing $TOKEN_FILE" >&2; exit 1; }
  local token
  token="$(tr -d '\n\r \t' < "$TOKEN_FILE")"
  echo "› Publishing Webflow site ${SITE_ID} ..."
  local http
  http=$(curl -sS -o /tmp/wf-publish.json -w '%{http_code}' \
    -X POST "https://api.webflow.com/v2/sites/${SITE_ID}/publish" \
    -H "Authorization: Bearer ${token}" \
    -H "accept-version: 2.0.0" \
    -H "Content-Type: application/json" \
    -d '{"customDomains": [], "publishToWebflowSubdomain": true}')
  echo "  HTTP ${http}"
  cat /tmp/wf-publish.json; echo
  [[ "$http" =~ ^20 ]] || { echo "✗ Publish failed" >&2; exit 1; }
  echo "› Published. Visit https://cognifit-df2ae7.webflow.io (hard-reload to bust browser cache)."
}

main() {
  local do_purge=0 do_publish=0
  for a in "$@"; do
    case "$a" in
      --purge)   do_purge=1 ;;
      --publish) do_publish=1 ;;
      -h|--help) grep -E '^# ' "$0" | sed 's/^# //'; exit 0 ;;
    esac
  done
  [[ $do_purge -eq 0 && $do_publish -eq 0 ]] && { do_purge=1; do_publish=1; }
  [[ $do_purge   -eq 1 ]] && purge_jsdelivr
  [[ $do_publish -eq 1 ]] && publish_webflow
}

main "$@"
