import dynamic from 'next/dynamic';

/**
 * Lazy-loaded Yandex Map компонент.
 * Используется на странице /contacts.
 * ssr: false — карта работает только на клиенте.
 */
export const LazyYandexMap = dynamic(
  () => import('../map/YandexMapEmbed').then((mod) => mod.YandexMapEmbed),
  {
    loading: () => (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-xl text-gray-500">
        Загрузка карты...
      </div>
    ),
    ssr: false,
  }
);
