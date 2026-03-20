'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { StatusBadge } from './StatusBadge';
import { LeadTypeBadge } from './LeadTypeBadge';
import type { AdminLead } from '@/types/api';

interface LeadsTableProps {
  leads: AdminLead[];
  onResend: (id: string) => void;
  resendingId: string | null;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function LeadsTable({ leads, onResend, resendingId }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
        Заявки не найдены
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600">ID</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Имя</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Телефон</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Тип</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Статус</th>
            <th className="px-4 py-3 text-center font-medium text-gray-600">TG</th>
            <th className="px-4 py-3 text-center font-medium text-gray-600">SMS</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Дата</th>
            <th className="px-4 py-3 text-center font-medium text-gray-600">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-500">
                {lead.id.slice(0, 8)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-secondary">
                {lead.name}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-secondary">
                {lead.phone}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <LeadTypeBadge leadType={lead.leadType} />
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <StatusBadge
                  telegramSent={lead.telegram_sent}
                  smsSent={lead.sms_sent}
                />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-center">
                {lead.telegram_sent ? '✅' : '❌'}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-center">
                {lead.sms_sent ? '✅' : '❌'}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                {formatDate(lead.createdAt)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  loading={resendingId === lead.id}
                  onClick={() => onResend(lead.id)}
                >
                  Переотправить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { LeadsTable };
export type { LeadsTableProps };
