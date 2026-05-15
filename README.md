# TechPulse — Revista Tech Bilingüe (ES/EN)

Revista de tecnología y gadgets construida con **Next.js 14**, **Tailwind CSS** y **next-intl**. Optimizada para AdSense, Core Web Vitals y SEO.

---

## 🚀 Setup rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Plugins de Tailwind (requeridos)
npm install -D @tailwindcss/typography @tailwindcss/forms

# 3. Copiar variables de entorno
cp .env.example .env.local
# → Edita .env.local con tus claves reales

# 4. Arrancar en desarrollo
npm run dev
# → http://localhost:3000 (redirige a /es automáticamente)

# 5. Build de producción
npm run build
npm start
```

---

## 📁 Estructura

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (fonts, AdSense script)
│   ├── not-found.tsx           ← Página 404
│   ├── [lang]/                 ← Rutas i18n (/es, /en)
│   │   ├── layout.tsx          ← Header + Footer + StickyMobileAd
│   │   ├── page.tsx            ← Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx        ← Listado de artículos
│   │   │   └── [slug]/page.tsx ← Artículo individual
│   │   ├── categoria/
│   │   │   ├── page.tsx        ← Todas las categorías
│   │   │   └── [categoria]/    ← Categoría individual
│   │   ├── search/page.tsx     ← Buscador
│   │   ├── about/page.tsx      ← Sobre nosotros
│   │   ├── contact/page.tsx    ← Formulario de contacto
│   │   ├── privacy-policy/     ← Política de privacidad (GDPR)
│   │   ├── cookies-policy/     ← Política de cookies
│   │   └── terms/              ← Términos y condiciones
│   ├── sitemap.xml/route.ts    ← Sitemap dinámico con hreflang
│   ├── robots.txt/route.ts     ← robots.txt
│   └── api/newsletter/         ← Endpoint de newsletter
├── components/
│   ├── ads/                    ← AdSlot, StickyMobileAd
│   ├── blog/                   ← PostCard, CategoryCard, TOC, FAQs, Share
│   ├── layout/                 ← Header, Footer
│   ├── seo/                    ← JSON-LD Schemas
│   └── ui/                     ← Newsletter
├── data/posts.ts               ← ⭐ Artículos + categorías + autores
├── lib/utils.ts                ← Utilidades
├── styles/globals.css          ← CSS tokens + ad slots
└── i18n.ts / middleware.ts     ← Configuración i18n
messages/
├── es.json                     ← Traducciones español
└── en.json                     ← Traducciones inglés
```

---

## 💰 Configurar Google AdSense

1. Crea una cuenta en [Google AdSense](https://adsense.google.com)
2. Añade tu sitio y espera aprobación
3. Sustituye `ca-pub-XXXXXXXXXXXXXXXX` por tu Publisher ID en:
   - `src/app/layout.tsx` (script tag)
   - `src/components/ads/AdSlot.tsx` (data-ad-client)
   - `src/components/ads/StickyMobileAd.tsx` (data-ad-client)
4. Sustituye los `data-ad-slot` con tus slots reales de AdSense

### Slots de anuncios incluidos

| Ubicación | Formato | Slot actual (reemplazar) |
|-----------|---------|--------------------------|
| Below hero (home) | Leaderboard 728×90 | 1234567890 |
| In-content (home) | Rectangle 336×280 | 2345678901 |
| Sidebar 1 (home) | Skyscraper 300×600 | 3456789012 |
| Sidebar 2 (home) | Rectangle 300×250 | 4567890123 |
| Footer (home) | Leaderboard | 5678901234 |
| Blog listing | Leaderboard | 6789012345 |
| Post — under meta | Leaderboard | 1122334455 |
| Post — mid content | Rectangle | 2233445566 |
| Post — sidebar | Skyscraper | 3344556677 |
| Post — footer | Leaderboard | 4455667788 |
| Mobile sticky | Banner 320×50 | 9988776655 |

---

## 🌍 Añadir contenido

Edita `src/data/posts.ts`:

```typescript
{
  slug: 'mi-nuevo-articulo',
  title: { es: 'Título en español', en: 'English title' },
  excerpt: { es: '...', en: '...' },
  content: { es: '## Markdown...', en: '## Markdown...' },
  category: 'smartphones', // smartphones | laptops | ia | gaming | audio | wearables
  tags: ['tag1', 'tag2'],
  author: AUTHORS.carlos,  // carlos | sofia | miguel
  publishedAt: '2024-07-15',
  updatedAt: '2024-07-15',
  readingTime: 10,
  image: 'https://images.unsplash.com/photo-xxx?w=1200&h=630&fit=crop',
  imageAlt: { es: 'Alt en español', en: 'Alt in English' },
  featured: false,
  faqs: [ ... ]
}
```

---

## 🔍 SEO implementado

- ✅ Metadata dinámica por página (title, description, OG, Twitter)
- ✅ Sitemap XML con hreflang ES/EN + image sitemap
- ✅ robots.txt
- ✅ JSON-LD: Article, FAQPage, BreadcrumbList, WebSite (SearchAction)
- ✅ Imágenes optimizadas (WebP/AVIF, lazy loading)
- ✅ Core Web Vitals: fonts con `display:swap`, no flash dark mode
- ✅ Política de privacidad GDPR + Consent Mode v2 compatible
- ✅ robots: noindex en páginas legales

---

## 📦 Deploy recomendado

**Vercel** (gratis para proyectos personales):
```bash
npx vercel
```

**Variables requeridas en Vercel:**
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`
- Las claves de newsletter que elijas

---

## 🛠 Personalización

| Qué cambiar | Dónde |
|-------------|-------|
| Colores de marca | `tailwind.config.ts` → `colors.brand` |
| Fuentes | `src/app/layout.tsx` + `tailwind.config.ts` |
| Logo | `src/components/layout/Header.tsx` |
| Nombre del sitio | Buscar "TechPulse" y reemplazar |
| Dominio | `.env.local` + todos los schemas |
| Newsletter | `src/app/api/newsletter/route.ts` |

---

MIT License — TechPulse Media 2024
