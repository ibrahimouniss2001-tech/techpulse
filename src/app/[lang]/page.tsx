export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { POSTS, CATEGORIES, getFeaturedPosts } from '@/data/posts';
import { fetchApiPosts } from '@/lib/api';
import { PostCard } from '@/components/blog/PostCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { BreadcrumbSchema, WebSiteSchema } from '@/components/seo/Schemas';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const isEs = params.lang === 'es';
  return {
    title: isEs
      ? 'TecnoActual — IA, Gadgets y Tecnología al Día'
      : 'TecnoActual — AI, Gadgets & Tech Up to Date',
    description: isEs
      ? 'Las últimas noticias y análisis en inteligencia artificial, smartphones, gadgets y software. Tu referencia de tecnología actual en español.'
      : 'Latest news and analysis on AI, smartphones, gadgets and software. Your up-to-date tech reference.',
    alternates: {
      canonical: `https://tecnoactual.vercel.app/${params.lang}`,
      languages: { es: 'https://tecnoactual.vercel.app/es', en: 'https://tecnoactual.vercel.app/en' },
    },
  };
}

/* ── Tool list for the "Top Recommended Tools" section ── */
const TOP_TOOLS = [
  {
    icon: '✍️',
    name: 'ChatGPT',
    rating: 4.8,
    stars: 5,
    desc: { es: 'El mejor asistente de escritura con IA para creadores y profesionales.', en: 'Best overall AI writing assistant for content creators and professionals.' },
    url: 'https://chat.openai.com',
    badge: { es: 'Probar gratis', en: 'Try free' },
  },
  {
    icon: '🎨',
    name: 'Midjourney',
    rating: 5.0,
    stars: 5,
    desc: { es: 'Generación de imágenes de máxima calidad para artistas y diseñadores.', en: 'Unmatched image generation quality for visual artists and designers.' },
    url: 'https://midjourney.com',
    badge: { es: 'Visitar', en: 'Visit site' },
  },
  {
    icon: '💻',
    name: 'Cursor',
    rating: 4.7,
    stars: 5,
    desc: { es: 'Editor de código potenciado con IA. El favorito de los desarrolladores.', en: 'AI-powered code editor. The favorite among developers.' },
    url: 'https://cursor.so',
    badge: { es: 'Probar gratis', en: 'Try free' },
  },
];

/* ── Category icon mapping ── */
const CAT_ICONS: Record<string, string> = {
  ia: '🤖',
  smartphones: '📱',
  laptops: '💻',
  gaming: '🎮',
  audio: '🎧',
};

export default async function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const isEs = lang === 'es';

  const apiPosts = await fetchApiPosts();
  const seen = new Set<string>();
  const allPosts = [...apiPosts, ...POSTS].filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });

  const featured = allPosts.filter((p) => p.featured).length > 0
    ? allPosts.filter((p) => p.featured)
    : getFeaturedPosts();
  const latest = allPosts.slice(0, 6);

  return (
    <>
      <WebSiteSchema />
      <BreadcrumbSchema items={[{ name: isEs ? 'Inicio' : 'Home', url: `/${lang}` }]} />

      {/* ══════════════════════════════════════════
          HERO — Two column (Stitch design)
      ══════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-20 grid md:grid-cols-2 gap-6 items-center">
        {/* Left: copy */}
        <div className="flex flex-col gap-6 relative z-10">
          <div className="inline-flex w-fit bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
            {isEs ? '⚡ Bienvenido al futuro' : '⚡ Welcome to the Future'}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            {isEs ? 'Desmitificando la IA para todos' : 'Demystifying AI for Everyone'}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            {isEs
              ? 'Reseñas claras y tutoriales para que domines la tecnología de mañana, hoy. Sin jerga, sin complicaciones.'
              : 'Clear reviews and tutorials to help you master tomorrow\'s tech today. Cut through the noise with our premium instructional guides.'}
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 bg-[#0058be] hover:bg-[#004395] text-white px-6 py-3.5 rounded font-semibold text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow-md"
            >
              {isEs ? 'Leer artículos' : 'Read latest articles'}
              <ArrowDown size={14} />
            </Link>
            <Link
              href={`/${lang}/herramientas`}
              className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-600 hover:border-blue-400 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-6 py-3.5 rounded font-semibold text-xs uppercase tracking-widest transition-all"
            >
              {isEs ? 'Ver herramientas recomendadas' : 'See recommended tools'}
            </Link>
          </div>
        </div>

        {/* Right: featured image card */}
        {featured[0] && (
          <Link
            href={`/${lang}/blog/${featured[0].slug}`}
            className="group relative hidden md:block h-[500px] w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <Image
              src={featured[0].image}
              alt={featured[0].imageAlt[lang]}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                {isEs ? 'Destacado' : 'Featured'}
              </span>
              <h2 className="font-bold text-xl text-white leading-tight mb-2 group-hover:text-blue-300 transition-colors">
                {featured[0].title[lang]}
              </h2>
              <p className="text-white/70 text-sm line-clamp-2">{featured[0].excerpt[lang]}</p>
            </div>
          </Link>
        )}
      </section>

      {/* ══════════════════════════════════════════
          FEATURED ARTICLES — 3-col card grid
      ══════════════════════════════════════════ */}
      <section className="bg-[#f2f3fd] dark:bg-slate-900/50 py-20 border-t border-slate-200 dark:border-slate-800" id="articles">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {isEs ? 'Artículos destacados' : 'Featured Articles'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                {isEs ? 'Últimos tutoriales y análisis.' : 'Latest tutorials and insights.'}
              </p>
            </div>
            <Link
              href={`/${lang}/blog`}
              className="hidden md:flex text-[#0058be] dark:text-blue-400 text-xs font-semibold uppercase tracking-widest items-center gap-1 hover:underline"
            >
              {isEs ? 'Ver todos' : 'View all'} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latest.slice(0, 3).map((post, i) => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden relative border-b border-slate-100 dark:border-slate-700">
                  <Image
                    src={post.image}
                    alt={post.imageAlt[lang]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${i % 2 === 0 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                      {post.category}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      ⏱ {post.readingTime} {isEs ? 'min' : 'min read'}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3 group-hover:text-[#0058be] dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title[lang]}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                    {post.excerpt[lang]}
                  </p>
                  <span className="text-[#0058be] dark:text-blue-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1 mt-auto group-hover:gap-2 transition-all">
                    {isEs ? 'Leer más' : 'Read more'} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ad ── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-6">
        <AdSlot slot="1234567890" format="leaderboard" label={isEs ? 'Publicidad' : 'Advertisement'} />
      </div>

      {/* ══════════════════════════════════════════
          TOP RECOMMENDED TOOLS — horizontal cards
      ══════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-20" id="tools">
        <div className="mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {isEs ? 'Herramientas más recomendadas' : 'Top Recommended Tools'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            {isEs ? 'Probadas y verificadas por nuestro equipo editorial.' : 'Tested and verified by our editorial team.'}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {TOP_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-600 text-3xl">
                {tool.icon}
              </div>
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{tool.name}</h3>
                  <div className="flex text-[#006947] dark:text-green-400 text-sm">
                    {'★'.repeat(Math.floor(tool.rating))}
                    {tool.rating % 1 >= 0.5 ? '½' : ''}
                  </div>
                  <span className="text-slate-400 text-xs">{tool.rating}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{tool.desc[lang]}</p>
              </div>
              {/* CTA */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-[#006947] hover:bg-[#005236] text-white px-6 py-3 rounded font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                🛒 {tool.badge[lang]}
              </a>
            </div>
          ))}

          <div className="text-center mt-4">
            <Link
              href={`/${lang}/herramientas`}
              className="inline-flex items-center gap-2 text-[#0058be] dark:text-blue-400 text-sm font-semibold hover:underline"
            >
              {isEs ? 'Ver directorio completo de herramientas IA' : 'View full AI tools directory'} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CATEGORIES — icon grid
      ══════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
          {isEs ? 'Explorar temas' : 'Explore Topics'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.slice(0, 5).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${lang}/categoria/${cat.slug}`}
              className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-[#005ac2] hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all shadow-sm text-center"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {CAT_ICONS[cat.slug] || '📂'}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {cat.name[lang]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LATEST POSTS — full list + sidebar ad
      ══════════════════════════════════════════ */}
      <section className="bg-[#f2f3fd] dark:bg-slate-900/50 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                {isEs ? '📰 Últimos artículos' : '📰 Latest Articles'}
              </h2>
              <div className="space-y-6">
                {latest.map((post, i) => (
                  <div key={post.slug}>
                    <PostCard post={post} lang={lang} variant="list" index={i} />
                    {i === 2 && (
                      <div className="mt-6">
                        <AdSlot slot="2345678901" format="rectangle" label={isEs ? 'Publicidad' : 'Advertisement'} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href={`/${lang}/blog`}
                  className="inline-flex items-center gap-2 bg-[#0058be] hover:bg-[#004395] text-white px-8 py-3 rounded font-semibold text-xs uppercase tracking-widest transition-all"
                >
                  {isEs ? 'Ver todos los artículos' : 'View all articles'} <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <aside className="space-y-8">
              <AdSlot slot="3456789012" format="sidebar" label={isEs ? 'Publicidad' : 'Advertisement'} sticky />
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                  {isEs ? '📌 Más destacados' : '📌 Most Featured'}
                </h3>
                <div className="space-y-4">
                  {featured.slice(0, 4).map((post) => (
                    <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="flex gap-3 group">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image src={post.image} alt={post.imageAlt[lang]} fill className="object-cover group-hover:scale-105 transition-transform" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-[#0058be] dark:group-hover:text-blue-400 transition-colors leading-tight">
                          {post.title[lang]}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{post.readingTime} min</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <AdSlot slot="4567890123" format="sidebar" label={isEs ? 'Publicidad' : 'Advertisement'} />
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWSLETTER — dark navy (Stitch style)
      ══════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-[800px] mx-auto px-4 md:px-10">
          <div className="bg-[#3f465c] rounded-xl shadow-md text-center px-8 py-12">
            <div className="text-4xl mb-4">✉️</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isEs ? 'Sin spam. Tips útiles cada semana.' : 'No spam. Useful tips every week.'}
            </h2>
            <p className="text-white/80 text-base mb-6">
              {isEs ? 'Únete a más de 10.000 personas que dominan la IA.' : 'Join 10,000+ people mastering AI.'}
            </p>
            <form className="flex flex-col md:flex-row gap-3 max-w-[500px] mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder={isEs ? 'Tu correo electrónico' : 'Your email address'}
                className="flex-1 bg-white/10 border-none text-white rounded px-4 py-3 focus:ring-2 focus:ring-blue-300 placeholder:text-white/50 text-sm outline-none"
              />
              <button
                type="submit"
                className="bg-blue-200 text-blue-900 px-6 py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-100 transition-colors shadow-sm whitespace-nowrap"
              >
                {isEs ? 'Suscribirse' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ad ── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-8">
        <AdSlot slot="5678901234" format="leaderboard" label={isEs ? 'Publicidad' : 'Advertisement'} />
      </div>
    </>
  );
}
