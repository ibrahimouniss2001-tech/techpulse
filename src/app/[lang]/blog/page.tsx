export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { POSTS, CATEGORIES } from '@/data/posts';
import { fetchApiPosts } from '@/lib/api';
import { AdSlot } from '@/components/ads/AdSlot';
import { BreadcrumbSchema } from '@/components/seo/Schemas';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const isEs = params.lang === 'es';
  return {
    title: isEs ? 'Blog — Últimas novedades tech | TecnoActual' : 'Blog — Latest Tech Insights | TecnoActual',
    description: isEs
      ? 'Tutoriales de IA, reviews de herramientas, comparativas y guías honestas sobre toda la actualidad tech.'
      : 'AI tutorials, tool reviews, comparisons and honest guides on the entire tech world.',
    alternates: { canonical: `https://tecnoactual.vercel.app/${params.lang}/blog` },
  };
}

/* Badge color per category */
const BADGE_COLORS: Record<string, string> = {
  ia: 'bg-[#ecedf7] text-[#424754]',
  smartphones: 'bg-[#dae2fd] text-[#3f465c]',
  laptops: 'bg-[#dae2fd] text-[#3f465c]',
  gaming: 'bg-[#ecedf7] text-[#424754]',
  audio: 'bg-[#dae2fd] text-[#3f465c]',
};

export default async function BlogPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const isEs = lang === 'es';

  const apiPosts = await fetchApiPosts();
  const seen = new Set<string>();
  const posts = [...apiPosts, ...POSTS].filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isEs ? 'Inicio' : 'Home', url: `/${lang}` },
          { name: 'Blog', url: `/${lang}/blog` },
        ]}
      />

      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">

        {/* ── Page header ── */}
        <div className="mb-10 md:mb-20 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            {isEs ? 'Últimas novedades' : 'Latest Insights'}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl">
            {isEs
              ? 'Desmitificando la IA, tendencias tech y reviews directas para mantenerte a la vanguardia.'
              : 'Demystifying AI, tech trends, and providing straightforward reviews to keep you ahead of the curve.'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Main content ── */}
          <div className="w-full lg:w-2/3 xl:w-3/4">

            {/* Filter bar — sticky */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4 sticky top-16 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md z-40 py-3">
              <Link
                href={`/${lang}/blog`}
                className="px-4 py-2 rounded-full bg-[#0058be] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all"
              >
                {isEs ? 'Todos' : 'All'}
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${lang}/categoria/${cat.slug}`}
                  className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  {cat.name[lang]}
                </Link>
              ))}
            </div>

            {/* Ad */}
            <div className="mb-8">
              <AdSlot slot="6789012345" format="leaderboard" label={isEs ? 'Publicidad' : 'Advertisement'} />
            </div>

            {/* Article grid — 3 col */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <div key={post.slug}>
                  <Link
                    href={`/${lang}/blog/${post.slug}`}
                    className="group bg-white dark:bg-slate-800 rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden h-full block"
                  >
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt[lang]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {/* Category badge overlay */}
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${BADGE_COLORS[post.category] || 'bg-[#ecedf7] text-[#424754]'}`}>
                        {post.category}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-slate-400 mb-3 text-xs font-semibold uppercase tracking-wider">
                        <span>{formatDate(post.publishedAt, lang)}</span>
                        <span className="flex items-center gap-1">⏱ {post.readingTime} {isEs ? 'min' : 'min read'}</span>
                      </div>
                      <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-3 group-hover:text-[#0058be] dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                        {post.title[lang]}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 flex-grow leading-relaxed">
                        {post.excerpt[lang]}
                      </p>
                      <div className="mt-auto flex items-center text-[#0058be] dark:text-blue-400 text-xs font-bold uppercase tracking-wider group-hover:underline">
                        {isEs ? 'Leer artículo' : 'Read Article'} <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>

                  {/* In-content ad every 6 cards */}
                  {(i + 1) % 6 === 0 && i < posts.length - 1 && (
                    <div className="col-span-full mt-6">
                      <AdSlot slot="7890123456" format="rectangle" label={isEs ? 'Publicidad' : 'Advertisement'} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-1/3 xl:w-1/4 space-y-8">
            <AdSlot slot="8901234567" format="sidebar" label={isEs ? 'Publicidad' : 'Advertisement'} sticky />

            {/* Categories widget */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xs uppercase tracking-wider">
                {isEs ? 'Categorías' : 'Categories'}
              </h3>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${lang}/categoria/${cat.slug}`}
                      className="flex items-center justify-between py-2 px-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-[#0058be] dark:hover:text-blue-400 transition-colors text-sm"
                    >
                      <span>{cat.icon} {cat.name[lang]}</span>
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                        {posts.filter((p) => p.category === cat.slug).length}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular posts widget */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xs uppercase tracking-wider">
                {isEs ? '🔥 Más populares' : '🔥 Most Popular'}
              </h3>
              <div className="space-y-4">
                {posts.slice(0, 5).map((post, i) => (
                  <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="flex gap-3 group">
                    <span className="text-2xl font-extrabold text-slate-200 dark:text-slate-700 w-6 shrink-0 leading-none mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 line-clamp-2 group-hover:text-[#0058be] dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title[lang]}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
