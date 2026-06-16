'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Loader2, Volume2, VolumeX, Square, Wifi, WifiOff } from 'lucide-react'

// ── SVG Avatar ────────────────────────────────────────────────────────────────
function RashidAvatar({ isSpeaking, size = 'lg' }: { isSpeaking: boolean; size?: 'lg' | 'sm' }) {
  const dim = size === 'lg' ? 80 : 36
  return (
    <div className="relative flex-shrink-0" style={{ width: dim, height: dim }}>
      {isSpeaking && (
        <>
          <span
            className="absolute inset-0 rounded-full border-2 border-gold-400/70 animate-ping"
            style={{ animationDuration: '1.1s' }}
          />
          <span
            className="absolute -inset-1.5 rounded-full border border-gold-300/30 animate-ping"
            style={{ animationDuration: '1.7s', animationDelay: '0.35s' }}
          />
        </>
      )}
      <svg
        viewBox="0 0 100 100"
        style={{ width: dim, height: dim }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle — dark Islamic green */}
        <circle cx="50" cy="50" r="50" fill="#1B4332" />

        {/* Thobe collar at the bottom */}
        <path d="M14 100 Q25 77 50 75 Q75 77 86 100Z" fill="#F0EEEA" />

        {/* Neck */}
        <ellipse cx="50" cy="74" rx="7" ry="4.5" fill="#C8916A" />

        {/* Face */}
        <ellipse cx="50" cy="58" rx="18" ry="20" fill="#D9A36A" />

        {/* Beard — dark warm brown */}
        <path
          d="M33 64 Q28 76 33 85 Q41 93 50 93 Q59 93 67 85 Q72 76 67 64 Q61 73 50 74 Q39 73 33 64Z"
          fill="#6B4A22"
        />
        {/* Beard highlight / volume */}
        <path
          d="M36 66 Q34 77 38 83 Q43 89 50 90 Q50 82 50 74 Q42 73 36 66Z"
          fill="#7A5528"
          opacity="0.6"
        />

        {/* Ghutrah main white cloth — drapes over top of head */}
        <ellipse cx="50" cy="37" rx="24" ry="20" fill="#F4F4F4" />

        {/* Left side drape of ghutrah */}
        <path d="M26 37 Q20 52 23 68 Q29 82 37 82 Q32 70 32 60 Q30 49 26 37Z" fill="#EDEDED" />

        {/* Iqal — black headband ring (two tones for depth) */}
        <ellipse cx="50" cy="43" rx="24" ry="8" fill="#1C1C1C" />
        <ellipse cx="50" cy="41" rx="24" ry="8" fill="#2E2E2E" />
        {/* Thin gold highlight on iqal */}
        <ellipse cx="50" cy="40" rx="24" ry="7.5" fill="none" stroke="#C9A34D" strokeWidth="0.5" />

        {/* White ghutrah cap above iqal */}
        <ellipse cx="50" cy="29" rx="20" ry="13" fill="#F4F4F4" />

        {/* ── FACE FEATURES ── */}

        {/* Eye whites */}
        <ellipse cx="42" cy="54" rx="4.8" ry="4" fill="white" />
        <ellipse cx="58" cy="54" rx="4.8" ry="4" fill="white" />

        {/* Irises */}
        <ellipse cx="42" cy="54" rx="3" ry="3" fill="#3A2508" />
        <ellipse cx="58" cy="54" rx="3" ry="3" fill="#3A2508" />

        {/* Pupils */}
        <ellipse cx="42" cy="54" rx="1.5" ry="1.5" fill="#0C0C0C" />
        <ellipse cx="58" cy="54" rx="1.5" ry="1.5" fill="#0C0C0C" />

        {/* Eye shine */}
        <circle cx="43.2" cy="52.8" r="1" fill="white" />
        <circle cx="59.2" cy="52.8" r="1" fill="white" />

        {/* Eyebrows */}
        <path
          d="M36.5 48 Q42 45.5 47.5 47.5"
          stroke="#5A3612"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M52.5 47.5 Q58 45.5 63.5 48"
          stroke="#5A3612"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Nose */}
        <path d="M50 58 Q47 63 48.5 65.5 Q50 67 51.5 65.5 Q53 63 50 58Z" fill="#BE8748" />

        {/* Mouth — calm, dignified smile */}
        <path
          d="M44 69 Q50 73 56 69"
          stroke="#8E5E2A"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

// ── Sound Wave ─────────────────────────────────────────────────────────────────
function SoundWave({ isActive }: { isActive: boolean }) {
  const bars = [3, 6, 10, 14, 10, 7, 12, 9, 5, 3]
  return (
    <div
      className="flex items-end justify-center gap-0.5 mt-1 overflow-hidden transition-all duration-300"
      style={{ height: isActive ? '20px' : '0px', opacity: isActive ? 1 : 0 }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full"
          style={{
            height: `${h}px`,
            backgroundColor: '#C9A227',
            transformOrigin: 'bottom',
            animation: isActive
              ? `soundBar 0.65s ease-in-out ${i * 0.065}s infinite alternate`
              : 'none',
          }}
        />
      ))}
    </div>
  )
}

// ── Types & constants ──────────────────────────────────────────────────────────
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

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'السلام عليكم ورحمة الله وبركاته 🌙\n\nأنا "الرشيد"، مساعدك الإسلامي الذكي. أجيب على أسئلتك من القرآن الكريم والسنة النبوية الصحيحة.\n\nكيف أستطيع مساعدتك اليوم؟',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  const [useServerTTS, setUseServerTTS] = useState(true) // tracks if server TTS works

  const bottomRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
    }
  }, [])

  const stopSpeech = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
    setIsSpeaking(false)
  }, [])

  // Fallback: browser Web Speech API with male voice priority
  const browserSpeak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSpeaking(false)
      return
    }
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = 'ar-SA'
    utt.rate = 0.82
    utt.pitch = 0.8 // lower pitch = more masculine
    utt.volume = 1.0

    const applyVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      // Prefer known male Arabic voice names
      const pick =
        voices.find(v => /naayf|maged|hamed|shakir|hamdan|bassel|ali|fahed|moaz|laith|hedi|saleh|jamal|omar/i.test(v.name)) ||
        voices.find(v => v.lang === 'ar-SA') ||
        voices.find(v => v.lang.startsWith('ar')) ||
        null
      if (pick) utt.voice = pick
      utt.onstart = () => setIsSpeaking(true)
      utt.onend = () => setIsSpeaking(false)
      utt.onerror = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utt)
    }

    const voices = window.speechSynthesis.getVoices()
    if (voices.length) {
      applyVoice()
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null
        applyVoice()
      }
    }
  }, [])

  const speak = useCallback(
    async (text: string) => {
      if (!speechEnabled) return
      stopSpeech()

      const clean = text
        .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')
        .replace(/[📖📜📿🕌✨🌟🤲🌙]/g, '')
        .replace(/\*\*/g, '')
        .replace(/#+\s/g, '')
        .replace(/\n+/g, ' ')
        .trim()
        .substring(0, 800)

      if (!clean) return

      // ── Server TTS: Microsoft Edge Neural Voice (ar-SA-HamedNeural) ──
      if (useServerTTS) {
        try {
          setIsSpeaking(true)
          const res = await fetch(`/api/ai/speak?text=${encodeURIComponent(clean)}`)

          if (res.ok) {
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const audio = new Audio(url)
            audioRef.current = audio

            audio.onended = () => {
              setIsSpeaking(false)
              URL.revokeObjectURL(url)
              if (audioRef.current === audio) audioRef.current = null
            }
            audio.onerror = () => {
              setIsSpeaking(false)
              URL.revokeObjectURL(url)
              if (audioRef.current === audio) audioRef.current = null
            }
            await audio.play()
            return
          } else {
            // Server TTS returned error — switch to browser fallback
            setUseServerTTS(false)
            setIsSpeaking(false)
          }
        } catch {
          setUseServerTTS(false)
          setIsSpeaking(false)
        }
      }

      // ── Browser fallback ──
      browserSpeak(clean)
    },
    [speechEnabled, stopSpeech, browserSpeak, useServerTTS],
  )

  const send = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    stopSpeech()
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: messages }),
      })
      const data = await res.json()
      const reply: string = data.reply || 'عذراً، حدث خطأ. حاول مجدداً.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
      speak(reply)
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'عذراً، حدث خطأ في الاتصال. تأكد من إعداد مفتاح Anthropic API.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient flex flex-col">
      <div className="absolute inset-0 pattern-overlay opacity-20" />

      <div className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
        {/* ── Header ── */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center">
            <RashidAvatar isSpeaking={isSpeaking} size="lg" />
            <SoundWave isActive={isSpeaking} />
          </div>
          <h1 className="font-arabic text-gold-300 text-3xl font-bold mt-3">الرشيد</h1>
          <p className="text-gray-300 text-sm">المساعد الإسلامي الذكي — يجيب من القرآن والسنة</p>

          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">متصل الآن</span>
            </div>

            {/* Speech toggle */}
            <button
              onClick={() => {
                if (isSpeaking) stopSpeech()
                setSpeechEnabled(v => !v)
              }}
              title={speechEnabled ? 'كتم الصوت' : 'تفعيل الصوت'}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all ${
                speechEnabled
                  ? 'text-gold-300 border border-gold-400/30 hover:bg-gold-400/10'
                  : 'text-gray-500 border border-gray-700 hover:bg-white/5'
              }`}
            >
              {speechEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{speechEnabled ? 'الصوت مفعّل' : 'الصوت مكتوم'}</span>
            </button>

            {/* TTS engine indicator */}
            {speechEnabled && (
              <span
                title={useServerTTS ? 'صوت ذكر عربي عالي الجودة (Microsoft Neural)' : 'صوت المتصفح المحلي'}
                className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded ${useServerTTS ? 'text-emerald-400/80' : 'text-gray-500'}`}
              >
                {useServerTTS ? <Wifi size={11} /> : <WifiOff size={11} />}
                {useServerTTS ? 'HamedNeural' : 'متصفح'}
              </span>
            )}

            {/* Stop button — visible only while speaking */}
            {isSpeaking && (
              <button
                onClick={stopSpeech}
                title="إيقاف الكلام"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all animate-pulse"
              >
                <Square size={12} />
                <span>إيقاف</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Quick questions ── */}
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

        {/* ── Messages ── */}
        <div className="flex-1 bg-islamic-navy-mid/80 backdrop-blur rounded-2xl border border-gold-400/20 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' ? (
                  <RashidAvatar
                    isSpeaking={isSpeaking && i === messages.length - 1}
                    size="sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-gold-400 text-islamic-navy font-bold text-sm">
                    أ
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap font-naskh ${
                    msg.role === 'assistant'
                      ? 'bg-white/5 text-gray-100 rounded-tl-none'
                      : 'bg-gold-400 text-islamic-navy font-medium rounded-tr-none'
                  }`}
                >
                  {msg.content}
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => speak(msg.content)}
                      className="block mt-1.5 text-xs text-gold-400/50 hover:text-gold-300 transition-colors"
                      title="استمع للرد"
                    >
                      🔊 استمع
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <RashidAvatar isSpeaking={false} size="sm" />
                <div className="bg-white/5 rounded-2xl rounded-tl-none px-5 py-4 flex gap-1.5 items-center">
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

          {/* ── Input area ── */}
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
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} className="rotate-180" />
                )}
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
