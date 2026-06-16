import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { toArabicNum } from '@/utils'

interface Props { params: Promise<{ surahId: string }> }

async function getSurah(id: number) {
  try {
    const surah = await prisma.surah.findUnique({
      where: { id },
      include: { ayahs: { orderBy: { numberInSurah: 'asc' } } },
    })
    return surah
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { surahId } = await params
  const id = parseInt(surahId)
  const surah = await getSurah(id)
  if (!surah) return { title: 'سورة غير موجودة' }
  return {
    title: `سورة ${surah.nameArabic}`,
    description: `سورة ${surah.nameArabic} — ${surah.ayahCount} آية — ${surah.revelation}`,
  }
}

// Demo ayahs for Al-Fatiha when DB is empty
const FATIHA_AYAHS = [
  { numberInSurah: 1, textUthmani: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ', page: 1 },
  { numberInSurah: 2, textUthmani: 'ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ', page: 1 },
  { numberInSurah: 3, textUthmani: 'ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ', page: 1 },
  { numberInSurah: 4, textUthmani: 'مَٰلِكِ يَوۡمِ ٱلدِّينِ', page: 1 },
  { numberInSurah: 5, textUthmani: 'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ', page: 1 },
  { numberInSurah: 6, textUthmani: 'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ', page: 1 },
  { numberInSurah: 7, textUthmani: 'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ', page: 1 },
]

export default async function SurahPage({ params }: Props) {
  const { surahId } = await params
  const id = parseInt(surahId)
  if (isNaN(id) || id < 1 || id > 114) notFound()

  const surah = await getSurah(id)
  const ayahs = surah?.ayahs.length ? surah.ayahs : (id === 1 ? FATIHA_AYAHS : [])
  const surahName = surah?.nameArabic || `السورة ${id}`
  const revelation = surah?.revelation || 'مكية'
  const ayahCount = surah?.ayahCount || ayahs.length

  const hasBismillah = id !== 1 && id !== 9

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      {/* Surah header */}
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="text-sm text-gold-400 mb-2">السورة {toArabicNum(id)}</div>
          <h1 className="font-arabic text-white text-5xl md:text-6xl font-bold mb-4">{surahName}</h1>
          <div className="flex items-center justify-center gap-6 text-gray-300 text-sm">
            <span>📍 {revelation}</span>
            <span>📖 {toArabicNum(ayahCount)} آية</span>
            <span>📄 صفحة {toArabicNum(surah?.page || 1)}</span>
          </div>
          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {id > 1 && (
              <a href={`/quran/${id - 1}`} className="btn-outline-gold text-sm px-4 py-2">
                ← السابقة
              </a>
            )}
            <a href="/quran" className="btn-outline-gold text-sm px-4 py-2">القائمة</a>
            {id < 114 && (
              <a href={`/quran/${id + 1}`} className="btn-outline-gold text-sm px-4 py-2">
                التالية →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bismillah */}
      {hasBismillah && (
        <div className="text-center py-8 bg-white dark:bg-islamic-navy-mid border-b border-gold-200/30 dark:border-gold-800/20">
          <p className="font-arabic text-islamic-green dark:text-gold-300 text-3xl">
            بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>
      )}

      {/* Ayahs */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {ayahs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📖</div>
            <p className="font-arabic text-xl">سيتم تحميل الآيات بعد إعداد قاعدة البيانات</p>
            <p className="text-sm mt-2">قم بتشغيل: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm run db:seed</code></p>
          </div>
        ) : (
          <div className="space-y-6">
            {ayahs.map((ayah: any) => (
              <div
                key={ayah.numberInSurah}
                id={`ayah-${ayah.numberInSurah}`}
                className="card-islamic p-6 group"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Ayah actions */}
                  <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg bg-gold-100 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 hover:bg-gold-200 transition-colors text-xs" title="نسخ">
                      📋
                    </button>
                    <button className="p-1.5 rounded-lg bg-gold-100 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 hover:bg-gold-200 transition-colors text-xs" title="مشاركة">
                      🔗
                    </button>
                    <a
                      href={`/quran/${id}/${ayah.numberInSurah}`}
                      className="p-1.5 rounded-lg bg-gold-100 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 hover:bg-gold-200 transition-colors text-xs"
                      title="تفسير"
                    >
                      📚
                    </a>
                  </div>

                  {/* Ayah text */}
                  <p className="quran-text flex-1 text-gray-900 dark:text-gray-100">
                    {ayah.textUthmani}
                    {' '}
                    <span className="ayah-num">{toArabicNum(ayah.numberInSurah)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
