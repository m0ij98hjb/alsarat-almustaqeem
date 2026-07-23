import crypto from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE_NAME = 'admin_session'
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000
export const ADMIN_SESSION_MAX_AGE_SECONDS = SESSION_DURATION_MS / 1000

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set')
  return secret
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

export function createAdminSessionToken(): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS
  return `${expiresAt}.${sign(String(expiresAt))}`
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false
  const [expiresAtStr, signature] = token.split('.')
  if (!expiresAtStr || !signature) return false

  const expiresAt = Number(expiresAtStr)
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false

  return timingSafeEqualStrings(signature, sign(expiresAtStr))
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || typeof password !== 'string' || !password) return false
  return timingSafeEqualStrings(password, expected)
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value)
}
