/* ─── GET /api/admin/leads ─── */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { AdminLeadsResponse } from '@/types/api';
import type { Prisma } from '@prisma/client';

/** Parse a positive integer from a query param, or return the default. */
function parseIntParam(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const page = parseIntParam(searchParams.get('page'), 1);
    const limit = parseIntParam(searchParams.get('limit'), 20);
    const leadType = searchParams.get('leadType');
    const dateFilter = searchParams.get('dateFilter') ?? 'all';
    const notificationStatus = searchParams.get('notificationStatus') ?? 'all';

    // Build where clause
    const where: Prisma.LeadWhereInput = {};

    // Filter by leadType
    if (leadType && ['EVACUATION', 'SERVICE', 'ACCIDENT', 'CONTRACT'].includes(leadType)) {
      where.leadType = leadType as Prisma.EnumLeadTypeFilter;
    }

    // Filter by date
    if (dateFilter !== 'all') {
      const now = new Date();
      let dateFrom: Date;

      switch (dateFilter) {
        case 'today':
          dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          dateFrom = new Date(0);
      }

      where.createdAt = { gte: dateFrom };
    }

    // Filter by notification status
    if (notificationStatus === 'sent') {
      where.telegram_sent = true;
      where.sms_sent = true;
    } else if (notificationStatus === 'not_sent') {
      where.OR = [
        { telegram_sent: false },
        { sms_sent: false },
      ];
    }

    // Count total
    const total = await prisma.lead.count({ where });
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const skip = (page - 1) * limit;

    // Fetch leads
    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    // Serialize dates to ISO strings
    const serializedLeads = leads.map((lead) => ({
      ...lead,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
    }));

    const response: AdminLeadsResponse = {
      success: true,
      leads: serializedLeads,
      total,
      page,
      totalPages,
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Admin Leads] Error:', message);

    const response: AdminLeadsResponse = {
      success: false,
      error: 'Внутренняя ошибка сервера',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
