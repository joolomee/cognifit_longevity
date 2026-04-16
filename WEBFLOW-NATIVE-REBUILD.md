# CogniFit Longevity — Webflow Native Rebuild Plan

**Goal:** rebuild `/longevity` 100% natively in Webflow Designer so the published page matches the Vercel reference (`index.html` + `styles.css`) byte-for-byte, with zero third-party CDN dependencies and zero safety-net CSS overrides.

**Reference site (source of truth):** `index.html` + `styles.css` + `webflow-main.js` + `i18n.js` at repo root.

**Current Webflow page:** `https://cognifit-df2ae7.webflow.io/longevity` (Site ID `68187102be717016f4f0f17b`).

**Effort estimate:** 150–200 hours across design + build + QA + 22-language review.

---

## 0. How to use this document

This `.md` is written for **Claude Code with Webflow MCP access** (or a human operator). Each section has:

- **Context** — what the current state is
- **Target** — what it should become
- **Steps** — ordered actions to execute via Webflow Designer API / MCP / manual

When executing, **check each step off** by editing this file and changing `- [ ]` to `- [x]`, then commit. That way progress is tracked in git.

---

## 1. Design tokens → Webflow Style Guide

**Context:** `styles.css` and `webflow/02-STYLES.css` define ~40 CSS custom properties that the entire page depends on. The Webflow Designer has no concept of CSS variables out of the box — but Webflow **does** support **Global Variables** (Style Panel → Variables) since 2024.

**Target:** every custom property registered as a Webflow Variable, grouped by category. Components then bind to variables instead of raw values, so theme changes propagate.

### Steps

- [ ] **Colors** (create as Color variables):
  - `blue` = `#1A73E8`
  - `blue-d` = `#1256B8`
  - `blue-l` = `#E8F0FE`
  - `green` = `#34A853`
  - `yellow` = `#FBBC04`
  - `g1` = `#111`, `g2` = `#1E1E1E`, `g3` = `#C4C4C4`, `g4` = `#B0B0B0`
  - `badge-bg` = `rgba(26,115,232,.12)`
  - `badge-border` = `rgba(26,115,232,.35)`
  - `badge-dot` = `#4D96FF`
  - `shimmer-1` = `rgba(180,200,255,.75)` · `shimmer-2` = `rgba(100,160,255,.85)` · `shimmer-3` = `rgba(26,115,232,.80)` · `shimmer-4` = `rgba(160,200,255,.75)`

- [ ] **Typography** (create as Size + font-family variables):
  - Font family: `Plus Jakarta Sans` (weights 400/500/600/700/800/900) — add via Webflow Font Manager
  - `h1-size` = `clamp(40px, 6vw, 72px)` — use Webflow's fluid text feature
  - `h2-size` = `clamp(28px, 4.2vw, 48px)`
  - `sub-size` = `clamp(16px, 1.6vw, 19px)`
  - `h1-lh` = `1.05` · `body-lh` = `1.6`

- [ ] **Spacing**:
  - `section-pad-y` = `clamp(48px, 8vw, 96px)`
  - `section-gap` = `clamp(40px, 6vw, 72px)`
  - `wrap-pad` = `clamp(16px, 3vw, 32px)`
  - `wrap-max` = `1060px`
  - `hero-gap` = `clamp(24px, 4vw, 48px)`
  - `hero-pad-top` = `clamp(96px, 12vw, 160px)`

- [ ] **Radii**: `radius` = `16px` · `radius-sm` = `10px` · `radius-pill` = `999px`

- [ ] **Shadows**: `shadow-soft` = `0 8px 32px rgba(0,0,0,.25)` · `shadow-hard` = `0 14px 48px rgba(0,0,0,.45)`

- [ ] **Breakpoints** — Webflow stock: 479 / 767 / 991 / 1280 / 1440 / 1920 px. Use the "Add large breakpoints" menu to enable 1280/1440/1920. Don't try to recreate 380/540/640/720 — fold those into a single mobile rule.

---

## 2. Section inventory (13 sections, in order)

Build each section as a Webflow Section block with a semantic class. Reuse Symbols/Components defined in §3.

| # | Webflow Section name | Class | Notes |
|---|---|---|---|
| 1 | Hero | `hero` | Fixed nav on top. Canvas neural animation + hero-phones. |
| 2 | Discover / Skills | `discover s-white` | Skills panel with 4 skill bars. |
| 3 | Risks | `risks s-dark` | Wellness gap grid + 4-card flip row + solution badge. |
| 4 | Platform | `platform s-black` | 4 steps: Assess → Personalize → Train → Track. |
| 5 | Outcomes | `outcomes s-white` | Two SVG charts (memory + attention) + 2 outcome boxes. |
| 6 | Who (Audiences) | `who s-off` | 4 audience cards (Senior / Adult / Pro / Family). |
| 7 | Pro Validation | `pro s-dark` | 4–6 pro-cards with parallax glow. |
| 8 | Validation (Press) | `validation s-off` | Marquee of 11 press logos. |
| 9 | Science | `science s-white` | 3 sci-cards linking neuroscience systems. |
| 10 | Trust / Stats | `trust s-black` | Header + 4 animated stats + 4 trust badges + press strip. |
| 11 | Closing CTA (blue) | `benefit-cta` | Big blue box with "Faça a Avaliação" CTA. |
| 12 | FAQ | `faq s-white` | 10 FAQ items, accordion. |
| 13 | Footer | `site-footer` | 3–4 column grid + social + legal. |

**Between section 11 and 12** there's also a quote block (`.closing` with dark bg). Include it as a sub-section of 11.

---

## 3. Reusable components (Webflow Symbols + Component Sets)

Build these FIRST. Then drag into sections.

- [ ] **Nav Bar Symbol** (`nav`) — fixed top, backdrop-filter blur(12px), z-index 900. Children: logo img · nav-links (Platform/FAQ/Science/Benefits) · nav-r (lang-btn dropdown + btn-login). Language switcher fires `window.CogniFitI18n.setLanguage(lang)` on click.

- [ ] **Button Primary** Symbol (`btn-primary`) — pill shape, blue bg, white text, 14px/28px padding, `data-i18n` attribute slot. Hover: translateY(-1px) + blue-d. Must accept auto-routing JS (iOS/Android/desktop detection).

- [ ] **Button Secondary** Symbol (`btn-secondary`) — outline variant.

- [ ] **Hero Badge** Symbol (`hero-badge`) — inline-flex pill, dot + text. Data-i18n key: `hero.badge`.

- [ ] **Hero Phones** Component Set (`hero-phones`):
  - Variant A: `phone-train` — title + 4 skill bars + workout footer
  - Variant B: `phone-stats` — title + chart + cognitive age card
  - Both share the phone frame (`.phone .ph-body` + bezel, rounded 36px).

- [ ] **Skill Row** Symbol (`sk-row`) — icon + name + progress bar fill. Bar fill animates from 0% to stored width via Webflow IX2 "Scroll into view".

- [ ] **Risk Card** Symbol (`risk-card`) with front/back states — icon + title + hint (front); description + bullets (back). Click toggles `.open`. Hover: 3D tilt (custom JS).

- [ ] **Wellness Gap Item** (`wg-item`) — icon + label + missing-tag + check mark.

- [ ] **Step Card** Symbol (`step-card`) — numbered badge (01–04) + title + checklist. Reveal stagger on scroll via IX2.

- [ ] **Stat Tile** Symbol (`stat-bl`) — big number + label + icon. Counter animation triggered by IntersectionObserver (custom JS stays).

- [ ] **Audience Card** Symbol (`aud-card`) — icon + heading + description (line-clamp 3 on mobile with "▾ Ler mais" chevron).

- [ ] **Pro Card** Symbol (`pro-card`) — title + metrics grid (clinicians/patients counts) + explore CTA. Background parallax via IX2.

- [ ] **FAQ Item** Symbol (`faq-item`) — use native `<details>` element. Summary = question; content = answer. No custom JS needed if native details work. Max-height transition via CSS.

- [ ] **Press Logo Card** Symbol (`press-logo-card`) — img in dark rounded card, greyscale hover colored. Used in infinite marquee.

- [ ] **Footer Column** Symbol (`footer-col`) — heading + link list. Used 3–4 times in footer grid.

---

## 4. Interactions (IX2 vs custom JS)

### Replace with Webflow IX2 (no custom JS needed)

- [ ] **Section background parallax** (`.s-black`, `.s-dark`, `.s-blue`, `.closing`) — IX2 Scroll trigger, pseudo-element translateY.
- [ ] **Skill bar fill animation** — IX2 "Scroll into view", animate width 0% → stored value over 600ms.
- [ ] **Scroll-top button appear/hide** — IX2 Page Scrolled > 200px → opacity 0 → 1.
- [ ] **Reading progress bar** — IX2 Scroll Progress animation on `#reading-progress` width.
- [ ] **Reveal on load** (`.r` → `.on`) — IX2 Page Load animation + stagger via `.d1/.d2/.d3/.d4` delays.
- [ ] **FAQ accordion** — use native `<details>` OR IX2 Click toggle `.open` class.
- [ ] **Hero badge pulse dot** — IX2 infinite loop animation on `.badge-dot` (scale 1 → 1.2 → 1).
- [ ] **Puzzle missing piece SVG** — already pure SVG `<animateTransform>`; keep as-is.

### Must stay as custom JS (keep in a minimized `webflow-main.js` hosted on jsDelivr or inline in Custom Code)

- [ ] **Canvas neural animation** (hero background) — requestAnimationFrame loop, mousemove attraction.
- [ ] **Stat counter animation** — animates textContent from 0 → target with decimal/thousand-sep; IntersectionObserver trigger.
- [ ] **Pro card cursor glow** — mousemove → compute angle/distance → CSS filter blur + inset shadow.
- [ ] **Risk card 3D hover tilt** — mousemove perspective transform.
- [ ] **Cursor glow ring** (desktop) — follows cursor with 50ms lag via requestAnimationFrame.
- [ ] **CTA URL routing** — navigator.userAgent detection → rewrite href to App Store / Play Store / desktop.
- [ ] **data-i18n attribute injection** — IIFE that adds missing `data-i18n` attrs on elements Webflow can't annotate.
- [ ] **Language switcher logic** (from `i18n.js`) — translates all `[data-i18n]` elements on `setLanguage(lang)`.
- [ ] **Hero H1 parallax layers** — scroll offset multiplier per text layer.
- [ ] **Risk visual column DOM injection** — orbiting pillars structure that Webflow can't build visually.

---

## 5. i18n strategy

**Decision:** keep the current `i18n.js` engine. Do NOT use Webflow Localize (paid add-on requires separate page per locale → SEO nightmare; hreflang already set for query-param strategy).

### Steps

- [ ] Upload `i18n.js` as external script in Page Settings → Custom Code (Head) with `defer`.
- [ ] Add `data-i18n="<key>"` attributes in Webflow Designer on every text element. When the Designer's field is plain text, the Embed trick works: `<span data-i18n="key">Fallback Text</span>`.
- [ ] For paragraphs containing bold/links, use `data-i18n-html` instead (i18n.js treats value as HTML).
- [ ] Language switcher in nav — on click: `window.CogniFitI18n.setLanguage('pt' | 'en' | 'es' | 'fr' | 'de' | 'it' | ...)`. Persists to localStorage.
- [ ] Verify all 340 keys render in all 22 languages. The highest-risk ones are: hero.h1.line3 (shimmer span), trust.h.top (inline span with number between), risk.*.d (multi-paragraph with bold).

---

## 6. Known gaps (safety-net rules #1–#26) — ELIMINATE by rebuilding natively

Each of these exists because the current Webflow Designer DOM diverges from the reference. **When rebuilding natively, build the DOM to match the reference exactly and delete these safety-net rules.**

| # | Rule location | Gap | Native fix |
|---|---|---|---|
| 1 | `02-STYLES.css:6700+` (#1) | Hero badge renders empty | Build hero-badge as Symbol with child span + dot |
| 2 | `#15` | `.hero-shimmer-soft` gradient missing | Apply gradient text-clip in Style Panel of the shimmer span |
| 3 | `#16–17` | Mobile hero padding too small, text hugs margin | Set `--hero-pad-top` variable + wrap padding per breakpoint |
| 4 | `#18` | `.sk-row:hover` margin jump | Don't add negative margin in base styles |
| 5 | `#19` | `.sci-card h3` too small | Use `h2-size` variable in Style Panel |
| 6 | `#20` | `.rni-solution` layout broken | Build as CSS Grid 3-col (icon/body/badge) natively |
| 7 | `#21` | Mobile charts oversize | Set `max-height: 120px` in mobile breakpoint |
| 8 | `#22` | Sector cards oversize mobile | Apply `aspect-ratio: 16/10` + line-clamp 4 on desc |
| 9 | `#23` | Audience cards no "Ler mais" hint | Add `::after { content: "▾ Ler mais" }` CSS in component |
| 10 | `#24` | Closing section padding gigante mobile | Set `padding-top: 40px` in mobile breakpoint |
| 11 | `#25a` | Empty Div Blocks above H1 | Don't create unnamed empty divs; use Symbols instead |
| 12 | `#25b` | Blue→dark section salto | Set symmetric `--section-pad-y` on both |
| 13 | `#25c` | Stats stuck at 0, missing whitespace | Build trust-headline with inline spans + CSS `::after` space; keep counter JS |
| 14 | `#25d` | FAQ doesn't open mobile | Use native `<details>` element |
| 15 | `#25e` | Media queries incomplete | Use Webflow stock breakpoints (479/767/991/1280/1440/1920) |
| 16 | `#25f` | Stray empty divs render as rectangles | Don't create them in Designer |
| 17 | `#26` | Custom properties exposed | Use Webflow Global Variables |

**Outcome when §1–§5 complete:** delete rules #1 through #26 from `02-STYLES.css`. The safety-net-free CSS should be ≤80KB (fits in 2 HTML Embed components if needed).

---

## 7. Top 10 priority rebuild order

Execute in this sequence. Each should be a separate PR so review is manageable.

1. **Design tokens** (§1) — no visual changes yet, just Variables registered. Unlocks everything else.
2. **Nav Bar Symbol** (§3) — visible site-wide; start here because errors cascade.
3. **Hero Section** (§2 #1) — biggest LCP impact; canvas + phones + shimmer H1.
4. **Hero Phones Component Set** — reusable; drives hero completion.
5. **Skill Bars + Discover section** (§2 #2).
6. **Step Cards + Platform section** (§2 #4).
7. **Stat Tiles + Trust section** (§2 #10) — keep counter JS, build component natively.
8. **FAQ Accordion** (§2 #12) — use native `<details>`.
9. **Risk section** (§2 #3) — complex, contains DOM injection JS; tackle after simpler ones.
10. **Footer + CTAs** — global, last so all links exist.

Sections 5 (Outcomes), 6 (Who), 7 (Pro), 8 (Validation), 9 (Science), 11 (Closing), 13 (Footer) fill in between.

---

## 8. QA checklist (run after each section rebuild)

For every rebuilt section, verify:

- [ ] **Visual parity** — screenshot side-by-side with Vercel reference (desktop 1440, tablet 991, mobile 479). Diff should be zero.
- [ ] **i18n coverage** — switch between PT / EN / ES / FR / DE / IT. Every text updates. No key leaks (`trust.h.top` showing raw).
- [ ] **Responsive** — test at 380, 479, 767, 991, 1280, 1440, 1920 px. No horizontal scroll. Tap targets ≥44px.
- [ ] **Interactions** — hover, click, scroll-trigger all fire. No console errors.
- [ ] **Accessibility** — keyboard nav reaches every interactive element. `:focus-visible` ring shows. Screen reader announces correctly. Contrast ratios ≥4.5:1 for body text, ≥3:1 for headings.
- [ ] **Performance** — run Lighthouse. LCP <2.5s, CLS <0.1, INP <200ms. No render-blocking resources.
- [ ] **SEO** — canonical, hreflang, JSON-LD still valid. Search Console: no mobile usability / indexing errors.

---

## 9. Files to delete / collapse when rebuild complete

Once natively rebuilt:

- `webflow/02-STYLES.css` — delete rules #1–#26; keep only `.hero`, `.btn-primary`, etc. base styles (or move them entirely into Webflow Style Panel and delete the file).
- `webflow/03-BODY-JS.html` — delete the safety-net script (hero-badge text injection, footer EN translate fix, lang-btn style reset). Keep only the counter/FAQ bindings if not migrated to IX2.
- `webflow/04-BODY-HTML.html` — delete entirely (the page is now native).
- `webflow/webflow-main.js` — slim down to only the "must stay custom" behaviors listed in §4.
- `i18n.js` — keep as-is.

Expected final state: `01-HEAD-CODE.html` (SEO + fonts + variables) + `webflow-main.js` (minimal custom JS) + `i18n.js` (translations). No safety nets. No CDN dependency except the intentional i18n + webflow-main on jsDelivr or Webflow's own asset hosting.

---

## 10. Execution protocol for Claude Code

When you (Claude) pick up this plan:

1. **Read this file fresh each session** — don't rely on memory. Check which `[ ]` are still unchecked.
2. **One section per conversation turn** — don't try to rebuild everything in one run. Rebuild one component, verify visually via Webflow MCP preview, commit, then move on.
3. **Use Webflow MCP tools** (`mcp__webflow__*`) to read current Designer state and apply changes. Don't edit via Custom Code injection — this plan is about going native.
4. **Commit messages** should reference this file: `rebuild(hero): ... (see WEBFLOW-NATIVE-REBUILD.md §2#1)`.
5. **When a section is done**, edit this file: check the boxes, commit.
6. **When all sections are done**, delete the safety-net rules (§9) and run full Lighthouse + visual regression.

---

## Appendix A — Reference file map

| File | Purpose | Keep after rebuild? |
|---|---|---|
| `index.html` | Source of truth design | Keep (reference) |
| `styles.css` | Source of truth CSS (150KB) | Delete — migrated to Webflow Style Panel |
| `webflow/01-HEAD-CODE.html` | Page Head (SEO + fonts + CSS link) | Keep (trimmed) |
| `webflow/02-STYLES.css` | Full safety-net CSS (246KB) | Delete safety nets; keep component base styles if any |
| `webflow/03-BODY-JS.html` | Before-body safety-net JS | Delete safety nets; keep counter/FAQ if not IX2 |
| `webflow/04-BODY-HTML.html` | Dumped HTML injected into page (239KB) | **Delete entirely** (native build replaces it) |
| `webflow/webflow-main.js` | App bundle (99KB) | Keep trimmed to custom-only behaviors (§4) |
| `i18n.js` | Translations (658KB incl. 22 langs) | Keep as-is |
| `scripts/publish-webflow.sh` | Publish helper | Keep |
| `vercel.json` | Reference hosting (optional) | Keep if reference mirror on Vercel stays live |

---

## Appendix B — Webflow MCP tools expected

For a Claude Code session to execute this plan, the following MCP tools (from `@webflow/mcp-server`) should be exposed:

- `mcp__webflow__get_site` / `list_sites`
- `mcp__webflow__get_page` / `list_pages`
- `mcp__webflow__get_dom` / `update_dom`
- `mcp__webflow__create_element` / `update_element` / `delete_element`
- `mcp__webflow__set_style` / `create_variable`
- `mcp__webflow__create_symbol` / `instantiate_symbol`
- `mcp__webflow__publish_site`

If the available MCP is missing some of these, fall back to the Webflow Data API directly via `curl` + `.webflow-token`.

---

*Last updated:* 2026-04-16 · *Branch of record:* `main` (post-merge of `claude/fix-previous-issues-kLXwE`)
