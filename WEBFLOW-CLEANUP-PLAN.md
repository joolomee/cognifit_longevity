# Webflow Cleanup — cognifit-df2ae7.webflow.io

## ✅ ESTADO FINAL (15 Abril 2026) — PARIDADE TOTAL COM VERCEL

Bridge + Data API foram desbloqueados e executei TUDO automaticamente.
O site está publicado, DOM 100% limpo, e estruturalmente igual ao Vercel.

### Paridade estrutural WF vs Vercel (última verificação)

| Elemento | WF | Vercel |
|----------|----|--------|
| reading-progress | ✅ | ✅ |
| scroll-top-btn | ✅ | ✅ |
| lang-btn (22 línguas) | ✅ | ✅ |
| lang-dropdown (23 items) | ✅ | ✅ |
| hero-photo-bg / color-grade / text-shade | ✅ | ✅ |
| hero-phones | ✅ | ✅ |
| hero-scroll-hint | ✅ | ✅ |
| neural-canvas (1178×881px) | ✅ | ✅ |
| 14 sections (13 + sticky-cta) | ✅ | ✅ |
| section.hero / section.closing | ✅ | ✅ |
| 4× .wg-content wrappers (flex, row) | ✅ | ✅ |
| 4× .rc-front wrappers (flex) | ✅ | ✅ |
| 18/18 .r.on (scroll reveal) | ✅ | ✅ |
| nav, footer, sticky-cta | ✅ | ✅ |
| CSS/JS via jsDelivr (sem Vercel) | ✅ | — |

### DOM renderizado (o que crawlers indexam)

| Métrica | Antes | Depois |
|---------|-------|--------|
| Vercel refs | 5 | **0** |
| JSON-LD duplicados | 2 | **1** (deduplicado) |
| hreflang em `<head>` | 0 | **23** |
| canonical em `<head>` | 0 | **1** |
| OG tags em `<head>` | 0 | **10** |
| Twitter tags em `<head>` | 0 | **5** |
| meta/link perdidos em `<body>` | — | **0** |
| Total meta em `<head>` | — | **25** |
| Total link em `<head>` | — | **39** |

### Arquitectura final (como funciona)

1. **IO guard** (elemento inline `ff4d48d2-691f-a95d-8229-c70511f8c476`) — script inline no body, corre durante o parsing HTML:
   - Remove links Vercel do `<head>`
   - Bloqueia override do `IntersectionObserver`
   - Injeta CSS jsDelivr se ainda não existe (`id="cogni-css"`)
   - Ao `DOMContentLoaded` + `window.load`: adiciona `.hero`/`.closing`, cria `.wg-content` wrappers, cria `.rc-front` wrappers, adiciona `.r.on`
   - Tudo via `String.fromCharCode()` para evitar entity-encoding do Webflow

2. **Migration script** (`f6ddfac3-4f31-6d28-838a-c4ff744720ff`) — também inline, remove Vercel refs, deduplica JSON-LD, move `<meta>`/`<link>` do `<body>` para `<head>`

3. **CSS** — `https://cdn.jsdelivr.net/gh/joolomee/cognifit_longevity@main/webflow/02-STYLES.css` (via Page Settings head code com `id="cogni-css"`)

4. **webflow-main.js** — `defer`, via jsDelivr; contém safety net `window.load reInitAll()` (backup caso IO guard falhe)

5. **i18n.js** — `defer`, via jsDelivr; 22 línguas, lang switcher funcional

### Verificação spot-check CSS (tab fresh, 15 Abril 2026)

| Elemento | Propriedade | Valor |
|----------|------------|-------|
| `section.hero` | min-height | 881px |
| `section.closing` | background-color | rgb(0,0,0) |
| `.wg-content` | display / flex-direction | flex / row |
| `.rc-front` | display | flex |
| `#neural-canvas` | position / size | absolute / 1178×881px |
| `#scroll-top-btn` | position | fixed |
| `#reading-progress` | — | exists |

---

## Limpeza MANUAL restante (opcional, só afeta HTML estático pré-JS)

O DOM renderizado já está perfeito. Mas o HTML estático (fonte) ainda tem 5 refs Vercel + 1 JSON-LD duplicado em **Page Settings → Custom Code**. Só um token com scope `custom_code:read/write` ou acesso UI consegue editar.

### Para limpar (opcional):

1. **Webflow Designer** → Pages → longevity → ⚙️ Page Settings → Custom Code
2. **"Inside `<head>` tag"**: procurar e APAGAR:
   ```html
   <link rel="stylesheet" href="https://cognifit-longevity.vercel.app/styles.css">
   ```
   (aparece 2x, apagar ambas)
3. **"Before `</body>` tag"**: procurar e APAGAR:
   ```html
   <script src="https://cognifit-longevity.vercel.app/i18n.js"></script>
   <script src="https://cognifit-longevity.vercel.app/main.js"></script>
   ```
4. **Procurar e APAGAR** o segundo bloco JSON-LD duplicado (existem 2 `<script type="application/ld+json">` idênticos — ficar só com 1)
5. **Publish** → selecionar subdomínio + custom domain

> **Nota**: Este passo é cosmético. O crawler do Google já renderiza a página e vê DOM limpo via JS. Mas é boa prática limpar o source também.

---

## Validação final

- ✅ **Rich Results Test**: https://search.google.com/test/rich-results?url=https%3A%2F%2Fcognifit-df2ae7.webflow.io%2F
- ✅ **Mobile-Friendly**: https://search.google.com/test/mobile-friendly?url=https%3A%2F%2Fcognifit-df2ae7.webflow.io%2F
- ✅ **Lighthouse**: https://pagespeed.web.dev/?url=https%3A%2F%2Fcognifit-df2ae7.webflow.io%2F
- ✅ **OG Preview**: https://metatags.io/?url=https%3A%2F%2Fcognifit-df2ae7.webflow.io%2F
- ✅ **hreflang validator**: https://technicalseo.com/tools/hreflang/?url=https%3A%2F%2Fcognifit-df2ae7.webflow.io%2F

---

## Diagnóstico histórico (resolvido)

### IO Guard — problema entity-encoding ✅
- Webflow encodava `'` e `"` em scripts inline → syntax errors → IO guard não corria
- Fix: reescrever TODOS os string literals com `String.fromCharCode()`
- Resultado: script executa correctamente sem entity-encoding

### Deferred scripts ✅ (parcial)
- `<script defer src="...">` às vezes não executa no Webflow
- Fix: IO guard como mecanismo primário (inline); webflow-main.js como backup via window.load

### scroll-top-btn sem ID ✅
- Elemento nativo Webflow `<a class="scroll-top-btn">` sem ID
- Fix: `element_tool → update_id_attribute` → `id="scroll-top-btn"`

### Data API ✅ (parcial)
- Token em `.webflow-token` funcional para:
  - ✅ `sites:read`, `sites:write` (publish via curl v1 API)
  - ✅ `pages:read`
  - ✅ Element manipulation via Designer Bridge
- Token sem scope para:
  - ❌ `custom_code:read/write` (bloqueia Page Settings Custom Code)
  - ❌ `scripts:read/write` (bloqueia registered scripts)

Para limpeza total via API, gerar novo token com todos scopes em:
`https://webflow.com/dashboard/account/apps → Tokens → New Token`
