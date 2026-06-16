import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q    = searchParams.get('q')?.trim()
  const type = searchParams.get('type') || 'all' // all | ayah | hadith | dhikr | fatwa
  const page = parseInt(searchParams.get('page') || '1')

  if (!q || q.length < 2) {
    return NextResponse.json({ success: false, error: 'Query too short' }, { status: 400 })
  }

  const results: any[] = []

  try {
    if (type === 'all' || type === 'ayah') {
      const ayahs = await prisma.ayah.findMany({
        where: { OR: [{ textArabic: { contains: q } }, { textUthmani: { contains: q } }] },
        include: { surah: { select: { nameArabic: true } } },
        take: 10,
      })
      ayahs.forEach(a => results.push({
        id: `ayah-${a.id}`,
        type: 'ayah',
        title: `سورة ${(a as any).surah?.nameArabic} — الآية ${a.numberInSurah}`,
        text: a.textUthmani,
        reference: `${a.surahId}:${a.numberInSurah}`,
        url: `/quran/${a.surahId}/${a.numberInSurah}`,
      }))
    }

    if (type === 'all' || type === 'hadith') {
      const hadiths = await prisma.hadith.findMany({
        where: { textArabic: { contains: q } },
        include: { book: { select: { nameArabic: true, slug: true } } },
        take: 10,
      })
      hadiths.forEach(h => results.push({
        id: `hadith-${h.id}`,
        type: 'hadith',
        title: `${(h as any).book?.nameArabic} — حديث #${h.hadithNum}`,
        text: h.textArabic,
        reference: h.narrator,
        url: `/hadith/${(h as any).book?.slug}/${h.id}`,
      }))
    }

    if (type === 'all' || type === 'dhikr') {
      const adhkar = await prisma.dhikr.findMany({
        where: { textArabic: { contains: q } },
        take: 5,
      })
      adhkar.forEach(d => results.push({
        id: `dhikr-${d.id}`,
        type: 'dhikr',
        title: `ذكر — ${d.category}`,
        text: d.textArabic,
        reference: d.source || '',
        url: '/adhkar',
      }))
    }

    if (type === 'all' || type === 'fatwa') {
      const fatwas = await prisma.fatwa.findMany({
        where: { OR: [{ question: { contains: q } }, { answer: { contains: q } }] },
        take: 5,
      })
      fatwas.forEach(f => results.push({
        id: `fatwa-${f.id}`,
        type: 'fatwa',
        title: f.question.substring(0, 80),
        text: f.answer.substring(0, 200),
        reference: f.scholar || '',
        url: `/fatawa/${f.id}`,
      }))
    }

    return NextResponse.json({
      success: true,
      query: q,
      data: results,
      total: results.length,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Search failed' }, { status: 500 })
  }
}
