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
  const th = await getTranslations({ locale, namespace: 'hadith' })
  return {
    title: `${th('title')} | ${t('siteName')}`,
    description: th('heroDesc'),
    alternates: buildAlternates(locale, 'hadith'),
  }
}

export default async function HadithPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const th = await getTranslations({ locale, namespace: 'hadith' })
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: th('title'),
    description: th('heroDesc'),
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(`/${locale}/hadith`),
    author: { '@type': 'Organization', name: t('siteName') },
    publisher: { '@type': 'Organization', name: t('siteName') },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <HadithPageContent />
    </>
  )
}
