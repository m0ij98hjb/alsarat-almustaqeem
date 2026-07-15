import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const locales = ['ar', 'en', 'zh', 'es', 'fr', 'de', 'tr', 'ur', 'ru']

  const routes = [
    '',
    '/live',
    '/scholars',
    '/kids',
    '/hadith',
    '/quran',
    '/adhkar',
    '/ai',
    '/search',
    '/islamic-videos',
  ]

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )
}
