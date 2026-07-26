import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FATAWA } from '@/data/fatawa'
import { buildAlternates, absoluteUrl } from '@/lib/seo'
import FatawaClient from './FatawaClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return {
    title: t('fatawa'),
    description: 'فتاوى إسلامية موثوقة في الطهارة والصلاة والصيام والزكاة وقضايا العصر.',
    alternates: buildAlternates(locale, 'fatawa'),
  }
}

export default async function FatawaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FATAWA.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
    inLanguage: locale,
    url: absoluteUrl(`/${locale}/fatawa`),
  }

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">⚖️</div>
          <h1 className="font-arabic text-white text-4xl md:text-5xl font-bold mb-3">{t('fatawa')}</h1>
          <p className="text-gold-300">فتاوى إسلامية موثوقة لأسئلتك اليومية</p>
        </div>
      </div>
      <FatawaClient />
    </div>
  )
}
