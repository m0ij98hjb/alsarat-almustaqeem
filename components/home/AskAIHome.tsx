'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export function AskAIHome() {
  const locale = useLocale()
  const [input, setInput] = useState('')
  const [reply, setReply] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const suggested =
    locale === 'ar'
      ? ['من هو الله؟', 'من هو محمد ﷺ؟', 'لماذا نصلي؟', 'ما هو القرآن؟', 'هل يمكنني أن أصبح مسلمًا؟']
      : ['Who is Allah?', 'Who is Muhammad ﷺ?', 'Why do Muslims pray?', 'What is the Quran?', 'Can I become Muslim?']

  const ask = async (question: string) => {
    if (!question.trim() || loading) return
    setInput(question)
    setLoading(true)
    setReply(null)
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, language: locale }),
      })
      const data = await res.json()
      setReply(data.reply || (locale === 'ar' ? 'تعذّر الحصول على إجابة الآن.' : 'Could not get an answer right now.'))
    } catch {
      setReply(locale === 'ar' ? 'تعذّر الاتصال بالمساعد الآن.' : 'Could not reach the assistant right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="ask-ai" className="py-20 bg-islamic-navy-mid">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🤖</div>
          <h2 className="font-arabic text-white text-3xl font-bold mb-3">
            {locale === 'ar' ? 'اسأل عن الإسلام' : 'Ask AI About Islam'}
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            {locale === 'ar'
              ? 'إجابات من القرآن الكريم والسنة الصحيحة والمصادر الإسلامية الموثوقة فقط'
              : 'Answers drawn only from the Quran, authentic Sunnah, and trusted Islamic sources'}
          </p>
        </div>

        <div className="rounded-[28px] bg-white/95 dark:bg-gray-900/90 border border-gold-200/60 dark:border-gray-800 p-5 sm:p-6 shadow-lg shadow-black/10 backdrop-blur">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              ask(input)
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={locale === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
              className="search-input flex-1 h-14 text-base"
            />
            <button type="submit" disabled={loading} className="btn-gold px-8 py-3 h-14 whitespace-nowrap">
              {loading ? (locale === 'ar' ? 'جاري البحث...' : 'Asking...') : locale === 'ar' ? 'اسأل' : 'Ask'}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {suggested.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="rounded-full px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gold-100 dark:hover:bg-gold-900/30 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {reply && (
            <div className="mt-5 rounded-2xl bg-gold-50 dark:bg-gray-800 p-5 text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed">
              {reply}
            </div>
          )}

          <div className="mt-5 text-center">
            <Link href={`/${locale}/ai`} className="btn-outline-gold text-sm px-6 py-2 inline-block">
              {locale === 'ar' ? 'متابعة المحادثة الكاملة' : 'Continue full conversation'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
