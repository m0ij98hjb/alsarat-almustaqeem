import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function DiscoverQuran({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' })

  const tiles = [
    { icon: '📖', key: 'read', href: `/${locale}/quran` },
    { icon: '🎧', key: 'listen', href: `/${locale}/quran` },
    { icon: '🌐', key: 'translations', href: `/${locale}/quran` },
    { icon: '🔀', key: 'randomVerse', href: `/${locale}#daily-ayah` },
    { icon: '🔍', key: 'search', href: `/${locale}/quran` },
    { icon: '▶️', key: 'continueReading', href: `/${locale}/quran/1` },
  ]

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-5xl mx-auto px-4">
        <div className="section-header">
          <h2>{t('discoverQuran.title')}</h2>
          <p>{t('discoverQuran.subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tiles.map((tile) => (
            <Link key={tile.key} href={tile.href} className="card-islamic p-6 text-center group">
              <div className="text-3xl mb-3">{tile.icon}</div>
              <h3 className="font-arabic text-base font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors">
                {t(`discoverQuran.tiles.${tile.key}`)}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
