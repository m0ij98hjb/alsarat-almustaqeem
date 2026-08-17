import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { LivePageContent } from '@/components/pages/LivePageContent'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const tl = await getTranslations({ locale, namespace: 'livePage' })
  return {
    title: `${tl('title')} | ${t('siteName')}`,
    description: tl('subtitle'),
    alternates: buildAlternates(locale, 'live'),
  }
}

export default function LivePage() {
  return <LivePageContent />
}
