# Prompt pronto a colar na sessão Claude Code do Mac (com MCP Webflow)

> **Instruções:** no teu Mac, abre um terminal, `cd` para o repo `cognifit_longevity`, corre `claude`. Verifica que o Webflow MCP está activo com `/mcp`. Depois cola **o prompt abaixo** tal como está.

---

## Prompt para colar:

```
Lê os seguintes ficheiros deste repo:
- webflow/blueprint/README.md (plano executável)
- webflow/blueprint/sec-*.txt (16 árvores Navigator)
- webflow/blueprint/classes-inventory.txt (248 classes com CSS)
- webflow/blueprint/i18n-keys.txt (304 chaves i18n)
- index.html (fonte de verdade do markup)
- styles.css (fonte de verdade dos estilos)

O site Webflow alvo é:
- siteId: 68107102be717016f4f0f17b
- shortName: cognifit-df2ae7
- Designer URL: https://cognifit-df2ae7.design.webflow.com
- Staging: https://cognifit-df2ae7.webflow.io

Estado actual do Designer (construído em sessão anterior):
  Body
  ├── cf-nav (nav-logo-link, nav-links×4, nav-r > btn-login)
  └── hero-section > hero-content > hero-inner
      ├── hero-badge > badge-dot + "Cognitive Longevity System"
      ├── hero-h1 > hero-shimmer
      ├── hero-sub (P, bold)
      ├── hero-read-time
      ├── hero-cta-wrap > btn-primary
      └── hero-rating > rating-left > rating-n + stars

OBJECTIVO: construir nativamente em Webflow Designer TODO o que falta
para a página bater 1:1 com `brain.cognifit.com/longevity`, de forma
SEO-friendly (server-rendered markup, não JS-injected).

ORDEM DE EXECUÇÃO:

1. COMPLETAR HERO (sec-hero.txt):
   - Adicionar dentro de hero-rating: rating-right > rating-number + rating-users
   - guarantee-row com 2 g-badge
   - hero-phones (phone-train + phone-stats) — copiar SVG do index.html linhas 705-738
   - hero-scroll-hint + scroll-arrow SVG
   - hero-photo-bg, hero-color-grade, hero-text-shade (background layers)
   - canvas#neural-canvas (para animação de partículas)

2. CONSTRUIR SECÇÕES (por esta ordem):
   - sec-discover.txt  (Brain Longevity Test intro)
   - sec-risk.txt      (Dementia Risk — maior secção)
   - sec-science.txt   (Scientific Method + charts)
   - sec-how.txt       (How It Works)
   - sec-outcomes.txt  (Cognitive Outcomes)
   - sec-who.txt       (Who Is It For)
   - sec-pro.txt       (Pro Stack com SVG illustrations)
   - sec-validation.txt (University + Clinic logos)
   - sec-trust.txt     (Press logos + reviews grid)
   - sec-faq.txt       (Accordion — usar Webflow Interactions)
   - sec-cta.txt       (CTA azul)
   - sec-closing.txt
   - sec-footer.txt    (footer com 22-lang selector)

3. CLASSES CSS:
   Para cada classe em classes-inventory.txt que tenha regras CSS,
   criar a class no Designer Style panel com as propriedades
   correspondentes copiadas de styles.css. Manter estrutura responsive
   (@media queries) como combos no Webflow.

4. i18n:
   Para cada elemento com data-i18n="x.y" no blueprint:
   - Element Settings → Custom Attributes → adicionar data-i18n="x.y"
   - (Texto default EN fica no elemento; i18n.js runtime substitui por idioma.)
   Elementos com data-i18n-html permitem HTML no valor.

5. SCRIPTS/CSS externos:
   Configurar o site Webflow para usar o Slater bundle HYBRID:
   - Page Settings → Before </body> → colar: <!--👍 https://slater.app/19848.js-->
   - Page Settings → Inside <head> → colar conteúdo de
     webflow/01-head-custom-code.html MAS remover as 2 linhas que
     referenciam brain.cognifit.com (styles.css e i18n.js),
     pois esses vêm agora do Slater.

6. ASSETS:
   - Fazer upload dos base64 images grandes (hero devices, etc.)
     para Webflow Assets. Actualizar src nos Image elements.
   - Upload dos SVGs em logos/ (universidades) para Webflow Assets
     usados na secção VALIDATION.

7. PUBLICAR em cognifit-df2ae7.webflow.io e validar:
   - Renderização pixel-perfect vs brain.cognifit.com/longevity
   - DevTools → Network → zero requests a brain.cognifit.com
   - Language selector funciona (?lang=es, ?lang=pt, etc.)
   - FAQ accordion abre/fecha
   - Sticky CTA aparece após scroll do hero

Começa pelo passo 1 (completar hero). Usa as tools mcp__webflow__* para
criar elementos, classes e estilos. Reporta progresso a cada secção
concluída.
```

---

## Se /mcp não mostrar webflow activo

Verifica:
1. `.mcp.json` na raiz do repo tem o campo `WEBFLOW_TOKEN` preenchido (não o placeholder).
2. O token é válido: `curl -H "Authorization: Bearer SEU_TOKEN" https://api.webflow.com/v2/token/authorized_by` deve retornar 200 com info do utilizador.
3. Node 18+ instalado: `node --version`.
4. Package MCP server está acessível: `npx -y @webflow/mcp-server --help`.
5. Reinicia Claude Code completamente (sai e abre de novo).

Se mesmo assim falhar, corre `claude --mcp-debug` para veres o erro.
