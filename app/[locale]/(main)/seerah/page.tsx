import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seerah' })
  return { title: t('title'), description: t('subtitle') }
}

const SEERAH_TIMELINE = [
  {
    era: 'قبل البعثة',
    color: 'bg-blue-500',
    events: [
      { year: '570م', title: 'عام الفيل — مولد النبي ﷺ', desc: 'وُلد محمد بن عبدالله ﷺ في مكة المكرمة في شهر ربيع الأول', icon: '🌟' },
      { year: '595م', title: 'الزواج من خديجة', desc: 'تزوج من أم المؤمنين خديجة بنت خويلد رضي الله عنها، أول من آمن به', icon: '💍' },
      { year: '605م', title: 'إصلاح الكعبة والحَكَم', desc: 'حكم بين القبائل في وضع الحجر الأسود بعبقرية', icon: '🕌' },
    ],
  },
  {
    era: 'العهد المكي (610—622م)',
    color: 'bg-gold-500',
    events: [
      { year: '610م', title: 'نزول الوحي في غار حراء', desc: 'نزل جبريل عليه السلام بأول آيات سورة العلق: ﴿اقرأ باسم ربك الذي خلق﴾', icon: '📖' },
      { year: '613م', title: 'الدعوة العلنية', desc: 'أُمر النبي ﷺ بالجهر بالدعوة بعد ثلاث سنين من الدعوة السرية', icon: '📣' },
      { year: '621م', title: 'الإسراء والمعراج', desc: 'أُسري بالنبي ﷺ ليلاً من المسجد الحرام إلى المسجد الأقصى وفُرضت الصلاة', icon: '🌙' },
    ],
  },
  {
    era: 'العهد المدني (622—632م)',
    color: 'bg-emerald-500',
    events: [
      { year: '622م', title: 'الهجرة النبوية إلى المدينة', desc: 'الهجرة المباركة التي أُرّخ بها التاريخ الإسلامي', icon: '🌴' },
      { year: '624م', title: 'غزوة بدر الكبرى', desc: 'أول المعارك الفاصلة، انتصر فيها 313 من المسلمين', icon: '⚔️' },
      { year: '630م', title: 'فتح مكة المكرمة', desc: 'دخل النبي ﷺ مكة فاتحاً في رمضان بعشرة آلاف', icon: '🕌' },
      { year: '632م', title: 'حجة الوداع ووفاته ﷺ', desc: 'أدّى النبي ﷺ حجة الوداع وخطب خطبته الخالدة ثم انتقل إلى الرفيق الأعلى', icon: '🌹' },
    ],
  },
]

export default async function SeerahPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seerah' })

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="font-arabic text-gold-300 text-2xl mb-2">{t('subtitle')}</p>
          <p className="text-gray-300">{t('period')}</p>
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
            <div><div className="text-gold-300 font-arabic text-2xl font-bold">٦٣</div><div className="text-gray-400 text-xs">{t('age')}</div></div>
            <div><div className="text-gold-300 font-arabic text-2xl font-bold">٢٣</div><div className="text-gray-400 text-xs">{t('prophethood')}</div></div>
            <div><div className="text-gold-300 font-arabic text-2xl font-bold">٢٧</div><div className="text-gray-400 text-xs">{t('battles')}</div></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {SEERAH_TIMELINE.map((era, ei) => (
          <div key={ei} className="mb-14">
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-4 h-4 rounded-full ${era.color}`} />
              <h2 className="font-arabic text-2xl font-bold text-islamic-green dark:text-gold-300">{era.era}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gold-400/50 to-transparent" />
            </div>
            <div className="relative">
              <div className="absolute right-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400/50 to-transparent hidden md:block" />
              <div className="space-y-6">
                {era.events.map((event, ei2) => (
                  <div key={ei2} className="md:pr-14 relative">
                    <div className="absolute right-3 top-6 w-4 h-4 rounded-full bg-gold-400 border-2 border-white dark:border-islamic-navy hidden md:block" />
                    <div className="card-islamic p-6 hover:border-gold-400 transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl flex-shrink-0">{event.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2.5 py-0.5 rounded-full font-medium">{event.year}</span>
                            <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors">{event.title}</h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{event.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="bg-hero-gradient rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          <div className="relative z-10">
            <p className="font-arabic text-gold-300 text-2xl md:text-3xl leading-loose mb-4">
              ﴿ لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ ﴾
            </p>
            <p className="text-gray-300 text-sm">{t('closingAyahRef')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
