import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: buildAlternates(locale),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  const services = [
    { href: `/${locale}/live`,     icon: '📡', title: locale === 'ar' ? 'البث المباشر' : 'Live', desc: locale === 'ar' ? 'تابع القنوات الإسلامية مباشرة' : 'Watch Islamic channels directly' },
    { href: `/${locale}/scholars`, icon: '👳', title: locale === 'ar' ? 'العلماء والدعاة' : 'Scholars', desc: locale === 'ar' ? 'تعرف على العلماء والدعاة الموثوقين' : 'Meet trusted scholars and preachers' },
    { href: `/${locale}/kids`,     icon: '🧒', title: locale === 'ar' ? 'تعليم الأطفال' : 'Kids Education', desc: locale === 'ar' ? 'محتوى مبسط للأطفال عن الإسلام' : 'Simple, child-friendly Islamic lessons' },
    { href: `/${locale}/hadith`,   icon: '📚', title: locale === 'ar' ? 'الأحاديث' : 'Hadith', desc: locale === 'ar' ? 'أحاديث مصنفة مع البحث والنسخ' : 'Curated hadiths with search and sharing' },
  ]

  const features = [
    { href: `/${locale}/quran`,        icon: '📖', key: 'quran' as const },
    { href: `/${locale}/hadith`,       icon: '📜', key: 'hadith' as const },
    { href: `/${locale}/adhkar`,       icon: '📿', key: 'adhkar' as const },
    { href: `/${locale}/prophets`,     icon: '🌟', key: 'prophets' as const },
    { href: `/${locale}/seerah`,       icon: '🌙', key: 'seerah' as const },
    { href: `/${locale}/asma-allah`,   icon: '✨', key: 'asmaAllah' as const },
    { href: `/${locale}/fatawa`,       icon: '⚖️', key: 'fatawa' as const },
    { href: `/${locale}/prayer-times`, icon: '🕌', key: 'prayerTimes' as const },
    { href: `/${locale}/ai`,           icon: '🤖', key: 'ai' as const },
  ]

  const stats = [
    { num: '6,236',    key: 'verses' as const },
    { num: '100,000+', key: 'hadiths' as const },
    { num: '25',       key: 'prophets' as const },
    { num: '99',       key: 'names' as const },
  ]

  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-30" />

        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg viewBox="0 0 600 600" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#C9A227" strokeWidth="0.8" fill="none">
              <polygon points="300,30 360,150 490,150 395,225 430,350 300,280 170,350 205,225 110,150 240,150" />
              <polygon points="300,10 380,170 520,170 410,250 450,390 300,310 150,390 190,250 80,170 220,170" opacity="0.5" />
              <circle cx="300" cy="300" r="200" opacity="0.3" />
              <circle cx="300" cy="300" r="240" opacity="0.15" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="font-arabic text-gold-300 text-3xl md:text-4xl mb-6 opacity-90">
            {t('bismillah')}
          </div>

          <h1 className="font-arabic text-white text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="text-gold-400">✦</span>{' '}
            {t('title')}{' '}
            <span className="text-gold-400">✦</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          <div className="inline-block border-x-2 border-gold-400 px-8 py-4 mb-10">
            <p className="font-arabic text-gold-200 text-xl md:text-2xl">{t('ayah')}</p>
            <p className="text-gray-400 text-sm mt-1">{t('surahRef')}</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/${locale}/quran`}  className="btn-gold text-base px-8 py-3">{t('btnQuran')}</Link>
            <Link href={`/${locale}/adhkar`} className="btn-outline-gold text-base px-8 py-3">{t('btnAdhkar')}</Link>
            <Link href={`/${locale}/ai`}     className="btn-outline-gold text-base px-8 py-3">{t('btnAI')}</Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-400 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-islamic-green py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.key}>
              <div className="font-arabic text-3xl md:text-4xl font-bold text-gold-300 mb-1">{s.num}</div>
              <div className="text-green-200 text-sm">{t(`stats.${s.key}`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header">
            <h2>{locale === 'ar' ? 'الخدمات الإسلامية' : 'Islamic Services'}</h2>
            <p>{locale === 'ar' ? 'خدمات مختارة تناسب جميع احتياجاتك الإسلامية' : 'A curated set of services for your everyday Islamic needs'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map(service => (
              <Link key={service.href} href={service.href} className="card-islamic p-6 group">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header">
            <h2>{t('sectionTitle')}</h2>
            <p>{t('sectionDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <Link key={f.href} href={f.href} className="card-islamic p-6 group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors">
                    {t(`features.${f.key}.title`)}
                  </h3>
                  <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded-full">
                    {t(`features.${f.key}.badge`)}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t(`features.${f.key}.desc`)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DAILY AYAH ===== */}
      <section className="py-20 bg-islamic-navy-mid">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="divider-islamic justify-center mb-8">
            <span>{t('dailyAyah')}</span>
          </div>
          <blockquote className="quran-text text-white text-2xl md:text-3xl mb-6">
            ﴿ وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ﴾
          </blockquote>
          <p className="text-gold-400 text-lg mb-8">{t('dailyAyahRef')}</p>
          <Link href={`/${locale}/quran/65`} className="btn-outline-gold inline-block">
            {t('readFullSurah')}
          </Link>
        </div>
      </section>

      {/* ===== AI CTA ===== */}
      <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-hero-gradient rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pattern-overlay opacity-20" />
            <div className="relative z-10">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="font-arabic text-gold-300 text-3xl font-bold mb-4">{t('aiTitle')}</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">{t('aiDesc')}</p>
              <Link href={`/${locale}/ai`} className="btn-gold text-base px-10 py-3 inline-block">
                {t('aiBtn')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
