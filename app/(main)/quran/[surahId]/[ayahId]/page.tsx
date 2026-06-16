import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { toArabicNum } from '@/utils'

interface Props { params: Promise<{ surahId: string; ayahId: string }> }

const TAFSEER_SOURCES = [
  { key: 'ibn-kathir', label: 'ابن كثير' },
  { key: 'sa3di',      label: 'السعدي' },
  { key: 'tabari',     label: 'الطبري' },
]

const DEMO_TAFSEER: Record<string, string> = {
  'ibn-kathir': `قال الإمام ابن كثير رحمه الله في تفسير هذه الآية الكريمة:
هذه الآية من أجل الآيات وأعظمها، وقد اشتملت على معانٍ جليلة وحِكَم بالغة. وقد أجمع العلماء على عظم شأنها وجلالة قدرها في كتاب الله تعالى.
والمعنى المراد من هذه الآية واضح بيّن لمن تدبّر كلام الله، وفيها من الأسرار والحِكَم ما يعجز عنه البيان.`,
  'sa3di': `قال الشيخ عبد الرحمن السعدي رحمه الله:
في هذه الآية الكريمة دلالة واضحة على عظمة الله وكماله وجلاله، وفيها إشارة إلى ما يجب على العبد من الإيمان والعمل الصالح والتوكل على الله في جميع الأحوال.
وهذا يستلزم من العبد أن يعظّم ربه ويجلّه ويخافه ويرجوه ويحبه، وأن يكون دائماً في حالة من الانقياد والاستسلام لأوامره.`,
  'tabari': `قال الإمام الطبري رحمه الله:
اختلف أهل التأويل في تفسير هذه الآية، فقال بعضهم: المعنى كذا، وقال آخرون: المعنى كذا. والصواب من القول في ذلك عندنا ما قاله جمهور المفسرين، وهو الموافق لمعاني كلام العرب ولسائر الآيات القرآنية.`,
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { surahId, ayahId } = await params
  return {
    title: `تفسير الآية ${ayahId} — السورة ${surahId}`,
    description: `تفسير الآية الكريمة ${ayahId} من سورة ${surahId} من القرآن الكريم`,
  }
}

export default async function AyahTafseerPage({ params }: Props) {
  const { surahId: surahIdStr, ayahId: ayahIdStr } = await params
  const surahId = parseInt(surahIdStr)
  const ayahNum = parseInt(ayahIdStr)
  if (isNaN(surahId) || isNaN(ayahNum)) notFound()

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-6 justify-center">
            <Link href="/quran" className="hover:text-gold-300 transition-colors">القرآن</Link>
            <span>/</span>
            <Link href={`/quran/${surahId}`} className="hover:text-gold-300 transition-colors">السورة {surahId}</Link>
            <span>/</span>
            <span className="text-gold-300">الآية {toArabicNum(ayahNum)}</span>
          </div>
          <div className="text-center">
            <div className="quran-text text-white text-3xl md:text-4xl mb-4 leading-loose">
              ﴿ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴾
            </div>
            <div className="text-gold-300 text-sm">
              السورة {surahId} — الآية {toArabicNum(ayahNum)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between mb-10">
          {ayahNum > 1 && (
            <Link href={`/quran/${surahId}/${ayahNum - 1}`} className="btn-outline-gold text-sm px-4 py-2">
              ← الآية السابقة
            </Link>
          )}
          <Link href={`/quran/${surahId}`} className="btn-outline-gold text-sm px-4 py-2 mx-auto">
            عودة للسورة
          </Link>
          <Link href={`/quran/${surahId}/${ayahNum + 1}`} className="btn-outline-gold text-sm px-4 py-2">
            الآية التالية →
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="font-arabic text-2xl font-bold text-islamic-green dark:text-gold-300 text-center">
            تفسير الآية الكريمة
          </h2>

          {TAFSEER_SOURCES.map(src => (
            <div key={src.key} className="card-islamic p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-200/30 dark:border-gold-800/20">
                <span className="text-gold-400 text-xl">📚</span>
                <h3 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300">
                  تفسير {src.label}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-loose text-lg font-naskh">
                {DEMO_TAFSEER[src.key]}
              </p>
            </div>
          ))}
        </div>

        <div className="card-islamic p-8 mt-6">
          <h3 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300 mb-6">
            إعراب ومعاني الكلمات
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {['بِسْمِ', 'اللَّهِ', 'الرَّحْمَنِ', 'الرَّحِيمِ'].map((word, i) => (
              <div key={i} className="bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800/40 rounded-xl p-3 text-center">
                <div className="font-arabic text-xl text-islamic-green dark:text-gold-300 mb-2">{word}</div>
                <div className="text-xs text-gray-500">
                  {['باسم', 'الله', 'الرحمن', 'الرحيم'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <button className="btn-outline-gold text-sm px-5 py-2 flex items-center gap-2">
            <span>📋</span> نسخ الآية
          </button>
          <button className="btn-outline-gold text-sm px-5 py-2 flex items-center gap-2">
            <span>🔗</span> مشاركة
          </button>
          <button className="btn-outline-gold text-sm px-5 py-2 flex items-center gap-2">
            <span>🔖</span> حفظ في المفضلة
          </button>
        </div>
      </div>
    </div>
  )
}
