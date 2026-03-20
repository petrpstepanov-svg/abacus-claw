'use client';

import React from 'react';
import type { LeadType } from '@prisma/client';

interface LeadTypeBadgeProps {
  leadType: LeadType;
}

const BADGE_STYLES: Record<LeadType, string> = {
  EVACUATION: 'bg-red-100 text-red-800',
  SERVICE: 'bg-blue-100 text-blue-800',
  ACCIDENT: 'bg-orange-100 text-orange-800',
  CONTRACT: 'bg-purple-100 text-purple-800',
};

const BADGE_LABELS: Record<LeadType, string> = {
  EVACUATION: 'Эвакуатор',
  SERVICE: 'Автосервис',
  ACCIDENT: 'Комиссар',
  CONTRACT: 'Агрегаты',
};

function LeadTypeBadge({ leadType }: LeadTypeBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        BADGE_STYLES[leadType],
      ].join(' ')}
    >
      {BADGE_LABELS[leadType]}
    </span>
  );
}

export { LeadTypeBadge, BADGE_LABELS };
export type { LeadTypeBadgeProps };
