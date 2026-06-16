import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'قصص الأنبياء والرسل',
  description: 'قصص جميع الأنبياء المذكورين في القرآن الكريم',
}

const PROPHETS = [
  { id: 1, nameAr: 'آدم عليه السلام',         icon: '🌱', period: 'بداية الخلق',        nation: 'البشرية كلها',    summary: 'أبو البشر، أول الأنبياء، خُلق من طين وعلّمه الله الأسماء كلها', quranMentions: 25 },
  { id: 2, nameAr: 'إدريس عليه السلام',        icon: '✍️', period: 'قبل نوح',             nation: 'البشرية',          summary: 'أول من كتب بالقلم، رُفع مكاناً علياً', quranMentions: 2 },
  { id: 3, nameAr: 'نوح عليه السلام',          icon: '🚢', period: '950 سنة',             nation: 'قومه',             summary: 'دعا قومه 950 سنة، نجّاه الله بالسفينة من الطوفان العظيم', quranMentions: 43 },
  { id: 4, nameAr: 'هود عليه السلام',          icon: '💨', period: 'بعد نوح',             nation: 'عاد',              summary: 'دعا قوم عاد فكذّبوه فأهلكهم الله بريح صرصر عاتية', quranMentions: 7 },
  { id: 5, nameAr: 'صالح عليه السلام',         icon: '🐪', period: 'بعد هود',             nation: 'ثمود',             summary: 'أُرسل إلى ثمود وأُعطي معجزة الناقة فعقروها فأُهلكوا', quranMentions: 9 },
  { id: 6, nameAr: 'إبراهيم عليه السلام',      icon: '🔥', period: '2000 ق.م تقريباً',   nation: 'بابل وفلسطين',    summary: 'خليل الله، كسر الأصنام، نجا من النار، بنى الكعبة مع إسماعيل', quranMentions: 69 },
  { id: 7, nameAr: 'لوط عليه السلام',          icon: '🌆', period: 'معاصر لإبراهيم',     nation: 'سدوم',             summary: 'ابن أخي إبراهيم، أُرسل إلى قوم سدوم الذين أهلكهم الله', quranMentions: 27 },
  { id: 8, nameAr: 'إسماعيل عليه السلام',      icon: '🗡️', period: 'ابن إبراهيم',         nation: 'العرب',            summary: 'الذبيح الكريم، بنى الكعبة مع أبيه، جد النبي محمد ﷺ', quranMentions: 12 },
  { id: 9, nameAr: 'إسحاق عليه السلام',        icon: '⭐', period: 'ابن إبراهيم',         nation: 'بني إسرائيل',     summary: 'بُشِّر به الملائكة، أبو يعقوب وسلف أنبياء بني إسرائيل', quranMentions: 17 },
  { id: 10, nameAr: 'يعقوب عليه السلام',       icon: '🌿', period: 'ابن إسحاق',           nation: 'بني إسرائيل',     summary: 'إسرائيل، أبو الأسباط الاثني عشر، حزن على يوسف حتى عَمِيَ', quranMentions: 16 },
  { id: 11, nameAr: 'يوسف عليه السلام',        icon: '👑', period: 'في مصر',              nation: 'مصر',              summary: 'أحسن القصص: الحُفرة والعبودية والسجن ثم العرش، ضرب المثل في الصبر', quranMentions: 27 },
  { id: 12, nameAr: 'شعيب عليه السلام',        icon: '⚖️', period: 'معاصر لموسى',        nation: 'مدين',             summary: 'دعا قوم مدين إلى التوحيد وإيفاء الكيل والميزان', quranMentions: 11 },
  { id: 13, nameAr: 'أيوب عليه السلام',        icon: '💎', period: 'في بلاد الشام',       nation: 'قومه',             summary: 'ضرب المثل في الصبر على البلاء ثمانية عشر عاماً حتى فرّج الله', quranMentions: 4 },
  { id: 14, nameAr: 'ذو الكفل عليه السلام',   icon: '🛡️', period: 'بعد أيوب',            nation: 'قومه',             summary: 'من الصابرين الصالحين، تكفّل لله بالصيام والصلاة', quranMentions: 2 },
  { id: 15, nameAr: 'موسى عليه السلام',        icon: '🔱', period: '1300 ق.م تقريباً',   nation: 'بني إسرائيل',     summary: 'كليم الله، قاد بني إسرائيل من مصر، أُعطي التوراة، أكثر الأنبياء ذكراً', quranMentions: 136 },
  { id: 16, nameAr: 'هارون عليه السلام',       icon: '🎙️', period: 'أخو موسى',           nation: 'بني إسرائيل',     summary: 'أخو موسى ومعينه، فصيح اللسان، أُرسل معه إلى فرعون', quranMentions: 20 },
  { id: 17, nameAr: 'اليسع عليه السلام',       icon: '💧', period: 'بعد إيليا',           nation: 'بني إسرائيل',     summary: 'من أفضل الأنبياء، وصفه الله بالاصطفاء على العالمين', quranMentions: 2 },
  { id: 18, nameAr: 'يونس عليه السلام',        icon: '🐋', period: 'في الموصل',           nation: 'نينوى',            summary: 'ذو النون، ابتُلي ببطن الحوت ثم نجّاه الله بتسبيحه', quranMentions: 4 },
  { id: 19, nameAr: 'إلياس عليه السلام',       icon: '⚡', period: 'في لبنان',            nation: 'بني إسرائيل',     summary: 'دعا قومه إلى التوحيد ونهاهم عن عبادة بعل', quranMentions: 2 },
  { id: 20, nameAr: 'داود عليه السلام',        icon: '🎵', period: '1000 ق.م',            nation: 'بني إسرائيل',     summary: 'قتل جالوت نبياً وملكاً، أُوتي الزبور، لانت له الحديد', quranMentions: 16 },
  { id: 21, nameAr: 'سليمان عليه السلام',      icon: '🦁', period: 'ابن داود',            nation: 'بني إسرائيل',     summary: 'ملك الأنس والجن والطير، تكلّم مع النمل، ملك لا ينبغي لأحد', quranMentions: 17 },
  { id: 22, nameAr: 'زكريا عليه السلام',       icon: '🌸', period: 'قبل عيسى',            nation: 'بني إسرائيل',     summary: 'دعا ربه دعاءً خفياً فوهبه يحيى على كبر السن وعقر زوجته', quranMentions: 7 },
  { id: 23, nameAr: 'يحيى عليه السلام',        icon: '📖', period: 'معاصر لعيسى',         nation: 'بني إسرائيل',     summary: 'أُعطي الحكم صبياً، سيداً وحصوراً، شهيد الحق', quranMentions: 5 },
  { id: 24, nameAr: 'عيسى عليه السلام',        icon: '✨', period: '0-30 م',              nation: 'بني إسرائيل',     summary: 'روح الله وكلمته، وُلد من غير أب، أحيا الموتى، رُفع إلى السماء', quranMentions: 25 },
  { id: 25, nameAr: 'محمد ﷺ',                icon: '🌙', period: '570-632 م',            nation: 'البشرية كاملة',   summary: 'خاتم الأنبياء والمرسلين، رحمة للعالمين، أُنزل عليه القرآن', quranMentions: 4 },
]

export default function ProphetsPage() {
  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">قصص الأنبياء والرسل</h1>
          <p className="font-arabic text-gold-300 text-xl">
            ﴿ وَكُلًّا نَّقُصُّ عَلَيْكَ مِنْ أَنبَاءِ الرُّسُلِ ﴾
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROPHETS.map(prophet => (
            <div key={prophet.id} className="card-islamic p-6 hover:border-gold-400 group cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{prophet.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 transition-colors leading-normal">
                      {prophet.nameAr}
                    </h3>
                    <span className="text-xs bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {prophet.quranMentions}× في القرآن
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 mb-2">📍 {prophet.nation} — {prophet.period}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{prophet.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
