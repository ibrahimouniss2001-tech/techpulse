import Link from 'next/link';
import { Cpu, Twitter, Github, Rss } from 'lucide-react';
import { CATEGORIES } from '@/data/posts';

interface FooterProps {
  lang: string;
}

export function Footer({ lang }: FooterProps) {
  const legal = [
    { href: `/en/privacy-policy`, label: 'Privacy Policy' },
    { href: `/en/cookies-policy`, label: 'Cookies Policy' },
    { href: `/en/terms`, label: 'Terms & Conditions' },
    { href: `/en/about`, label: 'About Us' },
    { href: `/en/contact`, label: 'Contact' },
  ];

  const socials = [
    { href: 'https://twitter.com/TechPulse_dev', Icon: Twitter, label: 'Twitter' },
    { href: 'https://github.com/TechPulse', Icon: Github, label: 'GitHub' },
    { href: `/en/rss.xml`, Icon: Rss, label: 'RSS' },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/en" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <Cpu size={18} className="text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                Tech<span className="text-blue-400">Pulse</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your reference in technology, gadgets and AI innovation. Honest analysis for smart decisions.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/en/categoria/${cat.slug}`}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    {cat.name['en']}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Most read */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">
              Most Read
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: `/en/blog/mejor-smartphone-2024-guia-completa`, label: 'Best smartphone 2024' },
                { href: `/en/blog/chatgpt-vs-gemini-vs-claude-comparativa-ia`, label: 'ChatGPT vs Gemini vs Claude' },
                { href: `/en/blog/mejores-auriculares-noise-cancelling-2024`, label: 'Best ANC headphones' },
                { href: `/en/blog/mejor-laptop-programadores-2024`, label: 'Laptop for developers' },
                { href: `/en/blog/playstation-5-slim-vs-xbox-series-x-2024`, label: 'PS5 vs Xbox Series X' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Legal</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            ⚠️ Disclosure: TechPulse may receive commissions for purchases made through affiliate links on this site. This does not influence our editorial. See our full affiliate policy in the Privacy Policy.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} TechPulse Media. All rights reserved.</p>
            <p>Made with ❤️ for the tech community</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
