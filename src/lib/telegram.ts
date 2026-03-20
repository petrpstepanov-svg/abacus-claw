/* ─── Telegram Bot Integration ─── */

import type { LeadType } from '@prisma/client';

interface TelegramLead {
  name: string;
  phone: string;
  email?: string | null;
  comment?: string | null;
  leadType: LeadType;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
}

const LEAD_TYPE_HEADERS: Record<LeadType, string> = {
  EVACUATION: '🚨 СРОЧНО! Заявка на эвакуатор',
  SERVICE: '🔧 Новая запись в автосервис',
  ACCIDENT: '📋 Заявка на аварийного комиссара',
  CONTRACT: '⚙️ Заявка на контрактные агрегаты',
};

const LEAD_TYPE_LABELS: Record<LeadType, string> = {
  EVACUATION: 'Эвакуатор',
  SERVICE: 'Автосервис',
  ACCIDENT: 'Аварийный комиссар',
  CONTRACT: 'Контрактные агрегаты',
};

/**
 * Format a lead into a Telegram message.
 */
function formatMessage(lead: TelegramLead): string {
  const lines: string[] = [
    `<b>${LEAD_TYPE_HEADERS[lead.leadType]}</b>`,
    '',
    `👤 <b>Имя:</b> ${lead.name}`,
    `📞 <b>Телефон:</b> ${lead.phone}`,
  ];

  if (lead.email) {
    lines.push(`📧 <b>Email:</b> ${lead.email}`);
  }
  if (lead.comment) {
    lines.push(`💬 <b>Комментарий:</b> ${lead.comment}`);
  }

  lines.push('');
  lines.push(`📌 <b>Тип:</b> ${LEAD_TYPE_LABELS[lead.leadType]}`);

  const hasUtm = lead.utm_source || lead.utm_medium || lead.utm_campaign;
  if (hasUtm) {
    lines.push('');
    lines.push('📊 <b>UTM:</b>');
    if (lead.utm_source) lines.push(`  source: ${lead.utm_source}`);
    if (lead.utm_medium) lines.push(`  medium: ${lead.utm_medium}`);
    if (lead.utm_campaign) lines.push(`  campaign: ${lead.utm_campaign}`);
  }

  return lines.join('\n');
}

/**
 * Send a lead notification to the Telegram chat.
 * Returns true on success, false on failure.
 * In dev mode (placeholder token), skips sending and returns true.
 */
async function sendTelegramNotification(lead: TelegramLead): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN ?? '';
  const chatId = process.env.TELEGRAM_CHAT_ID ?? '';

  // Dev mode — skip if placeholder tokens
  if (!token || !chatId || token === 'your_bot_token_here') {
    console.log('[Telegram] Dev mode — skipping notification');
    return true;
  }

  const text = formatMessage(lead);
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Telegram] API error ${res.status}: ${body}`);
      return false;
    }

    return true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[Telegram] Network error: ${message}`);
    return false;
  }
}

export { sendTelegramNotification };
export type { TelegramLead };
