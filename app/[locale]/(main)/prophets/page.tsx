import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { PROPHETS } from '@/data/prophets'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'prophets' })
  return { title: t('title'), alternates: buildAlternates(locale, 'prophets') }
}

export default async function ProphetsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'prophets' })

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="font-arabic text-gold-300 text-xl">{t('ayah')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROPHETS.map(prophet => (
            <Link
              key={prophet.id}
              href={`/${locale}/prophets/${prophet.id}`}
              className="card-islamic p-6 hover:border-gold-400 group cursor-pointer block"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{prophet.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors leading-normal">
                      {prophet.nameAr}
                    </h3>
                    <span className="text-xs bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {prophet.quranMentions}{t('inQuran')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 mb-2">📍 {prophet.nation} — {prophet.period}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{prophet.summary}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
