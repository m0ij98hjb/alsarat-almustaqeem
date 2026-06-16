import Link from 'next/link'

export default function AdminHadithsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-arabic text-2xl font-bold text-gray-800 dark:text-white">إدارة الأحاديث</h2>
        <Link href="/admin/hadiths/new" className="btn-gold text-sm px-4 py-2">+ إضافة حديث</Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📜</div>
          <p>لا توجد أحاديث في قاعدة البيانات</p>
          <p className="text-sm mt-2">البيانات تُعرض من البيانات الثابتة في صفحة الحديث</p>
        </div>
      </div>
    </div>
  )
}
