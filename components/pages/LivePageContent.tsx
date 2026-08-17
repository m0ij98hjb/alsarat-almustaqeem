'use client'

import { useLocale, useTranslations } from 'next-intl'
import { LIVE_CHANNELS } from '@/data/liveChannels'

export function LivePageContent() {
  const locale = useLocale()
  const t = useTranslations('livePage')
  const tc = useTranslations('common')
  const th = useTranslations('home')

  return (
    <div className="min-h-screen bg-islamic-cream">
      <section className="bg-hero-gradient py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-400/40 bg-white/10 text-gold-300 text-3xl mb-6">
            📡
          </div>
          <h1 className="font-arabic text-white text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-gold-200 text-lg max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {LIVE_CHANNELS.map((channel) => (
            <article key={channel.id} className="card-islamic p-8 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-4xl">{channel.logo}</span>
                <span className="text-xs font-bold rounded-full bg-gold-100 text-gold-700 px-3 py-1">
                  {th('liveMakkah.status')}
                </span>
              </div>
              <div>
                <h2 className="font-arabic text-2xl font-bold text-islamic-green mb-3">
                  {locale === 'ar' ? channel.nameAr : channel.nameEn}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {locale === 'ar' ? channel.descriptionAr : channel.descriptionEn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.open(channel.livePage, '_blank', 'noopener,noreferrer')}
                className="btn-gold inline-flex items-center justify-center"
              >
                {tc('play')}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
