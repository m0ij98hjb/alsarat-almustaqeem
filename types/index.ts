export type { Surah, Ayah, Hadith, HadithBook, Dhikr, Dua, Prophet, Fatwa, Question, Answer, AsmaAllah, User, Bookmark } from '@prisma/client'

export interface SurahWithAyahs {
  id: number
  nameArabic: string
  nameEnglish: string
  namePronunciation: string
  revelation: string
  ayahCount: number
  page: number
  juz: number
  ayahs: AyahBasic[]
}

export interface AyahBasic {
  id: number
  surahId: number
  numberInSurah: number
  numberInQuran: number
  textUthmani: string
  textSimple: string
  page: number
  juz: number
  sajda: boolean
}

export interface AyahWithTafseer extends AyahBasic {
  tafseers: { source: string; text: string; shortText: string }[]
}

export interface HadithWithBook {
  id: number
  hadithNum: number
  textArabic: string
  narrator: string
  grade: string
  tags: string[]
  book: { nameArabic: string; nameEnglish: string; slug: string }
  chapter?: { nameArabic: string } | null
}

export interface SearchResult {
  id: string | number
  type: 'ayah' | 'hadith' | 'dhikr' | 'fatwa' | 'prophet' | 'dua'
  title: string
  text: string
  reference: string
  url: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PrayerTimes {
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  date: string
  hijriDate: string
}

export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
}
