import Link from 'next/link'

const sections = [
  {
    title: 'القرآن والحديث',
    links: [
      { href: '/quran',  label: 'القرآن الكريم' },
      { href: '/quran',  label: 'التفسير' },
      { href: '/hadith', label: 'صحيح البخاري' },
      { href: '/hadith', label: 'صحيح مسلم' },
    ],
  },
  {
    title: 'الأذكار والأدعية',
    links: [
      { href: '/adhkar',       label: 'أذكار الصباح' },
      { href: '/adhkar',       label: 'أذكار المساء' },
      { href: '/hisn-muslim',  label: 'حصن المسلم' },
      { href: '/adhkar',       label: 'أذكار السفر' },
    ],
  },
  {
    title: 'العلوم الإسلامية',
    links: [
      { href: '/prophets',   label: 'قصص الأنبياء' },
      { href: '/seerah',     label: 'السيرة النبوية' },
      { href: '/asma-allah', label: 'أسماء الله الحسنى' },
      { href: '/fatawa',     label: 'الفتاوى' },
    ],
  },
  {
    title: 'الخدمات',
    links: [
      { href: '/prayer-times', label: 'مواقيت الصلاة' },
      { href: '/search',       label: 'البحث الشامل' },
      { href: '/ai',           label: 'المساعد الإسلامي' },
      { href: '/profile',      label: 'الملف الشخصي' },
    ],
  },
]

export function Footer() {
  const year = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { year: 'numeric' }).format(new Date())

  return (
    <footer className="bg-islamic-navy border-t border-gold-400/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-gold-400 text-3xl">✦</span>
            <h2 className="font-arabic text-gold-300 text-3xl font-bold">الصراط المستقيم</h2>
            <span className="text-gold-400 text-3xl">✦</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            منصة إسلامية شاملة للقرآن الكريم والسنة النبوية والعلوم الإسلامية
          </p>
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
            © {year} — الصراط المستقيم | جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-gray-500 hover:text-gold-300 text-xs transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms"   className="text-gray-500 hover:text-gold-300 text-xs transition-colors">الشروط والأحكام</Link>
            <Link href="/contact" className="text-gray-500 hover:text-gold-300 text-xs transition-colors">اتصل بنا</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
