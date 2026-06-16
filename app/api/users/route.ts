import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page  = parseInt(searchParams.get('page')  || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const q     = searchParams.get('q')

  const where: any = {}
  if (q) where.OR = [{ name: { contains: q } }, { email: { contains: q } }]

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ])
    return NextResponse.json({ success: true, data: users, total, page, totalPages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
