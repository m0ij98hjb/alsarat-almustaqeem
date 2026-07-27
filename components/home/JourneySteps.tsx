import Link from 'next/link'

interface Step {
  icon: string
  titleAr: string
  titleEn: string
  href: string
}

export function JourneySteps({ locale }: { locale: string }) {
  const steps: Step[] = [
    { icon: '🕋', titleAr: 'ما هو الإسلام؟', titleEn: 'What is Islam?', href: `/${locale}#faq` },
    { icon: '✨', titleAr: 'من هو الله؟', titleEn: 'Who is Allah?', href: `/${locale}/asma-allah` },
    { icon: '🌙', titleAr: 'من هو النبي محمد ﷺ؟', titleEn: 'Who is Prophet Muhammad ﷺ?', href: `/${locale}/seerah` },
    { icon: '📖', titleAr: 'ما هو القرآن؟', titleEn: 'What is the Quran?', href: `/${locale}/quran` },
    { icon: '🕌', titleAr: 'لماذا نصلي؟', titleEn: 'Why do we pray?', href: `/${locale}/kids/prayer` },
    { icon: '🌃', titleAr: 'رمضان', titleEn: 'Ramadan', href: `/${locale}#faq` },
    { icon: '🕋', titleAr: 'الحج', titleEn: 'Hajj', href: `/${locale}/kids/hajj` },
    { icon: '📡', titleAr: 'شاهد مكة مباشرًا', titleEn: 'Watch Makkah Live', href: `/${locale}/live` },
    { icon: '🤖', titleAr: 'اسأل المساعد الذكي', titleEn: 'Ask AI', href: `/${locale}#ask-ai` },
  ]

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2>{locale === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey'}</h2>
          <p>
            {locale === 'ar'
              ? 'دليل مبسّط خطوة بخطوة لكل من يريد التعرف على الإسلام'
              : 'A simple, step-by-step guide for anyone curious about Islam'}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {steps.map((step, i) => (
            <Link key={step.titleEn} href={step.href} className="card-islamic p-5 text-center group">
              <div className="text-3xl mb-3">{step.icon}</div>
              <div className="text-xs text-gold-500 font-bold mb-1">{i + 1}</div>
              <h3 className="font-arabic text-sm font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors leading-snug">
                {locale === 'ar' ? step.titleAr : step.titleEn}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
