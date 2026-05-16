export const dynamic = 'force-dynamic';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: params.lang === 'es' ? 'Política de Privacidad — TechPulse' : 'Privacy Policy — TechPulse',
    description: params.lang === 'es' ? 'Política de privacidad de TechPulse. Cómo recogemos y usamos tus datos.' : 'TechPulse Privacy Policy. How we collect and use your data.',
    robots: { index: false, follow: false },
  };
}

export default function PrivacyPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'es' | 'en';
  const isEs = lang === 'es';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-display-sm font-bold text-slate-900 dark:text-white mb-4">
        {isEs ? 'Política de Privacidad' : 'Privacy Policy'}
      </h1>
      <p className="text-slate-500 mb-10">{isEs ? 'Última actualización: 1 de julio de 2024' : 'Last updated: July 1, 2024'}</p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>{isEs ? '1. Responsable del tratamiento' : '1. Data Controller'}</h2>
        <p>
          {isEs
            ? 'TechPulse Media (en adelante "TechPulse", "nosotros" o "nuestro") es el responsable del tratamiento de los datos personales recogidos a través de este sitio web (www.techpulse.dev).'
            : 'TechPulse Media (hereinafter "TechPulse", "we" or "our") is the data controller for personal data collected through this website (www.techpulse.dev).'}
        </p>

        <h2>{isEs ? '2. Datos que recogemos' : '2. Data We Collect'}</h2>
        <p>{isEs ? 'Podemos recoger los siguientes tipos de datos:' : 'We may collect the following types of data:'}</p>
        <ul>
          <li>{isEs ? 'Datos de navegación (páginas visitadas, tiempo en sitio, dispositivo, navegador) a través de cookies analíticas.' : 'Browsing data (pages visited, time on site, device, browser) through analytics cookies.'}</li>
          <li>{isEs ? 'Dirección de correo electrónico si te suscribes a nuestra newsletter.' : 'Email address if you subscribe to our newsletter.'}</li>
          <li>{isEs ? 'Nombre y email si rellenas el formulario de contacto.' : 'Name and email if you fill out the contact form.'}</li>
          <li>{isEs ? 'Datos de publicidad a través de Google AdSense (ver sección 5).' : 'Advertising data through Google AdSense (see section 5).'}</li>
        </ul>

        <h2>{isEs ? '3. Base legal y finalidades' : '3. Legal Basis and Purposes'}</h2>
        <p>
          {isEs
            ? 'Tratamos tus datos sobre la base de: (a) tu consentimiento, para cookies no esenciales y newsletter; (b) interés legítimo, para analítica básica; (c) cumplimiento de obligaciones legales.'
            : 'We process your data based on: (a) your consent, for non-essential cookies and newsletter; (b) legitimate interest, for basic analytics; (c) compliance with legal obligations.'}
        </p>

        <h2>{isEs ? '4. Cookies' : '4. Cookies'}</h2>
        <p>
          {isEs
            ? 'Este sitio utiliza cookies propias y de terceros. Para información detallada, consulta nuestra Política de Cookies.'
            : 'This site uses first-party and third-party cookies. For detailed information, see our Cookies Policy.'}
        </p>

        <h2>{isEs ? '5. Google AdSense y publicidad' : '5. Google AdSense and Advertising'}</h2>
        <p>
          {isEs
            ? 'Utilizamos Google AdSense para mostrar publicidad. Google puede usar cookies de publicidad personalizada. Puedes optar por salir en: https://www.google.com/settings/ads. Cumplimos con el RGPD utilizando el Consent Mode v2 de Google.'
            : 'We use Google AdSense to display advertising. Google may use personalized advertising cookies. You can opt out at: https://www.google.com/settings/ads. We comply with GDPR using Google\'s Consent Mode v2.'}
        </p>

        <h2>{isEs ? '6. Tus derechos' : '6. Your Rights'}</h2>
        <p>
          {isEs
            ? 'Tienes derecho a acceder, rectificar, suprimir, portabilidad y limitación del tratamiento. Para ejercer tus derechos, escríbenos a: privacy@techpulse.dev'
            : 'You have the right to access, rectify, erase, portability and restriction of processing. To exercise your rights, write to us at: privacy@techpulse.dev'}
        </p>

        <h2>{isEs ? '7. Contacto' : '7. Contact'}</h2>
        <p>privacy@techpulse.dev</p>
      </div>
    </div>
  );
}
