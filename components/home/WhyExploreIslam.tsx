interface ValueCard {
  icon: string
  titleAr: string
  titleEn: string
  descAr: string
  descEn: string
  refText: string
}

const values: ValueCard[] = [
  {
    icon: '🤲',
    titleAr: 'الرحمة',
    titleEn: 'Mercy',
    descAr: 'يفتتح المسلمون كل عمل باسم الله الرحمن الرحيم، فالرحمة صفة جوهرية في الإسلام تجاه كل الخلق.',
    descEn: 'Muslims begin every act in the name of the Most Merciful — mercy is central to how Islam sees all creation.',
    refText: 'الأنبياء: ١٠٧',
  },
  {
    icon: '⚖️',
    titleAr: 'العدل',
    titleEn: 'Justice',
    descAr: 'يأمر الإسلام بالعدل حتى مع من نكره، ويجعله قريباً من التقوى.',
    descEn: 'Islam commands justice even toward those we dislike, and ties it closely to piety.',
    refText: 'المائدة: ٨',
  },
  {
    icon: '💞',
    titleAr: 'التراحم',
    titleEn: 'Compassion',
    descAr: 'وصف النبي ﷺ المؤمنين بأنهم كالجسد الواحد في تراحمهم وتعاطفهم.',
    descEn: 'The Prophet ﷺ described believers as one body in their mutual compassion.',
    refText: 'متفق عليه',
  },
  {
    icon: '📚',
    titleAr: 'طلب العلم',
    titleEn: 'Knowledge',
    descAr: 'أول ما نزل من القرآن أمرٌ بالقراءة، وطلب العلم فريضة على كل مسلم ومسلمة.',
    descEn: 'The first Quranic revelation was a command to read — seeking knowledge is a duty on every Muslim.',
    refText: 'العلق: ١',
  },
  {
    icon: '👨‍👩‍👧',
    titleAr: 'الأسرة',
    titleEn: 'Family',
    descAr: 'يعتني الإسلام ببر الوالدين وصلة الرحم كأساس لمجتمع مترابط.',
    descEn: 'Islam places deep emphasis on honoring parents and maintaining family ties.',
    refText: 'الإسراء: ٢٣',
  },
  {
    icon: '🌅',
    titleAr: 'الأمل',
    titleEn: 'Hope',
    descAr: 'ينهى الإسلام عن اليأس من رحمة الله مهما عظم الذنب أو اشتدت المحنة.',
    descEn: 'Islam forbids despairing of God\'s mercy, no matter how great the hardship.',
    refText: 'الزمر: ٥٣',
  },
  {
    icon: '☮️',
    titleAr: 'السلام',
    titleEn: 'Peace',
    descAr: 'الإسلام نفسه مشتق من السلام، وتحية المسلمين بينهم هي السلام.',
    descEn: 'The word "Islam" itself shares its root with "peace," and Muslims greet one another with it.',
    refText: 'النساء: ٩٤',
  },
  {
    icon: '🤝',
    titleAr: 'الصدق',
    titleEn: 'Honesty',
    descAr: 'أمر النبي ﷺ بالصدق حتى يبلغ صاحبه منازل الصدّيقين.',
    descEn: 'The Prophet ﷺ urged truthfulness until it leads a person to the ranks of the sincere.',
    refText: 'متفق عليه',
  },
]

export function WhyExploreIslam({ locale }: { locale: string }) {
  return (
    <section className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2>{locale === 'ar' ? 'لماذا تكتشف الإسلام؟' : 'Why Explore Islam'}</h2>
          <p>
            {locale === 'ar'
              ? 'قيم إنسانية جامعة يقوم عليها الإسلام'
              : 'Universal human values at the heart of Islam'}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {values.map((v) => (
            <div key={v.titleEn} className="card-islamic p-5 text-center">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 mb-2">
                {locale === 'ar' ? v.titleAr : v.titleEn}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-2">
                {locale === 'ar' ? v.descAr : v.descEn}
              </p>
              <span className="text-xs text-gold-500">{v.refText}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
