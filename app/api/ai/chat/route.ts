import { NextRequest, NextResponse } from 'next/server'

// ── Types ──────────────────────────────────────────────────────────────────────
type QuestionType = 'quran' | 'hadith' | 'azkar' | 'general'

// ── Question type detection ────────────────────────────────────────────────────
function detectType(msg: string): QuestionType {
  // Quran-related keywords
  if (
    /آية|آيات|سورة|سور|قرآن|كريم|تفسير|قراءة|حزب|جزء|فاتحة|بقرة|آل عمران|نساء|مائدة|الأنعام|أعراف|الأنفال|التوبة|يونس|هود|يوسف|الرعد|إبراهيم|الحجر|النحل|الإسراء|الكهف|مريم|طه|الأنبياء|الحج|المؤمنون|النور|الفرقان|يس|الصافات|الزمر|غافر|فصلت|الشورى|الزخرف|الدخان|الجاثية|الأحقاف|محمد|الفتح|الحجرات|الذاريات|الطور|النجم|القمر|الرحمن|الواقعة|الحديد|الحشر|الصف|الجمعة|التغابن|الملك|القلم|الحاقة|المعارج|نوح|الجن|المزمل|المدثر|القيامة|الإنسان|المرسلات|النبأ|النازعات|عبس|التكوير|الانفطار|المطففين|الانشقاق|البروج|الطارق|الأعلى|الغاشية|الفجر|البلد|الشمس|الليل|الضحى|الشرح|التين|العلق|القدر|البينة|الزلزلة|العاديات|القارعة|التكاثر|العصر|الهمزة|الفيل|قريش|الماعون|الكوثر|الكافرون|النصر|المسد|الإخلاص|الفلق|الناس/.test(msg)
  ) return 'quran'

  // Hadith-related keywords
  if (
    /حديث|حديثاً|حديثا|رواه|قال النبي|قال رسول|صلى الله عليه وسلم|ﷺ|أحاديث|سنة نبوية|سنة المصطفى|ما ورد عن|روي عن|البخاري|مسلم|الترمذي|أبو داود|ابن ماجه|النسائي|أحمد|الطبراني/.test(msg)
  ) return 'hadith'

  // Azkar / dua keywords
  if (
    /ذكر|أذكار|دعاء|أدعية|تسبيح|استغفار|تهليل|تكبير|تحميد|أذكار الصباح|أذكار المساء|أذكار النوم|أذكار الاستيقاظ|أذكار الصلاة|أذكار السفر|أذكار الطعام|حصن المسلم|سيد الاستغفار/.test(msg)
  ) return 'azkar'

  return 'general'
}

// Clean message for API search
function extractKeyword(msg: string): string {
  return msg
    .replace(/ما هي|ما هو|ما هم|ما حكم|ما فضل|ما معنى|اشرح|بين|وضح|كيف|متى|أين|من هو|هل يجوز|هل|لماذا|أخبرني عن|ابحث عن/g, ' ')
    .replace(/في الإسلام|الإسلامي|في الدين|الإسلامية|المبارك|الشريف|الكريم|العظيم/g, ' ')
    .replace(/[؟?!،,\.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 60)
}

// ── Quran search via AlQuran Cloud ─────────────────────────────────────────────
async function searchQuran(keyword: string): Promise<string> {
  try {
    const encoded = encodeURIComponent(keyword)
    const res = await fetch(
      `https://api.alquran.cloud/v1/search/${encoded}/all/quran-uthmani`,
      { next: { revalidate: 3600 } },
    )
    const data = await res.json()

    if (data.code !== 200 || !data.data?.matches?.length) {
      return `لم أجد نتائج قرآنية لـ "${keyword}".\n\nجرّب صياغة مختلفة، أو تصفّح موقع qurancomplex.gov.sa للبحث المتقدم.`
    }

    const matches: Array<{
      text: string
      surah: { name: string; number: number }
      numberInSurah: number
    }> = data.data.matches.slice(0, 3)

    let reply = `📖 من القرآن الكريم:\n\n`
    for (const m of matches) {
      reply += `﴿${m.text}﴾\n`
      reply += `— ${m.surah.name} [${m.surah.number}:${m.numberInSurah}]\n\n`
    }
    if (data.data.count > 3) {
      reply += `(وجدت ${data.data.count} نتيجة — عُرض أول 3)`
    }
    return reply
  } catch {
    return 'تعذّر البحث في القرآن الآن. تحقق من الاتصال وحاول مجدداً.'
  }
}

// ── Hadith search via Dorar ────────────────────────────────────────────────────
async function searchHadith(keyword: string): Promise<string> {
  try {
    const encoded = encodeURIComponent(keyword)
    const res = await fetch(
      `https://dorar.net/api/v1/hadiths?value=${encoded}&books=0`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; IslamicApp/1.0)',
        },
        next: { revalidate: 3600 },
      },
    )
    if (!res.ok) throw new Error(`Dorar ${res.status}`)

    const data = await res.json()
    if (!data.data?.length) return getStaticHadith(keyword)

    const hadiths: Array<{
      hadith: string
      rawi?: string
      book?: string
      grade?: string
    }> = data.data.slice(0, 2)

    let reply = `📜 من الأحاديث النبوية الشريفة:\n\n`
    for (const h of hadiths) {
      reply += `"${h.hadith}"\n\n`
      const meta: string[] = []
      if (h.rawi) meta.push(`الراوي: ${h.rawi}`)
      if (h.book) meta.push(`المصدر: ${h.book}`)
      if (h.grade) meta.push(`الدرجة: ${h.grade}`)
      if (meta.length) reply += meta.join(' | ') + '\n\n'
    }
    return reply
  } catch {
    return getStaticHadith(keyword)
  }
}

// ── Azkar via GitHub JSON ──────────────────────────────────────────────────────
async function fetchAzkar(msg: string): Promise<string> {
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/nawafalqari/azkar-api/main/src/data/adkar.json',
      { next: { revalidate: 86400 } },
    )
    if (!res.ok) throw new Error('azkar 404')

    const data: Record<
      string,
      Array<{ content: string; count: string; description?: string }>
    > = await res.json()

    // Map message keywords to JSON category keys
    const catMatches: Array<[RegExp, string]> = [
      [/صباح|الفجر|الضحى/, 'الصباح'],
      [/مساء|المغرب|العصر/, 'المساء'],
      [/نوم|ينام|قبل النوم/, 'النوم'],
      [/استيقاظ|يقظة|صحو/, 'الاستيقاظ'],
      [/سفر|مسافر|طريق/, 'السفر'],
      [/طعام|أكل|شرب/, 'الطعام'],
      [/صلاة|سجود|ركوع/, 'الصلاة'],
    ]

    let chosenKey = Object.keys(data)[0]
    for (const [pattern, partial] of catMatches) {
      if (pattern.test(msg)) {
        const found = Object.keys(data).find(k => k.includes(partial))
        if (found) { chosenKey = found; break }
      }
    }

    const items = (data[chosenKey] ?? []).slice(0, 3)
    if (!items.length) return getStaticAzkar(msg)

    let reply = `📿 من ${chosenKey}:\n\n`
    for (const item of items) {
      reply += `"${item.content}"\n`
      if (item.count && item.count !== '1') reply += `التكرار: ${item.count} مرة\n`
      if (item.description) reply += `الفضل: ${item.description}\n`
      reply += '\n'
    }
    return reply
  } catch {
    return getStaticAzkar(msg)
  }
}

// ── Static fallbacks (used when APIs are unavailable) ─────────────────────────
const STATIC_HADITHS: Array<[RegExp, string]> = [
  [
    /صلاة|صلوات/,
    `📜 من الأحاديث النبوية:\n\n"إن أول ما يُحاسب به العبد يوم القيامة من عمله صلاته، فإن صلحت فقد أفلح وأنجح، وإن فسدت فقد خاب وخسر."\n\nالراوي: أبو هريرة | المصدر: أبو داود والترمذي | الدرجة: صحيح`,
  ],
  [
    /صوم|صيام|رمضان/,
    `📜 من الأحاديث النبوية:\n\n"من صام رمضان إيماناً واحتساباً غُفر له ما تقدم من ذنبه."\n\nالراوي: أبو هريرة | المصدر: البخاري ومسلم | الدرجة: صحيح`,
  ],
  [
    /زكاة|تزكية/,
    `📜 من الأحاديث النبوية:\n\n"ما نقصت صدقة من مال، وما زاد الله عبداً بعفو إلا عزاً."\n\nالراوي: أبو هريرة | المصدر: مسلم | الدرجة: صحيح`,
  ],
  [
    /حج|عمرة/,
    `📜 من الأحاديث النبوية:\n\n"من حجّ لله فلم يرفث ولم يفسق رجع كيوم ولدته أمه."\n\nالراوي: أبو هريرة | المصدر: البخاري ومسلم | الدرجة: صحيح`,
  ],
]

function getStaticHadith(keyword: string): string {
  for (const [pattern, text] of STATIC_HADITHS) {
    if (pattern.test(keyword)) return text
  }
  return `📜 من الأحاديث النبوية:\n\n"خيركم من تعلّم القرآن وعلّمه."\n\nالراوي: عثمان بن عفان | المصدر: البخاري | الدرجة: صحيح\n\n"إن الله لا ينظر إلى صوركم وأموالكم ولكن ينظر إلى قلوبكم وأعمالكم."\n\nالراوي: أبو هريرة | المصدر: مسلم | الدرجة: صحيح`
}

function getStaticAzkar(msg: string): string {
  if (/مساء|المغرب/.test(msg))
    return `📿 أذكار المساء:\n\n"أَمسَينا وأَمسى المُلكُ لله والحمدُ لله، لا إلهَ إلاّ اللّهُ وحدَهُ لا شَريكَ له، له المُلكُ وله الحمدُ وهو على كلّ شيءٍ قدير"\n(تقال مرة مساءً)\n\n"اللّهُمَّ بكَ أَمسَينا وبكَ أَصبَحنا وبكَ نَحيا وبكَ نَموتُ وإليكَ المَصير"\n(تقال مرة مساءً)`

  if (/نوم/.test(msg))
    return `📿 أذكار النوم:\n\n"بِاسْمِكَ اللّهُمَّ أَموتُ وَأَحيا"\n(تقال مرة)\n\n"سُبحانَ اللّه" (33 مرة)\n"الحمدُ لله" (33 مرة)\n"اللّهُ أَكبر" (34 مرة)`

  // Default: morning azkar
  return `📿 أذكار الصباح:\n\n"أَصْبَحْنا وَأَصْبَحَ المُلكُ لله والحمدُ لله، لا إلهَ إلاّ اللّهُ وحدَهُ لا شَريكَ له، له المُلكُ وله الحمدُ وهو على كلّ شيءٍ قدير"\n(تقال مرة صباحاً)\n\n"اللّهُمَّ بكَ أَصبَحنا وبكَ أَمسَينا وبكَ نَحيا وبكَ نَموتُ وإليكَ النُّشور"\n(تقال مرة صباحاً)`
}

// ── Static general knowledge ───────────────────────────────────────────────────
const KNOWLEDGE: Array<[RegExp, string]> = [
  [
    /أركان الإسلام|خمسة أركان|ما الإسلام|بُني الإسلام|بني الإسلام/,
    `🕌 أركان الإسلام الخمسة:\n\n1. شهادة أن لا إله إلا الله وأن محمداً رسول الله\n2. إقامة الصلاة (خمس صلوات يومياً)\n3. إيتاء الزكاة (2.5% من المال الزكوي)\n4. صوم رمضان\n5. حج البيت لمن استطاع إليه سبيلاً\n\nقال النبي ﷺ: "بُنِيَ الإسلام على خمس" — متفق عليه`,
  ],
  [
    /أركان الإيمان|ستة أركان|الإيمان الست/,
    `✨ أركان الإيمان الستة:\n\n1. الإيمان بالله\n2. الإيمان بالملائكة\n3. الإيمان بالكتب السماوية\n4. الإيمان بالرسل والأنبياء\n5. الإيمان باليوم الآخر\n6. الإيمان بالقدر خيره وشره\n\nمن حديث جبريل ﷺ — رواه مسلم`,
  ],
  [
    /معنى التوحيد|ما التوحيد|ما هو التوحيد|اشرح التوحيد/,
    `🌟 معنى التوحيد:\n\nإفراد الله بالعبادة، وأنواعه ثلاثة:\n\n• توحيد الربوبية: الإقرار بأن الله وحده الخالق الرازق المدبر\n• توحيد الألوهية: إخلاص العبادة لله وحده\n• توحيد الأسماء والصفات: إثبات ما أثبته الله لنفسه بلا تحريف ولا تعطيل\n\n﴿وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ﴾ [الذاريات: 56]`,
  ],
  [
    /فضل القرآن|فضائل القرآن|ثواب القرآن|فضل التلاوة/,
    `📖 فضائل القرآن الكريم:\n\n• "خيركم من تعلّم القرآن وعلّمه" — البخاري\n• "اقرأوا القرآن فإنه يأتي يوم القيامة شفيعاً لأصحابه" — مسلم\n• "من قرأ حرفاً من كتاب الله فله حسنة، والحسنة بعشر أمثالها" — الترمذي\n• "الذي يقرأ القرآن وهو ماهر به مع السفرة الكرام البررة" — متفق عليه`,
  ],
  [
    /فضل الاستغفار|فضائل الاستغفار|ثواب الاستغفار/,
    `🤲 فضل الاستغفار:\n\n• "من لزم الاستغفار جعل الله له من كل ضيق مخرجاً، ومن كل هم فرجاً، ورزقه من حيث لا يحتسب" — أبو داود\n• كان النبي ﷺ يستغفر في اليوم أكثر من سبعين مرة — البخاري\n\nسيد الاستغفار:\n"اللهم أنت ربي لا إله إلا أنت خلقتني وأنا عبدك وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت"`,
  ],
  [
    /حكم الصلاة|فريضة الصلاة|وجوب الصلاة|أوقات الصلاة/,
    `🕌 الصلاة في الإسلام:\n\nالصلاة فريضة واجبة — الركن الثاني من أركان الإسلام.\n\n﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا﴾ [النساء: 103]\n\nالصلوات الخمس:\n• الفجر: ركعتان\n• الظهر: أربع ركعات\n• العصر: أربع ركعات\n• المغرب: ثلاث ركعات\n• العشاء: أربع ركعات`,
  ],
  [
    /من هو النبي|سيرة النبي|محمد ﷺ|المصطفى ﷺ/,
    `🌙 النبي محمد ﷺ:\n\nخاتم الأنبياء والمرسلين، وُلد في مكة المكرمة عام الفيل (570م)، وبُعث بالرسالة في سن الأربعين، هاجر إلى المدينة، وتوفي فيها سنة 11هـ.\n\nقال تعالى: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾ [الأنبياء: 107]`,
  ],
]

function matchKnowledge(msg: string): string | null {
  for (const [pattern, answer] of KNOWLEDGE) {
    if (pattern.test(msg)) return answer
  }
  return null
}

// ── Route handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    if (!message?.trim()) {
      return NextResponse.json({ error: 'الرسالة مطلوبة' }, { status: 400 })
    }

    const type = detectType(message)
    const keyword = extractKeyword(message)

    let reply: string

    if (type === 'quran') {
      reply = await searchQuran(keyword)
    } else if (type === 'hadith') {
      reply = await searchHadith(keyword)
    } else if (type === 'azkar') {
      reply = await fetchAzkar(message)
    } else {
      const known = matchKnowledge(message)
      reply = known ??
        `جزاك الله خيراً على سؤالك الكريم.\n\nللإجابة الدقيقة أنصحك بـ:\n\n• موسوعة الدرر السنية: dorar.net\n• موقع إسلام ويب: islamweb.net\n• الرجوع لعالم ثقة في بلدك\n\nوالله أعلم، وصلى الله على نبينا محمد وآله وصحبه أجمعين. 🌙`
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { reply: 'عذراً، حدث خطأ مؤقت. حاول مجدداً.' },
      { status: 500 },
    )
  }
}
