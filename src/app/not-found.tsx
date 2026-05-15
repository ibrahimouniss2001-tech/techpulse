import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-display font-bold gradient-text mb-4">404</div>
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3">
        Página no encontrada
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        La página que buscas no existe o ha sido movida. Vuelve al inicio para seguir explorando tecnología.
      </p>
      <div className="flex gap-4">
        <Link
          href="/es"
          className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
        >
          Ir al inicio
        </Link>
        <Link
          href="/es/blog"
          className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          Ver el blog
        </Link>
      </div>
    </div>
  );
}
