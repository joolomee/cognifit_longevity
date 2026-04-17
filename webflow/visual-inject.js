(function(){"use strict";

/* ═══════════════════════════════════════════════════════════════════════
   1. Hero content injection (injectHero)
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
  function injectHero(){
    var hc = document.querySelector('.hero-content, .hero .wrap, .hero > div, section.hero');
    if (!hc) return;

    /* Find or create the hero text column */
    var textCol = hc.querySelector('.hero-headline, .hero-h1, h1');
    var parentCol = textCol ? textCol.parentElement : hc;

    /* 1. Hero badge */
    if (!document.querySelector('.hero-badge')) {
      var badge = document.createElement('div');
      badge.className = 'hero-badge r';
      badge.innerHTML = '<div class="badge-dot"></div><span data-i18n="hero.badge">Cognitive Longevity System</span>';
      parentCol.insertBefore(badge, parentCol.firstChild);
    }

    /* 2. Hero H1 (if missing or empty) */
    var h1 = document.querySelector('.hero-h1');
    if (!h1 || !h1.textContent.trim()) {
      if (!h1) {
        var hl = document.createElement('div');
        hl.className = 'hero-headline r d1';
        hl.innerHTML = '<div class="hero-bracket"></div><h1 class="hero-h1 hero-plain"><span data-i18n="hero.h1.line1">Live Longer.</span><br><span data-i18n="hero.h1.line2">Think Better.</span><br><span class="hero-shimmer-soft" data-i18n="hero.h1.line3">Stay Independent.</span></h1>';
        var badgeEl = document.querySelector('.hero-badge');
        if (badgeEl && badgeEl.nextSibling) parentCol.insertBefore(hl, badgeEl.nextSibling);
        else parentCol.appendChild(hl);
      }
    }

    /* 3. Hero subtitle */
    if (!document.querySelector('.hero-sub')) {
      var sub = document.createElement('p');
      sub.className = 'hero-sub r d2';
      sub.setAttribute('data-i18n', 'hero.sub');
      sub.setAttribute('data-i18n-html', '');
      sub.innerHTML = 'Aging is inevitable. <strong>Cognitive decline doesn\'t have to be.</strong> Protect the core mental abilities that determine how independently you live as you age.';
      parentCol.appendChild(sub);
    }

    /* 4. Read-time row */
    if (!document.querySelector('.hero-read-time')) {
      var rt = document.createElement('div');
      rt.className = 'hero-read-time r d2';
      rt.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;vertical-align:middle;margin-right:6px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span data-i18n="hero.readtime">4 min read · Based on 1,083+ clinical studies</span>';
      parentCol.appendChild(rt);
    }

    /* 5. CTA button */
    if (!document.querySelector('.hero-content .btn-primary, .hero .btn-primary')) {
      var cta = document.createElement('div');
      cta.className = 'r d2';
      cta.innerHTML = '<a href="https://www.cognifit.com/assessments" target="_blank" rel="noopener noreferrer" class="btn-primary" data-i18n="hero.cta">Protect Your Brain</a>';
      parentCol.appendChild(cta);
    }

    /* 6. Rating row */
    if (!document.querySelector('.hero-rating')) {
      var rating = document.createElement('div');
      rating.className = 'hero-rating r d3';
      rating.innerHTML = '<div class="rating-row1"><div class="rating-left"><span class="rating-n">4.8</span><span class="stars">\u2605\u2605\u2605\u2605\u2605</span></div><div class="rating-right"><span class="rating-number">6,249,358</span><span class="rating-users" data-i18n="hero.users">Users Worldwide</span></div></div>';
      parentCol.appendChild(rating);
    }

    /* 7. Guarantee badges */
    if (!document.querySelector('.guarantee-row')) {
      var guar = document.createElement('div');
      guar.className = 'guarantee-row r d3';
      guar.innerHTML = '<div class="g-badge" data-i18n="hero.guarantee1">100% Satisfaction Guaranteed</div><div class="g-badge" data-i18n="hero.guarantee2">30 Day Money Back</div>';
      parentCol.appendChild(guar);
    }

    /* 8. Hero phones — the main missing piece */
    if (!document.querySelector('.hero-phones')) {
      var phones = document.createElement('div');
      phones.className = 'hero-phones r d2';
      phones.innerHTML = ''
        + '<div class="phone phone-train"><div class="ph-body">'
        + '<div class="ph-title" data-i18n="phone.title1">Brain Train</div>'
        + '<div class="ph-skill"><div class="ph-skill-name" data-i18n="phone.skill1">Memory</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:80%"></div></div></div>'
        + '<div class="ph-skill"><div class="ph-skill-name" data-i18n="phone.skill2">Reasoning</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:62%"></div></div></div>'
        + '<div class="ph-skill"><div class="ph-skill-name" data-i18n="phone.skill3">Concentration</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:50%"></div></div></div>'
        + '<div class="ph-skill"><div class="ph-skill-name" data-i18n="phone.skill4">Coordination</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:42%"></div></div></div>'
        + '<div class="ph-next"><div class="ph-next-label" data-i18n="phone.workout">Your Daily Workout</div><div class="ph-next-val" data-i18n="phone.nextsession">NEXT SESSION \u2192</div></div>'
        + '</div></div>'
        + '<div class="phone phone-stats"><div class="ph-body">'
        + '<div class="ph-title" data-i18n="phone.title2">Brain Health</div>'
        + '<div class="ph-chart">'
        + '<div class="ph-chart-label" data-i18n="phone.score">Cognitive Score 0\u2013800</div>'
        + '<div class="ph-bars">'
        + '<div class="ph-bar" style="height:100%"></div>'
        + '<div class="ph-bar" style="height:100%"></div>'
        + '<div class="ph-bar" style="height:55%"></div>'
        + '<div class="ph-bar" style="height:62%"></div>'
        + '<div class="ph-bar peak" style="height:75%"></div>'
        + '</div>'
        + '<div class="ph-goal-pill" data-i18n="phone.goal">GOAL 670</div>'
        + '</div>'
        + '<div class="ph-age-card">'
        + '<div class="ph-age-lbl" data-i18n="phone.cognage">Cognitive Age</div>'
        + '<div class="ph-age-num">37</div>'
        + '<div class="ph-age-ok" data-i18n="phone.cognage.ok">Ideal cognitive age \u2713</div>'
        + '<div class="ph-age-bar"><div class="ph-age-fill"></div></div>'
        + '<div class="ph-age-real" data-i18n="phone.realage">Real Age: 47 years old</div>'
        + '</div>'
        + '</div></div>';
      hc.appendChild(phones);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHero);
  } else { injectHero(); }
  setTimeout(injectHero, 800);
  setTimeout(injectHero, 2500);
})();

/* ═══════════════════════════════════════════════════════════════════════
   2. Reveal fallback (_cogniFitReveal)
   ═══════════════════════════════════════════════════════════════════════ */
document.documentElement.classList.add('js-ready');
function _cogniFitReveal(){var e=document.querySelectorAll('.r');for(var i=0;i<e.length;i++)e[i].classList.add('on');}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',_cogniFitReveal);}else{_cogniFitReveal();}
setTimeout(_cogniFitReveal,1000);

/* ═══════════════════════════════════════════════════════════════════════
   3. DOM safety-net v3 (hero-badge, empty divs, phones, footer, press, lang-btn)
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
  function run(){
    var lang = (document.documentElement.lang || 'pt').slice(0,2).toLowerCase();

    /* 1. Hero-badge — inject content if empty */
    var badge = document.querySelector('.hero-badge');
    if (badge && !badge.textContent.trim()) {
      var txt = (lang === 'pt') ? 'PREPARAR O SEU CÉREBRO PARA 2045' :
                (lang === 'es') ? 'PREPARA TU CEREBRO PARA 2045' :
                (lang === 'fr') ? 'PRÉPAREZ VOTRE CERVEAU POUR 2045' :
                                  'FUTURE-PROOF YOUR BRAIN FOR 2045';
      badge.innerHTML = '<span class="badge-dot">\u2022</span><span>'+txt+'</span>';
    }

    /* 2. Remove Webflow Designer empty "Div Block" skeletons above hero */
    var emptyDivs = document.querySelectorAll('.hero > div:not([class]):empty, .hero-badge > div:not([class]):empty');
    emptyDivs.forEach(function(d){ d.parentNode.removeChild(d); });

    /* 3. Structure .hero-phones children so the CSS phone-mockup shows */
    var phones = document.querySelector('.hero-phones');
    if (phones && phones.children.length > 0) {
      Array.prototype.slice.call(phones.children).forEach(function(c){
        if (!c.tagName || c.tagName === 'BR' || !c.className) {
          var wrap = document.createElement('div');
          wrap.className = 'hero-phones-list';
          wrap.appendChild(c.cloneNode(true));
          phones.replaceChild(wrap, c);
        }
      });
    }

    /* 4. Translate stray English footer items Webflow may have hardcoded.
          These come from Webflow's template, not our data-i18n markup. */
    var footerFix = {
      'pt': {
        'Senior Wellness Trial': 'Ensaio de Bem-estar Sénior',
        'Alzheimer\u2019s Diagnosis': 'Diagnóstico de Alzheimer',
        "Alzheimer's Diagnosis": 'Diagnóstico de Alzheimer',
        'ADHD Training': 'Treino para TDAH',
        'Research Bibliography': 'Bibliografia de Investigação',
        'Assessment Validations': 'Validações de Avaliações',
        'Editorial Process': 'Processo Editorial',
        'worldwide including Harvard, Stanford, University of Washington, Tel Aviv University, and 6,438+ more':
          'em todo o mundo, incluindo Harvard, Stanford, Universidade de Washington, Universidade de Tel Aviv e mais de 6.438'
      },
      'es': {
        'Senior Wellness Trial': 'Ensayo de Bienestar Senior',
        "Alzheimer's Diagnosis": 'Diagnóstico de Alzheimer',
        'ADHD Training': 'Entrenamiento TDAH',
        'Research Bibliography': 'Bibliografía de Investigación',
        'Assessment Validations': 'Validaciones de Evaluación',
        'Editorial Process': 'Proceso Editorial'
      }
    };
    var dict = footerFix[lang];
    if (dict) {
      var foot = document.querySelector('footer, .footer, .site-footer') || document.body;
      var walker = document.createTreeWalker(foot, NodeFilter.SHOW_TEXT, null, false);
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function(n){
        var t = n.nodeValue.trim();
        if (dict[t]) { n.nodeValue = n.nodeValue.replace(t, dict[t]); }
      });
      /* Also any validation-marquee alt-text leak */
      var valBody = document.querySelector('.validation, section.validation, [class*="validation"]');
      if (valBody) {
        var vw = document.createTreeWalker(valBody, NodeFilter.SHOW_TEXT, null, false);
        var vnodes = [];
        while (vw.nextNode()) vnodes.push(vw.currentNode);
        vnodes.forEach(function(n){
          var t = n.nodeValue.trim();
          if (dict[t]) { n.nodeValue = n.nodeValue.replace(t, dict[t]); }
        });
      }
    }

    /* 5. Press-logo img onerror → replace with styled text pill */
    document.querySelectorAll('.press-logo-img').forEach(function(img){
      img.addEventListener('error', function(){
        if (img._fallbackDone) return; img._fallbackDone = true;
        var card = img.closest('.press-logo-card');
        if (card) {
          card.innerHTML = '<span style="color:#fff;font-weight:700;font-size:13px;letter-spacing:.02em">'+(img.alt||'')+'</span>';
        }
      });
      /* Trigger re-check if already broken */
      if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
        img.dispatchEvent(new Event('error'));
      }
    });

    /* 6. Force lang-btn PT: remove any inline style that makes it a blue square */
    document.querySelectorAll('.lang-btn, [class*="lang-btn"]').forEach(function(b){
      if (b.classList.contains('lang-btn-icon') || b.classList.contains('lang-btn-chevron')) return;
      b.style.background = '';
      b.style.backgroundColor = '';
      b.removeAttribute('data-inline-bg');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else { run(); }
  /* Run again after i18n + main.js have injected their content */
  setTimeout(run, 1200);
  setTimeout(run, 3000);
})();

/* ═══════════════════════════════════════════════════════════════════════
   4. Stats counter fallback (IntersectionObserver + scroll/resize + timeout)
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
  function animate(el, target, isDecimal, duration, suffixHTML){
    var start = performance.now();
    var base = isDecimal ? '0.0' : '0';
    el.innerHTML = base + (suffixHTML || '');
    function step(now){
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var cur = target * eased;
      var txt = isDecimal ? cur.toFixed(1) : Math.floor(cur).toLocaleString();
      el.innerHTML = txt + (suffixHTML || '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function prep(el){
    if (el.__counterDone || el.__counterReady) return;
    /* Parse: first child may be text "6.2" or "6,438"; trailing <em>M+</em> etc. */
    var full = el.textContent.trim();
    var match = full.match(/^([\d,.]+)\s*(.*)$/);
    if (!match) return;
    var numStr = match[1].replace(/,/g, '');
    var target = parseFloat(numStr);
    if (isNaN(target)) return;
    var isDecimal = numStr.indexOf('.') !== -1;
    /* Preserve <em> suffix HTML if present, else plain text suffix */
    var em = el.querySelector('em');
    var suffixHTML = em ? em.outerHTML : (match[2] ? '<em>' + match[2] + '</em>' : '');
    el.__counterTarget = target;
    el.__counterDecimal = isDecimal;
    el.__counterSuffix = suffixHTML;
    el.__counterReady = true;
    /* Reset display to 0 while waiting */
    el.innerHTML = (isDecimal ? '0.0' : '0') + suffixHTML;
  }

  function fire(el){
    if (el.__counterDone || !el.__counterReady) return;
    el.__counterDone = true;
    animate(el, el.__counterTarget, el.__counterDecimal, 1800, el.__counterSuffix);
  }

  function inViewport(el){
    var r = el.getBoundingClientRect();
    return r.top < (window.innerHeight || document.documentElement.clientHeight) * 0.95
        && r.bottom > 0;
  }

  function init(){
    var nodes = document.querySelectorAll('.stat-n, .stats-num, .stat-num, [data-count]');
    if (!nodes.length) return;
    nodes.forEach(prep);

    /* Observer path */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting) { fire(e.target); io.unobserve(e.target); }
        });
      }, { threshold: 0.25 });
      nodes.forEach(function(n){ io.observe(n); });
    }

    /* Scroll fallback (for browsers / layouts where IO misbehaves) */
    function onScroll(){
      nodes.forEach(function(n){ if (!n.__counterDone && inViewport(n)) fire(n); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    /* Immediate check */
    setTimeout(onScroll, 50);
    setTimeout(onScroll, 500);

    /* Force-fire ALL counters after 2s regardless of viewport */
    setTimeout(function(){
      nodes.forEach(function(n){ if (!n.__counterDone) fire(n); });
    }, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
  setTimeout(init, 800);
  setTimeout(init, 2000);
  /* Final safety: force-fire anything still at 0 after 4s */
  setTimeout(function(){
    var all = document.querySelectorAll('.stat-n, .stats-num, .stat-num, [data-count]');
    all.forEach(function(el){
      if (!el.__counterDone) {
        prep(el);
        fire(el);
      }
    });
  }, 4000);
})();

/* ═══════════════════════════════════════════════════════════════════════
   5. FAQ accordion bind (click + keyboard toggle)
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
  function bind(){
    var items = document.querySelectorAll('.faq-item, .faq details, details.faq-item');
    items.forEach(function(item){
      if (item.__faqBound) return;
      item.__faqBound = true;
      var q = item.querySelector('.faq-q, .faq-question, summary, button');
      if (!q) return;
      q.setAttribute('role', 'button');
      q.setAttribute('tabindex', '0');
      function toggle(e){
        e.preventDefault();
        var wasOpen = item.classList.contains('open') || item.hasAttribute('open');
        /* Close siblings (accordion behavior) */
        document.querySelectorAll('.faq-item.open, details.faq-item[open]').forEach(function(sib){
          if (sib !== item) { sib.classList.remove('open'); sib.removeAttribute('open'); }
        });
        if (wasOpen) {
          item.classList.remove('open');
          item.removeAttribute('open');
          q.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          if (item.tagName === 'DETAILS') item.setAttribute('open', '');
          q.setAttribute('aria-expanded', 'true');
        }
      }
      q.addEventListener('click', toggle);
      q.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') toggle(e);
      });
      /* Touch devices: ensure pointer cursor */
      q.style.cursor = 'pointer';
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else { bind(); }
  setTimeout(bind, 1500);
  setTimeout(bind, 4000);
})();

/* ═══════════════════════════════════════════════════════════════════════
   6. Visual DOM injection (risk-visual-col, puzzle SVG, triad-svg, pro-cards)
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  function injectMissingElements() {

    /* ── 1. risk-visual-col: orbiting pillars visual (right side of Risk section) ── */
    if (!document.querySelector('.risk-visual-col')) {
      var riskRow = document.querySelector('.risk-row');
      var riskParent = riskRow ? riskRow.parentElement : document.querySelector('#risk .wrap, section#risk .wrap, .s-risk .wrap');
      if (riskParent) {
        var firstRiskRow = riskParent.querySelector('.risk-row');
        if (firstRiskRow) {
          var tmp1 = document.createElement('div');
          tmp1.innerHTML = `<div class="r d2 risk-visual-col" aria-hidden="true">
        <div class="risk-side-visual risk-side-visual--pillars">
          <div class="risk-side-visual__glow"></div>
          <div class="risk-side-visual__core">
            <div class="risk-side-visual__core-brain">🧘</div>
            <div class="risk-side-visual__core-label" data-i18n="risk.core">Mind Balance</div>
          </div>
          <div class="risk-side-visual__orbit risk-side-visual__orbit--one"></div>
          <div class="risk-side-visual__orbit risk-side-visual__orbit--two"></div>

          <div class="risk-pillar risk-pillar--nutrition">
            <div class="risk-pillar__icon">🥗</div>
            <div class="risk-pillar__label" data-i18n="risk.pillar1">Diet & Nutrition</div>
          </div>

          <div class="risk-pillar risk-pillar--exercise">
            <div class="risk-pillar__icon">🏃</div>
            <div class="risk-pillar__label" data-i18n="risk.pillar2">Physical Exercise</div>
          </div>

          <div class="risk-pillar risk-pillar--sleep">
            <div class="risk-pillar__icon">🌙</div>
            <div class="risk-pillar__label" data-i18n="risk.pillar3">Quality Sleep</div>
          </div>

          <div class="risk-pillar risk-pillar--training risk-pillar--highlight">
            <div class="risk-pillar__icon">🧠</div>
            <div class="risk-pillar__label" data-i18n="risk.pillar4">Cognitive Training</div>
          </div>

          <div class="risk-side-visual__link risk-side-visual__link--nutrition"></div>
          <div class="risk-side-visual__link risk-side-visual__link--exercise"></div>
          <div class="risk-side-visual__link risk-side-visual__link--sleep"></div>
          <div class="risk-side-visual__link risk-side-visual__link--training"></div>
        </div>
      </div>`;
          while (tmp1.firstChild) {
            firstRiskRow.appendChild(tmp1.firstChild);
          }
        }
      }
    }

    /* ── 2. risk-missing-piece: animated puzzle SVG with callout text ── */
    if (!document.querySelector('.risk-missing-piece')) {
      var rniSolution = document.querySelector('.rni-solution');
      var riskSection = document.querySelector('#risk .wrap, section#risk .wrap, .s-risk .wrap, section#risk, .s-risk');
      var insertTarget = rniSolution ? rniSolution.parentElement : riskSection;
      if (insertTarget) {
        var tmp2 = document.createElement('div');
        tmp2.innerHTML = `<div class="risk-missing-piece r d2">
      <div class="rmp-icon-wrap">
        <div class="rmp-icon-glow"></div>
        <svg class="rmp-puzzle-svg" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="puz-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="puz-glow-in" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <clipPath id="puz-clip">
              <rect x="30" y="20" width="160" height="160" rx="8"/>
            </clipPath>
          </defs>

          <!-- Brain outline split into 4 puzzle pieces (top-left, top-right, bottom-left, bottom-right) -->
          <!-- Piece 1: top-left -->
          <g class="puz-p1" filter="url(#puz-glow)">
            <path d="M60,60 L105,60 L105,68 C110,68 114,72 114,77 C114,82 110,86 105,86 L105,105 L60,105 Z" 
                  fill="rgba(26,115,232,0.75)" stroke="rgba(26,115,232,1)" stroke-width="1.5"/>
          </g>

          <!-- Piece 2: top-right -->
          <g class="puz-p2" filter="url(#puz-glow)">
            <path d="M115,60 L160,60 L160,105 L115,105 L115,86 C110,86 106,82 106,77 C106,72 110,68 115,68 Z" 
                  fill="rgba(47,140,255,0.65)" stroke="rgba(26,115,232,1)" stroke-width="1.5"/>
          </g>

          <!-- Piece 3: bottom-left -->
          <g class="puz-p3" filter="url(#puz-glow)">
            <path d="M60,106 L105,106 L105,115 C110,115 114,119 114,124 C114,129 110,133 105,133 L105,140 L60,140 Z" 
                  fill="rgba(26,115,232,0.7)" stroke="rgba(26,115,232,1)" stroke-width="1.5"/>
          </g>

          <!-- Piece 4 (MISSING): bottom-right — animated flying in -->
          <g class="puz-p4-missing" filter="url(#puz-glow-in)">
            <path d="M115,106 L160,106 L160,140 L115,140 L115,133 C110,133 106,129 106,124 C106,119 110,115 115,115 Z" 
                  fill="rgba(52,168,83,0.85)" stroke="rgba(52,168,83,1)" stroke-width="2"/>
            <!-- Glow pulse when piece lands -->
            <animateTransform attributeName="transform" type="translate"
              values="80,60; 80,60; 0,0; 0,0; 0,0; 0,0; 80,60"
              dur="4s" repeatCount="indefinite" calcMode="spline"
              keySplines="0 0 1 1; .4 0 .2 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; .4 0 .2 1"
              keyTimes="0; 0.15; 0.45; 0.55; 0.7; 0.85; 1"/>
            <animate attributeName="opacity" values="0;0;1;1;1;0;0" dur="4s" repeatCount="indefinite"
              keyTimes="0;0.14;0.44;0.55;0.7;0.84;1"/>
          </g>

          <!-- Completion flash -->
          <rect x="55" y="55" width="110" height="90" rx="6" fill="rgba(52,168,83,0.15)" stroke="rgba(52,168,83,0.6)" stroke-width="1.5">
            <animate attributeName="opacity" values="0;0;0;1;0;0;0" dur="4s" repeatCount="indefinite"
              keyTimes="0;0.43;0.44;0.5;0.56;0.57;1"/>
          </rect>

          <!-- Brain sulci overlay (detail lines on pieces) -->
          <g opacity="0.4" clip-path="url(#puz-clip)">
            <path d="M75,75 Q90,70 105,78 Q115,70 130,75 Q145,70 155,80" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <path d="M70,90 Q88,84 100,92 Q115,85 135,90 Q148,85 158,92" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
            <path d="M72,105 Q85,99 98,106 Q112,100 128,107 Q142,101 156,107" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
            <path d="M78,118 Q92,113 107,120 Q120,114 136,120 Q147,115 155,121" stroke="rgba(255,255,255,0.45)" stroke-width="1.1" stroke-linecap="round" fill="none"/>
          </g>

          <!-- Connector nubs between pieces -->
          <circle cx="110" cy="77" r="5" fill="rgba(255,255,255,0.15)" stroke="rgba(26,115,232,0.8)" stroke-width="1"/>
          <circle cx="110" cy="124" r="5" fill="rgba(255,255,255,0.12)" stroke="rgba(26,115,232,0.7)" stroke-width="1"/>

          <!-- Label -->
          <text x="110" y="168" text-anchor="middle" font-family="system-ui,sans-serif" font-size="8" font-weight="700" fill="rgba(255,255,255,0.5)" letter-spacing="2">COGNITIVE TRAINING</text>

          <!-- Orbit particle -->
          <circle r="2.5" fill="#2f8cff" opacity="0.8" filter="url(#puz-glow)">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#puz-orbit"/>
            </animateMotion>
          </circle>
          <path id="puz-orbit" d="M110,40 C145,40 175,65 175,100 C175,135 145,160 110,160 C75,160 45,135 45,100 C45,65 75,40 110,40" fill="none"/>
        </svg>
      </div>
      <div class="callout risk-missing-piece__text" data-i18n="risk.miss.text" data-i18n-html><strong>Cognitive training is<br><span class="rmp-highlight">the missing piece.</span></strong> <span class="risk-line-break">It completes the system that protects independence and daily decision-making.</span></div>
    </div>`;
        while (tmp2.firstChild) {
          if (rniSolution && rniSolution.nextSibling) {
            insertTarget.insertBefore(tmp2.firstChild, rniSolution.nextSibling);
          } else {
            insertTarget.appendChild(tmp2.firstChild);
          }
        }
      }
    }

    /* ── 3. triad-svg: triangle SVG connecting 3 neuroscience systems ── */
    if (!document.querySelector('.triad-svg, #triad-svg')) {
      var triadWrap = document.querySelector('.triad-wrap');
      var sciGrid = document.querySelector('.sci-grid');
      if (triadWrap) {
        /* .triad-wrap exists but is empty — inject SVG inside it */
        triadWrap.innerHTML = `<svg id="triad-svg" class="triad-svg" viewBox="0 0 520 310" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <filter id="td-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="grad-ef" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#8b5cf6" stop-opacity=".5"/>
            <stop offset="100%" stop-color="#8b5cf6" stop-opacity=".04"/>
          </radialGradient>
          <radialGradient id="grad-wm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity=".5"/>
            <stop offset="100%" stop-color="#06b6d4" stop-opacity=".04"/>
          </radialGradient>
          <radialGradient id="grad-at" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity=".5"/>
            <stop offset="100%" stop-color="#f59e0b" stop-opacity=".04"/>
          </radialGradient>
        </defs>

        <!-- Visible edges -->
        <path class="td-edge" id="tp-01" d="M260,80 L152,235"/>
        <path class="td-edge" id="tp-02" d="M260,80 L368,235"/>
        <path class="td-edge" id="tp-12" d="M152,235 L368,235"/>

        <!-- Ghost paths: reverse-direction motion tracks (invisible) -->
        <path class="td-edge-ghost" id="tp-10" d="M152,235 L260,80"/>
        <path class="td-edge-ghost" id="tp-20" d="M368,235 L260,80"/>
        <path class="td-edge-ghost" id="tp-21" d="M368,235 L152,235"/>

        <!-- Blue cell particles: 2 per edge, bidirectional -->
        <circle class="td-particle" r="4.5" data-src="0" filter="url(#td-glow)">
          <animateMotion dur="2.6s" repeatCount="indefinite" begin="0s"><mpath href="#tp-01"/></animateMotion>
        </circle>
        <circle class="td-particle" r="4.5" data-src="1" filter="url(#td-glow)">
          <animateMotion dur="2.6s" repeatCount="indefinite" begin="-1.3s"><mpath href="#tp-10"/></animateMotion>
        </circle>
        <circle class="td-particle" r="4.5" data-src="0" filter="url(#td-glow)">
          <animateMotion dur="2.9s" repeatCount="indefinite" begin="-0.4s"><mpath href="#tp-02"/></animateMotion>
        </circle>
        <circle class="td-particle" r="4.5" data-src="2" filter="url(#td-glow)">
          <animateMotion dur="2.9s" repeatCount="indefinite" begin="-1.8s"><mpath href="#tp-20"/></animateMotion>
        </circle>
        <circle class="td-particle" r="4.5" data-src="1" filter="url(#td-glow)">
          <animateMotion dur="3.1s" repeatCount="indefinite" begin="0s"><mpath href="#tp-12"/></animateMotion>
        </circle>
        <circle class="td-particle" r="4.5" data-src="2" filter="url(#td-glow)">
          <animateMotion dur="3.1s" repeatCount="indefinite" begin="-1.55s"><mpath href="#tp-21"/></animateMotion>
        </circle>

        <!-- NODE 0 — Executive Function (top, purple gradient + crown icon) -->
        <g class="td-node td-node-ef" id="td-n0" style="--di:0s">
          <circle class="td-outer" cx="260" cy="80" r="30"/>
          <circle class="td-inner" cx="260" cy="80" r="21" fill="url(#grad-ef)"/>
          <path class="td-icon-crown" d="M250,87 L250,76 L255,82 L260,73 L265,82 L270,76 L270,87 Z"/>
          <text x="260" y="26" class="td-lbl" data-i18n="sci.s1.label.l1">Executive</text>
          <text x="260" y="41" class="td-lbl" data-i18n="sci.s1.label.l2">Function</text>
        </g>

        <!-- NODE 1 — Working Memory (bottom-left, cyan + RAM bars icon) -->
        <g class="td-node td-node-wm" id="td-n1" style="--di:-1s">
          <circle class="td-outer" cx="152" cy="235" r="30"/>
          <circle class="td-inner" cx="152" cy="235" r="21" fill="url(#grad-wm)"/>
          <rect class="td-icon-bar" x="141" y="225" width="22" height="4" rx="1.5"/>
          <rect class="td-icon-bar" x="141" y="233" width="22" height="4" rx="1.5"/>
          <rect class="td-icon-bar" x="141" y="241" width="22" height="4" rx="1.5"/>
          <text x="152" y="283" class="td-lbl" data-i18n="sci.s2.label.l1">Working</text>
          <text x="152" y="298" class="td-lbl" data-i18n="sci.s2.label.l2">Memory</text>
        </g>

        <!-- NODE 2 — Attention (bottom-right, amber + eye icon) -->
        <g class="td-node td-node-at" id="td-n2" style="--di:-2s">
          <circle class="td-outer" cx="368" cy="235" r="30"/>
          <circle class="td-inner" cx="368" cy="235" r="21" fill="url(#grad-at)"/>
          <path class="td-icon-eye-path" d="M358,235 Q368,224 378,235 Q368,246 358,235 Z"/>
          <circle class="td-icon-iris" cx="368" cy="235" r="5"/>
          <circle class="td-icon-pupil" cx="368" cy="235" r="2.5"/>
          <text x="368" y="283" class="td-lbl" data-i18n="sci.s3.label.l1">Attention</text>
        </g>
      </svg>`;
      } else if (sciGrid) {
        /* No .triad-wrap at all — inject the full wrapper after .sci-grid */
        var tmp3 = document.createElement('div');
        tmp3.innerHTML = `<div class="triad-wrap">
      <svg id="triad-svg" class="triad-svg" viewBox="0 0 520 310" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <filter id="td-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="grad-ef" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#8b5cf6" stop-opacity=".5"/>
            <stop offset="100%" stop-color="#8b5cf6" stop-opacity=".04"/>
          </radialGradient>
          <radialGradient id="grad-wm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity=".5"/>
            <stop offset="100%" stop-color="#06b6d4" stop-opacity=".04"/>
          </radialGradient>
          <radialGradient id="grad-at" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity=".5"/>
            <stop offset="100%" stop-color="#f59e0b" stop-opacity=".04"/>
          </radialGradient>
        </defs>

        <!-- Visible edges -->
        <path class="td-edge" id="tp-01" d="M260,80 L152,235"/>
        <path class="td-edge" id="tp-02" d="M260,80 L368,235"/>
        <path class="td-edge" id="tp-12" d="M152,235 L368,235"/>

        <!-- Ghost paths: reverse-direction motion tracks (invisible) -->
        <path class="td-edge-ghost" id="tp-10" d="M152,235 L260,80"/>
        <path class="td-edge-ghost" id="tp-20" d="M368,235 L260,80"/>
        <path class="td-edge-ghost" id="tp-21" d="M368,235 L152,235"/>

        <!-- Blue cell particles: 2 per edge, bidirectional -->
        <circle class="td-particle" r="4.5" data-src="0" filter="url(#td-glow)">
          <animateMotion dur="2.6s" repeatCount="indefinite" begin="0s"><mpath href="#tp-01"/></animateMotion>
        </circle>
        <circle class="td-particle" r="4.5" data-src="1" filter="url(#td-glow)">
          <animateMotion dur="2.6s" repeatCount="indefinite" begin="-1.3s"><mpath href="#tp-10"/></animateMotion>
        </circle>
        <circle class="td-particle" r="4.5" data-src="0" filter="url(#td-glow)">
          <animateMotion dur="2.9s" repeatCount="indefinite" begin="-0.4s"><mpath href="#tp-02"/></animateMotion>
        </circle>
        <circle class="td-particle" r="4.5" data-src="2" filter="url(#td-glow)">
          <animateMotion dur="2.9s" repeatCount="indefinite" begin="-1.8s"><mpath href="#tp-20"/></animateMotion>
        </circle>
        <circle class="td-particle" r="4.5" data-src="1" filter="url(#td-glow)">
          <animateMotion dur="3.1s" repeatCount="indefinite" begin="0s"><mpath href="#tp-12"/></animateMotion>
        </circle>
        <circle class="td-particle" r="4.5" data-src="2" filter="url(#td-glow)">
          <animateMotion dur="3.1s" repeatCount="indefinite" begin="-1.55s"><mpath href="#tp-21"/></animateMotion>
        </circle>

        <!-- NODE 0 — Executive Function (top, purple gradient + crown icon) -->
        <g class="td-node td-node-ef" id="td-n0" style="--di:0s">
          <circle class="td-outer" cx="260" cy="80" r="30"/>
          <circle class="td-inner" cx="260" cy="80" r="21" fill="url(#grad-ef)"/>
          <path class="td-icon-crown" d="M250,87 L250,76 L255,82 L260,73 L265,82 L270,76 L270,87 Z"/>
          <text x="260" y="26" class="td-lbl" data-i18n="sci.s1.label.l1">Executive</text>
          <text x="260" y="41" class="td-lbl" data-i18n="sci.s1.label.l2">Function</text>
        </g>

        <!-- NODE 1 — Working Memory (bottom-left, cyan + RAM bars icon) -->
        <g class="td-node td-node-wm" id="td-n1" style="--di:-1s">
          <circle class="td-outer" cx="152" cy="235" r="30"/>
          <circle class="td-inner" cx="152" cy="235" r="21" fill="url(#grad-wm)"/>
          <rect class="td-icon-bar" x="141" y="225" width="22" height="4" rx="1.5"/>
          <rect class="td-icon-bar" x="141" y="233" width="22" height="4" rx="1.5"/>
          <rect class="td-icon-bar" x="141" y="241" width="22" height="4" rx="1.5"/>
          <text x="152" y="283" class="td-lbl" data-i18n="sci.s2.label.l1">Working</text>
          <text x="152" y="298" class="td-lbl" data-i18n="sci.s2.label.l2">Memory</text>
        </g>

        <!-- NODE 2 — Attention (bottom-right, amber + eye icon) -->
        <g class="td-node td-node-at" id="td-n2" style="--di:-2s">
          <circle class="td-outer" cx="368" cy="235" r="30"/>
          <circle class="td-inner" cx="368" cy="235" r="21" fill="url(#grad-at)"/>
          <path class="td-icon-eye-path" d="M358,235 Q368,224 378,235 Q368,246 358,235 Z"/>
          <circle class="td-icon-iris" cx="368" cy="235" r="5"/>
          <circle class="td-icon-pupil" cx="368" cy="235" r="2.5"/>
          <text x="368" y="283" class="td-lbl" data-i18n="sci.s3.label.l1">Attention</text>
        </g>
      </svg>
    </div>`;
        while (tmp3.firstChild) {
          sciGrid.parentElement.insertBefore(tmp3.firstChild, sciGrid.nextSibling);
        }
      }
    }

    /* ── 4. pro-cards: the .pro-stack with all pro-card elements ── */
    var proStack = document.querySelector('.pro-stack');
    var proCards = document.querySelectorAll('.pro-card');
    if (!proStack || proCards.length === 0) {
      var proSection = document.querySelector('#pro .wrap, section#pro .wrap, .s-pro .wrap, #professionals .wrap');
      if (!proSection) {
        /* Try to find the Pro section by heading content */
        var allSections = document.querySelectorAll('section .wrap');
        for (var i = 0; i < allSections.length; i++) {
          var h = allSections[i].querySelector('h2');
          if (h && /discover\s+cognifit/i.test(h.textContent)) {
            proSection = allSections[i];
            break;
          }
        }
      }
      if (proSection) {
        if (proStack && proCards.length === 0) {
          /* .pro-stack exists but is empty — fill its inner content */
          proStack.innerHTML = `<div class="pro-card r" style="--c:#7B1FA2">
        <div class="pro-text"><h3 data-i18n="pro.c1.t">Healthcare Professionals</h3><p class="pro-desc" data-i18n="pro.c1.d">Neuropsychological exploration, stimulation, and cognitive rehabilitation. Clinically proven, reimbursable, reliable.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">3,530</span><span class="pm-lbl" data-i18n="pro.c1.l1">Clinicians</span></div><div class="pro-metric"><span class="pm-num">96,110</span><span class="pm-lbl" data-i18n="pro.c1.l2">Patients</span></div></div>
        <a href="https://www.cognifit.com/medical-platform" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#2d004a,#1a0030)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0"><defs><filter id="hc-gf" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<ellipse cx="100" cy="85" rx="60" ry="50" fill="rgba(180,80,255,0.18)"><animate attributeName="rx" values="60;67;60" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".18;.35;.18" dur="3s" repeatCount="indefinite"/></ellipse>
<path d="M65 68 C48 62 38 74 40 88 C42 102 54 112 70 114 C76 115 83 115 90 113 L100 116 L110 113 C117 115 124 115 130 114 C146 112 158 102 160 88 C162 74 152 62 135 68 C131 55 120 48 100 46 C80 48 69 55 65 68Z" fill="rgba(200,130,255,0.1)" stroke="rgba(255,255,255,0.28)" stroke-width="2"><animate attributeName="stroke-opacity" values=".28;.55;.28" dur="2.5s" repeatCount="indefinite"/></path>
<path d="M100 48 Q98 82 100 116" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
<path d="M64 80 Q80 73 96 79 Q108 73 124 79 Q138 73 150 80" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
<path d="M62 97 Q78 90 94 97 Q108 90 124 97 Q138 90 152 97" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
<circle cx="74" cy="74" r="3.5" fill="white"><animate attributeName="r" values="3.5;5.5;3.5" dur="3.5s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;1;.5" dur="3.5s" begin="0s" repeatCount="indefinite"/></circle>
<circle cx="96" cy="62" r="3" fill="white"><animate attributeName="r" values="3;5;3" dur="3.8s" begin=".6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;1;.4" dur="3.8s" begin=".6s" repeatCount="indefinite"/></circle>
<circle cx="122" cy="65" r="3.5" fill="white"><animate attributeName="r" values="3.5;5.5;3.5" dur="3.2s" begin="1.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;1;.5" dur="3.2s" begin="1.2s" repeatCount="indefinite"/></circle>
<circle cx="86" cy="93" r="3" fill="white"><animate attributeName="r" values="3;4.5;3" dur="4s" begin=".3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;1;.4" dur="4s" begin=".3s" repeatCount="indefinite"/></circle>
<circle cx="114" cy="96" r="3.5" fill="white"><animate attributeName="r" values="3.5;5.5;3.5" dur="3.6s" begin="1.7s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;1;.5" dur="3.6s" begin="1.7s" repeatCount="indefinite"/></circle>
<circle cx="140" cy="80" r="3" fill="white"><animate attributeName="r" values="3;5;3" dur="4.2s" begin="1s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;1;.4" dur="4.2s" begin="1s" repeatCount="indefinite"/></circle>
<line x1="74" y1="74" x2="96" y2="62" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="3.5s" begin="0s" repeatCount="indefinite"/></line>
<line x1="96" y1="62" x2="122" y2="65" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="3.8s" begin=".5s" repeatCount="indefinite"/></line>
<line x1="122" y1="65" x2="140" y2="80" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="3.2s" begin="1s" repeatCount="indefinite"/></line>
<line x1="74" y1="74" x2="86" y2="93" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="4s" begin="1.5s" repeatCount="indefinite"/></line>
<line x1="86" y1="93" x2="114" y2="96" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="3.6s" begin=".3s" repeatCount="indefinite"/></line>
<line x1="114" y1="96" x2="140" y2="80" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="4.2s" begin=".8s" repeatCount="indefinite"/></line>
<line x1="96" y1="62" x2="86" y2="93" stroke="rgba(255,255,255,.3)" stroke-width=".8"><animate attributeName="stroke-opacity" values=".05;.4;.05" dur="4.4s" begin="1.3s" repeatCount="indefinite"/></line>
<line x1="122" y1="65" x2="114" y2="96" stroke="rgba(255,255,255,.3)" stroke-width=".8"><animate attributeName="stroke-opacity" values=".05;.4;.05" dur="4s" begin="1.9s" repeatCount="indefinite"/></line>
<circle r="4.5" fill="white" filter="url(#hc-gf)"><animateMotion dur="4.5s" repeatCount="indefinite" path="M74,74 L96,62 L122,65 L140,80 L114,96 L86,93 L74,74"/><animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;.08;.5;.92;1" dur="4.5s" repeatCount="indefinite"/></circle>
<rect x="46" y="133" width="108" height="20" rx="4" fill="rgba(0,0,0,0.38)"/>
<polyline points="46,143 56,143 62,133 68,153 74,136 79,148 85,143 95,143 101,130 108,156 114,134 120,143 130,143 154,143" stroke="rgba(230,180,255,.85)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="165" stroke-dashoffset="165"><animate attributeName="stroke-dashoffset" values="165;-165" dur="3.5s" repeatCount="indefinite"/></polyline>
</svg></div>
      </div>
      
      <div class="pro-card r d1" style="--c:#2E7D32">
        <div class="pro-text"><h3 data-i18n="pro.c2.t">Scientific Research</h3><p class="pro-desc" data-i18n="pro.c2.d">Cognitive Assessment Batteries and brain training for experimental studies. Validated tools for brain-based research.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">735</span><span class="pm-lbl" data-i18n="pro.c2.l1">Researchers</span></div><div class="pro-metric"><span class="pm-num">68,779</span><span class="pm-lbl" data-i18n="pro.c2.l2">Participants</span></div></div>
        <a href="https://www.cognifit.com/cognitive-research-tool" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#0d3310,#051a08)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0"><defs><clipPath id="rc-clip"><rect x="0" y="0" width="200" height="180"/></clipPath></defs>
<rect width="200" height="180" fill="none"/>
<ellipse cx="100" cy="90" rx="45" ry="80" fill="rgba(80,200,100,0.08)"/>
<g clip-path="url(#rc-clip)"><g><animateTransform attributeName="transform" type="translate" values="0,0;0,-60" dur="3s" repeatCount="indefinite" calcMode="linear"/>
<line x1="70" y1="-45" x2="130" y2="-45" stroke="rgba(144,238,144,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="-45" r="3.5" fill="rgba(144,238,144,.9)"/><circle cx="130" cy="-45" r="3.5" fill="rgba(144,238,144,.9)"/>
<line x1="70" y1="-15" x2="130" y2="-15" stroke="rgba(100,200,255,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="-15" r="3.5" fill="rgba(100,200,255,.9)"/><circle cx="130" cy="-15" r="3.5" fill="rgba(100,200,255,.9)"/>
<line x1="70" y1="15" x2="130" y2="15" stroke="rgba(144,238,144,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="15" r="3.5" fill="rgba(144,238,144,.9)"/><circle cx="130" cy="15" r="3.5" fill="rgba(144,238,144,.9)"/>
<line x1="70" y1="45" x2="130" y2="45" stroke="rgba(100,200,255,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="45" r="3.5" fill="rgba(100,200,255,.9)"/><circle cx="130" cy="45" r="3.5" fill="rgba(100,200,255,.9)"/>
<line x1="70" y1="75" x2="130" y2="75" stroke="rgba(144,238,144,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="75" r="3.5" fill="rgba(144,238,144,.9)"/><circle cx="130" cy="75" r="3.5" fill="rgba(144,238,144,.9)"/>
<line x1="70" y1="105" x2="130" y2="105" stroke="rgba(100,200,255,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="105" r="3.5" fill="rgba(100,200,255,.9)"/><circle cx="130" cy="105" r="3.5" fill="rgba(100,200,255,.9)"/>
<line x1="70" y1="135" x2="130" y2="135" stroke="rgba(144,238,144,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="135" r="3.5" fill="rgba(144,238,144,.9)"/><circle cx="130" cy="135" r="3.5" fill="rgba(144,238,144,.9)"/>
<line x1="70" y1="165" x2="130" y2="165" stroke="rgba(100,200,255,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="165" r="3.5" fill="rgba(100,200,255,.9)"/><circle cx="130" cy="165" r="3.5" fill="rgba(100,200,255,.9)"/>
<line x1="70" y1="195" x2="130" y2="195" stroke="rgba(144,238,144,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="195" r="3.5" fill="rgba(144,238,144,.9)"/><circle cx="130" cy="195" r="3.5" fill="rgba(144,238,144,.9)"/>
<line x1="70" y1="225" x2="130" y2="225" stroke="rgba(100,200,255,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="225" r="3.5" fill="rgba(100,200,255,.9)"/><circle cx="130" cy="225" r="3.5" fill="rgba(100,200,255,.9)"/>
<path d="M100,-60 C130,-50 130,-40 100,-30 C70,-20 70,-10 100,0 C130,10 130,20 100,30 C70,40 70,50 100,60 C130,70 130,80 100,90 C70,100 70,110 100,120 C130,130 130,140 100,150 C70,160 70,170 100,180 C130,190 130,200 100,210 C70,220 70,230 100,240" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2.5" stroke-linecap="round"/>
<path d="M100,-60 C70,-50 70,-40 100,-30 C130,-20 130,-10 100,0 C70,10 70,20 100,30 C130,40 130,50 100,60 C70,70 70,80 100,90 C130,100 130,110 100,120 C70,130 70,140 100,150 C130,160 130,170 100,180 C70,190 70,200 100,210 C130,220 130,230 100,240" fill="none" stroke="rgba(180,255,180,0.55)" stroke-width="2" stroke-linecap="round"/>
<circle cx="100" cy="-30" r="4.5" fill="white" opacity=".9"/><circle cx="100" cy="0" r="5" fill="white"/><circle cx="100" cy="30" r="4.5" fill="white" opacity=".9"/><circle cx="100" cy="60" r="5" fill="white"/><circle cx="100" cy="90" r="4.5" fill="white" opacity=".9"/><circle cx="100" cy="120" r="5" fill="white"/><circle cx="100" cy="150" r="4.5" fill="white" opacity=".9"/><circle cx="100" cy="180" r="5" fill="white"/><circle cx="100" cy="210" r="4.5" fill="white" opacity=".9"/>
</g></g></svg></div>
      </div>
      
      <div class="pro-card r" style="--c:#00695C">
        <div class="pro-text"><h3 data-i18n="pro.c3.t">Education Professionals</h3><p class="pro-desc" data-i18n="pro.c3.d">Neuropsychological evaluation, stimulation, and cognitive tools for your students in and beyond the classroom.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">1,051</span><span class="pm-lbl" data-i18n="pro.c3.l1">Schools</span></div><div class="pro-metric"><span class="pm-num">18,885</span><span class="pm-lbl" data-i18n="pro.c3.l2">Students</span></div></div>
        <a href="https://www.cognifit.com/educational-technology" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#00251a,#00110d)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<ellipse cx="100" cy="105" rx="55" ry="45" fill="rgba(0,200,160,0.15)"><animate attributeName="opacity" values=".15;.28;.15" dur="3s" repeatCount="indefinite"/></ellipse>
<!-- Left page: curved outward -->
<path d="M100 130 C80 125 58 120 54 115 C50 108 52 88 54 78 C56 70 75 76 100 87 Z" fill="rgba(0,200,160,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linejoin="round"/>
<!-- Right page: curved outward -->
<path d="M100 130 C120 125 142 120 146 115 C150 108 148 88 146 78 C144 70 125 76 100 87 Z" fill="rgba(0,230,180,0.18)" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" stroke-linejoin="round"/>
<!-- Spine -->
<path d="M100 87 C99 100 99 115 100 130" stroke="rgba(255,255,255,0.55)" stroke-width="2" fill="none" stroke-linecap="round"/>
<!-- Left page lines: curved -->
<path d="M63 95 C72 97 84 99 94 101" stroke="rgba(255,255,255,0.25)" stroke-width="1" fill="none" stroke-linecap="round"/>
<path d="M62 103 C72 105 84 107 94 109" stroke="rgba(255,255,255,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>
<path d="M63 111 C72 113 84 115 94 117" stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none" stroke-linecap="round"/>
<!-- Right page lines: curved -->
<path d="M137 95 C128 97 116 99 106 101" stroke="rgba(255,255,255,0.25)" stroke-width="1" fill="none" stroke-linecap="round"/>
<path d="M138 103 C128 105 116 107 106 109" stroke="rgba(255,255,255,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>
<path d="M137 111 C128 113 116 115 106 117" stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none" stroke-linecap="round"/>
<circle cx="85" cy="68" r="3" fill="rgba(100,255,200,0.9)"><animate attributeName="cy" values="68;30;20" dur="2.8s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.6;0" dur="2.8s" begin="0s" repeatCount="indefinite"/><animate attributeName="r" values="3;2;1" dur="2.8s" begin="0s" repeatCount="indefinite"/></circle>
<circle cx="100" cy="58" r="2.5" fill="rgba(200,255,230,0.9)"><animate attributeName="cy" values="58;22;12" dur="2.4s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;0" dur="2.4s" begin=".5s" repeatCount="indefinite"/><animate attributeName="r" values="2.5;1.5;0.5" dur="2.4s" begin=".5s" repeatCount="indefinite"/></circle>
<circle cx="115" cy="65" r="3.5" fill="rgba(80,255,180,0.9)"><animate attributeName="cy" values="65;28;15" dur="3s" begin=".2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.6;0" dur="3s" begin=".2s" repeatCount="indefinite"/><animate attributeName="r" values="3.5;2;0.8" dur="3s" begin=".2s" repeatCount="indefinite"/></circle>
<circle cx="92" cy="52" r="2" fill="rgba(180,255,210,0.85)"><animate attributeName="cy" values="52;18;8" dur="2.6s" begin=".9s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;0" dur="2.6s" begin=".9s" repeatCount="indefinite"/></circle>
<circle cx="108" cy="45" r="2.5" fill="rgba(120,255,200,0.9)"><animate attributeName="cy" values="45;12;2" dur="3.2s" begin=".4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.4;0" dur="3.2s" begin=".4s" repeatCount="indefinite"/></circle>
<circle cx="78" cy="55" r="2" fill="rgba(200,255,220,0.8)"><animate attributeName="cy" values="55;25;14" dur="2.9s" begin="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;0" dur="2.9s" begin="1.1s" repeatCount="indefinite"/></circle>
<circle cx="122" cy="50" r="3" fill="rgba(60,255,170,0.9)"><animate attributeName="cy" values="50;16;4" dur="2.7s" begin=".7s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.6;0" dur="2.7s" begin=".7s" repeatCount="indefinite"/><animate attributeName="r" values="3;1.8;0.6" dur="2.7s" begin=".7s" repeatCount="indefinite"/></circle>
<polygon points="100,35 101.5,39.5 106,39.5 102.3,42 103.7,46.5 100,44 96.3,46.5 97.7,42 94,39.5 98.5,39.5" fill="rgba(255,255,200,0.9)"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="0s" repeatCount="indefinite"/><animate attributeName="transform" attributeType="XML" type="translate" values="0,0;0,-8" dur="2s" begin="0s" repeatCount="indefinite"/></polygon>
<polygon points="72,42 73,45.5 76.5,45.5 73.8,47.3 74.8,50.8 72,49 69.2,50.8 70.2,47.3 67.5,45.5 71,45.5" fill="rgba(255,240,150,0.85)"><animate attributeName="opacity" values="0;1;0" dur="2.3s" begin=".8s" repeatCount="indefinite"/><animate attributeName="transform" attributeType="XML" type="translate" values="0,0;0,-10" dur="2.3s" begin=".8s" repeatCount="indefinite"/></polygon>
<polygon points="128,38 129,41.5 132.5,41.5 129.8,43.3 130.8,46.8 128,45 125.2,46.8 126.2,43.3 123.5,41.5 127,41.5" fill="rgba(255,230,120,0.85)"><animate attributeName="opacity" values="0;1;0" dur="2.6s" begin=".3s" repeatCount="indefinite"/><animate attributeName="transform" attributeType="XML" type="translate" values="0,0;0,-12" dur="2.6s" begin=".3s" repeatCount="indefinite"/></polygon>
</svg></div>
      </div>
      
      <div class="pro-card r d1" style="--c:#880E4F">
        <div class="pro-text"><h3 data-i18n="pro.c4.t">Employee Wellbeing</h3><p class="pro-desc" data-i18n="pro.c4.d">Online mental wellness platform giving everyone the power to improve with simple tools for wellbeing and performance.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">22</span><span class="pm-lbl" data-i18n="pro.c4.l1">Companies</span></div><div class="pro-metric"><span class="pm-num">164</span><span class="pm-lbl" data-i18n="pro.c4.l2">Employees</span></div></div>
        <a href="https://www.cognifit.com/employee-wellbeing" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#2d0019,#18000d)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<ellipse cx="100" cy="95" rx="65" ry="52" fill="rgba(255,80,150,0.12)"><animate attributeName="opacity" values=".12;.25;.12" dur="3s" repeatCount="indefinite"/></ellipse>
<line x1="48" y1="145" x2="155" y2="145" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
<rect x="56" y="125" width="20" height="20" rx="3" fill="rgba(255,100,160,0.6)" stroke="rgba(255,130,180,0.5)" stroke-width="1">
  <animate attributeName="y" values="135;125;135" dur="2.5s" begin="0s" repeatCount="indefinite"/>
  <animate attributeName="height" values="10;20;10" dur="2.5s" begin="0s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".5;.85;.5" dur="2.5s" begin="0s" repeatCount="indefinite"/>
</rect>
<rect x="84" y="105" width="20" height="40" rx="3" fill="rgba(255,130,180,0.65)" stroke="rgba(255,160,200,0.5)" stroke-width="1">
  <animate attributeName="y" values="120;105;120" dur="2.5s" begin=".3s" repeatCount="indefinite"/>
  <animate attributeName="height" values="25;40;25" dur="2.5s" begin=".3s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".55;.9;.55" dur="2.5s" begin=".3s" repeatCount="indefinite"/>
</rect>
<rect x="112" y="82" width="20" height="63" rx="3" fill="rgba(255,160,200,0.7)" stroke="rgba(255,190,220,0.5)" stroke-width="1">
  <animate attributeName="y" values="102;82;102" dur="2.5s" begin=".6s" repeatCount="indefinite"/>
  <animate attributeName="height" values="43;63;43" dur="2.5s" begin=".6s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".6;1;.6" dur="2.5s" begin=".6s" repeatCount="indefinite"/>
</rect>
<polyline points="66,130 94,115 122,95" fill="none" stroke="rgba(255,220,235,0.7)" stroke-width="2" stroke-linecap="round" stroke-dasharray="90" stroke-dashoffset="90"><animate attributeName="stroke-dashoffset" values="90;0;0" keyTimes="0;.5;1" dur="2.5s" repeatCount="indefinite"/></polyline>
<g opacity="0"><animate attributeName="opacity" values="0;0;0.7;0.7;0" keyTimes="0;.45;.55;.95;1" dur="2.5s" repeatCount="indefinite"/>
<!-- dot instead of triangle arrow -->
<circle cx="122" cy="93" r="4" fill="rgba(255,210,230,0.85)"/></g>
<circle cx="66" cy="56" r="9" fill="none" stroke="rgba(255,130,180,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.5s" begin="0s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".6;1;.6" dur="2.5s" begin="0s" repeatCount="indefinite"/></circle>
<circle cx="66" cy="53" r="4" fill="rgba(255,160,200,0.8)"/>
<path d="M58 66 Q66 62 74 66" fill="none" stroke="rgba(255,160,200,0.8)" stroke-width="1.5" stroke-linecap="round"/>
<circle cx="100" cy="52" r="9" fill="none" stroke="rgba(255,160,200,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.5s" begin=".4s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".6;1;.6" dur="2.5s" begin=".4s" repeatCount="indefinite"/></circle>
<circle cx="100" cy="49" r="4" fill="rgba(255,190,220,0.85)"/>
<path d="M92 62 Q100 58 108 62" fill="none" stroke="rgba(255,190,220,0.85)" stroke-width="1.5" stroke-linecap="round"/>
<circle cx="134" cy="56" r="9" fill="none" stroke="rgba(255,190,220,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.5s" begin=".8s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".6;1;.6" dur="2.5s" begin=".8s" repeatCount="indefinite"/></circle>
<circle cx="134" cy="53" r="4" fill="rgba(255,210,230,0.85)"/>
<path d="M126 66 Q134 62 142 66" fill="none" stroke="rgba(255,210,230,0.85)" stroke-width="1.5" stroke-linecap="round"/>
<path d="M74 55 Q83 48 92 52" fill="none" stroke="rgba(255,150,190,0.4)" stroke-width="1.2" stroke-dasharray="20" stroke-dashoffset="20"><animate attributeName="stroke-dashoffset" values="20;0;20" dur="2s" begin=".2s" repeatCount="indefinite"/></path>
<path d="M108 52 Q121 46 126 54" fill="none" stroke="rgba(255,170,210,0.4)" stroke-width="1.2" stroke-dasharray="20" stroke-dashoffset="20"><animate attributeName="stroke-dashoffset" values="20;0;20" dur="2s" begin=".6s" repeatCount="indefinite"/></path>
</svg></div>
      </div>

      <!-- Clinical Trials -->
      <div class="pro-card r d2" style="--c:#B45309">
        <div class="pro-text"><h3 data-i18n="pro.c5.t">Clinical Trials</h3><p class="pro-desc" data-i18n="pro.c5.d">Validated cognitive outcome measures for clinical research. FDA-recognized digital endpoints for neurological and psychiatric trials.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">1,083</span><span class="pm-lbl" data-i18n="pro.c5.l1">Clinical Trials</span></div><div class="pro-metric"><span class="pm-num">29,144</span><span class="pm-lbl" data-i18n="pro.c5.l2">Participants</span></div></div>
        <a href="https://www.cognifit.com/clinical-trials" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#2d1500,#180a00)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<ellipse cx="100" cy="100" rx="60" ry="48" fill="rgba(210,120,0,0.12)"><animate attributeName="opacity" values=".12;.25;.12" dur="3.2s" repeatCount="indefinite"/></ellipse>
<!-- Test tube left -->
<rect x="68" y="65" width="14" height="52" rx="7" fill="rgba(210,140,0,0.3)" stroke="rgba(255,190,80,0.6)" stroke-width="1.5"/>
<rect x="69" y="95" width="12" height="22" rx="6" fill="rgba(255,160,0,0.55)"><animate attributeName="height" values="14;22;14" dur="2.4s" begin="0s" repeatCount="indefinite"/><animate attributeName="y" values="103;95;103" dur="2.4s" begin="0s" repeatCount="indefinite"/></rect>
<!-- Test tube right -->
<rect x="90" y="58" width="14" height="60" rx="7" fill="rgba(240,160,20,0.28)" stroke="rgba(255,210,80,0.55)" stroke-width="1.5"/>
<rect x="91" y="92" width="12" height="26" rx="6" fill="rgba(255,190,40,0.6)"><animate attributeName="height" values="16;26;16" dur="2.8s" begin=".4s" repeatCount="indefinite"/><animate attributeName="y" values="102;92;102" dur="2.8s" begin=".4s" repeatCount="indefinite"/></rect>
<!-- Test tube right 2 -->
<rect x="112" y="62" width="14" height="56" rx="7" fill="rgba(220,130,0,0.25)" stroke="rgba(255,180,60,0.5)" stroke-width="1.5"/>
<rect x="113" y="94" width="12" height="24" rx="6" fill="rgba(255,170,20,0.58)"><animate attributeName="height" values="12;24;12" dur="3s" begin=".8s" repeatCount="indefinite"/><animate attributeName="y" values="106;94;106" dur="3s" begin=".8s" repeatCount="indefinite"/></rect>
<!-- Bubbles -->
<circle cx="75" cy="90" r="2" fill="rgba(255,220,100,0.8)"><animate attributeName="cy" values="90;68;60" dur="2s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;0" dur="2s" begin="0s" repeatCount="indefinite"/></circle>
<circle cx="97" cy="85" r="1.5" fill="rgba(255,230,120,0.8)"><animate attributeName="cy" values="85;62;52" dur="2.5s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.4;0" dur="2.5s" begin=".5s" repeatCount="indefinite"/></circle>
<circle cx="119" cy="88" r="2" fill="rgba(255,210,80,0.8)"><animate attributeName="cy" values="88;65;55" dur="2.2s" begin=".3s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;0" dur="2.2s" begin=".3s" repeatCount="indefinite"/></circle>
<!-- Star/plus markers -->
<text x="87" y="52" font-size="10" fill="rgba(255,220,100,0.9)" text-anchor="middle"><animate attributeName="opacity" values="0;1;0" dur="1.8s" begin=".2s" repeatCount="indefinite"/>✦</text>
<text x="113" y="48" font-size="8" fill="rgba(255,200,80,0.85)" text-anchor="middle"><animate attributeName="opacity" values="0;1;0" dur="2.1s" begin=".9s" repeatCount="indefinite"/>✦</text>
</svg></div>
      </div>

      <!-- White Label Partnerships -->
      <div class="pro-card r d3" style="--c:#1565C0">
        <div class="pro-text"><h3 data-i18n="pro.c6.t">White Label Partnerships</h3><p class="pro-desc" data-i18n="pro.c6.d">Integrate CogniFit's cognitive technology into your own platform. Full SDK, custom branding, and dedicated support.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">48</span><span class="pm-lbl" data-i18n="pro.c6.l1">Partners</span></div><div class="pro-metric"><span class="pm-num">1,067,759</span><span class="pm-lbl" data-i18n="pro.c6.l2">Users</span></div></div>
        <a href="https://www.cognifit.com/partners-integration-platform" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#001a40,#000d24)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<ellipse cx="100" cy="100" rx="65" ry="50" fill="rgba(30,100,255,0.1)"><animate attributeName="opacity" values=".1;.22;.1" dur="3s" repeatCount="indefinite"/></ellipse>
<!-- Central hub -->
<circle cx="100" cy="95" r="14" fill="rgba(26,115,232,0.4)" stroke="rgba(80,160,255,0.7)" stroke-width="2"><animate attributeName="r" values="14;16;14" dur="2.5s" repeatCount="indefinite"/></circle>
<circle cx="100" cy="95" r="6" fill="rgba(130,190,255,0.9)"/>
<!-- Nodes -->
<circle cx="60" cy="65" r="9" fill="rgba(26,80,200,0.45)" stroke="rgba(100,170,255,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.2s" begin="0s" repeatCount="indefinite"/></circle>
<circle cx="140" cy="65" r="9" fill="rgba(26,80,200,0.45)" stroke="rgba(100,170,255,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.6s" begin=".4s" repeatCount="indefinite"/></circle>
<circle cx="58" cy="128" r="9" fill="rgba(26,80,200,0.45)" stroke="rgba(100,170,255,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.4s" begin=".8s" repeatCount="indefinite"/></circle>
<circle cx="142" cy="128" r="9" fill="rgba(26,80,200,0.45)" stroke="rgba(100,170,255,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.8s" begin=".2s" repeatCount="indefinite"/></circle>
<!-- Connecting lines with traveling dots -->
<line x1="68" y1="70" x2="88" y2="88" stroke="rgba(80,160,255,0.35)" stroke-width="1.2"/>
<circle r="2" fill="rgba(150,210,255,0.9)"><animateMotion path="M68,70 L88,88" dur="1.8s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin="0s" repeatCount="indefinite"/></circle>
<line x1="132" y1="70" x2="112" y2="88" stroke="rgba(80,160,255,0.35)" stroke-width="1.2"/>
<circle r="2" fill="rgba(150,210,255,0.9)"><animateMotion path="M132,70 L112,88" dur="2.2s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="2.2s" begin=".5s" repeatCount="indefinite"/></circle>
<line x1="66" y1="122" x2="88" y2="103" stroke="rgba(80,160,255,0.35)" stroke-width="1.2"/>
<circle r="2" fill="rgba(150,210,255,0.9)"><animateMotion path="M66,122 L88,103" dur="2s" begin="1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="2s" begin="1s" repeatCount="indefinite"/></circle>
<line x1="134" y1="122" x2="112" y2="103" stroke="rgba(80,160,255,0.35)" stroke-width="1.2"/>
<circle r="2" fill="rgba(150,210,255,0.9)"><animateMotion path="M134,122 L112,103" dur="1.6s" begin=".3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin=".3s" repeatCount="indefinite"/></circle>
</svg></div>
      </div>

      <!-- Athletes -->
      <div class="pro-card r d4" style="--c:#4A148C">
        <div class="pro-text"><h3 data-i18n="pro.c7.t">Athletes</h3><p class="pro-desc" data-i18n="pro.c7.d">Peak cognitive performance for elite sport. Reaction time, focus under pressure, and decision-making training for competitive athletes.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">4</span><span class="pm-lbl" data-i18n="pro.c7.l1">Coaches</span></div><div class="pro-metric"><span class="pm-num">12</span><span class="pm-lbl" data-i18n="pro.c7.l2">Athletes</span></div></div>
        <a href="https://www.cognifit.com/sports" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#120026,#080014)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<defs>
  <radialGradient id="ath-bg" cx="50%" cy="50%" r="55%">
    <stop offset="0%" stop-color="rgba(140,60,255,0.3)"/>
    <stop offset="100%" stop-color="rgba(80,0,160,0)"/>
  </radialGradient>
  <filter id="ath-gf" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="3" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>

<!-- Background glow -->
<ellipse cx="100" cy="90" rx="70" ry="56" fill="url(#ath-bg)">
  <animate attributeName="rx" values="70;76;70" dur="3.5s" repeatCount="indefinite"/>
</ellipse>

<!-- Medal (centre) — gold with ribbon -->
<g transform="translate(100,72)">
  <!-- Ribbon -->
  <path d="M-12,-28 L-8,0 L0,-8 L8,0 L12,-28" fill="rgba(180,100,255,0.5)" stroke="rgba(200,140,255,0.6)" stroke-width="1"/>
  <!-- Medal circle -->
  <circle cx="0" cy="8" r="22" fill="rgba(255,200,60,0.2)" stroke="rgba(255,210,80,0.7)" stroke-width="2">
    <animate attributeName="stroke-opacity" values=".5;1;.5" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="0" cy="8" r="16" fill="none" stroke="rgba(255,220,100,0.4)" stroke-width="1"/>
  <!-- Star inside medal -->
  <polygon points="0,-8 2.4,-2.4 8.4,-2.4 3.6,1.6 5.2,8 0,4 -5.2,8 -3.6,1.6 -8.4,-2.4 -2.4,-2.4" fill="rgba(255,220,100,0.85)">
    <animate attributeName="opacity" values=".7;1;.7" dur="2.5s" repeatCount="indefinite"/>
  </polygon>
  <!-- Medal glow pulse -->
  <circle cx="0" cy="8" r="22" fill="none" stroke="rgba(255,210,80,0.25)" stroke-width="1">
    <animate attributeName="r" values="22;30;22" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values=".4;0;.4" dur="3s" repeatCount="indefinite"/>
  </circle>
</g>

<!-- Target/crosshair (top-left) — precision -->
<g transform="translate(48,42)" opacity="0.8">
  <animate attributeName="opacity" values=".6;.9;.6" dur="3s" repeatCount="indefinite"/>
  <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(180,120,255,0.5)" stroke-width="1.5"/>
  <circle cx="0" cy="0" r="8" fill="none" stroke="rgba(180,120,255,0.35)" stroke-width="1"/>
  <circle cx="0" cy="0" r="2.5" fill="rgba(200,150,255,0.8)"/>
  <line x1="-18" y1="0" x2="-10" y2="0" stroke="rgba(180,120,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="10" y1="0" x2="18" y2="0" stroke="rgba(180,120,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="0" y1="-18" x2="0" y2="-10" stroke="rgba(180,120,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="0" y1="10" x2="0" y2="18" stroke="rgba(180,120,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
</g>

<!-- Stopwatch (top-right) — reaction time -->
<g transform="translate(155,38)">
  <animate attributeName="opacity" values=".6;1;.6" dur="2.5s" repeatCount="indefinite"/>
  <circle cx="0" cy="0" r="13" fill="rgba(140,60,255,0.15)" stroke="rgba(200,150,255,0.6)" stroke-width="1.5"/>
  <line x1="0" y1="-13" x2="0" y2="-18" stroke="rgba(200,150,255,0.5)" stroke-width="2" stroke-linecap="round"/>
  <line x1="-3" y1="-17" x2="3" y2="-17" stroke="rgba(200,150,255,0.5)" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Clock hands -->
  <line x1="0" y1="-1" x2="0" y2="-8" stroke="rgba(255,220,100,0.9)" stroke-width="1.5" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="4s" repeatCount="indefinite"/>
  </line>
  <line x1="0" y1="0" x2="5" y2="-3" stroke="rgba(200,160,255,0.7)" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="0" cy="0" r="2" fill="rgba(255,220,100,0.8)"/>
</g>

<!-- EKG/heartbeat line (bottom) — performance monitor -->
<g transform="translate(0,0)">
  <rect x="35" y="128" width="130" height="28" rx="5" fill="rgba(0,0,0,0.3)"/>
  <polyline points="38,142 52,142 58,142 64,132 70,152 76,135 82,146 88,142 100,142 106,142 112,132 118,152 124,135 130,146 136,142 150,142 162,142" stroke="rgba(200,140,255,0.8)" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="140" stroke-dashoffset="140">
    <animate attributeName="stroke-dashoffset" values="140;-140" dur="3s" repeatCount="indefinite"/>
  </polyline>
  <text x="100" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="5.5" font-weight="600" fill="rgba(200,160,255,0.45)" letter-spacing="1.5">PERFORMANCE</text>
</g>

<!-- Brain icon (bottom-left of medal) — cognitive connection -->
<g transform="translate(58,110)" opacity="0.7">
  <path d="M0,0 C-4,-8 -2,-16 4,-16 C8,-16 10,-12 10,-8 C14,-12 18,-10 18,-4 C18,2 14,6 10,8 C6,10 2,8 0,4 Z" fill="rgba(180,130,255,0.25)" stroke="rgba(200,160,255,0.5)" stroke-width="1">
    <animate attributeName="stroke-opacity" values=".3;.7;.3" dur="3s" repeatCount="indefinite"/>
  </path>
</g>

<!-- Lightning bolt (right side) — speed/reaction -->
<g transform="translate(148,95)">
  <animate attributeName="opacity" values=".5;1;.5" dur="1.8s" repeatCount="indefinite"/>
  <polygon points="6,0 2,10 6,10 3,20 12,7 7,7 10,0" fill="rgba(255,220,80,0.85)" stroke="rgba(255,230,120,0.5)" stroke-width="0.5"/>
</g>

<!-- Floating particles -->
<circle cx="75" cy="28" r="2" fill="rgba(200,160,255,0.6)" filter="url(#ath-gf)">
  <animate attributeName="cy" values="28;22;28" dur="2.5s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".4;.8;.4" dur="2.5s" repeatCount="indefinite"/>
</circle>
<circle cx="130" cy="24" r="1.5" fill="rgba(255,210,100,0.5)">
  <animate attributeName="cy" values="24;18;24" dur="3s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".3;.7;.3" dur="3s" repeatCount="indefinite"/>
</circle>
<circle cx="160" cy="110" r="2" fill="rgba(180,120,255,0.5)">
  <animate attributeName="cy" values="110;104;110" dur="2.8s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".3;.6;.3" dur="2.8s" repeatCount="indefinite"/>
</circle>
</svg></div>
      </div>`;
        } else if (!proStack) {
          /* No .pro-stack at all — inject the full block */
          var tmp4 = document.createElement('div');
          tmp4.innerHTML = `<div class="pro-stack">
      
      <div class="pro-card r" style="--c:#7B1FA2">
        <div class="pro-text"><h3 data-i18n="pro.c1.t">Healthcare Professionals</h3><p class="pro-desc" data-i18n="pro.c1.d">Neuropsychological exploration, stimulation, and cognitive rehabilitation. Clinically proven, reimbursable, reliable.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">3,530</span><span class="pm-lbl" data-i18n="pro.c1.l1">Clinicians</span></div><div class="pro-metric"><span class="pm-num">96,110</span><span class="pm-lbl" data-i18n="pro.c1.l2">Patients</span></div></div>
        <a href="https://www.cognifit.com/medical-platform" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#2d004a,#1a0030)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0"><defs><filter id="hc-gf" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<ellipse cx="100" cy="85" rx="60" ry="50" fill="rgba(180,80,255,0.18)"><animate attributeName="rx" values="60;67;60" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".18;.35;.18" dur="3s" repeatCount="indefinite"/></ellipse>
<path d="M65 68 C48 62 38 74 40 88 C42 102 54 112 70 114 C76 115 83 115 90 113 L100 116 L110 113 C117 115 124 115 130 114 C146 112 158 102 160 88 C162 74 152 62 135 68 C131 55 120 48 100 46 C80 48 69 55 65 68Z" fill="rgba(200,130,255,0.1)" stroke="rgba(255,255,255,0.28)" stroke-width="2"><animate attributeName="stroke-opacity" values=".28;.55;.28" dur="2.5s" repeatCount="indefinite"/></path>
<path d="M100 48 Q98 82 100 116" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
<path d="M64 80 Q80 73 96 79 Q108 73 124 79 Q138 73 150 80" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
<path d="M62 97 Q78 90 94 97 Q108 90 124 97 Q138 90 152 97" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
<circle cx="74" cy="74" r="3.5" fill="white"><animate attributeName="r" values="3.5;5.5;3.5" dur="3.5s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;1;.5" dur="3.5s" begin="0s" repeatCount="indefinite"/></circle>
<circle cx="96" cy="62" r="3" fill="white"><animate attributeName="r" values="3;5;3" dur="3.8s" begin=".6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;1;.4" dur="3.8s" begin=".6s" repeatCount="indefinite"/></circle>
<circle cx="122" cy="65" r="3.5" fill="white"><animate attributeName="r" values="3.5;5.5;3.5" dur="3.2s" begin="1.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;1;.5" dur="3.2s" begin="1.2s" repeatCount="indefinite"/></circle>
<circle cx="86" cy="93" r="3" fill="white"><animate attributeName="r" values="3;4.5;3" dur="4s" begin=".3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;1;.4" dur="4s" begin=".3s" repeatCount="indefinite"/></circle>
<circle cx="114" cy="96" r="3.5" fill="white"><animate attributeName="r" values="3.5;5.5;3.5" dur="3.6s" begin="1.7s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;1;.5" dur="3.6s" begin="1.7s" repeatCount="indefinite"/></circle>
<circle cx="140" cy="80" r="3" fill="white"><animate attributeName="r" values="3;5;3" dur="4.2s" begin="1s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;1;.4" dur="4.2s" begin="1s" repeatCount="indefinite"/></circle>
<line x1="74" y1="74" x2="96" y2="62" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="3.5s" begin="0s" repeatCount="indefinite"/></line>
<line x1="96" y1="62" x2="122" y2="65" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="3.8s" begin=".5s" repeatCount="indefinite"/></line>
<line x1="122" y1="65" x2="140" y2="80" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="3.2s" begin="1s" repeatCount="indefinite"/></line>
<line x1="74" y1="74" x2="86" y2="93" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="4s" begin="1.5s" repeatCount="indefinite"/></line>
<line x1="86" y1="93" x2="114" y2="96" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="3.6s" begin=".3s" repeatCount="indefinite"/></line>
<line x1="114" y1="96" x2="140" y2="80" stroke="rgba(255,255,255,.5)" stroke-width="1"><animate attributeName="stroke-opacity" values=".1;.65;.1" dur="4.2s" begin=".8s" repeatCount="indefinite"/></line>
<line x1="96" y1="62" x2="86" y2="93" stroke="rgba(255,255,255,.3)" stroke-width=".8"><animate attributeName="stroke-opacity" values=".05;.4;.05" dur="4.4s" begin="1.3s" repeatCount="indefinite"/></line>
<line x1="122" y1="65" x2="114" y2="96" stroke="rgba(255,255,255,.3)" stroke-width=".8"><animate attributeName="stroke-opacity" values=".05;.4;.05" dur="4s" begin="1.9s" repeatCount="indefinite"/></line>
<circle r="4.5" fill="white" filter="url(#hc-gf)"><animateMotion dur="4.5s" repeatCount="indefinite" path="M74,74 L96,62 L122,65 L140,80 L114,96 L86,93 L74,74"/><animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;.08;.5;.92;1" dur="4.5s" repeatCount="indefinite"/></circle>
<rect x="46" y="133" width="108" height="20" rx="4" fill="rgba(0,0,0,0.38)"/>
<polyline points="46,143 56,143 62,133 68,153 74,136 79,148 85,143 95,143 101,130 108,156 114,134 120,143 130,143 154,143" stroke="rgba(230,180,255,.85)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="165" stroke-dashoffset="165"><animate attributeName="stroke-dashoffset" values="165;-165" dur="3.5s" repeatCount="indefinite"/></polyline>
</svg></div>
      </div>
      
      <div class="pro-card r d1" style="--c:#2E7D32">
        <div class="pro-text"><h3 data-i18n="pro.c2.t">Scientific Research</h3><p class="pro-desc" data-i18n="pro.c2.d">Cognitive Assessment Batteries and brain training for experimental studies. Validated tools for brain-based research.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">735</span><span class="pm-lbl" data-i18n="pro.c2.l1">Researchers</span></div><div class="pro-metric"><span class="pm-num">68,779</span><span class="pm-lbl" data-i18n="pro.c2.l2">Participants</span></div></div>
        <a href="https://www.cognifit.com/cognitive-research-tool" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#0d3310,#051a08)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0"><defs><clipPath id="rc-clip"><rect x="0" y="0" width="200" height="180"/></clipPath></defs>
<rect width="200" height="180" fill="none"/>
<ellipse cx="100" cy="90" rx="45" ry="80" fill="rgba(80,200,100,0.08)"/>
<g clip-path="url(#rc-clip)"><g><animateTransform attributeName="transform" type="translate" values="0,0;0,-60" dur="3s" repeatCount="indefinite" calcMode="linear"/>
<line x1="70" y1="-45" x2="130" y2="-45" stroke="rgba(144,238,144,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="-45" r="3.5" fill="rgba(144,238,144,.9)"/><circle cx="130" cy="-45" r="3.5" fill="rgba(144,238,144,.9)"/>
<line x1="70" y1="-15" x2="130" y2="-15" stroke="rgba(100,200,255,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="-15" r="3.5" fill="rgba(100,200,255,.9)"/><circle cx="130" cy="-15" r="3.5" fill="rgba(100,200,255,.9)"/>
<line x1="70" y1="15" x2="130" y2="15" stroke="rgba(144,238,144,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="15" r="3.5" fill="rgba(144,238,144,.9)"/><circle cx="130" cy="15" r="3.5" fill="rgba(144,238,144,.9)"/>
<line x1="70" y1="45" x2="130" y2="45" stroke="rgba(100,200,255,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="45" r="3.5" fill="rgba(100,200,255,.9)"/><circle cx="130" cy="45" r="3.5" fill="rgba(100,200,255,.9)"/>
<line x1="70" y1="75" x2="130" y2="75" stroke="rgba(144,238,144,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="75" r="3.5" fill="rgba(144,238,144,.9)"/><circle cx="130" cy="75" r="3.5" fill="rgba(144,238,144,.9)"/>
<line x1="70" y1="105" x2="130" y2="105" stroke="rgba(100,200,255,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="105" r="3.5" fill="rgba(100,200,255,.9)"/><circle cx="130" cy="105" r="3.5" fill="rgba(100,200,255,.9)"/>
<line x1="70" y1="135" x2="130" y2="135" stroke="rgba(144,238,144,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="135" r="3.5" fill="rgba(144,238,144,.9)"/><circle cx="130" cy="135" r="3.5" fill="rgba(144,238,144,.9)"/>
<line x1="70" y1="165" x2="130" y2="165" stroke="rgba(100,200,255,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="165" r="3.5" fill="rgba(100,200,255,.9)"/><circle cx="130" cy="165" r="3.5" fill="rgba(100,200,255,.9)"/>
<line x1="70" y1="195" x2="130" y2="195" stroke="rgba(144,238,144,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="195" r="3.5" fill="rgba(144,238,144,.9)"/><circle cx="130" cy="195" r="3.5" fill="rgba(144,238,144,.9)"/>
<line x1="70" y1="225" x2="130" y2="225" stroke="rgba(100,200,255,0.75)" stroke-width="2.5" stroke-linecap="round"/><circle cx="70" cy="225" r="3.5" fill="rgba(100,200,255,.9)"/><circle cx="130" cy="225" r="3.5" fill="rgba(100,200,255,.9)"/>
<path d="M100,-60 C130,-50 130,-40 100,-30 C70,-20 70,-10 100,0 C130,10 130,20 100,30 C70,40 70,50 100,60 C130,70 130,80 100,90 C70,100 70,110 100,120 C130,130 130,140 100,150 C70,160 70,170 100,180 C130,190 130,200 100,210 C70,220 70,230 100,240" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2.5" stroke-linecap="round"/>
<path d="M100,-60 C70,-50 70,-40 100,-30 C130,-20 130,-10 100,0 C70,10 70,20 100,30 C130,40 130,50 100,60 C70,70 70,80 100,90 C130,100 130,110 100,120 C70,130 70,140 100,150 C130,160 130,170 100,180 C70,190 70,200 100,210 C130,220 130,230 100,240" fill="none" stroke="rgba(180,255,180,0.55)" stroke-width="2" stroke-linecap="round"/>
<circle cx="100" cy="-30" r="4.5" fill="white" opacity=".9"/><circle cx="100" cy="0" r="5" fill="white"/><circle cx="100" cy="30" r="4.5" fill="white" opacity=".9"/><circle cx="100" cy="60" r="5" fill="white"/><circle cx="100" cy="90" r="4.5" fill="white" opacity=".9"/><circle cx="100" cy="120" r="5" fill="white"/><circle cx="100" cy="150" r="4.5" fill="white" opacity=".9"/><circle cx="100" cy="180" r="5" fill="white"/><circle cx="100" cy="210" r="4.5" fill="white" opacity=".9"/>
</g></g></svg></div>
      </div>
      
      <div class="pro-card r" style="--c:#00695C">
        <div class="pro-text"><h3 data-i18n="pro.c3.t">Education Professionals</h3><p class="pro-desc" data-i18n="pro.c3.d">Neuropsychological evaluation, stimulation, and cognitive tools for your students in and beyond the classroom.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">1,051</span><span class="pm-lbl" data-i18n="pro.c3.l1">Schools</span></div><div class="pro-metric"><span class="pm-num">18,885</span><span class="pm-lbl" data-i18n="pro.c3.l2">Students</span></div></div>
        <a href="https://www.cognifit.com/educational-technology" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#00251a,#00110d)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<ellipse cx="100" cy="105" rx="55" ry="45" fill="rgba(0,200,160,0.15)"><animate attributeName="opacity" values=".15;.28;.15" dur="3s" repeatCount="indefinite"/></ellipse>
<!-- Left page: curved outward -->
<path d="M100 130 C80 125 58 120 54 115 C50 108 52 88 54 78 C56 70 75 76 100 87 Z" fill="rgba(0,200,160,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linejoin="round"/>
<!-- Right page: curved outward -->
<path d="M100 130 C120 125 142 120 146 115 C150 108 148 88 146 78 C144 70 125 76 100 87 Z" fill="rgba(0,230,180,0.18)" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" stroke-linejoin="round"/>
<!-- Spine -->
<path d="M100 87 C99 100 99 115 100 130" stroke="rgba(255,255,255,0.55)" stroke-width="2" fill="none" stroke-linecap="round"/>
<!-- Left page lines: curved -->
<path d="M63 95 C72 97 84 99 94 101" stroke="rgba(255,255,255,0.25)" stroke-width="1" fill="none" stroke-linecap="round"/>
<path d="M62 103 C72 105 84 107 94 109" stroke="rgba(255,255,255,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>
<path d="M63 111 C72 113 84 115 94 117" stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none" stroke-linecap="round"/>
<!-- Right page lines: curved -->
<path d="M137 95 C128 97 116 99 106 101" stroke="rgba(255,255,255,0.25)" stroke-width="1" fill="none" stroke-linecap="round"/>
<path d="M138 103 C128 105 116 107 106 109" stroke="rgba(255,255,255,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>
<path d="M137 111 C128 113 116 115 106 117" stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none" stroke-linecap="round"/>
<circle cx="85" cy="68" r="3" fill="rgba(100,255,200,0.9)"><animate attributeName="cy" values="68;30;20" dur="2.8s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.6;0" dur="2.8s" begin="0s" repeatCount="indefinite"/><animate attributeName="r" values="3;2;1" dur="2.8s" begin="0s" repeatCount="indefinite"/></circle>
<circle cx="100" cy="58" r="2.5" fill="rgba(200,255,230,0.9)"><animate attributeName="cy" values="58;22;12" dur="2.4s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;0" dur="2.4s" begin=".5s" repeatCount="indefinite"/><animate attributeName="r" values="2.5;1.5;0.5" dur="2.4s" begin=".5s" repeatCount="indefinite"/></circle>
<circle cx="115" cy="65" r="3.5" fill="rgba(80,255,180,0.9)"><animate attributeName="cy" values="65;28;15" dur="3s" begin=".2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.6;0" dur="3s" begin=".2s" repeatCount="indefinite"/><animate attributeName="r" values="3.5;2;0.8" dur="3s" begin=".2s" repeatCount="indefinite"/></circle>
<circle cx="92" cy="52" r="2" fill="rgba(180,255,210,0.85)"><animate attributeName="cy" values="52;18;8" dur="2.6s" begin=".9s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;0" dur="2.6s" begin=".9s" repeatCount="indefinite"/></circle>
<circle cx="108" cy="45" r="2.5" fill="rgba(120,255,200,0.9)"><animate attributeName="cy" values="45;12;2" dur="3.2s" begin=".4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.4;0" dur="3.2s" begin=".4s" repeatCount="indefinite"/></circle>
<circle cx="78" cy="55" r="2" fill="rgba(200,255,220,0.8)"><animate attributeName="cy" values="55;25;14" dur="2.9s" begin="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;0" dur="2.9s" begin="1.1s" repeatCount="indefinite"/></circle>
<circle cx="122" cy="50" r="3" fill="rgba(60,255,170,0.9)"><animate attributeName="cy" values="50;16;4" dur="2.7s" begin=".7s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.6;0" dur="2.7s" begin=".7s" repeatCount="indefinite"/><animate attributeName="r" values="3;1.8;0.6" dur="2.7s" begin=".7s" repeatCount="indefinite"/></circle>
<polygon points="100,35 101.5,39.5 106,39.5 102.3,42 103.7,46.5 100,44 96.3,46.5 97.7,42 94,39.5 98.5,39.5" fill="rgba(255,255,200,0.9)"><animate attributeName="opacity" values="0;1;0" dur="2s" begin="0s" repeatCount="indefinite"/><animate attributeName="transform" attributeType="XML" type="translate" values="0,0;0,-8" dur="2s" begin="0s" repeatCount="indefinite"/></polygon>
<polygon points="72,42 73,45.5 76.5,45.5 73.8,47.3 74.8,50.8 72,49 69.2,50.8 70.2,47.3 67.5,45.5 71,45.5" fill="rgba(255,240,150,0.85)"><animate attributeName="opacity" values="0;1;0" dur="2.3s" begin=".8s" repeatCount="indefinite"/><animate attributeName="transform" attributeType="XML" type="translate" values="0,0;0,-10" dur="2.3s" begin=".8s" repeatCount="indefinite"/></polygon>
<polygon points="128,38 129,41.5 132.5,41.5 129.8,43.3 130.8,46.8 128,45 125.2,46.8 126.2,43.3 123.5,41.5 127,41.5" fill="rgba(255,230,120,0.85)"><animate attributeName="opacity" values="0;1;0" dur="2.6s" begin=".3s" repeatCount="indefinite"/><animate attributeName="transform" attributeType="XML" type="translate" values="0,0;0,-12" dur="2.6s" begin=".3s" repeatCount="indefinite"/></polygon>
</svg></div>
      </div>
      
      <div class="pro-card r d1" style="--c:#880E4F">
        <div class="pro-text"><h3 data-i18n="pro.c4.t">Employee Wellbeing</h3><p class="pro-desc" data-i18n="pro.c4.d">Online mental wellness platform giving everyone the power to improve with simple tools for wellbeing and performance.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">22</span><span class="pm-lbl" data-i18n="pro.c4.l1">Companies</span></div><div class="pro-metric"><span class="pm-num">164</span><span class="pm-lbl" data-i18n="pro.c4.l2">Employees</span></div></div>
        <a href="https://www.cognifit.com/employee-wellbeing" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#2d0019,#18000d)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<ellipse cx="100" cy="95" rx="65" ry="52" fill="rgba(255,80,150,0.12)"><animate attributeName="opacity" values=".12;.25;.12" dur="3s" repeatCount="indefinite"/></ellipse>
<line x1="48" y1="145" x2="155" y2="145" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
<rect x="56" y="125" width="20" height="20" rx="3" fill="rgba(255,100,160,0.6)" stroke="rgba(255,130,180,0.5)" stroke-width="1">
  <animate attributeName="y" values="135;125;135" dur="2.5s" begin="0s" repeatCount="indefinite"/>
  <animate attributeName="height" values="10;20;10" dur="2.5s" begin="0s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".5;.85;.5" dur="2.5s" begin="0s" repeatCount="indefinite"/>
</rect>
<rect x="84" y="105" width="20" height="40" rx="3" fill="rgba(255,130,180,0.65)" stroke="rgba(255,160,200,0.5)" stroke-width="1">
  <animate attributeName="y" values="120;105;120" dur="2.5s" begin=".3s" repeatCount="indefinite"/>
  <animate attributeName="height" values="25;40;25" dur="2.5s" begin=".3s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".55;.9;.55" dur="2.5s" begin=".3s" repeatCount="indefinite"/>
</rect>
<rect x="112" y="82" width="20" height="63" rx="3" fill="rgba(255,160,200,0.7)" stroke="rgba(255,190,220,0.5)" stroke-width="1">
  <animate attributeName="y" values="102;82;102" dur="2.5s" begin=".6s" repeatCount="indefinite"/>
  <animate attributeName="height" values="43;63;43" dur="2.5s" begin=".6s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".6;1;.6" dur="2.5s" begin=".6s" repeatCount="indefinite"/>
</rect>
<polyline points="66,130 94,115 122,95" fill="none" stroke="rgba(255,220,235,0.7)" stroke-width="2" stroke-linecap="round" stroke-dasharray="90" stroke-dashoffset="90"><animate attributeName="stroke-dashoffset" values="90;0;0" keyTimes="0;.5;1" dur="2.5s" repeatCount="indefinite"/></polyline>
<g opacity="0"><animate attributeName="opacity" values="0;0;0.7;0.7;0" keyTimes="0;.45;.55;.95;1" dur="2.5s" repeatCount="indefinite"/>
<!-- dot instead of triangle arrow -->
<circle cx="122" cy="93" r="4" fill="rgba(255,210,230,0.85)"/></g>
<circle cx="66" cy="56" r="9" fill="none" stroke="rgba(255,130,180,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.5s" begin="0s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".6;1;.6" dur="2.5s" begin="0s" repeatCount="indefinite"/></circle>
<circle cx="66" cy="53" r="4" fill="rgba(255,160,200,0.8)"/>
<path d="M58 66 Q66 62 74 66" fill="none" stroke="rgba(255,160,200,0.8)" stroke-width="1.5" stroke-linecap="round"/>
<circle cx="100" cy="52" r="9" fill="none" stroke="rgba(255,160,200,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.5s" begin=".4s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".6;1;.6" dur="2.5s" begin=".4s" repeatCount="indefinite"/></circle>
<circle cx="100" cy="49" r="4" fill="rgba(255,190,220,0.85)"/>
<path d="M92 62 Q100 58 108 62" fill="none" stroke="rgba(255,190,220,0.85)" stroke-width="1.5" stroke-linecap="round"/>
<circle cx="134" cy="56" r="9" fill="none" stroke="rgba(255,190,220,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.5s" begin=".8s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".6;1;.6" dur="2.5s" begin=".8s" repeatCount="indefinite"/></circle>
<circle cx="134" cy="53" r="4" fill="rgba(255,210,230,0.85)"/>
<path d="M126 66 Q134 62 142 66" fill="none" stroke="rgba(255,210,230,0.85)" stroke-width="1.5" stroke-linecap="round"/>
<path d="M74 55 Q83 48 92 52" fill="none" stroke="rgba(255,150,190,0.4)" stroke-width="1.2" stroke-dasharray="20" stroke-dashoffset="20"><animate attributeName="stroke-dashoffset" values="20;0;20" dur="2s" begin=".2s" repeatCount="indefinite"/></path>
<path d="M108 52 Q121 46 126 54" fill="none" stroke="rgba(255,170,210,0.4)" stroke-width="1.2" stroke-dasharray="20" stroke-dashoffset="20"><animate attributeName="stroke-dashoffset" values="20;0;20" dur="2s" begin=".6s" repeatCount="indefinite"/></path>
</svg></div>
      </div>

      <!-- Clinical Trials -->
      <div class="pro-card r d2" style="--c:#B45309">
        <div class="pro-text"><h3 data-i18n="pro.c5.t">Clinical Trials</h3><p class="pro-desc" data-i18n="pro.c5.d">Validated cognitive outcome measures for clinical research. FDA-recognized digital endpoints for neurological and psychiatric trials.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">1,083</span><span class="pm-lbl" data-i18n="pro.c5.l1">Clinical Trials</span></div><div class="pro-metric"><span class="pm-num">29,144</span><span class="pm-lbl" data-i18n="pro.c5.l2">Participants</span></div></div>
        <a href="https://www.cognifit.com/clinical-trials" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#2d1500,#180a00)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<ellipse cx="100" cy="100" rx="60" ry="48" fill="rgba(210,120,0,0.12)"><animate attributeName="opacity" values=".12;.25;.12" dur="3.2s" repeatCount="indefinite"/></ellipse>
<!-- Test tube left -->
<rect x="68" y="65" width="14" height="52" rx="7" fill="rgba(210,140,0,0.3)" stroke="rgba(255,190,80,0.6)" stroke-width="1.5"/>
<rect x="69" y="95" width="12" height="22" rx="6" fill="rgba(255,160,0,0.55)"><animate attributeName="height" values="14;22;14" dur="2.4s" begin="0s" repeatCount="indefinite"/><animate attributeName="y" values="103;95;103" dur="2.4s" begin="0s" repeatCount="indefinite"/></rect>
<!-- Test tube right -->
<rect x="90" y="58" width="14" height="60" rx="7" fill="rgba(240,160,20,0.28)" stroke="rgba(255,210,80,0.55)" stroke-width="1.5"/>
<rect x="91" y="92" width="12" height="26" rx="6" fill="rgba(255,190,40,0.6)"><animate attributeName="height" values="16;26;16" dur="2.8s" begin=".4s" repeatCount="indefinite"/><animate attributeName="y" values="102;92;102" dur="2.8s" begin=".4s" repeatCount="indefinite"/></rect>
<!-- Test tube right 2 -->
<rect x="112" y="62" width="14" height="56" rx="7" fill="rgba(220,130,0,0.25)" stroke="rgba(255,180,60,0.5)" stroke-width="1.5"/>
<rect x="113" y="94" width="12" height="24" rx="6" fill="rgba(255,170,20,0.58)"><animate attributeName="height" values="12;24;12" dur="3s" begin=".8s" repeatCount="indefinite"/><animate attributeName="y" values="106;94;106" dur="3s" begin=".8s" repeatCount="indefinite"/></rect>
<!-- Bubbles -->
<circle cx="75" cy="90" r="2" fill="rgba(255,220,100,0.8)"><animate attributeName="cy" values="90;68;60" dur="2s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;0" dur="2s" begin="0s" repeatCount="indefinite"/></circle>
<circle cx="97" cy="85" r="1.5" fill="rgba(255,230,120,0.8)"><animate attributeName="cy" values="85;62;52" dur="2.5s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.4;0" dur="2.5s" begin=".5s" repeatCount="indefinite"/></circle>
<circle cx="119" cy="88" r="2" fill="rgba(255,210,80,0.8)"><animate attributeName="cy" values="88;65;55" dur="2.2s" begin=".3s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.5;0" dur="2.2s" begin=".3s" repeatCount="indefinite"/></circle>
<!-- Star/plus markers -->
<text x="87" y="52" font-size="10" fill="rgba(255,220,100,0.9)" text-anchor="middle"><animate attributeName="opacity" values="0;1;0" dur="1.8s" begin=".2s" repeatCount="indefinite"/>✦</text>
<text x="113" y="48" font-size="8" fill="rgba(255,200,80,0.85)" text-anchor="middle"><animate attributeName="opacity" values="0;1;0" dur="2.1s" begin=".9s" repeatCount="indefinite"/>✦</text>
</svg></div>
      </div>

      <!-- White Label Partnerships -->
      <div class="pro-card r d3" style="--c:#1565C0">
        <div class="pro-text"><h3 data-i18n="pro.c6.t">White Label Partnerships</h3><p class="pro-desc" data-i18n="pro.c6.d">Integrate CogniFit's cognitive technology into your own platform. Full SDK, custom branding, and dedicated support.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">48</span><span class="pm-lbl" data-i18n="pro.c6.l1">Partners</span></div><div class="pro-metric"><span class="pm-num">1,067,759</span><span class="pm-lbl" data-i18n="pro.c6.l2">Users</span></div></div>
        <a href="https://www.cognifit.com/partners-integration-platform" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#001a40,#000d24)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<ellipse cx="100" cy="100" rx="65" ry="50" fill="rgba(30,100,255,0.1)"><animate attributeName="opacity" values=".1;.22;.1" dur="3s" repeatCount="indefinite"/></ellipse>
<!-- Central hub -->
<circle cx="100" cy="95" r="14" fill="rgba(26,115,232,0.4)" stroke="rgba(80,160,255,0.7)" stroke-width="2"><animate attributeName="r" values="14;16;14" dur="2.5s" repeatCount="indefinite"/></circle>
<circle cx="100" cy="95" r="6" fill="rgba(130,190,255,0.9)"/>
<!-- Nodes -->
<circle cx="60" cy="65" r="9" fill="rgba(26,80,200,0.45)" stroke="rgba(100,170,255,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.2s" begin="0s" repeatCount="indefinite"/></circle>
<circle cx="140" cy="65" r="9" fill="rgba(26,80,200,0.45)" stroke="rgba(100,170,255,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.6s" begin=".4s" repeatCount="indefinite"/></circle>
<circle cx="58" cy="128" r="9" fill="rgba(26,80,200,0.45)" stroke="rgba(100,170,255,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.4s" begin=".8s" repeatCount="indefinite"/></circle>
<circle cx="142" cy="128" r="9" fill="rgba(26,80,200,0.45)" stroke="rgba(100,170,255,0.6)" stroke-width="1.5"><animate attributeName="r" values="9;11;9" dur="2.8s" begin=".2s" repeatCount="indefinite"/></circle>
<!-- Connecting lines with traveling dots -->
<line x1="68" y1="70" x2="88" y2="88" stroke="rgba(80,160,255,0.35)" stroke-width="1.2"/>
<circle r="2" fill="rgba(150,210,255,0.9)"><animateMotion path="M68,70 L88,88" dur="1.8s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin="0s" repeatCount="indefinite"/></circle>
<line x1="132" y1="70" x2="112" y2="88" stroke="rgba(80,160,255,0.35)" stroke-width="1.2"/>
<circle r="2" fill="rgba(150,210,255,0.9)"><animateMotion path="M132,70 L112,88" dur="2.2s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="2.2s" begin=".5s" repeatCount="indefinite"/></circle>
<line x1="66" y1="122" x2="88" y2="103" stroke="rgba(80,160,255,0.35)" stroke-width="1.2"/>
<circle r="2" fill="rgba(150,210,255,0.9)"><animateMotion path="M66,122 L88,103" dur="2s" begin="1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="2s" begin="1s" repeatCount="indefinite"/></circle>
<line x1="134" y1="122" x2="112" y2="103" stroke="rgba(80,160,255,0.35)" stroke-width="1.2"/>
<circle r="2" fill="rgba(150,210,255,0.9)"><animateMotion path="M134,122 L112,103" dur="1.6s" begin=".3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin=".3s" repeatCount="indefinite"/></circle>
</svg></div>
      </div>

      <!-- Athletes -->
      <div class="pro-card r d4" style="--c:#4A148C">
        <div class="pro-text"><h3 data-i18n="pro.c7.t">Athletes</h3><p class="pro-desc" data-i18n="pro.c7.d">Peak cognitive performance for elite sport. Reaction time, focus under pressure, and decision-making training for competitive athletes.</p><div class="pro-metrics"><div class="pro-metric"><span class="pm-num">4</span><span class="pm-lbl" data-i18n="pro.c7.l1">Coaches</span></div><div class="pro-metric"><span class="pm-num">12</span><span class="pm-lbl" data-i18n="pro.c7.l2">Athletes</span></div></div>
        <a href="https://www.cognifit.com/sports" class="pro-cta" target="_blank" rel="noopener noreferrer" data-i18n="pro.cta" data-i18n-html>Explore <span>→</span></a>
        </div>
        <div class="pro-photo" style="background:linear-gradient(135deg,#120026,#080014)"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<defs>
  <radialGradient id="ath-bg" cx="50%" cy="50%" r="55%">
    <stop offset="0%" stop-color="rgba(140,60,255,0.3)"/>
    <stop offset="100%" stop-color="rgba(80,0,160,0)"/>
  </radialGradient>
  <filter id="ath-gf" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="3" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>

<!-- Background glow -->
<ellipse cx="100" cy="90" rx="70" ry="56" fill="url(#ath-bg)">
  <animate attributeName="rx" values="70;76;70" dur="3.5s" repeatCount="indefinite"/>
</ellipse>

<!-- Medal (centre) — gold with ribbon -->
<g transform="translate(100,72)">
  <!-- Ribbon -->
  <path d="M-12,-28 L-8,0 L0,-8 L8,0 L12,-28" fill="rgba(180,100,255,0.5)" stroke="rgba(200,140,255,0.6)" stroke-width="1"/>
  <!-- Medal circle -->
  <circle cx="0" cy="8" r="22" fill="rgba(255,200,60,0.2)" stroke="rgba(255,210,80,0.7)" stroke-width="2">
    <animate attributeName="stroke-opacity" values=".5;1;.5" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="0" cy="8" r="16" fill="none" stroke="rgba(255,220,100,0.4)" stroke-width="1"/>
  <!-- Star inside medal -->
  <polygon points="0,-8 2.4,-2.4 8.4,-2.4 3.6,1.6 5.2,8 0,4 -5.2,8 -3.6,1.6 -8.4,-2.4 -2.4,-2.4" fill="rgba(255,220,100,0.85)">
    <animate attributeName="opacity" values=".7;1;.7" dur="2.5s" repeatCount="indefinite"/>
  </polygon>
  <!-- Medal glow pulse -->
  <circle cx="0" cy="8" r="22" fill="none" stroke="rgba(255,210,80,0.25)" stroke-width="1">
    <animate attributeName="r" values="22;30;22" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values=".4;0;.4" dur="3s" repeatCount="indefinite"/>
  </circle>
</g>

<!-- Target/crosshair (top-left) — precision -->
<g transform="translate(48,42)" opacity="0.8">
  <animate attributeName="opacity" values=".6;.9;.6" dur="3s" repeatCount="indefinite"/>
  <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(180,120,255,0.5)" stroke-width="1.5"/>
  <circle cx="0" cy="0" r="8" fill="none" stroke="rgba(180,120,255,0.35)" stroke-width="1"/>
  <circle cx="0" cy="0" r="2.5" fill="rgba(200,150,255,0.8)"/>
  <line x1="-18" y1="0" x2="-10" y2="0" stroke="rgba(180,120,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="10" y1="0" x2="18" y2="0" stroke="rgba(180,120,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="0" y1="-18" x2="0" y2="-10" stroke="rgba(180,120,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="0" y1="10" x2="0" y2="18" stroke="rgba(180,120,255,0.4)" stroke-width="1.2" stroke-linecap="round"/>
</g>

<!-- Stopwatch (top-right) — reaction time -->
<g transform="translate(155,38)">
  <animate attributeName="opacity" values=".6;1;.6" dur="2.5s" repeatCount="indefinite"/>
  <circle cx="0" cy="0" r="13" fill="rgba(140,60,255,0.15)" stroke="rgba(200,150,255,0.6)" stroke-width="1.5"/>
  <line x1="0" y1="-13" x2="0" y2="-18" stroke="rgba(200,150,255,0.5)" stroke-width="2" stroke-linecap="round"/>
  <line x1="-3" y1="-17" x2="3" y2="-17" stroke="rgba(200,150,255,0.5)" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Clock hands -->
  <line x1="0" y1="-1" x2="0" y2="-8" stroke="rgba(255,220,100,0.9)" stroke-width="1.5" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="4s" repeatCount="indefinite"/>
  </line>
  <line x1="0" y1="0" x2="5" y2="-3" stroke="rgba(200,160,255,0.7)" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="0" cy="0" r="2" fill="rgba(255,220,100,0.8)"/>
</g>

<!-- EKG/heartbeat line (bottom) — performance monitor -->
<g transform="translate(0,0)">
  <rect x="35" y="128" width="130" height="28" rx="5" fill="rgba(0,0,0,0.3)"/>
  <polyline points="38,142 52,142 58,142 64,132 70,152 76,135 82,146 88,142 100,142 106,142 112,132 118,152 124,135 130,146 136,142 150,142 162,142" stroke="rgba(200,140,255,0.8)" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="140" stroke-dashoffset="140">
    <animate attributeName="stroke-dashoffset" values="140;-140" dur="3s" repeatCount="indefinite"/>
  </polyline>
  <text x="100" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="5.5" font-weight="600" fill="rgba(200,160,255,0.45)" letter-spacing="1.5">PERFORMANCE</text>
</g>

<!-- Brain icon (bottom-left of medal) — cognitive connection -->
<g transform="translate(58,110)" opacity="0.7">
  <path d="M0,0 C-4,-8 -2,-16 4,-16 C8,-16 10,-12 10,-8 C14,-12 18,-10 18,-4 C18,2 14,6 10,8 C6,10 2,8 0,4 Z" fill="rgba(180,130,255,0.25)" stroke="rgba(200,160,255,0.5)" stroke-width="1">
    <animate attributeName="stroke-opacity" values=".3;.7;.3" dur="3s" repeatCount="indefinite"/>
  </path>
</g>

<!-- Lightning bolt (right side) — speed/reaction -->
<g transform="translate(148,95)">
  <animate attributeName="opacity" values=".5;1;.5" dur="1.8s" repeatCount="indefinite"/>
  <polygon points="6,0 2,10 6,10 3,20 12,7 7,7 10,0" fill="rgba(255,220,80,0.85)" stroke="rgba(255,230,120,0.5)" stroke-width="0.5"/>
</g>

<!-- Floating particles -->
<circle cx="75" cy="28" r="2" fill="rgba(200,160,255,0.6)" filter="url(#ath-gf)">
  <animate attributeName="cy" values="28;22;28" dur="2.5s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".4;.8;.4" dur="2.5s" repeatCount="indefinite"/>
</circle>
<circle cx="130" cy="24" r="1.5" fill="rgba(255,210,100,0.5)">
  <animate attributeName="cy" values="24;18;24" dur="3s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".3;.7;.3" dur="3s" repeatCount="indefinite"/>
</circle>
<circle cx="160" cy="110" r="2" fill="rgba(180,120,255,0.5)">
  <animate attributeName="cy" values="110;104;110" dur="2.8s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".3;.6;.3" dur="2.8s" repeatCount="indefinite"/>
</circle>
</svg></div>
      </div>
    </div>`;
          while (tmp4.firstChild) {
            proSection.appendChild(tmp4.firstChild);
          }
        }
      }
    }
  }

  /* ── 5. Discover / Skills Panel ── */
  if (!document.querySelector('.skills-panel')) {
    var discoverSec = null;
    document.querySelectorAll('section .wrap').forEach(function(w){
      var h = w.querySelector('h2');
      if (h && /discover|strengths|brain.*skills/i.test(h.textContent)) discoverSec = w;
    });
    if (discoverSec) {
      var sp = document.createElement('div');
      sp.className = 'skills-panel r d2';
      sp.innerHTML = '<div class="panel-lbl" data-i18n="discover.panel">Cognitive Skills</div>'
        + '<div class="sk-row"><div class="sk-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg></div><div style="flex:1"><div class="sk-name" data-i18n="discover.sk1">Contextual Memory</div><div class="sk-score">620 / 800</div><div class="sk-track"><div class="sk-fill" style="width:77.5%"></div></div></div></div>'
        + '<div class="sk-row"><div class="sk-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M20.188 10.934a8.981 8.981 0 0 1 0 2.132c-1.159 4.015-4.6 6.934-8.188 6.934s-7.029-2.919-8.188-6.934a8.981 8.981 0 0 1 0-2.132C4.971 6.919 8.412 4 12 4s7.029 2.919 8.188 6.934z"/></svg></div><div style="flex:1"><div class="sk-name" data-i18n="discover.sk2">Hand-eye Coordination</div><div class="sk-score">480 / 800</div><div class="sk-track"><div class="sk-fill" style="width:60%"></div></div></div></div>'
        + '<div class="sk-row"><div class="sk-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div><div style="flex:1"><div class="sk-name" data-i18n="discover.sk3">Planning</div><div class="sk-score">450 / 800</div><div class="sk-track"><div class="sk-fill" style="width:56%"></div></div></div></div>'
        + '<div class="sk-row"><div class="sk-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg></div><div style="flex:1"><div class="sk-name" data-i18n="discover.sk4">Working Memory</div><div class="sk-score">443 / 800</div><div class="sk-track"><div class="sk-fill" style="width:55%"></div></div></div></div>';
      var discoverCta = discoverSec.querySelector('.btn-center, .btn-secondary');
      if (discoverCta) discoverSec.insertBefore(sp, discoverCta.closest('.btn-center') || discoverCta);
      else discoverSec.appendChild(sp);
    }
  }

  /* ── 6. Platform / How It Works (4 step-cards) ── */
  if (!document.querySelector('.steps-grid')) {
    var platSec = document.querySelector('#platform .wrap') || null;
    if (!platSec) {
      document.querySelectorAll('section .wrap').forEach(function(w){
        var h = w.querySelector('h2');
        if (h && /platform|how.*works|brain.*training.*platform/i.test(h.textContent)) platSec = w;
      });
    }
    if (platSec) {
      var sg = document.createElement('div');
      sg.className = 'steps-grid';
      sg.innerHTML = '<div class="step-card r"><div class="step-n">01</div><h3 data-i18n="plat.s1.t">Assess Your Brain</h3><p data-i18n="plat.s1.d">Scientifically validated cognitive assessment to establish your baseline.</p><div class="step-checks"><div class="step-chk" data-i18n="plat.s1.c1">Measure attention, memory & executive function</div><div class="step-chk" data-i18n="plat.s1.c2">Get a clear cognitive baseline</div></div></div>'
        + '<div class="step-card r d1"><div class="step-n">02</div><h3 data-i18n="plat.s2.t">Get a Personalized Program</h3><p data-i18n="plat.s2.d">AI adapts training specifically to your unique brain profile.</p><div class="step-checks"><div class="step-chk" data-i18n="plat.s2.c1">Targets your weakest areas first</div><div class="step-chk" data-i18n="plat.s2.c2">Adjusts difficulty continuously</div><div class="step-chk" data-i18n="plat.s2.c3">Optimizes results over time</div></div></div>'
        + '<div class="step-card r d2"><div class="step-n">03</div><h3 data-i18n="plat.s3.t">Train What Matters</h3><p data-i18n="plat.s3.d">Short, engaging sessions designed for real-life impact.</p><div class="step-checks"><div class="step-chk" data-i18n="plat.s3.c1">Improve focus & attention</div><div class="step-chk" data-i18n="plat.s3.c2">Strengthen working memory</div><div class="step-chk" data-i18n="plat.s3.c3">Enhance decision-making</div></div></div>'
        + '<div class="step-card r d3"><div class="step-n">04</div><h3 data-i18n="plat.s4.t">Track Your Cognitive Age</h3><p data-i18n="plat.s4.d">Clear reports showing how your brain evolves over time.</p><div class="step-checks"><div class="step-chk" data-i18n="plat.s4.c1">Monitor progress visually</div><div class="step-chk" data-i18n="plat.s4.c2">Stay motivated with milestones</div><div class="step-chk" data-i18n="plat.s4.c3">Build lasting brain habits</div></div></div>';
      var platCta = platSec.querySelector('.btn-center, .btn-primary');
      if (platCta) platSec.insertBefore(sg, platCta.closest('.btn-center,.tc') || platCta);
      else platSec.appendChild(sg);
    }
  }

  /* ── 7. Outcomes section (charts + pills + hi-boxes) ── */
  if (!document.querySelector('.hi-charts')) {
    var outSec = null;
    document.querySelectorAll('section .wrap').forEach(function(w){
      var h = w.querySelector('h2');
      if (h && /results|outcomes|delivers|brain.*training.*delivers/i.test(h.textContent)) outSec = w;
    });
    if (outSec) {
      var g2 = outSec.querySelector('.g2');
      var target = g2 ? g2 : outSec;
      if (!target.querySelector('.pill-wrap')) {
        var pills = document.createElement('div');
        pills.className = 'pill-wrap';
        pills.innerHTML = '<div class="out-pill" data-i18n="out.p1">Better mental clarity</div><div class="out-pill" data-i18n="out.p2">Faster thinking</div><div class="out-pill" data-i18n="out.p3">Improved focus</div><div class="out-pill" data-i18n="out.p4">Stronger decisions</div><div class="out-pill" data-i18n="out.p5">Greater independence</div>';
        var outLead = target.querySelector('.lead-drk, .lead, p');
        if (outLead) outLead.parentElement.insertBefore(pills, outLead.nextSibling);
        else target.appendChild(pills);
      }
      if (!target.querySelector('.hi-charts')) {
        var charts = document.createElement('div');
        charts.className = 'r d2';
        charts.innerHTML = '<div class="hi-charts">'
          + '<div class="hi-chart"><div class="hi-chart-label" data-i18n="out.chart1">Memory Score</div><svg class="hi-chart-svg" viewBox="0 0 140 96" fill="none" aria-hidden="true"><defs><linearGradient id="mem-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a73e8" stop-opacity=".3"/><stop offset="100%" stop-color="#1a73e8" stop-opacity="0"/></linearGradient></defs><line x1="8" y1="18" x2="132" y2="18" stroke="rgba(0,0,0,.07)" stroke-width="1"/><line x1="8" y1="36" x2="132" y2="36" stroke="rgba(0,0,0,.07)" stroke-width="1"/><line x1="8" y1="54" x2="132" y2="54" stroke="rgba(0,0,0,.07)" stroke-width="1"/><line x1="8" y1="72" x2="132" y2="72" stroke="rgba(0,0,0,.07)" stroke-width="1"/><path d="M8,75 C28,72 48,64 68,52 C88,40 110,28 132,14 L132,82 L8,82 Z" fill="url(#mem-g)"/><path d="M8,75 C28,72 48,64 68,52 C88,40 110,28 132,14" stroke="#1a73e8" stroke-width="2.5" stroke-linecap="round"/><circle cx="8" cy="75" r="3.5" fill="#1a73e8"/><circle cx="39" cy="66" r="3.5" fill="#1a73e8"/><circle cx="70" cy="52" r="3.5" fill="#1a73e8"/><circle cx="101" cy="34" r="3.5" fill="#1a73e8"/><circle cx="132" cy="14" r="3.5" fill="#1a73e8"/><text x="8" y="93" font-family="sans-serif" font-size="8" fill="rgba(0,0,0,.4)" data-i18n="chart.week1">Week 1</text><text x="104" y="93" font-family="sans-serif" font-size="8" fill="rgba(0,0,0,.4)" data-i18n="chart.week8">Week 8</text><rect x="92" y="3" width="38" height="13" rx="6" fill="rgba(26,115,232,.12)"/><text x="111" y="13" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="700" fill="#1a73e8">+24%</text></svg></div>'
          + '<div class="hi-chart"><div class="hi-chart-label" data-i18n="out.chart2">Attention &amp; Focus</div><svg class="hi-chart-svg" viewBox="0 0 140 96" fill="none" aria-hidden="true"><defs><linearGradient id="att-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#34A853" stop-opacity=".9"/><stop offset="100%" stop-color="#34A853" stop-opacity=".3"/></linearGradient></defs><line x1="8" y1="18" x2="132" y2="18" stroke="rgba(0,0,0,.07)" stroke-width="1"/><line x1="8" y1="36" x2="132" y2="36" stroke="rgba(0,0,0,.07)" stroke-width="1"/><line x1="8" y1="54" x2="132" y2="54" stroke="rgba(0,0,0,.07)" stroke-width="1"/><line x1="8" y1="72" x2="132" y2="72" stroke="rgba(0,0,0,.07)" stroke-width="1"/><rect x="10" y="70" width="17" height="12" rx="3.5" fill="url(#att-g)" opacity=".45"/><rect x="33" y="61" width="17" height="21" rx="3.5" fill="url(#att-g)" opacity=".58"/><rect x="56" y="48" width="17" height="34" rx="3.5" fill="url(#att-g)" opacity=".72"/><rect x="79" y="34" width="17" height="48" rx="3.5" fill="url(#att-g)" opacity=".86"/><rect x="102" y="18" width="17" height="64" rx="3.5" fill="url(#att-g)"/><text x="18" y="93" text-anchor="middle" font-family="sans-serif" font-size="8" fill="rgba(0,0,0,.4)" data-i18n="chart.w1">W1</text><text x="110" y="93" text-anchor="middle" font-family="sans-serif" font-size="8" fill="rgba(0,0,0,.4)" data-i18n="chart.w8">W8</text><rect x="92" y="3" width="38" height="13" rx="6" fill="rgba(52,168,83,.12)"/><text x="111" y="13" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="700" fill="#34A853">+31%</text></svg></div>'
          + '</div>'
          + '<div class="hi-box"><h3 data-i18n="out.box1.t">This Isn\'t Just Brain Training. It\'s Cognitive Longevity</h3><div class="hi-it" data-i18n="out.box1.i1">Staying sharp at 50, 60, 70 and beyond</div><div class="hi-it" data-i18n="out.box1.i2">Making better life decisions, every day</div><div class="hi-it" data-i18n="out.box1.i3">Maintaining full autonomy as you age</div><div class="hi-it" data-i18n="out.box1.i4">Reducing your long-term cognitive risk</div><div class="hi-close" data-i18n="out.box1.c" data-i18n-html>It\'s not about adding years to your life.<br><strong>It\'s about adding clarity, control, and independence to those years.</strong></div></div>'
          + '<div class="hi-box" style="margin-top:clamp(16px,3vw,24px);background:rgba(26,115,232,0.04);border-color:rgba(26,115,232,0.15)"><h3 data-i18n="out.box2.t">When Will You See Results?</h3><div class="hi-it" data-i18n="out.box2.i1" data-i18n-html><strong>Week 1-2:</strong> Baseline assessment complete. You\'ll know exactly where you stand across 20+ cognitive skills</div><div class="hi-it" data-i18n="out.box2.i2" data-i18n-html><strong>Week 2-4:</strong> Most users report feeling sharper, with faster recall, better focus in conversations, and clearer thinking</div><div class="hi-it" data-i18n="out.box2.i3" data-i18n-html><strong>Week 4-8:</strong> Measurable improvement in trained cognitive domains, tracked in your personal dashboard</div><div class="hi-it" data-i18n="out.box2.i4" data-i18n-html><strong>Month 3+:</strong> Compounding gains. The ACTIVE trial found structured training benefits last 5-10 years</div><div class="hi-close" data-i18n="out.box2.c" data-i18n-html>Just 15-20 minutes, 3-4 times per week. <strong>Consistency is the key to cognitive longevity.</strong></div></div>';
        target.appendChild(charts);
      }
    }
  }

  /* ── 8. Who Benefits (4 who-cards) ── */
  if (!document.querySelector('.who-grid')) {
    var whoSec = null;
    document.querySelectorAll('section .wrap').forEach(function(w){
      var h = w.querySelector('h2');
      if (h && /who.*benefits|your.*profile|cognitive.*training.*aging/i.test(h.textContent)) whoSec = w;
    });
    if (whoSec) {
      var wg = document.createElement('div');
      wg.className = 'who-grid';
      wg.innerHTML = '<div class="who-card r"><div class="who-icon" aria-hidden="true" style="font-size:2.5rem;display:flex;align-items:center;justify-content:center">\uD83E\uDDD1\u200D\uD83D\uDCBC</div><h3 data-i18n="who.c1.t">Adults 35+</h3><p data-i18n="who.c1.d">Processing speed peaks in your late 20s and begins declining from 35. Early cognitive training builds neural reserves that protect your independence for decades.</p></div>'
        + '<div class="who-card r d1"><div class="who-icon" aria-hidden="true" style="font-size:2.5rem;display:flex;align-items:center;justify-content:center">\uD83D\uDCBB</div><h3 data-i18n="who.c2.t">Professionals</h3><p data-i18n="who.c2.d">Executive function, working memory, and sustained attention directly impact career performance. CogniFit targets these high-demand cognitive skills.</p></div>'
        + '<div class="who-card r d2"><div class="who-icon" aria-hidden="true" style="font-size:2.5rem;display:flex;align-items:center;justify-content:center">\uD83E\uDDEC</div><h3 data-i18n="who.c3.t">Prevention-Minded</h3><p data-i18n="who.c3.d">Family history of dementia increases concern. The ACTIVE study showed structured cognitive training can delay cognitive decline by up to 10 years.</p></div>'
        + '<div class="who-card r d3"><div class="who-icon" aria-hidden="true" style="font-size:2.5rem;display:flex;align-items:center;justify-content:center">\uD83C\uDF31</div><h3 data-i18n="who.c4.t">Longevity Investors</h3><p data-i18n="who.c4.d">You track your VO2 max, sleep quality, and nutrition. Why not your brain? Cognitive Age is the missing metric in your longevity stack.</p></div>';
      whoSec.appendChild(wg);
    }
  }

  /* Run on DOMContentLoaded */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectMissingElements();
    });
  } else {
    injectMissingElements();
  }

  /* Run again after delays to catch late-rendered Webflow elements */
  setTimeout(injectMissingElements, 1000);
  setTimeout(injectMissingElements, 3000);

})();

})();