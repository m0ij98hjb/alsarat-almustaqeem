import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { HADITH_GRADE_LABELS } from '@/utils'

interface Props { params: Promise<{ book: string; id: string }> }

const BOOKS_META: Record<string, string> = {
  bukhari: 'صحيح البخاري', muslim: 'صحيح مسلم', abudawud: 'سنن أبي داود',
  tirmidhi: 'جامع الترمذي', nasai: 'سنن النسائي', ibnmajah: 'سنن ابن ماجه',
}

const DEMO_HADITH = {
  textArabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ',
  narrator: 'عمر بن الخطاب رضي الله عنه',
  grade: 'SAHIH',
  explanation: `هذا الحديث العظيم من جوامع الكلم التي أوتيها النبي صلى الله عليه وسلم. وقد قال الإمام الشافعي وأحمد والبخاري وغيرهم: هذا الحديث ثُلث العلم.

وجه كون الأعمال بالنيات: أن الفعل الواحد يختلف حكمه باختلاف نية صاحبه، فالاغتسال مثلاً قد يكون فريضة بنية رفع الحدث، وقد يكون سنة بنية التبرد، فالنية هي التي تُميّز العادات عن العبادات.

والمراد بالأعمال هنا الأعمال الشرعية، والمراد بالنيات القصد الذي يُميّز العمل.`,
  tags: ['النية', 'الأعمال', 'الإخلاص'],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book, id } = await params
  const bookName = BOOKS_META[book] || book
  return { title: `حديث #${id} — ${bookName}` }
}

export default async function HadithDetailPage({ params }: Props) {
  const { book, id } = await params
  const bookSlug = book
  const hadithId = parseInt(id)
  const bookName = BOOKS_META[bookSlug]
  if (!bookName) notFound()

  let hadith: any = null
  try {
    hadith = await prisma.hadith.findUnique({
      where: { id: hadithId },
      include: { book: true, chapter: true },
    })
  } catch {}

  const h = hadith || DEMO_HADITH

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      {/* Header */}
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-6 justify-center">
            <Link href="/hadith" className="hover:text-gold-300 transition-colors">الأحاديث</Link>
            <span>/</span>
            <Link href={`/hadith/${bookSlug}`} className="hover:text-gold-300 transition-colors">{bookName}</Link>
            <span>/</span>
            <span className="text-gold-300">حديث #{id}</span>
          </div>
          <div className="text-center">
            <div className={`inline-block grade-${(h.grade || 'SAHIH').toLowerCase()} text-base px-4 py-1 mb-6`}>
              {HADITH_GRADE_LABELS[h.grade || 'SAHIH']}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        {/* Main hadith text */}
        <div className="card-islamic p-8 border-r-4 border-gold-400">
          <p className="font-arabic text-2xl md:text-3xl leading-loose text-gray-900 dark:text-gray-100 text-center">
            «{h.textArabic}»
          </p>
          <div className="text-center mt-6 pt-4 border-t border-gold-200/30 dark:border-gold-800/20">
            <p className="text-gray-500">
              رواه: <span className="text-gold-600 dark:text-gold-400 font-medium">{h.narrator}</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {h.book?.nameArabic || bookName}
              {h.chapter?.nameArabic && ` — ${h.chapter.nameArabic}`}
            </p>
          </div>
        </div>

        {/* Explanation */}
        {h.explanation && (
          <div className="card-islamic p-8">
            <h2 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300 mb-4 flex items-center gap-2">
              <span>📖</span> شرح الحديث
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-loose text-lg font-naskh whitespace-pre-line">
              {h.explanation}
            </p>
          </div>
        )}

        {/* Tags */}
        {h.tags?.length > 0 && (
          <div className="card-islamic p-6">
            <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 mb-3">الموضوعات</h3>
            <div className="flex flex-wrap gap-2">
              {h.tags.map((tag: string) => (
                <span key={tag} className="bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="btn-outline-gold text-sm px-5 py-2 flex items-center gap-2">📋 نسخ</button>
          <button className="btn-outline-gold text-sm px-5 py-2 flex items-center gap-2">🔗 مشاركة</button>
          <button className="btn-outline-gold text-sm px-5 py-2 flex items-center gap-2">🔖 مفضلة</button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          {hadithId > 1 && (
            <Link href={`/hadith/${bookSlug}/${hadithId - 1}`} className="btn-outline-gold text-sm px-4 py-2">
              ← السابق
            </Link>
          )}
          <Link href={`/hadith/${bookSlug}/${hadithId + 1}`} className="btn-outline-gold text-sm px-4 py-2 mr-auto">
            التالي →
          </Link>
        </div>
      </div>
    </div>
  )
}
