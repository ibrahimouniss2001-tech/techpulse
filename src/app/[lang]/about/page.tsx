import { Metadata } from 'next';
import Image from 'next/image';
import { AUTHORS } from '@/data/posts';
import { Shield, Zap, Award, Users } from 'lucide-react';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const isEs = params.lang === 'es';
  return {
    title: isEs ? 'Sobre TechPulse — Nuestro Equipo y Metodología' : 'About TechPulse — Our Team and Methodology',
    description: isEs
      ? 'Conoce al equipo detrás de TechPulse, nuestra metodología de análisis y nuestro compromiso con el periodismo tech honesto.'
      : 'Meet the team behind TechPulse, our review methodology and our commitment to honest tech journalism.',
  };
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const authors = Object.values(AUTHORS);

  const values = [
    {
      icon: Shield,
      title: lang === 'es' ? 'Independencia editorial' : 'Editorial independence',
      desc: lang === 'es'
        ? 'Nunca aceptamos pagos para publicar análisis positivos. Nuestra opinión no está en venta.'
        : 'We never accept payments to publish positive reviews. Our opinion is not for sale.',
    },
    {
      icon: Zap,
      title: lang === 'es' ? 'Pruebas reales' : 'Real-world testing',
      desc: lang === 'es'
        ? 'Usamos cada producto durante semanas en condiciones reales antes de publicar nuestro veredicto.'
        : 'We use every product for weeks in real conditions before publishing our verdict.',
    },
    {
      icon: Award,
      title: lang === 'es' ? 'Expertise demostrado' : 'Demonstrated expertise',
      desc: lang === 'es'
        ? 'Nuestro equipo acumula más de 30 años de experiencia combinada en el mundo de la tecnología.'
        : 'Our team combines over 30 years of experience in the technology world.',
    },
    {
      icon: Users,
      title: lang === 'es' ? 'Comunidad primero' : 'Community first',
      desc: lang === 'es'
        ? 'Escribimos para el lector, no para los fabricantes. Tu tiempo y dinero merecen respeto.'
        : 'We write for the reader, not the manufacturers. Your time and money deserve respect.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="font-display text-display-md font-bold text-slate-900 dark:text-white mb-6">
          {lang === 'es' ? 'Sobre TechPulse' : 'About TechPulse'}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          {lang === 'es'
            ? 'Somos un equipo de periodistas tecnológicos apasionados comprometidos con un único objetivo: ayudarte a tomar las mejores decisiones de compra con información honesta, profunda y sin filtros.'
            : "We're a team of passionate tech journalists committed to a single goal: helping you make the best purchasing decisions with honest, in-depth, unfiltered information."}
        </p>
      </div>

      {/* Values */}
      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        {values.map((v) => (
          <div key={v.title} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card">
            <v.icon size={28} className="text-brand-600 dark:text-brand-400 mb-4" />
            <h3 className="font-display font-bold text-slate-900 dark:text-white mb-2">{v.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div>
        <h2 className="font-display text-display-xs font-bold text-slate-900 dark:text-white mb-8 text-center">
          {lang === 'es' ? 'Nuestro equipo' : 'Our team'}
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {authors.map((author) => (
            <div key={author.name} className="text-center">
              <Image
                src={author.avatar}
                alt={author.name}
                width={80}
                height={80}
                className="rounded-full mx-auto mb-4 ring-4 ring-brand-100 dark:ring-brand-900/30"
              />
              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1">{author.name}</h3>
              {author.twitter && (
                <a href={`https://twitter.com/${author.twitter.replace('@', '')}`} className="text-sm text-brand-600 dark:text-brand-400 mb-3 block hover:underline">
                  {author.twitter}
                </a>
              )}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{author.bio[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* EEAT disclosure */}
      <div className="mt-16 p-6 bg-brand-50 dark:bg-brand-950/20 rounded-2xl border border-brand-200 dark:border-brand-800">
        <h3 className="font-display font-bold text-slate-900 dark:text-white mb-3">
          {lang === 'es' ? '📌 Divulgación editorial' : '📌 Editorial disclosure'}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {lang === 'es'
            ? 'TechPulse puede recibir compensación cuando haces clic en enlaces de afiliados y realizas una compra. Esto no influye en nuestros análisis ni en las notas que otorgamos a los productos. Siempre probamos los productos de forma independiente y publicamos nuestra opinión honesta. Los productos analizados a veces son cedidos temporalmente por los fabricantes para su análisis y devueltos posteriormente.'
            : 'TechPulse may receive compensation when you click on affiliate links and make a purchase. This does not influence our reviews or the ratings we give products. We always test products independently and publish our honest opinion. Products reviewed are sometimes temporarily loaned by manufacturers for review and returned afterwards.'}
        </p>
      </div>
    </div>
  );
}
