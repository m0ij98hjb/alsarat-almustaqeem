import { locales, defaultLocale } from '@/i18n/config'

export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://alsarat-almustaqeem.tech').replace(/\/$/, '')

/**
 * Builds canonical + hreflang alternates for a page given its locale and
 * locale-agnostic path (no leading slash, e.g. 'quran' or `prophets/${id}`).
 */
export function buildAlternates(locale: string, path = '') {
  const suffix = path ? `/${path}` : ''
  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}${suffix}`
  }
  languages['x-default'] = `${SITE_URL}/${defaultLocale}${suffix}`

  return {
    canonical: `${SITE_URL}/${locale}${suffix}`,
    languages,
  }
}

export function absoluteUrl(path = ''): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
