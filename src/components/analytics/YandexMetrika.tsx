'use client';

import Script from 'next/script';

interface YandexMetrikaProps {
  id: string;
}

/**
 * Компонент инициализации счётчика Яндекс.Метрики.
 * Добавляется в layout.tsx внутри body.
 */
export function YandexMetrika({ id }: YandexMetrikaProps) {
  if (!id || id === '12345678') {
    return null;
  }

  const counterUrl = `https://mc.yandex.ru/watch/${id}`;

  return (
    <>
      <Script
        id="yandex-metrika-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");

            ym(${id}, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              trackHash: true
            });
          `,
        }}
      />
      <noscript>
        <div>
          <img
            src={counterUrl}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
            width={1}
            height={1}
          />
        </div>
      </noscript>
    </>
  );
}
