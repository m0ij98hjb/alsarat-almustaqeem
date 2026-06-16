import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role)) {
    redirect('/auth/login?callbackUrl=/admin')
  }

  const navItems = [
    { href: '/admin',            label: 'لوحة التحكم', icon: '📊' },
    { href: '/admin/users',      label: 'المستخدمون',   icon: '👥' },
    { href: '/admin/content',    label: 'المحتوى',       icon: '📝' },
    { href: '/admin/hadiths',    label: 'الأحاديث',      icon: '📜' },
    { href: '/admin/adhkar',     label: 'الأذكار',        icon: '📿' },
    { href: '/admin/fatwas',     label: 'الفتاوى',        icon: '⚖️' },
    { href: '/admin/analytics',  label: 'الإحصائيات',    icon: '📈' },
    { href: '/admin/settings',   label: 'الإعدادات',     icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-islamic-navy border-l border-gold-400/20 flex flex-col">
        <div className="p-6 border-b border-gold-400/20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-gold-400 text-xl">✦</span>
            <span className="font-arabic text-gold-300 font-bold">لوحة التحكم</span>
          </Link>
          <p className="text-gray-500 text-xs mt-1">{session.user?.name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-gold-300 hover:bg-white/5 transition-colors text-sm"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gold-400/20">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold-300 text-sm transition-colors">
            <span>←</span>
            <span>العودة للموقع</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex items-center justify-between">
          <h1 className="font-arabic text-xl font-bold text-gray-800 dark:text-white">إدارة الصراط المستقيم</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{new Date().toLocaleDateString('ar-SA')}</span>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
