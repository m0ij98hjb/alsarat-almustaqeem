"use client"

import { useMemo, useState } from 'react'
import { Copy, Heart, Share2, Search } from 'lucide-react'

type HadithItem = {
  id: number
  text: string
  narrator: string
  grade: 'SAHIH' | 'HASAN' | 'DAIF'
  topic: string
  author: string
}

const hadiths: HadithItem[] = [
  {
    id: 1,
    text: 'إنما الأعمال بالنيات وإنما لكل امرئ ما نوى',
    narrator: 'عمر بن الخطاب رضي الله عنه',
    grade: 'SAHIH',
    topic: 'النية',
    author: 'البخاري',
  },
  {
    id: 2,
    text: 'من كان يؤمن بالله واليوم الآخر فليقل خيرًا أو ليصمت',
    narrator: 'أبو هريرة رضي الله عنه',
    grade: 'SAHIH',
    topic: 'القول الحسن',
    author: 'مسلم',
  },
  {
    id: 3,
    text: 'خيركم من تعلم القرآن وعلمه',
    narrator: 'عثمان بن عفان رضي الله عنه',
    grade: 'HASAN',
    topic: 'القرآن',
    author: 'البخاري',
  },
  {
    id: 4,
    text: 'اتق الله حيثما كنت وأتبع السيئة الحسنة تمحها',
    narrator: 'أبو ذر الغفاري رضي الله عنه',
    grade: 'DAIF',
    topic: 'التوبة',
    author: 'الترمذي',
  },
]

const categories = ['الكل', 'النية', 'القول الحسن', 'القرآن', 'التوبة']
const authors = ['الكل', 'البخاري', 'مسلم', 'الترمذي']

const gradeClass: Record<string, string> = {
  SAHIH: 'grade-sahih',
  HASAN: 'grade-hasan',
  DAIF: 'grade-daif',
}

export function HadithPageContent() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [selectedAuthor, setSelectedAuthor] = useState('الكل')
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredHadiths = useMemo(() => {
    return hadiths.filter((item) => {
      const matchesQuery = `${item.text} ${item.narrator} ${item.topic}`.includes(query)
      const matchesCategory = selectedCategory === 'الكل' || item.topic === selectedCategory
      const matchesAuthor = selectedAuthor === 'الكل' || item.author === selectedAuthor
      return matchesQuery && matchesCategory && matchesAuthor
    })
  }, [query, selectedCategory, selectedAuthor])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const copyHadith = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  const shareHadith = async (text: string) => {
    if (navigator.share) {
      await navigator.share({ title: 'حديث إسلامي', text })
    }
  }

  return (
    <div className="min-h-screen bg-islamic-cream">
      <section className="bg-hero-gradient py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-400/40 bg-white/10 text-gold-300 text-3xl mb-6">
            📚
          </div>
          <h1 className="font-arabic text-white text-4xl sm:text-5xl font-bold mb-4">الأحاديث</h1>
          <p className="text-gold-200 text-lg max-w-3xl mx-auto">
            واجهة جاهزة للربط بمصدر بيانات مستقبلي أو API دون التأثير على التصميم العام.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="card-islamic p-6 md:p-8 mb-8">
          <div className="relative mb-5">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث في الأحاديث أو الراوي أو الموضوع"
              className="search-input pr-10"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">التصنيفات:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-3 py-1 text-sm ${selectedCategory === category ? 'bg-gold-400 text-islamic-navy' : 'bg-gray-100 text-gray-700'}`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">الراوي:</span>
              {authors.map((author) => (
                <button
                  key={author}
                  onClick={() => setSelectedAuthor(author)}
                  className={`rounded-full px-3 py-1 text-sm ${selectedAuthor === author ? 'bg-gold-400 text-islamic-navy' : 'bg-gray-100 text-gray-700'}`}
                >
                  {author}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-gold-50 p-4">
              <p className="text-sm text-gray-600">الصحيح</p>
              <p className="font-arabic text-2xl font-bold text-islamic-green">1</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-gray-600">الحسن</p>
              <p className="font-arabic text-2xl font-bold text-islamic-green">1</p>
            </div>
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-sm text-gray-600">الضعيف</p>
              <p className="font-arabic text-2xl font-bold text-islamic-green">1</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredHadiths.map((hadith) => (
            <article key={hadith.id} className="card-hadith">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={gradeClass[hadith.grade]}>{hadith.grade === 'SAHIH' ? 'صحيح' : hadith.grade === 'HASAN' ? 'حسن' : 'ضعيف'}</span>
                  <span className="text-sm text-gray-500">{hadith.topic}</span>
                  <span className="text-sm text-gray-500">{hadith.author}</span>
                </div>
                <button onClick={() => toggleFavorite(hadith.id)} className="text-gold-600">
                  <Heart size={18} fill={favorites.includes(hadith.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="font-arabic text-2xl leading-loose text-gray-900 mb-4">«{hadith.text}»</p>
              <p className="text-sm text-gray-600 mb-4">{hadith.narrator}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => copyHadith(hadith.text)} className="btn-outline-gold text-sm px-4 py-2 inline-flex items-center gap-2">
                  <Copy size={16} /> نسخ الحديث
                </button>
                <button onClick={() => shareHadith(hadith.text)} className="btn-outline-gold text-sm px-4 py-2 inline-flex items-center gap-2">
                  <Share2 size={16} /> مشاركة الحديث
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
