import Link from 'next/link'

const channels = [
  {
    title: 'قناة القرآن الكريم السعودية',
    description: 'بث مباشر لقراءة وتفسير القرآن الكريم من القناة الرسمية.',
    status: 'بث مباشر',
    href: 'https://www.youtube.com/@quran',
    icon: '📖',
    button: 'تشغيل',
  },
  {
    title: 'قناة السنة النبوية من المدينة المنورة',
    description: 'محتوى ديني متميز من برامج وشرح للسنة النبوية.',
    status: 'بث مباشر',
    href: 'https://www.youtube.com/@sunnah',
    icon: '📿',
    button: 'تشغيل',
  },
  {
    title: 'إذاعة القرآن الكريم',
    description: 'مشغل صوت مباشر لتلاوة القرآن الكريم في أي وقت.',
    status: 'مشغل صوت مباشر',
    href: 'https://quranradio.com',
    icon: '🎧',
    button: 'تشغيل / إيقاف',
  },
]

export function LivePageContent() {
  return (
    <div className="min-h-screen bg-islamic-cream">
      <section className="bg-hero-gradient py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-400/40 bg-white/10 text-gold-300 text-3xl mb-6">
            📡
          </div>
          <h1 className="font-arabic text-white text-4xl sm:text-5xl font-bold mb-4">البث المباشر</h1>
          <p className="text-gold-200 text-lg max-w-3xl mx-auto">
            تابع القنوات والإذاعات الإسلامية مباشرة مع تجربة مريحة تتناسب مع هوية الموقع.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {channels.map((channel) => (
            <article key={channel.title} className="card-islamic p-8 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-4xl">{channel.icon}</span>
                <span className="text-xs font-bold rounded-full bg-gold-100 text-gold-700 px-3 py-1">
                  {channel.status}
                </span>
              </div>
              <div>
                <h2 className="font-arabic text-2xl font-bold text-islamic-green mb-3">{channel.title}</h2>
                <p className="text-gray-700 leading-relaxed">{channel.description}</p>
              </div>
              <Link
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="btn-gold inline-flex items-center justify-center"
              >
                {channel.button}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
