import * as z from 'zod'
import parsePhoneNumber from 'libphonenumber-js'

//https://github.com/colinhacks/zod/issues/3378

export const zPhoneNumber = z.string().transform((value, ctx) => {
  const phoneNumber = parsePhoneNumber(value, {
    defaultCountry: 'FI',
  })

  if (!phoneNumber?.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number',
    })
    return z.NEVER
  }

  return phoneNumber.formatInternational()
})
