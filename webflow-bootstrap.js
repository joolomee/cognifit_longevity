/**
 * CogniFit Longevity — Webflow Bootstrap
 * ────────────────────────────────────────────────────────────────
 * Single-file injector. Paste in Webflow Footer Code:
 *   <script src="https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@<commit>/webflow-bootstrap.js"></script>
 *
 * What it does:
 *   1. Hides Webflow Designer markup
 *   2. Fetches canonical index.html from the same commit
 *   3. Injects body + head metadata + JSON-LD + hreflang into the live document
 *   4. Loads styles.css, responsive-fix.css, i18n.js, main.js from CDN
 *   5. Re-executes inline scripts so animations + i18n work
 *   6. Rewrites image URLs to absolute jsDelivr paths
 *
 * Result: 100% identical render to the canonical Vercel deploy,
 *         without any Vercel dependency. SEO, AEO, GEO native.
 * ────────────────────────────────────────────────────────────────
 */
(function () {
  'use strict';

  // Resolve own URL → derive BASE for sibling assets
  var ownScript = document.currentScript ||
                  document.querySelector('script[src*="webflow-bootstrap"]');
  if (!ownScript) {
    console.error('[cf-bootstrap] Cannot resolve own URL — paste as <script src="..."> not module/defer.');
    return;
  }
  var BASE = ownScript.src.substring(0, ownScript.src.lastIndexOf('/') + 1);

  // ─── Inject CSS shell (hide Webflow + loader) ────────────────────
  var shellCSS = [
    'body > *:not(#cf-mount):not(#cf-loading):not(script):not(style):not(noscript):not(link){display:none!important}',
    'html,body{margin:0!important;padding:0!important;background:#000!important}',
    '#cf-mount{display:block;min-height:100vh}',
    '#cf-loading{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:#000;transition:opacity 320ms ease}',
    '#cf-loading.cf-done{opacity:0;pointer-events:none}',
    '#cf-loading::before{content:"";width:36px;height:36px;border:2px solid rgba(255,255,255,.10);border-top-color:#1A73E8;border-radius:50%;animation:cfspin 800ms linear infinite}',
    '@keyframes cfspin{to{transform:rotate(360deg)}}'
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.id = 'cf-shell-css';
  styleEl.textContent = shellCSS;
  document.head.appendChild(styleEl);

  // Preconnects
  ['https://cdn.jsdelivr.net', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(function (h) {
    var l = document.createElement('link');
    l.rel = 'preconnect';
    l.href = h;
    if (h.indexOf('gstatic') > -1 || h.indexOf('jsdelivr') > -1) l.crossOrigin = 'anonymous';
    document.head.appendChild(l);
  });

  // ─── Mount + loader nodes ───────────────────────────────────────
  function ensureMounts() {
    if (!document.getElementById('cf-loading')) {
      var loader = document.createElement('div');
      loader.id = 'cf-loading';
      document.body.appendChild(loader);
    }
    if (!document.getElementById('cf-mount')) {
      var mount = document.createElement('div');
      mount.id = 'cf-mount';
      document.body.appendChild(mount);
    }
  }

  // ─── URL helpers ────────────────────────────────────────────────
  function abs(url) {
    if (!url) return url;
    if (/^(https?:|\/\/|data:|mailto:|tel:|#)/.test(url)) return url;
    return BASE + url.replace(/^\.?\//, '');
  }

  function rewriteSrcset(srcset) {
    return srcset.split(',').map(function (part) {
      var pieces = part.trim().split(/\s+/);
      return abs(pieces[0]) + (pieces[1] ? ' ' + pieces[1] : '');
    }).join(', ');
  }

  // ─── Main inject ────────────────────────────────────────────────
  function inject() {
    ensureMounts();

    fetch(BASE + 'index.html', { mode: 'cors' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');

        // 1) HEAD: stylesheets
        doc.head.querySelectorAll('link[rel="stylesheet"]').forEach(function (el) {
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          var h = el.getAttribute('href');
          link.href = h.indexOf('fonts.googleapis.com') > -1 ? h : abs(h);
          document.head.appendChild(link);
        });

        // 2) HEAD: preload (fonts)
        doc.head.querySelectorAll('link[rel="preload"]').forEach(function (el) {
          var link = el.cloneNode(true);
          var h = link.getAttribute('href');
          if (h && h.indexOf('fonts.g') === -1) link.href = abs(h);
          document.head.appendChild(link);
        });

        // 3) HEAD: SEO — replace Webflow's defaults with canonical
        document
          .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang], meta[property^="og:"], meta[name^="twitter:"]')
          .forEach(function (x) { x.remove(); });

        doc.head
          .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang], meta[property^="og:"], meta[name^="twitter:"]')
          .forEach(function (el) { document.head.appendChild(el.cloneNode(true)); });

        // 4) HEAD: JSON-LD schema (critical for AEO/GEO)
        doc.head.querySelectorAll('script[type="application/ld+json"]').forEach(function (el) {
          var s = document.createElement('script');
          s.type = 'application/ld+json';
          s.textContent = el.textContent;
          document.head.appendChild(s);
        });

        // 5) Title + meta
        var t = doc.querySelector('title');
        if (t) document.title = t.textContent;

        ['description', 'keywords', 'robots', 'author', 'theme-color'].forEach(function (name) {
          var src = doc.querySelector('meta[name="' + name + '"]');
          if (!src) return;
          var m = document.querySelector('meta[name="' + name + '"]');
          if (!m) {
            m = document.createElement('meta');
            m.name = name;
            document.head.appendChild(m);
          }
          m.setAttribute('content', src.getAttribute('content'));
        });

        // 6) <html lang>
        var hlang = doc.documentElement.getAttribute('lang');
        if (hlang) document.documentElement.setAttribute('lang', hlang);

        // 7) BODY: rewrite asset URLs
        doc.body.querySelectorAll('img[src]').forEach(function (img) {
          img.setAttribute('src', abs(img.getAttribute('src')));
        });
        doc.body.querySelectorAll('img[srcset], source[srcset]').forEach(function (el) {
          el.setAttribute('srcset', rewriteSrcset(el.getAttribute('srcset')));
        });
        doc.body.querySelectorAll('a[href]').forEach(function (a) {
          var h = a.getAttribute('href');
          // Keep anchors and external links as-is; rewrite relative non-anchor
          if (h && !/^(https?:|\/\/|mailto:|tel:|#|\/)/.test(h)) {
            a.setAttribute('href', abs(h));
          }
        });

        // 8) Inject body content
        var mount = document.getElementById('cf-mount');
        mount.innerHTML = doc.body.innerHTML;

        // 9) Re-execute scripts (innerHTML doesn't run them)
        mount.querySelectorAll('script').forEach(function (oldScript) {
          var newScript = document.createElement('script');
          [].slice.call(oldScript.attributes).forEach(function (a) {
            newScript.setAttribute(a.name, a.name === 'src' ? abs(a.value) : a.value);
          });
          newScript.textContent = oldScript.textContent;
          oldScript.replaceWith(newScript);
        });

        // 10) Load external scripts referenced in canonical <head>
        doc.head.querySelectorAll('script[src]').forEach(function (el) {
          var s = document.createElement('script');
          s.src = abs(el.getAttribute('src'));
          if (el.defer) s.defer = true;
          if (el.async) s.async = true;
          document.head.appendChild(s);
        });

        // 11) Reset overflow + hide loader
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';

        setTimeout(function () {
          var l = document.getElementById('cf-loading');
          if (l) {
            l.classList.add('cf-done');
            setTimeout(function () { l.remove(); }, 400);
          }
        }, 600);

        // 12) Manually fire DOMContentLoaded for late scripts that listen for it
        try {
          document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true, cancelable: false }));
        } catch (e) {}
      })
      .catch(function (e) {
        console.error('[cf-bootstrap] Inject error:', e);
        var mount = document.getElementById('cf-mount');
        if (mount) {
          mount.innerHTML =
            '<div style="padding:48px;color:#fff;background:#0b0d10;min-height:100vh;font-family:system-ui;max-width:560px;margin:0 auto">' +
            '<h1 style="color:#ef4444;margin:0 0 12px">Erro a carregar conteúdo</h1>' +
            '<p style="color:#9ca3af;line-height:1.6">' + (e && e.message || e) + '</p>' +
            '<p style="color:#9ca3af;line-height:1.6;margin-top:24px;font-size:14px">' +
            'Verifica:<br>· Repo joolomee/cognifit_longevity está público<br>' +
            '· URL deste script aponta para um commit válido<br>· Liga à internet</p></div>';
        }
        var l = document.getElementById('cf-loading');
        if (l) l.remove();
      });
  }

  // ─── Boot ───────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
