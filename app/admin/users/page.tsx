import { prisma } from '@/lib/prisma'

async function getUsers() {
  try {
    return await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  } catch { return [] }
}

const ROLE_LABELS: Record<string, string> = {
  USER: 'عضو', EDITOR: 'محرر', ADMIN: 'مدير', SUPER_ADMIN: 'مدير عام',
}
const ROLE_COLORS: Record<string, string> = {
  USER: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  EDITOR: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  ADMIN: 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',
  SUPER_ADMIN: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default async function AdminUsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-arabic text-2xl font-bold text-gray-800 dark:text-white">إدارة المستخدمين</h2>
        <span className="text-sm text-gray-500">{users.length} مستخدم</span>
      </div>

      {/* Search */}
      <input type="text" placeholder="ابحث بالاسم أو البريد..." className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 text-right" />

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                {['الاسم', 'البريد', 'الصلاحية', 'الحالة', 'تاريخ الانضمام', 'إجراءات'].map(h => (
                  <th key={h} className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {users.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">لا يوجد مستخدمون</td></tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white text-sm">{user.name}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm" dir="ltr">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ROLE_COLORS[user.role]}`}>
                        {ROLE_LABELS[user.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full ${user.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {user.isActive ? 'نشط' : 'موقوف'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-xs text-blue-500 hover:text-blue-700 transition-colors">تعديل</button>
                        <button className="text-xs text-red-500 hover:text-red-700 transition-colors">إيقاف</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
