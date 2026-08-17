import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { KidsLessonPage } from '@/components/kids/KidsLessonPage'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'kidsPage' })
  return {
    title: t('lessons.hajj.title'),
    description: t('lessons.hajj.desc'),
    alternates: buildAlternates(locale, 'kids/hajj'),
  }
}

export default async function HajjPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <KidsLessonPage
      locale={locale}
      title="تعلم الحج"
      subtitle="الخطوات الأساسية للحج مع شرح مبسط للأطفال"
      icon="🪔"
      intro="الحج من أعظم العبادات، وهو فرصة للتأمل والذكر والتقرب من الله، ويحتوي على مراحل مهمة ومشاعر مقدسة."
      videoId="sMogItlk36s"
      videoTitle="أنمي تفاعلي يوضح مناسك الحج بطريقة مبسطة"
      steps={[
        { title: 'الإحرام', text: 'نبدأ بالإحرام وذكر النية في القلب.' },
        { title: 'الطواف', text: 'نطوف حول الكعبة سبع مرات.' },
        { title: 'السعي', text: 'نمر بين الصفا والمروة سبع مرات.' },
        { title: 'المشاعر المقدسة', text: 'نذكر الله في منى وعرفة ومزدلفة.' },
      ]}
      sections={[
        { title: 'المشاعر المقدسة', items: ['منى', 'عرفات', 'مزدلفة'] },
        { title: 'أهم ما نذكره', items: ['الهدوء', 'الذكر', 'الرحمة'] },
      ]}
      quiz={[
        { question: 'أين يقيم الحاج في يوم عرفة؟', options: ['منى', 'مزدلفة', 'عرفات'], answer: 2 },
        { question: 'كم مرة يطوف الحاج حول الكعبة؟', options: ['ثلاث', 'سبع', 'أربع'], answer: 1 },
      ]}
    />
  )
}
