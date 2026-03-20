import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';
import { Header, Footer, MobileActionBar } from '@/components/layout';
import { YandexMetrika } from '@/components/analytics/YandexMetrika';
import { WebVitals } from '@/components/analytics/WebVitals';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avtohub161.ru';

export const metadata: Metadata = {
  title: 'AutoHub Rostov — Эвакуатор, Автосервис, Аварийный комиссар в Ростове-на-Дону',
  description:
    'Эвакуатор 24/7, автосервис, аварийный комиссар и контрактные агрегаты в Ростове-на-Дону. Быстро, надёжно, круглосуточно.',
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || '';

  return (
    <html lang="ru">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/unbounded/unbounded-700-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope/manrope-400-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-manrope bg-background text-secondary antialiased">
        <Header />
        <main className="min-h-screen pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileActionBar />
        {metrikaId && <YandexMetrika id={metrikaId} />}
        <WebVitals />
      </body>
    </html>
  );
}
