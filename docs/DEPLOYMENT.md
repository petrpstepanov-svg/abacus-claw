# Деплой AutoHub Rostov

## Требования

- Node.js >= 18
- PostgreSQL (рекомендуем Neon / Supabase / Railway)
- Аккаунт Vercel

## Переменные окружения

| Переменная | Описание | Обязательна |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `TELEGRAM_BOT_TOKEN` | Токен бота от @BotFather | ✅ |
| `TELEGRAM_CHAT_ID` | ID чата для уведомлений | ✅ |
| `SMS_AERO_EMAIL` | Email аккаунта SMS Aero | ✅ |
| `SMS_AERO_API_KEY` | API-ключ SMS Aero | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Публичный URL сайта | ✅ |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | ID счётчика Я.Метрики | ✅ |
| `ADMIN_PASSWORD` | Пароль для /admin | ✅ |

## Деплой на Vercel

### 1. Подключить репозиторий

```bash
# Установить Vercel CLI
npm i -g vercel

# Подключить проект
vercel link
```

Или через веб-интерфейс: vercel.com → Import Project → GitHub → `petrpstepanov-svg/abacus-claw`

### 2. Настроить переменные окружения

Settings → Environment Variables → добавить все переменные из таблицы выше.

### 3. Настроить БД

```bash
# Применить миграции
npx prisma migrate deploy

# (опционально) Заполнить тестовыми данными
npx prisma db seed
```

### 4. Деплой

```bash
vercel --prod
```

Или просто push в `main` — Vercel автоматически задеплоит.

### 5. Настроить домен

Settings → Domains → добавить `avtohub161.ru`.

Настроить DNS:
- A-запись: `76.76.21.21`
- CNAME: `cname.vercel-dns.com`

## После деплоя

### Проверка SEO
- Открыть `https://avtohub161.ru/sitemap.xml`
- Открыть `https://avtohub161.ru/robots.txt`
- Проверить JSON-LD (View Page Source)
- Проверить OG-метки (Facebook Debugger / VK)

### Проверка Метрики
- Открыть Яндекс.Метрику: счётчик должен показывать посещения
- Отправить тестовую форму — проверить цель в Метрике

### Проверка производительности
- Lighthouse Score: Performance > 90
- Core Web Vitals: LCP < 2.5s, CLS < 0.1

### Регистрация в поисковиках
1. **Яндекс Вебмастер**: https://webmaster.yandex.ru
2. **Google Search Console**: https://search.google.com/search-console
3. Отправить sitemap.xml в оба сервиса
