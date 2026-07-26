import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return { title: t('search'), alternates: buildAlternates(locale, 'search') }
}

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="font-arabic text-4xl font-bold text-gold-400 mb-4">{t('search')}</h1>
        <p className="text-gray-400 mb-8">Coming soon / قريباً</p>
        <Link href={`/${locale}`} className="btn-gold">← Back</Link>
      </div>
    </div>
  )
}
