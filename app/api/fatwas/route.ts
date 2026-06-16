import { NextRequest, NextResponse } from 'next/server'

const SAMPLE_FATWAS = [
  { id: 1, question: 'ما حكم قراءة القرآن من الهاتف بدون وضوء؟', answer: 'يجوز مس الهاتف المحمول الذي فيه القرآن بدون وضوء على الراجح من أقوال أهل العلم.', category: 'الطهارة', scholar: 'فتوى معاصرة', isVerified: true, views: 5420, tags: ['القرآن', 'الوضوء'] },
  { id: 2, question: 'هل يجوز الصلاة بالنعال داخل المسجد؟', answer: 'الصلاة بالنعال جائزة وهي سنة في غير المساجد المفروشة.', category: 'الصلاة', scholar: 'علماء الفقه', isVerified: true, views: 3200, tags: ['الصلاة', 'المسجد'] },
  { id: 3, question: 'ما حكم صيام يوم الشك؟', answer: 'لا يجوز صيام يوم الثلاثين من شعبان إذا كان بنية رمضان.', category: 'الصيام', scholar: 'جمهور الفقهاء', isVerified: true, views: 8100, tags: ['الصيام', 'رمضان'] },
  { id: 4, question: 'ما حكم الزكاة على المال في البنك؟', answer: 'المال المودع في البنك تجب فيه الزكاة إذا بلغ النصاب وحال عليه الحول.', category: 'الزكاة', scholar: 'الفقه الإسلامي', isVerified: true, views: 6750, tags: ['الزكاة', 'المال'] },
  { id: 5, question: 'هل يجوز للمرأة قيادة السيارة؟', answer: 'يجوز للمرأة قيادة السيارة بالشروط الشرعية العامة كالالتزام بالحجاب.', category: 'المعاصر', scholar: 'جمهور العلماء المعاصرين', isVerified: true, views: 12300, tags: ['المرأة', 'المعاصر'] },
  { id: 6, question: 'ما حكم استخدام مواقع التواصل الاجتماعي؟', answer: 'استخدام مواقع التواصل الاجتماعي مباح في أصله وحكمه يتبع ما يُستخدم فيه.', category: 'المعاصر', scholar: 'العلماء المعاصرون', isVerified: true, views: 9800, tags: ['التواصل', 'المعاصر'] },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const page     = parseInt(searchParams.get('page')  || '1')
  const limit    = parseInt(searchParams.get('limit') || '12')

  let data = category ? SAMPLE_FATWAS.filter(f => f.category === category) : SAMPLE_FATWAS
  const total = data.length
  data = data.slice((page - 1) * limit, page * limit)

  return NextResponse.json({ success: true, data, total, page, totalPages: Math.ceil(total / limit) })
}

export async function POST(_req: NextRequest) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
