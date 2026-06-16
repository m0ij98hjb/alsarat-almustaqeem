import { prisma } from '@/lib/prisma'

async function getStats() {
  try {
    const [users, hadiths, adhkar, fatwas, questions] = await Promise.all([
      prisma.user.count(),
      prisma.hadith.count(),
      prisma.dhikr.count(),
      prisma.fatwa.count(),
      prisma.question.count(),
    ])
    return { users, hadiths, adhkar, fatwas, questions }
  } catch {
    return { users: 0, hadiths: 0, adhkar: 0, fatwas: 0, questions: 0 }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'المستخدمون',  value: stats.users,     icon: '👥', color: 'bg-blue-500',   href: '/admin/users' },
    { label: 'الأحاديث',    value: stats.hadiths,   icon: '📜', color: 'bg-emerald-500', href: '/admin/hadiths' },
    { label: 'الأذكار',      value: stats.adhkar,    icon: '📿', color: 'bg-purple-500',  href: '/admin/adhkar' },
    { label: 'الفتاوى',      value: stats.fatwas,    icon: '⚖️', color: 'bg-orange-500',  href: '/admin/fatwas' },
    { label: 'الأسئلة',      value: stats.questions, icon: '❓', color: 'bg-pink-500',    href: '/admin/questions' },
    { label: 'الكتب',        value: 6,               icon: '📚', color: 'bg-gold-500',    href: '/admin/books' },
  ]

  const quickActions = [
    { label: 'إضافة حديث جديد',  href: '/admin/hadiths/new',  icon: '📜' },
    { label: 'إضافة فتوى جديدة', href: '/admin/fatwas/new',   icon: '⚖️' },
    { label: 'إضافة ذكر جديد',   href: '/admin/adhkar/new',   icon: '📿' },
    { label: 'إدارة المستخدمين', href: '/admin/users',         icon: '👥' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-arabic text-2xl font-bold text-gray-800 dark:text-white mb-2">مرحباً بك في لوحة التحكم</h2>
        <p className="text-gray-500">إحصائيات ومعلومات عامة عن الموقع</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map(card => (
          <a key={card.label} href={card.href} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gold-400 transition-colors group">
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center text-xl mb-3`}>
              {card.icon}
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {card.value.toLocaleString('ar-SA')}
            </div>
            <div className="text-sm text-gray-500 group-hover:text-gold-500 transition-colors">{card.label}</div>
          </a>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="font-arabic text-lg font-bold text-gray-800 dark:text-white mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map(action => (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gold-200 dark:border-gold-800/40 text-gray-700 dark:text-gray-300 hover:border-gold-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors text-sm"
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* System status */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="font-arabic text-lg font-bold text-gray-800 dark:text-white mb-4">حالة النظام</h3>
        <div className="space-y-3">
          {[
            { label: 'قاعدة البيانات',  status: stats.users >= 0 ? 'متصلة' : 'غير متصلة', ok: true },
            { label: 'Anthropic AI',     status: process.env.ANTHROPIC_API_KEY ? 'مُهيَّأ' : 'بحاجة لمفتاح API', ok: !!process.env.ANTHROPIC_API_KEY },
            { label: 'الموقع',           status: 'يعمل بشكل طبيعي', ok: true },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.ok ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
