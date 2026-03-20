/**
 * Компонент встраивания Яндекс.Карт.
 * Используется через lazy loading для оптимизации.
 */
export function YandexMapEmbed() {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Arostov&amp;source=constructor"
        width="100%"
        height="400"
        frameBorder="0"
        title="Карта AutoHub Rostov"
        className="w-full"
        loading="lazy"
      />
    </div>
  );
}
