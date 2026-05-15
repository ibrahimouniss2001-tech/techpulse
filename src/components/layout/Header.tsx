'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Search, Menu, X, Zap } from 'lucide-react';
import { CATEGORIES } from '@/data/posts';

interface HeaderProps {
  lang: string;
}

export function Header({ lang }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const otherLang = lang === 'es' ? 'en' : 'es';

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(stored === 'dark' || (!stored && prefersDark));

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDark);
  };

  const navItems = [
    { href: `/${lang}`, label: lang === 'es' ? 'Inicio' : 'Home' },
    { href: `/${lang}/blog`, label: 'Blog' },
    { href: `/${lang}/categoria`, label: lang === 'es' ? 'Categorías' : 'Categories' },
    { href: `/${lang}/about`, label: lang === 'es' ? 'Nosotros' : 'About' },
  ];

  const switchLangPath = pathname.replace(`/${lang}`, `/${otherLang}`);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-glow-brand transition-shadow">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Tech<span className="text-brand-600 dark:text-brand-400">Pulse</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== `/${lang}` && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Link
              href={`/${lang}/search`}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={lang === 'es' ? 'Buscar' : 'Search'}
            >
              <Search size={18} />
            </Link>

            {/* Language */}
            <Link
              href={switchLangPath}
              className="hidden sm:flex items-center px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-100 hover:text-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-400 transition-colors uppercase tracking-wider"
            >
              {otherLang}
            </Link>

            {/* Dark mode */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={isDark ? (lang === 'es' ? 'Modo claro' : 'Light mode') : (lang === 'es' ? 'Modo oscuro' : 'Dark mode')}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              href={switchLangPath}
              className="block px-4 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-400"
              onClick={() => setIsMenuOpen(false)}
            >
              🌐 {otherLang === 'es' ? 'Ver en Español' : 'View in English'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
