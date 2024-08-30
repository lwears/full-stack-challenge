import { z } from 'zod'

export const profileSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .trim()
    .min(1, { message: 'name must be minimum 1 character' })
    .max(45)
    .refine((value) => Number.isNaN(Number(value)), {
      message: 'value should not be a number',
    }),
  email: z.string().email(),
})

export type Profile = z.infer<typeof profileSchema>
