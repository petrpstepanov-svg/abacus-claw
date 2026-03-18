import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Политика конфиденциальности — АвтоХаб Ростов",
    description: "Политика конфиденциальности АвтоХаб Ростов.",
};

export default function PrivacyPolicyPage() {
    return (
          <main className="min-h-screen bg-background">
                <section className="bg-secondary text-white py-16 px-4">
                        <div className="max-w-4xl mx-auto">
                                  <Link href="/" className="text-accent hover:underline mb-6 inline-block">← На главную</Link>
                                  <h1 className="text-4xl font-bold mb-4">🔒 Политика конфиденциальности</h1>
                        </div>
                </section>
                <section className="py-16 px-4">
                        <div className="max-w-4xl mx-auto">
                                  <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
                                              <div>
                                                            <h2 className="text-2xl font-bold text-secondary mb-4">1. Общие положения</h2>
                                                            <p className="text-gray-600">Настоящая политика определяет порядок обработки и защиты персональных данных.</p>
                                              </div>
                                              <div>
                                                            <h2 className="text-2xl font-bold text-secondary mb-4">2. Сбор данных</h2>
                                                            <p className="text-gray-600">Мы собираем только необходимые данные: имя, номер телефона и описание проблемы.</p>
                                              </div>
                                              <div>
                                                            <h2 className="text-2xl font-bold text-secondary mb-4">3. Использование данных</h2>
                                                            <p className="text-gray-600">Ваши данные используются исключительно для связи с вами. Мы не передаём данные третьим лицам.</p>
                                              </div>
                                              <div>
                                                            <h2 className="text-2xl font-bold text-secondary mb-4">4. Контакты</h2>
                                                            <p className="text-gray-600">По вопросам: <a href="tel:+78634000000" className="text-primary hover:underline">+7-863-XXX-XX-XX</a></p>
                                              </div>
                                  </div>
                        </div>
                </section>
          </main>
        );
}
