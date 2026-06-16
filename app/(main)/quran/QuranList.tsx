'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

const REVELATION_AR: Record<string, string> = {
  Meccan: 'مكية',
  Medinan: 'مدنية',
}

function cleanName(name: string) {
  return name.replace(/^سُورَةُ\s*/, '').replace(/^سورة\s*/,'').trim()
}

export function QuranList({ surahs }: { surahs: Surah[] }) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? surahs.filter(s =>
        cleanName(s.name).includes(query.trim()) ||
        s.name.includes(query.trim()) ||
        s.englishName.toLowerCase().includes(query.trim().toLowerCase()) ||
        String(s.number) === query.trim()
      )
    : surahs

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      {/* Header */}
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="font-arabic text-gold-300 text-2xl mb-4">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">القرآن الكريم</h1>
          <p className="text-gray-300">كلام الله المُنزَّل على سيدنا محمد ﷺ — ١١٤ سورة — ٦٢٣٦ آية</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="ابحث عن سورة بالاسم أو الرقم..."
              className="search-input text-lg py-4"
              dir="auto"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold-400 transition-colors text-lg"
              >
                ✕
              </button>
            )}
          </div>
          {query && (
            <p className="text-center text-sm text-gray-400 mt-2">
              {filtered.length > 0 ? `${filtered.length} نتيجة` : 'لم يتم العثور على سورة'}
            </p>
          )}
        </div>

        {/* Stats */}
        {!query && (
          <div className="flex justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500">١١٤</div>
              <div className="text-xs text-gray-400">سورة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500">٦٢٣٦</div>
              <div className="text-xs text-gray-400">آية</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500">٣٠</div>
              <div className="text-xs text-gray-400">جزء</div>
            </div>
          </div>
        )}

        {/* Surahs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map(surah => (
            <Link
              key={surah.number}
              href={`/quran/${surah.number}`}
              className="card-islamic p-4 text-center group hover:border-gold-400 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-xs font-bold text-gold-700 dark:text-gold-400">{surah.number}</span>
              </div>
              <div className="font-arabic text-base font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 mb-1 leading-normal">
                {cleanName(surah.name)}
              </div>
              <div className="text-xs text-gray-400 mb-1 truncate">{surah.englishName}</div>
              <div className="flex items-center justify-center gap-1 mt-2 flex-wrap">
                <span className="text-xs text-gray-500">{surah.numberOfAyahs} آية</span>
                <span className="text-xs text-gray-300 dark:text-gray-600">·</span>
                <span className={`text-xs ${surah.revelationType === 'Meccan' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {REVELATION_AR[surah.revelationType] || surah.revelationType}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-arabic text-xl">لم يتم العثور على سورة بهذا الاسم</p>
            <button onClick={() => setQuery('')} className="mt-4 text-gold-400 hover:text-gold-300 text-sm">
              مسح البحث
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
