export const dynamic = 'force-dynamic';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: params.lang === 'es' ? 'Términos y Condiciones — TechPulse' : 'Terms & Conditions — TechPulse',
    robots: { index: false, follow: false },
  };
}

export default function TermsPage({ params }: { params: { lang: string } }) {
  const isEs = params.lang === 'es';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-display-sm font-bold text-slate-900 dark:text-white mb-4">
        {isEs ? 'Términos y Condiciones' : 'Terms & Conditions'}
      </h1>
      <p className="text-slate-500 mb-10">{isEs ? 'Última actualización: 1 de julio de 2024' : 'Last updated: July 1, 2024'}</p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>{isEs ? '1. Aceptación de los términos' : '1. Acceptance of terms'}</h2>
        <p>
          {isEs
            ? 'Al acceder y usar TechPulse (www.techpulse.dev), aceptas quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo, no uses este sitio.'
            : 'By accessing and using TechPulse (www.techpulse.dev), you agree to be bound by these Terms and Conditions. If you disagree, do not use this site.'}
        </p>

        <h2>{isEs ? '2. Propiedad intelectual' : '2. Intellectual property'}</h2>
        <p>
          {isEs
            ? 'Todo el contenido de TechPulse (textos, imágenes, logotipos, diseño) es propiedad de TechPulse Media o de sus respectivos propietarios y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción sin autorización expresa.'
            : 'All content on TechPulse (texts, images, logos, design) is the property of TechPulse Media or its respective owners and is protected by intellectual property laws. Reproduction without express authorization is prohibited.'}
        </p>

        <h2>{isEs ? '3. Exactitud de la información' : '3. Accuracy of information'}</h2>
        <p>
          {isEs
            ? 'Nos esforzamos por mantener la información actualizada y precisa. Sin embargo, el mundo tech cambia rápidamente y algunos datos pueden quedar desactualizados. TechPulse no se hace responsable de decisiones tomadas basándose exclusivamente en nuestro contenido.'
            : 'We strive to keep information current and accurate. However, the tech world changes rapidly and some data may become outdated. TechPulse is not responsible for decisions made based solely on our content.'}
        </p>

        <h2>{isEs ? '4. Enlaces de afiliados' : '4. Affiliate links'}</h2>
        <p>
          {isEs
            ? 'TechPulse participa en programas de afiliados (Amazon, otros). Cuando haces clic en un enlace de afiliado y realizas una compra, recibimos una pequeña comisión sin coste adicional para ti. Esto ayuda a financiar el sitio y mantenerlo gratuito.'
            : 'TechPulse participates in affiliate programs (Amazon, others). When you click an affiliate link and make a purchase, we receive a small commission at no additional cost to you. This helps fund the site and keep it free.'}
        </p>

        <h2>{isEs ? '5. Limitación de responsabilidad' : '5. Limitation of liability'}</h2>
        <p>
          {isEs
            ? 'TechPulse no será responsable de daños directos, indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso de este sitio o de las decisiones de compra tomadas basándose en nuestro contenido.'
            : 'TechPulse shall not be liable for direct, indirect, incidental or consequential damages arising from the use or inability to use this site or purchasing decisions made based on our content.'}
        </p>

        <h2>{isEs ? '6. Ley aplicable' : '6. Applicable law'}</h2>
        <p>
          {isEs
            ? 'Estos términos se rigen por la ley española. Cualquier disputa será resuelta en los tribunales competentes de España.'
            : 'These terms are governed by Spanish law. Any dispute will be resolved in the competent courts of Spain.'}
        </p>

        <h2>{isEs ? '7. Contacto' : '7. Contact'}</h2>
        <p>legal@techpulse.dev</p>
      </div>
    </div>
  );
}
