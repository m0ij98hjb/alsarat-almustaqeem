export function WorldStats({ locale }: { locale: string }) {
  const stats = [
    { num: '1.9B+', labelAr: 'مسلم حول العالم', labelEn: 'Muslims worldwide' },
    { num: '~50', labelAr: 'دولة ذات أغلبية مسلمة', labelEn: 'Muslim-majority countries' },
    { num: '2nd', labelAr: 'أكبر ديانة في العالم', labelEn: 'Largest religion by growth' },
    { num: '1400+', labelAr: 'عام من التاريخ المتصل', labelEn: 'Years of continuous history' },
  ]

  return (
    <section className="bg-islamic-green py-14">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-arabic text-white text-2xl md:text-3xl font-bold">
            {locale === 'ar' ? 'الإسلام حول العالم' : 'Islam Around the World'}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.labelEn}>
              <div className="font-arabic text-3xl md:text-4xl font-bold text-gold-300 mb-1">{s.num}</div>
              <div className="text-green-200 text-sm">{locale === 'ar' ? s.labelAr : s.labelEn}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
