# AutoHub Rostov — MVP

Эвакуатор 24/7, автосервис, аварийный комиссар и контрактные агрегаты в Ростове-на-Дону.

## Технологии

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **БД**: PostgreSQL (Neon / Supabase / Railway)
- **Интеграции**: Telegram Bot API, SMS Aero
- **Аналитика**: Яндекс.Метрика, Core Web Vitals
- **Деплой**: Vercel

## Страницы

| Страница | URL | Описание |
|---|---|---|
| Главная | `/` | Лендинг с услугами |
| Эвакуатор | `/evacuation` | SOS-форма |
| Автосервис | `/autoservice` | Запись на сервис |
| Комиссар | `/accident-commissioner` | Помощь при ДТП |
| Агрегаты | `/contract-engines` | Заявка на агрегат |
| Контакты | `/contacts` | Контакты + карта |
| Политика | `/privacy-policy` | ФЗ-152 |
| Админ | `/admin` | Панель управления |

## API

| Метод | URL | Описание |
|---|---|---|
| POST | `/api/leads` | Создание заявки |
| GET | `/api/admin/leads` | Список заявок |
| PATCH | `/api/admin/leads/[id]` | Переотправка уведомлений |

## SEO

- **sitemap.xml**: автогенерация через `src/app/sitemap.ts`
- **robots.txt**: автогенерация через `src/app/robots.ts`
- **JSON-LD**: Schema.org LocalBusiness на главной
- **OpenGraph**: метатеги на всех страницах
- **Canonical URLs**: на всех страницах

## Аналитика

- **Яндекс.Метрика**: счётчик + цели
  - `FORM_SUBMIT_SOS` — отправка SOS-формы
  - `FORM_SUBMIT_APPOINTMENT` — запись на сервис
  - `FORM_SUBMIT_CONTRACT` — заявка на агрегат
  - `PHONE_CLICK` — клик по телефону
- **Core Web Vitals**: CLS, FID, LCP, FCP, TTFB

## Быстрый старт

```bash
# Клонировать
git clone https://github.com/petrpstepanov-svg/abacus-claw.git
cd abacus-claw

# Установить зависимости
npm install

# Настроить окружение
cp .env.example .env
# Заполнить .env реальными значениями

# Миграции БД
npx prisma migrate deploy

# Запустить dev-сервер
npm run dev
```

## Документация

- [Деплой](./docs/DEPLOYMENT.md)
- [Производительность](./docs/PERFORMANCE.md)
- [API](./src/app/api/README.md)
- [Админ-панель](./src/app/admin/README.md)
- [База данных](./prisma/README.md)
