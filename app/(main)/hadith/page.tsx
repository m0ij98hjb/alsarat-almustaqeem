import type { Metadata } from 'next'
import Link from 'next/link'
import { HADITH_GRADE_LABELS } from '@/utils'

export const metadata: Metadata = {
  title: 'الأحاديث النبوية',
  description: 'صحيح البخاري ومسلم والسنن الكبرى كاملةً مع البحث والتصنيف',
}

const BOOKS = [
  { id: 1, slug: 'bukhari',  nameArabic: 'صحيح البخاري', nameEnglish: 'Sahih al-Bukhari', author: 'الإمام البخاري',     totalHadiths: 7563, icon: '📗' },
  { id: 2, slug: 'muslim',   nameArabic: 'صحيح مسلم',    nameEnglish: 'Sahih Muslim',      author: 'الإمام مسلم',       totalHadiths: 5362, icon: '📘' },
  { id: 3, slug: 'abudawud', nameArabic: 'سنن أبي داود', nameEnglish: 'Sunan Abu Dawud',   author: 'الإمام أبو داود',   totalHadiths: 5274, icon: '📕' },
  { id: 4, slug: 'tirmidhi', nameArabic: 'جامع الترمذي', nameEnglish: 'Jami al-Tirmidhi', author: 'الإمام الترمذي',    totalHadiths: 3956, icon: '📙' },
  { id: 5, slug: 'nasai',    nameArabic: 'سنن النسائي',  nameEnglish: 'Sunan al-Nasai',    author: 'الإمام النسائي',    totalHadiths: 5761, icon: '📒' },
  { id: 6, slug: 'ibnmajah', nameArabic: 'سنن ابن ماجه', nameEnglish: 'Sunan Ibn Majah',  author: 'الإمام ابن ماجه',   totalHadiths: 4341, icon: '📓' },
]

const SAMPLE_HADITHS = [
  { id: 1, textArabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى', narrator: 'عمر بن الخطاب', grade: 'SAHIH', book: 'صحيح البخاري', hadithNum: 1 },
  { id: 2, textArabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', narrator: 'أبو هريرة', grade: 'SAHIH', book: 'صحيح البخاري', hadithNum: 6018 },
  { id: 3, textArabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', narrator: 'عثمان بن عفان', grade: 'SAHIH', book: 'صحيح البخاري', hadithNum: 5027 },
  { id: 4, textArabic: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ', narrator: 'أبو ذر الغفاري', grade: 'HASAN', book: 'جامع الترمذي', hadithNum: 1987 },
]

export default function HadithPage() {
  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">الأحاديث النبوية الشريفة</h1>
          <p className="text-gold-300 text-xl font-arabic">قَالَ رَسُولُ اللَّهِ ﷺ</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-arabic text-2xl font-bold text-islamic-green dark:text-gold-300 mb-6 text-center">كتب الحديث</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {BOOKS.map(book => (
            <Link
              key={book.id}
              href={`/hadith/${book.slug}`}
              className="card-islamic p-6 flex items-center gap-4 hover:border-gold-400 group"
            >
              <span className="text-4xl">{book.icon}</span>
              <div>
                <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500">{book.nameArabic}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-xs text-gold-500 mt-1">{book.totalHadiths.toLocaleString('ar-SA')} حديث</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="font-arabic text-2xl font-bold text-islamic-green dark:text-gold-300 mb-6 text-center">أحاديث مختارة</h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {SAMPLE_HADITHS.map(h => (
            <div key={h.id} className="card-hadith">
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className={`grade-${h.grade.toLowerCase()}`}>{HADITH_GRADE_LABELS[h.grade]}</span>
                <span className="text-xs text-gray-500">{h.book} — #{h.hadithNum}</span>
              </div>
              <p className="font-arabic text-xl leading-loose text-gray-900 dark:text-gray-100 mb-3">
                «{h.textArabic}»
              </p>
              <p className="text-sm text-gray-500">رواه: {h.narrator} رضي الله عنه</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
