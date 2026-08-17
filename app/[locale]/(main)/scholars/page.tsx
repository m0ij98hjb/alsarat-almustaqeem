import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ScholarsPageContent } from '@/components/pages/ScholarsPageContent'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const ts = await getTranslations({ locale, namespace: 'scholarsPage' })
  return {
    title: `${ts('title')} | ${t('siteName')}`,
    description: ts('subtitle'),
    alternates: buildAlternates(locale, 'scholars'),
  }
}

export default async function ScholarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <ScholarsPageContent locale={locale} />
}
