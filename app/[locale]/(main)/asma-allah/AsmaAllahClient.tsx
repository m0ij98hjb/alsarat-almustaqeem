'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ASMA_ALLAH } from '@/data/asmaAllah'

export default function AsmaAllahClient() {
  const t = useTranslations('asmaAllah')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.trim()
    if (!query) return ASMA_ALLAH
    return ASMA_ALLAH.filter(
      (n) =>
        n.nameArabic.includes(query) ||
        n.nameEnglish.toLowerCase().includes(query.toLowerCase()) ||
        n.meaning.includes(query)
    )
  }, [search])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8 max-w-xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full px-5 py-3 rounded-full border border-gold-200 dark:border-gold-800/50 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gold-400"
        />
        <p className="text-center text-xs text-gray-400 mt-2">{t('resultsCount', { count: filtered.length })}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((name) => (
          <div key={name.number} className="card-islamic p-6 hover:border-gold-400 transition-all">
            <div className="flex items-start gap-3 mb-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 text-xs font-bold flex items-center justify-center">
                {name.number}
              </span>
              <div>
                <h3 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300">{name.nameArabic}</h3>
                <p className="text-xs text-gray-400">{name.nameEnglish}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gold-600 dark:text-gold-400 mb-2">{name.meaning}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{name.explanation}</p>
            {name.quranRef && (
              <p className="text-xs text-gray-400 mt-3">📖 {name.quranRef}</p>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-400">{t('noResults')}</p>
        )}
      </div>
    </div>
  )
}
