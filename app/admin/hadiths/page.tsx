import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { HADITH_GRADE_LABELS } from '@/utils'

async function getHadiths() {
  try {
    return await prisma.hadith.findMany({
      orderBy: { id: 'asc' },
      take: 30,
      include: { book: { select: { nameArabic: true } } },
    })
  } catch { return [] }
}

export default async function AdminHadithsPage() {
  const hadiths = await getHadiths()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-arabic text-2xl font-bold text-gray-800 dark:text-white">إدارة الأحاديث</h2>
        <Link href="/admin/hadiths/new" className="btn-gold text-sm px-4 py-2">+ إضافة حديث</Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {hadiths.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">📜</div>
            <p>لا توجد أحاديث في قاعدة البيانات</p>
            <p className="text-sm mt-2">قم بتشغيل <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">npm run db:seed</code> لإضافة بيانات أولية</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  {['#', 'نص الحديث', 'الكتاب', 'الراوي', 'الدرجة', 'إجراءات'].map(h => (
                    <th key={h} className="px-4 py-3 text-xs text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {hadiths.map((h: any) => (
                  <tr key={h.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3 text-gray-400 text-xs">{h.hadithNum}</td>
                    <td className="px-4 py-3 font-arabic text-sm max-w-xs truncate">{h.textArabic}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{h.book?.nameArabic}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{h.narrator}</td>
                    <td className="px-4 py-3">
                      <span className={`grade-${h.grade.toLowerCase()} text-xs`}>{HADITH_GRADE_LABELS[h.grade]}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-500 hover:text-blue-700">تعديل</button>
                        <button className="text-xs text-red-500 hover:text-red-700">حذف</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
