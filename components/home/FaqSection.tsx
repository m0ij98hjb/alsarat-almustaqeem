import { homeFaq } from '@/data/homeFaq'

export function FaqSection({ locale }: { locale: string }) {
  return (
    <section id="faq" className="py-20 bg-islamic-cream dark:bg-islamic-navy">
      <div className="max-w-3xl mx-auto px-4">
        <div className="section-header">
          <h2>{locale === 'ar' ? 'أسئلة شائعة' : 'Frequently Asked Questions'}</h2>
          <p>
            {locale === 'ar'
              ? 'إجابات مختصرة عن أكثر الأسئلة شيوعًا عند اكتشاف الإسلام'
              : 'Short answers to the most common questions about Islam'}
          </p>
        </div>
        <div className="space-y-4">
          {homeFaq.map((item) => (
            <details key={item.id} className="card-islamic p-5 group">
              <summary className="cursor-pointer font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 list-none flex items-center justify-between gap-3">
                {locale === 'ar' ? item.questionAr : item.questionEn}
                <span className="text-gold-500 text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                {locale === 'ar' ? item.answerAr : item.answerEn}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
