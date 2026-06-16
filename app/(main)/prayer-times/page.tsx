'use client'

import { useState, useEffect, useCallback } from 'react'

interface PrayerTimings {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
  [key: string]: string
}

interface HijriDate {
  day: string
  month: { ar: string; number: number }
  year: string
  weekday: { ar: string }
}

const PRAYER_NAMES = [
  { key: 'Fajr',    label: 'الفجر',   icon: '🌙', note: 'قبل طلوع الشمس', skipCurrent: false },
  { key: 'Sunrise', label: 'الشروق',  icon: '🌅', note: 'طلوع الشمس',      skipCurrent: true  },
  { key: 'Dhuhr',   label: 'الظهر',   icon: '☀️', note: 'زوال الشمس',      skipCurrent: false },
  { key: 'Asr',     label: 'العصر',   icon: '🌤️', note: 'بعد الزوال',      skipCurrent: false },
  { key: 'Maghrib', label: 'المغرب',  icon: '🌆', note: 'غروب الشمس',      skipCurrent: false },
  { key: 'Isha',    label: 'العشاء',  icon: '🌃', note: 'بعد الغروب',      skipCurrent: false },
]

const CITIES = [
  { label: 'جدة',             city: 'Jeddah',  country: 'SA' },
  { label: 'الرياض',          city: 'Riyadh',  country: 'SA' },
  { label: 'مكة المكرمة',    city: 'Makkah',  country: 'SA' },
  { label: 'المدينة المنورة', city: 'Madinah', country: 'SA' },
  { label: 'الدمام',          city: 'Dammam',  country: 'SA' },
  { label: 'القاهرة',         city: 'Cairo',   country: 'EG' },
  { label: 'دبي',             city: 'Dubai',   country: 'AE' },
]

function cleanTime(t: string) {
  return (t || '--:--').replace(/\s*\([^)]*\)/g, '').trim()
}

function timeToMins(t: string) {
  const [h, m] = cleanTime(t).split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

export default function PrayerTimesPage() {
  const [mode, setMode] = useState<'city' | 'geo'>('city')
  const [cityIdx, setCityIdx] = useState(0)
  const [timings, setTimings] = useState<PrayerTimings | null>(null)
  const [hijri, setHijri] = useState<HijriDate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [now, setNow] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(id)
  }, [])

  const applyData = (data: { timings: PrayerTimings; date: { hijri: HijriDate } }) => {
    setTimings(data.timings)
    setHijri(data.date.hijri)
    setLoading(false)
    setError('')
  }

  const fetchByCity = useCallback(async (city: string, country: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${country}&method=4`
      )
      const json = await res.json()
      if (json.code === 200) applyData(json.data)
      else throw new Error()
    } catch {
      setError('تعذّر تحميل المواقيت، يرجى المحاولة لاحقاً')
      setLoading(false)
    }
  }, [])

  const fetchByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true)
    setError('')
    try {
      const ts = Math.floor(Date.now() / 1000)
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${ts}?latitude=${lat}&longitude=${lon}&method=4`
      )
      const json = await res.json()
      if (json.code === 200) applyData(json.data)
      else throw new Error()
    } catch {
      setError('تعذّر تحميل المواقيت، يرجى المحاولة لاحقاً')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (mode === 'geo') {
      if (!navigator.geolocation) {
        setMode('city')
        return
      }
      navigator.geolocation.getCurrentPosition(
        pos => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
        () => { setMode('city'); setError('لم يتم السماح بالوصول للموقع، تم التحويل لجدة') }
      )
    } else {
      const c = CITIES[cityIdx]
      fetchByCity(c.city, c.country)
    }
  }, [mode, cityIdx, fetchByCity, fetchByCoords])

  function getCurrentPrayer() {
    if (!timings) return -1
    const curMins = now.getHours() * 60 + now.getMinutes()
    let current = -1
    for (let i = 0; i < PRAYER_NAMES.length; i++) {
      const p = PRAYER_NAMES[i]
      if (p.skipCurrent) continue
      const t = timeToMins(timings[p.key])
      if (curMins >= t) current = i
    }
    return current
  }

  const currentIdx = getCurrentPrayer()

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      {/* Header */}
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">مواقيت الصلاة</h1>
          {hijri ? (
            <p className="text-gold-300 font-arabic text-lg">
              {hijri.weekday?.ar} — {hijri.day} {hijri.month?.ar} {hijri.year} هـ
            </p>
          ) : (
            <p className="text-gold-300 font-arabic">
              {now.toLocaleDateString('ar-SA-u-ca-islamic', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Mode selector */}
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setMode('geo')}
            className={`px-5 py-2 rounded-full text-sm transition-all flex items-center gap-2 ${
              mode === 'geo'
                ? 'bg-gold-400 text-islamic-navy font-bold shadow-lg'
                : 'bg-white dark:bg-gray-900 border border-gold-200 dark:border-gold-800/50 text-gray-600 dark:text-gray-300 hover:border-gold-400'
            }`}
          >
            📍 موقعي الحالي
          </button>
          <button
            onClick={() => setMode('city')}
            className={`px-5 py-2 rounded-full text-sm transition-all ${
              mode === 'city'
                ? 'bg-gold-400 text-islamic-navy font-bold shadow-lg'
                : 'bg-white dark:bg-gray-900 border border-gold-200 dark:border-gold-800/50 text-gray-600 dark:text-gray-300 hover:border-gold-400'
            }`}
          >
            🏙️ اختر مدينة
          </button>
        </div>

        {/* City selector */}
        {mode === 'city' && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {CITIES.map((c, i) => (
              <button
                key={i}
                onClick={() => setCityIdx(i)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  cityIdx === i
                    ? 'bg-islamic-green/20 border-2 border-islamic-green text-islamic-green dark:text-gold-300 font-bold'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gold-400'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-14 h-14 border-4 border-gold-400/30 border-t-gold-400 rounded-full animate-spin mb-5" />
            <p className="text-gray-400 font-arabic">جارٍ تحميل مواقيت الصلاة...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-amber-500 font-arabic mb-4">{error}</p>
            <button
              onClick={() => { setMode('city'); setCityIdx(0) }}
              className="btn-outline-gold px-6 py-2"
            >
              تحميل مواقيت جدة
            </button>
          </div>
        ) : timings ? (
          <div className="space-y-3">
            {PRAYER_NAMES.map((prayer, i) => {
              const time = cleanTime(timings[prayer.key])
              const active = !prayer.skipCurrent && currentIdx === i

              return (
                <div
                  key={prayer.key}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                    active
                      ? 'bg-gold-400 border-gold-300 shadow-lg shadow-gold-300/30'
                      : 'card-islamic hover:border-gold-400'
                  }`}
                >
                  <div className={`text-2xl font-arabic font-bold tabular-nums ${active ? 'text-islamic-navy' : 'text-gold-500'}`}>
                    {time}
                  </div>
                  <div className="text-center">
                    <div className={`font-arabic text-xl font-bold ${active ? 'text-islamic-navy' : 'text-gray-800 dark:text-white'}`}>
                      {prayer.label}
                      {active && <span className="text-xs font-normal mr-2 opacity-80">● الآن</span>}
                    </div>
                    <div className={`text-xs mt-0.5 ${active ? 'text-islamic-navy/70' : 'text-gray-400'}`}>
                      {prayer.note}
                    </div>
                  </div>
                  <div className="text-3xl">{prayer.icon}</div>
                </div>
              )
            })}
          </div>
        ) : null}

        <p className="text-center text-xs text-gray-400 mt-8">
          المصدر: <span className="text-gold-500">Aladhan.com</span> — طريقة حساب أم القرى (مكة المكرمة)
        </p>
      </div>
    </div>
  )
}
