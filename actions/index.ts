'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Update site settings
export async function updateSettings(formData: FormData) {
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
  await prisma.user.update({ where: { id: userId }, data: { isActive } })
  revalidatePath('/admin/users')
  return { success: true }
}

// Add bookmark
export async function addBookmark(_data: {
  type: string; surahId?: number; ayahId?: number; hadithId?: number; dhikrId?: number
}) {
  return { error: 'يجب تسجيل الدخول أولاً' }
}

// Submit question
const questionSchema = z.object({
  title:    z.string().min(10, 'العنوان قصير جداً'),
  body:     z.string().min(20, 'السؤال قصير جداً'),
  category: z.string(),
  tags:     z.array(z.string()).optional(),
})

export async function submitQuestion(_data: z.infer<typeof questionSchema>) {
  return { error: 'يجب تسجيل الدخول أولاً' }
}

// Increment fatwa views
export async function incrementFatwaViews(id: number) {
  await prisma.fatwa.update({ where: { id }, data: { views: { increment: 1 } } }).catch(() => {})
}
