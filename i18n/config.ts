export const locales = ['ar', 'en', 'zh', 'es', 'fr', 'de', 'tr', 'ur', 'ru', 'hi'] as const
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
  hi: 'हिन्दी',
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
  hi: '🇮🇳',
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
  hi: 'hi-IN-MadhurNeural',
}

// BCP-47 tags for the browser's built-in Web Speech API (SpeechSynthesisUtterance.lang).
// Used only as a last-resort fallback if the server-side narrator voice below is unreachable.
export const webSpeechLang: Record<Locale, string> = {
  ar: 'ar-SA',
  en: 'en-US',
  zh: 'zh-CN',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  tr: 'tr-TR',
  ur: 'ur-PK',
  ru: 'ru-RU',
  hi: 'hi-IN',
}

// Single multilingual Edge Neural voice used for the homepage voice intro, so every
// locale is narrated by the same voice identity instead of a different one per language.
export const voiceIntroVoice = 'en-US-AndrewMultilingualNeural'
