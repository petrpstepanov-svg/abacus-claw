import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections';
import { buildOpenGraph } from '@/components/seo';
import { LazyYandexMap } from '@/components/lazy';
import { ContactForm } from './ContactForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avtohub161.ru';

export const metadata: Metadata = {
      title: 'Контакты — AutoHub Rostov',
      description: 'Контакты AutoHub Rostov. Адрес, телефон, режим работы.',
      alternates: {
              canonical: `${SITE_URL}/contacts`,
      },
      ...buildOpenGraph({
              title: 'Контакты AutoHub Rostov',
              description: 'Адрес, телефон, режим работы AutoHub Rostov.',
              url: `${SITE_URL}/contacts`,
      }),
};

export default function ContactsPage() {
      return (
              <>
                    <Hero title="Контакты" subtitle="Мы всегда на связи — звоните в любое время!" />
              
                    <section className="py-16 px-4">
                            <div className="mx-auto max-w-5xl">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                          {/* Contact Info */}
                                                  <div className="rounded-xl bg-surface p-8 shadow-lg space-y-5">
                                                                <h2 className="font-unbounded text-xl font-bold">Свяжитесь с нами</h2>h2>
                                                  
                                                                <div>
                                                                                <p className="font-semibold">Телефон</p>p>
                                                                                <a
                                                                                                      href="tel:+78633030000"
                                                                                                      className="text-primary hover:underline text-lg font-mono"
                                                                                                    >
                                                                                                  +7 (863) 303-XX-XX
                                                                                </a>a>
                                                                </div>div>
                                                  
                                                                <div>
                                                                                <p className="font-semibold">Email</p>p>
                                                                                <a
                                                                                                      href="mailto:info@autohub-rostov.ru"
                                                                                                      className="text-accent hover:underline"
                                                                                                    >
                                                                                                  info@autohub-rostov.ru
                                                                                </a>a>
                                                                </div>div>
                                                  
                                                                <div>
                                                                                <p className="font-semibold">Адрес</p>p>
                                                                                <p className="text-gray-600">г. Ростов-на-Дону</p>p>
                                                                </div>div>
                                                  
                                                                <div>
                                                                                <p className="font-semibold">Режим работы</p>p>
                                                                                <p className="text-gray-600">Круглосуточно, 24/7</p>p>
                                                                </div>div>
                                                  </div>div>
                                      
                                          {/* Services */}
                                                  <div className="rounded-xl bg-surface p-8 shadow-lg">
                                                                <h2 className="font-unbounded text-xl font-bold mb-4">Наши услуги</h2>h2>
                                                                <div className="space-y-3">
                                                                    {[
                  { href: '/evacuation', label: '🚗 Эвакуатор 24/7' },
                  { href: '/autoservice', label: '🛠️ Автосервис' },
                  { href: '/accident-commissioner', label: '📝 Аварийный комиссар' },
                  { href: '/contract-engines', label: '⚙️ Контрактные агрегаты' },
                                  ].map((l) => (
                                                        <Link
                                                                                key={l.href}
                                                                                href={l.href}
                                                                                className="block rounded-lg p-3 hover:bg-background transition-colors font-medium"
                                                                              >
                                                            {l.label}
                                                        </Link>Link>
                                                      ))}
                                                                </div>div>
                                                  </div>div>
                                      </div>div>
                            
                                {/* Contact Form */}
                                      <div className="mt-10">
                                                  <h2 className="font-unbounded text-xl font-bold mb-6 text-center">
                                                                ✉️ Напишите нам
                                                  </h2>h2>
                                                  <div className="mx-auto max-w-lg">
                                                                <ContactForm />
                                                  </div>div>
                                      </div>div>
                            
                                {/* Yandex Map (lazy loaded) */}
                                      <div className="mt-10">
                                                  <LazyYandexMap />
                                      </div>div>
                            </div>div>
                    </section>section>
              </>>
            );
}</>
