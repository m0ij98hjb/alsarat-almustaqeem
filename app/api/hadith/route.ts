import { NextResponse } from 'next/server'

const SAMPLE_HADITHS = [
  { id: 1,    hadithNum: 1,    textArabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى', narrator: 'عمر بن الخطاب', grade: 'SAHIH', book: { nameArabic: 'صحيح البخاري', slug: 'bukhari' } },
  { id: 2,    hadithNum: 8,    textArabic: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ', narrator: 'ابن عمر', grade: 'SAHIH', book: { nameArabic: 'صحيح البخاري', slug: 'bukhari' } },
  { id: 3,    hadithNum: 6018, textArabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', narrator: 'أبو هريرة', grade: 'SAHIH', book: { nameArabic: 'صحيح البخاري', slug: 'bukhari' } },
  { id: 4,    hadithNum: 45,   textArabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ', narrator: 'أنس بن مالك', grade: 'SAHIH', book: { nameArabic: 'صحيح مسلم', slug: 'muslim' } },
]

export async function GET() {
  return NextResponse.json({ success: true, data: SAMPLE_HADITHS, total: SAMPLE_HADITHS.length, page: 1, totalPages: 1 })
}

export async function POST() {
  return NextResponse.json({ success: false, error: 'Not implemented' }, { status: 501 })
}
