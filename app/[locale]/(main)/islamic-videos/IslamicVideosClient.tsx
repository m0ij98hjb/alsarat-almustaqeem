'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Share2, Copy, Search, PlayCircle, ShieldCheck, Sparkles, BookOpenText } from 'lucide-react'
import islamicVideos from '@/data/islamicVideos'
import { cn } from '@/utils'

const categories = [
  'الكل',
  'القرآن الكريم',
  'التفسير',
  'الحديث الشريف',
  'العقيدة',
  'الفقه',
  'السيرة النبوية',
  'قصص الأنبياء',
  'قصص الصحابة',
  'الدعوة إلى الله',
  'الأخلاق الإسلامية',
  'الأذكار',
  'الأدعية',
  'تعلم الصلاة',
  'تعلم الوضوء',
  'الحج والعمرة',
  'رمضان',
  'الزكاة',
  'الصيام',
  'الرد على الشبهات',
  'التعريف بالإسلام',
  'التجويد',
  'الرقية الشرعية',
]

const sectionDefinitions = [
  { title: '📖 القرآن الكريم', categories: ['القرآن الكريم', 'التفسير', 'التجويد'] },
  { title: '🕌 العقيدة', categories: ['العقيدة', 'الفقه'] },
  { title: '📚 الحديث الشريف', categories: ['الحديث الشريف'] },
  { title: '🕋 الحج والعمرة', categories: ['الحج والعمرة'] },
  { title: '🤲 الأذكار والأدعية', categories: ['الأذكار', 'الأدعية', 'الرقية الشرعية'] },
  { title: '🕌 تعلم الصلاة', categories: ['تعلم الصلاة'] },
  { title: '💧 تعلم الوضوء', categories: ['تعلم الوضوء'] },
  { title: '📜 السيرة النبوية', categories: ['السيرة النبوية'] },
  { title: '👳 قصص الأنبياء', categories: ['قصص الأنبياء'] },
  { title: '⭐ قصص الصحابة', categories: ['قصص الصحابة'] },
  { title: '❤️ الأخلاق الإسلامية', categories: ['الأخلاق الإسلامية'] },
  { title: '🌍 الدعوة إلى الله', categories: ['الدعوة إلى الله', 'التعريف بالإسلام'] },
  { title: '❓ الرد على الشبهات', categories: ['الرد على الشبهات'] },
  { title: '🌙 رمضان', categories: ['رمضان'] },
  { title: '💰 الزكاة', categories: ['الزكاة'] },
  { title: '📆 الصيام', categories: ['الصيام'] },
]

function getUniqueValues(key: 'channelName' | 'speaker') {
  return Array.from(new Set(islamicVideos.map((video) => video[key]).filter(Boolean))).sort()
}

export default function IslamicVideosClient() {
  const t = useTranslations('videos')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [selectedChannel, setSelectedChannel] = useState('الكل')
  const [selectedSpeaker, setSelectedSpeaker] = useState('الكل')
  const [favorites, setFavorites] = useState<string[]>([])

  const channels = useMemo(() => ['الكل', ...getUniqueValues('channelName')], [])
  const speakers = useMemo(() => ['الكل', ...getUniqueValues('speaker')], [])

  const filteredVideos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return [...islamicVideos]
      .filter((video) => {
        const matchesSearch = normalizedQuery
          ? [video.title, video.channelName, video.speaker, video.category]
              .filter(Boolean)
              .join(' ')
              .toLowerCase()
              .includes(normalizedQuery)
          : true
        const matchesCategory = selectedCategory === 'الكل' || video.category === selectedCategory
        const matchesChannel = selectedChannel === 'الكل' || video.channelName === selectedChannel
        const matchesSpeaker = selectedSpeaker === 'الكل' || video.speaker === selectedSpeaker
        return matchesSearch && matchesCategory && matchesChannel && matchesSpeaker
      })
      .sort((a, b) => {
        const aOrder = a.order ?? Number.MAX_SAFE_INTEGER
        const bOrder = b.order ?? Number.MAX_SAFE_INTEGER
        return aOrder - bOrder
      })
  }, [searchQuery, selectedCategory, selectedChannel, selectedSpeaker])

  const discoverVideos = filteredVideos.filter((video) => video.featured)

  const sectionGroups = useMemo(
    () =>
      sectionDefinitions
        .map((section) => ({
          ...section,
          videos: filteredVideos.filter((video) => section.categories.includes(video.category)),
        }))
        .filter((section) => section.videos.length > 0),
    [filteredVideos]
  )

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const copyLink = async (url: string) => {
    await navigator.clipboard.writeText(url)
  }

  const selectChannel = (channel: string) => {
    setSelectedChannel(channel)
    setSelectedSpeaker('الكل')
  }

  const selectSpeaker = (speaker: string) => {
    setSelectedSpeaker(speaker)
    setSelectedChannel('الكل')
  }

  const handleShare = async (url: string, title: string) => {
    if (navigator.share) {
      await navigator.share({ title, url })
    } else {
      await copyLink(url)
    }
  }

  const renderVideoCard = (video: (typeof islamicVideos)[number]) => (
    <article key={video.id} className="card-islamic p-6">
      <img src={video.thumbnail} alt={`صورة مصغرة لفيديو: ${video.title}`} className="w-full rounded-2xl object-cover mb-4 h-52" loading="lazy" />
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <span className="font-arabic text-lg font-bold text-islamic-navy dark:text-white">{video.title}</span>
        <span className="text-xs px-3 py-1 rounded-full bg-gold-100 text-gold-700">{video.category}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{video.description}</p>
      <div className="text-sm text-gray-500 mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => selectChannel(video.channelName)}
          className="underline decoration-dotted text-gold-300 hover:text-gold-400 transition"
        >
          {video.channelName}
        </button>
        {video.speaker && (
          <button
            type="button"
            onClick={() => selectSpeaker(video.speaker!)}
            className="underline decoration-dotted text-gold-300 hover:text-gold-400 transition"
          >
            {video.speaker}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm px-4 py-2">
          {t('watchNow')}
        </a>
        <button onClick={() => handleShare(video.youtubeUrl, video.title)} className="btn-outline-gold text-sm px-4 py-2 inline-flex items-center gap-2">
          <Share2 size={16} /> {t('share')}
        </button>
        <button onClick={() => copyLink(video.youtubeUrl)} className="btn-outline-gold text-sm px-4 py-2 inline-flex items-center gap-2">
          <Copy size={16} /> {t('copyLink')}
        </button>
        <button
          onClick={() => toggleFavorite(video.id)}
          className={cn(
            'text-sm px-4 py-2 rounded-xl transition-all',
            favorites.includes(video.id) ? 'bg-gold-400 text-islamic-navy' : 'btn-outline-gold'
          )}
        >
          {favorites.includes(video.id) ? t('saved') : t('addToFavorites')}
        </button>
      </div>
    </article>
  )

  return (
    <main className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <section className="bg-hero-gradient py-18 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-gold-100 backdrop-blur-sm">
            <Sparkles size={16} />
            مكتبة دعوية موثوقة
          </div>

          <h1 className="font-arabic text-white text-4xl sm:text-5xl md:text-6xl font-bold mt-5 mb-4 leading-tight">
            {t('title')}
          </h1>
          <p className="text-gold-100 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.5fr_0.9fr] items-start">
            <div className="rounded-[28px] bg-white/95 dark:bg-gray-900/90 border border-gold-200/60 dark:border-gray-800 p-4 sm:p-5 shadow-lg shadow-black/10 backdrop-blur">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                <Search size={16} className="text-gold-500" />
                <span>{t('quickSearch')}</span>
              </div>
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="search-input pr-12 h-14 text-base"
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="card-islamic p-4 text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <BookOpenText size={16} className="text-gold-500" />
                    {t('categoryFilter')}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.slice(0, 8).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          'rounded-full px-3 py-1 text-sm transition-all',
                          selectedCategory === category
                            ? 'bg-gold-400 text-islamic-navy'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card-islamic p-4 text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <PlayCircle size={16} className="text-gold-500" />
                    {t('channelAndSpeaker')}
                  </div>
                  <div className="mt-3 space-y-3">
                    <select
                      value={selectedChannel}
                      onChange={(event) => setSelectedChannel(event.target.value)}
                      className="search-input"
                    >
                      {channels.map((channel) => (
                        <option key={channel} value={channel}>{channel}</option>
                      ))}
                    </select>
                    <select
                      value={selectedSpeaker}
                      onChange={(event) => setSelectedSpeaker(event.target.value)}
                      className="search-input"
                    >
                      {speakers.map((speaker) => (
                        <option key={speaker} value={speaker}>{speaker}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-white/95 dark:bg-gray-900/90 border border-gold-200/60 dark:border-gray-800 p-5 shadow-lg shadow-black/10 backdrop-blur text-right">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <ShieldCheck size={16} className="text-gold-500" />
                إحصائيات المكتبة
              </div>

              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl bg-gold-50 dark:bg-gray-800 p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('statsAvailable')}</p>
                  <p className="font-arabic text-3xl font-bold text-islamic-green dark:text-gold-300 mt-1">{filteredVideos.length}</p>
                </div>

                <div className="rounded-2xl bg-gold-50 dark:bg-gray-800 p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('statsFeatured')}</p>
                  <p className="font-arabic text-lg font-bold text-islamic-navy dark:text-white mt-1">{t('statsFeaturedDesc')}</p>
                </div>

                <div className="flex flex-wrap justify-end gap-2 mt-2">
                  {selectedChannel !== 'الكل' && (
                    <button
                      type="button"
                      onClick={() => setSelectedChannel('الكل')}
                      className="rounded-full border border-gold-300 px-3 py-1 text-xs text-gold-300 hover:bg-gold-400/10 transition"
                    >
                      القناة: {selectedChannel} ✕
                    </button>
                  )}
                  {selectedSpeaker !== 'الكل' && (
                    <button
                      type="button"
                      onClick={() => setSelectedSpeaker('الكل')}
                      className="rounded-full border border-gold-300 px-3 py-1 text-xs text-gold-300 hover:bg-gold-300/10 transition"
                    >
                      الشيخ: {selectedSpeaker} ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="section-header text-center">
          <h2>{t('discover')}</h2>
          <p>
            {t('discoverDesc')}
          </p>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {discoverVideos.length ? discoverVideos.map((video) => renderVideoCard(video)) : null}
        </div>
      </section>

      {sectionGroups.map((section) => (
        <section key={section.title} className="max-w-7xl mx-auto px-4 py-12">
          <div className="section-header text-center">
            <h2>{section.title}</h2>
            <p>{t('sectionDesc')}</p>
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            {section.videos.map((video) => renderVideoCard(video))}
          </div>
        </section>
      ))}

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="card-islamic p-6 text-center">
          <h2 className="font-arabic text-2xl font-bold text-islamic-green dark:text-gold-300 mb-3">{t('referenceTitle')}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('referenceDesc')}
          </p>
        </div>
      </section>
    </main>
  )
}
