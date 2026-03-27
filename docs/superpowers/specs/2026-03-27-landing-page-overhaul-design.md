# CogniFit Landing Page Overhaul — Design Spec

**Date:** 2026-03-27
**Scope:** 16 changes across HTML, CSS, JS — responsive for all devices + Wix iframe optimization

---

## A. Hero Section

### A1. Remove JS hero height conflict
- **iframe mode (main.js ~line 27-31):** Remove `hero.style.setProperty('height', 'auto')`, `min-height`, and `padding-bottom` overrides
- **non-iframe mode (main.js ~line 138-143):** Remove `hero.style.setProperty('height', 'auto')`, `min-height`, and `padding-bottom` overrides
- CSS `height:100svh` in Desktop/Tablet breakpoints takes effect without JS override

### A2. Hero subtitle — reduce text, remove "3"
- **Before:** "Aging is inevitable. **Cognitive decline doesn't have to be.** Protect the 3 core mental abilities that determine how independently you live as you age."
- **After:** "Aging is inevitable. **Cognitive decline doesn't have to be.** Protect the core mental abilities that determine how independently you live as you age."
- Only change: remove "3" from sentence

### A3. CTA text changes (all CTAs)
| Location | Current | New |
|----------|---------|-----|
| Hero button | "Start now" | "Protect Your Brain" |
| Platform section button | "Start now" | "Begin Now" |
| Outcomes section button | "Start now" | "See What's Possible" |
| Final CTA section button | "Start now" | "Take the First Step" |
| Discover section button | "Test your brain now" | "Discover Your Brain" |

### A4. Nav button
- **Before:** "LOGIN" → links to `/login`
- **After:** "Join Now" → links to CogniFit registration (see C1/C2 for URL logic)

### A5. Guarantee badges
- Remove arrows `→` from both badges
- Text becomes: "100% Satisfaction Guaranteed" and "30 Day Money Back"
- Add `padding-bottom` to `.guarantee-row` so badges don't stick to bottom edge

### A6. Phone mockup cards (Desktop/Tablet)
- Title: "Train" → **"Brain Train"**
- Skill 1: "Personalized" (80%) → **"Memory"** (80%)
- Skill 2: "Concentration" (62%) → **"Reasoning"** (62%)
- Skill 3: "Memory" (50%) → **"Concentration"** (50%)
- Skill 4: "Reasoning" (42%) → **"Coordination"** (42%)
- Bottom label: "Personalized Brain Training" → **"Your Daily Workout"**
- Stats card: Goal 550 → **Goal 670**

---

## B. Science / Triad Section

### B1. Reduce spacing
- Reduce `margin-top` on `.chain-note` (currently `8px` inline style)
- Reduce bottom margin/padding on `.triad-wrap`
- Goal: tighter visual connection between the 3 system cards, triad, and "Break one..." text

### B2. Triad interaction — fix behavior
**Current bugs:**
- Tapping a node turns cards red, but tapping again doesn't restore (stays red)
- Auto-reset is 5 seconds

**New behavior:**
1. **Initial state:** Instruction text = "Tap any system to see what happens when it fails"
2. **After tapping a node:** Card turns red/broken. Instruction text changes to: **"Tap the damaged system to restore balance"**
3. **Tapping the same (damaged) node again:** Restores ALL systems to original state (green). Text reverts to initial instruction.
4. **Auto-reset:** If user does nothing for **10 seconds** after tapping, auto-restore everything to original state
5. **Multiple taps on different nodes:** Each tap on a new node adds it to disabled set. Tapping any disabled node restores ALL.

---

## C. Links / Navigation

### C1. Desktop URLs
- All CTAs → `https://www.cognifit.com/assessments`
- All open in **new tab** (`target="_blank"`) so user doesn't lose the landing page

### C2. Mobile/Tablet URLs
- JS device detection:
  - **iOS** (check `navigator.userAgent` for iPhone/iPad) → `https://itunes.apple.com/app/cognifit-brain-fitness/id528285610?mt=8`
  - **Android** (check for Android) → `https://play.google.com/store/apps/details?id=com.cognifit.app&hl=en`
- Applies to ALL CTA buttons on mobile/tablet
- Also opens in new tab

### C3. Nav "Join Now" button
- Same URL logic as C1/C2
- Text: "Join Now"

---

## D. Press Logos

### D1. Uniform height
- Set all logos to same `max-height: 28px` (desktop)
- Remove per-logo height overrides that cause inconsistency
- Smart Money and other small logos become properly visible
- Responsive: tablet ~22px, mobile ~18px
- Ensure `filter` rules don't hide any logos
- All logos visible side by side, no overflow hiding

---

## E. Validation Section

### E1. Marquee scroll
- Replace static image with horizontal scrolling container
- Image duplicated side by side for infinite scroll illusion
- CSS `@keyframes marquee` animation — **slow continuous scroll** (e.g., 60-80s duration)
- Pause on hover (desktop)
- Works in iframe mode
- Responsive width handling

---

## F. Devices Section

### F1. Improved layout
- Reduce container margins/padding
- Fetch and use the devices image from CogniFit website
- Larger, more prominent device mockup display
- App Store / Play Store badges more prominent
- Update App Store URL to official: `https://itunes.apple.com/app/cognifit-brain-fitness/id528285610?mt=8`
- Clean responsive scaling

---

## G. Athlete SVG

### G1. New professional sports SVG
- Remove JS override in both iframe and non-iframe modes that replaces the HTML SVG
- Replace the existing HTML SVG (running stick figure) with a **polished sports-themed SVG**
- Design: athletic silhouette with dynamic pose, stadium/track elements, brain-sport connection visual
- Animated elements consistent with other pro-cards (subtle glow pulses, particle effects)
- Purple gradient background matching `--c:#4A148C`

---

## H. SEO & Text Review

### H1. Full text audit
- Review and optimize all headings, subheadings, and descriptions for SEO
- Target keywords: cognitive training, brain health, mental fitness, brain exercises, cognitive longevity, independence, aging
- Maintain brand tone — scientific yet accessible
- Sections to review:
  - Hero (h1, subtitle)
  - Discover (eyebrow, h2, lead)
  - Risk (h2, card titles, descriptions)
  - Science (h2, card content, chain note)
  - Platform (h2, step descriptions)
  - Outcomes (h2, pills, box content)
  - Who Is This For (card descriptions)
  - Pro cards (descriptions)
  - Trust (headline, stats)
  - Final CTA (h2, lead)

---

## I. Responsive — All Screen Sizes

### I1. Breakpoints to verify
- **Extra large:** 55", 50", 43" monitors (2560px+, 3840px+)
- **Large desktop:** 32", 27" (1920px-2560px)
- **Standard desktop:** 24" (1440px-1920px)
- **Small desktop:** ≥901px
- **Tablet:** 769px-900px
- **Mobile:** ≤768px
- **Small mobile:** ≤640px

### I2. Large monitor considerations
- Add `max-width` constraints to prevent content from stretching too wide
- Scale typography for very large viewports
- Ensure hero `100svh` works correctly on tall monitors
- Images and SVGs scale appropriately

---

## J. Wix Iframe Optimization

### J1. Absolute iframe compatibility
- Test all changes in iframe mode (`window.self !== window.top`)
- Ensure `position:sticky` nav works
- Scroll button behavior correct in iframe scroll context
- Marquee animation (validation) runs in iframe
- All reveal animations fire (IntersectionObserver override)
- Height reporting to parent via `postMessage` accounts for new content
- Device detection for mobile/tablet URLs works within iframe context
- No `position:fixed` elements that break in iframes

---

## Files affected
- `index.html` — HTML content changes (text, URLs, SVG, structure)
- `styles.css` — CSS changes (spacing, press logos, validation marquee, responsive, large screens)
- `main.js` — JS changes (hero height removal, triad interaction, URL routing, device detection, athlete SVG removal, validation marquee)
