'use client'

import { useState } from 'react'

const HISN_SECTIONS = [
  {
    id: 1, title: 'أذكار الصباح', icon: '🌅', count: 18,
    adhkar: [
      { text: 'أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\nٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ', count: 1, note: 'آية الكرسي' },
      { text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', count: 3, note: 'سورة الإخلاص' },
      { text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', count: 1 },
      { text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ', count: 1 },
      { text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ', count: 1, note: 'سيد الاستغفار' },
    ],
  },
  {
    id: 2, title: 'أذكار المساء', icon: '🌆', count: 17,
    adhkar: [
      { text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', count: 1 },
      { text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ', count: 1 },
      { text: 'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ', count: 4, note: 'أعتقه الله من النار' },
    ],
  },
  { id: 3, title: 'أذكار النوم', icon: '🌙', count: 12, adhkar: [
    { text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', count: 1 },
    { text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ', count: 3 },
    { text: 'سُبْحَانَ اللَّهِ', count: 33 },
    { text: 'الْحَمْدُ لِلَّهِ', count: 33 },
    { text: 'اللَّهُ أَكْبَرُ', count: 34, note: 'خير من خادم' },
  ]},
  { id: 4, title: 'أذكار الاستيقاظ', icon: '☀️', count: 5, adhkar: [
    { text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', count: 1 },
    { text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', count: 1 },
  ]},
  { id: 5, title: 'أذكار الصلاة', icon: '🕌', count: 15, adhkar: [
    { text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ', count: 1, note: 'دعاء الاستفتاح' },
    { text: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ', count: 3, note: 'ذكر الركوع' },
    { text: 'سُبْحَانَ رَبِّيَ الْأَعْلَى', count: 3, note: 'ذكر السجود' },
  ]},
  { id: 6, title: 'أذكار السفر', icon: '✈️', count: 8, adhkar: [
    { text: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ', count: 1, note: 'عند ركوب وسيلة المواصلات' },
  ]},
]

export default function HisnMuslimPage() {
  const [activeSection, setActiveSection] = useState(1)
  const [counts, setCounts] = useState<Record<string, number>>({})

  const section = HISN_SECTIONS.find(s => s.id === activeSection)!

  const increment = (key: string, max: number) => {
    setCounts(prev => {
      const cur = prev[key] ?? 0
      return { ...prev, [key]: cur >= max ? 0 : cur + 1 }
    })
  }

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-3">حصن المسلم</h1>
          <p className="text-gold-300">من أذكار الكتاب والسنة — للشيخ سعيد بن وهف القحطاني</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-56 flex-shrink-0">
          <div className="card-islamic overflow-hidden sticky top-20">
            {HISN_SECTIONS.map(sec => (
              <button
                key={sec.id}
                onClick={() => { setActiveSection(sec.id); setCounts({}) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-right transition-colors border-b border-gold-200/20 dark:border-gold-800/20 last:border-0 ${activeSection === sec.id ? 'bg-gold-400 text-islamic-navy font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gold-50 dark:hover:bg-gold-900/10'}`}
              >
                <span>{sec.icon}</span>
                <span className="font-arabic flex-1">{sec.title}</span>
                <span className="text-xs opacity-70">{sec.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5">
          <h2 className="font-arabic text-2xl font-bold text-islamic-green dark:text-gold-300 flex items-center gap-3">
            <span>{section.icon}</span> {section.title}
          </h2>

          {section.adhkar.map((dhikr, i) => {
            const key = `${activeSection}-${i}`
            const current = counts[key] ?? 0
            const done = current >= dhikr.count

            return (
              <div key={i} className={`card-islamic p-7 transition-all ${done ? 'border-green-400/50 bg-green-50/30 dark:bg-green-900/5' : ''}`}>
                {dhikr.note && (
                  <div className="text-xs text-gold-500 dark:text-gold-400 mb-3 font-medium">📌 {dhikr.note}</div>
                )}
                <p className="font-arabic text-xl md:text-2xl leading-loose text-gray-900 dark:text-gray-100 text-center mb-6 whitespace-pre-line">
                  {dhikr.text}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    {dhikr.count > 1 ? `${dhikr.count} مرة` : 'مرة واحدة'}
                  </div>
                  <div className="flex items-center gap-4">
                    {dhikr.count > 1 && (
                      <div className="text-center">
                        <div className={`text-3xl font-bold font-arabic ${done ? 'text-green-500' : 'text-gold-500'}`}>{current}</div>
                        <div className="text-xs text-gray-400">من {dhikr.count}</div>
                      </div>
                    )}
                    <button
                      onClick={() => increment(key, dhikr.count)}
                      disabled={done}
                      className={`counter-btn ${done ? 'bg-green-500 cursor-default' : ''}`}
                    >
                      {done ? '✓' : '+'}
                    </button>
                  </div>
                </div>

                {dhikr.count > 1 && (
                  <div className="mt-4 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${done ? 'bg-green-500' : 'bg-gold-400'}`}
                      style={{ width: `${(current / dhikr.count) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
