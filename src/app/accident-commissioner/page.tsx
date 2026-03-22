import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Hero } from '@/components/sections';
import { buildOpenGraph } from '@/components/seo';
import { AccidentForm } from './AccidentForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avtohub161.ru';

export const metadata: Metadata = {
      title: 'Аварийный комиссар в Ростове-на-Дону — AutoHub Rostov',
      description:
              'Аварийный комиссар в Ростове. Помощь при ДТП, оформление документов, работа со страховыми.',
      alternates: {
              canonical: `${SITE_URL}/accident-commissioner`,
      },
      ...buildOpenGraph({
              title: 'Аварийный комиссар в Ростове-на-Дону',
              description: 'Помощь при ДТП, оформление документов, работа со страховыми компаниями.',
              url: `${SITE_URL}/accident-commissioner`,
      }),
};

const SERVICES = [
    { title: 'Фиксация ДТП', desc: 'Профессиональная фото- и видеофиксация' },
    { title: 'Оформление документов', desc: 'Помощь с оформлением всех необходимых бумаг' },
    { title: 'Работа со страховой', desc: 'Защита ваших интересов перед страховой компанией' },
    { title: 'Юридическая помощь', desc: 'Консультация по юридическим вопросам после ДТП' },
    ] as const;

export default function AccidentCommissionerPage() {
      return (
              <>
                    <Hero
                                title="Аварийный комиссар"
                                subtitle="Профессиональная помощь при ДТП в Ростове-на-Дону. Выезд на место в течение 20 минут."
                              >
                            <div className="flex flex-col sm:flex-row gap-4">
                                      <a href="tel:+78633030000">
                                                  <Button variant="primary" size="lg">📞 Вызвать комиссара</Button>Button>
                                      </a>a>
                                      <Link href="/evacuation">
                                                  <Button variant="ghost" size="lg" className="border border-white/20 text-white hover:bg-white/10">
                                                                🆘 Нужен эвакуатор?
                                                  </Button>Button>
                                      </Link>Link>
                            </div>div>
                    </Hero>Hero>
              
                  {/* Services */}
                    <section className="py-16 px-4">
                            <div className="mx-auto max-w-5xl">
                                      <h2 className="font-unbounded text-2xl md:text-3xl font-bold mb-8">Что мы делаем</h2>h2>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          {SERVICES.map((s) => (
                                <div key={s.title} className="rounded-xl bg-surface p-6 shadow-md">
                                                <h3 className="text-lg font-bold mb-2">{s.title}</h3>h3>
                                                <p className="text-gray-600 text-sm">{s.desc}</p>p>
                                </div>div>
                              ))}
                                      </div>div>
                            </div>div>
                    </section>section>
              
                  {/* Form */}
                    <section className="py-16 px-4 bg-surface">
                            <div className="mx-auto max-w-lg">
                                      <h2 className="font-unbounded text-2xl font-bold mb-4 text-center">
                                                  📋 Оставить заявку
                                      </h2>h2>
                                      <p className="text-gray-600 mb-6 text-center">
                                                  Заполните форму — аварийный комиссар свяжется с вами в течение 5 минут.
                                      </p>p>
                                      <AccidentForm />
                            </div>div>
                    </section>section>
              
                  {/* CTA */}
                    <section className="py-16 px-4">
                            <div className="mx-auto max-w-2xl text-center">
                                      <h2 className="font-unbounded text-2xl font-bold mb-4">Попали в ДТП?</h2>h2>
                                      <p className="text-gray-600 mb-6">
                                                  Не паникуйте! Позвоните нам — аварийный комиссар приедет в течение 20 минут
                                                  и возьмёт все хлопоты на себя.
                                      </p>p>
                                      <a href="tel:+78633030000">
                                                  <Button variant="primary" size="lg">📞 Позвонить сейчас</Button>Button>
                                      </a>a>
                            </div>div>
                    </section>section>
              </>>
            );
}</>
