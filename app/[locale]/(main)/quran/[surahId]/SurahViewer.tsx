'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface Ayah {
  number: number
  numberInSurah: number
  text: string
  juz: number
  page: number
}

interface SurahData {
  number: number
  name: string
  ayahs: Ayah[]
}

interface Props {
  surah: SurahData
  translation: Record<number, string>
  locale: string
  surahId: number
}

type ViewMode = 'reading' | 'list'

export default function SurahViewer({ surah, translation, locale, surahId }: Props) {
  const t = useTranslations('quran')
  const [mode, setMode] = useState<ViewMode>('reading')
  const [showTranslation, setShowTranslation] = useState(Object.keys(translation).length > 0)
  const [copied, setCopied] = useState<number | null>(null)

  const hasTranslation = Object.keys(translation).length > 0

  function copyAyah(text: string, num: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(num)
      setTimeout(() => setCopied(null), 1500)
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
          <button
            onClick={() => setMode('reading')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'reading'
                ? 'bg-gold-400 text-islamic-navy shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            📖 {t('modeReading')}
          </button>
          <button
            onClick={() => setMode('list')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'list'
                ? 'bg-gold-400 text-islamic-navy shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            📋 {t('modeList')}
          </button>
        </div>

        {hasTranslation && (
          <button
            onClick={() => setShowTranslation(v => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all ${
              showTranslation
                ? 'bg-gold-400/10 border-gold-400/40 text-gold-600 dark:text-gold-400'
                : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gold-400'
            }`}
          >
            🌐 {t('showTranslation')}
          </button>
        )}
      </div>

      {/* Reading mode — flowing text */}
      {mode === 'reading' && (
        <div className="card-islamic p-8 md:p-12">
          <p className="font-arabic text-2xl md:text-3xl leading-[2.5] text-gray-900 dark:text-gray-100 text-justify" dir="rtl">
            {surah.ayahs.map(ayah => (
              <span key={ayah.numberInSurah}>
                {ayah.text}{' '}
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold-100 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400 text-sm mx-1 cursor-default">
                  {toArabicNumerals(ayah.numberInSurah)}
                </span>{' '}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* List mode — verse by verse */}
      {mode === 'list' && (
        <div className="space-y-4">
          {surah.ayahs.map(ayah => (
            <div key={ayah.numberInSurah} className="card-islamic p-6 group">
              <div className="flex items-start gap-4">
                {/* Ayah number badge */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-100 dark:bg-gold-900/30 border border-gold-300 dark:border-gold-700 flex items-center justify-center">
                  <span className="font-arabic text-sm text-gold-600 dark:text-gold-400 font-bold">
                    {toArabicNumerals(ayah.numberInSurah)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Arabic text */}
                  <p className="font-arabic text-2xl md:text-3xl text-gray-900 dark:text-gray-100 leading-loose text-right mb-3" dir="rtl">
                    {ayah.text}
                  </p>

                  {/* Translation */}
                  {showTranslation && translation[ayah.numberInSurah] && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gold-200 dark:border-gold-800/40 pt-3 mt-3">
                      {translation[ayah.numberInSurah]}
                    </p>
                  )}

                  {/* Meta + copy */}
                  <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-gray-400">
                      {t('juz')} {ayah.juz} · {t('page')} {ayah.page}
                    </span>
                    <button
                      onClick={() => copyAyah(ayah.text, ayah.numberInSurah)}
                      className="text-xs text-gold-500 hover:text-gold-400 flex items-center gap-1 transition-colors"
                    >
                      {copied === ayah.numberInSurah ? '✓ ' + t('copied') : '⎘ ' + t('copy')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function toArabicNumerals(n: number): string {
  return n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)])
}
