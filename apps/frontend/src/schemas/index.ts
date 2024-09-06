import { z } from 'zod'
import { zPhoneNumber } from '../utils'

export const phoneSchema = z.object({
  countryCode: z.string(),
  phoneNumber: zPhoneNumber,
})

export const codeSchema = z.object({
  code: z
    .string()
    .min(1, 'String cannot be empty')
    .max(6, 'Number string cannot exceed 6 digits')
    .regex(/^\d+$/, 'Must contain only digits'),
})

export type PhoneFormData = z.infer<typeof phoneSchema>
export type CodeFormData = z.infer<typeof codeSchema>
