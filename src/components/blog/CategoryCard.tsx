// CategoryCard
import Link from 'next/link';
import { Category } from '@/data/posts';
import { clsx } from 'clsx';

interface CategoryCardProps {
  category: Category;
  lang: 'es' | 'en';
  index?: number;
}

export function CategoryCard({ category, lang, index = 0 }: CategoryCardProps) {
  return (
    <Link
      href={`/${lang}/categoria/${category.slug}`}
      className="group flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card hover:shadow-card-hover hover:border-brand-200 dark:hover:border-brand-800 transition-all duration-200 card-hover text-center animate-fade-in"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <span className="text-3xl">{category.icon}</span>
      <span className="font-display text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
        {category.name[lang]}
      </span>
    </Link>
  );
}
