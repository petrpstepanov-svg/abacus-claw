/* ─── PATCH /api/admin/leads/[id] ─── */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramNotification } from '@/lib/telegram';
import { sendSmsConfirmation } from '@/lib/sms';
import type { AdminResendResponse, AdminResendRequest } from '@/types/api';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Parse body
    const body: AdminResendRequest = await request.json() as AdminResendRequest;

    if (body.action !== 'resend') {
      const errorResponse: AdminResendResponse = {
        success: false,
        error: 'Неизвестное действие',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Find lead
    const lead = await prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      const errorResponse: AdminResendResponse = {
        success: false,
        error: 'Заявка не найдена',
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    // Resend notifications
    const telegramResult = await sendTelegramNotification({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      comment: lead.comment,
      leadType: lead.leadType,
      utm_source: lead.utm_source,
      utm_medium: lead.utm_medium,
      utm_campaign: lead.utm_campaign,
    });

    const smsResult = await sendSmsConfirmation(lead.phone, lead.leadType);

    // Update flags
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        telegram_sent: telegramResult,
        sms_sent: smsResult,
        not_notified: !telegramResult || !smsResult,
      },
    });

    const response: AdminResendResponse = {
      success: true,
      lead: {
        ...updatedLead,
        createdAt: updatedLead.createdAt.toISOString(),
        updatedAt: updatedLead.updatedAt.toISOString(),
      },
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Admin Resend] Error:', message);

    const errorResponse: AdminResendResponse = {
      success: false,
      error: 'Ошибка при переотправке уведомлений',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
