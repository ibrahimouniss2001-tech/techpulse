'use client';
import { useState } from 'react';
import { Send, Loader2, Check, Mail, MessageSquare } from 'lucide-react';

export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const isEs = lang === 'es';
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-display-sm font-bold text-slate-900 dark:text-white mb-4">
          {isEs ? 'Contacto' : 'Contact'}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          {isEs
            ? '¿Tienes una pregunta, propuesta o simplemente quieres saludar?'
            : 'Have a question, proposal or just want to say hello?'}
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-10">
        {/* Info sidebar */}
        <div className="space-y-6">
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <Mail size={22} className="text-brand-600 dark:text-brand-400 mb-3" />
            <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1">Email</h3>
            <a href="mailto:hola@techpulse.dev" className="text-brand-600 dark:text-brand-400 text-sm hover:underline">
              hola@techpulse.dev
            </a>
          </div>
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <MessageSquare size={22} className="text-brand-600 dark:text-brand-400 mb-3" />
            <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1">
              {isEs ? 'Colaboraciones' : 'Partnerships'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {isEs
                ? 'Para propuestas de colaboración, envía un correo con el asunto "Colaboración".'
                : 'For partnership proposals, send an email with the subject "Partnership".'}
            </p>
          </div>
          <div className="p-5 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-400">
              {isEs
                ? '⚡ Respondemos en menos de 48 horas laborables.'
                : '⚡ We respond within 48 business hours.'}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8 shadow-card">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">
                {isEs ? '¡Mensaje enviado!' : 'Message sent!'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {isEs ? 'Te responderemos en menos de 48h.' : "We'll get back to you within 48h."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {isEs ? 'Nombre' : 'Name'} *
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors text-sm"
                    placeholder={isEs ? 'Tu nombre' : 'Your name'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors text-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {isEs ? 'Asunto' : 'Subject'} *
                </label>
                <select
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors text-sm"
                >
                  <option value="">{isEs ? 'Selecciona un asunto' : 'Select a subject'}</option>
                  <option value="consulta">{isEs ? 'Consulta general' : 'General inquiry'}</option>
                  <option value="colaboracion">{isEs ? 'Colaboración / Partnership' : 'Collaboration / Partnership'}</option>
                  <option value="prensa">{isEs ? 'Prensa / Medios' : 'Press / Media'}</option>
                  <option value="error">{isEs ? 'Reportar error' : 'Report an error'}</option>
                  <option value="otro">{isEs ? 'Otro' : 'Other'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {isEs ? 'Mensaje' : 'Message'} *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors text-sm resize-none"
                  placeholder={isEs ? 'Escribe tu mensaje aquí...' : 'Write your message here...'}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    {isEs ? 'Enviar mensaje' : 'Send message'}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
