import { locales } from '@/config/locales'
import { MetadataRoute } from 'next'

const baseUrl = 'https://hosseinkhedmati.ir'

const routes = [
  { path: '', priority: 1, changeFrequency: 'monthly' as const },
  { path: '/skills', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/skills/experiences', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.path === '' ? route.priority : route.priority,
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