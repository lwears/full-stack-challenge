import clsx from 'clsx'
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import type { CountryCodeData } from '../constants'
import { countryCodesData } from '../constants'
import { CountryDropdown } from './CountryDropdown'

interface PhoneInputProps {
  onChange: (value: string) => void
  value?: string
  error?: { message?: string }
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onChange, error }) => {
  const [countryCode, setCountryCode] = useState<CountryCodeData>(
    countryCodesData.US,
  )
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const handleCountryCodeChange = (countryCodeData: CountryCodeData) => {
    setCountryCode(countryCodeData)
    onChange(`${countryCodeData.phoneCode}${phoneNumber}`)
  }

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value.replaceAll(/\D/g, '')
    setPhoneNumber(newPhoneNumber)
    onChange(`${countryCode.phoneCode}${newPhoneNumber}`)
  }

  return (
    <div className="w-full">
      <div className="join flex w-full relative ">
        <CountryDropdown
          selectedCountry={countryCode}
          onSelectCountry={handleCountryCodeChange}
        />
        <input
          type="tel"
          className="input join-item w-12 input-bordered border-r-0 border-naturalcycles-900 focus:border-naturalcycles-900 focus:outline-none p-0 text-center text-gray-500"
          value={countryCode.phoneCode}
          readOnly
        />
        <input
          type="tel"
          placeholder="Phone number"
          className={clsx(
            'input join-item input-bordered border-l-0 w-full border-naturalcycles-900 focus:border-naturalcycles-900 focus:outline-none p-0',
            error && 'input-error',
          )}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div className="label h-6 py-0">
        {error && (
          <span className="label-text-alt text-red-700">{error.message}</span>
        )}
      </div>
    </div>
  )
}

export default PhoneInput
