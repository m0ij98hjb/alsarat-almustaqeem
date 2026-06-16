import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { toArabicNum } from '@/utils'

interface Props { params: Promise<{ surahId: string }> }

interface Ayah {
  number: number
  text: string
  numberInSurah: number
  page: number
  juz: number
}

interface SurahData {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  revelationType: string
  numberOfAyahs: number
  ayahs: Ayah[]
}

const REVELATION_AR: Record<string, string> = { Meccan: 'مكية', Medinan: 'مدنية' }

function cleanName(name: string) {
  return name.replace(/^سُورَةُ\s*/, '').replace(/^سورة\s*/, '').trim()
}

async function getSurahData(id: number): Promise<SurahData | null> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.uthmani`, {
      next: { revalidate: 86400 },
    })
    if (!res.ok) throw new Error()
    const data = await res.json()
    if (data.code === 200) return data.data
    throw new Error()
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { surahId } = await params
  const id = parseInt(surahId)
  if (isNaN(id) || id < 1 || id > 114) return { title: 'سورة غير موجودة' }
  const surah = await getSurahData(id)
  if (!surah) return { title: `السورة ${id} — القرآن الكريم` }
  const name = cleanName(surah.name)
  return {
    title: `سورة ${name} — القرآن الكريم`,
    description: `${name} — ${REVELATION_AR[surah.revelationType] || surah.revelationType} — ${surah.numberOfAyahs} آية`,
  }
}

export default async function SurahPage({ params }: Props) {
  const { surahId } = await params
  const id = parseInt(surahId)
  if (isNaN(id) || id < 1 || id > 114) notFound()

  const surah = await getSurahData(id)

  if (!surah) {
    return (
      <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="font-arabic text-xl text-gray-600 dark:text-gray-300 mb-6">
            تعذّر تحميل السورة، يرجى المحاولة مرة أخرى
          </p>
          <Link href="/quran" className="btn-outline-gold px-6 py-2">
            العودة لقائمة السور
          </Link>
        </div>
      </div>
    )
  }

  const surahName = cleanName(surah.name)
  const hasBismillah = id !== 1 && id !== 9

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      {/* Header */}
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="text-sm text-gold-400 mb-2">السورة {toArabicNum(id)}</div>
          <h1 className="font-arabic text-white text-5xl md:text-6xl font-bold mb-4">{surahName}</h1>
          <p className="text-gray-300 text-sm mb-1 font-latin">{surah.englishName}</p>
          <div className="flex items-center justify-center gap-6 text-gray-300 text-sm mt-3">
            <span>📍 {REVELATION_AR[surah.revelationType] || surah.revelationType}</span>
            <span>📖 {toArabicNum(surah.numberOfAyahs)} آية</span>
          </div>
          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {id > 1 && (
              <Link href={`/quran/${id - 1}`} className="btn-outline-gold text-sm px-4 py-2">← السابقة</Link>
            )}
            <Link href="/quran" className="btn-outline-gold text-sm px-4 py-2">القائمة</Link>
            {id < 114 && (
              <Link href={`/quran/${id + 1}`} className="btn-outline-gold text-sm px-4 py-2">التالية →</Link>
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
        <div className="space-y-6">
          {surah.ayahs.map(ayah => (
            <div
              key={ayah.numberInSurah}
              id={`ayah-${ayah.numberInSurah}`}
              className="card-islamic p-6 group"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Actions */}
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                  <Link
                    href={`/quran/${id}/${ayah.numberInSurah}`}
                    className="p-1.5 rounded-lg bg-gold-100 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 hover:bg-gold-200 transition-colors text-xs"
                    title="تفسير الآية"
                  >
                    📚
                  </Link>
                  <div className="text-xs text-gray-400 text-center">ص {ayah.page}</div>
                </div>

                {/* Ayah text */}
                <p className="quran-text flex-1 text-gray-900 dark:text-gray-100 leading-loose text-right">
                  {ayah.text}
                  {' '}
                  <span className="ayah-num">{toArabicNum(ayah.numberInSurah)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom navigation */}
        <div className="flex justify-between mt-10 pt-6 border-t border-gold-200/30 dark:border-gold-800/20">
          {id > 1 ? (
            <Link href={`/quran/${id - 1}`} className="btn-outline-gold text-sm px-5 py-2">← السورة السابقة</Link>
          ) : <div />}
          {id < 114 && (
            <Link href={`/quran/${id + 1}`} className="btn-outline-gold text-sm px-5 py-2">السورة التالية →</Link>
          )}
        </div>
      </div>
    </div>
  )
}
