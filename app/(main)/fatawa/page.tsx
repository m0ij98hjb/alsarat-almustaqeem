import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { truncateText } from '@/utils'

export const metadata: Metadata = {
  title: 'الفتاوى الإسلامية',
  description: 'قاعدة بيانات الفتاوى الإسلامية الموثّقة من العلماء',
}

const CATEGORIES = ['العقيدة', 'الطهارة', 'الصلاة', 'الزكاة', 'الصيام', 'الحج', 'المعاملات', 'النكاح والطلاق', 'الأطعمة', 'اللباس', 'المعاصر']

const SAMPLE_FATWAS = [
  { id: 1, question: 'ما حكم قراءة القرآن من الهاتف بدون وضوء؟', answer: 'يجوز مس الهاتف المحمول الذي فيه القرآن بدون وضوء على الراجح من أقوال أهل العلم، لأن المحرّم هو مس المصحف الورقي لا اللفظ والمعنى، والهاتف ليس مصحفاً في حقيقته. وقد أفتى بذلك عدد من العلماء المعاصرين.', category: 'الطهارة', scholar: 'فتوى معاصرة', isVerified: true, views: 5420 },
  { id: 2, question: 'هل يجوز الصلاة بالنعال داخل المسجد؟', answer: 'الصلاة بالنعال جائزة وهي سنة في غير المساجد المفروشة. أما في المساجد المفروشة فينبغي خلع النعل حفاظاً على نظافة المسجد وتعظيمه، ولا تُشترط النعل للصحة.', category: 'الصلاة', scholar: 'علماء الفقه', isVerified: true, views: 3200 },
  { id: 3, question: 'ما حكم صيام يوم الشك؟', answer: 'لا يجوز صيام يوم الثلاثين من شعبان إذا كان بنية رمضان، لقوله ﷺ: (لا تقدموا رمضان بصوم يوم ولا يومين). أما من صامه بنية عادة أو قضاء أو نذر فلا بأس.', category: 'الصيام', scholar: 'جمهور الفقهاء', isVerified: true, views: 8100 },
  { id: 4, question: 'ما حكم الزكاة على المال في البنك؟', answer: 'المال المودع في البنك تجب فيه الزكاة إذا بلغ النصاب وحال عليه الحول، سواء كان في حساب جارٍ أو توفير. والنصاب يعادل 85 غراماً من الذهب أو ما يعادلها من الفضة.', category: 'الزكاة', scholar: 'الفقه الإسلامي', isVerified: true, views: 6750 },
  { id: 5, question: 'هل يجوز للمرأة قيادة السيارة؟', answer: 'يجوز للمرأة قيادة السيارة بالشروط الشرعية العامة كالالتزام بالحجاب وعدم الخلوة المحرمة، وهذا هو قول جمهور العلماء المعاصرين. وقد أباحت المملكة العربية السعودية ذلك رسمياً.', category: 'المعاصر', scholar: 'جمهور العلماء المعاصرين', isVerified: true, views: 12300 },
  { id: 6, question: 'ما حكم استخدام مواقع التواصل الاجتماعي؟', answer: 'استخدام مواقع التواصل الاجتماعي مباح في أصله، وحكمه يتبع ما يُستخدم فيه. فإن استُخدم في الخير والدعوة والتواصل المباح فهو مباح أو مستحب، وإن استُخدم في الحرام فهو حرام.', category: 'المعاصر', scholar: 'العلماء المعاصرون', isVerified: true, views: 9800 },
]

async function getFatwas() {
  try {
    const fatwas = await prisma.fatwa.findMany({ orderBy: { views: 'desc' }, take: 20 })
    return fatwas.length ? fatwas : SAMPLE_FATWAS
  } catch { return SAMPLE_FATWAS }
}

export default async function FatawawPage() {
  const fatwas = await getFatwas()

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">الفتاوى الإسلامية</h1>
          <p className="font-arabic text-gold-300 text-xl">﴿ فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ ﴾</p>
          <div className="mt-6 relative max-w-xl mx-auto">
            <input type="text" placeholder="ابحث في الفتاوى..." className="w-full bg-white/10 border border-gold-400/30 rounded-xl px-5 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-gold-400 text-right" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button className="px-4 py-1.5 rounded-full bg-gold-400 text-islamic-navy text-sm font-bold">الكل</button>
          {CATEGORIES.map(cat => (
            <button key={cat} className="px-4 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gold-200 dark:border-gold-800/50 text-gray-600 dark:text-gray-300 hover:border-gold-400 text-sm transition-all">
              {cat}
            </button>
          ))}
        </div>

        {/* Fatwas grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fatwas.map((f: any) => (
            <Link key={f.id} href={`/fatawa/${f.id}`} className="card-islamic p-6 group hover:border-gold-400">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-xs bg-gold-100 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 px-2.5 py-0.5 rounded-full">
                  {f.category}
                </span>
                {(f.isVerified) && (
                  <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    ✓ موثّقة
                  </span>
                )}
              </div>
              <h3 className="font-arabic text-lg font-bold text-gray-900 dark:text-white group-hover:text-gold-500 dark:group-hover:text-gold-300 mb-3 leading-normal transition-colors">
                {f.question}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                {truncateText(f.answer, 120)}
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-400">{f.scholar}</span>
                <span className="text-xs text-gray-400">👁 {(f.views || 0).toLocaleString('ar-SA')}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Ask question CTA */}
        <div className="mt-12 text-center bg-hero-gradient rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 pattern-overlay opacity-20" />
          <div className="relative z-10">
            <h2 className="font-arabic text-gold-300 text-2xl font-bold mb-3">لديك سؤال؟</h2>
            <p className="text-gray-300 mb-6">اطرح سؤالك وسيجيب عليه المتخصصون</p>
            <Link href="/questions" className="btn-gold inline-block px-8 py-3">
              اطرح سؤالاً
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
