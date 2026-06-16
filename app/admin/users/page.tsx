export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-arabic text-2xl font-bold text-gray-800 dark:text-white">إدارة المستخدمين</h2>
        <span className="text-sm text-gray-500">0 مستخدم</span>
      </div>

      <input type="text" placeholder="ابحث بالاسم أو البريد..." className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 text-right" />

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">👥</div>
          <p className="font-arabic">لا يوجد مستخدمون</p>
          <p className="text-sm mt-2 text-gray-400">نظام تسجيل الدخول قيد التطوير</p>
        </div>
      </div>
    </div>
  )
}
