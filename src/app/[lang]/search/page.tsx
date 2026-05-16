'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { searchPosts } from '@/data/posts';
import { PostCard } from '@/components/blog/PostCard';
import { AdSlot } from '@/components/ads/AdSlot';

export default function SearchPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState(searchPosts(searchParams.get('q') || ''));

  useEffect(() => {
    if (query.length > 1) {
      setResults(searchPosts(query));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen">
      {/* Search header */}
      <div className="bg-gradient-to-b from-slate-50 dark:from-slate-900/50 to-transparent py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-sm font-bold text-slate-900 dark:text-white mb-8">
            {lang === 'es' ? 'Buscar artículos' : 'Search articles'}
          </h1>
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'es' ? 'Buscar artículos, gadgets, análisis...' : 'Search articles, gadgets, reviews...'}
              className="w-full pl-12 pr-12 py-4 text-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500 rounded-2xl outline-none transition-colors text-slate-900 dark:text-white placeholder:text-slate-400"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {query.length > 1 && (
          <div className="mb-6 text-slate-600 dark:text-slate-400">
            {results.length} {lang === 'es' ? 'artículos encontrados para' : 'articles found for'}{' '}
            <strong className="text-slate-900 dark:text-white">"{query}"</strong>
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((post, i) => (
              <PostCard key={post.slug} post={post} lang={lang} variant="card" index={i} />
            ))}
          </div>
        ) : query.length > 1 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">
              {lang === 'es' ? 'Sin resultados' : 'No results'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {lang === 'es'
                ? `No encontramos artículos para "${query}". Prueba con otros términos.`
                : `We couldn't find articles for "${query}". Try different terms.`}
            </p>
          </div>
        ) : null}

        {/* Ad below results */}
        {query.length > 1 && (
          <div className="mt-10">
            <AdSlot slot="6677889900" format="leaderboard" label={lang === 'es' ? 'Publicidad' : 'Advertisement'} />
          </div>
        )}
      </div>
    </div>
  );
}
