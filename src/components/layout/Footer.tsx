import Link from 'next/link';
import { Cpu, Twitter, Github, Rss } from 'lucide-react';
import { CATEGORIES } from '@/data/posts';

interface FooterProps {
  lang: string;
}

export function Footer({ lang }: FooterProps) {
  const isEs = lang === 'es';

  const legal = [
    { href: `/${lang}/privacy-policy`, label: isEs ? 'Política de Privacidad' : 'Privacy Policy' },
    { href: `/${lang}/cookies-policy`, label: isEs ? 'Política de Cookies' : 'Cookies Policy' },
    { href: `/${lang}/terms`, label: isEs ? 'Términos y Condiciones' : 'Terms & Conditions' },
    { href: `/${lang}/about`, label: isEs ? 'Sobre Nosotros' : 'About Us' },
    { href: `/${lang}/contact`, label: isEs ? 'Contacto' : 'Contact' },
  ];

  const socials = [
    { href: 'https://twitter.com/TecnoActual_dev', Icon: Twitter, label: 'Twitter' },
    { href: 'https://github.com/TecnoActual', Icon: Github, label: 'GitHub' },
    { href: `/${lang}/rss.xml`, Icon: Rss, label: 'RSS' },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <Cpu size={18} className="text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                Tecno<span className="text-blue-400">Actual</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {isEs
                ? 'Tu referencia en tecnología, gadgets e innovación digital. Análisis honestos para decisiones inteligentes.'
                : 'Your reference in technology, gadgets and digital innovation. Honest analysis for smart decisions.'}
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-bold text-white mb-4 uppercase text-xs tracking-wider">
              {isEs ? 'Categorías' : 'Categories'}
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${lang}/categoria/${cat.slug}`}
                    className="text-slate-400 hover:text-brand-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    {cat.name[lang as 'es' | 'en']}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO internal links */}
          <div>
            <h3 className="font-display font-bold text-white mb-4 uppercase text-xs tracking-wider">
              {isEs ? 'Lo más leído' : 'Most read'}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: `/${lang}/blog/mejor-smartphone-2024-guia-completa`, label: isEs ? 'Mejor smartphone 2024' : 'Best smartphone 2024' },
                { href: `/${lang}/blog/chatgpt-vs-gemini-vs-claude-comparativa-ia`, label: isEs ? 'ChatGPT vs Gemini vs Claude' : 'ChatGPT vs Gemini vs Claude' },
                { href: `/${lang}/blog/mejores-auriculares-noise-cancelling-2024`, label: isEs ? 'Mejores auriculares ANC' : 'Best ANC headphones' },
                { href: `/${lang}/blog/mejor-laptop-programadores-2024`, label: isEs ? 'Laptop para programadores' : 'Laptop for developers' },
                { href: `/${lang}/blog/playstation-5-slim-vs-xbox-series-x-2024`, label: 'PS5 vs Xbox Series X' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-bold text-white mb-4 uppercase text-xs tracking-wider">
              {isEs ? 'Legal' : 'Legal'}
            </h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-brand-400 transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${lang === 'es' ? 'en' : 'es'}${'' }`} className="text-slate-400 hover:text-brand-400 transition-colors text-sm">
                  🌐 {lang === 'es' ? 'View in English' : 'Ver en Español'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            {isEs
              ? '⚠️ Divulgación: TecnoActual puede recibir comisiones por compras realizadas a través de enlaces de afiliados en este sitio. Esto no influye en nuestra editorial. Vea nuestra política completa de afiliados en la Política de Privacidad.'
              : '⚠️ Disclosure: TecnoActual may receive commissions for purchases made through affiliate links on this site. This does not influence our editorial. See our full affiliate policy in the Privacy Policy.'}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} TecnoActual Media. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
            <p>{isEs ? 'Hecho con ❤️ para la comunidad tech' : 'Made with ❤️ for the tech community'}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
