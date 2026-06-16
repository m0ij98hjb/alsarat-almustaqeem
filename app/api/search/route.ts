import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ success: false, error: 'Query too short' }, { status: 400 })
  }
  return NextResponse.json({ success: true, query: q, data: [], total: 0 })
}
