import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { BreadcrumbSchema } from '@/components/seo/Schemas';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const isEs = params.lang === 'es';
  return {
    title: isEs ? 'Reviews y Comparativas de IA | TecnoActual' : 'Unbiased AI Tool Reviews | TecnoActual',
    description: isEs
      ? 'Analizamos herramientas de IA en profundidad para que tomes decisiones informadas. Comparativas, pros, contras y precios reales.'
      : 'We break down complex AI tools so you can make informed decisions. Compare features, pricing, and real-world performance without the jargon.',
  };
}

/* ── Comparison data ── */
const COMPARISON = [
  {
    icon: '📝',
    name: 'Notion AI',
    rating: 4.5,
    price: { es: '$10/mes', en: '$10/mo' },
    bestFor: { es: 'Equipos y docs', en: 'Teams & Docs' },
    features: [
      { es: 'Integración perfecta', en: 'Seamless integration' },
      { es: 'Lluvia de ideas', en: 'Brainstorming partner' },
    ],
    url: 'https://notion.so',
    badge: null,
    featured: false,
  },
  {
    icon: '🤖',
    name: 'Jasper',
    rating: 4.8,
    price: { es: '$39/mes', en: '$39/mo' },
    bestFor: { es: 'Marketing', en: 'Marketing Teams' },
    features: [
      { es: 'Entrenamiento de marca', en: 'Brand voice training' },
      { es: 'Contenido largo', en: 'Long-form content' },
    ],
    url: 'https://jasper.ai',
    badge: { es: 'Elección del editor', en: "Editor's Choice" },
    featured: true,
  },
  {
    icon: '✍️',
    name: 'Copy.ai',
    rating: 4.2,
    price: { es: 'Gratis', en: 'Free Tier' },
    bestFor: { es: 'Textos cortos', en: 'Short Copy' },
    features: [
      { es: 'Proyectos ilimitados', en: 'Unlimited projects' },
      { es: '+90 herramientas', en: '90+ tools' },
    ],
    url: 'https://copy.ai',
    badge: null,
    featured: false,
  },
];

/* ── In-depth reviews ── */
const REVIEWS = [
  {
    icon: '🔤',
    name: 'Grammarly',
    category: { es: 'Escritura', en: 'Writing Assistant' },
    rating: 4.5,
    title: { es: 'Grammarly: ¿Sigue siendo el mejor asistente de escritura?', en: 'Grammarly Review: Still the Best Everyday AI?' },
    excerpt: {
      es: 'Grammarly ha evolucionado de un corrector ortográfico a un asistente de escritura con IA. Con ajuste de tono, mejoras de claridad y detección de plagio, se integra en cualquier flujo de trabajo. Pero, ¿vale la pena el precio premium?',
      en: "Grammarly has evolved from a simple spell checker to a comprehensive AI writing assistant. With tone adjustment, clarity improvements, and plagiarism checking, it integrates seamlessly into almost any workflow. But is the premium version worth the cost?",
    },
    pros: {
      es: ['Integración universal (navegador, escritorio, móvil)', 'Excelente detección de tono y reescritura'],
      en: ['Ubiquitous integration (browser, desktop, mobile)', 'Excellent tone detection and rewriting'],
    },
    cons: {
      es: ['Precio premium elevado para uso personal', 'Sugerencias de estilo demasiado rígidas a veces'],
      en: ['Premium pricing is steep for individuals', 'Occasional overly rigid style suggestions'],
    },
    slug: 'chatgpt-vs-gemini-vs-claude-comparativa-ia',
  },
  {
    icon: '🎨',
    name: 'Midjourney',
    category: { es: 'Imágenes IA', en: 'AI Image Generation' },
    rating: 5.0,
    title: { es: 'Midjourney v6: La guía definitiva para principiantes', en: 'Midjourney v6: The Definitive Beginner\'s Guide' },
    excerpt: {
      es: 'La IA de generación de imágenes más avanzada del mercado. Analizamos su nueva versión v6, calidad de imagen, curva de aprendizaje y si merece el precio de suscripción mensual.',
      en: 'The most advanced AI image generation tool on the market. We review the new v6, image quality, learning curve, and whether the monthly subscription is worth it.',
    },
    pros: {
      es: ['Calidad de imagen inigualable', 'Comunidad activa en Discord', 'Rápida mejora con cada versión'],
      en: ['Unmatched image quality', 'Active Discord community', 'Fast improvement with each version'],
    },
    cons: {
      es: ['Requiere Discord (poco intuitivo)', 'Sin plan gratuito permanente'],
      en: ['Requires Discord (unintuitive)', 'No permanent free plan'],
    },
    slug: 'mejor-smartphone-2024-guia-completa',
  },
  {
    icon: '💻',
    name: 'GitHub Copilot',
    category: { es: 'Código', en: 'Code Assistant' },
    rating: 4.7,
    title: { es: 'GitHub Copilot: ¿Vale la pena para desarrolladores?', en: 'GitHub Copilot: Is It Worth It for Developers?' },
    excerpt: {
      es: 'El asistente de código IA más popular del mercado. Probamos Copilot durante 3 meses en proyectos reales para darte una opinión honesta sobre su productividad real.',
      en: "The most popular AI code assistant on the market. We tested Copilot for 3 months on real projects to give you an honest opinion on its actual productivity gains.",
    },
    pros: {
      es: ['Integración nativa con VS Code', 'Sugerencias de línea completa muy precisas', 'Chat integrado para debugging'],
      en: ['Native VS Code integration', 'Highly accurate full-line suggestions', 'Integrated chat for debugging'],
    },
    cons: {
      es: ['$10/mes para individuos', 'Puede sugerir código desactualizado'],
      en: ['$10/mo for individuals', 'Can suggest outdated code patterns'],
    },
    slug: 'mejor-laptop-programadores-2024',
  },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
      {half && <span className="text-amber-400 text-sm">½</span>}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <span key={i} className="text-slate-300 text-sm">★</span>
      ))}
      <span className="text-xs text-slate-400 ml-1 font-semibold">{rating}</span>
    </div>
  );
}

export default function ReviewsPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const isEs = lang === 'es';

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: isEs ? 'Inicio' : 'Home', url: `/${lang}` },
          { name: isEs ? 'Reviews' : 'Reviews', url: `/${lang}/reviews` },
        ]}
      />

      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-20">

        {/* ── Page header ── */}
        <div className="mb-16 text-center max-w-[720px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            {isEs ? 'Reviews imparciales de IA' : 'Unbiased AI Tool Reviews'}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {isEs
              ? 'Analizamos herramientas de IA complejas para que puedas tomar decisiones informadas. Comparamos características, precios y rendimiento real sin jerga.'
              : 'We break down complex AI tools so you can make informed decisions. Compare features, pricing, and real-world performance without the jargon.'}
          </p>
        </div>

        {/* ── Ad ── */}
        <div className="mb-12">
          <AdSlot slot="9012345678" format="leaderboard" label={isEs ? 'Publicidad' : 'Advertisement'} />
        </div>

        {/* ══════════════════════════════════════════
            COMPARISON — 3-col bento (Stitch style)
        ══════════════════════════════════════════ */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-700 pb-3">
            {isEs ? 'Comparativa: Mejores IA de escritura' : 'Top AI Writers Comparison'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {COMPARISON.map((tool) => (
              <div
                key={tool.name}
                className={`bg-white dark:bg-slate-800 rounded-xl p-6 flex flex-col shadow-sm transition-all duration-300 ${
                  tool.featured
                    ? 'border-2 border-[#0058be] md:-translate-y-2 shadow-md relative'
                    : 'border border-slate-200 dark:border-slate-700 hover:shadow-md'
                }`}
              >
                {/* Editor's Choice badge */}
                {tool.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0058be] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                    {tool.badge[lang]}
                  </div>
                )}

                {/* Tool header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${tool.featured ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-slate-100 dark:bg-slate-700'}`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{tool.name}</h3>
                    <StarRating rating={tool.rating} />
                  </div>
                </div>

                {/* Specs */}
                <div className="flex-grow space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400 text-sm">{isEs ? 'Precio inicial' : 'Starting Price'}</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{tool.price[lang]}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400 text-sm">{isEs ? 'Ideal para' : 'Best For'}</span>
                    <span className="font-semibold text-[#0058be] dark:text-blue-400 text-sm">{tool.bestFor[lang]}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-400 text-xs block mb-2">{isEs ? 'Características clave:' : 'Key Features:'}</span>
                    <ul className="text-sm space-y-1.5">
                      {tool.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                          <span className="text-[#006947] dark:text-green-400 text-base">✓</span> {f[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#006947] hover:bg-[#005236] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest flex justify-center items-center gap-2 transition-colors shadow-sm"
                >
                  🛒 {isEs ? `Probar ${tool.name}` : `Try ${tool.name}`}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            IN-DEPTH REVIEWS — horizontal asymmetric cards
        ══════════════════════════════════════════ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-700 pb-3">
            {isEs ? 'Reviews en profundidad' : 'In-Depth Tool Reviews'}
          </h2>

          <div className="space-y-8">
            {REVIEWS.map((review) => (
              <article
                key={review.name}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col md:flex-row cursor-pointer"
              >
                {/* Left: tool identity */}
                <div className="md:w-1/3 bg-[#f2f3fd] dark:bg-slate-900/50 p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                  <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-5xl shadow-sm border border-slate-200 dark:border-slate-700">
                    {review.icon}
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white text-center mb-2">{review.name}</h3>
                  <div className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-[#0058be] dark:text-blue-400 border border-slate-200 dark:border-slate-700 mb-3">
                    {review.category[lang]}
                  </div>
                  <StarRating rating={review.rating} />
                </div>

                {/* Right: review content */}
                <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3 leading-snug">
                      {review.title[lang]}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
                      {review.excerpt[lang]}
                    </p>

                    {/* Pros / Cons grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {/* Pros */}
                      <div className="bg-[#f2f3fd] dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-[#006947] dark:text-green-400 mb-3 flex items-center gap-1">
                          ✚ {isEs ? 'Pros' : 'Pros'}
                        </h5>
                        <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
                          {review.pros[lang].map((pro, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#006947] dark:text-green-400 mt-0.5 shrink-0">✓</span> {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Cons */}
                      <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-100 dark:border-red-900/30">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 flex items-center gap-1">
                          ✕ {isEs ? 'Contras' : 'Cons'}
                        </h5>
                        <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
                          {review.cons[lang].map((con, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-400 mt-0.5 shrink-0">✗</span> {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link
                      href={`/${lang}/blog/${review.slug}`}
                      className="text-[#0058be] dark:text-blue-400 font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-1"
                    >
                      {isEs ? 'Leer review completa' : 'Read Full Review'} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Footer ad ── */}
        <div className="mt-16">
          <AdSlot slot="0123456789" format="leaderboard" label={isEs ? 'Publicidad' : 'Advertisement'} />
        </div>
      </main>
    </>
  );
}
