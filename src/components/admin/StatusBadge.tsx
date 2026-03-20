'use client';

import React from 'react';

interface StatusBadgeProps {
  telegramSent: boolean;
  smsSent: boolean;
}

function StatusBadge({ telegramSent, smsSent }: StatusBadgeProps) {
  const isProcessed = telegramSent && smsSent;
  const label = isProcessed ? 'Обработана' : 'В обработке';

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        isProcessed
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800',
      ].join(' ')}
    >
      {label}
    </span>
  );
}

export { StatusBadge };
export type { StatusBadgeProps };
