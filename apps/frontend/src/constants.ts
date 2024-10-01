export interface CountryCodeData {
  name: string
  phoneCode: string
  code: string
}

export type CountryCode =
  | 'AF'
  | 'AL'
  | 'DZ'
  | 'AR'
  | 'AU'
  | 'BR'
  | 'CA'
  | 'CN'
  | 'FR'
  | 'DE'
  | 'IN'
  | 'IT'
  | 'JP'
  | 'MX'
  | 'NL'
  | 'RU'
  | 'ES'
  | 'SE'
  | 'GB'
  | 'US'

export const countryCodesData: Record<CountryCode, CountryCodeData> = {
  AF: { name: 'Afghanistan', code: 'AF', phoneCode: '+93' },
  AL: { name: 'Albania', code: 'AL', phoneCode: '+355' },
  DZ: { name: 'Algeria', code: 'DZ', phoneCode: '+213' },
  AR: { name: 'Argentina', code: 'AR', phoneCode: '+54' },
  AU: { name: 'Australia', code: 'AU', phoneCode: '+61' },
  BR: { name: 'Brazil', code: 'BR', phoneCode: '+55' },
  CA: { name: 'Canada', code: 'CA', phoneCode: '+1' },
  CN: { name: 'China', code: 'CN', phoneCode: '+86' },
  FR: { name: 'France', code: 'FR', phoneCode: '+33' },
  DE: { name: 'Germany', code: 'DE', phoneCode: '+49' },
  IN: { name: 'India', code: 'IN', phoneCode: '+91' },
  IT: { name: 'Italy', code: 'IT', phoneCode: '+39' },
  JP: { name: 'Japan', code: 'JP', phoneCode: '+81' },
  MX: { name: 'Mexico', code: 'MX', phoneCode: '+52' },
  NL: { name: 'Netherlands', code: 'NL', phoneCode: '+31' },
  RU: { name: 'Russia', code: 'RU', phoneCode: '+7' },
  ES: { name: 'Spain', code: 'ES', phoneCode: '+34' },
  SE: { name: 'Sweden', code: 'SE', phoneCode: '+46' },
  GB: { name: 'United Kingdom', code: 'GB', phoneCode: '+44' },
  US: { name: 'United States', code: 'US', phoneCode: '+1' },
}
