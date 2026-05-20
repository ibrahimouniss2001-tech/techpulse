export async function GET() {
  const content = `User-agent: *
Allow: /

# Block admin and API
Disallow: /api/
Disallow: /_next/

# Sitemaps
Sitemap: https://www.TecnoActual.dev/sitemap.xml

# Crawl delay
Crawl-delay: 1
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
