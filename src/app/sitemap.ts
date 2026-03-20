import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avtohub161.ru'

interface SitemapEntry {
  path: string
  priority: number
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

const PAGES: SitemapEntry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/evacuation', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/autoservice', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/accident-commissioner', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contract-engines', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contacts', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return PAGES.map((page) => ({
    url: `${SITE_URL}${page.path === '/' ? '' : page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
