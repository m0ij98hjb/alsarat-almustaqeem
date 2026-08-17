import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import QuranList from './QuranList'
import { fallbackSurahs } from './fallback-data'
import { SURAH_QURAN_HOME_URL, SURAH_QURAN_REFERENCE_URL } from '@/constants/externalLinks'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'quran' })
  return { title: t('title'), description: t('subtitle'), alternates: buildAlternates(locale, 'quran') }
}

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

async function fetchSurahs(): Promise<Surah[]> {
  try {
    const res = await fetch('https://api.alquran.cloud/v1/surah', { next: { revalidate: 86400 } })
    const data = await res.json()
    if (data.code === 200) return data.data as Surah[]
  } catch {}
  return fallbackSurahs as Surah[]
}

export default async function QuranPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'quran' })
  const surahs = await fetchSurahs()

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-gold-300">{t('subtitle')}</p>
          <div className="mt-6 flex items-center justify-center gap-8 text-center">
            <div><div className="text-gold-300 text-2xl font-bold">114</div><div className="text-gray-400 text-sm">{t('surahsLabel')}</div></div>
            <div><div className="text-gold-300 text-2xl font-bold">6,236</div><div className="text-gray-400 text-sm">{t('versesLabel')}</div></div>
            <div><div className="text-gold-300 text-2xl font-bold">30</div><div className="text-gray-400 text-sm">{t('ajzaLabel')}</div></div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="card-islamic p-6 md:p-8 mb-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="font-arabic text-3xl md:text-4xl font-bold text-islamic-green dark:text-gold-300">{t('referenceTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl whitespace-pre-line">
                {t('referenceDesc')}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={SURAH_QURAN_REFERENCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center justify-center px-8 py-3 text-base"
              >
                {t('referenceLinkBtn')}
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(['read', 'listen', 'tafsir', 'search', 'browse'] as const).map((key) => (
                <a
                  key={key}
                  href={SURAH_QURAN_HOME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-islamic p-5 hover:border-gold-400 transition-all"
                >
                  <p className="font-arabic text-xl font-bold text-islamic-navy dark:text-white mb-2">{t(`referenceFeatures.${key}.title`)}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t(`referenceFeatures.${key}.desc`)}</p>
                </a>
              ))}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {t('referenceNote')}
            </p>
          </div>
        </div>
      </section>

      <QuranList surahs={surahs} locale={locale} />
    </div>
  )
}
