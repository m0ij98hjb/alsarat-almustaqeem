'use client'

import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      setLoading(false)
    } else {
      router.push(callbackUrl)
    }
  }

  return (
    <div className="bg-islamic-navy-mid/90 backdrop-blur border border-gold-400/20 rounded-2xl p-8">
      {error && (
        <div className="bg-red-900/30 border border-red-500/30 text-red-400 text-sm p-3 rounded-xl mb-6 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-300 mb-2 text-right">البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="example@email.com"
            className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400 text-sm"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2 text-right">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? 'جارٍ الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          ليس لديك حساب؟{' '}
          <Link href="/auth/register" className="text-gold-400 hover:text-gold-300 transition-colors">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="absolute inset-0 pattern-overlay opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-gold-400 text-4xl mb-2">✦</div>
          <h1 className="font-arabic text-gold-300 text-3xl font-bold">الصراط المستقيم</h1>
          <p className="text-gray-400 text-sm mt-1">تسجيل الدخول إلى حسابك</p>
        </div>

        <Suspense fallback={<div className="bg-islamic-navy-mid/90 backdrop-blur border border-gold-400/20 rounded-2xl p-8 text-center text-gray-400">جارٍ التحميل...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
