import hisnAlMuslim from './hisnAlMuslim.json'

export interface AdhkarItem {
  text: string
  count: number
  source?: string
}

export interface AdhkarCategory {
  key: string
  title: string
  icon: string
  items: AdhkarItem[]
}

// Front-matter sections of the book (foreword / virtue of remembrance) —
// prose to read, not discrete adhkar to recite and count.
const SKIP_SECTIONS = new Set(['المقدمة', 'فضل الذكر'])

function extractRepeatCount(text: string): number {
  if (/مائة مرة/.test(text)) return 100
  if (/تسعاً وتسعين/.test(text)) return 99
  if (/أربعاً وثلاثين/.test(text)) return 34
  if (/ثلاثاً وثلاثين/.test(text)) return 33
  if (/عشر مرات/.test(text)) return 10
  if (/تسع مرات/.test(text)) return 9
  if (/ثمان مرات/.test(text)) return 8
  if (/سبع مرات/.test(text)) return 7
  if (/ست مرات/.test(text)) return 6
  if (/خمس مرات/.test(text)) return 5
  if (/أربع مرات/.test(text)) return 4
  if (/ثلاث مرات/.test(text)) return 3
  if (/مرتين/.test(text)) return 2
  return 1
}

const ICON_RULES: [RegExp, string][] = [
  [/صباح|أصبح/, '🌅'],
  [/مساء|أمسى/, '🌆'],
  [/النوم|الاستيقاظ|رؤيا|الحلم/, '🌙'],
  [/الوضوء|الخلاء/, '🚿'],
  [/الصلاة|الركوع|السجود|التشهد|الأذان|الاستخارة|الوتر|قنوت/, '🕌'],
  [/السفر|المسافر|الدابة|ركوب/, '✈️'],
  [/الطعام|الصائم|إفطار|الضيف|الثمر/, '🍽️'],
  [/المريض|عيادة|وجع|عين/, '🩺'],
  [/الميت|الجنازة|القبر|مصيبة|التعزية/, '🕯️'],
  [/المطر|الرعد|الريح|الاستسقاء|الاستصحاء|الهلال/, '🌧️'],
  [/الحج|العمرة|عرفة|الجمار|الصفا|المروة|الإحرام/, '🕋'],
  [/المولود|الأولاد|المتزوج|الزوجة/, '👶'],
  [/الغضب|الهم|الحزن|الكرب|الخوف|الفزع|القلق/, '💭'],
  [/العدو|السلطان|الظلم/, '🛡️'],
  [/المسجد/, '🕌'],
  [/الدَّين|الدين|قضاء/, '💰'],
  [/السلام|المجلس/, '🤝'],
]

function pickIcon(title: string): string {
  for (const [pattern, icon] of ICON_RULES) {
    if (pattern.test(title)) return icon
  }
  return '📿'
}

const rawData = hisnAlMuslim as Record<string, { text: string[]; footnote?: string[] }>

export const ADHKAR_CATEGORIES: AdhkarCategory[] = Object.entries(rawData)
  .filter(([title]) => !SKIP_SECTIONS.has(title))
  .map(([title, section], index) => ({
    key: `S${index}`,
    title,
    icon: pickIcon(title),
    items: section.text.map((text, i) => ({
      text: text.trim(),
      count: extractRepeatCount(text),
      source: section.footnote?.[i]?.trim(),
    })),
  }))
