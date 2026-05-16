import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileAd } from '@/components/ads/StickyMobileAd';

const locales = ['es', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!locales.includes(lang)) notFound();

  setRequestLocale(lang);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen flex flex-col bg-surface dark:bg-surface-dark">
        <Header lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
        <StickyMobileAd />
      </div>
    </NextIntlClientProvider>
  );
}
