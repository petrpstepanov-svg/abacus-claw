import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';
import { Header, Footer, MobileActionBar } from '@/components/layout';

export const metadata: Metadata = {
  title: 'AutoHub Rostov — Эвакуатор, Автосервис, Аварийный комиссар в Ростове-на-Дону',
  description:
    'Эвакуатор 24/7, автосервис, аварийный комиссар и контрактные агрегаты в Ростове-на-Дону. Быстро, надёжно, круглосуточно.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-manrope bg-background text-secondary antialiased">
        <Header />
        <main className="min-h-screen pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
