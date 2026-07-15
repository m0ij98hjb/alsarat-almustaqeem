import type { Metadata } from 'next'
import IslamicVideosClient from './IslamicVideosClient'

export const metadata: Metadata = {
  title: '📺 الفيديوهات الإسلامية',
  description:
    'مكتبة إسلامية متكاملة تضم محاضرات ودروسًا ومقاطع دعوية موثوقة من كبار العلماء والدعاة، لتكون مرجعًا مهمًا لكل مسلم يريد تعلم دينه.',
  openGraph: {
    title: '📺 الفيديوهات الإسلامية',
    description:
      'مكتبة إسلامية متكاملة تضم محاضرات ودروسًا ومقاطع دعوية موثوقة من كبار العلماء والدعاة، لتكون مرجعًا مهمًا لكل مسلم يريد تعلم دينه.',
    type: 'website',
  },
}

export default function IslamicVideosPage() {
  return <IslamicVideosClient />
}

