# CogniFit Brain Longevity — Project Guide for Claude

> Landing page **brain.cognifit.com/longevity** — static site servido por **Vercel**, com adapters para **Wix** e **Webflow**.

---

## 1. Visão geral

| Camada | Onde vive | Função |
|---|---|---|
| **Source of truth** | Vercel (`/`) | Site estático completo (HTML + CSS + JS + i18n + assets) |
| **Wix wrapper** | `wix-head-injection.html` | SEO/Schema injectado fora do iframe Wix |
| **Webflow wrapper** | `webflow/` | Head + Embed loader + Footer scripts (esta migração) |

A página é renderizada SEMPRE com os ficheiros `styles.css`, `i18n.js` e `main.js` servidos a partir de `https://brain.cognifit.com/longevity/…` (Vercel CDN). Qualquer wrapper (Wix, Webflow, novo CMS) é apenas uma casca para SEO + container de markup.

---

## 2. Estrutura de ficheiros

```
.
├── index.html              # Página completa (1817 linhas, ~270 KB)
├── styles.css              # Estilos completos (~136 KB)
├── main.js                 # Lógica de UI: cursor, sticky CTA, scroll, FAQ, modais (~58 KB)
├── i18n.js                 # 22 idiomas — EN, ES, FR, DE, IT, PT, NL, PL, RU, AR, HE,
│                           #   ZH, ZH-HK, JA, KO, TR, ID, BN, MN, UR, SR, EL  (~666 KB)
├── schema.jsonld           # JSON-LD canónico (também inline em index.html)
├── vercel.json             # Headers (CSP frame-ancestors, CORS, cache, X-Robots-Tag)
├── robots.txt, sitemap.xml # SEO
├── llms.txt                # llms.txt para descoberta por LLMs
├── google8b496bb1db204290.html  # Search Console verification
│
├── wix-head-injection.html # Snippet para Wix (head custom code)
│
├── webflow/                # ⭐ Esta migração
│   ├── 01-head-custom-code.html       # Cola em Page Settings → Inside <head>
│   ├── 02-body-embed.html             # Cola num Embed element no canvas
│   └── 03-before-body-close.html      # Cola em Page Settings → Before </body>
│
├── images/, logos/         # Assets adicionais (a maioria das imagens da página
│                           #   estão inline base64 dentro de index.html)
└── docs/superpowers/       # Specs e plans internos
```

---

## 3. Branches activos

- `main` — produção (Vercel deploy automático)
- `claude/brain-longevity-seo-optimization-8WOwR` — trabalho de SEO + i18n (22 idiomas)
- `claude/adapt-webflow-migration-Ykeel` — **esta migração para Webflow**

> Regra: trabalho novo de Claude vai em `claude/<slug>` e só faz merge para `main` por revisão humana.

---

## 4. Como migrar para Webflow (passo-a-passo)

### Pré-requisitos
- Plano Webflow pago (CMS, Business ou Workspace) — o **Free não permite** Custom Code de página suficiente (limite 10 KB; precisamos ~30 KB no head).
- Acesso a um Custom Domain ou subdomínio onde o site Webflow será publicado.
- Vercel deploy ativo e acessível em `https://brain.cognifit.com/longevity/`.

### Passo 1 — Criar a página no Webflow
1. Designer → **Pages → "+"** → New Page
2. Slug: `longevity` (ou o que pretenderes). URL final ex.: `cognifit.webflow.io/longevity`.
3. Title/SEO meta: deixar **vazio** — vamos sobrepor pelo head injection.
4. Layout: arrasta um único **Section** vazio (será o container do embed).

### Passo 2 — Head Custom Code
1. Page Settings desta página → **Inside `<head>` tag**.
2. Copia o conteúdo INTEIRO de `webflow/01-head-custom-code.html` e cola.
3. Save.

Isto injecta:
- Title, description, keywords, canonical, hreflang (22 idiomas), OG, Twitter Card
- JSON-LD completo (Organization, WebPage, WebApp, Product, FAQPage, HowTo, Breadcrumb)
- Preconnect + preload de fontes (Plus Jakarta Sans)
- Link para `styles.css` no Vercel CDN
- Reference a `i18n.js` no Vercel CDN com `defer`
- Style block inline (~16 KB de overrides responsivos para `.pro-stack`, `.val-logos`, charts, etc.)
- Reveal-on-load script (anima `.r` quando o DOM está pronto)

### Passo 3 — Body Embed
1. No canvas, dentro do Section vazio que criaste, arrasta um **Embed** element.
2. Cola o conteúdo INTEIRO de `webflow/02-body-embed.html`.
3. Publica.

O loader vai:
- Mostrar um spinner enquanto carrega
- `fetch('https://brain.cognifit.com/longevity/index.html')`
- Extrair `<body>…</body>` e injectá-lo em `#cognifit-longevity-root`
- Re-criar todos os `<script>` inline para que executem (innerHTML sozinho não os corre)
- Disparar o evento custom `cognifit:body-ready`

### Passo 4 — Before `</body>` Custom Code
1. Page Settings → **Before `</body>` tag**.
2. Cola o conteúdo de `webflow/03-before-body-close.html`.
3. Save.

Carrega `main.js` SÓ depois do evento `cognifit:body-ready` (ou após 3s timeout de segurança).

### Passo 5 — Validar
Abrir a página publicada e confirmar:
- ✅ Hero, validation logos, pro-stack, charts e FAQ aparecem como em `brain.cognifit.com/longevity`
- ✅ Cursor custom segue o rato
- ✅ Sticky CTA aparece após scroll do hero
- ✅ Selector de idioma muda para `?lang=es`, `?lang=pt`, etc.
- ✅ Reading progress bar no topo funciona
- ✅ FAQ accordion abre/fecha
- ✅ DevTools → Network: `styles.css`, `i18n.js`, `main.js` carregam de `brain.cognifit.com` com 200 OK

### Passo 6 — SEO
- View Source da página Webflow deve mostrar TODO o head injection (incluindo JSON-LD).
- Google Search Console → URL Inspection → confirmar que indexa.
- Rich Results Test (https://search.google.com/test/rich-results) → confirmar Organization, WebPage, FAQ, HowTo, Product visíveis.

---

## 5. Headers Vercel (obrigatório para o loader funcionar)

`vercel.json` actualizado nesta migração:

```jsonc
{
  "headers": [{
    "source": "/(.*)",
    "headers": [
      // SEO: deixa Google indexar
      { "key": "X-Robots-Tag", "value": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },

      // Permite embedding em Wix + Webflow
      { "key": "Content-Security-Policy",
        "value": "frame-ancestors 'self' https://brain.cognifit.com https://*.wixsite.com https://*.wix.com https://*.webflow.io https://*.webflow.com" },

      // Cache agressivo + revalidate
      { "key": "Cache-Control", "value": "public, max-age=3600, stale-while-revalidate=86400" },

      // CORS aberto: o loader Webflow precisa de fazer fetch de qualquer origem
      { "key": "Access-Control-Allow-Origin",  "value": "*" },
      { "key": "Access-Control-Allow-Methods", "value": "GET, OPTIONS" },
      { "key": "Access-Control-Allow-Headers", "value": "Content-Type" }
    ]
  }]
}
```

> ⚠ **NÃO** retirar o header `Access-Control-Allow-Origin: *` — sem ele o loader Webflow falha com erro CORS.

---

## 6. Razões da arquitectura "Vercel CDN + Webflow shell"

| Alternativa | Porque foi rejeitada |
|---|---|
| Inline TUDO no Webflow | Body = 242 KB com base64 images embedded — excede o limite de 50 KB por Embed e ~50 KB por bloco de Custom Code do plano paid |
| Iframe da página Vercel | Mau SEO (Google indexa o iframe wrapper, não o conteúdo) |
| Reescrever em Webflow nativo | ~3000 linhas de CSS custom, animações SVG complexas, custom cursor, charts inline — perda total da paridade visual |
| Chunking do body em N Embeds | Cada actualização no Vercel implicaria refazer o split à mão — não escala |
| **Loader fetch + CDN (escolhido)** | Source of truth única (Vercel), update num lugar = update em todo o lado, SEO no head injection (server-rendered no Webflow), zero divergência visual |

---

## 7. Manutenção

**Mudar copy / layout / componentes**
- Editar `index.html`, `styles.css`, `main.js` ou `i18n.js` no repo
- Push para `main` → Vercel re-deploy → Webflow refresca automaticamente no próximo load (cache 1h)

**Adicionar idioma**
- Adicionar entry em `i18n.js`
- Adicionar `<link rel="alternate" hreflang="…">` em `index.html` E em `webflow/01-head-custom-code.html`

**Adicionar nova página de marketing**
- Criar `<nome>/index.html` no repo Vercel
- Repetir Passos 1-5 acima com URL nova

**Invalidar cache imediatamente**
- Vercel Dashboard → Deployments → … → Redeploy
- Ou alterar `?v=` nos URLs do head custom code (`styles.css?v=2`)

---

## 8. Comandos úteis

```bash
# Tamanho dos chunks principais
wc -l index.html styles.css main.js i18n.js

# Validar JSON-LD localmente
python3 -c "import json,re,sys; html=open('index.html').read(); blocks=re.findall(r'<script[^>]*ld\+json[^>]*>(.+?)</script>', html, re.S); [json.loads(b) for b in blocks]; print('OK', len(blocks),'blocks')"

# Testar CORS do Vercel
curl -I -H "Origin: https://test.webflow.io" https://brain.cognifit.com/longevity/index.html | grep -i 'access-control'

# Servir localmente
python3 -m http.server 8000
```

---

## 9. Convenções para sessões Claude futuras

- **Não duplicar** o markup do site em ficheiros novos. Tudo flui de `index.html`.
- **Não introduzir** dependências de build (webpack, vite, npm). O site é static-first por design — o loader Webflow assume HTML servido directamente.
- **Não remover** `data-i18n="…"` attributes — `i18n.js` depende deles.
- **Não remover** as classes `.r` ou o script de reveal — controlam fade-in.
- Branches: `claude/<short-slug>` e push apenas para esse branch (nunca directo a `main`).
- Commits: prefixos `feat:`, `fix:`, `seo:`, `i18n:`, `chore:`.

---

## 10. Links

- **Produção (Vercel)**: https://brain.cognifit.com/longevity
- **Wix legacy wrapper**: editor Wix da página `/longevity` (custom code → head)
- **Search Console**: propriedade `brain.cognifit.com`
- **Repo**: `joolomee/cognifit_longevity`
- **Branch desta migração**: `claude/adapt-webflow-migration-Ykeel`
