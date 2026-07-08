'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function LoginPage() {
  const t = useTranslations('auth')
  const locale = useLocale()
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert(t('loginMsg'))
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-gold-400 mb-6">
            <span className="text-2xl">✦</span>
          </Link>
          <h1 className="font-arabic text-3xl font-bold text-islamic-green dark:text-gold-300 mb-2">{t('loginTitle')}</h1>
          <p className="text-gray-500 text-sm">{t('loginSubtitle')}</p>
        </div>

        <div className="card-islamic p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('email')}</label>
              <input
                type="email"
                required
                className="input-islamic w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('password')}</label>
              <input
                type="password"
                required
                placeholder={t('passwordPlaceholder')}
                className="input-islamic w-full"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 text-base disabled:opacity-60"
            >
              {loading ? t('loggingIn') : t('loginBtn')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {t('noAccount')}{' '}
            <Link href={`/${locale}/auth/register`} className="text-gold-500 hover:text-gold-400 font-medium">
              {t('registerLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
