import type { Metadata } from 'next'
import { KidsLessonPage } from '@/components/kids/KidsLessonPage'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'تعلم الصلاة للأطفال',
    description: 'كيف نصلي بسلام وطمأنينة؟ خطوات الصلاة مبسطة للأطفال مع فيديو تعليمي.',
    alternates: buildAlternates(locale, 'kids/prayer'),
  }
}

export default function PrayerPage() {
  return (
    <KidsLessonPage
      title="تعلم الصلاة"
      subtitle="كيف نصلي بسلام وطمأنينة؟"
      icon="🕋"
      intro="الصلاة هي عمود الدين، وهي فرصة للأطفال للتقرب إلى الله من خلال الترتيب والوضوء والأذكار."
      videoId="y3k0yanH4Fk"
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
