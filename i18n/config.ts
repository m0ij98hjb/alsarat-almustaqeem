export const locales = ['ar', 'en', 'zh', 'es', 'fr', 'de', 'tr', 'ur', 'ru'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ar'

export const rtlLocales: readonly Locale[] = ['ar', 'ur'] as const

export function isRTL(locale: Locale): boolean {
  return (rtlLocales as readonly string[]).includes(locale)
}

export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  tr: 'Türkçe',
  ur: 'اردو',
  ru: 'Русский',
}

export const localeFlags: Record<Locale, string> = {
  ar: '🇸🇦',
  en: '🇬🇧',
  zh: '🇨🇳',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  tr: '🇹🇷',
  ur: '🇵🇰',
  ru: '🇷🇺',
}

// Microsoft Edge Neural TTS voices per locale (male voices)
export const ttVoices: Record<Locale, string> = {
  ar: 'ar-SA-HamedNeural',
  en: 'en-US-GuyNeural',
  zh: 'zh-CN-YunxiNeural',
  es: 'es-ES-AlvaroNeural',
  fr: 'fr-FR-HenriNeural',
  de: 'de-DE-ConradNeural',
  tr: 'tr-TR-AhmetNeural',
  ur: 'ur-PK-AsadNeural',
  ru: 'ru-RU-DmitryNeural',
}
