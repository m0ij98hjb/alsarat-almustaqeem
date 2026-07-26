import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PrayerTimesClient from './PrayerTimesClient'
import { buildAlternates } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return {
    title: t('prayerTimes'),
    description: 'مواقيت الصلاة كاملة حسب مدينتك أو موقعك الحالي: الفجر والشروق والظهر والعصر والمغرب والعشاء.',
    alternates: buildAlternates(locale, 'prayer-times'),
  }
}

export default async function PrayerTimesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🕌</div>
          <h1 className="font-arabic text-white text-4xl md:text-5xl font-bold mb-3">{t('prayerTimes')}</h1>
        </div>
      </div>
      <PrayerTimesClient />
    </div>
  )
}
