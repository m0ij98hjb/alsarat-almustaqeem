import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

const VISITOR_COOKIE_NAME = 'prayer_visitor_id'
const VISITOR_COOKIE_MAX_AGE_SECONDS = 5 * 365 * 24 * 60 * 60

const DEFAULT_LOCATION = { mode: 'city' as const, city: 'Jeddah', country: 'SA' }

function setVisitorCookie(response: NextResponse, visitorId: string) {
  response.cookies.set(VISITOR_COOKIE_NAME, visitorId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: VISITOR_COOKIE_MAX_AGE_SECONDS,
    path: '/',
  })
}

export async function GET() {
  const cookieStore = await cookies()
  const visitorId = cookieStore.get(VISITOR_COOKIE_NAME)?.value

  if (!visitorId) {
    return NextResponse.json({ location: DEFAULT_LOCATION })
  }

  const saved = await prisma.prayerLocationPreference.findUnique({ where: { visitorId } })
  if (!saved) {
    return NextResponse.json({ location: DEFAULT_LOCATION })
  }

  if (saved.mode === 'coords' && saved.lat != null && saved.lng != null) {
    return NextResponse.json({ location: { mode: 'coords', lat: saved.lat, lng: saved.lng } })
  }
  if (saved.mode === 'city' && saved.city && saved.country) {
    return NextResponse.json({ location: { mode: 'city', city: saved.city, country: saved.country } })
  }
  return NextResponse.json({ location: DEFAULT_LOCATION })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)

  let data: { mode: 'city' | 'coords'; city?: string; country?: string; lat?: number; lng?: number }
  if (body?.mode === 'coords' && typeof body.lat === 'number' && typeof body.lng === 'number') {
    data = { mode: 'coords', lat: body.lat, lng: body.lng }
  } else if (body?.mode === 'city' && typeof body.city === 'string' && typeof body.country === 'string') {
    data = { mode: 'city', city: body.city, country: body.country }
  } else {
    return NextResponse.json({ error: 'Invalid location payload' }, { status: 400 })
  }

  const cookieStore = await cookies()
  const visitorId = cookieStore.get(VISITOR_COOKIE_NAME)?.value ?? crypto.randomUUID()

  await prisma.prayerLocationPreference.upsert({
    where: { visitorId },
    create: {
      visitorId,
      mode: data.mode,
      city: data.mode === 'city' ? data.city : null,
      country: data.mode === 'city' ? data.country : null,
      lat: data.mode === 'coords' ? data.lat : null,
      lng: data.mode === 'coords' ? data.lng : null,
    },
    update: {
      mode: data.mode,
      city: data.mode === 'city' ? data.city : null,
      country: data.mode === 'city' ? data.country : null,
      lat: data.mode === 'coords' ? data.lat : null,
      lng: data.mode === 'coords' ? data.lng : null,
    },
  })

  const response = NextResponse.json({ success: true })
  setVisitorCookie(response, visitorId)
  return response
}
