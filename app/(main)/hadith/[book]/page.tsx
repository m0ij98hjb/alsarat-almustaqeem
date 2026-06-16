import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { HADITH_GRADE_LABELS } from '@/utils'

interface Props { params: Promise<{ book: string }> }

const BOOKS_META: Record<string, { name: string; author: string; desc: string; icon: string; total: number }> = {
  bukhari:  { name: 'صحيح البخاري',  author: 'محمد بن إسماعيل البخاري (194-256هـ)',  icon: '📗', total: 7563, desc: 'أصح كتاب بعد القرآن الكريم، جمعه الإمام البخاري من 600,000 حديث في 16 سنة' },
  muslim:   { name: 'صحيح مسلم',     author: 'مسلم بن الحجاج النيسابوري (204-261هـ)', icon: '📘', total: 5362, desc: 'ثاني أصح الكتب، يتميز بترتيبه الدقيق وتجميعه طرق الحديث في موضع واحد' },
  abudawud: { name: 'سنن أبي داود',  author: 'سليمان بن الأشعث (202-275هـ)',          icon: '📕', total: 5274, desc: 'يركز على أحاديث الأحكام والفقه، قال عنه الإمام أحمد: كفى الإنسان في دينه أربعة أحاديث منه' },
  tirmidhi: { name: 'جامع الترمذي', author: 'محمد بن عيسى الترمذي (209-279هـ)',      icon: '📙', total: 3956, desc: 'يجمع بين الصحيح والضعيف مع بيان درجة كل حديث وآراء الفقهاء' },
  nasai:    { name: 'سنن النسائي',   author: 'أحمد بن شعيب النسائي (215-303هـ)',      icon: '📒', total: 5761, desc: 'أشد الكتب الستة نقداً للرواة، متخصص في أحاديث الصلاة والعبادات' },
  ibnmajah: { name: 'سنن ابن ماجه', author: 'محمد بن يزيد ابن ماجه (209-273هـ)',     icon: '📓', total: 4341, desc: 'يحتوي على أحاديث لا توجد في بقية الكتب الخمسة مما يجعله ذا قيمة فريدة' },
}

const SAMPLE_HADITHS: Record<string, any[]> = {
  bukhari: [
    { id: 1,    num: 1,    text: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى', narrator: 'عمر بن الخطاب', grade: 'SAHIH', chapter: 'كتاب بدء الوحي' },
    { id: 8,    num: 8,    text: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَصَوْمِ رَمَضَانَ، وَحَجِّ الْبَيْتِ', narrator: 'ابن عمر', grade: 'SAHIH', chapter: 'كتاب الإيمان' },
    { id: 52,   num: 52,   text: 'سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ: الحَلاَلُ بَيِّنٌ وَالحَرَامُ بَيِّنٌ', narrator: 'النعمان بن بشير', grade: 'SAHIH', chapter: 'كتاب الإيمان' },
    { id: 6018, num: 6018, text: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', narrator: 'أبو هريرة', grade: 'SAHIH', chapter: 'كتاب الأدب' },
    { id: 5027, num: 5027, text: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', narrator: 'عثمان بن عفان', grade: 'SAHIH', chapter: 'كتاب فضائل القرآن' },
  ],
  muslim: [
    { id: 2674, num: 45,  text: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ', narrator: 'أنس بن مالك', grade: 'SAHIH', chapter: 'كتاب الإيمان' },
    { id: 2699, num: 70,  text: 'الدِّينُ النَّصِيحَةُ', narrator: 'تميم الداري', grade: 'SAHIH', chapter: 'كتاب الإيمان' },
    { id: 2742, num: 113, text: 'إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى أَجْسَامِكُمْ وَلاَ إِلَى صُوَرِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ', narrator: 'أبو هريرة', grade: 'SAHIH', chapter: 'كتاب البر والصلة' },
  ],
}

async function getBookData(slug: string) {
  try {
    const book = await prisma.hadithBook.findUnique({
      where: { slug },
      include: { hadiths: { take: 20, include: { chapter: true } } },
    })
    return book
  } catch { return null }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book } = await params
  const meta = BOOKS_META[book]
  if (!meta) return { title: 'كتاب غير موجود' }
  return { title: meta.name, description: meta.desc }
}

export default async function HadithBookPage({ params }: Props) {
  const { book } = await params
  const slug = book
  const meta = BOOKS_META[slug]
  if (!meta) notFound()

  const dbBook = await getBookData(slug)
  const hadiths = dbBook?.hadiths?.length ? dbBook.hadiths : (SAMPLE_HADITHS[slug] || SAMPLE_HADITHS.bukhari)

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      {/* Header */}
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">{meta.icon}</div>
          <h1 className="font-arabic text-white text-5xl font-bold mb-3">{meta.name}</h1>
          <p className="text-gold-300 mb-2">{meta.author}</p>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">{meta.desc}</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/30 rounded-full px-4 py-1.5">
            <span className="text-gold-300 font-arabic">{meta.total.toLocaleString('ar-SA')} حديث</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search within book */}
        <div className="relative mb-10">
          <input
            type="text"
            placeholder={`ابحث في ${meta.name}...`}
            className="search-input"
          />
        </div>

        {/* Hadiths list */}
        <div className="space-y-4">
          {hadiths.map((h: any, i: number) => (
            <Link
              key={i}
              href={`/hadith/${slug}/${h.id || i + 1}`}
              className="card-hadith block group hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className={`grade-${(h.grade || 'SAHIH').toLowerCase()}`}>
                    {HADITH_GRADE_LABELS[h.grade || 'SAHIH']}
                  </span>
                  {h.chapter && (
                    <span className="text-xs text-gray-400 hidden sm:inline">{h.chapter?.nameArabic || h.chapter}</span>
                  )}
                </div>
                <span className="text-xs text-gray-400 font-arabic">#{h.hadithNum || h.num || i + 1}</span>
              </div>
              <p className="font-arabic text-xl leading-loose text-gray-900 dark:text-gray-100 mb-3 group-hover:text-islamic-green dark:group-hover:text-gold-300 transition-colors">
                «{h.textArabic || h.text}»
              </p>
              <p className="text-sm text-gray-500">
                رواه: {h.narrator} — {meta.name}
              </p>
            </Link>
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="flex justify-center gap-2 mt-10">
          {[1,2,3,4,5].map(p => (
            <button key={p} className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${p === 1 ? 'bg-gold-400 text-islamic-navy' : 'bg-white dark:bg-gray-900 border border-gold-200 dark:border-gold-800/50 text-gray-600 dark:text-gray-300 hover:border-gold-400'}`}>
              {p}
            </button>
          ))}
        </div>

        <Link href="/hadith" className="block text-center mt-6 text-gold-500 hover:text-gold-400 text-sm transition-colors">
          ← العودة لكتب الحديث
        </Link>
      </div>
    </div>
  )
}
