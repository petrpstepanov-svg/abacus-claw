# API Documentation — AutoHub Rostov

## POST /api/leads

Создание новой заявки (лида).

### Request Body

```json
{
  "name": "string (required, 2–100 символов)",
  "phone": "string (required, формат +7XXXXXXXXXX)",
  "email": "string (optional, валидный email)",
  "comment": "string (optional, до 1000 символов)",
  "leadType": "EVACUATION | SERVICE | ACCIDENT | CONTRACT (required)",
  "service": "string (optional, для SERVICE)",
  "date": "string (optional, для SERVICE)",
  "location": "string (optional, до 500 символов, для EVACUATION)",
  "consent": "true (required, должно быть true)",
  "utm_source": "string (optional)",
  "utm_medium": "string (optional)",
  "utm_campaign": "string (optional)"
}
```

### Responses

| Status | Body | Описание |
|--------|------|----------|
| 200 | `{ "success": true, "leadId": "cuid" }` | Заявка создана |
| 400 | `{ "success": false, "error": "сообщение" }` | Ошибка валидации |
| 429 | `{ "success": false, "error": "сообщение" }` | Rate limit (5 запросов/15 мин) |
| 500 | `{ "success": false, "error": "сообщение" }` | Ошибка сервера |

### Логика обработки

1. Rate limiting по IP (5 запросов в 15 минут)
2. Валидация через Zod
3. Сохранение в PostgreSQL через Prisma
4. Отправка уведомления в Telegram
5. Отправка SMS-подтверждения клиенту
6. Обновление флагов уведомлений в БД

### Захват метаданных

- IP: `x-forwarded-for` или `x-real-ip`
- User-Agent: `user-agent` header
- UTM-метки: из body запроса (клиент извлекает из URL)

### Dev Mode

В режиме разработки (placeholder токены):
- Telegram: пропускает отправку, возвращает true
- SMS: пропускает отправку, возвращает true
