# Webflow Native Build Blueprint

> **Para:** sessão Claude (ou agente humano) com acesso ao **Webflow MCP** — ou ao **Designer** directamente — que vai reconstruir a página `brain.cognifit.com/longevity` **nativamente em Webflow** (sem depender do Vercel).

**Site Webflow alvo**
- `siteId`: `68107102be717016f4f0f17b`
- `shortName`: `cognifit-df2ae7`
- `workspaceSlug`: `cognifit-e1ebca`
- Staging: https://cognifit-df2ae7.webflow.io

**Fonte de verdade do conteúdo**: `index.html` + `styles.css` + `i18n.js` na raiz deste repo. Este blueprint é uma destilação dessas fontes — se houver divergência, **a fonte manda**.

---

## Índice do blueprint

| Ficheiro | Conteúdo |
|---|---|
| `classes-inventory.txt` | 268 classes usadas no body HTML; 248 têm regras CSS (precisam Style panel); 20 são só BEM/hook. |
| `i18n-keys.txt` | 304 chaves i18n com o texto EN default — usar para binding de texto/aria/alt em cada elemento com `data-i18n`. |
| `sec-nav.txt` … `sec-sticky.txt` | Árvore Navigator de cada secção no mesmo formato que o Webflow Designer mostra (tag + classes + id + atributos relevantes + texto clipado). |

---

## Ordem sugerida de construção

1. **`sec-nav.txt`** — barra de navegação (já existe parcialmente no Designer como `cf-nav`).
2. **`sec-hero.txt`** — hero completa (já existe até `hero-rating > rating-left` no Designer; falta `rating-right`, `guarantee-row`, `hero-phones` completos, `hero-scroll-hint`, background `hero-photo-bg`, `canvas#neural-canvas` para animação neural, `hero-color-grade`, `hero-text-shade`).
3. **`sec-discover.txt`** — "Brain Longevity Test: Discover Your Brain's Strengths…"
4. **`sec-risk.txt`** — a maior secção (197 linhas de HTML, 137 de tree) — blocos de risco de demência.
5. **`sec-science.txt`** — método científico + gráficos.
6. **`sec-how.txt`** — "How It Works".
7. **`sec-outcomes.txt`** — resultados cognitivos.
8. **`sec-who.txt`** — para quem é.
9. **`sec-pro.txt`** — pro stack com SVG ilustrações complexas (livro, test tubes, rede neural, medal).
10. **`sec-validation.txt`** — logos de universidades + clínicas.
11. **`sec-trust.txt`** — press logos + reviews grid.
12. **`sec-faq.txt`** — accordion (precisa Interactions Webflow ou custom JS).
13. **`sec-cta.txt`** — CTA azul.
14. **`sec-closing.txt`** — closing.
15. **`sec-footer.txt`** — footer com links + selector de idioma.
16. **`sec-sticky.txt`** — sticky CTA flutuante (precisa JS no footer).

---

## Convenções presentes em TODAS as secções

### Reveal classes
- `.r` → elemento que entra em fade-in ao carregar.
- `.d1`, `.d2`, `.d3`, `.d4`, `.d5` → delay do reveal (escada).
- **Implementação:** CSS define `opacity:0; transform:translateY(…)` por default; o script inline `document.documentElement.classList.add('js-ready')` + `requestAnimationFrame` faz com que `.r` anime. Para reproduzir em Webflow: ou Interactions (On Page Load → Fade In + delay por classe), ou manter o `<script>` reveal inline no *Head custom code* e garantir que as classes `.r .d1..d5` têm regras CSS correspondentes (já em `styles.css`).

### Section wrappers
- `.s-white` → fundo branco, texto escuro.
- `.s-dark` → navy escuro `#0a1128` ou similar, texto branco.
- `.s-black` → preto puro.
- `.s-off` → off-white neutro.
- `.s-blue` → azul CogniFit (CTA).
- `.closing` → gradiente final.

### Container
- `.wrap` → max-width container centrado (ver `styles.css`).
- `.tc` → text-align:center.

### Reveal on scroll + animações
O `main.js` (58 KB) contém:
- **Custom cursor** (`#cc`, `#ccr`) — segue o rato, scale on hover.
- **Reading progress bar** (`#reading-progress`) — barra top que cresce com scroll %.
- **Sticky CTA** — aparece após scroll do hero.
- **FAQ accordion** — toggle em `.faq-q` / `.faq-a`.
- **Neural canvas** (`canvas#neural-canvas`) — partículas animadas no hero.
- **Reveal on scroll** — `IntersectionObserver` em `.r` fora do viewport inicial.
- **Charts** (`.ph-bars`, `.sk-fill`, etc.) — animação de width/height em entrada.

**Recomendação:** manter o `main.js` inteiro como **Footer custom code** no Webflow (é só ~58 KB, cabe no plano pago). Assim evitas reimplementar tudo como Webflow Interactions.

### i18n
- Cada elemento com `data-i18n="x.y"` tem o seu texto substituído por `i18n.js` baseado em `?lang=…` ou locale do browser.
- `data-i18n-html` → o valor pode conter HTML (`<strong>`, `<a>`, etc.).
- `data-i18n-attr` (se existir) → substitui atributo (alt, aria-label, title).
- Em Webflow: opção A) manter `i18n.js` como Head custom code + classes `data-i18n` nos elementos (Attributes Panel); B) localizar via CMS (muito mais trabalho, 22 Collection Items por chave × 304 chaves = 6688 items).

---

## Assets

### Imagens base64 inline
O `index.html` tem **muita imagem em `data:image/…;base64`** — inclui logos de media, devices de hero, etc. Para Webflow nativo:
- Extrair cada base64 → ficheiro → upload para **Webflow Assets** → referenciar por URL CDN Webflow.
- Alternativa: manter base64 dentro de `src` num `<Image>` (Webflow aceita) mas é ineficiente.

### Imagens em `/images/`
- `American_Broadcasting_Company_Logo.svg.png` (39KB)
- `CBS_logo.svg.png` (8KB)
- `CNN.svg.png` (94KB)
- `Logo_Lifetime_2020.svg.png` (80KB)
- `NBC_logo.svg.png` (371KB)
- `NewYorkTimes.svg.png` (8KB)
- `WSJ_Logo.svg.png` (45KB)
- `cognifit_logo_{blue,darkblue,white}.png` (~93KB each)

### SVGs em `/logos/` (universidades — section VALIDATION)
- cambridge, harvard, johnshopkins, mayoclinic, mit, nih, oxford, stanford, telaviv, ucla, uwashington, yale — todos ~700 bytes, podem ser uploaded a Webflow Assets OU inlined como HTML Embed (cada um tem 1 `<svg>`).

---

## Scripts obrigatórios (Footer custom code no Webflow)

Colar na Page Settings → *Before `</body>` tag*:

```html
<script src="URL_DO_i18n.js"></script>   <!-- 666 KB — upload para Webflow Assets -->
<script src="URL_DO_main.js"></script>   <!-- 58 KB — upload para Webflow Assets -->
```

Ou inline completo se plano Webflow aguenta (improvável para i18n.js).

---

## Limites conhecidos deste blueprint

1. **SVG inline complexo** (hero neural canvas, pro-stack illustrations): representado como `<svg viewBox="…"> (inline SVG — copy from index.html)` — o executor tem de **ir a `index.html` copiar o bloco SVG exacto**.
2. **hero-rating + guarantee-row**: no source estão entre `hero-read-time` e `hero-phones`; o tree parser cortou-os devido a SVG inline interveniente. **Copiar directamente de `index.html` linhas 687-702**.
3. **Ordem dos filhos dentro de `ph-bars`**: 5 `<div.ph-bar>` com heights específicos — confirmar em `index.html` linhas 720-726.
4. **reviews-grid (secção TRUST)**: células longas — confirmar texto de cada review em `index.html` linhas 1596-1600.
5. **Footer language selector**: 22 items — usar a lista completa em `i18n.js` keys (`en, es, fr, de, it, pt, nl, pl, ru, ar, he, zh, zh-HK, ja, ko, tr, id, bn, mn, ur, sr, el`).

---

## Como uma sessão Claude com Webflow MCP deve consumir isto

Pseudocódigo:

```
for section in [nav, hero, discover, risk, ...]:
    tree = read(f'webflow/blueprint/sec-{section}.txt')
    for each element in tree (depth-first):
        webflow.createElement(type=element.tag, parent=current)
        webflow.setClasses(element.classes)
        webflow.setAttributes({'data-i18n': element.i18n_key, ...})
        if element.text:
            webflow.setText(element.text)
    webflow.publish()
```

Ou, mais pragmático: abrir `index.html` nas linhas indicadas e gerar os elementos 1:1.

---

## Estado actual conhecido do Designer (15-Apr-2026)

Baseado na screenshot partilhada pelo utilizador, já existe:

```
Body
├── inline-div-0, Link×3
├── cf-nav
│   ├── nav-logo-link > logo-white
│   ├── nav-links > nav-link×4
│   └── nav-r > btn-login
└── hero-section
    └── hero-content
        └── hero-inner
            ├── hero-badge > badge-dot + "Cognitive Longevity System"
            ├── hero-h1 > hero-shimmer
            ├── hero-sub (P) > "Cognitive decline doesn't ha…" (bold)
            ├── hero-read-time
            ├── hero-cta-wrap > btn-primary
            └── hero-rating > rating-left > rating-n + stars
```

**O que falta na hero** (comparando com `sec-hero.txt`): `hero-photo-bg`, `hero-color-grade`, `canvas#neural-canvas`, `hero-text-shade`, `rating-right`, `guarantee-row`, `hero-phones` (com phone-train e phone-stats completos — estes são chart illustrations), `hero-scroll-hint`.

**Começar daí.**
