'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Moon, Sun, Search, Menu, X, User, LogOut, Settings, BookOpen } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/utils'

const navLinks = [
  { href: '/quran',         label: 'القرآن الكريم', icon: '📖' },
  { href: '/hadith',        label: 'الأحاديث',      icon: '📜' },
  { href: '/adhkar',        label: 'الأذكار',        icon: '📿' },
  { href: '/prophets',      label: 'الأنبياء',       icon: '🌟' },
  { href: '/seerah',        label: 'السيرة',         icon: '🌙' },
  { href: '/fatawa',        label: 'الفتاوى',        icon: '⚖️' },
  { href: '/asma-allah',    label: 'أسماء الله',     icon: '✨' },
  { href: '/prayer-times',  label: 'مواقيت الصلاة', icon: '🕌' },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-islamic-navy/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-gold-400/20'
          : 'bg-islamic-navy'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-gold-400 text-2xl group-hover:rotate-45 transition-transform duration-500">✦</span>
            <span className="font-arabic text-gold-300 text-xl font-bold hidden sm:block">الصراط المستقيم</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'nav-link text-xs xl:text-sm',
                    pathname?.startsWith(link.href) && 'active'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Link
              href="/search"
              className="p-2 text-gray-300 hover:text-gold-300 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="بحث"
            >
              <Search size={18} />
            </Link>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-300 hover:text-gold-300 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="تغيير الوضع"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center">
                    <User size={16} className="text-gold-300" />
                  </div>
                </button>
                <div className="absolute left-0 top-full mt-2 w-48 bg-islamic-navy-mid border border-gold-400/20 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  <div className="px-4 py-2 border-b border-gold-400/10">
                    <p className="text-white text-sm font-medium">{session.user?.name}</p>
                    <p className="text-gray-400 text-xs">{session.user?.email}</p>
                  </div>
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-gold-300 hover:bg-white/5 text-sm transition-colors">
                    <BookOpen size={14} /> الملف الشخصي
                  </Link>
                  {(session.user as any)?.role === 'ADMIN' && (
                    <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-gold-300 hover:bg-white/5 text-sm transition-colors">
                      <Settings size={14} /> لوحة التحكم
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-red-400/10 text-sm transition-colors"
                  >
                    <LogOut size={14} /> تسجيل الخروج
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="btn-gold text-xs px-3 py-1.5">
                دخول
              </Link>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-gold-300 rounded-lg"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gold-400/20 py-4">
            <ul className="grid grid-cols-2 gap-1">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors',
                      pathname?.startsWith(link.href)
                        ? 'bg-gold-400/10 text-gold-300'
                        : 'text-gray-300 hover:text-gold-300 hover:bg-white/5'
                    )}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
