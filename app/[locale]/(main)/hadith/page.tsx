import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { HadithPageContent } from '@/components/pages/HadithPageContent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: `الأحاديث | ${t('siteName')}`, description: 'استكشف أحاديث إسلامية مصنفة مع البحث والتصنيفات وتبادل الحديث بسهولة.' }
}

export default function HadithPage() {
  return <HadithPageContent />
}
