'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';

export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const isEs = lang === 'es';
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
  };

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-10 py-20 flex flex-col lg:flex-row gap-6">

      {/* ── Left: Contact form ── */}
      <section className="w-full lg:w-2/3 bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          {isEs ? 'Escríbenos' : 'Get in Touch'}
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          {isEs
            ? '¿Tienes una pregunta sobre IA o quieres sugerir un tema? Déjanos un mensaje.'
            : 'Have a question about AI or want to suggest a topic? Drop us a line.'}
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-3xl">✅</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {isEs ? '¡Mensaje enviado!' : 'Message sent!'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-center">
              {isEs ? 'Te responderemos en menos de 48 horas.' : 'We\'ll reply within 48 hours.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                {isEs ? 'Nombre' : 'Name'}
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                {isEs ? 'Correo electrónico' : 'Email Address'}
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] outline-none transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                {isEs ? 'Mensaje' : 'Message'}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-[#0058be] focus:ring-1 focus:ring-[#0058be] outline-none transition-colors resize-y text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#0058be] hover:bg-[#004395] disabled:opacity-60 text-white px-8 py-3 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-2 w-full md:w-auto transition-all shadow-sm hover:-translate-y-0.5"
            >
              {status === 'loading' ? (
                <><span className="animate-spin">⏳</span> {isEs ? 'Enviando...' : 'Sending...'}</>
              ) : (
                <>{isEs ? 'Enviar mensaje' : 'Send message'} ✉️</>
              )}
            </button>
          </form>
        )}
      </section>

      {/* ── Right: Social links ── */}
      <aside className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 border border-slate-200 dark:border-slate-700 h-full flex flex-col justify-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            {isEs ? 'Colaboremos' : 'Let\'s collaborate'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
            {isEs
              ? 'Siempre buscamos expertos del sector y escritores apasionados por la tech para contribuir. Escríbenos o contáctanos en nuestras redes.'
              : 'We are always looking for industry experts and passionate tech writers to contribute. Reach out through the form or on our social channels.'}
          </p>

          <div className="space-y-3">
            {[
              { icon: '🐦', platform: 'Twitter / X', handle: '@TecnoActual_dev', href: 'https://twitter.com/TecnoActual_dev' },
              { icon: '💼', platform: 'LinkedIn', handle: 'TecnoActual Network', href: '#' },
              { icon: '▶️', platform: 'YouTube', handle: 'TecnoActual Video', href: '#' },
            ].map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600 group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{s.platform}</span>
                  <span className="block text-sm text-slate-400">{s.handle}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Info card */}
        <div className="bg-[#3f465c] rounded-xl p-6 text-white text-center">
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-bold text-lg mb-2">
            {isEs ? '¿Tienes una sugerencia?' : 'Got a suggestion?'}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            {isEs
              ? 'Si falta alguna herramienta en nuestro directorio, cuéntanoslo. La añadimos en 48h.'
              : 'If a tool is missing from our directory, let us know. We\'ll add it within 48h.'}
          </p>
        </div>
      </aside>
    </main>
  );
}
