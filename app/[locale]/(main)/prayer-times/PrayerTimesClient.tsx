'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

interface Timings {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
  Imsak: string
  Midnight: string
}

interface Meta {
  timezone: string
}

interface HijriDate {
  day: string
  month: { ar: string }
  year: string
  weekday: { ar: string }
}

const PRAYER_KEYS: { key: keyof Timings; labelKey: string; icon: string }[] = [
  { key: 'Imsak', labelKey: 'prayers.imsak', icon: '🌌' },
  { key: 'Fajr', labelKey: 'prayers.fajr', icon: '🌅' },
  { key: 'Sunrise', labelKey: 'prayers.sunrise', icon: '☀️' },
  { key: 'Dhuhr', labelKey: 'prayers.dhuhr', icon: '🕛' },
  { key: 'Asr', labelKey: 'prayers.asr', icon: '🌤️' },
  { key: 'Maghrib', labelKey: 'prayers.maghrib', icon: '🌇' },
  { key: 'Isha', labelKey: 'prayers.isha', icon: '🌙' },
]

const MAIN_PRAYER_KEYS: (keyof Timings)[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map((n) => parseInt(n, 10))
  return h * 60 + m
}

function nowMinutesInTz(tz: string): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  const h = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10)
  const m = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10)
  return h * 60 + m
}

type SavedLocation =
  | { mode: 'city'; city: string; country: string }
  | { mode: 'coords'; lat: number; lng: number }

const DEFAULT_LOCATION: { mode: 'city'; city: string; country: string } = {
  mode: 'city',
  city: 'Jeddah',
  country: 'SA',
}

async function persistLocation(loc: SavedLocation) {
  try {
    await fetch('/api/prayer-location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loc),
    })
  } catch {}
}

export default function PrayerTimesClient() {
  const t = useTranslations('prayerTimes')
  const [city, setCity] = useState(DEFAULT_LOCATION.city)
  const [country, setCountry] = useState(DEFAULT_LOCATION.country)
  const [cityInput, setCityInput] = useState(DEFAULT_LOCATION.city)
  const [countryInput, setCountryInput] = useState(DEFAULT_LOCATION.country)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [locationReady, setLocationReady] = useState(false)
  const [timings, setTimings] = useState<Timings | null>(null)
  const [meta, setMeta] = useState<Meta | null>(null)
  const [hijri, setHijri] = useState<HijriDate | null>(null)
  const [gregorian, setGregorian] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tick, setTick] = useState(0)

  const formatCountdown = (minutes: number): string => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    if (h > 0) return t('hoursAndMinutes', { h, m })
    return t('minutesOnly', { m })
  }

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let cancelled = false
    fetch('/api/prayer-location')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return
        const saved: SavedLocation = d?.location ?? DEFAULT_LOCATION
        if (saved.mode === 'coords') {
          setCoords({ lat: saved.lat, lng: saved.lng })
        } else {
          setCity(saved.city)
          setCountry(saved.country)
          setCityInput(saved.city)
          setCountryInput(saved.country)
        }
      })
      .catch(() => {})
      .finally(() => !cancelled && setLocationReady(true))
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!locationReady) return
    let cancelled = false
    setLoading(true)
    setError('')

    const today = new Date()
    const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
    const url = coords
      ? `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${coords.lat}&longitude=${coords.lng}&method=5`
      : `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=5`

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return
        if (d.code === 200) {
          setTimings(d.data.timings)
          setMeta(d.data.meta)
          setHijri(d.data.date.hijri)
          setGregorian(d.data.date.readable)
        } else {
          setError(t('errorFetch'))
        }
      })
      .catch(() => !cancelled && setError(t('errorConnection')))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [locationReady, city, country, coords])

  const useMyLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const next = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setCoords(next)
        persistLocation({ mode: 'coords', ...next })
      },
      () => setError(t('errorLocation'))
    )
  }

  const searchCity = (e: React.FormEvent) => {
    e.preventDefault()
    const nextCity = cityInput.trim() || DEFAULT_LOCATION.city
    const nextCountry = countryInput.trim() || DEFAULT_LOCATION.country
    setCoords(null)
    setCity(nextCity)
    setCountry(nextCountry)
    persistLocation({ mode: 'city', city: nextCity, country: nextCountry })
  }

  const nextPrayer = useMemo(() => {
    if (!timings || !meta) return null
    const now = nowMinutesInTz(meta.timezone)
    for (const key of MAIN_PRAYER_KEYS) {
      const t = timeToMinutes(timings[key])
      if (t > now) return { key, minutesLeft: t - now }
    }
    // after Isha: next is tomorrow's Fajr
    const fajr = timeToMinutes(timings.Fajr)
    return { key: 'Fajr' as const, minutesLeft: 24 * 60 - now + fajr }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timings, meta, tick])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Location controls */}
      <div className="card-islamic p-6 mb-8">
        <form onSubmit={searchCity} className="flex flex-wrap gap-3 items-end justify-center">
          <div>
            <label className="block text-xs text-gray-400 mb-1">{t('cityLabel')}</label>
            <input
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gold-200 dark:border-gold-800/50 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gold-400"
              placeholder={t('cityPlaceholder')}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">{t('countryLabel')}</label>
            <input
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
              className="w-24 px-4 py-2 rounded-xl border border-gold-200 dark:border-gold-800/50 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gold-400"
              placeholder={t('countryPlaceholder')}
            />
          </div>
          <button type="submit" className="btn-gold px-5 py-2">{t('searchBtn')}</button>
          <button type="button" onClick={useMyLocation} className="btn-outline-gold px-5 py-2">
            {t('useMyLocation')}
          </button>
        </form>
      </div>

      {loading && <p className="text-center text-gray-400">{t('loading')}</p>}
      {error && <p className="text-center text-red-500 mb-6">{error}</p>}

      {timings && meta && !loading && (
        <>
          {/* Date + location */}
          <div className="text-center mb-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {coords ? t('yourLocation') : `${city}, ${country}`} — {meta.timezone}
            </p>
            <p className="font-arabic text-islamic-green dark:text-gold-300 text-xl font-bold mt-1">
              {gregorian}
              {hijri && ` — ${hijri.day} ${hijri.month.ar} ${hijri.year}هـ (${hijri.weekday.ar})`}
            </p>
          </div>

          {/* Next prayer countdown */}
          {nextPrayer && (
            <div className="bg-hero-gradient rounded-3xl p-8 text-center relative overflow-hidden mb-10">
              <div className="absolute inset-0 pattern-overlay opacity-20" />
              <div className="relative z-10">
                <p className="text-gold-300 text-sm mb-2">{t('nextPrayer')}</p>
                <p className="font-arabic text-white text-3xl font-bold mb-2">
                  {t(PRAYER_KEYS.find((p) => p.key === nextPrayer.key)?.labelKey as string)}
                </p>
                <p className="text-gold-200">{t('after', { time: formatCountdown(nextPrayer.minutesLeft) })}</p>
              </div>
            </div>
          )}

          {/* All timings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRAYER_KEYS.map((p) => (
              <div
                key={p.key}
                className={`card-islamic p-5 text-center ${
                  nextPrayer?.key === p.key ? 'border-gold-400 bg-gold-50/50 dark:bg-gold-900/10' : ''
                }`}
              >
                <div className="text-2xl mb-2">{p.icon}</div>
                <div className="font-arabic text-islamic-green dark:text-gold-300 font-bold mb-1">{t(p.labelKey)}</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 font-mono">{timings[p.key]}</div>
              </div>
            ))}
            <div className="card-islamic p-5 text-center">
              <div className="text-2xl mb-2">🌃</div>
              <div className="font-arabic text-islamic-green dark:text-gold-300 font-bold mb-1">{t('midnight')}</div>
              <div className="text-lg text-gray-700 dark:text-gray-300 font-mono">{timings.Midnight}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
