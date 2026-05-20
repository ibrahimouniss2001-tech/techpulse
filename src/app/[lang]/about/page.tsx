export const dynamic = 'force-dynamic';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const isEs = params.lang === 'es';
  return {
    title: isEs ? 'Sobre Nosotros — TecnoActual' : 'About Us — TecnoActual',
    description: isEs
      ? 'Conoce al equipo detrás de TecnoActual y nuestra misión de hacer la tecnología accesible para todos.'
      : 'Meet the team behind TecnoActual and our mission to make technology accessible for everyone.',
  };
}

const STATS = [
  { icon: '📝', value: '200+', label: { es: 'Artículos escritos', en: 'Articles Written' } },
  { icon: '🔧', value: '100+', label: { es: 'Herramientas analizadas', en: 'Tools Reviewed' } },
  { icon: '👥', value: '50K+', label: { es: 'Lectores mensuales', en: 'Monthly Readers' } },
  { icon: '⭐', value: '4.9', label: { es: 'Valoración media', en: 'Average Rating' } },
];

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const isEs = lang === 'es';

  return (
    <main className="flex-grow flex flex-col items-center w-full px-4 md:px-10 py-20">

      {/* ── Bio Bento (Stitch 12-col grid) ── */}
      <section className="max-w-[1280px] w-full grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
        {/* Bio card — 8 cols */}
        <div className="md:col-span-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col justify-center relative overflow-hidden group hover:shadow-md transition-all duration-300">
          {/* Decorative blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40 -mr-20 -mt-20 group-hover:opacity-60 transition-opacity duration-500" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 relative z-10 leading-tight tracking-tight">
            {isEs ? (
              <>Hola, somos <br /><span className="text-[#0058be]">TecnoActual.</span></>
            ) : (
              <>Hi, we're <br /><span className="text-[#0058be]">TecnoActual.</span></>
            )}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl relative z-10 leading-relaxed">
            {isEs
              ? 'La tecnología no debería sentirse como magia reservada para unos pocos. Nuestra misión es descomponer conceptos complejos, analizar las últimas herramientas sin jerga, y ayudarte a usar la IA para mejorar tu vida y trabajo.'
              : 'Technology shouldn\'t feel like magic reserved for the few. Our mission is to break down complex concepts, review the latest tools without the jargon, and empower you to use AI to improve your daily life and work.'}
          </p>
        </div>

        {/* Avatar card — 4 cols */}
        <div className="md:col-span-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center p-8 min-h-[300px]">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-600 shadow-inner flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800 text-white text-6xl font-bold">
            T
          </div>
        </div>
      </section>

      {/* ── Story section ── */}
      <section className="max-w-[720px] w-full mb-20">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-[#0058be] dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            {isEs ? 'Nuestra historia' : 'The Story'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            {isEs ? 'Por qué creamos TecnoActual' : 'Why we created TecnoActual'}
          </h2>
          <div className="text-slate-500 dark:text-slate-400 space-y-5 text-base leading-relaxed">
            <p>
              {isEs
                ? 'Hace unos años nos dimos cuenta de que había una brecha enorme en cómo se hablaba de tecnología online. O bien encontrabas documentación técnica pensada para desarrolladores, o clickbait superficial que no explicaba nada.'
                : 'A few years ago, we realized there was a massive gap in how technology was discussed online. You either had deeply technical documentation meant for developers, or superficial clickbait that didn\'t actually explain how things worked.'}
            </p>
            <p>
              {isEs
                ? 'Cuando la IA empezó a ser mainstream, esta brecha se convirtió en un abismo. Amigos y familiares nos preguntaban, sintiéndose abrumados por el ritmo de cambio. Creamos esta plataforma para ser el puente: un lugar donde encontrar información honesta, clara y accionable sin necesitar un título universitario.'
                : 'As AI started becoming mainstream, this gap turned into a chasm. Friends and family were asking questions, feeling overwhelmed. We started this platform to be the bridge — a place where you can find honest, clear, and actionable information without needing a computer science degree.'}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-sm"
            >
              <span className="text-3xl mb-2">{stat.icon}</span>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stat.value}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
                {stat.label[lang]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-[1280px] w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
          {isEs ? 'Nuestros valores' : 'Our Values'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '🛡️',
              title: { es: 'Independencia editorial', en: 'Editorial independence' },
              desc: { es: 'Nunca aceptamos pagos para publicar análisis positivos. Nuestra opinión no está en venta.', en: 'We never accept payments for positive reviews. Our opinion is not for sale.' },
            },
            {
              icon: '⚡',
              title: { es: 'Análisis en profundidad', en: 'In-depth analysis' },
              desc: { es: 'Probamos cada herramienta durante semanas antes de publicar nuestro veredicto.', en: 'We test every tool for weeks before publishing our verdict.' },
            },
            {
              icon: '🏆',
              title: { es: 'Accesibilidad', en: 'Accessibility' },
              desc: { es: 'Explicamos conceptos complejos en lenguaje claro, sin jerga innecesaria.', en: 'We explain complex concepts in clear language, without unnecessary jargon.' },
            },
          ].map((v) => (
            <div key={v.title.en} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{v.title[lang]}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{v.desc[lang]}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
