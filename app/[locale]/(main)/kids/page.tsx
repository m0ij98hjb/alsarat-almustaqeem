import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildAlternates } from '@/lib/seo'

const lessons = [
  { href: '/kids/wudu', title: 'تعلم الوضوء', icon: '🧼', desc: 'خطوات الوضوء وأهميته' },
  { href: '/kids/prayer', title: 'تعلم الصلاة', icon: '🕋', desc: 'المراحل الأساسية للصلاة وأركانها' },
  { href: '/kids/umrah', title: 'تعلم العمرة', icon: '🕯️', desc: 'خطوات العمرة بطريقة مبسطة' },
  { href: '/kids/hajj', title: 'تعلم الحج', icon: '🪔', desc: 'المشاعر المقدسة وخطوات الحج' },
  { href: '/kids/learn', title: 'تعليم الأطفال الإسلام', icon: '📘', desc: 'أساسيات الإسلام وأركانه' },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: `قسم الأطفال | ${t('siteName')}`,
    description: 'محتوى تعليمي مبسط للأطفال عن الوضوء والصلاة والحج والعمرة والإسلام.',
    alternates: buildAlternates(locale, 'kids'),
  }
}

export default async function KidsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-islamic-cream">
      <section className="bg-hero-gradient py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-400/40 bg-white/10 text-gold-300 text-3xl mb-6">
            🧒
          </div>
          <h1 className="font-arabic text-white text-4xl sm:text-5xl font-bold mb-4">قسم الأطفال</h1>
          <p className="text-gold-200 text-lg max-w-3xl mx-auto">
            محتوى بسيط وممتع للأطفال لتعلم الإسلام خطوة بخطوة مع صور وشرح مبسط.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <Link key={lesson.href} href={`/${locale}${lesson.href}`} className="card-islamic p-8 group">
              <div className="text-5xl mb-4">{lesson.icon}</div>
              <h2 className="font-arabic text-2xl font-bold text-islamic-green mb-3">{lesson.title}</h2>
              <p className="text-gray-700 leading-relaxed">{lesson.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
