// External API services

// Aladhan Prayer Times API
export async function getPrayerTimes(city: string, country = 'SA', method = 4) {
  const today = new Date()
  const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${date}?city=${encodeURIComponent(city)}&country=${country}&method=${method}`,
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()
    return data.data?.timings || null
  } catch { return null }
}

// Quran.com API - fetch ayahs
export async function fetchSurahFromAPI(surahId: number) {
  try {
    const [arabic, translation] = await Promise.all([
      fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`, { next: { revalidate: 86400 } }).then(r => r.json()),
      fetch(`https://api.quran.com/api/v4/quran/translations/131?chapter_number=${surahId}`, { next: { revalidate: 86400 } }).then(r => r.json()),
    ])
    return { arabic: arabic.verses, translations: translation.translations }
  } catch { return null }
}

// HadithAPI.com
export async function fetchHadithFromAPI(source: string, hadithNumber: number) {
  try {
    const res = await fetch(
      `https://hadithapi.com/public/api/hadiths?apiKey=${process.env.HADITH_API_KEY}&hadithNumber=${hadithNumber}&book=${source}`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()
    return data.hadiths?.data?.[0] || null
  } catch { return null }
}

// Format hijri date
export function getHijriDate(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }).format(date)
  } catch { return '' }
}

// Get random ayah
export async function getRandomAyah() {
  const surahId = Math.floor(Math.random() * 114) + 1
  const data = await fetchSurahFromAPI(surahId)
  if (!data?.arabic?.length) return null
  const ayah = data.arabic[Math.floor(Math.random() * data.arabic.length)]
  return { ...ayah, surahId }
}
