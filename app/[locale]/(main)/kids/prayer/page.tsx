import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { KidsLessonPage } from '@/components/kids/KidsLessonPage'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'kidsPage' })
  return {
    title: t('lessons.prayer.title'),
    description: t('lessons.prayer.desc'),
    alternates: buildAlternates(locale, 'kids/prayer'),
  }
}

export default async function PrayerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <KidsLessonPage
      locale={locale}
      title="تعلم الصلاة"
      subtitle="كيف نصلي بسلام وطمأنينة؟"
      icon="🕋"
      intro="الصلاة هي عمود الدين، وهي فرصة للأطفال للتقرب إلى الله من خلال الترتيب والوضوء والأذكار."
      videoId="edL3W38ODd4"
      videoTitle="الشيخ عمر فارس - تعليم الصلاة للأطفال بطريقة سهلة"
      steps={[
        { title: 'الاستقبال', text: 'نستقبل القبلة ونقف بهدوء.' },
        { title: 'تكبيرة الإحرام', text: 'نبدأ بتكبيرة الإحرام ورفع اليدين.' },
        { title: 'الركوع', text: 'نركع ونضع اليدين على الركبتين.' },
        { title: 'السجود', text: 'نسجد على الأرض ونقرأ بعض الأدعية.' },
      ]}
      sections={[
        { title: 'الركعات', items: ['الصبح ركعتان', 'الظهر أربع ركعات', 'العصر أربع ركعات', 'المغرب ثلاث ركعات', 'العشاء أربع ركعات'] },
        { title: 'الأذكار', items: ['سبحان الله', 'الحمد لله', 'الله أكبر', 'استغفر الله'] },
      ]}
      quiz={[
        { question: 'ما أول ما نقوله عند البدء؟', options: ['الحمد لله', 'الله أكبر', 'سبحان الله'], answer: 1 },
        { question: 'كم ركعة في صلاة المغرب؟', options: ['ثلاث', 'أربع', 'ركعتان'], answer: 0 },
      ]}
    />
  )
}
