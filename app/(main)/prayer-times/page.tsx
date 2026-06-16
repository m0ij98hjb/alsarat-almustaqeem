'use client'

import { useState } from 'react'

const PRAYER_NAMES = [
  { key: 'fajr',    label: 'الفجر',   icon: '🌙', note: 'قبل طلوع الشمس' },
  { key: 'sunrise', label: 'الشروق',  icon: '🌅', note: 'طلوع الشمس' },
  { key: 'dhuhr',   label: 'الظهر',   icon: '☀️', note: 'زوال الشمس' },
  { key: 'asr',     label: 'العصر',   icon: '🌤️', note: 'بعد الزوال' },
  { key: 'maghrib', label: 'المغرب',  icon: '🌆', note: 'غروب الشمس' },
  { key: 'isha',    label: 'العشاء',  icon: '🌃', note: 'بعد الغروب' },
]

// Sample times for Jeddah
const JEDDAH_TIMES = {
  fajr: '4:21', sunrise: '5:46', dhuhr: '12:03', asr: '3:32', maghrib: '6:42', isha: '8:12'
}

const CITIES = [
  { name: 'جدة',        times: { fajr:'4:21', sunrise:'5:46', dhuhr:'12:03', asr:'3:32', maghrib:'6:42', isha:'8:12' } },
  { name: 'الرياض',     times: { fajr:'4:05', sunrise:'5:28', dhuhr:'11:48', asr:'3:16', maghrib:'6:25', isha:'7:55' } },
  { name: 'مكة المكرمة', times: { fajr:'4:18', sunrise:'5:43', dhuhr:'12:00', asr:'3:30', maghrib:'6:40', isha:'8:10' } },
  { name: 'المدينة المنورة', times: { fajr:'4:12', sunrise:'5:36', dhuhr:'11:54', asr:'3:23', maghrib:'6:33', isha:'8:03' } },
  { name: 'الدمام',     times: { fajr:'3:58', sunrise:'5:21', dhuhr:'11:41', asr:'3:09', maghrib:'6:18', isha:'7:48' } },
]

export default function PrayerTimesPage() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  function isCurrent(time: string, nextTime: string) {
    const [h, m] = time.split(':').map(Number)
    const [nh, nm] = nextTime.split(':').map(Number)
    const cur = currentHour * 60 + currentMinute
    const start = h * 60 + m
    const end = nh * 60 + nm
    return cur >= start && cur < end
  }

  const times = selectedCity.times

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">مواقيت الصلاة</h1>
          <p className="text-gold-300">
            {now.toLocaleDateString('ar-SA-u-ca-islamic', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* City selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CITIES.map(city => (
            <button
              key={city.name}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCity.name === city.name
                  ? 'bg-gold-400 text-islamic-navy font-bold shadow-lg'
                  : 'bg-white dark:bg-gray-900 border border-gold-200 dark:border-gold-800/50 text-gray-600 dark:text-gray-300 hover:border-gold-400'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* Prayer times */}
        <div className="space-y-3">
          {PRAYER_NAMES.map((prayer, i) => {
            const time = times[prayer.key as keyof typeof times]
            const nextTime = PRAYER_NAMES[i + 1] ? times[PRAYER_NAMES[i + 1].key as keyof typeof times] : '23:59'
            const active = prayer.key !== 'sunrise' && isCurrent(time, nextTime)

            return (
              <div
                key={prayer.key}
                className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                  active
                    ? 'bg-gold-400 border-gold-300 shadow-lg shadow-gold-300/30'
                    : 'card-islamic hover:border-gold-400'
                }`}
              >
                <div className={`text-2xl font-arabic font-bold ${active ? 'text-islamic-navy' : 'text-gold-500'}`}>
                  {time}
                </div>
                <div className="text-center">
                  <div className={`font-arabic text-xl font-bold ${active ? 'text-islamic-navy' : 'text-gray-800 dark:text-white'}`}>
                    {prayer.label}
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

        <p className="text-center text-xs text-gray-400 mt-6">
          * الأوقات تقريبية وقد تختلف حسب الموقع الجغرافي الدقيق
        </p>
      </div>
    </div>
  )
}
