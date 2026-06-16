import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login?callbackUrl=/profile')

  const userId = (session.user as any).id
  let stats = { bookmarks: 0, questions: 0, answers: 0 }

  try {
    const [bookmarks, questions, answers] = await Promise.all([
      prisma.bookmark.count({ where: { userId } }),
      prisma.question.count({ where: { authorId: userId } }),
      prisma.answer.count({ where: { authorId: userId } }),
    ])
    stats = { bookmarks, questions, answers }
  } catch {}

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy">
      <div className="bg-hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-gold-400/20 border-2 border-gold-400 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">👤</span>
          </div>
          <h1 className="font-arabic text-white text-3xl font-bold mb-1">{session.user?.name}</h1>
          <p className="text-gray-400">{session.user?.email}</p>
          <span className="inline-block mt-3 text-xs bg-gold-400/20 text-gold-300 border border-gold-400/30 px-3 py-1 rounded-full">
            {(session.user as any)?.role === 'SUPER_ADMIN' ? 'مدير عام' : (session.user as any)?.role === 'ADMIN' ? 'مدير' : 'عضو'}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'المحفوظات', value: stats.bookmarks, icon: '🔖' },
            { label: 'الأسئلة',   value: stats.questions,  icon: '❓' },
            { label: 'الإجابات',  value: stats.answers,    icon: '💬' },
          ].map(s => (
            <div key={s.label} className="card-islamic p-6 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-arabic text-3xl font-bold text-gold-500 mb-1">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Edit profile */}
        <div className="card-islamic p-8">
          <h2 className="font-arabic text-xl font-bold text-islamic-green dark:text-gold-300 mb-6">تعديل الملف الشخصي</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2">الاسم</label>
              <input defaultValue={session.user?.name || ''} className="search-input" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">البريد الإلكتروني</label>
              <input defaultValue={session.user?.email || ''} className="search-input" dir="ltr" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">كلمة المرور الجديدة</label>
              <input type="password" placeholder="اتركه فارغاً إذا لم ترد تغييره" className="search-input" />
            </div>
          </div>
          <button className="btn-gold mt-6 px-8 py-2.5 text-sm">حفظ التغييرات</button>
        </div>

        {/* Quick links */}
        <div className="card-islamic p-6">
          <h2 className="font-arabic text-lg font-bold text-islamic-green dark:text-gold-300 mb-4">روابط سريعة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: '/quran',   icon: '📖', label: 'القرآن' },
              { href: '/adhkar',  icon: '📿', label: 'الأذكار' },
              { href: '/hadith',  icon: '📜', label: 'الحديث' },
              { href: '/search',  icon: '🔍', label: 'البحث' },
            ].map(link => (
              <a key={link.href} href={link.href} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gold-200 dark:border-gold-800/40 hover:border-gold-400 transition-colors group">
                <span className="text-2xl">{link.icon}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gold-500 transition-colors">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
