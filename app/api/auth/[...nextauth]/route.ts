import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function handleAuth(req: NextRequest, ctx: unknown) {
  try {
    const { default: NextAuth } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth')
    const handler = NextAuth(authOptions)
    return (handler as (r: NextRequest, c: unknown) => Promise<Response>)(req, ctx)
  } catch (error) {
    console.error('[NextAuth] initialization error:', error)
    return NextResponse.json(
      { error: 'Authentication service unavailable' },
      { status: 503 }
    )
  }
}

export async function GET(req: NextRequest, ctx: unknown) {
  return handleAuth(req, ctx)
}

export async function POST(req: NextRequest, ctx: unknown) {
  return handleAuth(req, ctx)
}
