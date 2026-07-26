import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AdhkarClient from './AdhkarClient'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'adhkar' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: buildAlternates(locale, 'adhkar'),
  }
}

export default function AdhkarPage() {
  return <AdhkarClient />
}
