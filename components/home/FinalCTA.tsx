import Link from 'next/link'

export function FinalCTA({ locale }: { locale: string }) {
  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-hero-gradient rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          <div className="relative z-10">
            <h2 className="font-arabic text-gold-300 text-3xl font-bold mb-4">
              {locale === 'ar' ? 'واصل رحلتك' : 'Continue Your Journey'}
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              {locale === 'ar'
                ? 'مهما كانت خطوتك الأولى، الموقع هنا ليرافقك في كل خطوة بعدها'
                : 'Wherever you start, this site is here to walk with you every step after'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${locale}/quran`} className="btn-gold px-8 py-3">
                {locale === 'ar' ? '📖 اقرأ القرآن' : '📖 Read Quran'}
              </Link>
              <Link href={`/${locale}#ask-ai`} className="btn-outline-gold px-8 py-3">
                {locale === 'ar' ? '🤖 اسأل المساعد الذكي' : '🤖 Ask AI'}
              </Link>
              <Link href={`/${locale}/islamic-videos`} className="btn-outline-gold px-8 py-3">
                {locale === 'ar' ? '📺 شاهد الفيديوهات' : '📺 Watch Videos'}
              </Link>
              <Link href={`/${locale}/prophets`} className="btn-outline-gold px-8 py-3">
                {locale === 'ar' ? '🌟 تعرّف أكثر' : '🌟 Learn More'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
