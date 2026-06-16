import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function isAdmin(session: any) {
  return session && ['ADMIN', 'SUPER_ADMIN'].includes(session.user?.role)
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!await isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

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
