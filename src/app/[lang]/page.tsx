import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, TrendingUp, Star } from 'lucide-react';
import { POSTS, CATEGORIES, getFeaturedPosts } from '@/data/posts';
import { PostCard } from '@/components/blog/PostCard';
import { CategoryCard } from '@/components/blog/CategoryCard';
import { Newsletter } from '@/components/ui/Newsletter';
import { AdSlot } from '@/components/ads/AdSlot';
import { BreadcrumbSchema, WebSiteSchema } from '@/components/seo/Schemas';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const isEs = params.lang === 'es';
  return {
    title: isEs
      ? 'TechPulse — Tecnología, Gadgets e Innovación Digital'
      : 'TechPulse — Technology, Gadgets & Digital Innovation',
    description: isEs
      ? 'Análisis profundos, comparativas honestas y las últimas novedades en gadgets, smartphones, IA y tecnología. Tu referencia tech en español.'
      : 'In-depth analysis, honest comparisons and the latest in gadgets, smartphones, AI and technology. Your tech reference in English.',
    alternates: {
      canonical: `https://www.techpulse.dev/${params.lang}`,
      languages: { es: 'https://www.techpulse.dev/es', en: 'https://www.techpulse.dev/en' },
    },
  };
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const featured = getFeaturedPosts();
  const latest = POSTS.slice(0, 6);
  const trending = POSTS.slice(0, 4);

  return (
    <>
      <WebSiteSchema />
      <BreadcrumbSchema items={[{ name: lang === 'es' ? 'Inicio' : 'Home', url: `/${lang}` }]} />

      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-50 via-white to-brand-50 dark:from-surface-dark dark:via-surface-900 dark:to-slate-900 bg-mesh-brand dark:bg-mesh-dark">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" aria-hidden />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-sm font-medium mb-6 border border-brand-200 dark:border-brand-800">
                <Zap size={14} className="animate-pulse-slow" />
                {lang === 'es' ? '🔥 Lo mejor en tecnología' : '🔥 The best in tech'}
              </div>
              <h1 className="font-display text-display-lg lg:text-display-xl text-slate-900 dark:text-white mb-6 text-balance">
                {lang === 'es' ? (
                  <>
                    Descubre el{' '}
                    <span className="gradient-text">futuro</span>{' '}
                    de la tecnología
                  </>
                ) : (
                  <>
                    Discover the{' '}
                    <span className="gradient-text">future</span>{' '}
                    of technology
                  </>
                )}
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
                {lang === 'es'
                  ? 'Análisis profundos, comparativas honestas y las últimas novedades en gadgets, IA y tech. Todo lo que necesitas saber, sin bullshit.'
                  : 'In-depth analysis, honest comparisons and the latest in gadgets, AI and tech. Everything you need to know, without the fluff.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${lang}/blog`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-glow-brand hover:-translate-y-0.5"
                >
                  {lang === 'es' ? 'Explorar artículos' : 'Explore articles'}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href={`/${lang}/categoria`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5"
                >
                  {lang === 'es' ? 'Ver categorías' : 'View categories'}
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 flex items-center gap-8">
                {[
                  { value: '200+', label: lang === 'es' ? 'Análisis' : 'Reviews' },
                  { value: '50K+', label: lang === 'es' ? 'Lectores' : 'Readers' },
                  { value: '4.9★', label: lang === 'es' ? 'Valoración' : 'Rating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-display font-bold text-slate-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Featured post hero card */}
            {featured[0] && (
              <div className="animate-slide-up animate-delay-200">
                <Link href={`/${lang}/blog/${featured[0].slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl shadow-card-hover dark:shadow-card-dark-hover border border-slate-100 dark:border-slate-800">
                    <div className="relative h-72 lg:h-80">
                      <Image
                        src={featured[0].image}
                        alt={featured[0].imageAlt[lang]}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 text-xs font-semibold bg-brand-500 text-white rounded-full uppercase tracking-wider">
                          {lang === 'es' ? 'Destacado' : 'Featured'}
                        </span>
                        <span className="text-white/80 text-sm">{featured[0].readingTime} min</span>
                      </div>
                      <h2 className="font-display text-xl font-bold text-white leading-tight mb-2 group-hover:text-brand-300 transition-colors">
                        {featured[0].title[lang]}
                      </h2>
                      <p className="text-white/70 text-sm line-clamp-2">{featured[0].excerpt[lang]}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== LEADERBOARD AD — Below Hero ====== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdSlot
          slot="1234567890"
          format="leaderboard"
          label={lang === 'es' ? 'Publicidad' : 'Advertisement'}
        />
      </div>

      {/* ====== TRENDING ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp size={22} className="text-accent-500" />
            <h2 className="font-display text-display-xs font-bold text-slate-900 dark:text-white">
              {lang === 'es' ? 'En tendencia' : 'Trending now'}
            </h2>
          </div>
          <Link
            href={`/${lang}/blog`}
            className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium flex items-center gap-1"
          >
            {lang === 'es' ? 'Ver todos' : 'See all'} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((post, i) => (
            <PostCard key={post.slug} post={post} lang={lang} variant="compact" index={i} />
          ))}
        </div>
      </section>

      {/* ====== CATEGORIES ====== */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-sm font-bold text-slate-900 dark:text-white mb-3">
              {lang === 'es' ? 'Explora por categoría' : 'Browse by category'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Desde smartphones hasta IA, cubrimos todo el ecosistema tech'
                : 'From smartphones to AI, we cover the entire tech ecosystem'}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.slug} category={cat} lang={lang} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== LATEST POSTS + SIDEBAR ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Star size={20} className="text-brand-500" />
              <h2 className="font-display text-display-xs font-bold text-slate-900 dark:text-white">
                {lang === 'es' ? 'Últimos artículos' : 'Latest articles'}
              </h2>
            </div>
            <div className="space-y-8">
              {latest.map((post, i) => (
                <div key={post.slug}>
                  <PostCard post={post} lang={lang} variant="list" index={i} />
                  {/* In-content ad after 3rd post */}
                  {i === 2 && (
                    <div className="mt-8">
                      <AdSlot slot="2345678901" format="rectangle" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href={`/${lang}/blog`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                {lang === 'es' ? 'Ver todos los artículos' : 'View all articles'}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Sidebar rectangle ad */}
            <AdSlot slot="3456789012" format="sidebar" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} sticky />

            {/* Featured posts widget */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-card dark:shadow-card-dark">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4">
                {lang === 'es' ? '📌 Más destacados' : '📌 Most featured'}
              </h3>
              <div className="space-y-4">
                {featured.slice(0, 4).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${lang}/blog/${post.slug}`}
                    className="flex gap-3 group"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={post.image} alt={post.imageAlt[lang]} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
                        {post.title[lang]}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{post.readingTime} min</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Second sidebar ad */}
            <AdSlot slot="4567890123" format="sidebar" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
          </aside>
        </div>
      </section>

      {/* ====== NEWSLETTER ====== */}
      <Newsletter lang={lang} />

      {/* ====== FOOTER AD ====== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdSlot slot="5678901234" format="leaderboard" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
      </div>
    </>
  );
}
