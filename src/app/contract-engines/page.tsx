import type { Metadata } from 'next';
import { Hero } from '@/components/sections';
import { ContractForm } from './ContractForm';

export const metadata: Metadata = {
  title: 'Контрактные агрегаты в Ростове-на-Дону — AutoHub Rostov',
  description:
    'Подбор и установка контрактных двигателей, КПП и других агрегатов в Ростове-на-Дону.',
};

const ADVANTAGES = [
  { icon: '✅', title: 'Гарантия качества', desc: 'Проверка каждого агрегата перед продажей' },
  { icon: '💰', title: 'Экономия до 60%', desc: 'В сравнении с новыми запчастями' },
  { icon: '🛠️', title: 'Установка', desc: 'Профессиональный монтаж в нашем сервисе' },
  { icon: '📦', title: 'Широкий ассортимент', desc: 'Двигатели, КПП, редукторы, турбины' },
] as const;

export default function ContractEnginesPage() {
  return (
    <>
      <Hero
        title="Контрактные агрегаты"
        subtitle="Подбор и установка контрактных двигателей и КПП с гарантией в Ростове-на-Дону"
        titleColor="text-accent"
      />

      {/* Advantages */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-unbounded text-2xl md:text-3xl font-bold mb-8">Преимущества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="rounded-xl bg-surface p-6 shadow-md text-center">
                <span className="text-3xl">{a.icon}</span>
                <h3 className="text-lg font-bold mt-3 mb-1">{a.title}</h3>
                <p className="text-gray-600 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 bg-surface">
        <div className="mx-auto max-w-lg">
          <h2 className="font-unbounded text-2xl font-bold mb-6 text-center">
            Оставить заявку
          </h2>
          <ContractForm />
        </div>
      </section>
    </>
  );
}
