import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildAlternates } from '@/lib/seo'

const LESSON_META = [
  { href: '/kids/wudu', key: 'wudu', icon: '🧼' },
  { href: '/kids/prayer', key: 'prayer', icon: '🕋' },
  { href: '/kids/umrah', key: 'umrah', icon: '🕯️' },
  { href: '/kids/hajj', key: 'hajj', icon: '🪔' },
  { href: '/kids/learn', key: 'learn', icon: '📘' },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const tk = await getTranslations({ locale, namespace: 'kidsPage' })
  return {
    title: `${tk('title')} | ${t('siteName')}`,
    description: tk('subtitle'),
    alternates: buildAlternates(locale, 'kids'),
  }
}

export default async function KidsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'kidsPage' })

  return (
    <div className="min-h-screen bg-islamic-cream">
      <section className="bg-hero-gradient py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-400/40 bg-white/10 text-gold-300 text-3xl mb-6">
            🧒
          </div>
          <h1 className="font-arabic text-white text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-gold-200 text-lg max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {LESSON_META.map((lesson) => (
            <Link key={lesson.href} href={`/${locale}${lesson.href}`} className="card-islamic p-8 group">
              <div className="text-5xl mb-4">{lesson.icon}</div>
              <h2 className="font-arabic text-2xl font-bold text-islamic-green mb-3">{t(`lessons.${lesson.key}.title`)}</h2>
              <p className="text-gray-700 leading-relaxed">{t(`lessons.${lesson.key}.desc`)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
