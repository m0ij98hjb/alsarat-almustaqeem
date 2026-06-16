'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('كلمتا المرور غير متطابقتين')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'حدث خطأ في إنشاء الحساب')
      } else {
        router.push('/auth/login?registered=1')
      }
    } catch {
      setError('حدث خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="absolute inset-0 pattern-overlay opacity-20" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-gold-400 text-4xl mb-2">✦</div>
          <h1 className="font-arabic text-gold-300 text-3xl font-bold">إنشاء حساب جديد</h1>
        </div>

        <div className="bg-islamic-navy-mid/90 backdrop-blur border border-gold-400/20 rounded-2xl p-8">
          {error && (
            <div className="bg-red-900/30 border border-red-500/30 text-red-400 text-sm p-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name',     label: 'الاسم',            type: 'text',     placeholder: 'اسمك الكريم' },
              { key: 'email',    label: 'البريد الإلكتروني', type: 'email',    placeholder: 'example@email.com' },
              { key: 'password', label: 'كلمة المرور',       type: 'password', placeholder: '8 أحرف على الأقل' },
              { key: 'confirm',  label: 'تأكيد كلمة المرور', type: 'password', placeholder: 'أعد كتابة كلمة المرور' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm text-gray-300 mb-2 text-right">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  required
                  placeholder={field.placeholder}
                  className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-400 text-sm"
                  dir={field.key === 'email' ? 'ltr' : 'rtl'}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'جارٍ الإنشاء...' : 'إنشاء الحساب'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/login" className="text-gold-400 hover:text-gold-300 transition-colors">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
