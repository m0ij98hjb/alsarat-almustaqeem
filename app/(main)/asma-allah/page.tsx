import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'أسماء الله الحسنى',
  description: 'أسماء الله الحسنى الـ99 مع الشرح والمعنى والفضائل',
}

const ASMA_ALLAH = [
  { num: 1,  ar: 'الله',      en: 'Allah',          meaning: 'اسم الجلالة الأعظم الجامع لمعاني الألوهية كلها' },
  { num: 2,  ar: 'الرحمن',   en: 'Ar-Rahman',       meaning: 'واسع الرحمة يشمل برحمته جميع خلقه في الدنيا' },
  { num: 3,  ar: 'الرحيم',   en: 'Ar-Rahim',        meaning: 'خاص رحمته بالمؤمنين في الآخرة' },
  { num: 4,  ar: 'الملك',    en: 'Al-Malik',        meaning: 'المالك الحقيقي لكل شيء، ومالك يوم الدين' },
  { num: 5,  ar: 'القدوس',   en: 'Al-Quddus',       meaning: 'المنزّه عن كل عيب ونقص وكل ما لا يليق بجلاله' },
  { num: 6,  ar: 'السلام',   en: 'As-Salam',        meaning: 'السالم من كل نقص، المُسلِّم على عباده في الجنة' },
  { num: 7,  ar: 'المؤمن',   en: 'Al-Mumin',        meaning: 'المصدّق لأنبيائه، الواهب لعباده الأمن والطمأنينة' },
  { num: 8,  ar: 'المهيمن',  en: 'Al-Muhaymin',     meaning: 'الرقيب الحافظ على كل شيء، القائم على كل نفس' },
  { num: 9,  ar: 'العزيز',   en: 'Al-Aziz',         meaning: 'الغالب القاهر الذي لا يُقهر ولا يُغلب' },
  { num: 10, ar: 'الجبار',   en: 'Al-Jabbar',       meaning: 'القاهر فوق عباده، الجابر للكسور، المُصلح للأمور' },
  { num: 11, ar: 'المتكبر',  en: 'Al-Mutakabbir',   meaning: 'المتعظم بكل صفات الكمال والجلال والجمال' },
  { num: 12, ar: 'الخالق',   en: 'Al-Khaliq',       meaning: 'الذي أوجد الكون من العدم وقدّر كل شيء' },
  { num: 13, ar: 'البارئ',   en: 'Al-Bari',         meaning: 'منشئ الخلق ومُفرِّق بعضهم من بعض' },
  { num: 14, ar: 'المصوّر',  en: 'Al-Musawwir',     meaning: 'الذي صوّر كل مخلوق وأعطاه صورته الخاصة' },
  { num: 15, ar: 'الغفار',   en: 'Al-Ghaffar',      meaning: 'كثير المغفرة لذنوب عباده في كل وقت' },
  { num: 16, ar: 'القهار',   en: 'Al-Qahhar',       meaning: 'الغالب على كل شيء، الذي قهر كل شيء بقدرته' },
  { num: 17, ar: 'الوهاب',   en: 'Al-Wahhab',       meaning: 'كثير العطاء والهبات بلا عوض ولا مقابل' },
  { num: 18, ar: 'الرزاق',   en: 'Ar-Razzaq',       meaning: 'المتكفل بأرزاق جميع مخلوقاته في كل حال' },
  { num: 19, ar: 'الفتاح',   en: 'Al-Fattah',       meaning: 'يفتح أبواب الرحمة والرزق والنصر لمن يشاء' },
  { num: 20, ar: 'العليم',   en: 'Al-Alim',         meaning: 'محيط علمه بكل شيء ظاهراً وباطناً' },
  { num: 21, ar: 'القابض',   en: 'Al-Qabid',        meaning: 'يقبض الأرواح والأرزاق حسب حكمته' },
  { num: 22, ar: 'الباسط',   en: 'Al-Basit',        meaning: 'يبسط الأرزاق ويوسعها على من يشاء' },
  { num: 23, ar: 'الخافض',   en: 'Al-Khafid',       meaning: 'يخفض المتكبرين ويذل الجبارين' },
  { num: 24, ar: 'الرافع',   en: 'Ar-Rafi',         meaning: 'يرفع المؤمنين بالإيمان والعمل الصالح' },
  { num: 25, ar: 'المعز',    en: 'Al-Muizz',        meaning: 'يُعز من يشاء بالنصر والتأييد' },
  { num: 26, ar: 'المذل',    en: 'Al-Mudhill',      meaning: 'يذل من يشاء بالقهر والغلبة' },
  { num: 27, ar: 'السميع',   en: 'As-Sami',         meaning: 'يسمع كل صوت ظاهراً وخافياً' },
  { num: 28, ar: 'البصير',   en: 'Al-Basir',        meaning: 'يرى كل شيء دقيق وجليل في الظلمات والنور' },
  { num: 29, ar: 'الحكم',    en: 'Al-Hakam',        meaning: 'الحاكم العدل الذي لا يظلم أحداً' },
  { num: 30, ar: 'العدل',    en: 'Al-Adl',          meaning: 'البالغ العدل في كل أقواله وأفعاله وأحكامه' },
  { num: 99, ar: 'الصبور',   en: 'As-Sabur',        meaning: 'الذي لا يعجل بالعقوبة ويمهل العاصين' },
]

const colors = [
  'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40 hover:border-emerald-400',
  'bg-gold-50 dark:bg-gold-900/20 border-gold-200 dark:border-gold-800/40 hover:border-gold-400',
  'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/40 hover:border-blue-400',
  'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/40 hover:border-purple-400',
]

export default function AsmaAllahPage() {
  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">أسماء الله الحسنى</h1>
          <p className="font-arabic text-gold-300 text-xl">
            ﴿ وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا ﴾
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {ASMA_ALLAH.map((name, i) => (
            <div
              key={name.num}
              className={`border rounded-2xl p-4 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${colors[i % 4]}`}
            >
              <div className="text-xs text-gray-400 mb-2">{name.num}</div>
              <div className="font-arabic text-2xl font-bold text-islamic-green dark:text-gold-300 mb-1 leading-normal">
                {name.ar}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {name.meaning.substring(0, 50)}...
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
