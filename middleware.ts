import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
})

export const config = {
  // Match all paths except api, _next internals, admin, and static files
  matcher: ['/((?!api|_next|_vercel|admin|images|icons|fonts|.*\\..*).*)'],
}
