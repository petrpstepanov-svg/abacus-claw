/* ─── POST /api/leads ─── */

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { leadApiSchema } from '@/schemas/lead.schema';
import { prisma } from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rateLimit';
import { sendTelegramNotification } from '@/lib/telegram';
import { sendSmsConfirmation } from '@/lib/sms';
import type { LeadCreateResponse } from '@/types/api';

/**
 * Extract the client IP from request headers.
 */
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<LeadCreateResponse>> {
  try {
    /* ── 1. Rate limiting ── */
    const ip = getClientIp(req);
    const allowed = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: 'Слишком много запросов. Попробуйте позже.' },
        { status: 429 },
      );
    }

    /* ── 2. Parse & validate body ── */
    const body: unknown = await req.json();
    const data = leadApiSchema.parse(body);

    /* ── 3. Capture metadata ── */
    const userAgent = req.headers.get('user-agent') ?? undefined;

    /* ── 4. Save to database ── */
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        comment: data.comment,
        leadType: data.leadType,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        ip,
        user_agent: userAgent,
      },
    });

    /* ── 5. Send notifications (non-blocking) ── */
    const telegramOk = await sendTelegramNotification({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      comment: lead.comment,
      leadType: lead.leadType,
      utm_source: lead.utm_source,
      utm_medium: lead.utm_medium,
      utm_campaign: lead.utm_campaign,
    });

    const smsOk = await sendSmsConfirmation(lead.phone, lead.leadType);

    /* ── 6. Update notification flags ── */
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        telegram_sent: telegramOk,
        sms_sent: smsOk,
        not_notified: !telegramOk && !smsOk,
      },
    });

    console.log(
      `[Lead] Created ${lead.id} (${lead.leadType}) — TG:${telegramOk} SMS:${smsOk}`,
    );

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 200 });
  } catch (err: unknown) {
    /* ── Validation errors ── */
    if (err instanceof ZodError) {
      const firstIssue = err.issues[0];
      const message = firstIssue?.message ?? 'Ошибка валидации';
      return NextResponse.json(
        { success: false, error: message },
        { status: 400 },
      );
    }

    /* ── Unexpected errors ── */
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[Lead] Unexpected error: ${message}`);
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 },
    );
  }
}
