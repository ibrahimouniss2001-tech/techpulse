export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES, getCategoryBySlug, getPostsByCategory } from '@/data/posts';
import { PostCard } from '@/components/blog/PostCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { BreadcrumbSchema } from '@/components/seo/Schemas';
import { CategoryPageSchema } from '@/components/seo/Schemas';

export async function generateStaticParams() {
  return CATEGORIES.flatMap((cat) =>
    ['es', 'en'].map((lang) => ({ lang, categoria: cat.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; categoria: string };
}): Promise<Metadata> {
  const lang = params.lang as 'es' | 'en';
  const cat = getCategoryBySlug(params.categoria);
  if (!cat) return {};
  return {
    title: `${cat.name[lang]}: Análisis, Reviews y Comparativas — TecnoActual`,
    description: cat.description[lang],
    alternates: { canonical: `https://www.techpulse.dev/${params.lang}/categoria/${params.categoria}` },
  };
}

export default function CategoryPage({ params }: { params: { lang: string; categoria: string } }) {
  const lang = params.lang as 'es' | 'en';
  const cat = getCategoryBySlug(params.categoria);

  if (!cat) notFound();

  const posts = getPostsByCategory(cat.slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
          { name: lang === 'es' ? 'Categorías' : 'Categories', url: `/${lang}/categoria` },
          { name: cat.name[lang], url: `/${lang}/categoria/${cat.slug}` },
        ]}
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 dark:from-slate-900/50 to-transparent py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <h1 className="font-display text-display-sm font-bold text-slate-900 dark:text-white">
                {cat.name[lang]}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg mt-1">{cat.description[lang]}</p>
            </div>
          </div>
          <div className="text-sm text-slate-500 mt-4">
            {posts.length} {lang === 'es' ? 'artículos en esta categoría' : 'articles in this category'}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Leaderboard ad */}
        <div className="mb-10">
          <AdSlot slot="5566778899" format="leaderboard" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            {lang === 'es' ? 'No hay artículos en esta categoría aún.' : 'No articles in this category yet.'}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} lang={lang} variant="card" index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
