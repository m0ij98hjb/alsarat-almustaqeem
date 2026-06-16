import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

interface Props { params: Promise<{ id: string }> }

const DEMO_FATWA = {
  id: 1,
  question: 'ما حكم قراءة القرآن من الهاتف بدون وضوء؟',
  answer: `يجوز مس الهاتف المحمول الذي فيه القرآن بدون وضوء على الراجح من أقوال أهل العلم، لأن المحرّم هو مس المصحف الورقي لا اللفظ والمعنى، والهاتف ليس مصحفاً في حقيقته.

**الأدلة:**
قال تعالى: ﴿لَّا يَمَسُّهُ إِلَّا الْمُطَهَّرُونَ﴾ [الواقعة: 79]، وهذا في المصحف الورقي الكريم.

أما الهاتف فإن ما فيه من الآيات هو برمجة إلكترونية وليس مصحفاً حقيقياً، ولذا أفتى جمع من العلماء المعاصرين بجواز مسه بدون وضوء.

**قول العلماء:**
- أجازه الشيخ ابن باز رحمه الله وعدد من العلماء المعاصرين.
- ذهب بعض العلماء إلى الاحتياط بالوضوء لأن فيه القرآن.
- والراجح الجواز لعدم انطباق حكم المصحف على الأجهزة الإلكترونية.

**الخلاصة:** يجوز قراءة القرآن من الهاتف بدون وضوء، وإن توضأت فهو أفضل وأكمل.`,
  category: 'الطهارة',
  scholar: 'العلماء المعاصرون',
  source: 'اجتهاد فقهي معاصر',
  tags: ['القرآن', 'الوضوء', 'الهاتف', 'الطهارة'],
  isVerified: true,
  views: 5420,
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return { title: `فتوى #${id} — الصراط المستقيم` }
}

export default async function FatwaDetailPage({ params }: Props) {
  const { id: idStr } = await params
  const id = parseInt(idStr)
  if (isNaN(id)) notFound()

  let fatwa: any = null
  try { fatwa = await prisma.fatwa.findUnique({ where: { id } }) } catch {}
  fatwa = fatwa || DEMO_FATWA

  // Process markdown-like formatting
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h4 key={i} className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>
      }
      if (line.startsWith('-')) {
        return <li key={i} className="text-gray-700 dark:text-gray-300 mr-4 mb-1">{line.slice(1)}</li>
      }
      if (!line.trim()) return <br key={i} />
      return <p key={i} className="text-gray-700 dark:text-gray-300 leading-loose mb-2">{line}</p>
    })
  }

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-6 justify-center">
            <Link href="/fatawa" className="hover:text-gold-300 transition-colors">الفتاوى</Link>
            <span>/</span>
            <span className="text-gold-300">{fatwa.category}</span>
          </div>
          <h1 className="font-arabic text-white text-2xl md:text-3xl font-bold text-center leading-normal">
            {fatwa.question}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        {/* Meta */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-xs bg-gold-100 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 px-3 py-1 rounded-full">{fatwa.category}</span>
          {fatwa.isVerified && <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">✓ فتوى موثّقة</span>}
          <span className="text-xs text-gray-400 mr-auto">👁 {(fatwa.views || 0).toLocaleString('ar-SA')}</span>
        </div>

        {/* Answer */}
        <div className="card-islamic p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-200/30 dark:border-gold-800/20">
            <span className="text-2xl">⚖️</span>
            <h2 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300">الجواب</h2>
          </div>
          <div className="font-naskh text-lg leading-loose">
            {formatText(fatwa.answer)}
          </div>
        </div>

        {/* Scholar & source */}
        <div className="card-islamic p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">المرجع</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{fatwa.scholar}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">المصدر</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{fatwa.source || 'الفقه الإسلامي'}</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {fatwa.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {fatwa.tags.map((tag: string) => (
              <span key={tag} className="bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 text-sm px-3 py-1 rounded-full border border-gold-200 dark:border-gold-800/40">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button className="btn-outline-gold text-sm px-5 py-2 flex items-center gap-2">📋 نسخ</button>
          <button className="btn-outline-gold text-sm px-5 py-2 flex items-center gap-2">🔗 مشاركة</button>
          <Link href="/fatawa" className="btn-outline-gold text-sm px-5 py-2 flex items-center gap-2">← الفتاوى</Link>
        </div>
      </div>
    </div>
  )
}
