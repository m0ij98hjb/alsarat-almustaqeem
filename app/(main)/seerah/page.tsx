import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'السيرة النبوية الشريفة',
  description: 'حياة النبي محمد ﷺ كاملة من الولادة حتى الوفاة',
}

const SEERAH_TIMELINE = [
  {
    era: 'قبل البعثة',
    color: 'bg-blue-500',
    events: [
      { year: '570م', title: 'عام الفيل — مولد النبي ﷺ', desc: 'وُلد محمد بن عبدالله ﷺ في مكة المكرمة في شهر ربيع الأول، في العام الذي أرسل الله فيه الطير الأبابيل لهلاك أصحاب الفيل', icon: '🌟' },
      { year: '575م', title: 'وفاة أمه آمنة', desc: 'فُقدت والدته آمنة بنت وهب، فكفله جده عبد المطلب، ثم كفله عمه أبو طالب', icon: '🌹' },
      { year: '583م', title: 'رحلة الشام الأولى', desc: 'سافر مع عمه أبي طالب إلى الشام للتجارة، والتقى الراهب بُحيرا الذي تعرّف عليه', icon: '🐪' },
      { year: '595م', title: 'الزواج من خديجة', desc: 'تزوج من أم المؤمنين خديجة بنت خويلد رضي الله عنها، وكانت أول زوجاته وأول من آمن به', icon: '💍' },
      { year: '605م', title: 'إصلاح الكعبة والحَكَم', desc: 'اشترك في إعادة بناء الكعبة المشرفة وحكم بين القبائل في وضع الحجر الأسود بعبقرية', icon: '🕌' },
    ],
  },
  {
    era: 'العهد المكي (610—622م)',
    color: 'bg-gold-500',
    events: [
      { year: '610م', title: 'نزول الوحي في غار حراء', desc: 'نزل جبريل عليه السلام في غار حراء بأول آيات سورة العلق: ﴿اقرأ باسم ربك الذي خلق﴾، وبدأت مرحلة النبوة', icon: '📖' },
      { year: '613م', title: 'الدعوة العلنية', desc: 'أُمر النبي ﷺ بالجهر بالدعوة بعد ثلاث سنين من الدعوة السرية، فصعد الصفا ودعا قومه', icon: '📣' },
      { year: '615م', title: 'الهجرة الأولى للحبشة', desc: 'هاجر المسلمون الأوائل إلى الحبشة فراراً من أذى قريش، لجأوا إلى النجاشي الملك العادل', icon: '🌍' },
      { year: '619م', title: 'عام الحزن', desc: 'توفيت أم المؤمنين خديجة وعمّه أبو طالب في عام واحد، فسُمّي عام الحزن، وشقّ ذلك عليه ﷺ', icon: '💔' },
      { year: '621م', title: 'الإسراء والمعراج', desc: 'أُسري بالنبي ﷺ ليلاً من المسجد الحرام إلى المسجد الأقصى، ثم عُرج به إلى السموات العلى وفُرضت الصلاة', icon: '🌙' },
    ],
  },
  {
    era: 'العهد المدني (622—632م)',
    color: 'bg-emerald-500',
    events: [
      { year: '622م', title: 'الهجرة النبوية إلى المدينة', desc: 'الهجرة المباركة التي أُرّخ بها التاريخ الإسلامي، لجأ المسلمون إلى المدينة التي استقبلتهم بفرح وترحيب', icon: '🌴' },
      { year: '624م', title: 'غزوة بدر الكبرى', desc: 'أول المعارك الفاصلة، انتصر فيها 313 من المسلمين على جيش قريش البالغ ألف مقاتل، بنصر من الله', icon: '⚔️' },
      { year: '625م', title: 'غزوة أُحد', desc: 'ابتُلي المسلمون في هذه الغزوة بسبب مخالفة بعض الرماة أوامر النبي ﷺ، واستُشهد سبعون صحابياً', icon: '🏔️' },
      { year: '627م', title: 'غزوة الأحزاب (الخندق)', desc: 'حاصرت قريش وأحلافها المدينة، ففكّر النبي ﷺ بحفر الخندق بنصيحة سلمان، وانتهى الحصار بنصر إلهي', icon: '🏰' },
      { year: '628م', title: 'صلح الحديبية', desc: 'صلح مع قريش ظاهره الخسارة وباطنه النصر، سماه الله فتحاً مبيناً، وفيه بدأ الإسلام ينتشر في الآفاق', icon: '🤝' },
      { year: '630م', title: 'فتح مكة المكرمة', desc: 'دخل النبي ﷺ مكة فاتحاً في رمضان بعشرة آلاف، فكان من أعظم الفتوحات وطُهّرت الكعبة من الأصنام', icon: '🕌' },
      { year: '632م', title: 'حجة الوداع ووفاته ﷺ', desc: 'أدّى النبي ﷺ حجة الوداع وخطب خطبته الخالدة. ثم انتقل إلى الرفيق الأعلى في ربيع الأول بعد 23 سنة من البعثة', icon: '🌹' },
    ],
  },
]

export default function SeerahPage() {
  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      {/* Hero */}
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">السيرة النبوية الشريفة</h1>
          <p className="font-arabic text-gold-300 text-2xl mb-2">محمد رسول الله ﷺ</p>
          <p className="text-gray-300">٥٧٠م — ٦٣٢م | ٢٣ سنة نبوة</p>
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
            <div><div className="text-gold-300 font-arabic text-2xl font-bold">٦٣</div><div className="text-gray-400 text-xs">سنة عمره ﷺ</div></div>
            <div><div className="text-gold-300 font-arabic text-2xl font-bold">٢٣</div><div className="text-gray-400 text-xs">سنة نبوة</div></div>
            <div><div className="text-gold-300 font-arabic text-2xl font-bold">٢٧</div><div className="text-gray-400 text-xs">غزوة</div></div>
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
              {/* Timeline line */}
              <div className="absolute right-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400/50 to-transparent hidden md:block" />

              <div className="space-y-6">
                {era.events.map((event, ei2) => (
                  <div key={ei2} className="md:pr-14 relative">
                    {/* Timeline dot */}
                    <div className="absolute right-3 top-6 w-4 h-4 rounded-full bg-gold-400 border-2 border-white dark:border-islamic-navy hidden md:block" />

                    <div className="card-islamic p-6 hover:border-gold-400 transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl flex-shrink-0">{event.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2.5 py-0.5 rounded-full font-medium">
                              {event.year}
                            </span>
                            <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors">
                              {event.title}
                            </h3>
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

        {/* Quote */}
        <div className="bg-hero-gradient rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          <div className="relative z-10">
            <p className="font-arabic text-gold-300 text-2xl md:text-3xl leading-loose mb-4">
              ﴿ لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ ﴾
            </p>
            <p className="text-gray-300 text-sm">سورة الأحزاب — الآية 21</p>
          </div>
        </div>
      </div>
    </div>
  )
}
