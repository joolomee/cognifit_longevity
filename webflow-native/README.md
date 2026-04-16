# Webflow Nativo — CogniFit Brain Longevity

> Guia completo para recriar a landing page `brain.cognifit.com/longevity` **de forma nativa** no Webflow, sem fetch loader, sem iframe — todo o conteúdo directamente nos Embeds do Webflow.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────┐
│  WEBFLOW PAGE SETTINGS                              │
│  ┌─────────────────────────────────────────────────┐│
│  │ Inside <head>: 01-head-custom-code.html         ││
│  │ → SEO meta, hreflang, Schema.org JSON-LD        ││
│  │ → Link to styles.css (Vercel CDN)               ││
│  │ → Link to i18n.js (Vercel CDN, defer)           ││
│  │ → Reveal-on-load script                         ││
│  │ → Inline CSS overrides (responsive)             ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
│  WEBFLOW CANVAS (Designer)                          │
│  ┌─────────────────────────────────────────────────┐│
│  │ Section 1 (bg: #000)  → Embed: globals + nav    ││
│  │ Section 2 (bg: #000)  → Embed: hero             ││
│  │ Section 3 (bg: #fff)  → Embed: discover         ││
│  │ Section 4 (bg: #1a1a) → Embeds: risk a + b      ││
│  │ Section 5 (bg: #fff)  → Embed: science          ││
│  │ Section 6 (bg: #000)  → Embed: platform         ││
│  │ Section 7 (bg: #fff)  → Embed: outcomes         ││
│  │ Section 8 (bg: #f5f5) → Embed: who              ││
│  │ Section 9 (bg: #1a1a) → Embeds: pro (9 embeds)  ││
│  │ Section 10 (bg: #f5f5)→ Embed: validation       ││
│  │ Section 11 (bg: #000) → Embed: trust            ││
│  │ Section 12 (bg: #000) → Embed: faq              ││
│  │ Section 13 (bg: blue) → Embed: cta              ││
│  │ Section 14 (bg: #000) → Embed: closing          ││
│  │ Section 15 (bg: #111) → Embed: footer           ││
│  │ (floating)            → Embed: sticky-cta       ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
│  ┌─────────────────────────────────────────────────┐│
│  │ Before </body>: 03-before-body-close.html       ││
│  │ → Carrega main.js do Vercel CDN                 ││
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

### Vantagens vs abordagem anterior (fetch loader)

| Aspecto | Fetch Loader (antigo) | Nativo (este) |
|---|---|---|
| SEO body content | ❌ Injectado via JS (não crawlável) | ✅ Server-rendered pelo Webflow |
| Tempo de carregamento | ⚠️ Fetch + parse + inject (~1-2s) | ✅ Imediato (já no HTML) |
| CORS | ⚠️ Necessita `Access-Control-Allow-Origin: *` | ✅ Sem dependência CORS |
| Manutenção | ✅ Uma única source (Vercel) | ⚠️ Embeds no Webflow + CDN assets |
| Dependência Vercel | 🔴 Página não funciona se Vercel cair | ✅ Conteúdo serve-se do Webflow |

---

## Pré-requisitos

- **Plano Webflow pago** (CMS, Business ou Enterprise)
  - Custom Code no head: CMS = 20K chars, Business = 100K chars
  - O head custom code tem ~29K chars → precisa de plano **Business** ou superior
  - Cada HTML Embed tem limite de ~10K caracteres (todos os embeds respeitam este limite)
- **Vercel deploy activo** em `brain.cognifit.com/longevity` (serve CSS, JS, i18n, imagens)

---

## Ficheiros

### Page Settings (2 ficheiros)

| Ficheiro | Destino no Webflow | Tamanho | Descrição |
|---|---|---|---|
| `01-head-custom-code.html` | Page Settings → Inside `<head>` | 29 KB | Meta SEO + hreflang + Schema JSON-LD + CSS/i18n links + inline CSS overrides |
| `03-before-body-close.html` | Page Settings → Before `</body>` | 0.9 KB | Carrega main.js do CDN (sem dependência de fetch) |

### Embeds do Canvas (26 ficheiros)

Cada ficheiro corresponde a um **HTML Embed element** no Webflow Designer. Todos estão abaixo do limite de 10K caracteres.

| Ficheiro | Chars | Secção Webflow | Background | Descrição |
|---|---|---|---|---|
| `embed-00-globals.html` | 1,259 | Section 1 | `#000` | Progress bar, cursor, SVG gradients |
| `embed-01-nav.html` | 954 | Section 1 | `#000` | Navbar (logos via CDN URL) |
| `embed-02-hero.html` | 4,846 | Section 2 | `#000` | Hero: h1, CTA, rating, phones |
| `embed-03-discover.html` | 3,332 | Section 3 | `#fff` | 4 cognitive skill cards |
| `embed-04a-risk-content.html` | 8,399 | Section 4 | `#1a1a1a` | Risk pillars + 4 risk cards |
| `embed-04b-risk-puzzle.html` | 5,192 | Section 4 | `#1a1a1a` | SVG puzzle animation + solution |
| `embed-05-science.html` | 8,484 | Section 5 | `#fff` | 3 system cards + triad SVG |
| `embed-06-platform.html` | 2,731 | Section 6 | `#000` | 4-step process |
| `embed-07-outcomes.html` | 7,401 | Section 7 | `#fff` | Charts + result pills |
| `embed-08-who.html` | 2,531 | Section 8 | `#f5f5f5` | 4 audience cards |
| `embed-09a-pro-open.html` | 933 | Section 9 | `#1a1a1a` | Pro section header |
| `embed-09b-pro-card1.html` | 6,064 | Section 9 | `#1a1a1a` | Healthcare Professionals |
| `embed-09c-pro-card2.html` | 4,965 | Section 9 | `#1a1a1a` | Scientific Research |
| `embed-09d-pro-card3.html` | 5,968 | Section 9 | `#1a1a1a` | Education Professionals |
| `embed-09e-pro-card4.html` | 5,107 | Section 9 | `#1a1a1a` | Employee Wellbeing |
| `embed-09f-pro-card5.html` | 3,749 | Section 9 | `#1a1a1a` | Clinical Trials |
| `embed-09g-pro-card6.html` | 3,710 | Section 9 | `#1a1a1a` | White Label Partnerships |
| `embed-09h-pro-card7.html` | 6,894 | Section 9 | `#1a1a1a` | Athletes |
| `embed-09i-pro-close.html` | 21 | Section 9 | `#1a1a1a` | Pro section closing tags |
| `embed-10-validation.html` | 4,499 | Section 10 | `#f5f5f5` | 11 partner logos |
| `embed-11-trust.html` | 4,644 | Section 11 | `#000` | Stats + badges + press logos |
| `embed-12-faq.html` | 9,884 | Section 12 | `#000` | 6 FAQ accordion items |
| `embed-13-cta.html` | 1,403 | Section 13 | `var(--blue)` | 3-step CTA flow |
| `embed-14-closing.html` | 955 | Section 14 | `#000` | Closing quote |
| `embed-15-footer.html` | 8,559 | Section 15 | `#111` | 4-column footer (logo via CDN) |
| `embed-16-sticky-cta.html` | 410 | (flutuante) | — | Sticky CTA (fixed position) |

---

## Passo-a-passo

### 1. Criar a página no Webflow

1. **Designer → Pages → "+" → New Page**
2. **Slug:** `longevity`
3. **Title/SEO meta:** deixar vazio (sobreposto pelo head injection)
4. **Open Graph Image:** deixar vazio (definido no head code)

### 2. Head Custom Code

1. **Page Settings** desta página → **Inside `<head>` tag**
2. Copiar o conteúdo **INTEIRO** de `01-head-custom-code.html` e colar
3. Save

> ⚠️ Este ficheiro tem ~29K chars. Precisa de plano **Business** (100K limit) ou **Enterprise**.

### 3. Construir o Canvas (Sections + Embeds)

No Webflow Designer, criar **15 Sections** seguindo a tabela abaixo. Dentro de cada Section, arrastar um ou mais **Embed** elements e colar o conteúdo do ficheiro correspondente.

#### Section 1 — Globals + Nav

- **Section Settings:** background `#000000`, padding `0`
- **Embed 1:** colar `embed-00-globals.html`
- **Embed 2:** colar `embed-01-nav.html`

> ℹ️ O nav é `position: fixed` via CSS, por isso ficará no topo independentemente da posição no DOM.

#### Section 2 — Hero

- **Section Settings:** sem background (a `.hero` class tem o seu próprio), padding `0`
- **Embed:** colar `embed-02-hero.html`

#### Section 3 — Discover Your Brain

- **Section Settings:** background `#ffffff`, padding `0`
- **Embed:** colar `embed-03-discover.html`

#### Section 4 — Risk / The Missing Piece

- **Section Settings:** background `#1a1a1a`, padding `0`
- **Embed 1:** colar `embed-04a-risk-content.html`
- **Embed 2:** colar `embed-04b-risk-puzzle.html`

#### Section 5 — Science

- **Section Settings:** background `#ffffff`, padding `0`
- **Embed:** colar `embed-05-science.html`

#### Section 6 — How It Works (Platform)

- **Section Settings:** background `#000000`, padding `0`
- **Embed:** colar `embed-06-platform.html`

#### Section 7 — Outcomes

- **Section Settings:** background `#ffffff`, padding `0`
- **Embed:** colar `embed-07-outcomes.html`

#### Section 8 — Who Benefits

- **Section Settings:** background `#f5f5f5`, padding `0`
- **Embed:** colar `embed-08-who.html`

#### Section 9 — For Professionals

- **Section Settings:** background `#1a1a1a`, padding `0`
- **9 Embeds** (um por ficheiro, por ordem):
  1. `embed-09a-pro-open.html` — abre section + heading
  2. `embed-09b-pro-card1.html` — Healthcare
  3. `embed-09c-pro-card2.html` — Research
  4. `embed-09d-pro-card3.html` — Education
  5. `embed-09e-pro-card4.html` — Employee
  6. `embed-09f-pro-card5.html` — Clinical Trials
  7. `embed-09g-pro-card6.html` — White Label
  8. `embed-09h-pro-card7.html` — Athletes
  9. `embed-09i-pro-close.html` — fecha as divs/section

> ⚠️ **IMPORTANTE:** Os 9 embeds da secção Pro devem ser colocados **todos como filhos directos** da mesma Section (ou de uma Div wrapper), **sem** margens/paddings extras do Webflow entre eles. O CSS do `pro-stack` (grid) espera que os `pro-card` sejam irmãos directos dentro de `.pro-stack`. Como cada embed gera um `<div>` wrapper no Webflow, o grid pode precisar de ajuste — ver secção [Notas Técnicas](#notas-técnicas).

#### Section 10 — Validation

- **Section Settings:** background `#f5f5f5`, border-top `1px solid #e5e5e5`, padding `0`
- **Embed:** colar `embed-10-validation.html`

#### Section 11 — Trust

- **Section Settings:** background `#000000`, padding `0`
- **Embed:** colar `embed-11-trust.html`

#### Section 12 — FAQ

- **Section Settings:** background `#000000`, padding `0`
- **Embed:** colar `embed-12-faq.html`

#### Section 13 — CTA

- **Section Settings:** background `#1A73E8` (var(--blue)), padding `0`
- **Embed:** colar `embed-13-cta.html`

#### Section 14 — Closing

- **Section Settings:** background `#000000`, padding `0`
- **Embed:** colar `embed-14-closing.html`

#### Section 15 — Footer

- **Section Settings:** background `#111111`, padding `0`
- **Embed:** colar `embed-15-footer.html`

#### Floating — Sticky CTA

- **Fora de qualquer Section**, arrastar um Embed e colar `embed-16-sticky-cta.html`
- Este elemento é `position: fixed` via CSS e aparece/desaparece com scroll (controlado por main.js)

### 4. Before `</body>` Custom Code

1. **Page Settings** → **Before `</body>` tag**
2. Colar o conteúdo de `03-before-body-close.html`
3. Save

### 5. Publicar e Validar

Abrir a página publicada e confirmar:

- ✅ Hero, phones, shimmer animation aparecem
- ✅ Discover section com 4 skill cards
- ✅ Risk section com puzzle SVG animado
- ✅ Science triad SVG com partículas
- ✅ Platform 4-step grid
- ✅ Outcomes com 2 charts SVG
- ✅ Who Benefits 4 cards
- ✅ Professional stack com 7 cards
- ✅ Validation logos + Trust badges + press logos
- ✅ FAQ accordion abre/fecha
- ✅ CTA 3-step flow
- ✅ Custom cursor segue o rato (desktop)
- ✅ Sticky CTA aparece após scroll do hero
- ✅ Reading progress bar no topo
- ✅ Language selector muda idioma (`?lang=es`, etc.)
- ✅ Responsivo funciona em mobile/tablet
- ✅ DevTools → Network: `styles.css`, `i18n.js`, `main.js` carregam de `brain.cognifit.com` com 200 OK

### 6. SEO

- **View Source:** confirmar que o head injection tem todo o Schema.org JSON-LD, hreflang, OG, etc.
- **Rich Results Test:** testar em https://search.google.com/test/rich-results
  - Deve mostrar: Organization, WebPage, FAQ, HowTo, Product, BreadcrumbList
- **Google Search Console → URL Inspection:** confirmar que indexa correctamente
- **Conteúdo crawlável:** Ao contrário da abordagem fetch, o conteúdo dos Embeds É server-rendered pelo Webflow, logo É crawlável pelo Google

---

## Notas Técnicas

### Webflow Embed Wrapper Divs

O Webflow envolve cada HTML Embed num `<div class="w-embed">`. Isto pode afetar:

1. **CSS Grid/Flex children:** Classes como `.pro-stack` esperam que `.pro-card` sejam filhos directos. Com os embeds separados, cada card está dentro de um `w-embed` wrapper. **Solução:** Adicionar este CSS extra no head custom code se necessário:
   ```css
   .w-embed { display: contents; }
   ```
   Isto faz o wrapper "desaparecer" do layout, mantendo os filhos como se fossem directos.

2. **Section tags:** Alguns embeds abrem `<section>` e fecham `</section>`. Como estão dentro de `w-embed`, podem criar nesting diferente do esperado. Na maioria dos casos funciona, mas testar a renderização.

### Imagens Base64 → CDN

Os embeds `embed-01-nav.html` e `embed-15-footer.html` usam URLs CDN em vez de data URIs base64 para os logos CogniFit:

- `https://brain.cognifit.com/longevity/cognifit_logo_darkblue.png` (nav, tema escuro)
- `https://brain.cognifit.com/longevity/cognifit_logo_white.png` (nav, tema claro)
- `https://brain.cognifit.com/longevity/cognifit_logo_blue.png` (footer)

> ⚠️ Confirmar que estes ficheiros PNG existem no deploy Vercel. Se os nomes forem diferentes, actualizar os `src` nos embeds correspondentes.

### Assets no Vercel CDN

Todos os assets estáticos continuam servidos pelo Vercel CDN em `brain.cognifit.com/longevity/`:

| Asset | URL | Tamanho |
|---|---|---|
| CSS | `/longevity/styles.css` | 136 KB |
| i18n | `/longevity/i18n.js` | 652 KB |
| main.js | `/longevity/main.js` | 58 KB |
| Fontes | Google Fonts CDN | — |
| Imagens de profissionais | Inline SVG nos embeds | — |
| OG Image | `/longevity/og-image.jpg` | — |

### Adicionar um Idioma

1. Adicionar o entry no `i18n.js` (no repo Vercel)
2. Adicionar `<link rel="alternate" hreflang="xx" ...>` em `01-head-custom-code.html`
3. Re-colar o head code no Webflow

### Actualizar Conteúdo

Para actualizar texto, layout, ou estilos:

1. **Se é conteúdo HTML (texto, structure):** Editar o embed correspondente no Webflow e re-publicar
2. **Se é CSS ou JS:** Editar `styles.css` ou `main.js` no repo → push → Vercel re-deploy (cache 1h)
3. **Se é tradução:** Editar `i18n.js` no repo → push → Vercel re-deploy

### Invalidar Cache

- Vercel Dashboard → Deployments → Redeploy
- Ou alterar `?v=` nos URLs do head code (ex: `styles.css?v=2`)

---

## Comparação com a Abordagem Anterior

| Ficheiro | Webflow Fetch (antigo) | Webflow Nativo (este) |
|---|---|---|
| `01-head-custom-code.html` | ✅ Idêntico | ✅ Idêntico |
| `02-body-embed.html` | Fetch loader (3.2 KB) | **Substituído por 26 embeds** |
| `03-before-body-close.html` | Espera `cognifit:body-ready` event | **Carrega main.js directamente** |
| Embeds | 1 (fetch loader) | 26 (conteúdo inline) |
| SEO body | ❌ Não crawlável | ✅ Crawlável |
| Dependência Vercel runtime | 🔴 Crítica (page breaks) | ✅ Só para assets (CSS/JS/i18n) |

---

## Estrutura de Ficheiros

```
webflow-native/
├── 01-head-custom-code.html          # Page Settings → Inside <head>
├── 03-before-body-close.html         # Page Settings → Before </body>
├── embed-00-globals.html             # Progress bar + cursor + SVG defs
├── embed-01-nav.html                 # Navigation (CDN logo URLs)
├── embed-02-hero.html                # Hero section
├── embed-03-discover.html            # Discover Your Brain
├── embed-04a-risk-content.html       # Risk: text + cards
├── embed-04b-risk-puzzle.html        # Risk: SVG puzzle
├── embed-05-science.html             # Science + triad SVG
├── embed-06-platform.html            # How It Works (4 steps)
├── embed-07-outcomes.html            # Outcomes + charts
├── embed-08-who.html                 # Who Benefits
├── embed-09a-pro-open.html           # Pro section: header
├── embed-09b-pro-card1.html          # Pro: Healthcare
├── embed-09c-pro-card2.html          # Pro: Research
├── embed-09d-pro-card3.html          # Pro: Education
├── embed-09e-pro-card4.html          # Pro: Employee Wellbeing
├── embed-09f-pro-card5.html          # Pro: Clinical Trials
├── embed-09g-pro-card6.html          # Pro: White Label
├── embed-09h-pro-card7.html          # Pro: Athletes
├── embed-09i-pro-close.html          # Pro section: closing tags
├── embed-10-validation.html          # Validation logos
├── embed-11-trust.html               # Trust + press logos
├── embed-12-faq.html                 # FAQ accordion
├── embed-13-cta.html                 # CTA section
├── embed-14-closing.html             # Closing quote
├── embed-15-footer.html              # Footer (CDN logo URL)
├── embed-16-sticky-cta.html          # Sticky floating CTA
└── README.md                         # Este ficheiro
```
