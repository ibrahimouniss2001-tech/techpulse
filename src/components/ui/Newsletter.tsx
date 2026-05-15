'use client';
import { useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';

interface NewsletterProps {
  lang: 'es' | 'en';
}

export function Newsletter({ lang }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    // Replace with real newsletter API (Mailchimp, ConvertKit, Resend, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
  };

  return (
    <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 py-16 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-4xl mb-4">📬</div>
        <h2 className="font-display text-display-sm font-bold text-white mb-3">
          {lang === 'es' ? 'No te pierdas nada' : 'Stay in the loop'}
        </h2>
        <p className="text-brand-200 text-lg mb-8">
          {lang === 'es'
            ? 'Recibe los mejores artículos tech directamente en tu bandeja de entrada. Sin spam, cancela cuando quieras.'
            : 'Get the best tech articles directly in your inbox. No spam, unsubscribe anytime.'}
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 py-4 px-6 bg-white/10 rounded-2xl text-white">
            <Check size={20} className="text-green-400" />
            <span className="font-semibold">
              {lang === 'es' ? '¡Suscrito con éxito! Gracias 🎉' : 'Successfully subscribed! Thank you 🎉'}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'es' ? 'tu@email.com' : 'you@email.com'}
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-brand-300 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors disabled:opacity-70 flex-shrink-0"
            >
              {status === 'loading' ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Send size={16} />
                  {lang === 'es' ? 'Suscribirme' : 'Subscribe'}
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-xs text-brand-300 mt-4">
          {lang === 'es'
            ? 'Al suscribirte aceptas nuestra Política de Privacidad. Sin spam garantizado.'
            : 'By subscribing you accept our Privacy Policy. No spam guaranteed.'}
        </p>
      </div>
    </section>
  );
}
