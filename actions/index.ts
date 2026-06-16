'use server'

import { z } from 'zod'

export async function updateSettings(_formData: FormData) {
  return { success: true }
}

export async function toggleUserActive(_userId: string, _isActive: boolean) {
  return { success: true }
}

export async function addBookmark(_data: {
  type: string; surahId?: number; ayahId?: number; hadithId?: number; dhikrId?: number
}) {
  return { error: 'يجب تسجيل الدخول أولاً' }
}

const questionSchema = z.object({
  title:    z.string().min(10, 'العنوان قصير جداً'),
  body:     z.string().min(20, 'السؤال قصير جداً'),
  category: z.string(),
  tags:     z.array(z.string()).optional(),
})

export async function submitQuestion(_data: z.infer<typeof questionSchema>) {
  return { error: 'يجب تسجيل الدخول أولاً' }
}

export async function incrementFatwaViews(_id: number) {}
