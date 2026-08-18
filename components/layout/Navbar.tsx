'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Moon,
  Sun,
  Search,
  Menu,
  X,
  ChevronDown,
  Home,
  BookOpen,
  ScrollText,
  Radio,
  Baby,
  Clock3,
  Library,
  Video,
  Users,
  Repeat,
  Star,
  History,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/utils'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

type NavItem = { href: string; label: string; icon: LucideIcon; exact?: boolean }

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const libraryRef = useRef<HTMLLIElement>(null)
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const locale = useLocale()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (libraryRef.current && !libraryRef.current.contains(e.target as Node)) {
        setLibraryOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setLibraryOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const directItems: NavItem[] = [
    { href: `/${locale}`,              label: t('home'),        icon: Home, exact: true },
    { href: `/${locale}/quran`,        label: t('quran'),       icon: BookOpen },
    { href: `/${locale}/hadith`,       label: t('hadith'),      icon: ScrollText },
    { href: `/${locale}/live`,         label: t('live'), icon: Radio },
    { href: `/${locale}/kids`,         label: t('kids'), icon: Baby },
    { href: `/${locale}/prayer-times`, label: t('prayerTimes'), icon: Clock3 },
  ]

  const libraryItems: NavItem[] = [
    { href: `/${locale}/islamic-videos`, label: t('islamicVideos'), icon: Video },
    { href: `/${locale}/scholars`,       label: t('scholars'), icon: Users },
    { href: `/${locale}/adhkar`,         label: t('adhkar'),      icon: Repeat },
    { href: `/${locale}/prophets`,       label: t('prophets'),    icon: Star },
    { href: `/${locale}/seerah`,         label: t('seerah'),      icon: History },
    { href: `/${locale}/asma-allah`,     label: t('asmaAllah'),   icon: Sparkles },
  ]

  const libraryLabel = t('library')

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname?.startsWith(item.href) && pathname !== `/${locale}`
  const isLibraryActive = libraryItems.some((item) => isActive(item))

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'bg-islamic-navy/95 backdrop-blur-md shadow-lg shadow-black/20 border-gold-400/20'
          : 'bg-islamic-navy border-gold-400/10'
      )}
    >
      <div className="absolute inset-0 pattern-overlay opacity-[0.04] pointer-events-none" />

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center group">
            <Image
              src="/images/Logo.png"
              alt={tCommon('siteName')}
              width={80}
              height={80}
              priority
              className="w-16 h-16 sm:w-[72px] sm:h-[72px] transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-2 xl:gap-3">
            {directItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'nav-link inline-flex items-center gap-1.5 text-sm',
                    isActive(item) && 'active'
                  )}
                >
                  <item.icon size={15} className="opacity-70" />
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Library dropdown */}
            <li ref={libraryRef} className="relative">
              <button
                onClick={() => setLibraryOpen((v) => !v)}
                className={cn(
                  'nav-link inline-flex items-center gap-1.5 text-sm',
                  (isLibraryActive || libraryOpen) && 'active'
                )}
                aria-expanded={libraryOpen}
              >
                <Library size={15} className="opacity-70" />
                {libraryLabel}
                <ChevronDown
                  size={14}
                  className={cn('opacity-60 transition-transform duration-200', libraryOpen && 'rotate-180')}
                />
              </button>

              <div
                className={cn(
                  'absolute end-0 top-full mt-2 w-80 rounded-2xl border border-gold-400/20 bg-islamic-navy shadow-xl shadow-black/30 p-3 transition-all duration-200 origin-top',
                  libraryOpen
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                )}
              >
                <div className="grid grid-cols-2 gap-1.5">
                  {libraryItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setLibraryOpen(false)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors',
                        isActive(item)
                          ? 'bg-gold-400/15 text-gold-300'
                          : 'text-gray-300 hover:text-gold-300 hover:bg-white/5'
                      )}
                    >
                      <item.icon size={16} className="shrink-0 opacity-70" />
                      <span className="leading-tight">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <LanguageSwitcher />

            <Link
              href={`/${locale}/search`}
              className="p-2.5 rounded-xl text-gray-300 border border-transparent hover:text-gold-300 hover:bg-white/5 hover:border-gold-400/20 transition-colors"
              aria-label={t('search')}
            >
              <Search size={18} />
            </Link>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl text-gray-300 border border-transparent hover:text-gold-300 hover:bg-white/5 hover:border-gold-400/20 transition-colors"
              aria-label={t('toggleTheme')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-300 border border-transparent hover:text-gold-300 hover:bg-white/5 hover:border-gold-400/20 transition-colors"
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gold-400/20 py-4 space-y-5">
            <div>
              <p className="px-3 mb-2 text-xs font-semibold text-gold-400/70 tracking-wide">
                {t('mainSection')}
              </p>
              <ul className="space-y-1">
                {directItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        isActive(item)
                          ? 'bg-gold-400/10 text-gold-300'
                          : 'text-gray-200 hover:text-gold-300 hover:bg-white/5'
                      )}
                    >
                      <item.icon size={17} className="opacity-70" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="px-3 mb-2 text-xs font-semibold text-gold-400/70 tracking-wide">{libraryLabel}</p>
              <ul className="space-y-1">
                {libraryItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        isActive(item)
                          ? 'bg-gold-400/10 text-gold-300'
                          : 'text-gray-200 hover:text-gold-300 hover:bg-white/5'
                      )}
                    >
                      <item.icon size={17} className="opacity-70" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
