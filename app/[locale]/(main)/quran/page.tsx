import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import QuranList from './QuranList'
import { fallbackSurahs } from './fallback-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'quran' })
  return { title: t('title'), description: t('subtitle') }
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
      <QuranList surahs={surahs} locale={locale} />
    </div>
  )
}
