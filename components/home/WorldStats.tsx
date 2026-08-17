import { getTranslations } from 'next-intl/server'

export async function WorldStats({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' })

  const stats = [
    { num: '1.9B+', key: 'muslims' },
    { num: '~50', key: 'countries' },
    { num: '2nd', key: 'religion' },
    { num: '1400+', key: 'history' },
  ]

  return (
    <section className="bg-islamic-green py-14">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-arabic text-white text-2xl md:text-3xl font-bold">
            {t('worldStats.title')}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.key}>
              <div className="font-arabic text-3xl md:text-4xl font-bold text-gold-300 mb-1">{s.num}</div>
              <div className="text-green-200 text-sm">{t(`worldStats.stats.${s.key}`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
