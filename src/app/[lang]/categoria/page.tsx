import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES, POSTS, getCategoryBySlug, getPostsByCategory } from '@/data/posts';
import { PostCard } from '@/components/blog/PostCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { BreadcrumbSchema } from '@/components/seo/Schemas';

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
    title: `${cat.name[lang]} — TechPulse`,
    description: cat.description[lang],
    alternates: { canonical: `https://www.techpulse.dev/${params.lang}/categoria/${params.categoria}` },
  };
}

// All categories listing page
export default function CategoriesPage({ params }: { params: { lang: string; categoria?: string } }) {
  const lang = params.lang as 'es' | 'en';

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` },
          { name: lang === 'es' ? 'Categorías' : 'Categories', url: `/${lang}/categoria` },
        ]}
      />
      <div className="bg-gradient-to-b from-slate-50 dark:from-slate-900/50 to-transparent py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-md font-bold text-slate-900 dark:text-white mb-4">
            {lang === 'es' ? 'Todas las Categorías' : 'All Categories'}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {lang === 'es' ? 'Explora nuestro contenido por temática' : 'Explore our content by topic'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const posts = getPostsByCategory(cat.slug);
            return (
              <Link
                key={cat.slug}
                href={`/${lang}/categoria/${cat.slug}`}
                className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8 hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-200 hover:shadow-card-hover card-hover"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {cat.name[lang]}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{cat.description[lang]}</p>
                <span className="text-sm text-brand-600 dark:text-brand-400 font-medium">
                  {posts.length} {lang === 'es' ? 'artículos' : 'articles'} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
