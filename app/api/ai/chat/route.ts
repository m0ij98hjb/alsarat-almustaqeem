import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { PROPHETS } from '@/data/prophets'
import { SEERAH_TIMELINE } from '@/data/seerah'
import { ASMA_ALLAH } from '@/data/asmaAllah'
import { SCHOLARS } from '@/data/scholars'
import { LIVE_CHANNELS } from '@/data/liveChannels'
import { HADITHS } from '@/data/hadiths'
import { ADHKAR_CATEGORIES } from '@/data/adhkar'
import { homeFaq } from '@/data/homeFaq'

const anthropic = new Anthropic()
const MODEL = 'claude-opus-5'

const CHAT_MESSAGES: Record<string, { refusal: string; noAnswer: string; generalError: string }> = {
  ar: {
    refusal: 'عذراً، لا يمكنني الإجابة على هذا السؤال. جرّب صياغة مختلفة.',
    noAnswer: 'تعذّر الحصول على إجابة الآن، حاول مرة أخرى.',
    generalError: 'عذراً، حدث خطأ مؤقت. حاول مجدداً.',
  },
  en: {
    refusal: 'Sorry, I cannot answer that question. Please try rephrasing it.',
    noAnswer: 'Could not get an answer right now, please try again.',
    generalError: 'Sorry, a temporary error occurred. Please try again.',
  },
  de: {
    refusal: 'Entschuldigung, ich kann diese Frage nicht beantworten. Bitte versuche eine andere Formulierung.',
    noAnswer: 'Konnte gerade keine Antwort erhalten, bitte versuche es erneut.',
    generalError: 'Entschuldigung, ein vorübergehender Fehler ist aufgetreten. Bitte versuche es erneut.',
  },
  fr: {
    refusal: 'Désolé, je ne peux pas répondre à cette question. Essayez de la reformuler.',
    noAnswer: 'Impossible d\'obtenir une réponse pour le moment, veuillez réessayer.',
    generalError: 'Désolé, une erreur temporaire s\'est produite. Veuillez réessayer.',
  },
  es: {
    refusal: 'Lo siento, no puedo responder a esa pregunta. Intenta reformularla.',
    noAnswer: 'No se pudo obtener una respuesta en este momento, inténtalo de nuevo.',
    generalError: 'Lo sentimos, se produjo un error temporal. Inténtalo de nuevo.',
  },
  zh: {
    refusal: '抱歉，我无法回答这个问题。请尝试换一种表述方式。',
    noAnswer: '暂时无法获取答案，请重试。',
    generalError: '抱歉，发生了临时错误。请重试。',
  },
  tr: {
    refusal: 'Üzgünüm, bu soruyu yanıtlayamıyorum. Farklı bir şekilde ifade etmeyi deneyin.',
    noAnswer: 'Şu anda bir yanıt alınamadı, lütfen tekrar deneyin.',
    generalError: 'Üzgünüz, geçici bir hata oluştu. Lütfen tekrar deneyin.',
  },
  ur: {
    refusal: 'معذرت، میں اس سوال کا جواب نہیں دے سکتا۔ براہ کرم مختلف انداز میں پوچھیں۔',
    noAnswer: 'اس وقت جواب حاصل نہیں ہو سکا، براہ کرم دوبارہ کوشش کریں۔',
    generalError: 'معذرت، ایک عارضی خرابی پیش آگئی۔ براہ کرم دوبارہ کوشش کریں۔',
  },
  ru: {
    refusal: 'Извините, я не могу ответить на этот вопрос. Попробуйте переформулировать его.',
    noAnswer: 'Не удалось получить ответ прямо сейчас, попробуйте ещё раз.',
    generalError: 'Извините, произошла временная ошибка. Попробуйте ещё раз.',
  },
}

function chatMessages(language: string) {
  return CHAT_MESSAGES[language] ?? CHAT_MESSAGES.en
}

// ───────────────────────── Local site-content search ─────────────────────────
// Every helper below searches the same static data that powers the site's own
// pages, so the assistant's answers are grounded in what the site actually shows.

function norm(s: string): string {
  return s.toLowerCase().trim()
}

function matches<T>(items: T[], query: string, fields: (item: T) => string[], limit: number): T[] {
  const q = norm(query)
  if (!q) return items.slice(0, limit)
  return items.filter((item) => fields(item).some((f) => norm(f).includes(q))).slice(0, limit)
}

function searchProphets(query: string): string {
  const results = matches(PROPHETS, query, (p) => [p.nameAr, p.nameEn, p.summary, p.nation], 3)
  if (!results.length) return 'لا توجد نتائج مطابقة في صفحة الأنبياء بالموقع.'
  return results
    .map((p) => `${p.nameAr} (${p.nameEn})\nالفترة: ${p.period} | الأمة: ${p.nation}\n${p.summary}\nذُكر في القرآن ${p.quranMentions} مرة.`)
    .join('\n\n')
}

function searchSeerah(query: string): string {
  const events = SEERAH_TIMELINE.flatMap((era) => era.events.map((e) => ({ ...e, era: era.era })))
  const results = matches(events, query, (e) => [e.title, e.desc, e.year], 4)
  if (!results.length) return 'لا توجد أحداث مطابقة في السيرة النبوية بالموقع.'
  return results.map((e) => `[${e.era} — ${e.year}] ${e.title}\n${e.desc}`).join('\n\n')
}

function searchAsmaAllah(query: string): string {
  const num = Number(query.trim())
  const results = Number.isInteger(num) && num > 0
    ? ASMA_ALLAH.filter((n) => n.number === num)
    : matches(ASMA_ALLAH, query, (n) => [n.nameArabic, n.nameEnglish, n.meaning], 5)
  if (!results.length) return 'لا يوجد اسم مطابق بين أسماء الله الحسنى في الموقع.'
  return results
    .map((n) => `${n.number}. ${n.nameArabic} (${n.nameEnglish}) — ${n.meaning}\n${n.explanation}${n.quranRef ? `\nالمرجع: ${n.quranRef}` : ''}`)
    .join('\n\n')
}

function searchScholars(query: string): string {
  const results = matches(SCHOLARS, query, (s) => [s.nameAr, s.nameEn, s.country, s.specialty, s.aboutAr], 3)
  if (!results.length) return 'لا يوجد عالم مطابق في دليل العلماء والدعاة بالموقع.'
  return results.map((s) => `${s.nameAr} (${s.nameEn}) — ${s.country}\nالتخصص: ${s.specialty}\n${s.aboutAr}`).join('\n\n')
}

function getLiveChannels(): string {
  return LIVE_CHANNELS
    .map((c) => `${c.nameAr} (${c.nameEn}) — ${c.category === 'tv' ? 'قناة تلفزيونية' : 'إذاعة'}\n${c.descriptionAr}\nالموقع الرسمي: ${c.officialWebsite}`)
    .join('\n\n')
}

function searchSiteFaq(query: string): string | null {
  const results = matches(homeFaq, query, (f) => [f.questionAr, f.answerAr], 2)
  if (!results.length) return null
  return results.map((f) => `س: ${f.questionAr}\nج: ${f.answerAr}`).join('\n\n')
}

function searchSiteHadith(query: string): string | null {
  const results = matches(HADITHS, query, (h) => [h.text, h.narrator, h.topic], 3)
  if (!results.length) return null
  return results
    .map((h) => `"${h.text}"\nالراوي: ${h.narrator || 'غير محدد'} | الدرجة: ${h.grade} | المصدر: ${h.source}`)
    .join('\n\n')
}

function searchAdhkar(query: string): string {
  const q = norm(query)
  const out: string[] = []
  outer: for (const cat of ADHKAR_CATEGORIES) {
    const catHit = q.length > 0 && norm(cat.title).includes(q)
    for (const item of cat.items) {
      if (out.length >= 5) break outer
      if (catHit || (q.length > 0 && norm(item.text).includes(q))) {
        out.push(`[${cat.title}] ${item.text}${item.count > 1 ? ` (يُكرر ${item.count} مرة)` : ''}`)
      }
    }
  }
  if (!out.length) return 'لا يوجد ذكر أو دعاء مطابق في حصن المسلم بالموقع.'
  return out.join('\n\n')
}

// ───────────────────────── External sources (Quran / Hadith) ─────────────────────────

async function searchQuranApi(keyword: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/search/${encodeURIComponent(keyword)}/all/quran-uthmani`,
      { next: { revalidate: 3600 } },
    )
    const data = await res.json()
    if (data.code !== 200 || !data.data?.matches?.length) {
      return `لم يتم العثور على آيات مطابقة لـ "${keyword}".`
    }
    const found: Array<{ text: string; surah: { name: string; number: number }; numberInSurah: number }> =
      data.data.matches.slice(0, 3)
    let reply = ''
    for (const m of found) {
      reply += `﴿${m.text}﴾\n— ${m.surah.name} [${m.surah.number}:${m.numberInSurah}]\n\n`
    }
    if (data.data.count > 3) reply += `(إجمالي النتائج: ${data.data.count})`
    return reply.trim()
  } catch {
    return 'تعذّر البحث في القرآن الآن.'
  }
}

async function searchHadithApi(keyword: string): Promise<string> {
  try {
    const res = await fetch(`https://dorar.net/api/v1/hadiths?value=${encodeURIComponent(keyword)}&books=0`, {
      headers: { Accept: 'application/json', 'User-Agent': 'Mozilla/5.0 (compatible; IslamicApp/1.0)' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error(`Dorar ${res.status}`)
    const data = await res.json()
    if (!data.data?.length) return searchSiteHadith(keyword) ?? 'لم يتم العثور على أحاديث مطابقة.'
    const found: Array<{ hadith: string; rawi?: string; book?: string; grade?: string }> = data.data.slice(0, 2)
    let reply = ''
    for (const h of found) {
      reply += `"${h.hadith}"\n`
      const meta: string[] = []
      if (h.rawi) meta.push(`الراوي: ${h.rawi}`)
      if (h.book) meta.push(`المصدر: ${h.book}`)
      if (h.grade) meta.push(`الدرجة: ${h.grade}`)
      if (meta.length) reply += meta.join(' | ') + '\n'
      reply += '\n'
    }
    return reply.trim()
  } catch {
    return searchSiteHadith(keyword) ?? 'تعذّر البحث في الأحاديث الآن.'
  }
}

// ───────────────────────── Tool definitions & dispatch ─────────────────────────

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'search_quran',
    description:
      'ابحث في القرآن الكريم عن آيات تتعلق بكلمة أو موضوع معيّن. استخدمه لأي سؤال عن آية أو معنى قرآني أو موضوع قرآني.',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'كلمة أو عبارة البحث بالعربية' } },
      required: ['query'],
    },
  },
  {
    name: 'search_hadith',
    description: 'ابحث في الأحاديث النبوية الشريفة عن أحاديث متعلقة بموضوع معيّن، مع درجة الحديث وراويه ومصدره.',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'كلمة أو موضوع البحث' } },
      required: ['query'],
    },
  },
  {
    name: 'search_adhkar',
    description:
      'ابحث في أذكار وأدعية حصن المسلم (أذكار الصباح والمساء والنوم والصلاة والسفر وغيرها) الموجودة في صفحة الأذكار بالموقع.',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'اسم المناسبة أو كلمة من نص الذكر، مثال: الصباح أو السفر' } },
      required: ['query'],
    },
  },
  {
    name: 'search_prophets',
    description: 'ابحث عن معلومات عن أحد الأنبياء عليهم السلام من صفحة الأنبياء بالموقع (قصته، أمته، عدد ذكره في القرآن).',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'اسم النبي بالعربية أو الإنجليزية' } },
      required: ['query'],
    },
  },
  {
    name: 'search_seerah',
    description: 'ابحث في الخط الزمني للسيرة النبوية بالموقع عن أحداث معينة في حياة النبي ﷺ.',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'كلمة أو موضوع الحدث، مثال: الهجرة أو غزوة بدر' } },
      required: ['query'],
    },
  },
  {
    name: 'search_asma_allah',
    description: 'ابحث عن اسم من أسماء الله الحسنى التسعة والتسعين من صفحة الأسماء الحسنى بالموقع، بالاسم أو الرقم.',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'اسم من أسماء الله أو رقمه من 1 إلى 99' } },
      required: ['query'],
    },
  },
  {
    name: 'search_scholars',
    description: 'ابحث في دليل العلماء والدعاة الموثوقين بالموقع بالاسم أو الدولة أو التخصص.',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'اسم العالم أو الدولة أو التخصص' } },
      required: ['query'],
    },
  },
  {
    name: 'get_live_channels',
    description: 'احصل على قائمة القنوات والإذاعات الإسلامية المباشرة المتاحة في صفحة البث المباشر بالموقع.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'search_site_faq',
    description: 'ابحث في الأسئلة الشائعة عن الإسلام الموجودة في الصفحة الرئيسية بالموقع.',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'كلمة من السؤال' } },
      required: ['query'],
    },
  },
]

async function runTool(name: string, input: unknown): Promise<string> {
  const query = typeof (input as { query?: unknown })?.query === 'string' ? (input as { query: string }).query : ''
  switch (name) {
    case 'search_quran':
      return searchQuranApi(query)
    case 'search_hadith':
      return searchHadithApi(query)
    case 'search_adhkar':
      return searchAdhkar(query)
    case 'search_prophets':
      return searchProphets(query)
    case 'search_seerah':
      return searchSeerah(query)
    case 'search_asma_allah':
      return searchAsmaAllah(query)
    case 'search_scholars':
      return searchScholars(query)
    case 'get_live_channels':
      return getLiveChannels()
    case 'search_site_faq':
      return searchSiteFaq(query) ?? 'لا توجد نتائج مطابقة في الأسئلة الشائعة.'
    default:
      return `أداة غير معروفة: ${name}`
  }
}

// ───────────────────────── System prompt ─────────────────────────

const SITE_MAP = `
- القرآن الكريم: /quran
- الأحاديث النبوية: /hadith
- الأذكار والأدعية: /adhkar
- قصص الأنبياء: /prophets
- السيرة النبوية: /seerah
- أسماء الله الحسنى: /asma-allah
- مواقيت الصلاة: /prayer-times
- العلماء والدعاة: /scholars
- البث المباشر: /live
- الفيديوهات الإسلامية: /islamic-videos
- قسم الأطفال: /kids
- البحث الشامل: /search
`.trim()

function buildSystemPrompt(language: string): string {
  return `أنت "الراشد"، المساعد الذكي لموقع "الصراط المستقيم"، منصة إسلامية شاملة.

مهمتك: الإجابة على أسئلة الزوار عن الإسلام والقرآن والسنة، بالاعتماد على محتوى الموقع نفسه كلما أمكن، عبر الأدوات المتاحة لك للبحث في القرآن والحديث والأذكار وقصص الأنبياء والسيرة النبوية وأسماء الله الحسنى والعلماء والقنوات المباشرة والأسئلة الشائعة.

قواعد مهمة:
1. استخدم الأدوات المتاحة كلما كان السؤال متعلقاً بمحتوى تغطيه (آية، حديث، ذكر، نبي، حدث من السيرة، اسم من أسماء الله، عالم، قناة). لا تعتمد على معرفتك المحفوظة وحدها في هذه الحالات.
2. بعد الإجابة، إذا كان هناك قسم في الموقع يحتوي تفاصيل أوسع، أشر إليه بشكل طبيعي (مثال: "تقدر تلاقي التفاصيل الكاملة في صفحة السيرة النبوية بالموقع").
3. خريطة أقسام الموقع:
${SITE_MAP}
4. للأسئلة الفقهية الخلافية أو التي تحتاج فتوى شخصية، أجب بالمبدأ العام بحذر وانصح بالرجوع لعالم موثوق أو مواقع مثل dorar.net أو islamweb.net، ولا تُفتِ نيابة عن عالم.
5. أجب دائماً بلغة المستخدم (كود اللغة: ${language})، حتى لو كانت نتائج الأدوات بالعربية — لخّصها وترجمها بأمانة مع الإبقاء على النصوص القرآنية والحديثية الأصلية بين علامتي اقتباس عند الاستشهاد بها.
6. اجعل إجاباتك موجزة وواضحة ومناسبة لمحادثة نصية قصيرة، وليست مقالاً طويلاً.
7. لا تخترع معلومات دينية غير موجودة في نتائج الأدوات أو معرفتك الموثوقة؛ إن لم تجد نتيجة، قل ذلك بصراحة.`
}

// ───────────────────────── Route handler ─────────────────────────

const MAX_ITERATIONS = 5

export async function POST(req: NextRequest) {
  let language = 'ar'
  try {
    const body = await req.json()
    const message: string = body.message ?? ''
    language = body.language ?? 'ar'

    if (!message.trim()) {
      return NextResponse.json({ error: 'message required' }, { status: 400 })
    }

    const messages: Anthropic.MessageParam[] = [{ role: 'user', content: message }]
    let finalText = ''

    for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 2048,
        system: buildSystemPrompt(language),
        tools: TOOLS,
        output_config: { effort: 'medium' },
        messages,
      })

      if (response.stop_reason === 'refusal') {
        finalText = chatMessages(language).refusal
        break
      }

      messages.push({ role: 'assistant', content: response.content })

      const toolUses = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
      )

      if (!toolUses.length || response.stop_reason !== 'tool_use') {
        finalText = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === 'text')
          .map((b) => b.text)
          .join('\n')
          .trim()
        break
      }

      const toolResults: Anthropic.ToolResultBlockParam[] = []
      for (const toolUse of toolUses) {
        const result = await runTool(toolUse.name, toolUse.input)
        toolResults.push({ type: 'tool_result', tool_use_id: toolUse.id, content: result })
      }
      messages.push({ role: 'user', content: toolResults })
    }

    if (!finalText) {
      finalText = chatMessages(language).noAnswer
    }

    return NextResponse.json({ reply: finalText })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json({ reply: chatMessages(language).generalError }, { status: 500 })
  }
}
