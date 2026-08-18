import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import IslamicVideosClient from './IslamicVideosClient'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'videos' })
  const title = t('title')
  const description = t('subtitle')
  return {
    title,
    description,
    alternates: buildAlternates(locale, 'islamic-videos'),
    openGraph: { title, description, type: 'website' },
  }
}

export default function IslamicVideosPage() {
  return <IslamicVideosClient />
}
