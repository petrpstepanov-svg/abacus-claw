# Prisma — AutoHub Rostov

## Структура

```
prisma/
├── schema.prisma        # Схема БД (модель Lead, enum LeadType)
├── seed.ts              # Тестовые данные (9 заявок)
├── migrations/
│   ├── 0_init/          # Начальная миграция
│   │   └── migration.sql
│   └── migration_lock.toml
└── README.md            # Этот файл
```

## Быстрый старт

### 1. Настройка переменных окружения

```bash
cp .env.example .env
# Отредактируйте .env — укажите реальные данные для подключения к PostgreSQL
```

### 2. Применение миграций

```bash
npx prisma migrate dev
```

### 3. Генерация Prisma Client

```bash
npx prisma generate
```

### 4. Заполнение тестовыми данными

```bash
npx prisma db seed
```

### 5. Просмотр данных (Prisma Studio)

```bash
npx prisma studio
```

## Модель Lead

| Поле           | Тип       | Описание                       |
|----------------|-----------|--------------------------------|
| id             | String    | CUID, первичный ключ           |
| name           | String    | Имя клиента                    |
| phone          | String    | Телефон (+7XXXXXXXXXX)         |
| email          | String?   | Email (опционально)            |
| comment        | String?   | Комментарий                    |
| leadType       | LeadType  | Тип заявки (enum)              |
| utm_source     | String?   | UTM Source                     |
| utm_medium     | String?   | UTM Medium                     |
| utm_campaign   | String?   | UTM Campaign                   |
| telegram_sent  | Boolean   | Отправлено в Telegram          |
| sms_sent       | Boolean   | Отправлена SMS                 |
| not_notified   | Boolean   | Не уведомлен                   |
| ip             | String?   | IP адрес клиента               |
| user_agent     | String?   | User-Agent браузера            |
| createdAt      | DateTime  | Дата создания                  |
| updatedAt      | DateTime  | Дата обновления                |

## LeadType (enum)

- `EVACUATION` — Эвакуатор
- `SERVICE` — Автосервис
- `ACCIDENT` — Аварийный комиссар
- `CONTRACT` — Контрактные агрегаты
