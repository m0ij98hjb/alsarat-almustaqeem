import { dailyVerses } from '@/data/dailyVerses'
import { HADITHS } from '@/data/hadiths'
import { ADHKAR_CATEGORIES } from '@/data/adhkar'
import { dailyIndex } from './dailyPick'

export function DailyInspiration({ locale }: { locale: string }) {
  const verse = dailyVerses[dailyIndex(dailyVerses.length)]
  const hadith = HADITHS[dailyIndex(HADITHS.length)]

  // pick a category, then an item within it, using two independent offsets
  const category = ADHKAR_CATEGORIES[dailyIndex(ADHKAR_CATEGORIES.length)]
  const dua = category.items[dailyIndex(category.items.length) % category.items.length]

  return (
    <section className="py-20 bg-islamic-navy-mid">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-header">
          <h2 className="text-white">{locale === 'ar' ? 'إلهام اليوم' : 'Daily Inspiration'}</h2>
          <p className="text-gray-300">
            {locale === 'ar' ? 'آية وحديث ودعاء يتجدد كل يوم' : 'A verse, a hadith, and a dua — refreshed daily'}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card-islamic p-6 text-center">
            <div className="text-2xl mb-3">📖</div>
            <p className="quran-text text-islamic-navy dark:text-white text-lg leading-loose mb-3">﴿ {verse.arabic} ﴾</p>
            <p className="text-xs text-gold-500">{verse.ref}</p>
          </div>
          <div className="card-islamic p-6 text-center">
            <div className="text-2xl mb-3">📜</div>
            <p className="font-arabic text-islamic-navy dark:text-white text-base leading-relaxed mb-3">«{hadith.text}»</p>
            <p className="text-xs text-gold-500">{hadith.source}</p>
          </div>
          <div className="card-islamic p-6 text-center">
            <div className="text-2xl mb-3">🤲</div>
            <p className="font-arabic text-islamic-navy dark:text-white text-base leading-relaxed mb-3">{dua.text}</p>
            <p className="text-xs text-gold-500">{category.title}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
