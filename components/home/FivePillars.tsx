import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

interface Pillar {
  icon: string
  key: string
  href: string
}

export async function FivePillars({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' })

  const pillars: Pillar[] = [
    { icon: '☝️', key: 'shahada', href: `/${locale}#faq` },
    { icon: '🕌', key: 'salah', href: `/${locale}/kids/prayer` },
    { icon: '🤲', key: 'zakat', href: `/${locale}#faq` },
    { icon: '🌙', key: 'sawm', href: `/${locale}#faq` },
    { icon: '🕋', key: 'hajj', href: `/${locale}/kids/hajj` },
  ]

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-header">
          <h2>{t('fivePillarsSection.title')}</h2>
          <p>{t('fivePillarsSection.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {pillars.map((p, i) => (
            <Link
              key={p.key}
              href={p.href}
              className="card-islamic p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
              <div className="text-xs text-gold-500 font-bold mb-1">{i + 1}</div>
              <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors mb-2">
                {t(`fivePillarsSection.pillars.${p.key}.name`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {t(`fivePillarsSection.pillars.${p.key}.desc`)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
