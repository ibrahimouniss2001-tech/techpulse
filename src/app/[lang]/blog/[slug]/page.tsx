import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { POSTS, getRelatedPosts } from '@/data/posts';
import { AdSlot } from '@/components/ads/AdSlot';
import { PostCard } from '@/components/blog/PostCard';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { FAQAccordion } from '@/components/blog/FAQAccordion';
import { ArticleSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/Schemas';
import { formatDate, extractHeadings } from '@/lib/utils';

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  const lang = params.lang as 'es' | 'en';
  const title = post.seoTitle?.[lang] || post.title[lang];
  const description = post.seoDescription?.[lang] || post.excerpt[lang];

  return {
    title,
    description,
    authors: [{ name: post.author.name }],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt[lang] }],
      locale: lang === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description, images: [post.image] },
    alternates: {
      canonical: `https://www.techpulse.dev/${params.lang}/blog/${params.slug}`,
      languages: {
        es: `https://www.techpulse.dev/es/blog/${params.slug}`,
        en: `https://www.techpulse.dev/en/blog/${params.slug}`,
      },
    },
  };
}

export default function PostPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as 'es' | 'en';
  const post = POSTS.find((p) => p.slug === params.slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, 3);
  const headings = extractHeadings(post.content[lang]);

  return (
    <>
      <ArticleSchema post={post} lang={lang} />
      {post.faqs && <FAQSchema faqs={post.faqs} lang={lang} />}
      <BreadcrumbSchema
        items={[
          { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
          { name: lang === 'es' ? 'Blog' : 'Blog', url: `/${lang}/blog` },
          { name: post.title[lang], url: `/${lang}/blog/${post.slug}` },
        ]}
      />

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt[lang]}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href={`/${lang}/categoria/${post.category}`}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500 text-white`}
            >
              {post.category}
            </Link>
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/10 text-white rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight text-balance">
            {post.title[lang]}
          </h1>
        </div>
      </div>

      {/* Post meta bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <Link href={`/${lang}/blog`} className="flex items-center gap-1 hover:text-brand-600 transition-colors">
              <ArrowLeft size={16} />
              {lang === 'es' ? 'Volver al blog' : 'Back to blog'}
            </Link>
            <div className="flex items-center gap-1.5">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.readingTime} {lang === 'es' ? 'min de lectura' : 'min read'}</span>
            </div>
          </div>
          <ShareButtons url={`https://www.techpulse.dev/${lang}/blog/${post.slug}`} title={post.title[lang]} lang={lang} />
        </div>
      </div>

      {/* Leaderboard ad below meta */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdSlot slot="1122334455" format="leaderboard" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Article */}
          <article>
            {/* Lead */}
            <div className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 p-6 border-l-4 border-brand-500 bg-brand-50 dark:bg-brand-950/20 rounded-r-xl">
              {post.excerpt[lang]}
            </div>

            {/* Content rendered as prose */}
            <div
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-img:rounded-xl prose-img:shadow-card"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content[lang]) }}
            />

            {/* In-content ad — after content first section */}
            <div className="my-10">
              <AdSlot slot="2233445566" format="rectangle" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
            </div>

            {/* FAQs */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  {lang === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
                </h2>
                <FAQAccordion faqs={post.faqs} lang={lang} />
              </div>
            )}

            {/* Tags */}
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <Tag size={16} className="text-slate-400" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/${lang}/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-brand-100 hover:text-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-400 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Author box */}
            <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex gap-4">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={64}
                height={64}
                className="rounded-full flex-shrink-0"
              />
              <div>
                <div className="font-display font-bold text-slate-900 dark:text-white mb-1">{post.author.name}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{post.author.bio[lang]}</p>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="space-y-8">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 sticky top-24">
                <h3 className="font-display font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                  {lang === 'es' ? '📋 Tabla de contenidos' : '📋 Table of contents'}
                </h3>
                <TableOfContents headings={headings} />
              </div>
            )}

            {/* Sidebar ad */}
            <div className="sticky top-80">
              <AdSlot slot="3344556677" format="sidebar" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
            </div>
          </aside>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-display-xs font-bold text-slate-900 dark:text-white mb-8">
              {lang === 'es' ? 'Artículos relacionados' : 'Related articles'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <PostCard key={p.slug} post={p} lang={lang} variant="card" index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AdSlot slot="4455667788" format="leaderboard" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
      </div>
    </>
  );
}

// Simple markdown to HTML converter (use remark in production)
function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 id="$1">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^\| (.+) \|$/gm, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, (match) => `<table><tbody>${match}</tbody></table>`)
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[huptl])/gm, '<p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[huptl])/g, '$1');
}
