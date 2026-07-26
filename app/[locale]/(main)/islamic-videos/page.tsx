import type { Metadata } from 'next'
import IslamicVideosClient from './IslamicVideosClient'
import { buildAlternates } from '@/lib/seo'

const TITLE = '📺 الفيديوهات الإسلامية'
const DESCRIPTION =
  'مكتبة إسلامية متكاملة تضم محاضرات ودروسًا ومقاطع دعوية موثوقة من كبار العلماء والدعاة، لتكون مرجعًا مهمًا لكل مسلم يريد تعلم دينه.'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildAlternates(locale, 'islamic-videos'),
    openGraph: { title: TITLE, description: DESCRIPTION, type: 'website' },
  }
}

export default function IslamicVideosPage() {
  return <IslamicVideosClient />
}
