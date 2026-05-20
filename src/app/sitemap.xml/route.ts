import { POSTS, CATEGORIES } from '@/data/posts';

const BASE_URL = 'https://www.TecnoActual.dev';
const LANGS = ['es', 'en'];

function generateSitemapXml(): string {
  const now = new Date().toISOString();

  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/categoria', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.5', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/cookies-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  ];

  const urls: string[] = [];

  // Static pages
  for (const page of staticPages) {
    for (const lang of LANGS) {
      const url = `${BASE_URL}/${lang}${page.path}`;
      const alternates = LANGS.map(
        (l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${page.path}"/>`
      ).join('\n      ');

      urls.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${alternates}
  </url>`);
    }
  }

  // Category pages
  for (const cat of CATEGORIES) {
    for (const lang of LANGS) {
      const url = `${BASE_URL}/${lang}/categoria/${cat.slug}`;
      const alternates = LANGS.map(
        (l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}/categoria/${cat.slug}"/>`
      ).join('\n      ');

      urls.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    ${alternates}
  </url>`);
    }
  }

  // Post pages
  for (const post of POSTS) {
    for (const lang of LANGS) {
      const url = `${BASE_URL}/${lang}/blog/${post.slug}`;
      const alternates = LANGS.map(
        (l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}/blog/${post.slug}"/>`
      ).join('\n      ');

      urls.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${post.image}</image:loc>
      <image:title>${post.title[lang as 'es' | 'en']}</image:title>
    </image:image>
    ${alternates}
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urls.join('')}
</urlset>`;
}

export async function GET() {
  const xml = generateSitemapXml();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
