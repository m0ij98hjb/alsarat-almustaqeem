import type { Metadata } from 'next'
import { KidsLessonPage } from '@/components/kids/KidsLessonPage'
import { buildAlternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'تعليم الأطفال الإسلام',
    description: 'أركان الإسلام والإيمان والأدعية اليومية والأخلاق الإسلامية للأطفال.',
    alternates: buildAlternates(locale, 'kids/learn'),
  }
}

export default function LearnPage() {
  return (
    <KidsLessonPage
      title="تعليم الأطفال الإسلام"
      subtitle="أركان الإسلام والإيمان والأدعية اليومية والأخلاق الإسلامية"
      icon="📘"
      intro="هذا القسم يقدّم للأطفال أساسيات الإسلام بطريقة ممتعة، من أركان الإسلام إلى الأخلاق والبر بالوالدين والصدق والأمانة."
      steps={[
        { title: 'أركان الإسلام', text: 'الشهادة والصلاة والصيام والزكاة والحج.' },
        { title: 'أركان الإيمان', text: 'الإيمان بالله وملائكته وكتبه ورسله واليوم الآخر والقدر.' },
        { title: 'الأخلاق', text: 'الصدق والأمانة والإحسان وبر الوالدين.' },
        { title: 'الأدعية', text: 'أذكار الصباح والمساء والأدعية اليومية.' },
      ]}
      sections={[
        { title: 'الموضوعات', items: ['أركان الإسلام', 'أركان الإيمان', 'أسماء الله الحسنى', 'قصص الأنبياء', 'قصص الصحابة', 'الأدعية اليومية', 'أذكار الصباح والمساء', 'البر بالوالدين', 'الصدق والأمانة والإحسان', 'مسابقات تعليمية'] },
        { title: 'أنشطة للأطفال', items: ['بطاقات تفاعلية', 'اختبارات قصيرة', 'تلوين وتعلم', 'تذكر وتطبيق'] },
      ]}
      quiz={[
        { question: 'ما عدد أركان الإسلام؟', options: ['أربعة', 'خمسة', 'ستة'], answer: 1 },
        { question: 'ما أسمى صفة من صفات المسلم؟', options: ['الكذب', 'الإحسان', 'الضيق'], answer: 1 },
      ]}
    />
  )
}
