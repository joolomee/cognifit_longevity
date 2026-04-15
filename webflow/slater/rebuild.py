#!/usr/bin/env python3
"""
Regenerates the 4 Slater bundle files from the repo source of truth
(index.html, styles.css, main.js, i18n.js).

Run from repo root:
    python3 webflow/slater/rebuild.py

Then copy-paste each produced file into the corresponding Slater file.
"""
import json, re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT  = os.path.join(ROOT, 'webflow', 'slater')

def read(p):
    with open(os.path.join(ROOT, p)) as f:
        return f.read()

def write(name, content):
    path = os.path.join(OUT, name)
    with open(path, 'w') as f:
        f.write(content)
    print(f"  {name}: {len(content)/1024:.1f} KB")

print(f"Rebuilding Slater bundle in {OUT}")

# 01 — CSS verbatim
css = read('styles.css')
write('01-styles.css', css)

# 02 — body HTML injector
html = read('index.html')
m = re.search(r'<body[^>]*>([\s\S]*?)</body>', html)
body_inner = m.group(1) if m else ''

loader = r"""/* COGNIFIT LONGEVITY — Slater bundle 02: body injector */
(function(){
  var BODY_HTML = __BODY_HTML__;
  var ROOT_ID = 'cognifit-longevity-root';
  function boot(){
    var root = document.getElementById(ROOT_ID);
    if (!root){
      root = document.createElement('div');
      root.id = ROOT_ID;
      document.body.appendChild(root);
    }
    root.innerHTML = BODY_HTML;
    root.querySelectorAll('script').forEach(function(old){
      var s = document.createElement('script');
      for (var i=0; i<old.attributes.length; i++){
        s.setAttribute(old.attributes[i].name, old.attributes[i].value);
      }
      if (old.src) s.src = old.src;
      else s.text = old.textContent;
      old.parentNode.replaceChild(s, old);
    });
    document.documentElement.classList.add('js-ready');
    document.dispatchEvent(new Event('cognifit:body-ready'));
    console.log('[cognifit-slater] body injected ('+BODY_HTML.length+' chars)');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
""".replace('__BODY_HTML__', json.dumps(body_inner))
write('02-content.js', loader)

# 03 — i18n verbatim
write('03-i18n.js', read('i18n.js'))

# 04 — main.js wrapped
mainjs = read('main.js')
wrapper = r"""/* COGNIFIT LONGEVITY — Slater bundle 04: main.js (UI logic) */
(function(){
  var started = false;
  function run(){
    if (started) return;
    started = true;
    try {
__MAIN__
    } catch(e){ console.error('[cognifit-slater] main.js error', e); }
  }
  document.addEventListener('cognifit:body-ready', run);
  setTimeout(function(){ if (!started && document.getElementById('nav')) run(); }, 3000);
})();
""".replace('__MAIN__', mainjs)
write('04-main.js', wrapper)

print("\nDone. Copy each file into its Slater counterpart and publish.")
