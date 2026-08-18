import { getTranslations } from 'next-intl/server'

interface ValueCard {
  icon: string
  key: string
}

const values: ValueCard[] = [
  { icon: '🤲', key: 'mercy' },
  { icon: '⚖️', key: 'justice' },
  { icon: '💞', key: 'compassion' },
  { icon: '📚', key: 'knowledge' },
  { icon: '👨‍👩‍👧', key: 'family' },
  { icon: '🌅', key: 'hope' },
  { icon: '☮️', key: 'peace' },
  { icon: '🤝', key: 'honesty' },
]

export async function WhyExploreIslam({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' })

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2>{t('whyExplore.title')}</h2>
          <p>{t('whyExplore.subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {values.map((v) => (
            <div key={v.key} className="card-islamic p-5 text-center">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 mb-2">
                {t(`whyExplore.values.${v.key}.title`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-2">
                {t(`whyExplore.values.${v.key}.desc`)}
              </p>
              <span className="text-xs text-gold-500">{t(`whyExplore.values.${v.key}.ref`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
