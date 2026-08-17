import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { SEERAH_TIMELINE } from '@/data/seerah'

export async function MeetProphet({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' })
  // 4 landmark events spanning birth to death, one from each key moment.
  const highlights = [
    SEERAH_TIMELINE[0].events[0], // birth
    SEERAH_TIMELINE[1].events.find((e) => e.title.includes('نزول الوحي')) ?? SEERAH_TIMELINE[1].events[0],
    SEERAH_TIMELINE[2].events.find((e) => e.title.includes('الهجرة النبوية')) ?? SEERAH_TIMELINE[2].events[0],
    SEERAH_TIMELINE[2].events[SEERAH_TIMELINE[2].events.length - 1], // passing
  ]

  return (
    <section className="py-20 bg-islamic-navy-mid">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-header">
          <h2 className="text-white">{t('meetProphet.title')}</h2>
          <p className="text-gray-300">{t('meetProphet.subtitle')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {highlights.map((event) => (
            <div key={event.title} className="card-islamic p-5 text-center">
              <div className="text-3xl mb-2">{event.icon}</div>
              <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2.5 py-0.5 rounded-full font-medium">
                {event.year}
              </span>
              <h3 className="font-arabic text-sm font-bold text-islamic-green dark:text-gold-300 mt-2 leading-snug">
                {event.title}
              </h3>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href={`/${locale}/seerah`} className="btn-gold px-8 py-3 inline-block">
            {t('meetProphet.cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
