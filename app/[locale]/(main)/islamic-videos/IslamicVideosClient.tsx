'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Share2, Copy, Search, PlayCircle, ShieldCheck, Sparkles, BookOpenText, ExternalLink } from 'lucide-react'
import { featuredVideos, type FeaturedVideo, type VideoCategory } from '@/data/featuredVideos'
import { cn } from '@/utils'

const CATEGORY_ICONS: Record<VideoCategory, string> = {
  aqeedah: '🕌',
  fiqh: '⚖️',
  seerah: '🌙',
  dawah: '🌍',
  tazkiyah: '✨',
}

const CATEGORY_KEYS: VideoCategory[] = ['aqeedah', 'fiqh', 'seerah', 'dawah', 'tazkiyah']
const ALL_SENTINEL = 'all'
const LANG_SENTINELS = [ALL_SENTINEL, 'ar', 'en'] as const

function watchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}

function channelUrl(channelId: string): string {
  return `https://www.youtube.com/channel/${channelId}`
}

function getUniqueValues(videos: FeaturedVideo[], key: 'channelName' | 'sheikhName') {
  return Array.from(new Set(videos.map((video) => video[key]).filter(Boolean))).sort()
}

export default function IslamicVideosClient() {
  const t = useTranslations('videos')
  const tc = useTranslations('common')
  const ALL = tc('all')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | typeof ALL_SENTINEL>(ALL_SENTINEL)
  const [selectedChannel, setSelectedChannel] = useState(ALL_SENTINEL)
  const [selectedSheikh, setSelectedSheikh] = useState(ALL_SENTINEL)
  const [selectedLanguage, setSelectedLanguage] = useState<typeof LANG_SENTINELS[number]>(ALL_SENTINEL)
  const [favorites, setFavorites] = useState<string[]>([])
  const [playingId, setPlayingId] = useState<string | null>(null)

  const categoryLabel = (key: VideoCategory) => t(`categories.${key}`)

  const channels = useMemo(() => [ALL_SENTINEL, ...getUniqueValues(featuredVideos, 'channelName')], [])
  const sheikhs = useMemo(() => [ALL_SENTINEL, ...getUniqueValues(featuredVideos, 'sheikhName')], [])

  const filteredVideos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return featuredVideos.filter((video) => {
      const matchesSearch = normalizedQuery
        ? [video.title, video.channelName, video.sheikhName, categoryLabel(video.category)]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery)
        : true
      const matchesCategory = selectedCategory === ALL_SENTINEL || video.category === selectedCategory
      const matchesChannel = selectedChannel === ALL_SENTINEL || video.channelName === selectedChannel
      const matchesSheikh = selectedSheikh === ALL_SENTINEL || video.sheikhName === selectedSheikh
      const matchesLanguage = selectedLanguage === ALL_SENTINEL || video.language === selectedLanguage
      return matchesSearch && matchesCategory && matchesChannel && matchesSheikh && matchesLanguage
      // eslint-disable-next-line react-hooks/exhaustive-deps
    })
  }, [searchQuery, selectedCategory, selectedChannel, selectedSheikh, selectedLanguage])

  const discoverVideos = filteredVideos.slice(0, 6)

  const sectionGroups = useMemo(
    () =>
      CATEGORY_KEYS
        .map((category) => ({
          category,
          title: `${CATEGORY_ICONS[category]} ${categoryLabel(category)}`,
          videos: filteredVideos.filter((video) => video.category === category),
        }))
        .filter((section) => section.videos.length > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setSelectedSheikh(ALL_SENTINEL)
  }

  const selectSheikh = (sheikh: string) => {
    setSelectedSheikh(sheikh)
    setSelectedChannel(ALL_SENTINEL)
  }

  const handleShare = async (url: string, title: string) => {
    if (navigator.share) {
      await navigator.share({ title, url })
    } else {
      await copyLink(url)
    }
  }

  const renderVideoCard = (video: FeaturedVideo) => (
    <article key={video.id} className="card-islamic p-6">
      <div className="relative mb-4">
        {playingId === video.id ? (
          <iframe
            width="100%"
            height={315}
            className="w-full rounded-2xl"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlayingId(video.id)}
            className="relative w-full h-52 rounded-2xl overflow-hidden group"
            aria-label={t('playAria', { title: video.title })}
          >
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={t('thumbnailAlt', { title: video.title })}
              className="w-full h-52 object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <PlayCircle size={56} className="text-white drop-shadow-lg" />
            </span>
          </button>
        )}
      </div>
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <span className="font-arabic text-lg font-bold text-islamic-navy dark:text-white">{video.title}</span>
        <span className="text-xs px-3 py-1 rounded-full bg-gold-100 text-gold-700">{categoryLabel(video.category)}</span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => selectSheikh(video.sheikhName)}
          className="underline decoration-dotted text-gold-300 hover:text-gold-400 transition"
        >
          {video.sheikhName}
        </button>
        <span className="text-gray-400">·</span>
        <button
          type="button"
          onClick={() => selectChannel(video.channelName)}
          className="underline decoration-dotted text-gold-300 hover:text-gold-400 transition"
        >
          {video.channelName}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <a href={watchUrl(video.id)} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm px-4 py-2">
          {t('watchNow')}
        </a>
        <a
          href={channelUrl(video.channelId)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-gold text-sm px-4 py-2 inline-flex items-center gap-2"
        >
          <ExternalLink size={16} /> {t('visitChannel')}
        </a>
        <button onClick={() => handleShare(watchUrl(video.id), video.title)} className="btn-outline-gold text-sm px-4 py-2 inline-flex items-center gap-2">
          <Share2 size={16} /> {t('share')}
        </button>
        <button onClick={() => copyLink(watchUrl(video.id))} className="btn-outline-gold text-sm px-4 py-2 inline-flex items-center gap-2">
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
            {t('libraryBadge')}
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
                    {[ALL_SENTINEL, ...CATEGORY_KEYS].map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category as VideoCategory | typeof ALL_SENTINEL)}
                        className={cn(
                          'rounded-full px-3 py-1 text-sm transition-all',
                          selectedCategory === category
                            ? 'bg-gold-400 text-islamic-navy'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        )}
                      >
                        {category === ALL_SENTINEL ? ALL : categoryLabel(category as VideoCategory)}
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
                        <option key={channel} value={channel}>{channel === ALL_SENTINEL ? ALL : channel}</option>
                      ))}
                    </select>
                    <select
                      value={selectedSheikh}
                      onChange={(event) => setSelectedSheikh(event.target.value)}
                      className="search-input"
                    >
                      {sheikhs.map((sheikh) => (
                        <option key={sheikh} value={sheikh}>{sheikh === ALL_SENTINEL ? ALL : sheikh}</option>
                      ))}
                    </select>
                    <select
                      value={selectedLanguage}
                      onChange={(event) => setSelectedLanguage(event.target.value as typeof LANG_SENTINELS[number])}
                      className="search-input"
                    >
                      {LANG_SENTINELS.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang === ALL_SENTINEL ? ALL : lang === 'ar' ? t('langArabic') : t('langEnglish')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-white/95 dark:bg-gray-900/90 border border-gold-200/60 dark:border-gray-800 p-5 shadow-lg shadow-black/10 backdrop-blur text-right">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <ShieldCheck size={16} className="text-gold-500" />
                {t('libraryStats')}
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
                  {selectedChannel !== ALL_SENTINEL && (
                    <button
                      type="button"
                      onClick={() => setSelectedChannel(ALL_SENTINEL)}
                      className="rounded-full border border-gold-300 px-3 py-1 text-xs text-gold-300 hover:bg-gold-400/10 transition"
                    >
                      {t('channelChip', { channel: selectedChannel })} ✕
                    </button>
                  )}
                  {selectedSheikh !== ALL_SENTINEL && (
                    <button
                      type="button"
                      onClick={() => setSelectedSheikh(ALL_SENTINEL)}
                      className="rounded-full border border-gold-300 px-3 py-1 text-xs text-gold-300 hover:bg-gold-300/10 transition"
                    >
                      {t('sheikhChip', { sheikh: selectedSheikh })} ✕
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
          {discoverVideos.length ? discoverVideos.map((video) => renderVideoCard(video)) : (
            <p className="col-span-full text-center text-gray-400">{t('noResults')}</p>
          )}
        </div>
      </section>

      {sectionGroups.map((section) => (
        <section key={section.category} className="max-w-7xl mx-auto px-4 py-12">
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
