import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function FatawaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">⚖️</div>
        <h1 className="font-arabic text-4xl font-bold text-gold-400 mb-4">{t('fatawa')}</h1>
        <p className="text-gray-400 mb-8">Coming soon / قريباً</p>
        <Link href={`/${locale}`} className="btn-gold">← Back</Link>
      </div>
    </div>
  )
}
