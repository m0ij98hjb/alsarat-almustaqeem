// Downloads full-Quran translations from api.alquran.cloud (one request per edition)
// and splits each into per-surah JSON files under data/quran-translations/{lang}/{surahId}.json
// for lazy per-surah loading on the site. Re-run this if a translation edition changes
// or a new language is added to i18n/config.ts.
//
// Usage: node scripts/download-quran-translations.js

const fs = require('fs')
const path = require('path')

const EDITIONS = {
  en: 'en.sahih',
  fr: 'fr.hamidullah',
  de: 'de.bubenheim',
  tr: 'tr.bulac',
  ru: 'ru.kuliev',
  es: 'es.bornez',
  zh: 'zh.jian',
  ur: 'ur.maududi',
  hi: 'hi.hindi',
}

const OUT_DIR = path.join(__dirname, '..', 'data', 'quran-translations')

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (err) {
      if (i === retries - 1) throw err
      console.log(`  retry ${i + 1} for ${url}: ${err.message}`)
      await new Promise(r => setTimeout(r, 1500))
    }
  }
}

async function main() {
  const summary = []

  for (const [lang, edition] of Object.entries(EDITIONS)) {
    console.log(`Fetching ${lang} (${edition})...`)
    const json = await fetchWithRetry(`https://api.alquran.cloud/v1/quran/${edition}`)
    if (json.code !== 200) {
      throw new Error(`${lang}: API returned code ${json.code}`)
    }
    const surahs = json.data.surahs
    if (surahs.length !== 114) {
      throw new Error(`${lang}: expected 114 surahs, got ${surahs.length}`)
    }

    const langDir = path.join(OUT_DIR, lang)
    fs.mkdirSync(langDir, { recursive: true })

    let totalBytes = 0
    for (const surah of surahs) {
      const ayahs = {}
      for (const a of surah.ayahs) {
        ayahs[a.numberInSurah] = a.text
      }
      const payload = { edition, surah: surah.number, ayahCount: surah.ayahs.length, ayahs }
      const filePath = path.join(langDir, `${surah.number}.json`)
      const content = JSON.stringify(payload)
      fs.writeFileSync(filePath, content, 'utf8')
      totalBytes += Buffer.byteLength(content, 'utf8')
    }

    summary.push({ lang, edition, files: surahs.length, totalKB: Math.round(totalBytes / 1024) })
    console.log(`  saved 114 files, ~${Math.round(totalBytes / 1024)} KB`)
  }

  console.log('\n=== SUMMARY ===')
  for (const s of summary) {
    console.log(`${s.lang.padEnd(4)} ${s.edition.padEnd(16)} ${s.files} files  ~${s.totalKB} KB`)
  }
}

main().catch(err => {
  console.error('FATAL:', err)
  process.exit(1)
})
