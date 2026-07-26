import { NextRequest, NextResponse } from 'next/server'
import { FATAWA as SAMPLE_FATWAS } from '@/data/fatawa'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const page     = parseInt(searchParams.get('page')  || '1')
  const limit    = parseInt(searchParams.get('limit') || '12')

  let data = category ? SAMPLE_FATWAS.filter(f => f.category === category) : SAMPLE_FATWAS
  const total = data.length
  data = data.slice((page - 1) * limit, page * limit)

  return NextResponse.json({ success: true, data, total, page, totalPages: Math.ceil(total / limit) })
}

export async function POST(_req: NextRequest) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
