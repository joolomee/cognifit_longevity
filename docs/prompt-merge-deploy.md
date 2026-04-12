# Prompt para Claude CLI — Merge + Deploy Vercel Production

Copia e cola este prompt no Claude CLI no teu Mac:

---

Preciso que faças merge do branch `claude/ux-ui-seo-overhaul-dpa2x` para `main` no repositório `cognifit_longevity` e que o Vercel faça deploy em produção.

Passos:
1. Faz `git fetch origin` para atualizar
2. Faz `git checkout main`
3. Faz `git merge claude/ux-ui-seo-overhaul-dpa2x` para main
4. Faz `git push origin main` para triggerar o deploy de produção no Vercel
5. Verifica que o push foi bem-sucedido
6. Depois de fazer push, verifica o estado do deployment no Vercel com `vercel ls` ou `vercel inspect` (se tiveres o CLI instalado) ou simplesmente confirma que o push para main foi feito

Se houver conflitos no merge, resolve-os mantendo as alterações do branch `claude/ux-ui-seo-overhaul-dpa2x` (que tem a versão mais recente com o overhaul completo de UX/UI/SEO/GEO).

Resumo do que está no branch e vai para produção:
- Cookie consent banner GDPR (glassmorphism, 6 línguas, localStorage)
- Responsive design 320px-3840px+ (hero full-screen, spacing, cards)
- robots.txt com 30+ crawlers (Google, Bing, DuckDuckGo, Yandex, Baidu, Naver + 14 AI + 6 social)
- sitemap.xml com 22 variantes linguísticas + image sitemap
- llms.txt v2.0 otimizado para AI/GEO
- schema.jsonld com MedicalWebPage, FAQPage, HowTo, ContactPoint
- vercel.json com HSTS, security headers, caching imutável para assets
- manifest.json PWA + favicon + apple-touch-icon
- wix-head-injection.html sincronizado (22 hreflang, meta tags, og:locale alternates)
- .well-known/security.txt (RFC 9116)
- Todas as imagens organizadas em /images/
- Todas as datas atualizadas para 2026-04-12

---
