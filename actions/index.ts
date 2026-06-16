'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Update site settings
export async function updateSettings(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!['ADMIN', 'SUPER_ADMIN'].includes((session?.user as any)?.role)) {
    return { error: 'Unauthorized' }
  }

  const pairs = Object.fromEntries(formData.entries())
  try {
    await Promise.all(
      Object.entries(pairs).map(([key, value]) =>
        prisma.siteSettings.upsert({
          where: { key },
          update: { value: value as string },
          create: { key, value: value as string },
        })
      )
    )
    revalidatePath('/admin/settings')
    return { success: true }
  } catch {
    return { error: 'Failed to update settings' }
  }
}

// Toggle user active status
export async function toggleUserActive(userId: string, isActive: boolean) {
  const session = await getServerSession(authOptions)
  if (!['ADMIN', 'SUPER_ADMIN'].includes((session?.user as any)?.role)) {
    return { error: 'Unauthorized' }
  }
  await prisma.user.update({ where: { id: userId }, data: { isActive } })
  revalidatePath('/admin/users')
  return { success: true }
}

// Add bookmark
export async function addBookmark(data: {
  type: string; surahId?: number; ayahId?: number; hadithId?: number; dhikrId?: number
}) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: 'Login required' }

  try {
    const bookmark = await prisma.bookmark.create({
      data: { userId: (session.user as any).id, ...data },
    })
    return { success: true, data: bookmark }
  } catch {
    return { error: 'Failed to add bookmark' }
  }
}

// Submit question
const questionSchema = z.object({
  title:    z.string().min(10, 'العنوان قصير جداً'),
  body:     z.string().min(20, 'السؤال قصير جداً'),
  category: z.string(),
  tags:     z.array(z.string()).optional(),
})

export async function submitQuestion(data: z.infer<typeof questionSchema>) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: 'يجب تسجيل الدخول أولاً' }

  try {
    const validated = questionSchema.parse(data)
    const question = await prisma.question.create({
      data: { ...validated, tags: validated.tags || [], authorId: (session.user as any).id },
    })
    revalidatePath('/questions')
    return { success: true, data: question }
  } catch (e: any) {
    if (e.errors) return { error: e.errors[0]?.message }
    return { error: 'حدث خطأ في الإرسال' }
  }
}

// Increment fatwa views
export async function incrementFatwaViews(id: number) {
  await prisma.fatwa.update({ where: { id }, data: { views: { increment: 1 } } }).catch(() => {})
}
