import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getFatwas() {
  try {
    return await prisma.fatwa.findMany({
      orderBy: { createdAt: 'desc' },
      take: 30,
      include: { author: { select: { name: true } } },
    })
  } catch { return [] }
}

export default async function AdminFatawasPage() {
  const fatwas = await getFatwas()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-arabic text-2xl font-bold text-gray-800 dark:text-white">إدارة الفتاوى</h2>
        <Link href="/admin/fatwas/new" className="btn-gold text-sm px-4 py-2">+ إضافة فتوى</Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {fatwas.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">⚖️</div>
            <p>لا توجد فتاوى بعد</p>
            <Link href="/admin/fatwas/new" className="text-gold-500 text-sm hover:underline mt-2 inline-block">إضافة أول فتوى</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {fatwas.map((f: any) => (
              <div key={f.id} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-gold-100 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded">{f.category}</span>
                      {f.isVerified && <span className="text-xs text-green-600 dark:text-green-400">✓ موثّقة</span>}
                    </div>
                    <p className="font-arabic font-medium text-gray-900 dark:text-white mb-1">{f.question}</p>
                    <p className="text-xs text-gray-400">{f.author?.name || 'المدير'} — {new Date(f.createdAt).toLocaleDateString('ar-SA')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs text-blue-500 hover:text-blue-700 px-2 py-1 rounded transition-colors">تعديل</button>
                    <button className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded transition-colors">حذف</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
