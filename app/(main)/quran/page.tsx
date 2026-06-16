import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'القرآن الكريم',
  description: 'القرآن الكريم كاملاً مع التفسير والبحث في الآيات',
}

// Fallback data for when DB is empty
const SURAHS_FALLBACK = Array.from({ length: 114 }, (_, i) => ({
  id: i + 1,
  nameArabic: ['الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف','الأنفال','التوبة','يونس','هود','يوسف','الرعد','إبراهيم','الحجر','النحل','الإسراء','الكهف','مريم','طه','الأنبياء','الحج','المؤمنون','النور','الفرقان','الشعراء','النمل','القصص','العنكبوت','الروم','لقمان','السجدة','الأحزاب','سبأ','فاطر','يس','الصافات','ص','الزمر','غافر','فصلت','الشورى','الزخرف','الدخان','الجاثية','الأحقاف','محمد','الفتح','الحجرات','ق','الذاريات','الطور','النجم','القمر','الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة','الصف','الجمعة','المنافقون','التغابن','الطلاق','التحريم','الملك','القلم','الحاقة','المعارج','نوح','الجن','المزمل','المدثر','القيامة','الإنسان','المرسلات','النبأ','النازعات','عبس','التكوير','الانفطار','المطففين','الانشقاق','البروج','الطارق','الأعلى','الغاشية','الفجر','البلد','الشمس','الليل','الضحى','الشرح','التين','العلق','القدر','البينة','الزلزلة','العاديات','القارعة','التكاثر','العصر','الهمزة','الفيل','قريش','الماعون','الكوثر','الكافرون','النصر','المسد','الإخلاص','الفلق','الناس'][i] || `سورة ${i+1}`,
  revelation: i < 86 ? 'مكية' : 'مدنية',
  ayahCount: [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,29,15,52,20,45,37,45,31,15,18,10,26,15,16,26,25,25,17,11,9,10,11,8,8,7,6,6,8,11,11,9,5,4,5,4,6,5,8,4,5,7,3,6,3,3,4,4,3,4,4,3,2,3,4][i] || 10,
  page: i * 5 + 1,
  juz: Math.ceil((i + 1) / 4),
}))

async function getSurahs() {
  try {
    const surahs = await prisma.surah.findMany({ orderBy: { id: 'asc' } })
    return surahs.length ? surahs : SURAHS_FALLBACK
  } catch {
    return SURAHS_FALLBACK
  }
}

export default async function QuranPage() {
  const surahs = await getSurahs()

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      {/* Header */}
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="font-arabic text-gold-300 text-2xl mb-4">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <h1 className="font-arabic text-white text-5xl font-bold mb-4">القرآن الكريم</h1>
          <p className="text-gray-300">كلام الله المُنزَّل على سيدنا محمد ﷺ — 114 سورة — 6,236 آية</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث في سور القرآن الكريم..."
              className="search-input text-lg py-4"
            />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Surahs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {surahs.map(surah => (
            <Link
              key={surah.id}
              href={`/quran/${surah.id}`}
              className="card-islamic p-4 text-center group hover:border-gold-400 transition-all"
            >
              <div className="text-xs text-gray-400 mb-1">{surah.id}</div>
              <div className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 group-hover:text-gold-500 mb-1 leading-normal">
                {surah.nameArabic}
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs text-gray-500">{surah.ayahCount} آية</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{surah.revelation}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
