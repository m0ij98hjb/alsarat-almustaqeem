import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const surahs = await prisma.surah.findMany({ orderBy: { id: 'asc' } })
    return NextResponse.json({ success: true, data: surahs, total: surahs.length })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch surahs' }, { status: 500 })
  }
}
