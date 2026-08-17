import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { LIVE_CHANNELS } from '@/data/liveChannels'

export async function LiveFromMakkah({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' })
  const channels = LIVE_CHANNELS.filter((c) => c.category === 'tv')

  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 pattern-overlay opacity-20" />
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📡</div>
          <h2 className="font-arabic text-white text-3xl font-bold mb-3">{t('liveMakkah.title')}</h2>
          <p className="text-gold-200 max-w-xl mx-auto">{t('liveMakkah.subtitle')}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto mb-8">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.livePage}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-6 text-center hover:bg-white/15 transition-colors"
            >
              <div className="text-4xl mb-3">{channel.logo}</div>
              <h3 className="font-arabic text-white font-bold mb-2">
                {locale === 'ar' ? channel.nameAr : channel.nameEn}
              </h3>
              <span className="text-xs text-gold-300">{t('liveMakkah.status')}</span>
            </a>
          ))}
        </div>
        <div className="text-center">
          <Link href={`/${locale}/live`} className="btn-gold px-8 py-3 inline-block">
            {t('liveMakkah.seeAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
