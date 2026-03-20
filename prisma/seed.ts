import { PrismaClient, LeadType } from '@prisma/client'

const prisma = new PrismaClient()

const SEED_LEADS = [
  // ── EVACUATION (эвакуатор) ──
  {
    name: 'Иван Петров',
    phone: '+79185551001',
    email: 'ivan.petrov@mail.ru',
    comment: 'Сломался двигатель на трассе М4, нужен эвакуатор срочно',
    leadType: LeadType.EVACUATION,
    utm_source: 'yandex',
    utm_medium: 'cpc',
    utm_campaign: 'evacuation_rostov',
    telegram_sent: true,
    sms_sent: true,
    not_notified: false,
    ip: '95.67.12.34',
    user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) AppleWebKit/605.1.15',
  },
  {
    name: 'Мария Сидорова',
    phone: '+79281234567',
    comment: 'Авто не заводится, район Левенцовка',
    leadType: LeadType.EVACUATION,
    utm_source: 'google',
    utm_medium: 'organic',
    telegram_sent: true,
    sms_sent: false,
    not_notified: false,
    ip: '178.44.56.78',
    user_agent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36',
  },
  {
    name: 'Алексей Кузнецов',
    phone: '+79034445566',
    comment: 'Пробил колесо, нужна эвакуация с Ворошиловского',
    leadType: LeadType.EVACUATION,
    telegram_sent: false,
    sms_sent: false,
    not_notified: true,
    ip: '212.109.88.12',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0',
  },

  // ── SERVICE (автосервис) ──
  {
    name: 'Дмитрий Волков',
    phone: '+79187776655',
    email: 'volkov.d@yandex.ru',
    comment: 'Замена тормозных колодок на Kia Rio',
    leadType: LeadType.SERVICE,
    utm_source: '2gis',
    utm_medium: 'referral',
    utm_campaign: 'service_brakes',
    telegram_sent: true,
    sms_sent: true,
    not_notified: false,
    ip: '46.39.100.55',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) Safari/605.1.15',
  },
  {
    name: 'Ольга Новикова',
    phone: '+79283334455',
    comment: 'Плановое ТО Hyundai Solaris, 60 000 км',
    leadType: LeadType.SERVICE,
    utm_source: 'yandex',
    utm_medium: 'maps',
    telegram_sent: false,
    sms_sent: false,
    not_notified: true,
    ip: '188.170.45.90',
    user_agent: 'Mozilla/5.0 (X11; Linux x86_64) Firefox/121.0',
  },

  // ── ACCIDENT (аварийный комиссар) ──
  {
    name: 'Сергей Морозов',
    phone: '+79615559988',
    email: 'morozov.s@gmail.com',
    comment: 'ДТП на пересечении Большой Садовой и Ворошиловского',
    leadType: LeadType.ACCIDENT,
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'accident_commissioner',
    telegram_sent: true,
    sms_sent: true,
    not_notified: false,
    ip: '109.252.73.44',
    user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6) AppleWebKit/605.1.15',
  },
  {
    name: 'Наталья Козлова',
    phone: '+79887772211',
    comment: 'Нужен аварийный комиссар, столкновение на парковке ТРЦ',
    leadType: LeadType.ACCIDENT,
    telegram_sent: true,
    sms_sent: false,
    not_notified: false,
    ip: '5.228.155.67',
    user_agent: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) Chrome/119.0',
  },

  // ── CONTRACT (контрактные агрегаты) ──
  {
    name: 'Виктор Лебедев',
    phone: '+79281112233',
    email: 'lebedev.v@mail.ru',
    comment: 'Ищу контрактный двигатель 1NZ-FE для Toyota Corolla 2008',
    leadType: LeadType.CONTRACT,
    utm_source: 'avito',
    utm_medium: 'referral',
    telegram_sent: true,
    sms_sent: true,
    not_notified: false,
    ip: '77.234.12.99',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/120.0',
  },
  {
    name: 'Андрей Соколов',
    phone: '+79049998877',
    comment: 'Нужна АКПП для Nissan Qashqai J10, 2012 год',
    leadType: LeadType.CONTRACT,
    utm_source: 'yandex',
    utm_medium: 'organic',
    utm_campaign: 'contract_engines',
    telegram_sent: false,
    sms_sent: false,
    not_notified: true,
    ip: '83.149.22.10',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) Chrome/120.0',
  },
] as const

async function main() {
  console.log('🌱 Seeding database...')

  // Очистка существующих данных
  const deleted = await prisma.lead.deleteMany()
  console.log(`🗑️  Deleted ${deleted.count} existing leads`)

  // Создание тестовых заявок
  for (const lead of SEED_LEADS) {
    const created = await prisma.lead.create({ data: { ...lead } })
    console.log(`✅ Created lead: ${created.name} (${created.leadType})`)
  }

  const total = await prisma.lead.count()
  console.log(`\n🎉 Seeding complete! Total leads: ${total}`)
}

main()
  .catch((e: Error) => {
    console.error('❌ Seed error:', e.message)
    process.exit(1)
  })
  .finally(() => {
    void prisma.$disconnect()
  })
