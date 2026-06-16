'use client'

import { useState, useCallback } from 'react'
import { Search, Loader2 } from 'lucide-react'

interface SearchResult {
  id: string
  type: string
  title: string
  text: string
  reference: string
  url: string
}

const TYPE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  ayah:    { label: 'آية قرآنية',    icon: '📖', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  hadith:  { label: 'حديث نبوي',     icon: '📜', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  dhikr:   { label: 'ذكر ودعاء',     icon: '📿', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  fatwa:   { label: 'فتوى',           icon: '⚖️', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  prophet: { label: 'قصة نبي',        icon: '🌟', color: 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400' },
}

// Mock search for demonstration
function mockSearch(q: string): SearchResult[] {
  if (!q.trim()) return []
  const results: SearchResult[] = []

  if (q.includes('صلاة') || q.includes('صل')) {
    results.push(
      { id: '1', type: 'ayah',   title: 'سورة البقرة 2:43', text: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ', reference: 'البقرة: 43', url: '/quran/2' },
      { id: '2', type: 'hadith', title: 'صحيح البخاري #524', text: 'الصلاة عماد الدين فمن أقامها فقد أقام الدين ومن هدمها فقد هدم الدين', reference: 'رواه البيهقي', url: '/hadith/bukhari' },
    )
  }
  if (q.includes('قرآن') || q.includes('قران')) {
    results.push(
      { id: '3', type: 'hadith', title: 'صحيح البخاري #5027', text: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', reference: 'البخاري عن عثمان', url: '/hadith/bukhari' },
      { id: '4', type: 'ayah',   title: 'سورة القيامة 75:17', text: 'إِنَّ عَلَيْنَا جَمْعَهُ وَقُرْآنَهُ', reference: 'القيامة: 17', url: '/quran/75' },
    )
  }
  if (results.length === 0) {
    results.push(
      { id: '5', type: 'ayah',   title: 'نتيجة عامة', text: `نتائج البحث عن "${q}" في القرآن الكريم`, reference: 'القرآن الكريم', url: '/quran' },
      { id: '6', type: 'hadith', title: 'حديث ذو صلة', text: `أحاديث تتعلق بـ "${q}"`, reference: 'الأحاديث النبوية', url: '/hadith' },
    )
  }
  return results
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [filter, setFilter] = useState('all')

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) return
    setLoading(true)
    setSearched(true)
    await new Promise(r => setTimeout(r, 500)) // simulate
    setResults(mockSearch(q))
    setLoading(false)
  }, [])

  const filtered = filter === 'all' ? results : results.filter(r => r.type === filter)

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      {/* Search Header */}
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="font-arabic text-white text-4xl font-bold mb-6 text-center">البحث الشامل</h1>
          <div className="relative">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doSearch(query)}
              placeholder="ابحث في القرآن والحديث والأذكار والفتاوى..."
              className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl px-6 py-5 text-lg text-right placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 shadow-2xl"
            />
            <button
              onClick={() => doSearch(query)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 btn-gold rounded-xl flex items-center justify-center"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Filters */}
        {searched && (
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'ayah', 'hadith', 'dhikr', 'fatwa', 'prophet'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  filter === f
                    ? 'bg-gold-400 text-islamic-navy font-bold'
                    : 'bg-white dark:bg-gray-900 border border-gold-200 dark:border-gold-800/50 text-gray-600 dark:text-gray-300 hover:border-gold-400'
                }`}
              >
                {f === 'all' ? `الكل (${results.length})` : (TYPE_LABELS[f]?.icon + ' ' + TYPE_LABELS[f]?.label)}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {searched && !loading && (
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-arabic text-xl">لم يُعثر على نتائج</p>
                <p className="text-sm mt-2">جرب كلمات مختلفة</p>
              </div>
            ) : (
              filtered.map(result => {
                const meta = TYPE_LABELS[result.type]
                return (
                  <a key={result.id} href={result.url} className="card-islamic p-6 block group hover:border-gold-400">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">{meta?.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${meta?.color}`}>
                            {meta?.label}
                          </span>
                          <span className="text-xs text-gray-400">{result.reference}</span>
                        </div>
                        <p className="font-arabic text-lg text-gray-900 dark:text-gray-100 leading-relaxed group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors">
                          {result.text}
                        </p>
                        <p className="text-xs text-gold-500 mt-2">{result.title}</p>
                      </div>
                    </div>
                  </a>
                )
              })
            )}
          </div>
        )}

        {/* Empty state */}
        {!searched && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="font-arabic text-2xl text-gray-600 dark:text-gray-400">ابحث في كل المحتوى الإسلامي</h2>
            <p className="text-gray-400 mt-2">القرآن • الحديث • الأذكار • الفتاوى • قصص الأنبياء</p>
          </div>
        )}
      </div>
    </div>
  )
}
