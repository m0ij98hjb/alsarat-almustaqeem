'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ADHKAR_CATEGORIES } from '@/data/adhkar'

export default function AdhkarPage() {
  const t = useTranslations('adhkar')
  const [search, setSearch] = useState('')
  const [activeKey, setActiveKey] = useState(ADHKAR_CATEGORIES[0].key)
  const [counts, setCounts] = useState<Record<string, number>>({})

  const filteredCategories = useMemo(() => {
    const query = search.trim()
    if (!query) return ADHKAR_CATEGORIES
    return ADHKAR_CATEGORIES.filter(
      (cat) =>
        cat.title.includes(query) ||
        cat.items.some((item) => item.text.includes(query))
    )
  }, [search])

  const activeCategory =
    filteredCategories.find((cat) => cat.key === activeKey) || filteredCategories[0]

  const increment = (key: string, max: number) => {
    setCounts((prev) => {
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
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-gold-300">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث في الأذكار والأدعية..."
            className="w-full px-5 py-3 rounded-full border border-gold-200 dark:border-gold-800/50 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gold-400"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 max-h-64 overflow-y-auto p-1">
          {filteredCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveKey(cat.key)
                setCounts({})
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory?.key === cat.key
                  ? 'bg-gold-400 text-islamic-navy shadow-lg shadow-gold-300/30'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gold-200 dark:border-gold-800/50 hover:border-gold-400'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
          {filteredCategories.length === 0 && (
            <p className="text-gray-400 text-sm">لا توجد نتائج مطابقة للبحث</p>
          )}
        </div>

        {/* Adhkar */}
        <div className="space-y-6">
          {activeCategory?.items.map((dhikr, i) => {
            const key = `${activeCategory.key}-${i}`
            const current = counts[key] ?? 0
            const done = current >= dhikr.count

            return (
              <div
                key={i}
                className={`card-islamic p-8 transition-all ${done ? 'border-green-400/50 bg-green-50/50 dark:bg-green-900/10' : ''}`}
              >
                <p className="font-arabic text-2xl text-center text-gray-900 dark:text-gray-100 leading-loose mb-6">
                  {dhikr.text}
                </p>

                {dhikr.source && (
                  <div className="bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800/40 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gold-700 dark:text-gold-400 text-center leading-relaxed">
                      {t('source')}: {dhikr.source}
                    </p>
                  </div>
                )}

                {dhikr.count > 1 && (
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold font-arabic text-gold-500">{current}</div>
                      <div className="text-xs text-gray-400">{t('of')} {dhikr.count}</div>
                    </div>
                    <button
                      onClick={() => increment(key, dhikr.count)}
                      disabled={done}
                      className={`counter-btn ${done ? 'bg-green-500 cursor-default' : ''}`}
                    >
                      {done ? '✓' : '+'}
                    </button>
                  </div>
                )}

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
