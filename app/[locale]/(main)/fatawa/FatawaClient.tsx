'use client'

import { useMemo, useState } from 'react'
import { FATAWA } from '@/data/fatawa'

const CATEGORIES = ['الكل', ...Array.from(new Set(FATAWA.map((f) => f.category)))]

export default function FatawaClient() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('الكل')
  const [openId, setOpenId] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const query = search.trim()
    return FATAWA.filter((f) => {
      const matchesCategory = category === 'الكل' || f.category === category
      const matchesQuery = !query || f.question.includes(query) || f.answer.includes(query) || f.tags.some((t) => t.includes(query))
      return matchesCategory && matchesQuery
    })
  }, [search, category])

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث في الفتاوى..."
          className="w-full px-5 py-3 rounded-full border border-gold-200 dark:border-gold-800/50 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gold-400"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === cat
                ? 'bg-gold-400 text-islamic-navy shadow-lg shadow-gold-300/30'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gold-200 dark:border-gold-800/50 hover:border-gold-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((f) => {
          const isOpen = openId === f.id
          return (
            <div key={f.id} className="card-islamic overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : f.id)}
                className="w-full text-right p-6 flex items-start justify-between gap-4"
              >
                <div>
                  <span className="text-xs bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                    {f.category}
                  </span>
                  <h2 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300">{f.question}</h2>
                </div>
                <span className="text-gold-500 text-xl flex-shrink-0">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{f.answer}</p>
                  <p className="text-xs text-gray-400">{f.scholar} · {f.views.toLocaleString('ar')} مشاهدة</p>
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400">لا توجد فتاوى مطابقة للبحث</p>
        )}
      </div>
    </div>
  )
}
