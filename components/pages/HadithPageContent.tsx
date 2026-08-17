"use client"

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Copy, Heart, Share2, Search } from 'lucide-react'
import { HADITHS } from '@/data/hadiths'

const gradeClass: Record<string, string> = {
  SAHIH: 'grade-sahih',
  HASAN: 'grade-hasan',
  DAIF: 'grade-daif',
}

export function HadithPageContent() {
  const t = useTranslations('hadith')
  const tc = useTranslations('common')
  const ALL = tc('all')
  const categories = useMemo(() => [ALL, ...Array.from(new Set(HADITHS.map((h) => h.topic)))], [ALL])
  const authors = useMemo(() => [ALL, ...Array.from(new Set(HADITHS.map((h) => h.source)))], [ALL])

  const [query, setQuery] = useState('')
  const [dorarQuery, setDorarQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL)
  const [selectedAuthor, setSelectedAuthor] = useState(ALL)
  const [favorites, setFavorites] = useState<number[]>([])

  const openDorarSearch = (event?: any) => {
    if (event?.preventDefault) event.preventDefault()

    const trimmed = dorarQuery.trim()
    const url = trimmed
      ? `https://dorar.net/site/search?q=${encodeURIComponent(trimmed)}`
      : 'https://dorar.net/'

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const filteredHadiths = useMemo(() => {
    return HADITHS.filter((item) => {
      const matchesQuery = `${item.text} ${item.narrator} ${item.topic}`.includes(query)
      const matchesCategory = selectedCategory === ALL || item.topic === selectedCategory
      const matchesAuthor = selectedAuthor === ALL || item.source === selectedAuthor
      return matchesQuery && matchesCategory && matchesAuthor
    })
  }, [query, selectedCategory, selectedAuthor, ALL])

  const gradeCounts = useMemo(() => {
    return filteredHadiths.reduce(
      (acc, item) => {
        acc[item.grade] += 1
        return acc
      },
      { SAHIH: 0, HASAN: 0, DAIF: 0 } as Record<'SAHIH' | 'HASAN' | 'DAIF', number>
    )
  }, [filteredHadiths])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const copyHadith = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  const shareHadith = async (text: string) => {
    if (navigator.share) {
      await navigator.share({ title: t('shareTitle'), text })
    }
  }

  const services = [
    { title: t('services.encyclopedia'), href: 'https://dorar.net/hadith' },
    { title: t('services.adhkar'), href: 'https://dorar.net/site/search?q=%D8%A7%D9%84%D8%A3%D8%B0%D9%83%D8%A7%D8%B1' },
    { title: t('services.duas'), href: 'https://dorar.net/site/search?q=%D8%A7%D9%84%D8%A3%D8%AF%D8%B9%D9%8A%D8%A9' },
    { title: t('services.scientific'), href: 'https://dorar.net/gsearch' },
    { title: t('services.fiqh'), href: 'https://dorar.net/feqhia' },
  ]

  return (
    <div className="min-h-screen bg-islamic-cream">
      <section className="bg-hero-gradient py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-400/40 bg-white/10 text-gold-300 text-3xl mb-6">
            📚
          </div>
          <h1 className="font-arabic text-white text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-gold-200 text-lg max-w-3xl mx-auto">{t('heroDesc')}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="card-islamic p-6 md:p-8 mb-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="font-arabic text-3xl md:text-4xl font-bold text-islamic-green dark:text-gold-300">{t('dorarTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl">{t('dorarDesc')}</p>
            </div>

            <form onSubmit={openDorarSearch} className="grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={dorarQuery}
                  onChange={(event) => setDorarQuery(event.target.value)}
                  placeholder={t('dorarPlaceholder')}
                  className="search-input pr-10"
                />
              </div>
              <button type="submit" className="btn-gold w-full md:w-auto">
                {t('dorarSearchBtn')}
              </button>
            </form>

            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://dorar.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold inline-flex items-center justify-center text-sm px-6 py-3"
              >
                {t('visitDorar')}
              </a>
            </div>
          </div>
        </div>

        <div className="card-islamic p-6 md:p-8 mb-8">
          <div className="space-y-3 mb-4">
            <h2 className="font-arabic text-3xl md:text-4xl font-bold text-islamic-green dark:text-gold-300">{t('servicesTitle')}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl">{t('servicesDesc')}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <a
                key={service.title}
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-islamic p-5 hover:border-gold-400 transition-all"
              >
                <p className="font-arabic text-xl font-bold text-islamic-navy dark:text-white mb-2">{service.title}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('serviceOpenDesc')}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="card-islamic p-6 md:p-8 mb-8">
          <div className="relative mb-5">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('filterPlaceholder')}
              className="search-input pr-10"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">{t('categoriesLabel')}</span>
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
              <span className="text-sm text-gray-600">{t('narrator')}:</span>
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
              <p className="text-sm text-gray-600">{t('grades.SAHIH')}</p>
              <p className="font-arabic text-2xl font-bold text-islamic-green">{gradeCounts.SAHIH}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-gray-600">{t('grades.HASAN')}</p>
              <p className="font-arabic text-2xl font-bold text-islamic-green">{gradeCounts.HASAN}</p>
            </div>
            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-sm text-gray-600">{t('grades.DAIF')}</p>
              <p className="font-arabic text-2xl font-bold text-islamic-green">{gradeCounts.DAIF}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredHadiths.map((hadith) => (
            <article key={hadith.id} className="card-hadith">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={gradeClass[hadith.grade]}>{t(`grades.${hadith.grade}`)}</span>
                  <span className="text-sm text-gray-500">{hadith.topic}</span>
                  <span className="text-sm text-gray-500">{hadith.source}</span>
                </div>
                <button onClick={() => toggleFavorite(hadith.id)} className="text-gold-600">
                  <Heart size={18} fill={favorites.includes(hadith.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="font-arabic text-2xl leading-loose text-gray-900 mb-4">«{hadith.text}»</p>
              {hadith.narrator && <p className="text-sm text-gray-600 mb-4">{hadith.narrator}</p>}
              <div className="flex flex-wrap gap-3">
                <button onClick={() => copyHadith(hadith.text)} className="btn-outline-gold text-sm px-4 py-2 inline-flex items-center gap-2">
                  <Copy size={16} /> {t('copyHadithBtn')}
                </button>
                <button onClick={() => shareHadith(hadith.text)} className="btn-outline-gold text-sm px-4 py-2 inline-flex items-center gap-2">
                  <Share2 size={16} /> {t('shareHadithBtn')}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
