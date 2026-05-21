export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { POSTS, getRelatedPosts } from '@/data/posts';
import { fetchApiPost } from '@/lib/api';
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
  const lang = params.lang as 'es' | 'en';
  const post = (await fetchApiPost(params.slug)) ?? POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

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

export default async function PostPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as 'es' | 'en';

  // API-generated posts take priority; fall back to static hardcoded posts
  const post = (await fetchApiPost(params.slug)) ?? POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, 3);
  const renderedContent = post.contentIsHtml
    ? post.content[lang]
    : markdownToHtml(post.content[lang]);
  const headings = post.contentIsHtml
    ? extractHeadingsFromHtml(post.content[lang])
    : extractHeadings(post.content[lang]);

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

      {/* ── Affiliate disclaimer bar (Stitch style) ── */}
      <div className="bg-[#ecedf7] dark:bg-slate-800 py-2 text-center border-b border-slate-200 dark:border-slate-700">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 max-w-[1280px] mx-auto px-4">
          {lang === 'es'
            ? 'Aviso de afiliados: podemos ganar comisiones por compras realizadas a través de enlaces de esta página, sin coste adicional para ti.'
            : 'Affiliate Disclosure: We may earn commissions from purchases made through links on this page, at no extra cost to you.'}
        </p>
      </div>

      {/* ── Hero — full-width 614px (exact Stitch height) ── */}
      <header className="relative w-full h-[420px] md:h-[614px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-slate-800">
          <Image
            src={post.image}
            alt={post.imageAlt[lang]}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-10 pb-10 w-full">
          <div className="max-w-[800px]">
            <Link
              href={`/${lang}/categoria/${post.category}`}
              className="inline-block bg-[#2170e4] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 hover:bg-[#0058be] transition-colors"
            >
              {post.category}
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight max-w-3xl">
              {post.title[lang]}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Image src={post.author.avatar} alt={post.author.name} width={36} height={36} className="rounded-full border-2 border-white/30" />
                <span>{post.author.name}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>⏱ {post.readingTime} {lang === 'es' ? 'min de lectura' : 'min read'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Back + share bar ── */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-3 flex flex-wrap items-center justify-between gap-4">
          <Link href={`/${lang}/blog`} className="flex items-center gap-1 text-sm text-slate-500 hover:text-[#0058be] transition-colors">
            <ArrowLeft size={15} /> {lang === 'es' ? 'Volver al blog' : 'Back to blog'}
          </Link>
          <ShareButtons url={`https://tecnoactual.vercel.app/${lang}/blog/${post.slug}`} title={post.title[lang]} lang={lang} />
        </div>
      </div>

      {/* ── 12-col layout: TOC (3) + Article (6) + Sidebar (3) ── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 relative items-start">

        {/* Left TOC — sticky (Stitch: 3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start">
          {headings.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">
                {lang === 'es' ? 'Tabla de contenidos' : 'Table of Contents'}
              </h3>
              <TableOfContents headings={headings} />
            </div>
          )}
        </aside>

        {/* Main article — 6 cols */}
        <article className="lg:col-span-6 flex flex-col gap-8 max-w-[720px] mx-auto w-full">
          {/* Lead paragraph */}
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-[#0058be] pl-5 bg-[#f2f3fd] dark:bg-blue-950/20 py-4 pr-4 rounded-r-lg">
            {post.excerpt[lang]}
          </p>

          {/* Content */}
          <div
            className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-[#0058be] dark:prose-a:text-blue-400 prose-img:rounded-xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />

          {/* In-content ad */}
          <div className="my-6">
            <AdSlot slot="2233445566" format="rectangle" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
          </div>

          {/* FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-2xl text-slate-900 dark:text-white mb-6">
                {lang === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
              </h2>
              <FAQAccordion faqs={post.faqs} lang={lang} />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Tag size={14} className="text-slate-400" />
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/${lang}/search?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-blue-100 hover:text-[#0058be] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Author box */}
          <div className="p-6 bg-[#f2f3fd] dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-4">
            <Image src={post.author.avatar} alt={post.author.name} width={64} height={64} className="rounded-full flex-shrink-0" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white mb-1">{post.author.name}</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{post.author.bio[lang]}</p>
            </div>
          </div>
        </article>

        {/* Right sidebar — 3 cols */}
        <aside className="lg:col-span-3 space-y-6 sticky top-24 self-start">
          <AdSlot slot="3344556677" format="sidebar" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />

          {/* Mobile TOC */}
          {headings.length > 0 && (
            <div className="lg:hidden bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
                {lang === 'es' ? '📋 Contenidos' : '📋 Contents'}
              </h3>
              <TableOfContents headings={headings} />
            </div>
          )}
        </aside>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-[#f2f3fd] dark:bg-slate-900/50 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10">
            <h2 className="font-bold text-2xl text-slate-900 dark:text-white mb-8">
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
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10">
        <AdSlot slot="4455667788" format="leaderboard" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
      </div>
    </>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

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
    .replace(/(<tr>[\s\S]*?<\/tr>\n?)+/g, (match) => `<table><tbody>${match}</tbody></table>`)
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[huptl])/gm, '<p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[huptl])/g, '$1');
}

/** Extract h2/h3 headings from HTML for the table of contents */
function extractHeadingsFromHtml(html: string) {
  const matches = [...html.matchAll(/<h([23])[^>]*>(.*?)<\/h[23]>/gi)];
  return matches.map((m) => ({
    level: parseInt(m[1]) as 2 | 3,
    text: m[2].replace(/<[^>]+>/g, ''),
    id: m[2].replace(/<[^>]+>/g, '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  }));
}
