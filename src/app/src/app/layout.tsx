import type { Metadata } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.techpulse.dev'),
  title: {
    default: 'TechPulse — Tecnología, Gadgets e Innovación',
    template: '%s | TechPulse',
  },
  description: 'Análisis profundos, comparativas honestas y las últimas novedades en gadgets, smartphones, IA y tecnología. Tu referencia tech en español e inglés.',
  keywords: ['tecnología', 'gadgets', 'smartphones', 'laptops', 'inteligencia artificial', 'gaming', 'tech news'],
  authors: [{ name: 'TechPulse Editorial', url: 'https://www.techpulse.dev/about' }],
  creator: 'TechPulse',
  publisher: 'TechPulse Media',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    url: 'https://www.techpulse.dev',
    siteName: 'TechPulse',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'TechPulse — Tecnología y Gadgets' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@techpulse_dev',
    creator: '@techpulse_dev',
  },
  verification: {
    google: 'GOOGLE_VERIFICATION_TOKEN',
  },
  alternates: {
    canonical: 'https://www.techpulse.dev',
    languages: { 'es': 'https://www.techpulse.dev/es', 'en': 'https://www.techpulse.dev/en' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        {/* Google AdSense - replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}

// Inline theme script to prevent flash
function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (theme === 'dark' || (!theme && prefersDark)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          })();
        `,
      }}
    />
  );
}
