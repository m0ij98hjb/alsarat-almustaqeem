import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'الملف الشخصي',
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-islamic-navy flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="font-arabic text-3xl font-bold text-islamic-green dark:text-gold-300 mb-3">
          الملف الشخصي
        </h1>
        <p className="font-arabic text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          نظام تسجيل الدخول قيد التطوير، سيكون متاحاً قريباً بإذن الله
        </p>
        <Link href="/" className="btn-gold px-8 py-3 inline-block">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  )
}
