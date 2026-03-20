/**
 * Утилиты для работы с Яндекс.Метрикой.
 * Отправка целей и хитов.
 */

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

function getMetrikaId(): number | null {
  if (typeof window === 'undefined') return null;
  const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!id || id === '12345678') return null;
  return Number(id);
}

/**
 * Отправка цели в Яндекс.Метрику.
 *
 * Цели:
 * - FORM_SUBMIT_SOS — экстренная заявка
 * - FORM_SUBMIT_APPOINTMENT — запись на услугу
 * - FORM_SUBMIT_CONTRACT — заявка на агрегаты
 * - PHONE_CLICK — клик по телефону
 * - TELEGRAM_CLICK — клик по Telegram
 */
export function reachGoal(target: string, params?: Record<string, unknown>): void {
  const id = getMetrikaId();
  if (!id || typeof window.ym !== 'function') return;

  try {
    if (params) {
      window.ym(id, 'reachGoal', target, params);
    } else {
      window.ym(id, 'reachGoal', target);
    }
  } catch {
    // Silently fail in case of Metrika errors
  }
}

/**
 * Отправка хита (pageview) в Яндекс.Метрику.
 */
export function hit(url: string, options?: Record<string, unknown>): void {
  const id = getMetrikaId();
  if (!id || typeof window.ym !== 'function') return;

  try {
    if (options) {
      window.ym(id, 'hit', url, options);
    } else {
      window.ym(id, 'hit', url);
    }
  } catch {
    // Silently fail
  }
}
