import { NextRequest, NextResponse } from 'next/server'
import { HADITHS } from '@/data/hadiths'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const topic = searchParams.get('topic')
  const grade = searchParams.get('grade')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  let data = HADITHS
  if (topic) data = data.filter((h) => h.topic === topic)
  if (grade) data = data.filter((h) => h.grade === grade)

  const total = data.length
  data = data.slice((page - 1) * limit, page * limit)

  return NextResponse.json({ success: true, data, total, page, totalPages: Math.ceil(total / limit) })
}

export async function POST() {
  return NextResponse.json({ success: false, error: 'Not implemented' }, { status: 501 })
}
