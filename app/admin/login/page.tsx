'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (!res.ok) {
      setError('كلمة المرور غير صحيحة')
      return
    }

    router.push(searchParams.get('callbackUrl') || '/admin')
    router.refresh()
  }

  return (
    <div className="bg-islamic-navy-mid/90 backdrop-blur border border-gold-400/20 rounded-2xl p-8">
      {error && (
        <div className="bg-red-900/30 border border-red-500/30 text-red-400 text-sm p-3 rounded-xl mb-6 text-center font-arabic">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-300 mb-2 text-right">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoFocus
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
          {loading ? 'جارٍ الدخول...' : 'دخول'}
        </button>
      </form>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="absolute inset-0 pattern-overlay opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-gold-400 text-4xl mb-2">✦</div>
          <h1 className="font-arabic text-gold-300 text-3xl font-bold">الصراط المستقيم</h1>
          <p className="text-gray-400 text-sm mt-1">لوحة تحكم الإدارة</p>
        </div>

        <Suspense fallback={<div className="bg-islamic-navy-mid/90 backdrop-blur border border-gold-400/20 rounded-2xl p-8 text-center text-gray-400">جارٍ التحميل...</div>}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  )
}
