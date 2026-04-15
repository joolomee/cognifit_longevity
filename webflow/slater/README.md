# Slater bundle — CogniFit Brain Longevity

Substitui o Vercel como host dos assets estáticos. Serve tudo via `https://slater.app/19848.js`.

---

## ⚠ ATENÇÃO SEO

Este bundle tem **duas variantes**. Escolhe consoante o objectivo:

| Variante | SEO | Esforço | Quando usar |
|---|---|---|---|
| **full/** (este dir, 01-04) | **❌ Fraco** — body injectado por JS, Google indexa em 2ª passagem | ⚡ Pronto | Preview rápido, MVP, se SEO não é crítico |
| **hybrid/** (ver subpasta) | **✅ Ótimo** — conteúdo nativo Webflow, Slater só dá CSS + animations + i18n | 🔨 Precisa construir o body nativamente em Webflow | **Para rankear #1** |

A variante **full** existe para ver a página 1:1 rapidamente. Mas para **top #1 ranking** em keywords competitivas ("brain longevity", "cognitive assessment"), o conteúdo crítico (H1, lead, FAQ Q&A, headings) tem de estar no HTML que o Webflow publica — não injectado por JS.

Ver `webflow/blueprint/sec-*.txt` para o guia de reconstrução nativa no Designer.

---

## Variante FULL — preview rápido, SEO penalizado

Ficheiros neste directório (`01-` a `04-`).

### Files para colar no Slater (projecto 19848)

| Slater file | Cola de | Tamanho |
|---|---|---|
| `01-styles.css` (CSS) | `01-styles.css` | 130 KB |
| `02-content.js` (JS) | `02-content.js` | 246 KB — injecta todo o body via JS |
| `03-i18n.js` (JS) | `03-i18n.js` | 507 KB |
| `04-main.js` (JS) | `04-main.js` | 57 KB |

### Webflow Page Settings
- **Inside `<head>`** → conteúdo de `webflow/01-head-custom-code.html` MENOS as 2 linhas de `styles.css` e `i18n.js` (removidas porque vêm do Slater).
- **Before `</body>`** → apenas `<!--👍 https://slater.app/19848.js-->`.

### Problemas SEO conhecidos
- Googlebot renderiza JS mas só na 2ª passagem (dias a semanas atraso).
- Bing/Yandex/outros podem não renderizar JS → conteúdo invisível.
- AI Overviews inconsistentes com conteúdo JS-rendered.
- Textos dentro do body NÃO contam para keyword-density no primeiro crawl.

---

## Variante HYBRID — recomendada para top #1 ranking

Ver `hybrid/` subpasta (será adicionada assim que confirmares este caminho).

Conceito:
- **Conteúdo do body = nativo Webflow** (Designer). Texto, headings, links — visíveis ao crawler no primeiro fetch.
- **Slater fornece**:
  - `01-styles.css` — o CSS completo (130 KB)
  - `03-i18n.js` — dicionário de 22 línguas + runtime de troca (507 KB)
  - `04-main.js` — custom cursor, sticky CTA, progress bar, FAQ toggle, charts, neural canvas, reveal animations (57 KB)
  - **NÃO incluir** `02-content.js` — body não é injectado; é nativo.

Uso do blueprint:
1. Abres `webflow/blueprint/sec-nav.txt` → construis nav no Designer.
2. `sec-hero.txt` → hero.
3. …e por aí fora, 16 secções.
4. Para cada elemento com `data-i18n="x.y"`, adicionas Custom Attribute no Designer (Element Settings → Custom Attributes).
5. Para os blocos SVG (hero canvas, pro-stack illustrations), usas Embed elements com o markup copiado de `index.html`.

O `webflow/blueprint/README.md` tem o plano completo por secção.

---

## Regenerar o bundle a partir do source

```bash
python3 webflow/slater/rebuild.py
```

Lê `index.html` + `styles.css` + `main.js` + `i18n.js` da raiz do repo e regenera os 4 ficheiros.

---

## Independência do Vercel — resumo

Depois do setup (qualquer variante):

| Asset | Vem de |
|---|---|
| CSS | Slater ✓ |
| JS (animations) | Slater ✓ |
| i18n | Slater ✓ |
| Body HTML | Slater (full) ou Webflow nativo (hybrid) ✓ |
| OG image | Ainda Vercel — fazer upload para Webflow Assets e actualizar `<meta og:image>` |
| Favicon | Webflow Site Settings ✓ |
| Fonts (Plus Jakarta Sans) | Google Fonts (não Vercel) ✓ |

Zero requests a `brain.cognifit.com` depois de migrar OG image.
