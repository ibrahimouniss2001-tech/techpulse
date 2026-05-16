export const dynamic = 'force-dynamic';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: params.lang === 'es' ? 'Política de Cookies — TechPulse' : 'Cookies Policy — TechPulse',
    robots: { index: false, follow: false },
  };
}

export default function CookiesPage({ params }: { params: { lang: string } }) {
  const isEs = params.lang === 'es';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-display-sm font-bold text-slate-900 dark:text-white mb-4">
        {isEs ? 'Política de Cookies' : 'Cookies Policy'}
      </h1>
      <p className="text-slate-500 mb-10">{isEs ? 'Última actualización: 1 de julio de 2024' : 'Last updated: July 1, 2024'}</p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>{isEs ? '¿Qué son las cookies?' : 'What are cookies?'}</h2>
        <p>
          {isEs
            ? 'Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo cuando los visitas. Se utilizan para recordar tus preferencias, analizar el tráfico y mostrar publicidad relevante.'
            : 'Cookies are small text files that websites save on your device when you visit them. They are used to remember your preferences, analyze traffic and display relevant advertising.'}
        </p>

        <h2>{isEs ? 'Tipos de cookies que usamos' : 'Types of cookies we use'}</h2>

        <h3>{isEs ? '1. Cookies esenciales' : '1. Essential cookies'}</h3>
        <p>
          {isEs
            ? 'Necesarias para el funcionamiento básico del sitio (preferencias de idioma, tema oscuro/claro). No requieren consentimiento.'
            : 'Necessary for the basic functioning of the site (language preferences, dark/light theme). Do not require consent.'}
        </p>

        <h3>{isEs ? '2. Cookies analíticas' : '2. Analytics cookies'}</h3>
        <p>
          {isEs
            ? 'Utilizamos Google Analytics para entender cómo los visitantes usan nuestro sitio. Estos datos son anónimos y agregados. Cookie: _ga, _gid (duración: 2 años / 24 horas).'
            : 'We use Google Analytics to understand how visitors use our site. This data is anonymous and aggregated. Cookie: _ga, _gid (duration: 2 years / 24 hours).'}
        </p>

        <h3>{isEs ? '3. Cookies de publicidad (Google AdSense)' : '3. Advertising cookies (Google AdSense)'}</h3>
        <p>
          {isEs
            ? 'Google AdSense utiliza cookies para mostrar anuncios relevantes. Estas cookies pueden rastrear tu actividad en otros sitios. Puedes optar por no recibir publicidad personalizada en: https://www.google.com/settings/ads'
            : 'Google AdSense uses cookies to display relevant ads. These cookies may track your activity on other sites. You can opt out of personalized advertising at: https://www.google.com/settings/ads'}
        </p>

        <h2>{isEs ? 'Gestión del consentimiento (Consent Mode v2)' : 'Consent management (Consent Mode v2)'}</h2>
        <p>
          {isEs
            ? 'Cumplimos con el Reglamento General de Protección de Datos (RGPD) de la UE implementando el Consent Mode v2 de Google. Esto significa que respetamos tus elecciones sobre el uso de cookies de publicidad y analítica.'
            : 'We comply with the EU General Data Protection Regulation (GDPR) by implementing Google\'s Consent Mode v2. This means we respect your choices about the use of advertising and analytics cookies.'}
        </p>

        <h2>{isEs ? 'Cómo desactivar las cookies' : 'How to disable cookies'}</h2>
        <p>
          {isEs
            ? 'Puedes desactivar las cookies en la configuración de tu navegador. Ten en cuenta que esto puede afectar la funcionalidad del sitio. También puedes usar el panel de preferencias de cookies de este sitio.'
            : 'You can disable cookies in your browser settings. Note that this may affect the functionality of the site. You can also use the cookie preferences panel on this site.'}
        </p>

        <h2>{isEs ? 'Contacto' : 'Contact'}</h2>
        <p>cookies@techpulse.dev</p>
      </div>
    </div>
  );
}
