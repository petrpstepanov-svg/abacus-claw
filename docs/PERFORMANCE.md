# Оптимизация производительности AutoHub Rostov

## Чеклист оптимизации

### Изображения
- [x] Использование `next/image` вместо `<img>`
- [x] Указаны `width` и `height` для всех изображений
- [x] `priority` для hero-изображений (логотип в Header)
- [x] `loading="lazy"` для изображений ниже fold
- [x] `alt` для всех изображений

### Шрифты
- [x] `font-display: swap` во всех `@font-face`
- [x] Локальные шрифты (woff2, не CDN)
- [x] `preload` для критичных шрифтов (Unbounded-700, Manrope-400)
- [x] Unicode range subsetting (кириллица + латиница)

### Lazy Loading
- [x] Яндекс.Карты на /contacts (через `next/dynamic` с `ssr: false`)
- [x] Яндекс.Метрика (`afterInteractive` strategy)

### CSS
- [x] Tailwind purge настроен корректно (`content` в tailwind.config.ts)
- [x] Неиспользуемые стили удаляются автоматически при сборке

### Core Web Vitals
- [x] Отслеживание CLS, FID, LCP, FCP, TTFB
- [x] Отправка метрик в Яндекс.Метрику
- [x] `WebVitals` компонент в layout.tsx

---

## Рекомендации по изображениям

1. Используйте `next/image` для всех изображений
2. Формат: WebP/AVIF (автоматически через next/image)
3. Указывайте `sizes` для адаптивных изображений
4. Hero-изображения: `priority={true}`
5. Остальные: `loading="lazy"` (по умолчанию в next/image)

## Рекомендации по шрифтам

1. Все шрифты загружаются локально из `/public/fonts/`
2. `font-display: swap` для предотвращения FOIT
3. Unicode Range Subsetting для минимизации размера
4. Preload для критичных шрифтов в `<head>`

## Мониторинг Core Web Vitals

### Метрики
| Метрика | Хорошо | Требует улучшения | Плохо |
|---|---|---|---|
| LCP | < 2.5с | 2.5с - 4с | > 4с |
| FID | < 100мс | 100мс - 300мс | > 300мс |
| CLS | < 0.1 | 0.1 - 0.25 | > 0.25 |
| FCP | < 1.8с | 1.8с - 3с | > 3с |
| TTFB | < 800мс | 800мс - 1800мс | > 1800мс |

### Отслеживание
- Метрики отправляются в Яндекс.Метрику через `WebVitals` компонент
- Цель `WEB_VITALS` с параметрами: metric_name, metric_value, metric_rating

## Инструменты для проверки

1. **Lighthouse** — встроен в Chrome DevTools
   - Performance: цель > 90
   - SEO: цель > 95
   - Accessibility: цель > 90
   - Best Practices: цель > 90

2. **PageSpeed Insights** — https://pagespeed.web.dev
   - Проверка мобильной и десктопной версии

3. **Google Search Console** — https://search.google.com/search-console
   - Core Web Vitals репорт

4. **Yandex Webmaster** — https://webmaster.yandex.ru
   - Проверка индексации

5. **Яндекс.Метрика** — https://metrika.yandex.ru
   - Вебвизор, карта кликов, цели
