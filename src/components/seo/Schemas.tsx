import { Post, FAQ } from '@/data/posts';

// Article Schema (JSON-LD)
export function ArticleSchema({ post, lang }: { post: Post; lang: 'es' | 'en' }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title[lang],
    description: post.excerpt[lang],
    image: { '@type': 'ImageObject', url: post.image, width: 1200, height: 630 },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `https://www.TecnoActual.dev/${lang}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TecnoActual',
      logo: { '@type': 'ImageObject', url: 'https://www.TecnoActual.dev/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.TecnoActual.dev/${lang}/blog/${post.slug}`,
    },
    inLanguage: lang === 'es' ? 'es-ES' : 'en-US',
    wordCount: post.content[lang].split(' ').length,
    timeRequired: `PT${post.readingTime}M`,
    keywords: post.tags.join(', '),
    articleSection: post.category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
export function FAQSchema({ faqs, lang }: { faqs: FAQ[]; lang: 'es' | 'en' }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer[lang],
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://www.TecnoActual.dev${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TecnoActual',
    url: 'https://www.TecnoActual.dev',
    description: 'Tecnología, gadgets e innovación digital. Análisis y comparativas honestas.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://www.TecnoActual.dev/es/search?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['es-ES', 'en-US'],
    publisher: {
      '@type': 'Organization',
      name: 'TecnoActual',
      url: 'https://www.TecnoActual.dev',
      logo: { '@type': 'ImageObject', url: 'https://www.TecnoActual.dev/logo.png' },
      sameAs: ['https://twitter.com/TecnoActual_dev'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Category page schema (CollectionPage)
export function CategoryPageSchema({ name, description, url }: { name: string; description: string; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `https://www.TecnoActual.dev${url}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
