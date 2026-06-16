import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'الصراط المستقيم — منصة إسلامية شاملة',
  description: 'منصة إسلامية شاملة للقرآن الكريم والسنة النبوية والأذكار والفتاوى',
}

const features = [
  { href: '/quran',        icon: '📖', title: 'القرآن الكريم',          desc: 'القرآن كاملاً مع التفسير والبحث في الآيات',      badge: '114 سورة' },
  { href: '/hadith',       icon: '📜', title: 'الأحاديث النبوية',       desc: 'صحيح البخاري ومسلم والسنن الكبرى مع التصنيف',    badge: '6 كتب' },
  { href: '/adhkar',       icon: '📿', title: 'الأذكار والأدعية',       desc: 'حصن المسلم كاملاً — أذكار الصباح والمساء والنوم', badge: '200+ ذكر' },
  { href: '/prophets',     icon: '🌟', title: 'قصص الأنبياء',           desc: 'قصص جميع الأنبياء المذكورين في القرآن',           badge: '25 نبي' },
  { href: '/seerah',       icon: '🌙', title: 'السيرة النبوية',         desc: 'حياة النبي ﷺ كاملة — الولادة إلى الوفاة',        badge: 'كاملة' },
  { href: '/asma-allah',   icon: '✨', title: 'أسماء الله الحسنى',      desc: 'شرح الـ99 اسماً مع المعنى والفضائل',              badge: '99 اسم' },
  { href: '/fatawa',       icon: '⚖️', title: 'الفتاوى الإسلامية',      desc: 'قاعدة بيانات الفتاوى مع محرك بحث ذكي',            badge: 'موثّقة' },
  { href: '/prayer-times', icon: '🕌', title: 'مواقيت الصلاة',          desc: 'مواقيت دقيقة لجميع مدن العالم',                   badge: 'دقيق' },
  { href: '/ai',           icon: '🤖', title: 'المساعد الإسلامي الذكي', desc: 'اسأل أي سؤال — يجيب من القرآن والسنة',            badge: 'AI' },
]

const stats_static = [
  { num: '6,236',    label: 'آية قرآنية' },
  { num: '100,000+', label: 'حديث نبوي' },
  { num: '25',       label: 'قصة نبي' },
  { num: '99',       label: 'اسم لله الحسنى' },
]

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-30" />

        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg viewBox="0 0 600 600" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#C9A227" strokeWidth="0.8" fill="none">
              <polygon points="300,30 360,150 490,150 395,225 430,350 300,280 170,350 205,225 110,150 240,150" />
              <polygon points="300,10 380,170 520,170 410,250 450,390 300,310 150,390 190,250 80,170 220,170" opacity="0.5" />
              <circle cx="300" cy="300" r="200" opacity="0.3" />
              <circle cx="300" cy="300" r="240" opacity="0.15" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="font-arabic text-gold-300 text-3xl md:text-4xl mb-6 opacity-90">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>

          <h1 className="font-arabic text-white text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="text-gold-400">✦</span>{' '}
            الصراط <span className="text-gold-300">المستقيم</span>{' '}
            <span className="text-gold-400">✦</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            منصة إسلامية شاملة للقرآن الكريم والسنة النبوية والعلوم الإسلامية
          </p>

          <div className="inline-block border-x-2 border-gold-400 px-8 py-4 mb-10">
            <p className="font-arabic text-gold-200 text-xl md:text-2xl">
              ﴿ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴾
            </p>
            <p className="text-gray-400 text-sm mt-1">سورة الفاتحة — الآية 6</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quran"  className="btn-gold text-base px-8 py-3">📖 القرآن الكريم</Link>
            <Link href="/adhkar" className="btn-outline-gold text-base px-8 py-3">📿 الأذكار</Link>
            <Link href="/ai"     className="btn-outline-gold text-base px-8 py-3">🤖 المساعد الذكي</Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-400 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-islamic-green py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats_static.map(s => (
            <div key={s.label}>
              <div className="font-arabic text-3xl md:text-4xl font-bold text-gold-300 mb-1">{s.num}</div>
              <div className="text-green-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header">
            <h2>أقسام الموقع</h2>
            <p>كل ما يحتاجه المسلم في مكان واحد</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <Link key={f.href} href={f.href} className="card-islamic p-6 group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors">
                    {f.title}
                  </h3>
                  <span className="text-xs bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded-full">
                    {f.badge}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DAILY AYAH ===== */}
      <section className="py-20 bg-islamic-navy-mid">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="divider-islamic justify-center mb-8">
            <span>آية اليوم</span>
          </div>
          <blockquote className="quran-text text-white text-2xl md:text-3xl mb-6">
            ﴿ وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ﴾
          </blockquote>
          <p className="text-gold-400 text-lg mb-8">سورة الطلاق — الآيتان 2-3</p>
          <Link href="/quran/65" className="btn-outline-gold inline-block">
            اقرأ السورة كاملة
          </Link>
        </div>
      </section>

      {/* ===== AI CTA ===== */}
      <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-hero-gradient rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pattern-overlay opacity-20" />
            <div className="relative z-10">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="font-arabic text-gold-300 text-3xl font-bold mb-4">المساعد الإسلامي الذكي "الرشيد"</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                اسأل أي سؤال إسلامي وسيجيب المساعد من القرآن الكريم والسنة النبوية الصحيحة
              </p>
              <Link href="/ai" className="btn-gold text-base px-10 py-3 inline-block">
                ابدأ المحادثة الآن
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
