/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   0. CLASS BRIDGE & DOM INJECTION
   Webflow uses hero-section / closing-section class names;
   all CSS & JS expect .hero / .closing. Bridge immediately.
   Also injects DOM elements Webflow can't create natively
   (canvas, progress bar, scroll-top button, glow ring).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  /* Class bridge: Webflow → Vercel */
  var bridge = { 'hero-section': 'hero', 'closing-section': 'closing', 'trust-top': 'trust-headline-top', 'trust-number': 'trust-headline-number', 'trust-users': 'trust-headline-users', 'risk-top': 'g2 g2-top', 'risk-left': 'r', 'lead-white': 'lead', 'eyebrow-dim': 'eyebrow' };
  Object.keys(bridge).forEach(function(wf) {
    document.querySelectorAll('.' + wf).forEach(function(el) {
      bridge[wf].split(' ').forEach(function(cls) { el.classList.add(cls); });
    });
  });
  /* Position-based section class assignment (Webflow lacks hero/closing styles) */
  var _secs = document.querySelectorAll('body > section, .page-wrapper > section, section');
  var _allSecs = Array.prototype.slice.call(document.querySelectorAll('section'));
  if (_allSecs.length > 0 && !_allSecs[0].classList.contains('hero')) {
    _allSecs[0].classList.add('hero');
  }
  if (_allSecs.length > 0 && !_allSecs[_allSecs.length-1].classList.contains('closing')) {
    _allSecs[_allSecs.length-1].classList.add('closing');
  }

  /* ── Inject right-side visual column (orbiting pillars) ──
     Webflow only has the left text column inside risk-top.
     We inject the right visual column so the g2 two-column
     layout renders the animated pillar diagram like Vercel. */
  /* Clean incomplete native elements (whtml_builder creates
     skeletons without child classes — remove so JS re-creates). */
  var _vc = document.querySelector('.risk-visual-col');
  if (_vc && !_vc.querySelector('.risk-side-visual__core')) _vc.remove();

  var riskLeft = document.querySelector('.risk-left');
  if (riskLeft && !document.querySelector('.risk-visual-col')) {
    var vc = document.createElement('div');
    vc.className = 'r d2 risk-visual-col';
    vc.setAttribute('aria-hidden', 'true');
    vc.innerHTML =
      '<div class="risk-side-visual risk-side-visual--pillars">' +
        '<div class="risk-side-visual__glow"></div>' +
        '<div class="risk-side-visual__core">' +
          '<div class="risk-side-visual__core-brain">🧘</div>' +
          '<div class="risk-side-visual__core-label" data-i18n="risk.core">Mind Balance</div>' +
        '</div>' +
        '<div class="risk-side-visual__orbit risk-side-visual__orbit--one"></div>' +
        '<div class="risk-side-visual__orbit risk-side-visual__orbit--two"></div>' +
        '<div class="risk-pillar risk-pillar--nutrition">' +
          '<div class="risk-pillar__icon">🥗</div>' +
          '<div class="risk-pillar__label" data-i18n="risk.pillar1">Diet &amp; Nutrition</div>' +
        '</div>' +
        '<div class="risk-pillar risk-pillar--exercise">' +
          '<div class="risk-pillar__icon">🏃</div>' +
          '<div class="risk-pillar__label" data-i18n="risk.pillar2">Physical Exercise</div>' +
        '</div>' +
        '<div class="risk-pillar risk-pillar--sleep">' +
          '<div class="risk-pillar__icon">🌙</div>' +
          '<div class="risk-pillar__label" data-i18n="risk.pillar3">Quality Sleep</div>' +
        '</div>' +
        '<div class="risk-pillar risk-pillar--training risk-pillar--highlight">' +
          '<div class="risk-pillar__icon">🧠</div>' +
          '<div class="risk-pillar__label" data-i18n="risk.pillar4">Cognitive Training</div>' +
        '</div>' +
        '<div class="risk-side-visual__link risk-side-visual__link--nutrition"></div>' +
        '<div class="risk-side-visual__link risk-side-visual__link--exercise"></div>' +
        '<div class="risk-side-visual__link risk-side-visual__link--sleep"></div>' +
        '<div class="risk-side-visual__link risk-side-visual__link--training"></div>' +
      '</div>';
    riskLeft.parentNode.appendChild(vc);
  }

  /* Set inline style on risk lead to match Vercel spacing */
  var riskLead = document.querySelector('.lead-white');
  if (riskLead) riskLead.style.marginBottom = 'clamp(20px,3vw,28px)';

  /* ── Wellness-gap structural fix ──
     Webflow can't nest wg-label inside wg-content wrapper div.
     We wrap label (+missing-tag if present) in wg-content to
     match Vercel's flex layout. Also adds green ✓ on missing item. */
  document.querySelectorAll('.wg-item').forEach(function(item) {
    var label = item.querySelector('.wg-label');
    if (!label || item.querySelector('.wg-content')) return;
    var container = label.parentNode;
    if (container === item) {
      /* label is a direct child — create wrapper and insertBefore */
      var content = document.createElement('div');
      content.className = 'wg-content';
      item.insertBefore(content, label);
      content.appendChild(label);
      var mtag = item.querySelector('.wg-missing-tag');
      if (mtag) content.appendChild(mtag);
    } else {
      /* label is nested inside an anonymous wrapper — just stamp the class */
      container.classList.add('wg-content');
      var mtag = item.querySelector('.wg-missing-tag');
      if (mtag && mtag.parentNode !== container) container.appendChild(mtag);
    }
    if (item.classList.contains('wg-missing') && !item.querySelector('.wg-check')) {
      var chk = document.createElement('div');
      chk.className = 'wg-check wg-green';
      chk.textContent = '\u2713';
      item.appendChild(chk);
    }
  });

  /* Inject hero background layers (canvas + gradient + shade) */
  var hero = document.querySelector('.hero');
  if (hero && !document.getElementById('neural-canvas')) {
    var grade = document.createElement('div');
    grade.className = 'hero-color-grade';
    hero.insertBefore(grade, hero.firstChild);

    var canvas = document.createElement('canvas');
    canvas.id = 'neural-canvas';
    hero.insertBefore(canvas, grade.nextSibling);

    var shade = document.createElement('div');
    shade.className = 'hero-text-shade';
    hero.insertBefore(shade, canvas.nextSibling);
  }

  /* Inject reading-progress bar */
  if (!document.getElementById('reading-progress')) {
    var rp = document.createElement('div');
    rp.id = 'reading-progress';
    document.body.appendChild(rp);
  }

  /* Inject scroll-top button */
  if (!document.querySelector('.scroll-top-btn')) {
    var stb = document.createElement('button');
    stb.className = 'scroll-top-btn';
    stb.setAttribute('aria-label', 'Scroll to top');
    stb.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(stb);
  }

  /* Inject glow ring (cursor follower) */
  if (!document.getElementById('ccr')) {
    var ccr = document.createElement('div');
    ccr.id = 'ccr';
    document.body.appendChild(ccr);
  }

  /* Set sk-fill inline widths for scroll animation.
     The skill-bar JS reads bar.style.width, saves it, resets to 0%,
     then animates back on scroll. Webflow can't set inline styles,
     so we set them here before the animation code runs. */
  var skWidths = [77.5, 60, 87.5, 52.5]; /* Contextual Memory, Hand-eye, Divided Attn, Spatial */
  document.querySelectorAll('.sk-fill').forEach(function(bar, i) {
    if (skWidths[i] !== undefined) bar.style.width = skWidths[i] + '%';
  });

  /* ── Risk-card flash-card restructure ──
     Webflow can't nest rc-front/rc-icon/rc-hint, so we inject them.
     Wraps each card's rc-title inside rc-front with icon + hint arrow. */
  var rcIcons = [
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
  ];
  var rcHint = '<svg class="rc-hint" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 9h10M9 4l5 5-5 5" stroke="#9ca3af" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  document.querySelectorAll('.risk-card').forEach(function(card, i) {
    var title = card.querySelector('.rc-title');
    if (!title || card.querySelector('.rc-front')) return; // already done

    var front = document.createElement('div');
    front.className = 'rc-front';

    var icon = document.createElement('div');
    icon.className = 'rc-icon';
    icon.innerHTML = rcIcons[i] || rcIcons[0];

    front.appendChild(icon);
    /* title may be nested inside an anonymous wrapper (Webflow adds a <div>
       around inline elements). Insert front before the direct-child ancestor. */
    var titleRef = title.parentNode === card ? title : title.parentNode;
    card.insertBefore(front, titleRef);
    front.appendChild(title);
    /* clean up the now-empty wrapper div if it has no remaining children */
    if (titleRef !== title && titleRef.parentNode === card && titleRef.children.length === 0) {
      titleRef.remove();
    }

    var hintWrap = document.createElement('div');
    hintWrap.innerHTML = rcHint;
    front.appendChild(hintWrap.firstChild);
  });

  /* ── Inject missing risk section bottom content ──
     Adds the "What Prevents" divider, arrows, solution block,
     and animated puzzle "missing piece" after the risk-row.
     Cleans incomplete native elements first. */
  var _rp = document.querySelector('.risk-prevent');
  if (_rp && !_rp.querySelector('.rp-label')) _rp.remove();
  var _arr = document.querySelector('.rp-arrows');
  if (_arr && !_arr.querySelector('.rp-arr')) _arr.remove();
  var _sol = document.querySelector('.rni-solution');
  if (_sol && !_sol.querySelector('.rni-sol-title')) _sol.remove();
  var _rmp = document.querySelector('.risk-missing-piece');
  if (_rmp && !_rmp.querySelector('.rmp-puzzle-svg')) _rmp.remove();

  var riskRow = document.querySelector('.risk-row');
  if (riskRow && !document.querySelector('.risk-prevent')) {
    var frag = document.createDocumentFragment();
    var tpl = document.createElement('div');
    tpl.innerHTML =
      '<div class="risk-prevent"><div class="rp-line"></div><div class="rp-label" data-i18n="risk.prevent">What Prevents All of This</div><div class="rp-line"></div></div>' +
      '<div class="rp-arrows" aria-hidden="true">' +
        '<svg class="rp-arr" width="16" height="22" viewBox="0 0 16 22"><polyline points="2,3 8,19 14,3" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<svg class="rp-arr" width="16" height="22" viewBox="0 0 16 22"><polyline points="2,3 8,19 14,3" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<svg class="rp-arr" width="16" height="22" viewBox="0 0 16 22"><polyline points="2,3 8,19 14,3" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</div>' +
      '<div class="rni-solution">' +
        '<div class="rni-sol-icon">🧠</div>' +
        '<div class="rni-sol-body">' +
          '<div class="rni-sol-title" data-i18n="risk.sol.t">Cognitive Training</div>' +
          '<div class="rni-sol-sub" data-i18n="risk.sol.s">Delivered by CogniFit</div>' +
          '<div class="rni-sol-desc" data-i18n="risk.sol.d">Daily scientifically validated exercises that strengthen attention, memory, and executive function, preventing every risk above.</div>' +
        '</div>' +
        '<div class="rni-sol-badge" data-i18n="risk.sol.b">KEY</div>' +
      '</div>' +
      '<div class="risk-missing-piece r d2">' +
        '<div class="rmp-icon-wrap">' +
          '<div class="rmp-icon-glow"></div>' +
          '<svg class="rmp-puzzle-svg" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
              '<filter id="puz-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
              '<filter id="puz-glow-in" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
              '<clipPath id="puz-clip"><rect x="30" y="20" width="160" height="160" rx="8"/></clipPath>' +
            '</defs>' +
            '<g class="puz-p1" filter="url(#puz-glow)"><path d="M60,60 L105,60 L105,68 C110,68 114,72 114,77 C114,82 110,86 105,86 L105,105 L60,105 Z" fill="rgba(26,115,232,0.75)" stroke="rgba(26,115,232,1)" stroke-width="1.5"/></g>' +
            '<g class="puz-p2" filter="url(#puz-glow)"><path d="M115,60 L160,60 L160,105 L115,105 L115,86 C110,86 106,82 106,77 C106,72 110,68 115,68 Z" fill="rgba(47,140,255,0.65)" stroke="rgba(26,115,232,1)" stroke-width="1.5"/></g>' +
            '<g class="puz-p3" filter="url(#puz-glow)"><path d="M60,106 L105,106 L105,115 C110,115 114,119 114,124 C114,129 110,133 105,133 L105,140 L60,140 Z" fill="rgba(26,115,232,0.7)" stroke="rgba(26,115,232,1)" stroke-width="1.5"/></g>' +
            '<g class="puz-p4-missing" filter="url(#puz-glow-in)"><path d="M115,106 L160,106 L160,140 L115,140 L115,133 C110,133 106,129 106,124 C106,119 110,115 115,115 Z" fill="rgba(52,168,83,0.85)" stroke="rgba(52,168,83,1)" stroke-width="2"/>' +
              '<animateTransform attributeName="transform" type="translate" values="80,60; 80,60; 0,0; 0,0; 0,0; 0,0; 80,60" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; .4 0 .2 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; .4 0 .2 1" keyTimes="0; 0.15; 0.45; 0.55; 0.7; 0.85; 1"/>' +
              '<animate attributeName="opacity" values="0;0;1;1;1;0;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.14;0.44;0.55;0.7;0.84;1"/>' +
            '</g>' +
            '<rect x="55" y="55" width="110" height="90" rx="6" fill="rgba(52,168,83,0.15)" stroke="rgba(52,168,83,0.6)" stroke-width="1.5"><animate attributeName="opacity" values="0;0;0;1;0;0;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.43;0.44;0.5;0.56;0.57;1"/></rect>' +
            '<g opacity="0.4" clip-path="url(#puz-clip)">' +
              '<path d="M75,75 Q90,70 105,78 Q115,70 130,75 Q145,70 155,80" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linecap="round" fill="none"/>' +
              '<path d="M70,90 Q88,84 100,92 Q115,85 135,90 Q148,85 158,92" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" fill="none"/>' +
              '<path d="M72,105 Q85,99 98,106 Q112,100 128,107 Q142,101 156,107" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" fill="none"/>' +
              '<path d="M78,118 Q92,113 107,120 Q120,114 136,120 Q147,115 155,121" stroke="rgba(255,255,255,0.45)" stroke-width="1.1" stroke-linecap="round" fill="none"/>' +
            '</g>' +
            '<circle cx="110" cy="77" r="5" fill="rgba(255,255,255,0.15)" stroke="rgba(26,115,232,0.8)" stroke-width="1"/>' +
            '<circle cx="110" cy="124" r="5" fill="rgba(255,255,255,0.12)" stroke="rgba(26,115,232,0.7)" stroke-width="1"/>' +
            '<text x="110" y="168" text-anchor="middle" font-family="system-ui,sans-serif" font-size="8" font-weight="700" fill="rgba(255,255,255,0.5)" letter-spacing="2">COGNITIVE TRAINING</text>' +
            '<circle r="2.5" fill="#2f8cff" opacity="0.8" filter="url(#puz-glow)"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#puz-orbit"/></animateMotion></circle>' +
            '<path id="puz-orbit" d="M110,40 C145,40 175,65 175,100 C175,135 145,160 110,160 C75,160 45,135 45,100 C45,65 75,40 110,40" fill="none"/>' +
          '</svg>' +
        '</div>' +
        '<div class="callout risk-missing-piece__text" data-i18n="risk.miss.text" data-i18n-html><strong>Cognitive training is<br><span class="rmp-highlight">the missing piece.</span></strong> <span class="risk-line-break">It completes the system that protects independence and daily decision-making.</span></div>' +
      '</div>';
    while (tpl.firstChild) frag.appendChild(tpl.firstChild);
    riskRow.parentNode.appendChild(frag);
  }

  /* ── Webflow scroll fix ──
     Ensure Webflow body/html don't fight the external CSS overflow rules.
     Remove any stale is-iframe class and force scroll. */
  document.documentElement.classList.remove('is-iframe');
  document.body.style.overflowY = 'auto';
  document.body.style.height = 'auto';
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   0b. DATA-I18N ATTRIBUTE INJECTION
   Webflow can't set custom attributes on every element.
   This injects all missing data-i18n attributes so the i18n engine
   can translate every text element across all 22 languages.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  function setI18n(selector, key, html) {
    var el = document.querySelector(selector);
    if (el && !el.hasAttribute('data-i18n')) {
      el.setAttribute('data-i18n', key);
      if (html) el.setAttribute('data-i18n-html', '');
    }
  }
  function setI18nAll(selector, keys, html) {
    document.querySelectorAll(selector).forEach(function(el, i) {
      if (keys[i] && !el.hasAttribute('data-i18n')) {
        el.setAttribute('data-i18n', keys[i]);
        if (html) el.setAttribute('data-i18n-html', '');
      }
    });
  }

  /* ── NAV ── */
  var navLinks = document.querySelectorAll('.nav-link');
  var navKeys = ['nav.platform', 'nav.faq', 'nav.science', 'nav.training'];
  navLinks.forEach(function(el, i) { if (navKeys[i]) el.setAttribute('data-i18n', navKeys[i]); });
  setI18n('.btn-login', 'nav.join');

  /* ── HERO ── */
  setI18n('.hero-badge > span:last-child, .hero-badge span:not(.badge-dot)', 'hero.badge');
  /* Hero badge — find the text span */
  var badge = document.querySelector('.hero-badge');
  if (badge) {
    var bSpans = badge.querySelectorAll('span');
    bSpans.forEach(function(s) {
      if (s.textContent.trim() === 'Cognitive Longevity System') s.setAttribute('data-i18n', 'hero.badge');
    });
  }
  /* Hero H1 — wrap raw text nodes in spans with data-i18n */
  var heroH1 = document.querySelector('.hero-h1');
  if (heroH1 && !heroH1.querySelector('[data-i18n]')) {
    var h1Children = Array.from(heroH1.childNodes);
    var lineKeys = ['hero.h1.line1', 'hero.h1.line2'];
    var lineIdx = 0;
    h1Children.forEach(function(node) {
      if (node.nodeType === 3 && node.textContent.trim()) {
        var span = document.createElement('span');
        span.setAttribute('data-i18n', lineKeys[lineIdx] || '');
        span.textContent = node.textContent;
        heroH1.replaceChild(span, node);
        lineIdx++;
      }
    });
    var shimmer = heroH1.querySelector('.hero-shimmer, .hero-shimmer-soft');
    if (shimmer) shimmer.setAttribute('data-i18n', 'hero.h1.line3');
  }
  setI18n('.hero-sub', 'hero.sub'); var hs = document.querySelector('.hero-sub'); if (hs) hs.setAttribute('data-i18n-html', '');
  setI18n('.hero-read-time', 'hero.readtime');
  var heroCta = document.querySelector('.hero-cta-wrap .btn-primary, .hero-inner .btn-primary');
  if (heroCta) heroCta.setAttribute('data-i18n', 'hero.cta');
  setI18n('.rating-users', 'hero.users');
  var gBadges = document.querySelectorAll('.g-badge');
  if (gBadges[0]) gBadges[0].setAttribute('data-i18n', 'hero.guarantee1');
  if (gBadges[1]) gBadges[1].setAttribute('data-i18n', 'hero.guarantee2');

  /* ── DISCOVER ── */
  var discoverSection = document.querySelector('.skills-panel');
  if (discoverSection) {
    var discParent = discoverSection.closest('.s-white') || discoverSection.closest('section');
    if (discParent) {
      var de = discParent.querySelector('.eyebrow'); if (de && !de.hasAttribute('data-i18n')) de.setAttribute('data-i18n', 'discover.eyebrow');
      var dh2 = discParent.querySelector('h2'); if (dh2 && !dh2.hasAttribute('data-i18n')) dh2.setAttribute('data-i18n', 'discover.h2');
      var dlead = discParent.querySelector('.lead-drk'); if (dlead && !dlead.hasAttribute('data-i18n')) { dlead.setAttribute('data-i18n', 'discover.lead'); dlead.setAttribute('data-i18n-html', ''); }
      var dcta = discParent.querySelector('.btn-secondary'); if (dcta && !dcta.hasAttribute('data-i18n')) dcta.setAttribute('data-i18n', 'discover.cta');
    }
  }
  setI18n('.panel-lbl', 'discover.panel');
  setI18nAll('.sk-name', ['discover.sk1', 'discover.sk2', 'discover.sk3', 'discover.sk4']);

  /* ── RISK ── */
  var riskSection = document.querySelector('.risk-top, .risk-left');
  if (riskSection) {
    var rs = riskSection.closest('.s-dark') || riskSection;
    var rEye = rs.querySelector('.eyebrow-dim, .eyebrow');
    if (rEye && !rEye.hasAttribute('data-i18n')) rEye.setAttribute('data-i18n', 'risk.eyebrow');
    var rH2 = rs.querySelector('h2');
    if (rH2 && !rH2.hasAttribute('data-i18n')) rH2.setAttribute('data-i18n', 'risk.h2');
    var rLead = rs.querySelector('.lead-white, .lead');
    if (rLead && !rLead.hasAttribute('data-i18n')) rLead.setAttribute('data-i18n', 'risk.lead');
  }
  setI18nAll('.wg-label', ['risk.pillar1', 'risk.pillar2', 'risk.pillar3', 'risk.pillar4']);
  setI18n('.wg-missing-tag', 'risk.missing');
  setI18nAll('.rc-title', ['risk.r1.t', 'risk.r2.t', 'risk.r3.t', 'risk.r4.t']);
  setI18nAll('.rc-desc', ['risk.r1.d', 'risk.r2.d', 'risk.r3.d', 'risk.r4.d']);

  /* ── PLATFORM ── */
  var platSection = document.getElementById('platform');
  if (platSection) {
    var pEye = platSection.querySelector('.eyebrow-dim, .eyebrow');
    if (pEye && !pEye.hasAttribute('data-i18n')) pEye.setAttribute('data-i18n', 'plat.eyebrow');
    var pH2 = platSection.querySelector('h2');
    if (pH2 && !pH2.hasAttribute('data-i18n')) pH2.setAttribute('data-i18n', 'plat.h2');
    var pLead = platSection.querySelector('.lead');
    if (pLead && !pLead.hasAttribute('data-i18n')) pLead.setAttribute('data-i18n', 'plat.lead');
    var pCta = platSection.querySelector('.btn-primary');
    if (pCta && !pCta.hasAttribute('data-i18n')) pCta.setAttribute('data-i18n', 'plat.cta');
  }
  var stepCards = document.querySelectorAll('.step-card');
  stepCards.forEach(function(card, i) {
    var n = i + 1;
    var h3 = card.querySelector('h3'); if (h3 && !h3.hasAttribute('data-i18n')) h3.setAttribute('data-i18n', 'plat.s' + n + '.t');
    var p = card.querySelector('p'); if (p && !p.hasAttribute('data-i18n')) p.setAttribute('data-i18n', 'plat.s' + n + '.d');
    var chks = card.querySelectorAll('.step-chk');
    chks.forEach(function(chk, ci) { if (!chk.hasAttribute('data-i18n')) chk.setAttribute('data-i18n', 'plat.s' + n + '.c' + (ci + 1)); });
  });

  /* ── FAQ ── */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item, i) {
    var n = i + 1;
    var qText = item.querySelector('.faq-q-text');
    if (qText && !qText.hasAttribute('data-i18n')) qText.setAttribute('data-i18n', 'faq.q' + n);
    var aP = item.querySelector('.faq-a p, p.faq-a');
    if (aP && !aP.hasAttribute('data-i18n')) { aP.setAttribute('data-i18n', 'faq.a' + n); aP.setAttribute('data-i18n-html', ''); }
  });

  /* ── TRUST / STATS ── */
  setI18nAll('.stat-l', ['trust.s1', 'trust.s2', 'trust.s3', 'trust.s4']);
  var trustSection = document.querySelector('.stats-row, .stat-bl');
  if (trustSection) {
    var tParent = trustSection.closest('.s-off, .s-dark, section');
    if (tParent) {
      var tEye = tParent.querySelector('.eyebrow-dim, .eyebrow');
      if (tEye && !tEye.hasAttribute('data-i18n')) tEye.setAttribute('data-i18n', 'trust.eyebrow');
      /* Trust headline spans (Webflow uses trust-top/trust-users, Vercel uses trust-headline-top/trust-headline-users) */
      var thTop = tParent.querySelector('.trust-headline-top, .trust-top');
      if (thTop && !thTop.hasAttribute('data-i18n')) thTop.setAttribute('data-i18n', 'trust.h.top');
      var thUsers = tParent.querySelector('.trust-headline-users, .trust-users');
      if (thUsers && !thUsers.hasAttribute('data-i18n')) thUsers.setAttribute('data-i18n', 'trust.h.users');
      /* Trust press paragraph */
      var tPress = tParent.querySelector('p[style]');
      if (tPress && !tPress.hasAttribute('data-i18n') && tPress.textContent.indexOf('Press') !== -1) tPress.setAttribute('data-i18n', 'trust.press');
    }
  }
  /* Trust badges */
  var tBadges = document.querySelectorAll('.t-badge');
  tBadges.forEach(function(b, i) { if (!b.hasAttribute('data-i18n')) b.setAttribute('data-i18n', 'trust.b' + (i + 1)); });

  /* ── VALIDATION ── */
  var valSection = document.querySelector('.val-logos, .val-btn');
  if (valSection) {
    var vParent = valSection.closest('.s-off, .s-white, section');
    if (vParent) {
      var vEye = vParent.querySelector('.eyebrow'); if (vEye && !vEye.hasAttribute('data-i18n')) vEye.setAttribute('data-i18n', 'val.eyebrow');
      var vH2 = vParent.querySelector('h2'); if (vH2 && !vH2.hasAttribute('data-i18n')) vH2.setAttribute('data-i18n', 'val.h2');
    }
  }

  /* ── CLOSING ── */
  setI18n('.closing-quote', 'closing.quote'); var cq = document.querySelector('.closing-quote'); if (cq) cq.setAttribute('data-i18n-html', '');
  setI18n('.closing-sub', 'closing.sub');
  var closingCta = document.querySelector('.closing .btn-primary, .closing-section .btn-primary');
  if (closingCta && !closingCta.hasAttribute('data-i18n')) closingCta.setAttribute('data-i18n', 'closing.cta');

  /* ── REVIEWS ── */
  var revCards = document.querySelectorAll('.rev-card');
  revCards.forEach(function(card, i) {
    var n = i + 1;
    var title = card.querySelector('.rev-title'); if (title && !title.hasAttribute('data-i18n')) title.setAttribute('data-i18n', 'rev.r' + n + '.t');
    var body = card.querySelector('.rev-body, .rev-text'); if (body && !body.hasAttribute('data-i18n')) body.setAttribute('data-i18n', 'rev.r' + n + '.b');
    var author = card.querySelector('.rev-author'); if (author && !author.hasAttribute('data-i18n')) author.setAttribute('data-i18n', 'rev.r' + n + '.a');
  });
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. CTA URL ROUTING
   Desktop → /assessments  |  iOS → App Store  |  Android → Play Store
   All links open in a new tab.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function applyCTARouting() {
  var isIOS     = /iPad|iPhone|iPod/.test(navigator.userAgent);
  var isAndroid = /Android/.test(navigator.userAgent);

  var iosURL     = 'https://itunes.apple.com/app/cognifit-brain-fitness/id528285610?mt=8';
  var androidURL = 'https://play.google.com/store/apps/details?id=com.cognifit.app&hl=en';
  var desktopURL = 'https://www.cognifit.com/assessments';

  var targetURL = isIOS ? iosURL : (isAndroid ? androidURL : desktopURL);

  var selectors = '.btn-primary, .btn-secondary, .btn-login, .btn-white, .pro-cta, .sticky-cta-btn';
  document.querySelectorAll(selectors).forEach(function(btn) {
    if (!btn.classList.contains('pro-cta') && !btn.classList.contains('btn-login')) {
      btn.setAttribute('href', targetURL);
    }
    if (btn.classList.contains('btn-login')) {
      btn.setAttribute('href', 'https://www.cognifit.com/login');
    }
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // Force all external links to open in new tab
  document.querySelectorAll('a[href]').forEach(function(a) {
    var href = a.getAttribute('href') || '';
    if (href.startsWith('#')) return;
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('//')) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. NEURAL CANVAS ANIMATION
   Flowing streams + soma neurons + axon connections + signals.
   Skipped entirely when prefers-reduced-motion is set.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  var canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = canvas.getContext('2d');
  var W, H, neurons = [], signals = [], streams = [];
  var mouse = { x: -9999, y: -9999 };

  var CFG = {
    count: 24,
    connDist: 250,
    palette: [
      { h: 210, s: 65, l: 55 },
      { h: 220, s: 60, l: 58 },
      { h: 200, s: 70, l: 52 }
    ]
  };

  /* ── Stream particle — flows along a fixed path ── */
  function Stream() { this.reset(true); }
  Stream.prototype.reset = function(init) {
    this.x = init ? Math.random() * W : -10;
    this.y = init ? Math.random() * H : Math.random() * H;
    var angle = -0.2 + Math.random() * 0.4 + (Math.random() < 0.3 ? Math.PI : 0);
    var speed = 0.3 + Math.random() * 0.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed * 0.3;
    this.len = 40 + Math.random() * 80;
    this.h = 205 + Math.random() * 25;
    this.a = 0.04 + Math.random() * 0.08;
    this.w = 0.4 + Math.random() * 0.8;
    this.trail = [];
    this.maxTrail = Math.floor(this.len / Math.max(0.1, Math.hypot(this.vx, this.vy)));
  };
  Stream.prototype.update = function() {
    this.trail.unshift({ x: this.x, y: this.y });
    if (this.trail.length > this.maxTrail) this.trail.pop();
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > W + 20 || this.x < -20 || this.y > H + 20 || this.y < -20) this.reset(false);
  };
  Stream.prototype.draw = function() {
    if (this.trail.length < 2) return;
    for (var i = 0; i < this.trail.length - 1; i++) {
      var alpha = this.a * (1 - i / this.trail.length);
      ctx.beginPath();
      ctx.moveTo(this.trail[i].x, this.trail[i].y);
      ctx.lineTo(this.trail[i + 1].x, this.trail[i + 1].y);
      ctx.strokeStyle = 'hsla(' + this.h + ',70%,65%,' + alpha + ')';
      ctx.lineWidth = this.w * (1 - i / this.trail.length);
      ctx.stroke();
    }
  };

  /* ── Signal — travels between neurons ── */
  function Signal(from, to) {
    this.from = from; this.to = to; this.t = 0; this.alive = true;
    this.speed = 0.005 + Math.random() * 0.006;
    this.color = from.color;
  }
  Signal.prototype.getPos = function(t) {
    var cx = (this.from.x + this.to.x) / 2 + this.from.bx;
    var cy = (this.from.y + this.to.y) / 2 + this.from.by;
    var m = 1 - t;
    return {
      x: m * m * this.from.x + 2 * m * t * cx + t * t * this.to.x,
      y: m * m * this.from.y + 2 * m * t * cy + t * t * this.to.y
    };
  };
  Signal.prototype.update = function() {
    this.t += this.speed;
    if (this.t >= 1) {
      this.alive = false;
      this.to.activate(0.7);
      if (Math.random() < 0.45) this.to.fire();
    }
  };
  Signal.prototype.draw = function() {
    var pos = this.getPos(this.t);
    var h = this.color.h, s = this.color.s, l = this.color.l;
    var g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 6);
    g.addColorStop(0, 'hsla(' + h + ',' + s + '%,' + (l + 25) + '%,0.55)');
    g.addColorStop(1, 'transparent');
    ctx.beginPath(); ctx.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(pos.x, pos.y, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = 'hsla(' + h + ',' + s + '%,90%,0.7)'; ctx.fill();
  };

  /* ── Neuron ── */
  function Neuron(x, y) {
    this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * 0.1;
    this.vy = (Math.random() - 0.5) * 0.1;
    this.r = 1.8 + Math.random() * 2.2;
    this.color = CFG.palette[Math.floor(Math.random() * CFG.palette.length)];
    this.activation = 0;
    this.breathe = Math.random() * Math.PI * 2;
    this.breatheSpeed = 0.006 + Math.random() * 0.004;
    this.connections = [];
    this.fireTimer = 100 + Math.floor(Math.random() * 280);
    this.bx = (Math.random() - 0.5) * 70;
    this.by = (Math.random() - 0.5) * 70;
    this.dendrites = [];
    for (var i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
      this.dendrites.push({ angle: Math.random() * Math.PI * 2, len: 10 + Math.random() * 20 });
    }
  }
  Neuron.prototype.activate = function(v) { this.activation = Math.min(1, this.activation + v); };
  Neuron.prototype.fire = function() {
    if (!this.connections.length) return;
    var t = this.connections[Math.floor(Math.random() * this.connections.length)];
    if (t) signals.push(new Signal(this, t));
  };
  Neuron.prototype.update = function() {
    this.breathe += this.breatheSpeed;
    this.activation *= 0.94;
    var dx = this.x - mouse.x, dy = this.y - mouse.y;
    if (Math.hypot(dx, dy) < 180) this.activate(0.02);
    this.x += this.vx; this.y += this.vy;
    if (this.x < 50)     this.vx += 0.006;
    if (this.x > W - 50) this.vx -= 0.006;
    if (this.y < 50)     this.vy += 0.006;
    if (this.y > H - 50) this.vy -= 0.006;
    this.vx *= 0.996; this.vy *= 0.996;
    this.fireTimer--;
    if (this.fireTimer <= 0) {
      this.fire(); this.activate(0.4);
      this.fireTimer = 140 + Math.floor(Math.random() * 300);
    }
  };
  Neuron.prototype.drawAxons = function() {
    var h = this.color.h, s = this.color.s, l = this.color.l;
    var self = this;
    this.connections.forEach(function(b) {
      var d = Math.hypot(self.x - b.x, self.y - b.y);
      var str = 1 - d / CFG.connDist;
      var alpha = str * (0.07 + self.activation * 0.1);
      var cx = (self.x + b.x) / 2 + self.bx * 0.4;
      var cy = (self.y + b.y) / 2 + self.by * 0.4;
      ctx.beginPath(); ctx.moveTo(self.x, self.y);
      ctx.quadraticCurveTo(cx, cy, b.x, b.y);
      var grad = ctx.createLinearGradient(self.x, self.y, b.x, b.y);
      grad.addColorStop(0, 'hsla(' + h + ',' + s + '%,' + l + '%,' + alpha + ')');
      grad.addColorStop(1, 'hsla(' + b.color.h + ',' + b.color.s + '%,' + b.color.l + '%,' + (alpha * 0.4) + ')');
      ctx.strokeStyle = grad; ctx.lineWidth = 0.5 + str * 0.7; ctx.stroke();
    });
  };
  Neuron.prototype.drawDendrites = function() {
    var h = this.color.h, s = this.color.s, l = this.color.l;
    var self = this;
    this.dendrites.forEach(function(d) {
      var ex = self.x + Math.cos(d.angle + self.breathe * 0.07) * d.len;
      var ey = self.y + Math.sin(d.angle + self.breathe * 0.07) * d.len;
      ctx.beginPath(); ctx.moveTo(self.x, self.y); ctx.lineTo(ex, ey);
      ctx.strokeStyle = 'hsla(' + h + ',' + s + '%,' + l + '%,' + (0.07 + self.activation * 0.08) + ')';
      ctx.lineWidth = 0.4; ctx.stroke();
    });
  };
  Neuron.prototype.drawSoma = function() {
    var h = this.color.h, s = this.color.s, l = this.color.l;
    var bf = Math.sin(this.breathe) * 0.1 + 0.9;
    var r = this.r * bf + this.activation * 1.8;
    var glowR = r * (3 + this.activation * 5);
    var glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowR);
    glow.addColorStop(0, 'hsla(' + h + ',' + s + '%,' + (l + 10) + '%,' + (0.07 + this.activation * 0.2) + ')');
    glow.addColorStop(1, 'transparent');
    ctx.beginPath(); ctx.arc(this.x, this.y, glowR, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();
    var ba = 0.25 + this.activation * 0.45;
    var body = ctx.createRadialGradient(this.x - r * 0.3, this.y - r * 0.3, 0, this.x, this.y, r);
    body.addColorStop(0, 'hsla(' + h + ',' + s + '%,' + (l + 22) + '%,' + ba + ')');
    body.addColorStop(1, 'hsla(' + h + ',' + s + '%,' + l + '%,' + (ba * 0.45) + ')');
    ctx.beginPath(); ctx.arc(this.x, this.y, r, 0, Math.PI * 2); ctx.fillStyle = body; ctx.fill();
  };

  function drawAmbient() {
    var t = Date.now() * 0.00015;
    [{ x: 0.22, y: 0.32, r: 400, a: 0.03, h: 215 }, { x: 0.76, y: 0.62, r: 340, a: 0.025, h: 222 }].forEach(function(b, i) {
      var bx = W * (b.x + Math.sin(t * (0.28 + i * 0.12)) * 0.05);
      var by = H * (b.y + Math.cos(t * (0.22 + i * 0.1)) * 0.05);
      var g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
      g.addColorStop(0, 'hsla(' + b.h + ',70%,45%,' + b.a + ')');
      g.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(bx, by, b.r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    });
  }

  function buildConnections() {
    neurons.forEach(function(n) { n.connections = []; });
    neurons.forEach(function(a, i) {
      neurons.forEach(function(b, j) {
        if (i >= j) return;
        if (Math.hypot(a.x - b.x, a.y - b.y) < CFG.connDist) {
          a.connections.push(b); b.connections.push(a);
        }
      });
    });
  }

  function resize() {
    var hero = canvas.closest ? canvas.closest('.hero') : null;
    W = canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
    H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
    buildConnections();
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    drawAmbient();
    streams.forEach(function(s) { s.update(); s.draw(); });
    neurons.forEach(function(n) { n.drawAxons(); });
    neurons.forEach(function(n) { n.drawDendrites(); });
    signals = signals.filter(function(s) { s.update(); s.draw(); return s.alive; });
    neurons.forEach(function(n) { n.update(); n.drawSoma(); });
    requestAnimationFrame(tick);
  }

  canvas.addEventListener('mousemove', function(e) {
    var r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', function() { mouse.x = -9999; mouse.y = -9999; });
  canvas.addEventListener('click', function(e) {
    var r = canvas.getBoundingClientRect();
    var cx = e.clientX - r.left, cy = e.clientY - r.top;
    var near = null, nd = Infinity;
    neurons.forEach(function(n) {
      var d = Math.hypot(n.x - cx, n.y - cy);
      if (d < nd) { nd = d; near = n; }
    });
    if (near) { near.activate(1); near.fire(); near.fire(); }
  });
  /* Touch-move tracking (passive — never blocks native scroll) */
  canvas.addEventListener('touchmove', function(e) {
    var r = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - r.left;
    mouse.y = e.touches[0].clientY - r.top;
  }, { passive: true });

  window.addEventListener('resize', resize);
  resize();
  neurons = [];
  for (var _i = 0; _i < CFG.count; _i++) {
    neurons.push(new Neuron(80 + Math.random() * (W - 160), 80 + Math.random() * (H - 160)));
  }
  buildConnections();
  neurons.forEach(function(n, i) { n.fireTimer = i * 15 + Math.floor(Math.random() * 70); });
  streams = [];
  for (var _s = 0; _s < 55; _s++) { streams.push(new Stream()); }
  tick();
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. NAV ADAPTIVE BACKGROUND
   Transparent on dark sections, light on .s-white / .s-off sections.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  var nav = document.getElementById('nav');
  if (!nav) return;
  var lightSecs = Array.from(document.querySelectorAll('.s-white, .s-off'));

  function updateNav() {
    var navH = nav.offsetHeight || 60;
    var isLight = false;
    lightSecs.forEach(function(sec) {
      var r = sec.getBoundingClientRect();
      if (r.top < navH && r.bottom > 0) isLight = true;
    });
    nav.classList.toggle('nav-light', isLight);
    var past = window.scrollY > 60;
    if (!isLight) {
      nav.style.background = past ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.15)';
    } else {
      nav.style.background = 'rgba(255,255,255,0.82)';
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. SKILL BARS — scroll-triggered fill animation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.querySelectorAll('.sk-fill').forEach(function(bar) {
  var targetW = bar.style.width;
  bar.style.width = '0%';
  new IntersectionObserver(function(entries, ob) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        bar.style.width = targetW;
        ob.unobserve(bar);
      }
    });
  }, { threshold: 0.5 }).observe(bar);
});


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. PARALLAX ENGINE
   Hero canvas, section backgrounds, pro-card 3D tilt,
   sitewide card tilt, trust badge tilt, stats count-up,
   hero text fade, pro-card stagger entrance.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  /* ── 1. Hero canvas parallax ── */
  var heroCanvas = document.getElementById('neural-canvas');
  if (heroCanvas) {
    window.addEventListener('scroll', function() {
      heroCanvas.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
    }, { passive: true });
  }

  /* ── 2. Section background parallax ── */
  var parallaxSections = document.querySelectorAll('.s-black, .s-dark, .s-blue, .closing');
  function updateSectionParallax() {
    var scrollY = window.scrollY;
    parallaxSections.forEach(function(sec) {
      var rect = sec.getBoundingClientRect();
      var centerOffset = (rect.top + rect.height / 2) - window.innerHeight / 2;
      sec.style.backgroundPositionY = 'calc(50% + ' + (centerOffset * 0.08) + 'px)';
    });
  }

  /* ── 3. Pro-card 3D tilt ── */
  document.querySelectorAll('.pro-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      var dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      card.style.transform  = 'translateY(-6px) rotateY(' + (dx * 5) + 'deg) rotateX(' + (-dy * 4) + 'deg)';
      card.style.transition = 'transform 0.08s ease';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    });
  });

  /* ── 3b. Sitewide card tilt ── */
  document.querySelectorAll('.sci-card, .step-card, .who-card, .rev-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      var dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      card.style.transform  = 'translateY(-4px) rotateY(' + (dx * 4) + 'deg) rotateX(' + (-dy * 3) + 'deg)';
      card.style.transition = 'transform 0.08s ease';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    });
  });

  /* ── 3c. Trust badge tilt ── */
  document.querySelectorAll('.t-badge').forEach(function(b) {
    b.addEventListener('mousemove', function(e) {
      var r = b.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      var dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      b.style.transform  = 'translateY(-3px) scale(1.04) rotateY(' + (dx * 4) + 'deg) rotateX(' + (-dy * 3) + 'deg)';
      b.style.transition = 'transform 0.08s ease';
    });
    b.addEventListener('mouseleave', function() {
      b.style.transform  = '';
      b.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    });
  });

  /* ── 4. Stats count-up ── */
  function animateCount(textNode, target, isDecimal, duration) {
    var start = performance.now();
    function step(now) {
      var elapsed  = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      var current  = target * eased;
      textNode.nodeValue = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      var el  = e.target;
      var raw = el.dataset.count;
      if (!raw) return;
      var target    = parseFloat(raw);
      var isDecimal = raw.includes('.');
      var textNode  = Array.from(el.childNodes).find(function(n) { return n.nodeType === 3; });
      if (!textNode) return;
      animateCount(textNode, target, isDecimal, 1800);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-n').forEach(function(el) {
    var textNode = Array.from(el.childNodes).find(function(n) { return n.nodeType === 3; });
    if (!textNode) return;
    var raw = textNode.nodeValue.trim();
    var num = parseFloat(raw.replace(/,/g, ''));
    if (isNaN(num)) return;
    el.dataset.count      = raw.replace(/,/g, '');
    textNode.nodeValue    = raw.includes('.') ? '0.0' : '0';
    statObserver.observe(el);
  });

  /* ── 5. Hero text layers parallax ── */
  var heroText = document.querySelector('.hero-text');
  if (heroText) {
    window.addEventListener('scroll', function() {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.5) {
        heroText.style.transform = 'translateY(' + (y * 0.18) + 'px)';
        heroText.style.opacity   = String(1 - y / (window.innerHeight * 0.85));
      }
    }, { passive: true });
  }

  /* ── 6. Pro-card stagger entrance ── */
  var proCardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      var delay = Array.from(e.target.parentNode.children).indexOf(e.target) * 120;
      setTimeout(function() {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0) scale(1)';
      }, delay);
      proCardObserver.unobserve(e.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.pro-card').forEach(function(card) {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(40px) scale(0.97)';
    card.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';
    proCardObserver.observe(card);
  });

  /* ── Combined scroll handler ── */
  window.addEventListener('scroll', updateSectionParallax, { passive: true });
  updateSectionParallax();
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   6. COGNI:WAVE DYNAMIC LAYER
   Cursor glow, magnetic buttons, gradient transition dividers,
   ambient orbs, traveling streaks, glow ring.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  /* ── 1. Cursor glow ── */
  var glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  var glowX = 0, glowY = 0, mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', function(e) { mouseX = e.clientX; mouseY = e.clientY; });
  (function trackGlow() {
    glowX += (mouseX - glowX) * 0.07;
    glowY += (mouseY - glowY) * 0.07;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(trackGlow);
  })();

  /* ── 2. Magnetic buttons ── */
  document.querySelectorAll('.btn-primary, .btn-white, .btn-secondary').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      var r = btn.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
      var y = ((e.clientY - r.top)  / r.height - 0.5) * 10;
      btn.style.transition = 'transform 0.1s ease';
      btn.style.transform  = 'translate(' + x + 'px, ' + y + 'px)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transition = 'transform 0.55s cubic-bezier(.4,0,.2,1)';
      btn.style.transform  = '';
    });
  });

  /* ── 3. Smooth gradient transition dividers between sections ── */
  var COLOR_MAP = {
    'hero':    '#000000',
    's-black': '#000000',
    's-dark':  '#080808',
    's-white': '#ffffff',
    's-off':   '#f4f4f4',
    's-blue':  '#1A73E8',
    'closing': '#000000'
  };
  function sectionColor(el) {
    for (var cls in COLOR_MAP) {
      if (el.classList.contains(cls)) return COLOR_MAP[cls];
    }
    return null;
  }
  var sections = Array.from(document.querySelectorAll('.hero, section, .closing'));
  sections.forEach(function(sec, i) {
    if (i === 0) return;
    var from = sectionColor(sections[i - 1]);
    var to   = sectionColor(sec);
    if (!from || !to || from === to) return;
    var div = document.createElement('div');
    div.className = 'wave-div';
    div.style.cssText = 'height:1px;background:linear-gradient(90deg,transparent 0%,rgba(26,115,232,.28) 25%,rgba(255,255,255,.1) 50%,rgba(26,115,232,.28) 75%,transparent 100%);box-shadow:0 0 16px 6px rgba(26,115,232,.07);margin:0;position:relative;z-index:2;pointer-events:none;';
    sec.parentNode.insertBefore(div, sec);
  });

  /* ── 4. Ambient orbs ── */
  var ORB_CONFIGS = [
    { selector: '.hero',    orbs: [
      { w: 750, h: 750, left: '70%', top: '28%', color: 'rgba(26,115,232,0.14)', cls: 'a' },
      { w: 500, h: 500, left: '6%',  top: '58%', color: 'rgba(110,50,230,0.09)', cls: 'b' },
      { w: 340, h: 340, left: '42%', top: '78%', color: 'rgba(0,200,210,0.07)',  cls: 'c' }
    ]},
    { selector: '.s-dark',  orbs: [
      { w: 560, h: 560, left: '88%', top: '22%', color: 'rgba(26,115,232,0.10)', cls: 'b' },
      { w: 400, h: 400, left: '4%',  top: '68%', color: 'rgba(120,40,220,0.08)', cls: 'a' },
      { w: 260, h: 260, left: '50%', top: '50%', color: 'rgba(0,180,200,0.05)',  cls: 'c' }
    ]},
    { selector: '.s-black', orbs: [
      { w: 600, h: 600, left: '15%', top: '35%', color: 'rgba(26,115,232,0.09)', cls: 'c' },
      { w: 380, h: 380, left: '82%', top: '65%', color: 'rgba(100,40,200,0.07)', cls: 'b' }
    ]},
    { selector: '.s-white', orbs: [
      { w: 700, h: 700, left: '80%', top: '20%', color: 'rgba(26,115,232,0.04)', cls: 'b' },
      { w: 500, h: 500, left: '5%',  top: '75%', color: 'rgba(100,60,220,0.03)', cls: 'a' }
    ]},
    { selector: '.s-off',   orbs: [
      { w: 600, h: 600, left: '78%', top: '30%', color: 'rgba(26,115,232,0.04)', cls: 'a' },
      { w: 400, h: 400, left: '8%',  top: '60%', color: 'rgba(80,40,180,0.03)',  cls: 'c' }
    ]},
    { selector: '.s-blue',  orbs: [
      { w: 520, h: 520, left: '82%', top: '38%', color: 'rgba(255,255,255,0.07)', cls: 'b' },
      { w: 320, h: 320, left: '12%', top: '68%', color: 'rgba(255,255,255,0.05)', cls: 'c' }
    ]},
    { selector: '.closing', orbs: [
      { w: 650, h: 650, left: '50%', top: '50%', color: 'rgba(26,115,232,0.09)', cls: 'a' },
      { w: 350, h: 350, left: '85%', top: '25%', color: 'rgba(100,40,200,0.06)', cls: 'c' }
    ]}
  ];
  ORB_CONFIGS.forEach(function(cfg) {
    document.querySelectorAll(cfg.selector).forEach(function(sec) {
      cfg.orbs.forEach(function(o) {
        var orb = document.createElement('div');
        orb.className = 'orb ' + o.cls;
        orb.style.width      = o.w + 'px';
        orb.style.height     = o.h + 'px';
        orb.style.left       = o.left;
        orb.style.top        = o.top;
        orb.style.background = o.color;
        sec.appendChild(orb);
      });
    });
  });

  /* ── 5. Traveling background streaks ── */
  var TRAVELER_CFGS = [
    { sel: '.hero',    ts: [{ cls: 't1', top: '22%', dur: '13s', del: '0s'   },
                             { cls: 't2', top: '68%', dur: '19s', del: '-6s'  },
                             { cls: 't3', top: '44%', dur: '25s', del: '-11s' }] },
    { sel: '.s-dark',  ts: [{ cls: 't1', top: '18%', dur: '16s', del: '-3s'  },
                             { cls: 't2', top: '72%', dur: '21s', del: '-9s'  }] },
    { sel: '.s-black', ts: [{ cls: 't1', top: '35%', dur: '18s', del: '-7s'  },
                             { cls: 't3', top: '60%', dur: '26s', del: '-14s' }] },
    { sel: '.s-blue',  ts: [{ cls: 't1', top: '25%', dur: '14s', del: '-4s'  },
                             { cls: 't2', top: '70%', dur: '22s', del: '-10s' }] },
    { sel: '.closing', ts: [{ cls: 't1', top: '30%', dur: '15s', del: '-2s'  },
                             { cls: 't3', top: '65%', dur: '24s', del: '-12s' }] }
  ];
  TRAVELER_CFGS.forEach(function(cfg) {
    document.querySelectorAll(cfg.sel).forEach(function(sec) {
      cfg.ts.forEach(function(t) {
        var el = document.createElement('div');
        el.className = 'traveler ' + t.cls;
        el.style.cssText = '--top:' + t.top + ';--dur:' + t.dur + ';--del:' + t.del + ';top:' + t.top;
        sec.appendChild(el);
      });
    });
  });

  /* ── 6. Glow ring ── */
  var ccr = document.getElementById('ccr');
  if (ccr && window.matchMedia('(hover:hover)').matches) {
    document.addEventListener('mousemove', function(e) {
      ccr.style.left = e.clientX + 'px';
      ccr.style.top  = e.clientY + 'px';
    }, { passive: true });
    var hoverEls = 'a,button,.btn-primary,.btn-white,.btn-secondary,.btn-login,.pro-cta';
    document.querySelectorAll(hoverEls).forEach(function(el) {
      el.addEventListener('mouseenter', function() { ccr.classList.add('hover'); });
      el.addEventListener('mouseleave', function() { ccr.classList.remove('hover'); });
    });
  }
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   7. SCI-CARD CASCADE INTERACTION
   Tap a system to break it; tap again (or wait 10 s) to restore all.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  var cards     = document.querySelectorAll('.sci-card');
  var status    = document.getElementById('sci-status');
  var resetHint = document.getElementById('sci-reset');
  if (!cards.length) return;

  function tx(key, fallback) {
    try {
      var lang = (window.CogniFitI18n && window.CogniFitI18n.getLang && window.CogniFitI18n.getLang())
                 || document.documentElement.lang || 'en';
      if (window.T && window.T[lang] && window.T[lang][key]) return window.T[lang][key];
      if (window.T && window.T.en  && window.T.en[key])  return window.T.en[key];
    } catch (e) {}
    return fallback;
  }

  function getNames() {
    return {
      executive: tx('sci.s1.t', 'Executive Function'),
      memory:    tx('sci.s2.t', 'Working Memory'),
      attention: tx('sci.s3.t', 'Attention')
    };
  }

  var disabled      = new Set();
  var autoResetTimer = null;

  /* Insert instruction text above sci-grid */
  var sciGrid       = document.querySelector('.sci-grid');
  var instructionEl = null;
  if (sciGrid) {
    instructionEl = document.createElement('p');
    instructionEl.className = 'sci-instruction';
    instructionEl.setAttribute('data-i18n', 'sci.tap.idle');
    instructionEl.textContent = tx('sci.tap.idle', 'Tap any system to see what happens when it fails');
    instructionEl.style.cssText = 'text-align:center;font-size:clamp(12px,2vw,14px);color:rgba(0,0,0,0.5);margin-bottom:16px;font-weight:600;letter-spacing:0.03em;transition:all .3s ease;';
    sciGrid.parentNode.insertBefore(instructionEl, sciGrid);
  }

  function clearAutoReset() {
    if (autoResetTimer) { clearTimeout(autoResetTimer); autoResetTimer = null; }
  }

  function restoreAll() {
    clearAutoReset();
    disabled.clear();
    cards.forEach(function(card) {
      card.classList.remove('sci-broken', 'sci-dim');
      card.style.removeProperty('background');
      card.style.removeProperty('opacity');
    });
    if (status)    status.classList.add('hidden');
    if (resetHint) resetHint.classList.add('hidden');
    if (instructionEl) {
      instructionEl.setAttribute('data-i18n', 'sci.tap.idle');
      instructionEl.textContent  = tx('sci.tap.idle', 'Tap any system to see what happens when it fails');
      instructionEl.style.color  = 'rgba(0,0,0,0.5)';
    }
    if (window.triadSetBroken) window.triadSetBroken(false);
  }

  function scheduleAutoReset() {
    clearAutoReset();
    autoResetTimer = setTimeout(restoreAll, 10000);
  }

  function updateBrokenState() {
    var anyDisabled = disabled.size > 0;
    cards.forEach(function(card) {
      var sys = card.dataset.system;
      if (disabled.has(sys)) {
        card.classList.add('sci-broken');
        card.classList.remove('sci-dim');
        card.style.setProperty('background', 'rgba(239,68,68,.13)', 'important');
        card.style.setProperty('opacity', '1', 'important');
      } else if (anyDisabled) {
        card.classList.remove('sci-broken', 'sci-dim');
        card.style.setProperty('background', 'rgba(239,68,68,.07)', 'important');
        card.style.setProperty('opacity', '1', 'important');
      }
    });

    if (anyDisabled) {
      var _NAMES = getNames();
      var names  = Array.from(disabled).map(function(s) { return _NAMES[s]; }).join(' & ');
      if (status) {
        var tpl = tx('sci.broken.status', '{names} weakened, the entire cognitive network is compromised.');
        status.textContent = tpl.replace('{names}', names);
        status.classList.remove('hidden');
      }
      if (resetHint) {
        resetHint.textContent = tx('sci.broken.hint', 'Tap disabled abilities to restore them');
        resetHint.classList.remove('hidden');
      }
      if (instructionEl) {
        instructionEl.setAttribute('data-i18n', 'sci.tap.hint');
        instructionEl.textContent = tx('sci.tap.hint', 'Tap the damaged system to restore balance');
        instructionEl.style.color = 'rgba(239,68,68,0.7)';
      }
      if (window.triadSetBroken)  window.triadSetBroken(true);
      if (window.triadBreakFrom)  window.triadBreakFrom(Array.from(disabled)[0]);
      scheduleAutoReset();
    }
  }

  cards.forEach(function(card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      var sys = card.dataset.system;
      if (disabled.has(sys)) {
        restoreAll();
      } else {
        disabled.add(sys);
        updateBrokenState();
      }
    });
  });

  /* Triad nodes mirror sci-card toggles */
  document.querySelectorAll('.td-node').forEach(function(node) {
    node.style.cursor = 'pointer';
    node.addEventListener('click', function() {
      var sysMap = { 'td-n0': 'executive', 'td-n1': 'memory', 'td-n2': 'attention' };
      var sys  = sysMap[node.id];
      if (!sys) return;
      var card = document.querySelector('.sci-card[data-system="' + sys + '"]');
      if (card) card.click();
    });
  });

  /* Re-render broken-state labels on language change */
  document.addEventListener('langChange', function() {
    var lang = (window.CogniFitI18n && window.CogniFitI18n.getLang && window.CogniFitI18n.getLang()) || 'en';
    var T    = window.T || {};
    var dict = (T[lang] || T.en || {});
    if (status && !status.classList.contains('hidden')) {
      var brokenCards = document.querySelectorAll('.sci-card.sci-broken');
      var nameMap = {
        executive: dict['sci.s1.t'] || 'Executive Function',
        memory:    dict['sci.s2.t'] || 'Working Memory',
        attention: dict['sci.s3.t'] || 'Attention'
      };
      var names = [];
      brokenCards.forEach(function(c) {
        var sys = c.dataset.system;
        if (nameMap[sys]) names.push(nameMap[sys]);
      });
      var tpl = dict['sci.broken.status'] || '{names} weakened, the entire cognitive network is compromised.';
      status.textContent = tpl.replace('{names}', names.join(' & '));
    }
    if (resetHint && !resetHint.classList.contains('hidden')) {
      resetHint.textContent = dict['sci.broken.hint'] || 'Tap disabled abilities to restore them';
    }
    if (instructionEl) {
      var key = instructionEl.getAttribute('data-i18n') || 'sci.tap.idle';
      if (dict[key]) instructionEl.textContent = dict[key];
    }
  });
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   8. TRIAD SVG — staggered cascade break animation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  var SYS_NODE      = { executive: '0', memory: '1', attention: '2' };
  var triadBreakTimer = null;

  window.triadBreakFrom = function(sysName) {
    var svg = document.getElementById('triad-svg');
    if (!svg) return;
    if (triadBreakTimer) { clearTimeout(triadBreakTimer); triadBreakTimer = null; }
    svg.setAttribute('data-breaking', SYS_NODE[sysName] || '0');
    svg.classList.add('triad-broken');
  };

  window.triadSetBroken = function(state) {
    var svg = document.getElementById('triad-svg');
    if (!svg) return;
    if (!state) {
      if (triadBreakTimer) { clearTimeout(triadBreakTimer); triadBreakTimer = null; }
      svg.classList.remove('triad-broken');
      svg.removeAttribute('data-breaking');
    }
  };
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   9. FAQ ACCORDION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.querySelectorAll('.faq-q').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var item   = btn.closest('.faq-item');
    if (!item) return;
    var isOpen = item.classList.contains('open');
    /* Close all open items */
    document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
      openItem.classList.remove('open');
      var q = openItem.querySelector('.faq-q');
      if (q) q.setAttribute('aria-expanded', 'false');
    });
    /* Toggle clicked item */
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   10. READING PROGRESS BAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  var bar = document.getElementById('reading-progress');
  if (!bar) return;
  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    ) - window.innerHeight;
    if (docHeight <= 0) return;
    bar.style.width = Math.min((scrollTop / docHeight) * 100, 100) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   11. STICKY FLOATING CTA — visible after hero, hidden near footer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  var stickyCta = document.getElementById('sticky-cta');
  var hero      = document.querySelector('.hero');
  var footer    = document.querySelector('footer');
  if (!stickyCta || !hero) return;

  function updateStickyCta() {
    var heroBottom  = hero.offsetTop + hero.offsetHeight;
    var scrollY     = window.scrollY || document.documentElement.scrollTop;
    var footerTop   = footer ? footer.getBoundingClientRect().top + scrollY : Infinity;
    var nearFooter  = scrollY + window.innerHeight > footerTop - 80;
    if (scrollY > heroBottom && !nearFooter) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateStickyCta, { passive: true });
  updateStickyCta();
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   12. RISK CARD CLICK / TAP TOGGLE
   Opens description on tap (touch-friendly); click-outside closes.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  function initRiskCards() {
    var cards = document.querySelectorAll('.risk-card');
    if (!cards.length) return;

    cards.forEach(function(card) {
      card.style.cursor = 'pointer';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');

      var toggle = function(e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = card.classList.toggle('rc-open');
        if (isOpen) {
          cards.forEach(function(other) {
            if (other !== card) other.classList.remove('rc-open');
          });
        }
      };

      card.addEventListener('click', toggle);
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') toggle(e);
      });
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.risk-card')) {
        cards.forEach(function(c) { c.classList.remove('rc-open'); });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRiskCards);
  } else {
    initRiskCards();
  }
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   13. STORE BADGES — inject into closing section
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  function initStoreBadges() {
    var closing = document.querySelector('section.closing');
    if (!closing || closing.querySelector('.store-badges')) return;

    var wrap = document.createElement('div');
    wrap.className = 'store-badges';
    wrap.innerHTML =
      '<a href="https://apps.apple.com/app/cognifit-brain-training/id544218985" target="_blank" rel="noopener noreferrer" class="store-btn store-btn-apple" aria-label="Download on the App Store">' +
        '<svg class="store-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>' +
        '<span class="store-txt"><span class="store-line1" data-i18n="store.apple.line1">Download on the</span><span class="store-line2">App Store</span></span>' +
      '</a>' +
      '<a href="https://play.google.com/store/apps/details?id=com.cognifit.app" target="_blank" rel="noopener noreferrer" class="store-btn store-btn-google" aria-label="Get it on Google Play">' +
        '<svg class="store-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l10.8-9.7L3.6 2.3z"/><path fill="#34A853" d="M14.4 12l3.7-3.3-11.8-6.8c-.5-.3-1-.3-1.4-.1L14.4 12z"/><path fill="#FBBC04" d="M14.4 12L4.9 21.2c.4.2.9.2 1.4-.1l11.8-6.8L14.4 12z"/><path fill="#4285F4" d="M18.1 8.7L14.4 12l3.7 3.3 4-2.3c1-.6 1-2 0-2.6l-4-1.7z"/></svg>' +
        '<span class="store-txt"><span class="store-line1" data-i18n="store.google.line1">Get it on</span><span class="store-line2">Google Play</span></span>' +
      '</a>';

    var btnCenter = closing.querySelector('.btn-center');
    if (btnCenter) {
      btnCenter.after(wrap);
    } else {
      closing.appendChild(wrap);
    }

    /* Re-apply translations if i18n is already loaded */
    if (window.CogniFitI18n && typeof window.CogniFitI18n.setLang === 'function') {
      try { window.CogniFitI18n.setLang(window.CogniFitI18n.getLang(), false); } catch (e) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoreBadges);
  } else {
    initStoreBadges();
  }
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   14. SCROLL-TOP BUTTON
   Fixed bottom-right; smooth scrolls to top on click.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  function initScrollTop() {
    var btn = document.querySelector('.scroll-top-btn');
    if (!btn) return;

    /* Enforce position */
    btn.style.setProperty('left',   'auto', 'important');
    btn.style.setProperty('right',  '24px', 'important');
    btn.style.setProperty('bottom', '24px', 'important');

    /* Show/hide via IntersectionObserver on hero */
    var heroEl = document.querySelector('.hero');
    if (heroEl) {
      btn.style.opacity       = '0';
      btn.style.pointerEvents = 'none';
      btn.style.transition    = 'opacity .3s ease';
      new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          btn.style.opacity       = entry.isIntersecting ? '0' : '1';
          btn.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
        });
      }, { threshold: 0, rootMargin: '0px' }).observe(heroEl);
    }

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (_) { window.scrollTo(0, 0); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTop);
  } else {
    initScrollTop();
  }
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   15. REVIEWS — inject 2 review cards into trust section
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  function initReviews() {
    /* Find the trust section (contains press-strip) */
    var pressStrip = document.querySelector('.press-strip');
    if (!pressStrip || document.querySelector('.reviews-grid')) return;

    var grid = document.createElement('div');
    grid.className = 'reviews-grid';
    grid.innerHTML =
      '<div class="rev-card r">' +
        '<div class="rev-date" data-i18n="rev.date1">16 March 2026</div>' +
        '<div class="rev-stars">\u2605\u2605\u2605\u2605\u2605</div>' +
        '<div class="rev-rec" data-i18n="rev.rec">\uD83D\uDC4D I recommend this product</div>' +
        '<div class="rev-title" data-i18n="rev.r1.t">Life-changing at 58</div>' +
        '<div class="rev-body" data-i18n="rev.r1.b">Real improvements in focus and memory within weeks. The personalized training adapts to exactly where I need it most.</div>' +
        '<div class="rev-author">Michael R. \uD83C\uDDFA\uD83C\uDDF8 <span data-i18n="rev.r1.c">United States</span></div>' +
      '</div>' +
      '<div class="rev-card r d1">' +
        '<div class="rev-date" data-i18n="rev.date2">13 March 2026</div>' +
        '<div class="rev-stars">\u2605\u2605\u2605\u2605\u2605</div>' +
        '<div class="rev-rec" data-i18n="rev.rec">\uD83D\uDC4D I recommend this product</div>' +
        '<div class="rev-title" data-i18n="rev.r2.t">Wow!</div>' +
        '<div class="rev-body" data-i18n="rev.r2.b">First time with this type of cognitive evaluation. Eye-opening assessment and the training feels genuinely tailored.</div>' +
        '<div class="rev-author">Ana S. \uD83C\uDDEA\uD83C\uDDF8 <span data-i18n="rev.r2.c">Spain</span></div>' +
      '</div>';

    pressStrip.after(grid);

    /* Re-apply translations */
    if (window.CogniFitI18n && typeof window.CogniFitI18n.setLang === 'function') {
      try { window.CogniFitI18n.setLang(window.CogniFitI18n.getLang(), false); } catch (e) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviews);
  } else {
    initReviews();
  }
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   16. FOOTER — inject full 4-column footer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  function initFooter() {
    if (document.querySelector('footer')) return;

    var footer = document.createElement('footer');
    footer.innerHTML =
      '<div class="wrap">' +
      '<div class="footer-grid">' +

      /* Brain Science column */
      '<div class="footer-col">' +
        '<h4 class="footer-col-title" data-i18n="footer.col.brain">Brain Science</h4>' +
        '<a href="https://www.cognifit.com/brain" data-i18n="footer.brain.human">The Human Brain</a>' +
        '<a href="https://www.cognifit.com/mind" data-i18n="footer.brain.mind">Brain and Mind</a>' +
        '<a href="https://www.cognifit.com/brain-parts" data-i18n="footer.brain.parts">Parts of the Brain</a>' +
        '<a href="https://www.cognifit.com/active-neurons" data-i18n="footer.brain.neurons">Neurons</a>' +
        '<a href="https://www.cognifit.com/brain-plasticity-and-cognition" data-i18n="footer.brain.plasticity">Brain Plasticity</a>' +
        '<a href="https://www.cognifit.com/brain-fitness" data-i18n="footer.brain.fitness">Brain Fitness</a>' +
        '<a href="https://www.cognifit.com/cognition" data-i18n="footer.brain.cognition">Cognition</a>' +
        '<a href="https://www.cognifit.com/memory-loss" data-i18n="footer.brain.memoryloss">Memory Loss</a>' +
        '<a href="https://www.cognifit.com/dementia" data-i18n="footer.brain.intellectual">Intellectual Disabilities</a>' +
        '<a href="https://www.cognifit.com/brain-functions" data-i18n="footer.brain.functions">Brain Functions</a>' +
        '<a href="https://www.cognifit.com/executive-functions" data-i18n="footer.brain.executive">Executive Functions</a>' +
        '<a href="https://www.cognifit.com/coordination" data-i18n="footer.brain.coord">Coordination</a>' +
        '<a href="https://www.cognifit.com/memory" data-i18n="footer.brain.memory">Memory</a>' +
        '<a href="https://www.cognifit.com/perception" data-i18n="footer.brain.perception">Perception</a>' +
        '<a href="https://www.cognifit.com/attention" data-i18n="footer.brain.attention">Attention</a>' +
      '</div>' +

      /* Research column */
      '<div class="footer-col">' +
        '<h4 class="footer-col-title" data-i18n="footer.col.research">Research</h4>' +
        '<a href="https://www.cognifit.com/digital-therapeutics" data-i18n="footer.research.digital">Digital Therapeutics Validation</a>' +
        '<a href="https://www.cognifit.com/Study-cognitive-training-vs-computer-games" data-i18n="footer.research.games">Computer Games</a>' +
        '<a href="https://www.cognifit.com/study-cognitive-training-vs-physical-training" data-i18n="footer.research.older">Healthy Older Adults Trial</a>' +
        '<a href="https://www.cognifit.com/study-evaluation-fatigue-pilots-marine" data-i18n="footer.research.navy">Navy Pilots</a>' +
        '<a href="https://www.cognifit.com/study-holistic-assess-senior-wellness" data-i18n="footer.research.wellness">Senior Wellness</a>' +
        '<a href="https://www.cognifit.com/study-itv-cognitive-training-seniors" data-i18n="footer.research.seniors">Healthy Seniors</a>' +
        '<a href="https://www.cognifit.com/senior-cognitive-training-symposium" data-i18n="footer.research.sct">Senior Cognitive Training</a>' +
        '<a href="https://www.cognifit.com/study-cct-senior-conference" data-i18n="footer.research.adults">Cognitive State in Adults</a>' +
        '<a href="https://www.cognifit.com/study-systematic-review-tools-prevention-cognitive-decline" data-i18n="footer.research.review">Systematic Review</a>' +
        '<a href="https://www.cognifit.com/study-taxonomy-games-dementia" data-i18n="footer.research.sg4d">SG4D Taxonomy</a>' +
      '</div>' +

      /* Brain Games column */
      '<div class="footer-col">' +
        '<h4 class="footer-col-title" data-i18n="footer.col.games">Brain Games</h4>' +
        '<a href="https://www.cognifit.com/chess" data-i18n="footer.games.chess">Chess Online</a>' +
        '<a href="https://www.cognifit.com/mini-crossword" data-i18n="footer.games.cross">Mini Crossword</a>' +
        '<a href="https://www.cognifit.com/watch-and-catch" data-i18n="footer.games.fruit">Fruit Frenzy</a>' +
        '<a href="https://www.cognifit.com/pipe-panic" data-i18n="footer.games.pipe">Pipe Panic</a>' +
        '<a href="https://www.cognifit.com/crystal-miner" data-i18n="footer.games.crystal">Crystal Miner</a>' +
        '<a href="https://www.cognifit.com/solitaire" data-i18n="footer.games.solitaire">Solitaire</a>' +
        '<a href="https://www.cognifit.com/robo-factory" data-i18n="footer.games.robo">Robo Factory</a>' +
        '<a href="https://www.cognifit.com/ant-escape" data-i18n="footer.games.ant">Ant Escape</a>' +
        '<a href="https://www.cognifit.com/treasure-island" data-i18n="footer.games.treasure">Treasure Island</a>' +
        '<a href="https://www.cognifit.com/neon-lights" data-i18n="footer.games.neon">Neon Lights</a>' +
        '<a href="https://www.cognifit.com/brain-games" data-i18n="footer.games.more">See More Games...</a>' +
      '</div>' +

      /* Tools column */
      '<div class="footer-col">' +
        '<h4 class="footer-col-title" data-i18n="footer.col.tools">Tools</h4>' +
        '<a href="https://www.cognifit.com/family-platform" data-i18n="footer.tools.families">For Families</a>' +
        '<a href="https://www.cognifit.com/medical-platform" data-i18n="footer.tools.clinicians">For Clinicians</a>' +
        '<a href="https://www.cognifit.com/cognitive-research-tool-v1" data-i18n="footer.tools.researchers">For Researchers</a>' +
        '<a href="https://www.cognifit.com/educational-technology" data-i18n="footer.tools.education">Education</a>' +
        '<a href="https://www.cognifit.com/patent" data-i18n="footer.tools.patent">Patent</a>' +
        '<a href="https://www.cognifit.com/mindfulness" data-i18n="footer.tools.mindfit">MindFit</a>' +
        '<a href="https://www.cognifit.com/babybright" data-i18n="footer.tools.baby">Babybright</a>' +
        '<a href="https://www.cognifit.com/resellers" data-i18n="footer.tools.resellers">Resellers</a>' +
        '<a href="https://www.cognifit.com/brain-training-kids" data-i18n="footer.tools.kids">Exercises for Children</a>' +
        '<a href="https://www.cognifit.com/cognitive-development" data-i18n="footer.tools.devt">Cognitive Development</a>' +
        '<a href="https://www.cognifit.com/brain-training" data-i18n="footer.tools.exercise">Brain Exercise</a>' +
        '<a href="https://www.cognifit.com/cognifit-individualized-training-system" data-i18n="footer.tools.its">Individualized Training System</a>' +
        '<a href="https://www.cognifit.com/brain-games" data-i18n="footer.tools.games">Brain Games</a>' +
        '<a href="https://www.cognifit.com/mental-exercise" data-i18n="footer.tools.mental">Mental Exercise</a>' +
        '<a href="https://www.cognifit.com/iq-test-iqbe" data-i18n="footer.tools.iq">IQ Test</a>' +
      '</div>' +

      '</div>' + /* /footer-grid */

      /* Disclaimer */
      '<div class="footer-disclaimer">' +
        '<p data-i18n="footer.disclaimer">* Every CogniFit cognitive assessment is intended as an aid for assessing cognitive wellbeing of an individual. In a clinical setting, the CogniFit results (when interpreted by a qualified healthcare provider), may be used as an aid in determining whether further cognitive evaluation is needed. CogniFit\'s brain trainings are designed to promote/encourage the general state of cognitive health. CogniFit does not offer any medical diagnosis or treatment of any medical disease or condition.</p>' +
      '</div>' +

      /* Bottom bar */
      '<div class="footer-bottom">' +
        '<div class="footer-bottom-links">' +
          '<a href="https://www.cognifit.com/terms-and-conditions" data-i18n="footer.bottom.terms">Terms of Service</a>' +
          '<a href="https://www.cognifit.com/privacy-policy" data-i18n="footer.bottom.privacy">Privacy Policy</a>' +
          '<a href="https://www.cognifit.com/about-team" data-i18n="footer.bottom.mgmt">Management Team</a>' +
          '<a href="https://blog.cognifit.com/category/cognifit-news/" data-i18n="footer.bottom.newsroom">CogniFit Newsroom</a>' +
          '<a href="https://cognifit.com/affiliates" data-i18n="footer.bottom.affiliate">Become an Affiliate</a>' +
          '<a href="https://www.cognifit.com/resellers" data-i18n="footer.bottom.reseller">Become a Reseller</a>' +
          '<a href="mailto:support@cognifit.com" data-i18n="footer.bottom.contact">Contact Us</a>' +
          '<a href="https://support.cognifit.com/" data-i18n="footer.bottom.help">Help</a>' +
        '</div>' +
        '<div class="footer-copy" data-i18n="footer.copy">CogniFit Inc \u00A9 2026</div>' +
      '</div>' +

      '</div>'; /* /wrap */

    /* Append footer after the last section */
    document.body.appendChild(footer);

    /* Re-apply translations */
    if (window.CogniFitI18n && typeof window.CogniFitI18n.setLang === 'function') {
      try { window.CogniFitI18n.setLang(window.CogniFitI18n.getLang(), false); } catch (e) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   17b. DEVICE SECTION — "Train on Any Device" with mockup image
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  function initDevices() {
    if (document.querySelector('.devices-section')) return;

    /* Insert before the second .s-black section (trust/reviews) */
    var blacks = document.querySelectorAll('section.s-black');
    var anchor = blacks.length >= 2 ? blacks[1] : null;
    if (!anchor) return;

    var ds = document.createElement('section');
    ds.className = 'devices-section';
    ds.innerHTML =
      '<div class="devices-container">' +
        '<h2 class="devices-heading" data-i18n="device.h2">Train on Any Device</h2>' +
        '<p class="devices-sub" data-i18n="device.sub">Start on your computer, continue on your phone. Your progress syncs everywhere.</p>' +
        '<img src="https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/devices_cognifit.png" alt="CogniFit on all devices" class="devices-img" width="900" height="520" loading="lazy" decoding="async">' +
        '<div class="store-badges">' +
          '<a href="https://apps.apple.com/app/cognifit-brain-training/id544218985" target="_blank" rel="noopener noreferrer" class="store-btn store-btn-apple" aria-label="Download on the App Store">' +
            '<svg class="store-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>' +
            '<span class="store-txt"><span class="store-line1" data-i18n="store.apple.line1">Download on the</span><span class="store-line2">App Store</span></span>' +
          '</a>' +
          '<a href="https://play.google.com/store/apps/details?id=com.cognifit.app" target="_blank" rel="noopener noreferrer" class="store-btn store-btn-google" aria-label="Get it on Google Play">' +
            '<svg class="store-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l10.8-9.7L3.6 2.3z"/><path fill="#34A853" d="M14.4 12l3.7-3.3-11.8-6.8c-.5-.3-1-.3-1.4-.1L14.4 12z"/><path fill="#FBBC04" d="M14.4 12L4.9 21.2c.4.2.9.2 1.4-.1l11.8-6.8L14.4 12z"/><path fill="#4285F4" d="M18.1 8.7L14.4 12l3.7 3.3 4-2.3c1-.6 1-2 0-2.6l-4-1.7z"/></svg>' +
            '<span class="store-txt"><span class="store-line1" data-i18n="store.google.line1">Get it on</span><span class="store-line2">Google Play</span></span>' +
          '</a>' +
        '</div>' +
      '</div>';

    anchor.parentElement.insertBefore(ds, anchor);

    if (window.CogniFitI18n && typeof window.CogniFitI18n.setLang === 'function') {
      try { window.CogniFitI18n.setLang(window.CogniFitI18n.getLang(), false); } catch (e) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDevices);
  } else {
    initDevices();
  }
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   18. STICKY FLOATING CTA — appears after scrolling past hero
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  function initStickyCTA() {
    if (document.getElementById('sticky-cta')) return;

    var div = document.createElement('div');
    div.className = 'sticky-cta';
    div.id = 'sticky-cta';
    div.innerHTML =
      '<a href="https://www.cognifit.com/assessments" class="sticky-cta-btn">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>' +
        '<span data-i18n="sticky.cta">Free Brain Assessment</span>' +
      '</a>';
    document.body.appendChild(div);

    /* Show/hide based on hero visibility */
    var heroEl = document.querySelector('.hero');
    if (heroEl) {
      div.style.opacity = '0';
      div.style.pointerEvents = 'none';
      div.style.transition = 'opacity .3s ease';
      new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          div.style.opacity = entry.isIntersecting ? '0' : '1';
          div.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
        });
      }, { threshold: 0 }).observe(heroEl);
    }

    if (window.CogniFitI18n && typeof window.CogniFitI18n.setLang === 'function') {
      try { window.CogniFitI18n.setLang(window.CogniFitI18n.getLang(), false); } catch (e) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickyCTA);
  } else {
    initStickyCTA();
  }
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DOMCONTENTLOADED INIT
   CTA routing, pro-card hero badge margin, triad move,
   login-button new-tab on mobile, pro-card whole-card click.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.addEventListener('DOMContentLoaded', function() {
  /* Scroll reveal — mark all .r elements as visible */
  document.querySelectorAll('.r').forEach(function(el) { el.classList.add('on'); });

  /* Hero badge closer to headline */
  var heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) heroBadge.style.setProperty('margin-bottom', '12px', 'important');

  /* Move triad triangle above sci-grid */
  var sciGrid   = document.querySelector('.sci-grid');
  var triadWrap = document.querySelector('.triad-wrap');
  if (sciGrid && triadWrap && sciGrid.parentElement) {
    sciGrid.parentElement.insertBefore(triadWrap, sciGrid);
  }

  /* Login button: new tab on mobile */
  var loginBtn = document.querySelector('.btn-login');
  if (loginBtn && window.innerWidth <= 768) {
    loginBtn.setAttribute('target', '_blank');
    loginBtn.setAttribute('rel', 'noopener noreferrer');
  }

  /* CTA routing */
  applyCTARouting();

  /* Make entire pro-card clickable on touch */
  document.querySelectorAll('.pro-card').forEach(function(card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
      if (e.target.closest('a')) return;
      var link = card.querySelector('.pro-cta');
      if (link) link.click();
    });
  });

  /* ── Language Switcher UI ──────────────────────────────────────────
     Webflow strips onclick attributes from published HTML. Wire all
     lang-switcher interactions via addEventListener instead.
     Also restores CSS classes Webflow removes from <button> elements
     (converts button→a and replaces class with "w-button").
  ─────────────────────────────────────────────────────────────────── */
  (function() {
    function setupLangSwitcher() {
      var btn = document.getElementById('lang-btn');
      var dropdown = document.getElementById('lang-dropdown-static');
      if (!btn || !dropdown) return;

      /* Restore lang-modal-header and lang-modal-title classes */
      var header = dropdown.querySelector('div');
      if (header) {
        header.classList.add('lang-modal-header');
        var title = header.querySelector('span');
        if (title) title.classList.add('lang-modal-title');
      }

      /* Restore lang-item class (Webflow replaces with w-button) */
      dropdown.querySelectorAll('[data-lang]').forEach(function(el) {
        el.classList.remove('w-button');
        el.classList.add('lang-item');
        /* Restore lang-flag / lang-name classes on child spans */
        var spans = el.querySelectorAll('span');
        if (spans[0]) spans[0].classList.add('lang-flag');
        if (spans[1]) spans[1].classList.add('lang-name');
        el.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var lang = el.getAttribute('data-lang');
          if (window.CogniFitI18n && window.CogniFitI18n.setLang) {
            window.CogniFitI18n.setLang(lang, true);
          }
          dropdown.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          document.documentElement.classList.remove('lang-modal-open');
        });
      });

      /* Restore lang-modal-close class on close button */
      var closeBtn = dropdown.querySelector('[aria-label="Close language menu"]');
      if (closeBtn) {
        closeBtn.classList.remove('w-button');
        closeBtn.classList.add('lang-modal-close');
        closeBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          document.documentElement.classList.remove('lang-modal-open');
        });
      }

      /* Lang button toggle */
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var open = dropdown.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
        document.documentElement.classList.toggle('lang-modal-open', open);
      });

      /* Close on outside click */
      document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
          dropdown.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          document.documentElement.classList.remove('lang-modal-open');
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupLangSwitcher);
    } else {
      setupLangSwitcher();
    }
  })();
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WINDOW.LOAD SAFETY NET
   Re-applies class bridge + scroll reveal on window.load.
   Webflow may wipe deferred-script changes before load fires.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {
  function reInitAll() {
    /* Class bridge: hero / closing */
    var allSecs = Array.prototype.slice.call(document.querySelectorAll('section'));
    if (allSecs.length > 0 && !allSecs[0].classList.contains('hero')) {
      allSecs[0].classList.add('hero');
    }
    if (allSecs.length > 0 && !allSecs[allSecs.length - 1].classList.contains('closing')) {
      allSecs[allSecs.length - 1].classList.add('closing');
    }
    /* Scroll reveal */
    document.querySelectorAll('.r').forEach(function(el) { el.classList.add('on'); });
    /* wg-content wrapper */
    document.querySelectorAll('.wg-item').forEach(function(item) {
      var label = item.querySelector('.wg-label');
      if (!label || item.querySelector('.wg-content')) return;
      var container = label.parentNode;
      if (container === item) {
        var content = document.createElement('div');
        content.className = 'wg-content';
        item.insertBefore(content, label);
        content.appendChild(label);
        var mtag = item.querySelector('.wg-missing-tag');
        if (mtag) content.appendChild(mtag);
      } else {
        container.classList.add('wg-content');
      }
      if (item.classList.contains('wg-missing') && !item.querySelector('.wg-check')) {
        var chk = document.createElement('div');
        chk.className = 'wg-check wg-green';
        chk.textContent = '\u2713';
        item.appendChild(chk);
      }
    });
    /* rc-front wrapper */
    document.querySelectorAll('.risk-card').forEach(function(card) {
      if (card.querySelector('.rc-front')) return;
      var title = card.querySelector('.rc-title');
      if (!title) return;
      var front = document.createElement('div');
      front.className = 'rc-front';
      var titleRef = title.parentNode === card ? title : title.parentNode;
      card.insertBefore(front, titleRef);
      front.appendChild(title);
      if (titleRef !== title && titleRef.parentNode === card && titleRef.children.length === 0) {
        titleRef.remove();
      }
    });
  }
  if (document.readyState === 'complete') {
    reInitAll();
  } else {
    window.addEventListener('load', reInitAll);
  }
})();