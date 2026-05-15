import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import { Post } from '@/data/posts';
import { formatDate } from '@/lib/utils';
import { clsx } from 'clsx';

interface PostCardProps {
  post: Post;
  lang: 'es' | 'en';
  variant: 'card' | 'compact' | 'list';
  index?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  smartphones: 'badge-smartphones',
  laptops: 'badge-laptops',
  ia: 'badge-ia',
  gaming: 'badge-gaming',
  audio: 'badge-audio',
  wearables: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
};

export function PostCard({ post, lang, variant, index = 0 }: PostCardProps) {
  const badgeClass = CATEGORY_COLORS[post.category] || 'badge-default';

  if (variant === 'compact') {
    return (
      <Link
        href={`/${lang}/blog/${post.slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-200 card-hover animate-fade-in"
        style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
      >
        <div className="relative h-40 overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt[lang]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className={clsx('absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold', badgeClass)}>
            {post.category}
          </span>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {post.title[lang]}
          </h3>
          <div className="mt-auto flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime} min</span>
            <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(post.publishedAt, lang, true)}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'list') {
    return (
      <Link
        href={`/${lang}/blog/${post.slug}`}
        className="group flex gap-5 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-200 hover:-translate-y-1 animate-slide-up"
        style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
      >
        <div className="relative w-32 h-24 flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt[lang]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="128px"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={clsx('px-2 py-0.5 rounded-full text-xs font-semibold', badgeClass)}>
              {post.category}
            </span>
          </div>
          <h3 className="font-display font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {post.title[lang]}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 mb-3">{post.excerpt[lang]}</p>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>{post.author.name}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime} min</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang, true)}</time>
          </div>
        </div>
      </Link>
    );
  }

  // Default: card
  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-200 card-hover animate-fade-in"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt[lang]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className={clsx('absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold', badgeClass)}>
          {post.category}
        </span>
        {post.featured && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-500 text-white">
            ★ Featured
          </span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug mb-2.5 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors text-base">
          {post.title[lang]}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-1">
          {post.excerpt[lang]}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={11} />
            <span>{post.readingTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
