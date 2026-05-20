import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Star, Zap, Brain, Code, Image, MessageSquare, Search, Music, Video } from 'lucide-react';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const isEs = params.lang === 'es';
  return {
    title: isEs ? 'Herramientas IA — Directorio de Herramientas de IA | TecnoActual' : 'AI Tools Directory | TecnoActual',
    description: isEs
      ? 'El directorio más completo de herramientas de inteligencia artificial. Encuentra las mejores IAs para tu trabajo, clasificadas por categoría.'
      : 'The most complete AI tools directory. Find the best AI tools for your work, organized by category.',
  };
}

const TOOLS = [
  {
    category: 'es' as const,
    categoryLabel: { es: 'Escritura y Texto', en: 'Writing & Text' },
    icon: MessageSquare,
    color: 'blue',
    items: [
      { name: 'ChatGPT', desc: { es: 'El chatbot de IA más popular del mundo.', en: 'The world\'s most popular AI chatbot.' }, url: 'https://chat.openai.com', badge: 'Gratis/Pro' },
      { name: 'Claude', desc: { es: 'IA conversacional avanzada de Anthropic.', en: 'Advanced conversational AI by Anthropic.' }, url: 'https://claude.ai', badge: 'Gratis/Pro' },
      { name: 'Gemini', desc: { es: 'IA multimodal de Google con búsqueda integrada.', en: 'Google\'s multimodal AI with integrated search.' }, url: 'https://gemini.google.com', badge: 'Gratis' },
      { name: 'Notion AI', desc: { es: 'Escritura y organización asistida por IA.', en: 'AI-assisted writing and organization.' }, url: 'https://notion.so', badge: 'Pro' },
    ],
  },
  {
    category: 'img' as const,
    categoryLabel: { es: 'Imágenes y Arte', en: 'Images & Art' },
    icon: Image,
    color: 'purple',
    items: [
      { name: 'Midjourney', desc: { es: 'Generación de imágenes artísticas de alta calidad.', en: 'High quality artistic image generation.' }, url: 'https://midjourney.com', badge: 'Pro' },
      { name: 'DALL-E 3', desc: { es: 'Imágenes fotorrealistas desde texto de OpenAI.', en: 'Photorealistic images from text by OpenAI.' }, url: 'https://openai.com/dall-e-3', badge: 'Pro' },
      { name: 'Stable Diffusion', desc: { es: 'Modelo open source de generación de imágenes.', en: 'Open source image generation model.' }, url: 'https://stability.ai', badge: 'Gratis' },
      { name: 'Adobe Firefly', desc: { es: 'IA generativa integrada en el ecosistema Adobe.', en: 'Generative AI integrated in the Adobe ecosystem.' }, url: 'https://firefly.adobe.com', badge: 'Gratis/Pro' },
    ],
  },
  {
    category: 'code' as const,
    categoryLabel: { es: 'Código y Desarrollo', en: 'Code & Development' },
    icon: Code,
    color: 'green',
    items: [
      { name: 'GitHub Copilot', desc: { es: 'Asistente de código IA integrado en tu editor.', en: 'AI code assistant integrated in your editor.' }, url: 'https://github.com/features/copilot', badge: 'Pro' },
      { name: 'Cursor', desc: { es: 'Editor de código potenciado con IA.', en: 'AI-powered code editor.' }, url: 'https://cursor.so', badge: 'Gratis/Pro' },
      { name: 'v0 by Vercel', desc: { es: 'Generador de UI con React y Tailwind.', en: 'UI generator with React and Tailwind.' }, url: 'https://v0.dev', badge: 'Gratis/Pro' },
      { name: 'Bolt.new', desc: { es: 'Desarrolla apps completas desde el navegador.', en: 'Develop full apps from the browser.' }, url: 'https://bolt.new', badge: 'Gratis/Pro' },
    ],
  },
  {
    category: 'video' as const,
    categoryLabel: { es: 'Vídeo y Audio', en: 'Video & Audio' },
    icon: Video,
    color: 'red',
    items: [
      { name: 'Sora', desc: { es: 'Generación de vídeo de alta calidad por OpenAI.', en: 'High quality video generation by OpenAI.' }, url: 'https://sora.com', badge: 'Pro' },
      { name: 'ElevenLabs', desc: { es: 'Síntesis de voz ultra realista con IA.', en: 'Ultra realistic AI voice synthesis.' }, url: 'https://elevenlabs.io', badge: 'Gratis/Pro' },
      { name: 'Runway', desc: { es: 'Edición y generación de vídeo con IA.', en: 'AI video editing and generation.' }, url: 'https://runwayml.com', badge: 'Pro' },
      { name: 'Udio', desc: { es: 'Generación de música con IA.', en: 'AI music generation.' }, url: 'https://udio.com', badge: 'Gratis/Pro' },
    ],
  },
  {
    category: 'search' as const,
    categoryLabel: { es: 'Búsqueda y Research', en: 'Search & Research' },
    icon: Search,
    color: 'cyan',
    items: [
      { name: 'Perplexity', desc: { es: 'Motor de búsqueda con respuestas de IA en tiempo real.', en: 'Search engine with real-time AI answers.' }, url: 'https://perplexity.ai', badge: 'Gratis/Pro' },
      { name: 'You.com', desc: { es: 'Búsqueda personalizable con IA integrada.', en: 'Customizable search with integrated AI.' }, url: 'https://you.com', badge: 'Gratis' },
      { name: 'Elicit', desc: { es: 'Investigación académica asistida por IA.', en: 'AI-assisted academic research.' }, url: 'https://elicit.com', badge: 'Gratis/Pro' },
      { name: 'NotebookLM', desc: { es: 'Analiza documentos y extrae insights con IA.', en: 'Analyze documents and extract insights with AI.' }, url: 'https://notebooklm.google', badge: 'Gratis' },
    ],
  },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
};

const iconBgMap: Record<string, string> = {
  blue: 'bg-blue-600',
  purple: 'bg-purple-600',
  green: 'bg-green-600',
  red: 'bg-red-600',
  cyan: 'bg-cyan-600',
};

export default function HerramientasPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const isEs = lang === 'es';

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
            <Brain size={14} />
            {isEs ? 'Actualizado 2025' : 'Updated 2025'}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isEs ? 'Directorio de' : 'AI Tools'}{' '}
            <span className="text-green-400">{isEs ? 'Herramientas IA' : 'Directory'}</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {isEs
              ? 'Las mejores herramientas de inteligencia artificial, organizadas por categoría. Gratis y de pago.'
              : 'The best artificial intelligence tools, organized by category. Free and paid.'}
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-green-400" />{TOOLS.reduce((a, t) => a + t.items.length, 0)} {isEs ? 'herramientas' : 'tools'}</span>
            <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400" />{isEs ? 'Seleccionadas a mano' : 'Hand-picked'}</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {TOOLS.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.category}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-10 h-10 ${iconBgMap[group.color]} rounded-xl flex items-center justify-center`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {group.categoryLabel[lang]}
                  </h2>
                  <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${colorMap[group.color]}`}>
                    {group.items.length} {isEs ? 'herramientas' : 'tools'}
                  </span>
                </div>

                {/* Tools list */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {group.items.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {tool.name}
                        </h3>
                        <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                        {tool.desc[lang]}
                      </p>
                      <span className={`mt-4 self-start px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[group.color]}`}>
                        {tool.badge}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {isEs ? '¿Falta alguna herramienta?' : 'Missing a tool?'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {isEs ? 'Escríbenos y la añadimos al directorio.' : 'Write to us and we\'ll add it to the directory.'}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            {isEs ? 'Sugerir herramienta' : 'Suggest a tool'}
          </Link>
        </div>
      </section>
    </div>
  );
}
