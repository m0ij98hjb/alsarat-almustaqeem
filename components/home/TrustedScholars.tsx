import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { SCHOLARS } from '@/data/scholars'

export async function TrustedScholars({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' })
  const featured = SCHOLARS.filter((s) => s.category !== 'organization' && s.website).slice(0, 6)

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-header">
          <h2>{t('trustedScholarsSection.title')}</h2>
          <p>{t('trustedScholarsSection.subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8">
          {featured.map((s) => (
            <a
              key={s.id}
              href={s.website}
              target="_blank"
              rel="noopener noreferrer"
              className="card-islamic p-5 text-center group"
            >
              <div className="text-3xl mb-3">👳</div>
              <h3 className="font-arabic text-sm font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors leading-snug">
                {locale === 'ar' ? s.nameAr : s.nameEn}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.country}</p>
            </a>
          ))}
        </div>
        <div className="text-center">
          <Link href={`/${locale}/scholars`} className="btn-outline-gold px-8 py-3 inline-block">
            {t('trustedScholarsSection.seeAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
