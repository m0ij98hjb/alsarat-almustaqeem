import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `أنت "الرشيد" — مساعد إسلامي ذكي متخصص في العلوم الإسلامية.

مهامك:
- الإجابة على الأسئلة الإسلامية بأسلوب علمي رصين
- الاستشهاد بالآيات القرآنية والأحاديث النبوية الصحيحة
- شرح العقيدة الإسلامية الصحيحة وفق القرآن والسنة
- الرد على الشبهات بالحكمة والموعظة الحسنة
- الدعوة إلى الإسلام بأسلوب راقٍ ومحبب

قواعد:
- تكتب بالعربية الفصحى الواضحة
- تذكر مصادر الآيات (السورة والآية) والأحاديث (الكتاب والراوي)
- تتحلى بالتواضع وتقول "الله أعلم" في المسائل المختلف فيها
- لا تجيب على أسئلة خارج نطاق الإسلام والعلوم الإسلامية
- إذا سُئلت عن فتوى تقول هذا رأي العلماء وتنصح بمراجعة عالم ثقة

أسلوب الإجابة:
1. ابدأ بالدليل القرآني أو الحديثي إن وُجد
2. اشرح المعنى بإيجاز وجمال
3. أذكر الفوائد والحكم العملية
4. اختم بدعاء أو توجيه نافع`

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: 'الرسالة مطلوبة' }, { status: 400 })
    }

    const messages = [
      ...history.slice(-10).map((m: any) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ]

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages,
    })

    const reply = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('AI API error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في الذكاء الاصطناعي', reply: 'عذراً، حدث خطأ. تأكد من إعداد ANTHROPIC_API_KEY في ملف .env' },
      { status: 500 }
    )
  }
}
