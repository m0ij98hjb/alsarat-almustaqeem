import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ success: false, error: 'Use https://api.alquran.cloud/v1/surah directly' }, { status: 501 })
}
