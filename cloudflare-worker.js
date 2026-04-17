/**
 * cognifit.com/longevity* → Vercel origin, cloaked as Webflow.
 *
 * DEPLOY (5 min):
 *   1. dash.cloudflare.com → selecionar zona cognifit.com
 *   2. Workers & Pages → Create application → Create Worker
 *   3. Nome: cognifit-longevity-proxy → Deploy
 *   4. Edit code → apagar placeholder → colar ESTE ficheiro inteiro → Save and deploy
 *   5. Voltar à zona cognifit.com → Workers Routes → Add route
 *        Route:  cognifit.com/longevity*
 *        Worker: cognifit-longevity-proxy
 *   6. Pronto. Abrir cognifit.com/longevity em aba anónima.
 *
 * NETWORK TAB: server: Webflow, x-powered-by: Webflow. Zero menções a Vercel.
 */

const ORIGIN = 'https://brain.cognifit.com';
const PROXY_PREFIX = '/longevity';

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
  'x-robots-tag',
];

const REWRITEABLE = /^(text\/html|application\/xml|text\/xml|application\/json|application\/ld\+json|text\/plain|text\/css|application\/javascript|text\/javascript)/i;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith(PROXY_PREFIX)) {
      return fetch(request);
    }

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

    // Spoof as Webflow
    cleanedHeaders.set('server', 'Webflow');
    cleanedHeaders.set('x-powered-by', 'Webflow');

    const loc = cleanedHeaders.get('location');
    if (loc) cleanedHeaders.set('location', rewriteUrl(loc));

    const ct = originRes.headers.get('content-type') || '';
    let body = originRes.body;

    if (REWRITEABLE.test(ct)) {
      const text = await originRes.text();
      body = rewriteBody(text, ct);
      cleanedHeaders.delete('content-length');
      cleanedHeaders.delete('content-encoding');
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

function rewriteBody(text, contentType) {
  let out = text
    .replaceAll('https://brain.cognifit.com', 'https://cognifit.com/longevity')
    .replaceAll('http://brain.cognifit.com', 'https://cognifit.com/longevity')
    .replaceAll('//brain.cognifit.com', '//cognifit.com/longevity')
    .replaceAll('brain.cognifit.com', 'cognifit.com/longevity')
    .replaceAll(/https?:\/\/[a-z0-9-]+\.vercel\.app/gi, 'https://cognifit.com')
    .replaceAll('vitals.vercel-insights.com', 'cognifit.com/_m')
    .replaceAll('_vercel', '_wf');

  if (/text\/html/i.test(contentType)) {
    // Spoof generator meta + canonical to cognifit.com/longevity
    if (!/<meta[^>]+name=["']generator["']/i.test(out)) {
      out = out.replace(
        /<head(\s[^>]*)?>/i,
        (m) => `${m}\n<meta name="generator" content="Webflow">`
      );
    } else {
      out = out.replace(
        /<meta[^>]+name=["']generator["'][^>]*>/i,
        '<meta name="generator" content="Webflow">'
      );
    }
    if (!/<link[^>]+rel=["']canonical["']/i.test(out)) {
      out = out.replace(
        /<head(\s[^>]*)?>/i,
        (m) => `${m}\n<link rel="canonical" href="https://cognifit.com/longevity">`
      );
    }
  }

  return out;
}
