# CogniFit Longevity — Responsive Fix Solution

## Ficheiros Criados

### 1. `responsive-fix.css`
CSS override que carrega DEPOIS do `styles.css` e resolve todos os conflitos.

### 2. `iframe-bridge.js`
Script de comunicação iframe ↔ Wix Studio com height reporting robusto.

---

## Problemas Identificados e Resolvidos

### 1. Hero ("div 1") cortado em ecrãs pequenos
**Causa:** `height: 100svh !important; max-height: 100svh !important; overflow: hidden !important;` no QA Fix Block (linha 3627-3637 do styles.css) — bloqueia a altura e corta o conteúdo que não cabe.

**Fix:** Hero usa `min-height: 100svh` (cresce se necessário) + `max-height: none` + `overflow: visible`.

### 2. Scroll bloqueado
**Causa:** `html.is-iframe body { overflow: hidden !important; }` (linha 3174-3179) impede scrolling interno. Em standalone, o QA Fix Block também impõe `overflow: hidden` no hero-content.

**Fix:** `overflow-y: auto` em html/body, `-webkit-overflow-scrolling: touch` para iOS.

### 3. 50+ Media Queries em conflito
**Causa:** 13+ breakpoints distintos com 300+ usos de `!important`, regras duplicadas e contradições (ex: hero-phones: `display:none` a 900px, depois `display:flex` a 768px).

**Fix:** Mobile-first clean breakpoints: 480px, 768px, 1024px, 1400px, 1920px.

### 4. svh em iframes
**Causa:** Dentro de um iframe Wix, `100svh` = altura do iframe (que pode ser enorme se o iframe cresce para acomodar conteúdo). Isto cria um hero gigante.

**Fix:** Iframe context usa `height: auto; min-height: 0;` — sem unidades de viewport.

### 5. Pro-stack forçado a 7 colunas no iframe
**Causa:** `.is-iframe .pro-stack { grid-template-columns: repeat(7, 1fr) !important; }` — os cards ficam minúsculos.

**Fix:** Grid responsivo: 2col → 3col → 4col, mesmo no iframe.

### 6. Marquee horizontal overflow
**Causa:** `width: 100vw` no `.val-marquee-wrap` — 100vw inclui a scrollbar e pode causar scroll horizontal.

**Fix:** `width: 100%; max-width: 100%;` em vez de `100vw`.

### 7. Comunicação iframe ↔ Wix inconsistente
**Causa:** Height reporting com `setTimeout` cascading sem debounce — envia muitas mensagens ao parent, algumas com valores incorretos durante layout.

**Fix:** `iframe-bridge.js` com debounce, MutationObserver, ResizeObserver, e image load events.

---

## Como Implementar

### Passo 1: Adicionar ficheiros ao repositório
Copia `responsive-fix.css` e `iframe-bridge.js` para a raiz do projeto (ao lado do `index.html`).

### Passo 2: Atualizar index.html
No `<head>`, depois do link para `styles.css`:
```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="responsive-fix.css">
```

Antes do `</body>`, depois do `main.js`:
```html
<script src="main.js" defer></script>
<script src="iframe-bridge.js" defer></script>
```

Atualizar a meta viewport:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover">
```

### Passo 3: Deploy no Vercel
```bash
git add responsive-fix.css iframe-bridge.js index.html
git commit -m "fix: responsive issues, scroll, iframe integration"
git push
```

### Passo 4: Configurar iframe no Wix Studio
No Velo code do Wix, garantir que o HtmlComponent tem:
```javascript
$w('#htmlFrame').onMessage((event) => {
  let data = event.data;
  if (typeof data === 'string') {
    try { data = JSON.parse(data); } catch(e) { return; }
  }
  if (data && data.type === 'setHeight' && data.height) {
    $w('#htmlFrame').style.height = data.height + 'px';
  }
});

// Optional: request height on load
$w('#htmlFrame').postMessage({ type: 'getHeight' });
```

No editor Wix, configurar o iframe com:
- **Scrolling:** `no` (o parent faz scroll)
- **Allow:** `fullscreen; autoplay`
- **Width:** 100%

---

## Checklist de Testes

### Mobile (iPhone SE, iPhone 14, Samsung Galaxy S21)
- [ ] Hero completo visível sem corte
- [ ] Scroll com dedo funciona suavemente
- [ ] Phones mockups aparecem no hero
- [ ] CTAs com 44px mínimo de altura (touch-friendly)
- [ ] Rating row com layout correto
- [ ] FAQ accordion abre/fecha corretamente
- [ ] Language dropdown acessível e scrollável
- [ ] Sticky CTA não sobrepõe scroll-top button

### Tablet (iPad Air, iPad Pro 11", iPad Pro 13")
- [ ] Hero single-column, sem phones
- [ ] Pro-cards em grid de 3 colunas
- [ ] Marquee sem overflow horizontal
- [ ] Orientação landscape funciona

### Desktop (1366px, 1920px, 2560px)
- [ ] Hero com 2 colunas (texto + phones)
- [ ] Pro-cards em grid de 4 colunas
- [ ] Scroll hint visível no fundo do hero
- [ ] Navegação fixa funcional

### Wix Iframe
- [ ] Conteúdo completo visível (sem corte)
- [ ] Scroll do parent Wix funciona
- [ ] Altura do iframe ajusta automaticamente
- [ ] Links abrem em nova tab
- [ ] FAQ expand/collapse reporta nova altura
- [ ] Sem scrollbar interna no iframe
