'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_QUESTIONS = [
  'ما هي أركان الإسلام؟',
  'ما فضل قراءة القرآن الكريم؟',
  'ما أركان الإيمان الستة؟',
  'اشرح معنى التوحيد',
  'ما حكم الصلاة في الإسلام؟',
  'ما فضل الاستغفار؟',
]

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'السلام عليكم ورحمة الله وبركاته 🌙\n\nأنا "الرشيد"، مساعدك الإسلامي الذكي. أجيب على أسئلتك من القرآن الكريم والسنة النبوية الصحيحة.\n\nكيف أستطيع مساعدتك اليوم؟',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: messages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'عذراً، حدث خطأ. حاول مجدداً.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، حدث خطأ في الاتصال. تأكد من إعداد مفتاح Anthropic API.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient flex flex-col">
      <div className="absolute inset-0 pattern-overlay opacity-20" />

      <div className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-islamic-green border-2 border-gold-400 mb-4 animate-pulse-gold">
            <span className="text-4xl">☪️</span>
          </div>
          <h1 className="font-arabic text-gold-300 text-3xl font-bold">الرشيد</h1>
          <p className="text-gray-300 text-sm">المساعد الإسلامي الذكي — يجيب من القرآن والسنة</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs">متصل الآن</span>
          </div>
        </div>

        {/* Quick questions */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-xs px-3 py-1.5 rounded-full border border-gold-400/40 text-gold-300 hover:bg-gold-400/10 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 bg-islamic-navy-mid/80 backdrop-blur rounded-2xl border border-gold-400/20 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-lg ${
                  msg.role === 'assistant'
                    ? 'bg-islamic-green border border-gold-400/50'
                    : 'bg-gold-400 text-islamic-navy font-bold text-sm'
                }`}>
                  {msg.role === 'assistant' ? '☪️' : '👤'}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap font-naskh ${
                  msg.role === 'assistant'
                    ? 'bg-white/8 text-gray-100 rounded-tl-none'
                    : 'bg-gold-400 text-islamic-navy font-medium rounded-tr-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-islamic-green border border-gold-400/50 flex items-center justify-center text-lg">
                  ☪️
                </div>
                <div className="bg-white/8 rounded-2xl rounded-tl-none px-5 py-4 flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gold-400"
                      style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gold-400/20 p-4">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="اكتب سؤالك الإسلامي هنا..."
                className="flex-1 bg-white/5 border border-gold-400/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400 text-sm text-right"
                disabled={loading}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                className="btn-gold w-12 h-12 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="rotate-180" />}
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              المساعد يجيب بناءً على القرآن الكريم والسنة النبوية — تحقق دائماً من المصادر
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
