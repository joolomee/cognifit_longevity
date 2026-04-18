# HTML patches (manual, per-element)

These must be edited directly in `webflow/04-BODY-HTML.html` — they are
small content-level changes that belong in the body HTML, not in a
site-wide custom-code block.

---

## P2-1 · Lazy-load the clinicsLogos marquee

Find **line 885** and **line 886** of `webflow/04-BODY-HTML.html`. Both
image tags currently carry `loading="eager"`. Change **both** to
`loading="lazy"`.

### Before

```html
<img src="https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/clinicsLogos.webp"
     onerror="this.onerror=null;this.src='https://www.cognifit.com/img/newart/clinicsLogos.webp'"
     alt="CogniFit partner institutions worldwide including Harvard, Stanford, University of Washington, Tel Aviv University, and 6,438+ more"
     class="val-marquee-img" width="1800" height="140"
     loading="eager" decoding="async">

<img src="https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/clinicsLogos.webp"
     onerror="this.onerror=null;this.src='https://www.cognifit.com/img/newart/clinicsLogos.webp'"
     alt="" aria-hidden="true"
     class="val-marquee-img" width="1800" height="140"
     loading="eager" decoding="async">
```

### After

```html
<img src="https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/clinicsLogos.webp"
     onerror="this.onerror=null;this.src='https://www.cognifit.com/img/newart/clinicsLogos.webp'"
     alt="CogniFit partner institutions worldwide including Harvard, Stanford, University of Washington, Tel Aviv University, and 6,438+ more"
     class="val-marquee-img" width="1800" height="140"
     loading="lazy" decoding="async">

<img src="https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/clinicsLogos.webp"
     onerror="this.onerror=null;this.src='https://www.cognifit.com/img/newart/clinicsLogos.webp'"
     alt="" aria-hidden="true"
     class="val-marquee-img" width="1800" height="140"
     loading="lazy" decoding="async">
```

Impact: saves ~40 KB of mobile data on pages where the user never
scrolls past the hero, and keeps the marquee off the LCP critical path.
