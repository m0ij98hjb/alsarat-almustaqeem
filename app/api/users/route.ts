import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ success: true, data: [], total: 0, page: 1, totalPages: 0 })
}
