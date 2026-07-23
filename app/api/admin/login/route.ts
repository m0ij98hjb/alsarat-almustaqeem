import { NextResponse } from 'next/server'
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
  verifyAdminPassword,
} from '@/lib/admin-auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const password = body?.password

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    path: '/',
  })
  return response
}
