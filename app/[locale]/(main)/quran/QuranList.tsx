'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

interface Props {
  surahs: Surah[]
  locale: string
}

export default function QuranList({ surahs, locale }: Props) {
  const t = useTranslations('quran')
  const [query, setQuery] = useState('')

  const filtered = surahs.filter(s =>
    s.name.includes(query) ||
    s.englishName.toLowerCase().includes(query.toLowerCase()) ||
    String(s.number).includes(query)
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative max-w-xl mx-auto mb-10">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="input-islamic w-full ps-5 pe-12"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold-400"
          >
            ✕
          </button>
        )}
      </div>

      {query && (
        <p className="text-center text-gray-500 text-sm mb-6">
          {t('resultsCount', { count: filtered.length })}
        </p>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-20">{t('noResults')}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(surah => (
            <Link
              key={surah.number}
              href={`/${locale}/quran/${surah.number}`}
              className="card-islamic p-5 text-center hover:border-gold-400 group"
            >
              <div className="w-10 h-10 rounded-full bg-gold-100 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-sm font-bold mx-auto mb-3">
                {surah.number}
              </div>
              <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 mb-1">
                {surah.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2">{surah.englishName}</p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>{surah.numberOfAyahs} {t('ayahsCount')}</span>
                <span>·</span>
                <span>{surah.revelationType === 'Meccan' ? t('meccan') : t('medinan')}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
