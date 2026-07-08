import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { LivePageContent } from '@/components/pages/LivePageContent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: `البث المباشر | ${t('siteName')}`, description: 'تابع القنوات الإسلامية المباشرة والاذاعة من خلال البث المباشر.' }
}

export default function LivePage() {
  return <LivePageContent />
}
