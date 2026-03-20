import type { Metadata } from 'next';
import { Hero } from '@/components/sections';
import { buildOpenGraph } from '@/components/seo';
import { SosForm } from './SosForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avtohub161.ru';

export const metadata: Metadata = {
  title: 'Эвакуатор 24/7 в Ростове-на-Дону — AutoHub Rostov',
  description:
    'Эвакуатор круглосуточно. Подача от 30 минут, доступные цены. Ростов и область.',
  alternates: {
    canonical: `${SITE_URL}/evacuation`,
  },
  ...buildOpenGraph({
    title: 'Эвакуатор 24/7 в Ростове-на-Дону',
    description: 'Круглосуточная эвакуация автомобилей. Подача от 30 минут, доступные цены.',
    url: `${SITE_URL}/evacuation`,
  }),
};

const SERVICES = [
  { title: 'Эвакуация легковых авто', desc: 'Подача от 30 минут по Ростову и области' },
  { title: 'Эвакуация грузовых', desc: 'Спецтехника для грузовых автомобилей' },
  { title: 'Эвакуация мотоциклов', desc: 'Аккуратная перевозка мототехники' },
  { title: 'Вскрытие замков', desc: 'Помощь при закрытых в авто ключах' },
] as const;

export default function EvacuationPage() {
  return (
    <>
      <Hero
        title="Эвакуатор 24/7"
        subtitle="Быстрая эвакуация автомобилей в Ростове-на-Дону и Ростовской области"
      >
        <a
          href="tel:+78633030000"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white hover:bg-primary/90 transition-colors"
        >
          📞 Вызвать эвакуатор
        </a>
      </Hero>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-unbounded text-2xl md:text-3xl font-bold mb-8">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-xl bg-surface p-6 shadow-md">
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOS Form */}
      <section className="py-16 px-4 bg-surface">
        <div className="mx-auto max-w-lg">
          <h2 className="font-unbounded text-2xl font-bold mb-6 text-center">
            🆘 Заказать эвакуатор
          </h2>
          <SosForm />
        </div>
      </section>
    </>
  );
}
