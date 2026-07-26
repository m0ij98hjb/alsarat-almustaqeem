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
  return {
    title: `العلماء والدعاة | ${t('siteName')}`,
    description: 'اكتشف مجموعة من العلماء والدعاة مع نبذة مختصرة عن تخصصاتهم وطرق التواصل.',
    alternates: buildAlternates(locale, 'scholars'),
  }
}

export default function ScholarsPage() {
  return <ScholarsPageContent />
}
