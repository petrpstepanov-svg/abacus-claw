import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — AutoHub Rostov',
  description: 'Политика обработки персональных данных AutoHub Rostov в соответствии с ФЗ-152.',
};

const SECTIONS = [
  {
    title: '1. Общие положения',
    text: 'Настоящая Политика определяет порядок обработки и защиты персональных данных пользователей сайта AutoHub Rostov (autohub-rostov.ru) в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».',
  },
  {
    title: '2. Собираемые данные',
    text: 'Мы собираем только необходимые персональные данные: имя, номер телефона, описание проблемы/запроса и адрес местонахождения (при вызове эвакуатора). Данные собираются исключительно с согласия пользователя.',
  },
  {
    title: '3. Цели обработки',
    text: 'Ваши данные используются исключительно для связи с вами, оказания запрошенных услуг и улучшения качества сервиса. Мы не передаём данные третьим лицам без вашего согласия.',
  },
  {
    title: '4. Защита данных',
    text: 'Мы применяем организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.',
  },
  {
    title: '5. Права пользователя',
    text: 'Вы имеете право запросить информацию о своих персональных данных, потребовать их исправления, блокировки или удаления. Для этого свяжитесь с нами по телефону или email. Вы также можете отозвать согласие на обработку персональных данных в любой момент.',
  },
  {
    title: '6. Контакты',
    text: 'По вопросам обработки персональных данных свяжитесь с нами: телефон +7 (863) 303-XX-XX, email: info@autohub-rostov.ru.',
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-secondary text-white py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-unbounded text-3xl md:text-4xl font-bold">
            🔒 Политика конфиденциальности
          </h1>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl bg-surface p-8 shadow-lg space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-unbounded text-xl font-bold mb-3">{s.title}</h2>
                <p className="text-gray-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
