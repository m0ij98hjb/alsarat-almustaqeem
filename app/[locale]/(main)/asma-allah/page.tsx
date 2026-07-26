import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AsmaAllahClient from './AsmaAllahClient'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  return {
    title: t('asmaAllah'),
    description: 'أسماء الله الحسنى التسعة والتسعون كاملة مع المعنى والشرح والمرجع القرآني لكل اسم.',
    alternates: buildAlternates(locale, 'asma-allah'),
  }
}

export default async function AsmaAllahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="font-arabic text-white text-4xl md:text-5xl font-bold mb-3">{t('asmaAllah')}</h1>
          <p className="font-arabic text-gold-300 text-lg">
            ﴿ وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَى فَادْعُوهُ بِهَا ﴾
          </p>
        </div>
      </div>
      <AsmaAllahClient />
    </div>
  )
}
