/**
 * Reverse proxy: cognifit.com/longevity/* → Vercel deployment
 * Strips every header/body trace that reveals the Vercel origin, so
 * DevTools Network tab shows only "server: cognifit" under cognifit.com.
 *
 * Deployment: bind this Worker to the route
 *   cognifit.com/longevity*
 * in the Cloudflare dashboard (Workers & Pages → Routes).
 */

const ORIGIN = 'https://brain.cognifit.com';
const PROXY_PREFIX = '/longevity';

// Response headers removed before the browser ever sees them.
const STRIP_RESPONSE_HEADERS = [
  'server',
  'via',
  'x-powered-by',
  'x-vercel-id',
  'x-vercel-cache',
  'x-vercel-execution-region',
  'x-vercel-proxy-region',
  'x-vercel-proxy-signature',
  'x-vercel-proxy-signature-ts',
  'x-matched-path',
  'x-nextjs-cache',
  'x-nextjs-prerender',
  'x-nextjs-matched-path',
  'x-nextjs-redirect',
  // Vercel origin sends noindex; the public proxy URL must be indexable.
  'x-robots-tag',
];

// Content types whose bodies we rewrite to strip "brain.cognifit.com" references.
const REWRITEABLE = /^(text\/html|application\/xml|text\/xml|application\/json|text\/plain|text\/css|application\/javascript|application\/ld\+json)/i;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Route guard: only handle the proxied subtree.
    if (!url.pathname.startsWith(PROXY_PREFIX)) {
      return fetch(request);
    }

    // Map cognifit.com/longevity/<rest> → brain.cognifit.com/<rest>
    const subpath = url.pathname.slice(PROXY_PREFIX.length) || '/';
    const originUrl = new URL(subpath + url.search, ORIGIN);

    const originReq = new Request(originUrl, {
      method: request.method,
      headers: forwardHeaders(request.headers),
      body: request.method === 'GET' || request.method === 'HEAD' ? null : request.body,
      redirect: 'manual',
    });

    const originRes = await fetch(originReq, {
      cf: { cacheTtl: 300, cacheEverything: true },
    });

    const cleanedHeaders = new Headers(originRes.headers);
    for (const h of STRIP_RESPONSE_HEADERS) cleanedHeaders.delete(h);
    cleanedHeaders.set('server', 'cognifit');

    // Rewrite Location on redirects so users never get bounced to Vercel.
    const loc = cleanedHeaders.get('location');
    if (loc) cleanedHeaders.set('location', rewriteUrl(loc));

    const ct = originRes.headers.get('content-type') || '';
    let body = originRes.body;

    if (REWRITEABLE.test(ct)) {
      const text = await originRes.text();
      body = rewriteBody(text);
      cleanedHeaders.delete('content-length');
    }

    return new Response(body, {
      status: originRes.status,
      statusText: originRes.statusText,
      headers: cleanedHeaders,
    });
  },
};

function forwardHeaders(headers) {
  const h = new Headers(headers);
  // Strip CF-added headers that would expose the proxy hop.
  h.delete('cf-connecting-ip');
  h.delete('cf-ipcountry');
  h.delete('cf-ray');
  h.delete('cf-visitor');
  h.delete('cf-worker');
  h.delete('x-forwarded-for');
  h.delete('x-forwarded-proto');
  h.delete('x-real-ip');
  h.set('host', 'brain.cognifit.com');
  return h;
}

function rewriteUrl(s) {
  return s
    .replaceAll('https://brain.cognifit.com', 'https://cognifit.com/longevity')
    .replaceAll('http://brain.cognifit.com', 'https://cognifit.com/longevity')
    .replaceAll('//brain.cognifit.com', '//cognifit.com/longevity');
}

function rewriteBody(text) {
  return text
    .replaceAll('https://brain.cognifit.com', 'https://cognifit.com/longevity')
    .replaceAll('http://brain.cognifit.com', 'https://cognifit.com/longevity')
    .replaceAll('//brain.cognifit.com', '//cognifit.com/longevity')
    .replaceAll('brain.cognifit.com', 'cognifit.com/longevity')
    // Kill any accidental vercel.app or vercel-insights references.
    .replaceAll(/https?:\/\/[a-z0-9-]+\.vercel\.app/gi, 'https://cognifit.com')
    .replaceAll('vitals.vercel-insights.com', 'cognifit.com/_ci');
}
