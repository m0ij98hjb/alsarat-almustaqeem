import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'

export async function Footer() {
  const t = await getTranslations('footer')
  const locale = await getLocale()

  const sections = [
    {
      title: t('sections.quranHadith'),
      links: [
        { href: `/${locale}/quran`,  label: t('links.quran') },
        { href: `/${locale}/quran`,  label: t('links.tafsir') },
        { href: `/${locale}/hadith`, label: t('links.bukhari') },
        { href: `/${locale}/hadith`, label: t('links.muslim') },
      ],
    },
    {
      title: t('sections.adhkarDua'),
      links: [
        { href: `/${locale}/adhkar`,       label: t('links.morningAdhkar') },
        { href: `/${locale}/adhkar`,       label: t('links.eveningAdhkar') },
        { href: `/${locale}/hisn-muslim`,  label: t('links.hisnMuslim') },
        { href: `/${locale}/adhkar`,       label: t('links.travelAdhkar') },
      ],
    },
    {
      title: t('sections.islamicSciences'),
      links: [
        { href: `/${locale}/prophets`,   label: t('links.prophetsStories') },
        { href: `/${locale}/seerah`,     label: t('links.seerah') },
        { href: `/${locale}/asma-allah`, label: t('links.asmaAllah') },
        { href: `/${locale}/fatawa`,     label: t('links.fatawa') },
      ],
    },
    {
      title: t('sections.services'),
      links: [
        { href: `/${locale}/prayer-times`, label: t('links.prayerTimes') },
        { href: `/${locale}/search`,       label: t('links.search') },
        { href: `/${locale}/ai`,           label: t('links.aiAssistant') },
        { href: `/${locale}/profile`,      label: t('links.profile') },
      ],
    },
  ]

  return (
    <footer className="bg-islamic-navy border-t border-gold-400/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-gold-400 text-3xl">✦</span>
            <h2 className="font-arabic text-gold-300 text-3xl font-bold">{t('siteName')}</h2>
            <span className="text-gold-400 text-3xl">✦</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md mx-auto">{t('siteDesc')}</p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {sections.map(sec => (
            <div key={sec.title}>
              <h3 className="text-gold-400 font-bold mb-4 text-sm">{sec.title}</h3>
              <ul className="space-y-2">
                {sec.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-gold-300 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gold-400/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} — {t('siteName')} | {t('copyright')}
          </p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="text-gray-500 hover:text-gold-300 text-xs transition-colors">{t('privacy')}</Link>
            <Link href={`/${locale}/terms`}   className="text-gray-500 hover:text-gold-300 text-xs transition-colors">{t('terms')}</Link>
            <Link href={`/${locale}/contact`} className="text-gray-500 hover:text-gold-300 text-xs transition-colors">{t('contact')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
