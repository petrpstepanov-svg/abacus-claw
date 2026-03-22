/* ─── SMS Aero Integration ─── */

import type { LeadType } from '@prisma/client';

const SMS_TEXTS: Record<LeadType, string> = {
    EVACUATION: 'AutoHub: Ваша заявка на эвакуатор принята. Ожидайте звонка.',
    SERVICE: 'AutoHub: Запись в автосервис подтверждена. Ожидайте звонка.',
    ACCIDENT: 'AutoHub: Заявка на аварийного комиссара принята.',
    CONTRACT: 'AutoHub: Заявка на подбор агрегатов принята.',
};

/**
 * Send an SMS confirmation to the client via SMS Aero.
 * Returns true on success, false on failure.
 * In dev mode (placeholder API key), skips sending and returns true.
 */
async function sendSmsConfirmation(
    phone: string,
    leadType: LeadType,
  ): Promise<boolean> {
    const email = process.env.SMS_AERO_EMAIL ?? '';
    const apiKey = process.env.SMS_AERO_API_KEY ?? '';

  // Dev mode — skip if placeholder credentials
  if (!email || !apiKey || apiKey === 'your_api_key_here') {
        console.log('[SMS] Dev mode — skipping SMS send');
        return true;
  }

  const text = SMS_TEXTS[leadType];
    // SMS Aero expects phone without '+'
  const cleanPhone = phone.replace('+', '');

  const url = `https://gate.smsaero.ru/v2/sms/send`;
    const auth = Buffer.from(`${email}:${apiKey}`).toString('base64');

  try {
        const res = await fetch(url, {
                method: 'POST',
                headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Basic ${auth}`,
                },
                body: JSON.stringify({
                          number: cleanPhone,
                          text,
                          sign: 'SMS Aero',
                          channel: 'DIRECT',
                }),
        });

      if (!res.ok) {
              const body = await res.text();
              console.error(`[SMS] API error ${res.status}: ${body}`);
              return false;
      }

      interface SmsAeroResponse {
              success: boolean;
              message?: string;
      }

      const data: SmsAeroResponse = await res.json() as SmsAeroResponse;
        if (!data.success) {
                console.error(`[SMS] Sending failed: ${data.message ?? 'unknown error'}`);
                return false;
        }

      return true;
  } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[SMS] Network error: ${message}`);
        return false;
  }
}

export { sendSmsConfirmation };
