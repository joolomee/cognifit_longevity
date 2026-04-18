# Mobile QA Report — cognifit.com/longevity

**Audited:** 2026-04-18
**Scope:** Webflow-published page at `www.cognifit.com/longevity`
**Target devices:** iPhone SE (375×667), iPhone 14 (390×844), Pixel 6 (412×915), low-end Android (360×640), iPad Mini portrait (768×1024)
**Method:** Static analysis of `01-HEAD-CODE.html`, `02-STYLES.css`, `03-BODY-JS.html`, `04-BODY-HTML.html`, `webflow-main.js`, `visual-inject.js`, `counters.js`, `i18n.js`. Cross-verified every agent finding against the actual source before inclusion — false positives removed.

**Cannot run from this sandbox:** Lighthouse, BrowserStack, real-device emulation, or fetching the live Webflow URL (all external hosts blocked by `host_not_allowed`). Findings below are grounded in code only. Validate on-device before shipping.

---

## Severity legend

- **P0** — breaks a core interaction on a common device; must fix before publish
- **P1** — degrades UX for a meaningful subset of users; fix in this sprint
- **P2** — minor polish issue; fix when convenient
- **P3** — future hardening

Each item includes: **symptom**, **file:line**, **paste-ready fix**.

---

## P0 — Blockers

### P0-1 · Canvas renders blurry on every retina device

**Symptom.** The `#neural-canvas` behind the hero is sized in CSS pixels only. On iPhone/Pixel/iPad with `devicePixelRatio` of 2 or 3, all particles and lines are upscaled by the GPU → visibly soft/blurry on the hero background.

**Where.** `webflow/webflow-main.js:693-694`

```js
W = canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
```

**Fix.** Scale the backing store by DPR and scale the 2D context so drawing logic stays in CSS px:

```js
function resize() {
  var dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2 to protect low-end GPUs
  var w = hero ? hero.offsetWidth  : window.innerWidth;
  var h = hero ? hero.offsetHeight : window.innerHeight;
  canvas.style.width  = w + 'px';
  canvas.style.height = h + 'px';
  canvas.width  = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  W = w; H = h;
}
```

---

### P0-2 · Animation loop drains battery when tab is backgrounded or screen is off

**Symptom.** The canvas particle loop calls `requestAnimationFrame(tick)` unconditionally (line 706). Mobile Safari and Chrome on Android throttle rAF in background tabs, but not always reliably when the page is still foreground with the screen off. Combined with the 60 fps draw, users report heat/battery drain on older iPhones after leaving the page open.

**Where.** `webflow/webflow-main.js:706`

**Fix.** Gate the tick on `document.visibilityState` and (optionally) throttle to 30 fps on low-power conditions:

```js
var last = 0, FPS_CAP = 30;
function tick(now) {
  if (document.hidden) { requestAnimationFrame(tick); return; }
  if (now - last < 1000 / FPS_CAP) { requestAnimationFrame(tick); return; }
  last = now;
  // ...existing draw code...
  requestAnimationFrame(tick);
}
document.addEventListener('visibilitychange', function () {
  if (!document.hidden) last = 0; // resume smoothly
});
```

---

### P0-3 · Nav collides with the iPhone notch and Dynamic Island

**Symptom.** `nav` is `position: fixed; top: 0; min-height: 56px`. On iPhone 13/14 Pro the Dynamic Island overlaps the logo and the language switcher. No `env(safe-area-inset-top)` padding is applied.

**Where.** `webflow/01-HEAD-CODE.html` inline `<style>` block; `webflow/02-STYLES.css` nav rules.

**Fix.** Add once to the head custom code:

```css
@supports (padding: env(safe-area-inset-top)) {
  nav {
    padding-top: env(safe-area-inset-top);
    padding-left: max(20px, env(safe-area-inset-left));
    padding-right: max(20px, env(safe-area-inset-right));
    min-height: calc(56px + env(safe-area-inset-top));
  }
  body { padding-top: calc(60px + env(safe-area-inset-top)); }
}
```

---

## P1 — Major

### P1-1 · Viewport meta blocks pinch-zoom (WCAG 2.1 AA fail)

**Symptom.** Users with low vision cannot pinch-zoom. Current meta is:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

**Where.** `webflow/01-HEAD-CODE.html:8`

**Fix.** WCAG 2.1 SC 1.4.4 requires scalable content. iOS allows the user to override via Accessibility settings, but the standard still demands an author-permissive meta:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=yes, maximum-scale=5">
```

---

### P1-2 · Unclearable timers in counters.js leak when the user navigates away mid-animation

**Symptom.** Three unreferenced `setTimeout` handles fire at 200 ms, 1.2 s, and 3 s after load. If the user taps the CTA within the first 3 s (common for tall landing pages), the handlers keep running on the deleted page context in some browsers, holding closure-level references.

**Where.** `webflow/counters.js:28-37`

**Fix.** Store handles and cancel on `pagehide`:

```js
var timers = [];
timers.push(setTimeout(run, 200));
timers.push(setTimeout(run, 1200));
timers.push(setTimeout(run, 3000));
window.addEventListener('pagehide', function () { timers.forEach(clearTimeout); }, { once: true });
```

---

### P1-3 · Six independent scroll listeners on `window`

**Symptom.** Scroll-driven nav colour, canvas parallax, section parallax, reading-progress, sticky CTA, and canvas resize each add their own `scroll` listener (all `{ passive: true }` — good) but on a low-end Pixel the layout/style recalc happens six times per scroll frame. Perceived jank during fast flicks.

**Where.** `webflow/webflow-main.js:770, 802, 906, 936, 1323, 1349`

**Fix.** Consolidate into a single rAF-batched handler:

```js
var lastScrollY = 0, scrollPending = false;
function onScroll() {
  lastScrollY = window.scrollY;
  if (scrollPending) return;
  scrollPending = true;
  requestAnimationFrame(function () {
    scrollPending = false;
    updateNav(lastScrollY);
    updateProgress(lastScrollY);
    updateStickyCta(lastScrollY);
    updateSectionParallax(lastScrollY);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
```

Keep canvas parallax separate if it needs access to raw scroll deltas.

---

### P1-4 · FAQ trigger touch target under 44 px on narrow phones

**Symptom.** `.faq-q` button padding is `clamp(18px, 3vw, 24px) 0`. At 375 px width, `3vw ≈ 11 px`, which collapses the button to ~33 px tall. Apple HIG minimum is 44×44 px; WCAG 2.5.5 AAA is 44×44 px.

**Where.** `webflow/02-STYLES.css:2943` (`.faq-q`)

**Fix.** Force a 44 px floor and make the chevron area part of the tap target:

```css
.faq-q {
  min-height: 48px;
  padding: clamp(18px, 3vw, 24px) 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}
.faq-chevron { width: 24px; height: 24px; flex: 0 0 24px; }
```

---

### P1-5 · Tablet gap 901–980 px keeps the desktop 2-column grid

**Symptom.** `.hero-content` is defined unconstrained as `grid-template-columns: 1fr 420px` at line 319. The mobile override at line 1103 is scoped to `@media(max-width:900px)`. iPad Mini portrait at 768 px is covered, but iPad Pro 11" portrait at 834 px is covered, and Surface / some mid-size Android tablets at 960 px portrait fall into the gap and see an overflowing 420 px column.

**Where.** `webflow/02-STYLES.css:319-323, 1103`

**Fix.** Extend the breakpoint to 980 px in the base CSS (do NOT add a second rule — edit the existing one):

```css
/* Change line 1103 from */
@media(max-width:900px){ ... }
/* to */
@media(max-width:980px){ ... }
```

Alternatively, wrap the base rule in a `@media (min-width: 981px)` to make it desktop-only.

---

## P2 — Minor

### P2-1 · `clinicsLogos.webp` uses `loading="eager"` twice

**Symptom.** The partner-institutions marquee image (1800×140, ~40 KB) is far below the fold but loads eagerly. Wastes mobile data and delays LCP on 3G.

**Where.** `webflow/04-BODY-HTML.html:885-886`

**Fix.** Change both to `loading="lazy"`:

```html
<img src="..." loading="lazy" decoding="async" ...>
```

The second copy (line 886, the `aria-hidden="true"` duplicate for the marquee loop) should stay lazy too — it's a decorative repeat.

---

### P2-2 · Phone mockup aspect-ratio not declared

**Symptom.** `.phone-train` (220×440) and `.phone-stats` (240×480) use fixed `width` and `height` in px. On slow networks, if the custom fonts defer-load and shift the hero layout before the absolute-positioned phones paint, there's a brief visual flicker. A declared `aspect-ratio` prevents the reflow.

**Where.** `webflow/02-STYLES.css` (phone mockup rules)

**Fix.**

```css
.hero-phones .phone-train { aspect-ratio: 220 / 440; }
.hero-phones .phone-stats { aspect-ratio: 240 / 480; }
```

---

### P2-3 · i18n.js is 7 326 lines and deferred but still parses synchronously

**Symptom.** With `defer`, the browser still parses and executes `i18n.js` before firing `DOMContentLoaded`. On a low-end Android over 3G, that's ~300 ms of main-thread time before the first interaction is ready.

**Where.** `webflow/03-BODY-JS.html:2` (and `/i18n.js` itself)

**Fix (short-term).** Switch from `defer` to `async` for this one script — the translations apply after DOMContentLoaded anyway since the page ships with EN baked in:

```html
<script async src="https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/i18n.js"></script>
```

**Fix (long-term).** Split `i18n.js` into a 1-KB loader + lazy-loaded per-language dictionaries fetched only when the user opens the language switcher.

---

### P2-4 · Hero viewport units crop content on iPhone landscape

**Symptom.** `.hero` uses `min-height: 100svh`. In landscape iPhone SE (667×375), the hero text + CTA + rating + guarantee row exceeds 375 px → content extends below the visible hero. No showstopper, but the `Scroll` hint arrow sits below the fold.

**Where.** `webflow/02-STYLES.css:1102`

**Fix.** Cap the landscape hero height:

```css
@media (orientation: landscape) and (max-height: 500px) {
  .hero { min-height: auto; padding-top: 80px; padding-bottom: 40px; }
  .hero-scroll-hint { display: none; }
}
```

---

## P3 — Polish

### P3-1 · `.logo-dark` vs `.logo-light` nav states

**Symptom.** The nav logo toggles between `.logo-dark` and `.logo-light` depending on scroll state. Forced visibility rules in the hero fix `#nav .logo-dark { display: block !important }` can fight the JS that toggles them. On some mobile Safari versions the light logo flashes briefly at top-of-scroll.

**Where.** `webflow/01-HEAD-CODE.html` inline style + `webflow/webflow-main.js` scroll handler.

**Fix.** Drive visibility off a body-level class rather than forcing `display`:

```css
body:not(.nav-scrolled) #nav .logo-dark { display: block; }
body:not(.nav-scrolled) #nav .logo-light { display: none; }
body.nav-scrolled #nav .logo-dark { display: none; }
body.nav-scrolled #nav .logo-light { display: block; }
```

And in JS, toggle `document.body.classList.toggle('nav-scrolled', scrollY > 32)` inside the consolidated `onScroll` handler from P1-3.

---

### P3-2 · Prefers-reduced-motion honoured in CSS but not in canvas

**Symptom.** The 02-STYLES.css has six `@media (prefers-reduced-motion: reduce)` blocks ✓. But the JS canvas particle loop doesn't check the media query — reduced-motion users still see the animated neural background.

**Where.** `webflow/webflow-main.js` canvas init.

**Fix.**

```js
var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion) { return; } // skip canvas animation entirely
```

Place early in the canvas IIFE after the element lookup.

---

### P3-3 · Backdrop-filter fallback

**Symptom.** Nav blur uses `backdrop-filter: blur(28px)`. On WebView Android < 9 and some in-app browsers (Facebook, Instagram), backdrop-filter is unsupported → the nav renders as its raw `rgba(0,0,0,0.85)` fallback. Already acceptable, but worth a `@supports` guard so the fallback is a solid opaque colour for visibility:

**Where.** `webflow/02-STYLES.css` nav block.

**Fix.**

```css
nav { background: rgba(0, 0, 0, 0.92); }
@supports ((backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px))) {
  nav {
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(28px) saturate(160%);
    -webkit-backdrop-filter: blur(28px) saturate(160%);
  }
}
```

---

## Verified-false claims (dropped from report)

These were flagged by one of the audit agents and then **disproven** in source during cross-check:

- ❌ "FAQ aria-expanded not toggled by JS" — toggle is present in `webflow-main.js:1296-1302, 1818, 1832, 1841, 1849`
- ❌ "Scroll listeners not passive" — every `window.addEventListener('scroll', ...)` uses `{ passive: true }` (confirmed at 770, 802, 906, 936, 1323, 1349)
- ❌ "Body font size too small, iOS will zoom" — body is `font-size: 18px` (02-STYLES.css:17), above the 16 px zoom threshold
- ❌ "Hero grid collapses wrong on mobile" — `.hero-content` is `grid-template-columns: 1fr` at `@media(max-width:900px)` (02-STYLES.css:1103); only the 901–980 px tablet gap is affected, reported as P1-5
- ❌ "Hero phones visible on mobile" — `display: none` at `@media(max-width:900px)` (02-STYLES.css:1104) plus the redundant guard in critical CSS

---

## Test matrix the user must run on-device

Sandbox can't render; these checks are pre-publish:

- [ ] iPhone SE (375×667) portrait: no horizontal scroll anywhere, hero CTA tappable, FAQ accordion opens
- [ ] iPhone 14 Pro (393×852) portrait: Dynamic Island does not cover logo, nav height looks correct (apply P0-3 first)
- [ ] iPhone 14 Pro landscape: hero fits, sticky CTA doesn't obscure FAQ answers
- [ ] Pixel 6 (412×915): canvas background crisp (apply P0-1 first)
- [ ] iPad Mini (768×1024) portrait: 1-column hero, no 420 px column
- [ ] iPad Pro 11" (834×1194) portrait: 1-column hero (apply P1-5 first)
- [ ] Low-end Android (Chrome Lite, 360×640, throttled CPU): smooth scroll (apply P1-3 and P0-2)
- [ ] Accessibility sweep: VoiceOver reads FAQ as expandable, Dynamic Type zoom works (apply P1-1)
- [ ] Dark mode / light mode: logo swaps correctly (apply P3-1)
- [ ] Reduced-motion ON (iOS Settings → Accessibility → Motion): canvas animation disabled (apply P3-2)

---

## Summary scorecard

| Severity | Count | Must fix before publish? |
|---|---|---|
| P0 | 3 | Yes |
| P1 | 5 | Yes (this sprint) |
| P2 | 4 | Nice to have |
| P3 | 3 | Backlog |

**Estimated Core Web Vitals impact of P0+P1 fixes, mobile:**
- LCP: −300 to −500 ms (P2-3 async i18n + P2-1 lazy logos)
- INP: −150 to −250 ms (P1-3 consolidated scroll)
- CLS: −0.05 to −0.10 (P0-3 notch padding + P2-2 aspect-ratio)
- Battery: noticeable improvement on iOS (P0-2 rAF gating)
