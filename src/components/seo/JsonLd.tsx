interface JsonLdProps {
  type: 'LocalBusiness' | 'Organization'
  data: Record<string, unknown>
}

export function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 0) }}
    />
  )
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avtohub161.ru'

export const LOCAL_BUSINESS_DATA: Record<string, unknown> = {
  name: 'AutoHub Rostov',
  description: 'Круглосуточная эвакуация и автосервис в Ростове-на-Дону',
  url: SITE_URL,
  telephone: '+7 (863) 303-XX-XX',
  email: 'info@autohub-rostov.ru',
  image: `${SITE_URL}/logo-placeholder.svg`,
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday', 'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ростов-на-Дону',
    addressRegion: 'Ростовская область',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.2357,
    longitude: 39.7015,
  },
  sameAs: [],
}
