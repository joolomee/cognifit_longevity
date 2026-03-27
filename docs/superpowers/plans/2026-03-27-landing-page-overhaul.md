# CogniFit Landing Page Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 16 changes to the CogniFit landing page covering content, interaction, navigation, SEO, responsive design, and Wix iframe optimization.

**Architecture:** Static site (HTML + CSS + JS). All changes across 3 files: `index.html`, `styles.css`, `main.js`. No build step — edit and reload. Two JS execution paths: iframe mode (Wix embed) and non-iframe (direct browser).

**Tech Stack:** HTML5, CSS3 (with `svh` units, `clamp()`, `@keyframes`), Vanilla JS (IntersectionObserver, UA detection)

**Spec:** `docs/superpowers/specs/2026-03-27-landing-page-overhaul-design.md`

---

## Task 1: HTML Content Changes (Text, Badges, Phone Cards)

**Files:**
- Modify: `index.html:379` (hero subtitle)
- Modify: `index.html:380` (hero CTA)
- Modify: `index.html:361` (nav Login button)
- Modify: `index.html:393-396` (guarantee badges)
- Modify: `index.html:401-406` (phone card skills)
- Modify: `index.html:421` (Goal value)
- Modify: `index.html:469` (Discover CTA)
- Modify: `index.html:789` (Platform CTA)
- Modify: `index.html:809` (Outcomes CTA)
- Modify: `index.html:1254` (Final CTA)

- [ ] **Step 1: Change hero subtitle — remove "3"**

In `index.html`, find line 379:
```html
<p class="hero-sub r d2">Aging is inevitable. <strong>Cognitive decline doesn't have to be.</strong> Protect the 3 core mental abilities that determine how independently you live as you age.</p>
```
Replace with:
```html
<p class="hero-sub r d2">Aging is inevitable. <strong>Cognitive decline doesn't have to be.</strong> Protect the core mental abilities that determine how independently you live as you age.</p>
```

- [ ] **Step 2: Change hero CTA text**

In `index.html`, find line 380:
```html
<div class="r d2"><a href="https://www.cognifit.com/login" target="_blank" class="btn-primary">Start now</a></div>
```
Replace with:
```html
<div class="r d2"><a href="https://www.cognifit.com/assessments" target="_blank" class="btn-primary">Protect Your Brain</a></div>
```

- [ ] **Step 3: Change nav Login → "Join Now"**

In `index.html`, find line 361:
```html
<a href="https://www.cognifit.com/login" target="_blank" class="btn-login" id="login">LOGIN</a>
```
Replace with:
```html
<a href="https://www.cognifit.com/assessments" target="_blank" class="btn-login" id="login">Join Now</a>
```

- [ ] **Step 4: Remove arrows from guarantee badges + confirm padding**

In `index.html`, find lines 393-396:
```html
<div class="guarantee-row r d3">
  <div class="g-badge">→ 100% Satisfaction Guaranteed</div>
  <div class="g-badge">→ 30 Day Money Back</div>
</div>
```
Replace with:
```html
<div class="guarantee-row r d3">
  <div class="g-badge">100% Satisfaction Guaranteed</div>
  <div class="g-badge">30 Day Money Back</div>
</div>
```

- [ ] **Step 5: Update phone card — skills and titles**

In `index.html`, find lines 401-406:
```html
<div class="ph-title">Train</div>
<div class="ph-skill"><div class="ph-skill-name">Personalized</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:80%"></div></div></div>
<div class="ph-skill"><div class="ph-skill-name">Concentration</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:62%"></div></div></div>
<div class="ph-skill"><div class="ph-skill-name">Memory</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:50%"></div></div></div>
<div class="ph-skill"><div class="ph-skill-name">Reasoning</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:42%"></div></div></div>
<div class="ph-next"><div class="ph-next-label">Personalized Brain Training</div><div class="ph-next-val">NEXT SESSION →</div></div>
```
Replace with:
```html
<div class="ph-title">Brain Train</div>
<div class="ph-skill"><div class="ph-skill-name">Memory</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:80%"></div></div></div>
<div class="ph-skill"><div class="ph-skill-name">Reasoning</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:62%"></div></div></div>
<div class="ph-skill"><div class="ph-skill-name">Concentration</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:50%"></div></div></div>
<div class="ph-skill"><div class="ph-skill-name">Coordination</div><div class="ph-skill-bar"><div class="ph-skill-fill" style="width:42%"></div></div></div>
<div class="ph-next"><div class="ph-next-label">Your Daily Workout</div><div class="ph-next-val">NEXT SESSION →</div></div>
```

- [ ] **Step 6: Update Goal value**

In `index.html`, find line 421:
```html
<div class="ph-goal-pill">GOAL 550</div>
```
Replace with:
```html
<div class="ph-goal-pill">GOAL 670</div>
```

- [ ] **Step 7: Update remaining CTA buttons**

In `index.html`, find and replace each CTA:

Line 469 (Discover section):
```html
<a href="https://www.cognifit.com/login" target="_blank" class="btn-secondary r d3">Test your brain now</a>
```
→
```html
<a href="https://www.cognifit.com/assessments" target="_blank" class="btn-secondary r d3">Discover Your Brain</a>
```

Line 789 (Platform section):
```html
<a href="https://www.cognifit.com/login" target="_blank" class="btn-primary r">Start now</a>
```
→
```html
<a href="https://www.cognifit.com/assessments" target="_blank" class="btn-primary r">Begin Now</a>
```

Line 809 (Outcomes section):
```html
<a href="https://www.cognifit.com/login" target="_blank" class="btn-secondary">Start now</a>
```
→
```html
<a href="https://www.cognifit.com/assessments" target="_blank" class="btn-secondary">See What's Possible</a>
```

Line ~1254 (Final CTA section):
```html
<a href="https://www.cognifit.com/login" target="_blank" class="btn-primary r d2">Start now</a>
```
→
```html
<a href="https://www.cognifit.com/assessments" target="_blank" class="btn-primary r d2">Take the First Step</a>
```

- [ ] **Step 8: Verify in browser**

Open `index.html` directly. Check:
- Hero subtitle has no "3"
- Hero CTA says "Protect Your Brain"
- Nav says "Join Now"
- Guarantee badges have no arrows, text only
- Phone card shows: Brain Train, Memory, Reasoning, Concentration, Coordination
- Goal says 670
- All other CTAs updated

---

## Task 2: Remove JS Hero Height Conflicts

**Files:**
- Modify: `main.js:27-31` (iframe mode hero override)
- Modify: `main.js:138-143` (non-iframe mode hero override)

- [ ] **Step 1: Remove iframe hero height override**

In `main.js`, find lines 26-31:
```javascript
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.setProperty('min-height', 'auto', 'important');
      hero.style.setProperty('height', 'auto', 'important');
      hero.style.setProperty('padding-bottom', '60px', 'important');
    }
```
Replace with:
```javascript
    // Hero height: controlled by CSS (100svh on desktop/tablet, auto on mobile)
```

- [ ] **Step 2: Remove non-iframe hero height override**

In `main.js`, find lines 137-143:
```javascript
      // 1. Hero: auto height, no massive min-height
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.setProperty('height', 'auto', 'important');
        hero.style.setProperty('min-height', '600px', 'important');
        hero.style.setProperty('padding-bottom', '40px', 'important');
      }
```
Replace with:
```javascript
      // 1. Hero height: controlled by CSS (100svh on desktop/tablet, auto on mobile)
```

- [ ] **Step 3: Remove conflicting CSS hero responsive block**

In `styles.css`, find lines 2674-2683:
```css
/* ── HERO responsive height ── */
@media(min-width:1024px){
  .hero{height:auto!important;min-height:600px!important;padding-bottom:40px!important}
}
@media(min-width:769px) and (max-width:1023px){
  .hero{height:auto!important;min-height:480px!important;padding-bottom:32px!important}
}
@media(max-width:768px){
  .hero{height:auto!important;min-height:auto!important;padding-bottom:24px!important}
}
```
Remove this entire block (it conflicts with the main responsive block at lines 2806+).

- [ ] **Step 4: Verify**

Open in browser. Hero section should fit exactly within viewport on desktop/tablet (100svh). Check that badge, content, and scroll hint are all visible without scrolling.

---

## Task 3: URL Routing — Mobile/Tablet App Store Redirect

**Files:**
- Modify: `main.js` (add device detection + URL rewriting in both modes)

- [ ] **Step 1: Add URL routing function at top of main.js**

Add this function before the iframe check (top of file, after line 1):
```javascript
// ── CTA URL ROUTING: Desktop → /assessments, Mobile → App Store ──
function applyCTARouting() {
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  var isAndroid = /Android/.test(navigator.userAgent);
  var isMobileOrTablet = isIOS || isAndroid;

  var iosURL = 'https://itunes.apple.com/app/cognifit-brain-fitness/id528285610?mt=8';
  var androidURL = 'https://play.google.com/store/apps/details?id=com.cognifit.app&hl=en';
  var desktopURL = 'https://www.cognifit.com/assessments';

  var targetURL = desktopURL;
  if (isIOS) targetURL = iosURL;
  else if (isAndroid) targetURL = androidURL;

  // Update all CTA buttons
  var selectors = '.btn-primary, .btn-secondary, .btn-login, .pro-cta';
  document.querySelectorAll(selectors).forEach(function(btn) {
    // Skip pro-cta links (they have their own specific URLs)
    if (btn.classList.contains('pro-cta')) return;
    btn.setAttribute('href', targetURL);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });
}
```

- [ ] **Step 2: Call applyCTARouting in iframe mode**

In `main.js`, inside the iframe `DOMContentLoaded` handler, add before the closing `});`:
```javascript
    // CTA routing: desktop → assessments, mobile → app store
    applyCTARouting();
```

- [ ] **Step 3: Call applyCTARouting in non-iframe mode**

In `main.js`, inside the non-iframe `DOMContentLoaded` handler, add before the closing `});`:
```javascript
    // CTA routing: desktop → assessments, mobile → app store
    applyCTARouting();
```

- [ ] **Step 4: Update App Store URLs in devices section JS**

In `main.js`, find the iframe devices section (line ~44):
```javascript
'<a href="https://apps.apple.com/app/cognifit/id674368496"
```
Replace the iOS URL with:
```javascript
'<a href="https://itunes.apple.com/app/cognifit-brain-fitness/id528285610?mt=8"
```

Do the same for the non-iframe devices section (line ~184).

- [ ] **Step 5: Verify**

Test with browser DevTools in responsive mode — check that links resolve to app store URLs on mobile UA, and to `/assessments` on desktop UA.

---

## Task 4: Triad Interaction Fix

**Files:**
- Modify: `main.js:822-890` (SCI-CARD CASCADE INTERACTION)

- [ ] **Step 1: Rewrite the triad interaction logic**

In `main.js`, find the entire `SCI-CARD CASCADE INTERACTION` block (starts at line 821). Replace the full IIFE from `(function(){` to the closing `})();` with:

```javascript
/* ── SCI-CARD CASCADE INTERACTION (toggle system) ── */
(function(){
  const cards = document.querySelectorAll('.sci-card');
  const status = document.getElementById('sci-status');
  const resetHint = document.getElementById('sci-reset');
  if(!cards.length) return;

  const NAMES = {
    executive: 'Executive Function',
    memory: 'Working Memory',
    attention: 'Attention'
  };

  const disabled = new Set();
  let autoResetTimer = null;

  // Move instruction text above sci-grid
  const sciGrid = document.querySelector('.sci-grid');
  let instructionEl = null;
  if (sciGrid) {
    instructionEl = document.createElement('p');
    instructionEl.className = 'sci-instruction';
    instructionEl.textContent = 'Tap any system to see what happens when it fails';
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
    if (status) status.classList.add('hidden');
    if (resetHint) resetHint.classList.add('hidden');
    if (instructionEl) {
      instructionEl.textContent = 'Tap any system to see what happens when it fails';
      instructionEl.style.color = 'rgba(0,0,0,0.5)';
    }
    if (window.triadSetBroken) window.triadSetBroken(false);
  }

  function scheduleAutoReset() {
    clearAutoReset();
    autoResetTimer = setTimeout(restoreAll, 10000);
  }

  function updateBrokenState() {
    const anyDisabled = disabled.size > 0;

    cards.forEach(function(card) {
      const sys = card.dataset.system;
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
      const names = Array.from(disabled).map(function(s) { return NAMES[s]; }).join(' & ');
      if (status) {
        status.textContent = names + ' weakened \u2014 the entire cognitive network is compromised.';
        status.classList.remove('hidden');
      }
      if (resetHint) {
        resetHint.textContent = 'Tap disabled abilities to restore them';
        resetHint.classList.remove('hidden');
      }
      if (instructionEl) {
        instructionEl.textContent = 'Tap the damaged system to restore balance';
        instructionEl.style.color = 'rgba(239,68,68,0.7)';
      }
      if (window.triadSetBroken) window.triadSetBroken(true);
      const firstDisabled = Array.from(disabled)[0];
      if (window.triadBreakFrom) window.triadBreakFrom(firstDisabled);
      scheduleAutoReset();
    }
  }

  cards.forEach(function(card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      const sys = card.dataset.system;
      if (disabled.has(sys)) {
        // Tapping a damaged system → restore ALL
        restoreAll();
      } else {
        // Tapping a healthy system → break it
        disabled.add(sys);
        updateBrokenState();
      }
    });
  });

  // Triad nodes also toggle
  document.querySelectorAll('.td-node').forEach(function(node) {
    node.style.cursor = 'pointer';
    node.addEventListener('click', function() {
      var sysMap = { 'td-n0': 'executive', 'td-n1': 'memory', 'td-n2': 'attention' };
      var sys = sysMap[node.id];
      if (!sys) return;
      var card = document.querySelector('.sci-card[data-system="' + sys + '"]');
      if (card) card.click();
    });
  });
})();
```

- [ ] **Step 2: Remove duplicate triad node click handlers from iframe mode**

In `main.js`, find the iframe-mode triad handler (lines ~14-19):
```javascript
  // Move triad triangle ABOVE sci-grid
  const sciSection = document.querySelector('.sci-grid');
  const triadWrap = document.querySelector('.triad-wrap');
  if (sciSection && triadWrap && sciSection.parentElement) {
    sciSection.parentElement.insertBefore(triadWrap, sciSection);
  }
```
Keep this block (it moves the triad). But also find and remove the iframe td-node click handlers (lines ~163-173 in non-iframe mode) since they're now in the unified block above.

- [ ] **Step 3: Verify**

Open in browser. Click "Executive Function" card → turns red, instruction changes to "Tap the damaged system to restore balance". Click it again → everything restores to green, text reverts. Wait 10 seconds → auto-restores.

---

## Task 5: Press Logos — Uniform Height

**Files:**
- Modify: `styles.css` (press logo rules in `<style>` block in index.html lines 174-208, and in styles.css lines 1040-1083, 2742-2752)

- [ ] **Step 1: Replace all per-logo height overrides with uniform height**

In `index.html`, find the press logo styles in the `<style>` block (lines ~192-208):
```css
  .press-logo-img {
```
Replace the entire press-logo-img block and all per-logo overrides with:
```css
  .press-logo-img {
    max-height: 28px !important;
    width: auto !important;
    object-fit: contain !important;
    filter: brightness(0) invert(1) !important;
    opacity: 0.85 !important;
    transition: opacity .2s ease !important;
  }
  .press-logo-img:hover { opacity: 1 !important; }

  /* Only ABC needs special filter handling (already white) */
  .press-logo-abc { filter: invert(1) !important; }
  /* NBC is color — no invert */
  .press-logo-nbc { filter: none !important; }
```

Remove these individual overrides (lines ~198-208):
```css
  .press-logo-wsj  { max-height: 20px !important; }
  .press-logo-cbs  { max-height: 36px !important; }
  .press-logo-nyt  { max-height: 20px !important; }
  .press-logo-abc      { max-height: 44px !important; filter: invert(1) !important; }
  .press-logo-nbc      { max-height: 52px !important; ... }
  .press-logo-cnn      { max-height: 22px !important; ... }
  .press-logo-lifetime { max-height: 22px !important; ... }
  .press-logo-mnt      { max-height: 22px !important; }
  .press-logo-smartmoney { max-height: 40px !important; }
```

- [ ] **Step 2: Update tablet press logo sizes in styles.css**

In `styles.css`, find the tablet press overrides (~lines 1071-1083):
Replace all per-logo tablet overrides with a single rule:
```css
  .press-logo-img{max-height:22px!important}
  .press-logo-card{
    min-height:40px;
    padding:8px 10px;
    border-radius:12px;
  }
```

- [ ] **Step 3: Update responsive press rules at bottom of styles.css**

In `styles.css`, find lines 2742-2752. Replace with:
```css
/* ── PRESS LOGOS responsive sizing ── */
@media(min-width:1400px){
  .press-logo-img{max-height:32px!important}
}
@media(min-width:769px) and (max-width:1399px){
  .press-logo-img{max-height:28px!important}
}
@media(max-width:768px){
  .press-logo-img{max-height:20px!important}
  .press-logo-card{padding:8px 12px!important}
}
```

- [ ] **Step 4: Update JS press logo overrides**

In `main.js`, find the iframe press logo JS (lines ~87-90):
```javascript
  document.querySelectorAll('.press-logo-img').forEach(function(img) {
    img.style.setProperty('max-height', 'clamp(18px, 3vw, 36px)', 'important');
    img.style.setProperty('filter', 'none', 'important');
  });
```
Replace with:
```javascript
  document.querySelectorAll('.press-logo-img').forEach(function(img) {
    img.style.setProperty('max-height', '28px', 'important');
    img.style.setProperty('object-fit', 'contain', 'important');
  });
```

Do the same for the non-iframe block (~lines 214-217).

- [ ] **Step 5: Verify**

All press logos should appear at the same height, side by side, Smart Money fully visible. Check on desktop, tablet, and mobile.

---

## Task 6: Validation Marquee Scroll

**Files:**
- Modify: `index.html:1179-1184` (validation image section)
- Modify: `styles.css` (add marquee styles)

- [ ] **Step 1: Replace static image with marquee container**

In `index.html`, find lines 1179-1184:
```html
    <div class="val-logos-img r d3">
  <img src="https://www.cognifit.com/img/newart/clinicsLogos.webp"
       alt="CogniFit partner institutions worldwide"
       style="width:100%;max-width:1100px;display:block;margin:0 auto;opacity:0.88;border-radius:8px;"
       loading="eager">
    </div>
```
Replace with:
```html
    <div class="val-marquee-wrap r d3">
      <div class="val-marquee">
        <img src="https://www.cognifit.com/img/newart/clinicsLogos.webp" alt="CogniFit partner institutions worldwide" class="val-marquee-img" loading="eager">
        <img src="https://www.cognifit.com/img/newart/clinicsLogos.webp" alt="" aria-hidden="true" class="val-marquee-img" loading="eager">
      </div>
    </div>
```

- [ ] **Step 2: Add marquee CSS**

In `styles.css`, add before the final responsive fix block (before line 2766):
```css
/* ── VALIDATION MARQUEE ── */
.val-marquee-wrap {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}
.val-marquee {
  display: flex;
  width: max-content;
  animation: val-scroll 80s linear infinite;
}
.val-marquee:hover {
  animation-play-state: paused;
}
.val-marquee-img {
  height: auto;
  max-height: 120px;
  width: auto;
  min-width: 1100px;
  opacity: 0.88;
  flex-shrink: 0;
  padding-right: 60px;
}
@keyframes val-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@media (max-width: 768px) {
  .val-marquee-img { min-width: 800px; max-height: 80px; }
}
```

- [ ] **Step 3: Verify**

Validation section logos should scroll slowly and continuously from right to left. Hover pauses on desktop. Works on all breakpoints.

---

## Task 7: Devices Section — Improved Layout

**Files:**
- Modify: `main.js` (iframe + non-iframe devices section creation)
- Modify: `styles.css:2704-2740` (devices section styles)

- [ ] **Step 1: Update iframe devices section HTML in main.js**

In `main.js`, find the iframe devices section (lines ~36-48). Replace the innerHTML with:
```javascript
    ds.innerHTML = '<div class="devices-container">' +
      '<h2 class="devices-heading">Train on Any Device</h2>' +
      '<p class="devices-sub">Start on your computer, continue on your phone. Your progress syncs everywhere.</p>' +
      '<div class="devices-mockups"><img src="alldevices_cognifit.png" alt="CogniFit on all devices" class="devices-img"></div>' +
      '<div class="app-badges">' +
        '<a href="https://itunes.apple.com/app/cognifit-brain-fitness/id528285610?mt=8" target="_blank" rel="noopener noreferrer" class="app-badge-img"><img src="appstore_badge_en.png" alt="Download on the App Store"></a>' +
        '<a href="https://play.google.com/store/apps/details?id=com.cognifit.app&hl=en" target="_blank" rel="noopener noreferrer" class="app-badge-img"><img src="playstore_badge_en.png" alt="Get it on Google Play"></a>' +
      '</div>' +
    '</div>';
```

- [ ] **Step 2: Update non-iframe devices section in main.js**

Same change for the non-iframe devices section (~lines 176-189).

- [ ] **Step 3: Update devices CSS for tighter layout**

In `styles.css`, replace lines 2704-2740:
```css
/* ── DEVICES SECTION (real image) ── */
.devices-section{
  padding:clamp(16px,2.5vw,32px) 24px;
  text-align:center;
  background:linear-gradient(180deg,#f8f9fa,#eef1f5);
}
.devices-container{
  max-width:var(--max,1120px);
  margin:0 auto;
}
.devices-heading{
  font-size:clamp(22px,3.5vw,36px);
  font-weight:800;
  color:#111;
  margin-bottom:8px;
}
.devices-sub{
  font-size:clamp(13px,1.8vw,16px);
  color:#555;
  max-width:460px;
  margin:0 auto clamp(12px,2vw,20px);
}
.devices-img{
  max-width:min(780px,92%);
  height:auto;
  display:block;
  margin:0 auto clamp(8px,1.5vw,16px);
}
.app-badges{
  display:flex;
  gap:16px;
  justify-content:center;
  flex-wrap:wrap;
}
.app-badge-img img{
  height:clamp(38px,5vw,52px);
  width:auto;
  border-radius:8px;
  transition:transform .2s ease;
}
.app-badge-img img:hover{
  transform:scale(1.05);
}
```

- [ ] **Step 4: Verify**

Devices section should have tighter margins, larger image, and prominent app badges.

---

## Task 8: Athlete SVG — Professional Sports Design

**Files:**
- Modify: `index.html:1103-1164` (athlete pro-card SVG)
- Modify: `main.js:58-68` (remove iframe athlete JS override)
- Modify: `main.js:219-228` (remove non-iframe athlete JS override)

- [ ] **Step 1: Remove JS athlete SVG override — iframe mode**

In `main.js`, find lines 58-68 (iframe athlete replacement):
```javascript
  // Replace Athletes card icon with professional sports SVG
  const proCards = document.querySelectorAll('.pro-card');
  proCards.forEach(card => {
    ...
  });
```
Remove this entire block (or replace with a comment):
```javascript
  // Athletes card: uses HTML SVG (no JS override)
```

- [ ] **Step 2: Remove JS athlete SVG override — non-iframe mode**

In `main.js`, find lines 219-228 (non-iframe athlete replacement):
```javascript
      // 10. Replace Athletes card icon
      document.querySelectorAll('.pro-card').forEach(function(card) {
        ...
      });
```
Remove this entire block (or replace with comment):
```javascript
      // 10. Athletes card: uses HTML SVG (no JS override)
```

- [ ] **Step 3: Replace HTML athlete SVG with professional sports design**

In `index.html`, find the Athletes pro-card SVG (lines 1103-1164, inside `<div class="pro-photo" style="background:linear-gradient(135deg,#120026,#080014)">`).

Replace the entire `<svg>...</svg>` inside the pro-photo div with:
```html
<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;position:absolute;inset:0">
<defs>
  <radialGradient id="athl-glow" cx="50%" cy="50%" r="55%">
    <stop offset="0%" stop-color="rgba(140,60,255,0.35)"/>
    <stop offset="100%" stop-color="rgba(80,0,160,0)"/>
  </radialGradient>
  <filter id="athl-blur" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation="3" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>

<!-- Background glow -->
<ellipse cx="100" cy="95" rx="72" ry="58" fill="url(#athl-glow)">
  <animate attributeName="rx" values="72;78;72" dur="3s" repeatCount="indefinite"/>
</ellipse>

<!-- Track/oval -->
<ellipse cx="100" cy="120" rx="60" ry="18" fill="none" stroke="rgba(160,80,255,0.2)" stroke-width="1.5" stroke-dasharray="6 4">
  <animate attributeName="stroke-opacity" values=".2;.45;.2" dur="3s" repeatCount="indefinite"/>
</ellipse>

<!-- Stadium arc -->
<path d="M30 55 Q100 20 170 55" fill="none" stroke="rgba(180,120,255,0.15)" stroke-width="40"/>
<path d="M30 55 Q100 20 170 55" fill="none" stroke="rgba(200,150,255,0.12)" stroke-width="1.5"/>

<!-- Sprinter silhouette — dynamic pose -->
<g filter="url(#athl-blur)">
  <animate attributeName="transform" values="translate(0,0);translate(0,-3);translate(0,0)" dur="0.6s" repeatCount="indefinite"/>

  <!-- Head -->
  <circle cx="115" cy="48" r="9" fill="rgba(210,160,255,0.95)"/>

  <!-- Torso -->
  <path d="M112 57 C110 67 107 76 105 84" stroke="rgba(190,130,255,0.95)" stroke-width="7" stroke-linecap="round" fill="none"/>

  <!-- Front arm (reaching forward) -->
  <path d="M110 62 C118 68 126 66 132 58" stroke="rgba(180,120,255,0.85)" stroke-width="4.5" stroke-linecap="round" fill="none">
    <animate attributeName="d" values="M110 62 C118 68 126 66 132 58;M110 62 C104 68 96 66 90 60;M110 62 C118 68 126 66 132 58" dur="0.6s" repeatCount="indefinite"/>
  </path>

  <!-- Back arm -->
  <path d="M110 62 C104 70 96 74 90 78" stroke="rgba(160,100,255,0.7)" stroke-width="4" stroke-linecap="round" fill="none">
    <animate attributeName="d" values="M110 62 C104 70 96 74 90 78;M110 62 C118 70 126 74 132 76;M110 62 C104 70 96 74 90 78" dur="0.6s" repeatCount="indefinite"/>
  </path>

  <!-- Hips -->
  <ellipse cx="106" cy="86" rx="7" ry="5" fill="rgba(190,130,255,0.9)"/>

  <!-- Front leg (stride) -->
  <path d="M104 90 C100 104 104 118 112 130 C114 134 118 136 122 138" stroke="rgba(180,120,255,0.92)" stroke-width="6" stroke-linecap="round" fill="none">
    <animate attributeName="d" values="M104 90 C100 104 104 118 112 130 C114 134 118 136 122 138;M104 90 C110 102 118 112 120 124 C120 130 116 134 112 136;M104 90 C100 104 104 118 112 130 C114 134 118 136 122 138" dur="0.6s" repeatCount="indefinite"/>
  </path>

  <!-- Back leg (push-off) -->
  <path d="M108 90 C112 102 116 114 114 126 C113 132 110 136 106 138" stroke="rgba(160,100,255,0.8)" stroke-width="6" stroke-linecap="round" fill="none">
    <animate attributeName="d" values="M108 90 C112 102 116 114 114 126 C113 132 110 136 106 138;M108 90 C104 104 100 116 102 128 C103 134 106 138 110 140;M108 90 C112 102 116 114 114 126 C113 132 110 136 106 138" dur="0.6s" repeatCount="indefinite"/>
  </path>
</g>

<!-- Speed lines -->
<line x1="48" y1="68" x2="78" y2="68" stroke="rgba(180,100,255,0.5)" stroke-width="2" stroke-linecap="round">
  <animate attributeName="opacity" values=".3;.7;.3" dur="0.5s" repeatCount="indefinite"/>
</line>
<line x1="42" y1="78" x2="72" y2="78" stroke="rgba(160,80,255,0.35)" stroke-width="1.5" stroke-linecap="round">
  <animate attributeName="opacity" values=".2;.6;.2" dur="0.6s" repeatCount="indefinite"/>
</line>
<line x1="52" y1="88" x2="76" y2="88" stroke="rgba(150,70,255,0.25)" stroke-width="1" stroke-linecap="round">
  <animate attributeName="opacity" values=".15;.5;.15" dur="0.45s" repeatCount="indefinite"/>
</line>

<!-- Stopwatch icon (top-right) -->
<g transform="translate(152,30)">
  <animate attributeName="opacity" values=".6;1;.6" dur="2s" repeatCount="indefinite"/>
  <circle cx="0" cy="0" r="10" fill="none" stroke="rgba(255,220,100,0.8)" stroke-width="1.5"/>
  <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(255,220,100,0.9)" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="0" y1="0" x2="4" y2="-2" stroke="rgba(255,220,100,0.9)" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="0" y1="-10" x2="0" y2="-13" stroke="rgba(255,220,100,0.7)" stroke-width="1.5" stroke-linecap="round"/>
</g>

<!-- Brain-wave focus ring around head -->
<circle cx="115" cy="48" r="16" fill="none" stroke="rgba(180,140,255,0.3)" stroke-width="1" stroke-dasharray="3 3">
  <animate attributeName="r" values="16;22;16" dur="2s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values=".5;0;.5" dur="2s" repeatCount="indefinite"/>
</circle>

<!-- Traveling particle on track -->
<circle r="3" fill="rgba(200,160,255,0.9)" filter="url(#athl-blur)">
  <animateMotion dur="3s" repeatCount="indefinite">
    <mpath href="#athl-track"/>
  </animateMotion>
  <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite"/>
</circle>
<ellipse id="athl-track" cx="100" cy="120" rx="60" ry="18" fill="none" class="athl-track-path"/>

<!-- Ground shadow -->
<ellipse cx="108" cy="146" rx="28" ry="4" fill="rgba(120,40,220,0.2)">
  <animate attributeName="rx" values="28;22;28" dur="0.6s" repeatCount="indefinite"/>
</ellipse>

<!-- Ground line -->
<line x1="55" y1="150" x2="160" y2="150" stroke="rgba(160,80,255,0.2)" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 4: Verify**

The Athletes pro-card should show a polished sprinter with stadium arc, track oval, stopwatch, brain-wave ring, and speed lines — matching the quality of other pro-cards.

---

## Task 9: Guarantee Badge Padding + Science Spacing

**Files:**
- Modify: `styles.css:479` (guarantee-row)
- Modify: `index.html:771` (chain-note margin)

- [ ] **Step 1: Add bottom padding to guarantee row**

In `styles.css`, find line 479:
```css
.guarantee-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:14px;margin-bottom:28px}
```
Replace with:
```css
.guarantee-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:14px;margin-bottom:28px;padding-bottom:16px}
```

- [ ] **Step 2: Reduce chain-note margin**

In `index.html`, find line 771:
```html
<p class="chain-note r d1" style="margin-top:8px">
```
Replace with:
```html
<p class="chain-note r d1" style="margin-top:0">
```

- [ ] **Step 3: Verify**

Guarantee badges should have breathing room from bottom. "Break one..." text should be closer to the triad triangle.

---

## Task 10: SEO Text Review

**Files:**
- Modify: `index.html` (multiple sections — headings, descriptions, meta)

- [ ] **Step 1: Optimize section headings and descriptions for SEO**

Apply these SEO-optimized text replacements in `index.html`:

**Discover section (line 446-448):**
```html
<span class="eyebrow r">Your Cognitive Profile</span>
<h2 class="r d1" style="color:#000">Discover Your Cognitive Strengths and Weaknesses</h2>
<p class="lead-drk r d1" style="max-width:min(520px,100%);margin:0 auto clamp(24px,5vw,40px)">Our task batteries measure 20+ cognitive skills across memory, attention, and executive function.</p>
```
→
```html
<span class="eyebrow r">Cognitive Assessment</span>
<h2 class="r d1" style="color:#000">Discover Your Brain's Strengths and Weaknesses</h2>
<p class="lead-drk r d1" style="max-width:min(520px,100%);margin:0 auto clamp(24px,5vw,40px)">Scientifically validated assessments measure 20+ cognitive skills across memory, attention, and executive function.</p>
```

**Risk section (line 481):**
```html
<h2>The Real Risk of Aging Isn't Physical. It's Cognitive.</h2>
```
→
```html
<h2>The Real Risk of Aging Isn't Physical &mdash; It's Cognitive</h2>
```

**Science section (lines 678-680):**
```html
<h2 class="r d1" style="color:#000">The Science of Cognitive Longevity</h2>
<p class="lead-drk r d1" ...>Long-term brain health depends on three interconnected cognitive systems.</p>
```
→
```html
<h2 class="r d1" style="color:#000">The Science Behind Cognitive Longevity</h2>
<p class="lead-drk r d1" ...>Long-term brain health depends on three interconnected cognitive systems that protect your independence.</p>
```

**Platform section (line 780):**
```html
<h2 class="r d1">Introducing CogniFit — Your Cognitive Longevity Platform</h2>
```
→
```html
<h2 class="r d1">CogniFit &mdash; Your Brain Training Platform for Cognitive Longevity</h2>
```

**Outcomes section (line 799):**
```html
<h2 style="color:#000">What Consistent Training Delivers</h2>
```
→
```html
<h2 style="color:#000">What Consistent Brain Training Delivers</h2>
```

**Who section (line 884):**
```html
<h2 class="r d1" style="color:#000">Who Is This For?</h2>
```
→
```html
<h2 class="r d1" style="color:#000">Who Benefits from Cognitive Training?</h2>
```

**Final CTA (line 1234):**
```html
<h2 class="r d1">Start Your Cognitive Longevity Journey</h2>
```
→
```html
<h2 class="r d1">Start Your Brain Health Journey Today</h2>
```

- [ ] **Step 2: Verify**

Check all sections for updated text. Ensure no broken HTML.

---

## Task 11: Large Screen Responsive + Wix Iframe Optimization

**Files:**
- Modify: `styles.css` (add large screen media queries)
- Modify: `main.js` (iframe optimizations)

- [ ] **Step 1: Add large screen media queries**

In `styles.css`, add after the existing responsive fix block (after line ~2905):
```css
/* ── EXTRA LARGE SCREENS (27"+, 32"+, 43"+, 50"+, 55") ── */
@media (min-width: 1920px) {
  body { font-size: 20px; }
  .wrap { max-width: 1200px; }
  .hero-content { max-width: 1200px; }
  .hero-h1 { font-size: clamp(48px, 4vw, 72px); }
  .hero-sub { font-size: clamp(18px, 1.5vw, 24px); }
  .hero-badge { font-size: clamp(12px, 0.8vw, 16px); }
  .hero-rating { max-width: 480px; }
  .press-logo-img { max-height: 36px !important; }
  .devices-img { max-width: min(900px, 85%); }
  .val-marquee-img { max-height: 140px; }
}

@media (min-width: 2560px) {
  body { font-size: 22px; }
  .wrap { max-width: 1400px; }
  .hero-content { max-width: 1400px; }
  .hero-h1 { font-size: clamp(56px, 3.5vw, 84px); }
  .hero-sub { font-size: clamp(20px, 1.2vw, 28px); }
  .press-logo-img { max-height: 40px !important; }
  .devices-img { max-width: min(1000px, 80%); }
}

@media (min-width: 3840px) {
  body { font-size: 26px; }
  .wrap { max-width: 1800px; }
  .hero-content { max-width: 1800px; }
  .hero-h1 { font-size: clamp(64px, 3vw, 96px); }
  .hero-sub { font-size: clamp(24px, 1vw, 32px); }
  .btn-primary { padding: 20px 56px; font-size: 20px; }
  .btn-secondary { padding: 16px 40px; font-size: 18px; }
  .press-logo-img { max-height: 48px !important; }
}
```

- [ ] **Step 2: Ensure iframe height reporting is correct**

In `main.js`, the iframe mode already has height reporting (line ~127):
```javascript
var h = document.documentElement.scrollHeight;
window.parent.postMessage(JSON.stringify({ type: 'setHeight', h: h }), '*');
```

Add a resize observer to keep height updated when content changes:
```javascript
    // Keep iframe height updated
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(function() {
        var h = document.documentElement.scrollHeight;
        window.parent.postMessage(JSON.stringify({ type: 'setHeight', h: h }), '*');
      }).observe(document.body);
    }
```

Add this right after the existing setTimeout block (line ~128).

- [ ] **Step 3: Verify on large viewports**

Use browser DevTools to simulate 2560px and 3840px widths. Content should be well-proportioned, not stretched. Verify in Wix iframe preview if available.

---

## Execution Order

Tasks should be executed in this order:
1. **Task 1** — HTML content (foundation for everything)
2. **Task 2** — JS hero height fix (unblocks responsive)
3. **Task 3** — URL routing
4. **Task 9** — Badge padding + science spacing (quick CSS)
5. **Task 5** — Press logos
6. **Task 6** — Validation marquee
7. **Task 7** — Devices section
8. **Task 8** — Athlete SVG
9. **Task 4** — Triad interaction (complex JS)
10. **Task 10** — SEO text
11. **Task 11** — Large screens + iframe optimization (final polish)
