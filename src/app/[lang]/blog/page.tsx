export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { POSTS, CATEGORIES } from '@/data/posts';
import { fetchApiPosts } from '@/lib/api';
import { PostCard } from '@/components/blog/PostCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { BreadcrumbSchema } from '@/components/seo/Schemas';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const isEs = params.lang === 'es';
  return {
    title: isEs ? 'Blog de Tecnología — Análisis y Reviews' : 'Technology Blog — Analysis and Reviews',
    description: isEs
      ? 'Todos los análisis, comparativas y guías de compra sobre tecnología, gadgets, smartphones, laptops e inteligencia artificial.'
      : 'All reviews, comparisons and buying guides on technology, gadgets, smartphones, laptops and artificial intelligence.',
    alternates: { canonical: `https://www.techpulse.dev/${params.lang}/blog` },
  };
}

export default async function BlogPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';

  const apiPosts = await fetchApiPosts();
  // API posts first (newest), then static posts. Deduplicate by slug.
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
          { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
          { name: lang === 'es' ? 'Blog' : 'Blog', url: `/${lang}/blog` },
        ]}
      />
      {/* Page header */}
      <div className="bg-gradient-to-b from-slate-50 dark:from-slate-900/50 to-transparent py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-md font-bold text-slate-900 dark:text-white mb-4">
            {lang === 'es' ? 'Blog de Tecnología' : 'Technology Blog'}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {lang === 'es'
              ? 'Análisis, comparativas y guías honestas sobre gadgets, smartphones, IA y todo el mundo tech.'
              : 'Honest analysis, comparisons and guides on gadgets, smartphones, AI and the entire tech world.'}
          </p>

          {/* Category filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <Link href={`/${lang}/blog`} className="px-4 py-2 rounded-full bg-brand-600 text-white text-sm font-medium">
              {lang === 'es' ? 'Todos' : 'All'}
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${lang}/categoria/${cat.slug}`}
                className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                {cat.icon} {cat.name[lang]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <AdSlot slot="6789012345" format="leaderboard" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {posts.map((post, i) => (
                <div key={post.slug}>
                  <PostCard post={post} lang={lang} variant="card" index={i} />
                  {/* in-content ad every 4 posts */}
                  {(i + 1) % 4 === 0 && i < posts.length - 1 && (
                    <div className="col-span-full mt-6">
                      <AdSlot slot="7890123456" format="rectangle" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdSlot slot="8901234567" format="sidebar" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} sticky />
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-4">
                {lang === 'es' ? 'Categorías' : 'Categories'}
              </h3>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${lang}/categoria/${cat.slug}`}
                      className="flex items-center justify-between py-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      <span>{cat.icon} {cat.name[lang]}</span>
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                        {posts.filter(p => p.category === cat.slug).length}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
