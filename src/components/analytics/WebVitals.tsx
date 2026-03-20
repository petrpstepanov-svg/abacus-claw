'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { reachGoal } from '@/lib/yandex-metrika';

/**
 * Компонент для отслеживания Core Web Vitals.
 * Отправляет метрики CLS, FID, LCP, FCP, TTFB в Яндекс.Метрику.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    const { name, value, rating } = metric;

    reachGoal('WEB_VITALS', {
      metric_name: name,
      metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_rating: rating,
    });
  });

  return null;
}
