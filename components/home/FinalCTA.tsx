import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function FinalCTA({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' })

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-hero-gradient rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          <div className="relative z-10">
            <h2 className="font-arabic text-gold-300 text-3xl font-bold mb-4">{t('finalCta.title')}</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">{t('finalCta.subtitle')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${locale}/quran`} className="btn-gold px-8 py-3">
                {t('finalCta.btnQuran')}
              </Link>
              <Link href={`/${locale}#ask-ai`} className="btn-outline-gold px-8 py-3">
                {t('finalCta.btnAI')}
              </Link>
              <Link href={`/${locale}/islamic-videos`} className="btn-outline-gold px-8 py-3">
                {t('finalCta.btnVideos')}
              </Link>
              <Link href={`/${locale}/prophets`} className="btn-outline-gold px-8 py-3">
                {t('finalCta.btnLearnMore')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
