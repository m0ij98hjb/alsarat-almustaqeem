'use client'

import { useState } from 'react'

const ADHKAR_CATEGORIES = [
  { key: 'MORNING',  label: 'أذكار الصباح',       icon: '🌅' },
  { key: 'EVENING',  label: 'أذكار المساء',        icon: '🌆' },
  { key: 'SLEEP',    label: 'أذكار النوم',         icon: '🌙' },
  { key: 'WAKE_UP',  label: 'أذكار الاستيقاظ',    icon: '☀️' },
  { key: 'PRAYER',   label: 'أذكار الصلاة',        icon: '🕌' },
  { key: 'TRAVEL',   label: 'أذكار السفر',         icon: '✈️' },
  { key: 'FOOD',     label: 'أذكار الطعام',        icon: '🍽️' },
  { key: 'GENERAL',  label: 'أذكار عامة',          icon: '📿' },
]

const ADHKAR_DATA: Record<string, { text: string; count: number; source: string; virtue?: string }[]> = {
  MORNING: [
    { text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', count: 1, source: 'أبو داود', virtue: 'من قالها حين يصبح أُعطي خير ذلك اليوم' },
    { text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ', count: 1, source: 'أبو داود' },
    { text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ', count: 1, source: 'البخاري', virtue: 'من قالها موقناً بها فمات من يومه دخل الجنة' },
    { text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', count: 100, source: 'مسلم', virtue: 'من قالها مائة مرة حُطّت خطاياه وإن كانت مثل زبد البحر' },
  ],
  EVENING: [
    { text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', count: 1, source: 'أبو داود' },
    { text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ', count: 1, source: 'أبو داود' },
    { text: 'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ', count: 4, source: 'أبو داود', virtue: 'أعتقه الله من النار' },
  ],
  SLEEP: [
    { text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', count: 1, source: 'البخاري' },
    { text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ', count: 3, source: 'أبو داود' },
    { text: 'سُبْحَانَ اللَّهِ', count: 33, source: 'البخاري' },
    { text: 'الْحَمْدُ لِلَّهِ', count: 33, source: 'البخاري' },
    { text: 'اللَّهُ أَكْبَرُ', count: 34, source: 'البخاري', virtue: 'خير من خادم' },
  ],
  PRAYER: [
    { text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ', count: 1, source: 'أبو داود' },
    { text: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ', count: 3, source: 'مسلم' },
    { text: 'سُبْحَانَ رَبِّيَ الْأَعْلَى', count: 3, source: 'مسلم' },
    { text: 'رَبِّ اغْفِرْ لِي', count: 1, source: 'البخاري' },
  ],
  WAKE_UP: [
    { text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', count: 1, source: 'البخاري' },
    { text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', count: 1, source: 'البخاري' },
  ],
  TRAVEL: [
    { text: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ', count: 1, source: 'مسلم' },
    { text: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى', count: 1, source: 'مسلم' },
  ],
  FOOD: [
    { text: 'بِسْمِ اللَّهِ', count: 1, source: 'أبو داود', virtue: 'بركة الطعام' },
    { text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ', count: 1, source: 'أبو داود' },
  ],
  GENERAL: [
    { text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ', count: 1, source: 'البخاري', virtue: 'كلمتان خفيفتان على اللسان ثقيلتان في الميزان' },
    { text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', count: 10, source: 'مسلم', virtue: 'كانت له عدل عشر رقاب' },
  ],
}

export default function AdhkarPage() {
  const [activeCategory, setActiveCategory] = useState('MORNING')
  const [counts, setCounts] = useState<Record<string, number>>({})

  const adhkar = ADHKAR_DATA[activeCategory] || []

  const increment = (key: string, max: number) => {
    setCounts(prev => {
      const cur = prev[key] ?? 0
      return cur >= max ? { ...prev, [key]: 0 } : { ...prev, [key]: cur + 1 }
    })
  }

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      {/* Header */}
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">الأذكار والأدعية</h1>
          <p className="text-gold-300">حصن المسلم — أذكار مأثورة عن النبي ﷺ</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {ADHKAR_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setCounts({}) }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-gold-400 text-islamic-navy shadow-lg shadow-gold-300/30'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gold-200 dark:border-gold-800/50 hover:border-gold-400'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Adhkar */}
        <div className="space-y-6">
          {adhkar.map((dhikr, i) => {
            const key = `${activeCategory}-${i}`
            const current = counts[key] ?? 0
            const done = current >= dhikr.count

            return (
              <div
                key={i}
                className={`card-islamic p-8 transition-all ${done ? 'border-green-400/50 bg-green-50/50 dark:bg-green-900/10' : ''}`}
              >
                {/* Text */}
                <p className="font-arabic text-2xl text-center text-gray-900 dark:text-gray-100 leading-loose mb-6">
                  {dhikr.text}
                </p>

                {/* Virtue */}
                {dhikr.virtue && (
                  <div className="bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800/40 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gold-700 dark:text-gold-400 text-center">✨ {dhikr.virtue}</p>
                  </div>
                )}

                {/* Counter */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    المصدر: {dhikr.source}
                  </div>
                  <div className="flex items-center gap-4">
                    {dhikr.count > 1 && (
                      <div className="text-center">
                        <div className="text-3xl font-bold font-arabic text-gold-500">{current}</div>
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

                {/* Progress bar */}
                {dhikr.count > 1 && (
                  <div className="mt-4 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold-400 rounded-full transition-all duration-300"
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
