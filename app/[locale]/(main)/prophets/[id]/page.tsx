import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROPHETS } from '@/data/prophets'
import { buildAlternates, absoluteUrl } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params
  const prophet = PROPHETS.find((p) => p.id === parseInt(id))
  if (!prophet) return {}
  return {
    title: prophet.nameAr,
    description: prophet.summary,
    alternates: buildAlternates(locale, `prophets/${id}`),
  }
}

export default async function ProphetDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const t = await getTranslations({ locale, namespace: 'prophets' })
  const tm = await getTranslations({ locale, namespace: 'meta' })
  const prophetId = parseInt(id)
  const prophet = PROPHETS.find((p) => p.id === prophetId)

  if (!prophet) notFound()

  const prevProphet = PROPHETS.find((p) => p.id === prophetId - 1)
  const nextProphet = PROPHETS.find((p) => p.id === prophetId + 1)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${t('storyTitle')}: ${prophet.nameAr}`,
    description: prophet.summary,
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(`/${locale}/prophets/${prophet.id}`),
    author: { '@type': 'Organization', name: tm('siteName') },
    publisher: { '@type': 'Organization', name: tm('siteName') },
  }

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">{prophet.icon}</div>
          <h1 className="font-arabic text-white text-4xl md:text-5xl font-bold mb-3">{prophet.nameAr}</h1>
          <p className="text-gold-300">📍 {prophet.nation} — {prophet.period}</p>
          <span className="inline-block mt-3 text-xs bg-white/10 text-gold-200 px-3 py-1 rounded-full">
            {prophet.quranMentions}{t('inQuran')}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href={`/${locale}/prophets`} className="inline-flex items-center gap-2 text-sm text-gold-600 dark:text-gold-400 hover:underline mb-8">
          {t('backToList')}
        </Link>

        <div className="card-islamic p-8 md:p-10 mb-8">
          <h2 className="font-arabic text-2xl font-bold text-islamic-green dark:text-gold-300 mb-6">{t('storyTitle')}</h2>
          <div className="space-y-4">
            {prophet.story.map((paragraph, i) => (
              <p key={i} className="text-gray-700 dark:text-gray-300 leading-loose">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="card-islamic p-8 md:p-10 mb-8">
          <h2 className="font-arabic text-2xl font-bold text-islamic-green dark:text-gold-300 mb-4">{t('lessonsTitle')}</h2>
          <ul className="space-y-3">
            {prophet.lessons.map((lesson, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-gold-500 mt-1">✦</span>
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-islamic p-8 md:p-10 mb-8">
          <h2 className="font-arabic text-2xl font-bold text-islamic-green dark:text-gold-300 mb-4">{t('referencesTitle')}</h2>
          <div className="flex flex-wrap gap-2">
            {prophet.refs.map((ref, i) => (
              <span key={i} className="text-sm bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 px-3 py-1.5 rounded-full">
                {ref}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {prevProphet ? (
            <Link href={`/${locale}/prophets/${prevProphet.id}`} className="btn-outline-gold text-sm px-5 py-2">
              → {prevProphet.nameAr}
            </Link>
          ) : <span />}
          {nextProphet ? (
            <Link href={`/${locale}/prophets/${nextProphet.id}`} className="btn-outline-gold text-sm px-5 py-2">
              {nextProphet.nameAr} ←
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  )
}
