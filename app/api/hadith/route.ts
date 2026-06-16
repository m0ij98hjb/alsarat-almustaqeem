import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page  = parseInt(searchParams.get('page')  || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const book  = searchParams.get('book')
  const grade = searchParams.get('grade')

  const where: any = {}
  if (book) {
    const bookRecord = await prisma.hadithBook.findUnique({ where: { slug: book } })
    if (bookRecord) where.bookId = bookRecord.id
  }
  if (grade) where.grade = grade

  try {
    const [hadiths, total] = await Promise.all([
      prisma.hadith.findMany({
        where,
        include: { book: true, chapter: true },
        orderBy: { hadithNum: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.hadith.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: hadiths,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const hadith = await prisma.hadith.create({ data: body })
    return NextResponse.json({ success: true, data: hadith }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create' }, { status: 500 })
  }
}
