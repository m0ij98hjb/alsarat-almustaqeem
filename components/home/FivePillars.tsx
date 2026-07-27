import Link from 'next/link'

interface Pillar {
  icon: string
  nameAr: string
  nameEn: string
  descAr: string
  descEn: string
  href: string
}

export function FivePillars({ locale }: { locale: string }) {
  const pillars: Pillar[] = [
    {
      icon: '☝️',
      nameAr: 'الشهادة',
      nameEn: 'Shahada',
      descAr: 'أن لا إله إلا الله وأن محمداً رسول الله',
      descEn: 'Testifying there is no god but Allah, and Muhammad is His messenger',
      href: `/${locale}#faq`,
    },
    {
      icon: '🕌',
      nameAr: 'الصلاة',
      nameEn: 'Salah',
      descAr: 'خمس صلوات يومياً تصل العبد بربه',
      descEn: 'Five daily prayers connecting the believer with God',
      href: `/${locale}/kids/prayer`,
    },
    {
      icon: '🤲',
      nameAr: 'الزكاة',
      nameEn: 'Zakat',
      descAr: 'إخراج نسبة من المال للفقراء والمحتاجين',
      descEn: 'Giving a portion of wealth to those in need',
      href: `/${locale}#faq`,
    },
    {
      icon: '🌙',
      nameAr: 'الصيام',
      nameEn: 'Sawm',
      descAr: 'صوم شهر رمضان امتناعاً وتقوى',
      descEn: 'Fasting the month of Ramadan for self-discipline and God-consciousness',
      href: `/${locale}#faq`,
    },
    {
      icon: '🕋',
      nameAr: 'الحج',
      nameEn: 'Hajj',
      descAr: 'رحلة إلى مكة مرة في العمر لمن استطاع',
      descEn: 'A pilgrimage to Makkah once in a lifetime for those able',
      href: `/${locale}/kids/hajj`,
    },
  ]

  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-header">
          <h2>{locale === 'ar' ? 'أركان الإسلام الخمسة' : 'The Five Pillars of Islam'}</h2>
          <p>
            {locale === 'ar'
              ? 'الأساس الذي تُبنى عليه حياة المسلم'
              : 'The foundation a Muslim\'s life is built upon'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {pillars.map((p, i) => (
            <Link
              key={p.nameEn}
              href={p.href}
              className="card-islamic p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
              <div className="text-xs text-gold-500 font-bold mb-1">{i + 1}</div>
              <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors mb-2">
                {locale === 'ar' ? p.nameAr : p.nameEn}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {locale === 'ar' ? p.descAr : p.descEn}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
