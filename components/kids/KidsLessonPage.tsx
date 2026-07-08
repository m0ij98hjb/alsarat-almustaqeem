type LessonStep = {
  title: string
  text: string
}

type LessonSection = {
  title: string
  items: string[]
}

type QuizQuestion = {
  question: string
  options: string[]
  answer: number
}

type KidsLessonPageProps = {
  title: string
  subtitle: string
  icon: string
  intro: string
  steps: LessonStep[]
  sections: LessonSection[]
  quiz: QuizQuestion[]
}

export function KidsLessonPage({
  title,
  subtitle,
  icon,
  intro,
  steps,
  sections,
  quiz,
}: KidsLessonPageProps) {
  return (
    <div className="min-h-screen bg-islamic-cream">
      <section className="bg-hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold-400/40 bg-white/10 text-gold-300 text-3xl mb-6">
            {icon}
          </div>
          <h1 className="font-arabic text-white text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-gold-200 text-lg max-w-3xl mx-auto">{subtitle}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="card-islamic p-8 md:p-10 mb-8">
          <h2 className="font-arabic text-2xl font-bold text-islamic-green mb-4">شرح مبسط</h2>
          <p className="text-gray-700 leading-relaxed">{intro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {steps.map((step, index) => (
            <div key={step.title} className="card-islamic p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{index + 1}</span>
                <h3 className="font-arabic text-xl font-bold text-islamic-green">{step.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {sections.map((section) => (
            <div key={section.title} className="card-islamic p-6">
              <h3 className="font-arabic text-xl font-bold text-islamic-green mb-4">{section.title}</h3>
              <ul className="space-y-2 text-gray-700">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-gold-500 mt-1">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="card-islamic p-8 md:p-10">
          <h2 className="font-arabic text-2xl font-bold text-islamic-green mb-6">اختبار بسيط</h2>
          <div className="space-y-6">
            {quiz.map((item, index) => (
              <div key={item.question} className="border border-gold-200 rounded-2xl p-5">
                <p className="font-bold text-islamic-green mb-3">{index + 1}. {item.question}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {item.options.map((option, optionIndex) => (
                    <div key={option} className="rounded-xl border border-gold-200 px-4 py-3 text-sm text-gray-700">
                      {optionIndex + 1}. {option}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gold-600 mt-3">الإجابة: {item.options[item.answer]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
