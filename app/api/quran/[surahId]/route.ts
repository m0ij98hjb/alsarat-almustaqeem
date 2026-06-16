import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ surahId: string }> }) {
  const { surahId } = await params
  return NextResponse.json({ success: false, error: `Use https://api.alquran.cloud/v1/surah/${surahId}/ar.uthmani directly` }, { status: 501 })
}
