import Link from 'next/link'

const FATWAS = [
  { id: 1, question: 'ما حكم قراءة القرآن من الهاتف بدون وضوء؟', category: 'الطهارة', isVerified: true, views: 5420 },
  { id: 2, question: 'هل يجوز الصلاة بالنعال داخل المسجد؟',       category: 'الصلاة',  isVerified: true, views: 3200 },
  { id: 3, question: 'ما حكم صيام يوم الشك؟',                      category: 'الصيام',  isVerified: true, views: 8100 },
  { id: 4, question: 'ما حكم الزكاة على المال في البنك؟',           category: 'الزكاة',  isVerified: true, views: 6750 },
  { id: 5, question: 'هل يجوز للمرأة قيادة السيارة؟',              category: 'المعاصر', isVerified: true, views: 12300 },
  { id: 6, question: 'ما حكم استخدام مواقع التواصل الاجتماعي؟',    category: 'المعاصر', isVerified: true, views: 9800 },
]

export default function AdminFatawasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-arabic text-2xl font-bold text-gray-800 dark:text-white">إدارة الفتاوى</h2>
        <Link href="/admin/fatwas/new" className="btn-gold text-sm px-4 py-2">+ إضافة فتوى</Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {FATWAS.map(f => (
            <div key={f.id} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-gold-100 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded">{f.category}</span>
                    {f.isVerified && <span className="text-xs text-green-600 dark:text-green-400">✓ موثّقة</span>}
                  </div>
                  <p className="font-arabic font-medium text-gray-900 dark:text-white mb-1">{f.question}</p>
                  <p className="text-xs text-gray-400">👁 {f.views.toLocaleString('ar-SA')}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/fatawa/${f.id}`} className="text-xs text-blue-500 hover:text-blue-700 px-2 py-1 rounded transition-colors">عرض</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
