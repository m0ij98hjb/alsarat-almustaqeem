import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

interface Step {
  icon: string
  key: string
  href: string
}

export async function JourneySteps({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' })

  const steps: Step[] = [
    { icon: '🕋', key: 'islam', href: `/${locale}#faq` },
    { icon: '✨', key: 'allah', href: `/${locale}/asma-allah` },
    { icon: '🌙', key: 'prophet', href: `/${locale}/seerah` },
    { icon: '📖', key: 'quran', href: `/${locale}/quran` },
    { icon: '🕌', key: 'prayer', href: `/${locale}/kids/prayer` },
    { icon: '🌃', key: 'ramadan', href: `/${locale}#faq` },
    { icon: '🕋', key: 'hajj', href: `/${locale}/kids/hajj` },
    { icon: '📡', key: 'live', href: `/${locale}/live` },
    { icon: '🤖', key: 'ai', href: `/${locale}#ask-ai` },
  ]

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2>{t('journey.title')}</h2>
          <p>{t('journey.subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {steps.map((step, i) => (
            <Link key={step.key} href={step.href} className="card-islamic p-5 text-center group">
              <div className="text-3xl mb-3">{step.icon}</div>
              <div className="text-xs text-gold-500 font-bold mb-1">{i + 1}</div>
              <h3 className="font-arabic text-sm font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors leading-snug">
                {t(`journey.steps.${step.key}`)}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
