import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ surahId: string }> }) {
  const { surahId } = await params
  const id = parseInt(surahId)
  if (isNaN(id) || id < 1 || id > 114)
    return NextResponse.json({ success: false, error: 'Invalid surah ID' }, { status: 400 })

  try {
    const surah = await prisma.surah.findUnique({
      where: { id },
      include: { ayahs: { orderBy: { numberInSurah: 'asc' } } },
    })
    if (!surah) return NextResponse.json({ success: false, error: 'Surah not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: surah })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
