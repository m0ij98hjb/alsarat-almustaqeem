'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PlayCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { featuredVideos } from '@/data/featuredVideos'

export function WatchLearnHome({ locale }: { locale: string }) {
  const t = useTranslations('home')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const videos = featuredVideos.slice(0, 3)

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-header">
          <h2>{t('watchLearn.title')}</h2>
          <p>{t('watchLearn.subtitle')}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {videos.map((video) => (
            <article key={video.id} className="card-islamic p-5">
              <div className="relative mb-4">
                {playingId === video.id ? (
                  <iframe
                    width="100%"
                    height={200}
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
                    className="relative w-full h-[200px] rounded-2xl overflow-hidden group"
                    aria-label={t('watchLearn.playAria', { title: video.title })}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-[200px] object-cover"
                      loading="lazy"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <PlayCircle size={48} className="text-white drop-shadow-lg" />
                    </span>
                  </button>
                )}
              </div>
              <h3 className="font-arabic text-sm font-bold text-islamic-navy dark:text-white mb-1 leading-snug">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{video.sheikhName}</p>
            </article>
          ))}
        </div>
        <div className="text-center">
          <Link href={`/${locale}/islamic-videos`} className="btn-outline-gold px-8 py-3 inline-block">
            {t('watchLearn.seeAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
