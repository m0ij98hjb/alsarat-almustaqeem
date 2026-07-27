import Link from 'next/link'

export function DiscoverQuran({ locale }: { locale: string }) {
  const tiles = [
    { icon: '📖', labelAr: 'اقرأ', labelEn: 'Read', href: `/${locale}/quran` },
    { icon: '🎧', labelAr: 'استمع', labelEn: 'Listen', href: `/${locale}/quran` },
    { icon: '🌐', labelAr: 'الترجمات', labelEn: 'Translations', href: `/${locale}/quran` },
    { icon: '🔀', labelAr: 'آية عشوائية', labelEn: 'Random Verse', href: `/${locale}#daily-ayah` },
    { icon: '🔍', labelAr: 'ابحث', labelEn: 'Search', href: `/${locale}/quran` },
    { icon: '▶️', labelAr: 'أكمل القراءة', labelEn: 'Continue Reading', href: `/${locale}/quran/1` },
  ]

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-5xl mx-auto px-4">
        <div className="section-header">
          <h2>{locale === 'ar' ? 'اكتشف القرآن الكريم' : 'Discover the Quran'}</h2>
          <p>
            {locale === 'ar'
              ? '6,236 آية بين يديك — قراءة واستماعًا وبحثًا'
              : '6,236 verses at your fingertips — read, listen, and search'}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tiles.map((tile) => (
            <Link key={tile.labelEn} href={tile.href} className="card-islamic p-6 text-center group">
              <div className="text-3xl mb-3">{tile.icon}</div>
              <h3 className="font-arabic text-base font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors">
                {locale === 'ar' ? tile.labelAr : tile.labelEn}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
