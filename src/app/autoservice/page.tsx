import type { Metadata } from 'next';
import { Hero } from '@/components/sections';
import { buildOpenGraph } from '@/components/seo';
import { AppointmentForm } from './AppointmentForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avtohub161.ru';

export const metadata: Metadata = {
  title: 'Автосервис в Ростове-на-Дону — AutoHub Rostov',
  description:
    'Профессиональный автосервис в Ростове-на-Дону. Ремонт, ТО, диагностика автомобилей.',
  alternates: {
    canonical: `${SITE_URL}/autoservice`,
  },
  ...buildOpenGraph({
    title: 'Автосервис в Ростове-на-Дону',
    description: 'Профессиональный автосервис. Ремонт, ТО, диагностика автомобилей.',
    url: `${SITE_URL}/autoservice`,
  }),
};

const SERVICES = [
  { title: 'Замена масла и фильтров', desc: 'Регулярное ТО вашего автомобиля' },
  { title: 'Ремонт двигателя', desc: 'Диагностика и ремонт любой сложности' },
  { title: 'Шиномонтаж', desc: 'Замена шин, балансировка колёс' },
  { title: 'Электрика', desc: 'Диагностика и ремонт электрооборудования' },
  { title: 'Кондиционер', desc: 'Заправка и ремонт автокондиционера' },
  { title: 'Ходовая часть', desc: 'Ремонт подвески и рулевого управления' },
] as const;

export default function AutoservicePage() {
  return (
    <>
      <Hero
        title="Автосервис"
        subtitle="Профессиональный ремонт и обслуживание автомобилей в Ростове-на-Дону"
        titleColor="text-accent"
      />

      {/* Services */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-unbounded text-2xl md:text-3xl font-bold mb-8">Услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-xl bg-surface p-6 shadow-md">
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-16 px-4 bg-surface">
        <div className="mx-auto max-w-lg">
          <h2 className="font-unbounded text-2xl font-bold mb-6 text-center">
            Записаться на сервис
          </h2>
          <AppointmentForm />
        </div>
      </section>
    </>
  );
}
