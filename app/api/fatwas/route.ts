import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  question: z.string().min(10),
  answer:   z.string().min(20),
  category: z.string(),
  scholar:  z.string().optional(),
  source:   z.string().optional(),
  tags:     z.array(z.string()).optional(),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page     = parseInt(searchParams.get('page')     || '1')
  const limit    = parseInt(searchParams.get('limit')    || '12')
  const category = searchParams.get('category')
  const verified = searchParams.get('verified')

  const where: any = {}
  if (category) where.category = category
  if (verified)  where.isVerified = verified === 'true'

  try {
    const [fatwas, total] = await Promise.all([
      prisma.fatwa.findMany({
        where,
        orderBy: { views: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { author: { select: { name: true } } },
      }),
      prisma.fatwa.count({ where }),
    ])
    return NextResponse.json({ success: true, data: fatwas, total, page, totalPages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = schema.parse(await req.json())
    const fatwa = await prisma.fatwa.create({
      data: { ...body, authorId: (session.user as any).id, tags: body.tags || [] },
    })
    return NextResponse.json({ success: true, data: fatwa }, { status: 201 })
  } catch (e: any) {
    if (e.errors) return NextResponse.json({ error: e.errors[0]?.message }, { status: 400 })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
