import { locales } from '@/config/locales'
import { MetadataRoute } from 'next'

const baseUrl = 'https://hosseinkhedmati.ir'

const routes = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/skills', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/skills/experiences', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/projects', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const lastModified = new Date()

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${route.path}`])
          ),
        },
      })
    }
  }

  return entries
}