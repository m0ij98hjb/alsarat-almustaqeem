import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAyahRef(surahId: number, ayahNum: number): string {
  return `(${surahId}:${ayahNum})`
}

export function toArabicNum(num: number): string {
  return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d])
}

export function toHijriDate(date: Date): string {
  try {
    return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric', month: 'long', year: 'numeric',
    }).format(date)
  } catch {
    return ''
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .trim()
}

export function paginate<T>(array: T[], page: number, limit: number) {
  const start = (page - 1) * limit
  const end = start + limit
  return {
    data: array.slice(start, end),
    total: array.length,
    page,
    limit,
    totalPages: Math.ceil(array.length / limit),
  }
}

export const HADITH_GRADE_LABELS: Record<string, string> = {
  SAHIH: 'صحيح',
  HASAN: 'حسن',
  DAIF: 'ضعيف',
  MAWDU: 'موضوع',
}

export const ADHKAR_CATEGORY_LABELS: Record<string, string> = {
  MORNING: 'أذكار الصباح',
  EVENING: 'أذكار المساء',
  SLEEP: 'أذكار النوم',
  WAKE_UP: 'أذكار الاستيقاظ',
  PRAYER: 'أذكار الصلاة',
  TRAVEL: 'أذكار السفر',
  FOOD: 'أذكار الطعام',
  GENERAL: 'أذكار عامة',
  QURAN: 'أدعية قرآنية',
  SUNNAH: 'أدعية السنة',
  OCCASIONS: 'أذكار المناسبات',
}
