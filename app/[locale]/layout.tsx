import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { buildAlternates, absoluteUrl } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    title: {
      default: t('siteName'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('siteDesc'),
    alternates: buildAlternates(locale),
    openGraph: {
      type: 'website',
      locale: locale,
      url: absoluteUrl(`/${locale}`),
      siteName: t('siteName'),
      title: t('siteName'),
      description: t('siteDesc'),
      images: [{ url: absoluteUrl('/images/og.png'), width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('siteName'),
      description: t('siteDesc'),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
