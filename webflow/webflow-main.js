/* CogniFit Longevity — webflow-main.js clean v2026-04-24-FINAL */
/* Only essential runtime fixes. No fabricated content. */

(function(){
  'use strict';
  /* Kill Webflow badge persistently */
  function killBadge(){
    document.querySelectorAll('.w-webflow-badge, a[href*="webflow.com"][href*="utm"]').forEach(function(e){ e.remove(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', killBadge);
  else killBadge();
  setInterval(killBadge, 2000);

  /* Force hero H1 translation */
  function forceH1(){
    try {
      var h1 = document.querySelector('.hero-h1, h1.hero-h1');
      if (!h1) return;
      var lang = (window.CogniFitI18n && window.CogniFitI18n.getLang) ? window.CogniFitI18n.getLang() : 'pt';
      if (!window.T || !window.T[lang]) return;
      var l1 = window.T[lang]['hero.h1.line1'];
      var l2 = window.T[lang]['hero.h1.line2'];
      var l3 = window.T[lang]['hero.h1.line3'];
      if (!l1 || !l2 || !l3) return;
      var curr = h1.textContent;
      if (/sistema de longevidade cognitiva|cognitive longevity system/i.test(curr) || curr.indexOf(l1) === -1){
        h1.innerHTML = '<span data-i18n="hero.h1.line1">' + l1 + '</span><br><span data-i18n="hero.h1.line2">' + l2 + '</span><br><span class="hero-shimmer-soft" data-i18n="hero.h1.line3">' + l3 + '</span>';
      }
    } catch(e){}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', forceH1);
  else forceH1();
  setTimeout(forceH1, 500);
  setTimeout(forceH1, 1500);

  /* Hide broken dashboard image */
  function hideBroken(){
    document.querySelectorAll('img[alt*="dashboard preview" i], img[alt*="dashboard" i]').forEach(function(img){
      img.addEventListener('error', function(){ img.style.display = 'none'; }, { once:true });
      if (!img.src || img.complete && img.naturalWidth === 0) img.style.display = 'none';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hideBroken);
  else hideBroken();

  /* Counter animation for stats */
  function animateCounters(){
    var targets = document.querySelectorAll('.trust-stat-num, .stats-row strong, [class*="stat-num"], .hero-rating .rating-n, .hero-rating .rating-number, .pm-num');
    if (!('IntersectionObserver' in window)){
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting || e.target.dataset.counted) return;
        var el = e.target;
        el.dataset.counted = '1';
        var origText = el.textContent.trim();
        var match = origText.match(/[\d.,]+/);
        if (!match) return;
        var endVal = parseFloat(match[0].replace(/,/g,''));
        if (isNaN(endVal)) return;
        var duration = 1500;
        var start = performance.now();
        function tick(now){
          var p = Math.min((now-start)/duration, 1);
          var eased = 1-Math.pow(1-p,3);
          var cur = endVal * eased;
          el.textContent = origText.replace(/[\d.,]+/, 
            endVal > 1000 ? Math.round(cur).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') :
            endVal < 10 ? cur.toFixed(1) : Math.round(cur)
          );
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = origText;
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold:.4 });
    targets.forEach(function(el){ io.observe(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', animateCounters);
  else animateCounters();

  /* Skill bars preserve inline widths */
  function fixSkills(){
    document.querySelectorAll('.sk-fill[style*="width"]').forEach(function(el){
      var m = el.getAttribute('style').match(/width\s*:\s*([\d.]+%)/);
      if (m) setTimeout(function(){ el.style.width = m[1]; }, 150);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fixSkills);
  else fixSkills();
  setTimeout(fixSkills, 1000);
})();
