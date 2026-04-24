/* CogniFit — webflow-main.js ultra-light v2026-04-24-100 */
(function(){"use strict";
var idle = window.requestIdleCallback || function(f){ return setTimeout(f, 200); };

/* Essential: webflow badge remover via single MutationObserver */
function kb(){ document.querySelectorAll('.w-webflow-badge, a[href*="webflow.com"][href*="utm_campaign=brandjs"]').forEach(function(e){e.remove();}); }
if (window.MutationObserver){ new MutationObserver(kb).observe(document.documentElement, {childList:true, subtree:true}); }

/* Essential: hero H1 i18n repair (once DOM ready) */
function h1(){
 try{
  var e = document.querySelector('.hero-h1');
  if (!e || !window.T) return;
  var l = (window.CogniFitI18n && window.CogniFitI18n.getLang) ? window.CogniFitI18n.getLang() : 'pt';
  var d = window.T[l] || window.T.en; if (!d) return;
  var a=d['hero.h1.line1'], b=d['hero.h1.line2'], c=d['hero.h1.line3'];
  if (!a||!b||!c) return;
  var t = e.textContent;
  if (/sistema de longevidade cognitiva|cognitive longevity system/i.test(t) || t.indexOf(a) < 0){
   e.innerHTML = '<span data-i18n="hero.h1.line1">'+a+'</span><br><span data-i18n="hero.h1.line2">'+b+'</span><br><span class="hero-shimmer-soft" data-i18n="hero.h1.line3">'+c+'</span>';
  }
 }catch(x){}
}

/* Essential: skills inline width preserve */
function sk(){ document.querySelectorAll('.sk-fill[style*="width"]').forEach(function(e){var m=(e.getAttribute('style')||'').match(/width\s*:\s*([\d.]+%)/); if(m) e.style.width=m[1];}); }

/* Lazy: counter animation (idle) */
function ct(){
 if (!window.IntersectionObserver) return;
 var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
   if (!e.isIntersecting || e.target.dataset.c) return;
   var el = e.target; el.dataset.c=1;
   var o = el.textContent.trim(); var m = o.match(/[\d.,]+/); if (!m) return;
   var v = parseFloat(m[0].replace(/,/g,'')); if (isNaN(v)) return;
   var s; function t(n){ if(!s)s=n; var p=Math.min((n-s)/1200,1); var f=v*(1-Math.pow(1-p,3));
    el.textContent = o.replace(/[\d.,]+/, v>1000?Math.round(f).toString().replace(/\B(?=(\d{3})+(?!\d))/g,','):v<10?f.toFixed(1):Math.round(f));
    if (p<1) requestAnimationFrame(t); else el.textContent=o; }
   requestAnimationFrame(t); io.unobserve(el);
  });
 }, {threshold:.4});
 document.querySelectorAll('.trust-stat-num,.stats-row strong,[class*="stat-num"],.hero-rating .rating-n,.hero-rating .rating-number,.pm-num').forEach(function(e){io.observe(e);});
}

/* Lazy: hide broken imgs */
function bi(){ document.querySelectorAll('img[alt*="dashboard preview" i]').forEach(function(i){ i.addEventListener('error',function(){i.style.display='none';},{once:true}); if(i.complete&&i.naturalWidth===0)i.style.display='none'; }); }

/* Schedule */
function boot(){ kb(); h1(); sk(); bi(); idle(ct); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
setTimeout(h1, 600); setTimeout(h1, 1600);
})();

/* Inject LCP preload hint early (runs before DOM ready) */
(function(){
  try {
    var head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;

    /* Preload hero H1 font weight 900 (LCP element font) */
    if (!document.querySelector('link[rel="preload"][as="font"][href*="Plus+Jakarta"]')) {
      var f = document.createElement('link');
      f.rel = 'preload';
      f.as = 'font';
      f.type = 'font/woff2';
      f.crossOrigin = 'anonymous';
      f.href = 'https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU79.woff2';
      head.appendChild(f);
    }
  } catch(e){}
})();
