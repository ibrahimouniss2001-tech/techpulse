'use client';

interface Props {
  lang: 'es' | 'en';
}

export function NewsletterInline({ lang }: Props) {
  return (
    <form
      className="flex flex-col md:flex-row gap-3 max-w-[500px] mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        required
        placeholder={lang === 'es' ? 'Tu correo electrónico' : 'Your email address'}
        className="flex-1 bg-white/10 border-none text-white rounded px-4 py-3 focus:ring-2 focus:ring-blue-300 placeholder:text-white/50 text-sm outline-none"
      />
      <button
        type="submit"
        className="bg-blue-200 text-blue-900 px-6 py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue-100 transition-colors shadow-sm whitespace-nowrap"
      >
        {lang === 'es' ? 'Suscribirse' : 'Subscribe'}
      </button>
    </form>
  );
}
