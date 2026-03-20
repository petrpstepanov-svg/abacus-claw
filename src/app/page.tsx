import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Hero, ServiceCard } from '@/components/sections';
import { JsonLd, LOCAL_BUSINESS_DATA, buildOpenGraph } from '@/components/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avtohub161.ru';

export const metadata: Metadata = {
  title: 'AutoHub Rostov — Эвакуатор, Автосервис, Аварийный комиссар в Ростове-на-Дону',
  description:
    'Эвакуатор 24/7, автосервис, аварийный комиссар и контрактные агрегаты в Ростове-на-Дону. Быстро, надёжно, круглосуточно.',
  alternates: {
    canonical: SITE_URL,
  },
  ...buildOpenGraph({
    title: 'AutoHub Rostov — Эвакуатор, Автосервис в Ростове-на-Дону',
    description: 'Эвакуатор 24/7, автосервис, аварийный комиссар и контрактные агрегаты в Ростове-на-Дону.',
    url: SITE_URL,
  }),
};

export default function Home() {
  return (
    <>
      <JsonLd type="LocalBusiness" data={LOCAL_BUSINESS_DATA} />

      {/* Hero */}
      <Hero
        title="AutoHub Rostov"
        subtitle="Эвакуатор 24/7 · Автосервис · Аварийный комиссар · Контрактные агрегаты"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/evacuation">
            <Button variant="primary" size="lg">🆘 Вызвать эвакуатор</Button>
          </Link>
          <Link href="/autoservice">
            <Button variant="accent" size="lg">Записаться в сервис</Button>
          </Link>
        </div>
      </Hero>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-unbounded text-2xl md:text-3xl font-bold text-center mb-12">
            Наши услуги
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              href="/evacuation"
              title="Эвакуатор 24/7"
              description="Быстрая эвакуация в любое время суток. Подача от 30 минут."
              borderColor="border-primary"
            />
            <ServiceCard
              href="/autoservice"
              title="Автосервис"
              description="Профессиональный ремонт и обслуживание автомобилей."
              borderColor="border-accent"
            />
            <ServiceCard
              href="/accident-commissioner"
              title="Аварийный комиссар"
              description="Помощь при ДТП, оформление документов."
              borderColor="border-secondary"
            />
            <ServiceCard
              href="/contract-engines"
              title="Контрактные агрегаты"
              description="Подбор и установка контрактных двигателей и КПП."
              borderColor="border-accent"
            />
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 px-4 bg-surface">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-unbounded text-2xl md:text-3xl font-bold mb-10">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: '⏰', label: 'Работаем 24/7', desc: 'Круглосуточно, без выходных' },
              { icon: '⚡', label: 'Подача от 30 мин', desc: 'Быстрый выезд по Ростову и области' },
              { icon: '💰', label: 'Честные цены', desc: 'Без скрытых наценок и комиссий' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="font-semibold text-lg">{item.label}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
