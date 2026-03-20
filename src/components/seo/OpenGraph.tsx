import type { Metadata } from 'next'

interface OpenGraphProps {
  title: string
  description: string
  image?: string
  url: string
  type?: 'website' | 'article'
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avtohub161.ru'
const DEFAULT_IMAGE = `${SITE_URL}/logo-placeholder.svg`

/**
 * Генерирует metadata объект с OpenGraph и Twitter метатегами.
 * Используется в metadata export на каждой странице.
 */
export function buildOpenGraph(props: OpenGraphProps): Pick<Metadata, 'openGraph' | 'twitter'> {
  const { title, description, url, type = 'website' } = props
  const image = props.image || DEFAULT_IMAGE

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: 'AutoHub Rostov',
      locale: 'ru_RU',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
