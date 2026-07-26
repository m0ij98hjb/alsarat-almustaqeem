import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { HadithPageContent } from '@/components/pages/HadithPageContent'
import { buildAlternates, absoluteUrl } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: `الأحاديث | ${t('siteName')}`,
    description: 'استكشف أحاديث إسلامية مصنفة مع البحث والتصنيفات وتبادل الحديث بسهولة.',
    alternates: buildAlternates(locale, 'hadith'),
  }
}

export default async function HadithPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'الأحاديث النبوية',
    description: 'استكشف أحاديث إسلامية مصنفة مع البحث والتصنيفات وتبادل الحديث بسهولة.',
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(`/${locale}/hadith`),
    author: { '@type': 'Organization', name: 'الصراط المستقيم' },
    publisher: { '@type': 'Organization', name: 'الصراط المستقيم' },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <HadithPageContent />
    </>
  )
}
