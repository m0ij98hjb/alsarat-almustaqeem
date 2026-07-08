'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function RegisterPage() {
  const t = useTranslations('auth')
  const locale = useLocale()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const pw = (form.elements.namedItem('password') as HTMLInputElement).value
    const pw2 = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value
    if (pw !== pw2) { setError(t('passwordMismatch')); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert(t('registerError'))
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-gold-400 mb-6">
            <span className="text-2xl">✦</span>
          </Link>
          <h1 className="font-arabic text-3xl font-bold text-islamic-green dark:text-gold-300 mb-2">{t('registerTitle')}</h1>
        </div>

        <div className="card-islamic p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('name')}</label>
              <input name="name" type="text" required placeholder={t('namePlaceholder')} className="input-islamic w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('email')}</label>
              <input name="email" type="email" required className="input-islamic w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('password')}</label>
              <input name="password" type="password" required placeholder={t('passwordPlaceholder')} className="input-islamic w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('confirmPassword')}</label>
              <input name="confirmPassword" type="password" required placeholder={t('confirmPlaceholder')} className="input-islamic w-full" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-gold w-full py-3 text-base disabled:opacity-60">
              {loading ? t('registering') : t('registerBtn')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {t('hasAccount')}{' '}
            <Link href={`/${locale}/auth/login`} className="text-gold-500 hover:text-gold-400 font-medium">
              {t('loginLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
