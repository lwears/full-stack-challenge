import { z } from 'zod'
import { zPhoneNumber } from '../utils'

export const profileSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .toLowerCase()
    .trim()
    .min(1, { message: 'name must be minimum 1 character' })
    .max(45)
    .refine((value) => Number.isNaN(Number(value)), {
      message: 'value should not be a number',
    }),
  email: z.string().email(),
})

export const phoneSchema = z.object({
  phoneNumber: zPhoneNumber,
})

export const codeSchema = z.object({
  code: z
    .string()
    .min(1, 'String cannot be empty')
    .max(6, 'Number string cannot exceed 6 digits')
    .regex(/^\d+$/, 'Must contain only digits'),
})

export type ProfileFormData = z.infer<typeof profileSchema>
export type PhoneFormData = z.infer<typeof phoneSchema>
export type CodeFormData = z.infer<typeof codeSchema>
