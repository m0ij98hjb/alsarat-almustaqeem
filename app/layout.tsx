import type { Metadata } from 'next'
import { Amiri, Noto_Naskh_Arabic, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { Toaster } from 'sonner'
import './globals.css'

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'الصراط المستقيم — منصة إسلامية شاملة',
    template: '%s | الصراط المستقيم',
  },
  description: 'منصة إسلامية شاملة تضم القرآن الكريم بتفسيره، والأحاديث النبوية الصحيحة، والأذكار، وقصص الأنبياء، والسيرة النبوية',
  keywords: ['القرآن الكريم', 'الأحاديث النبوية', 'الإسلام', 'الأذكار', 'الأدعية', 'قصص الأنبياء', 'السيرة النبوية'],
  authors: [{ name: 'الصراط المستقيم' }],
  creator: 'الصراط المستقيم',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: '/',
    siteName: 'الصراط المستقيم',
    title: 'الصراط المستقيم — منصة إسلامية شاملة',
    description: 'منصة إسلامية شاملة تضم القرآن الكريم بتفسيره والأحاديث النبوية والأذكار وقصص الأنبياء',
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: 'الصراط المستقيم' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الصراط المستقيم',
    description: 'منصة إسلامية شاملة للقرآن والسنة النبوية',
    images: ['/images/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${amiri.variable} ${notoNaskh.variable} ${inter.variable} font-naskh antialiased`}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
