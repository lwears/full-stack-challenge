import { zodResolver } from '@hookform/resolvers/zod'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'reactfire'
import { toast } from 'sonner'

import { Button, Input } from '../components'
import { codeSchema, phoneSchema } from '../schemas'

import type { ConfirmationResult } from 'firebase/auth'
import type { CodeFormData, PhoneFormData } from '../schemas'

export const Login: React.FC = () => {
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null)

  const navigate = useNavigate()
  const auth = useAuth()

  const {
    register: registerPhoneInput,
    handleSubmit: handleSubmitPhoneNumber,
    formState: { errors: phoneErrors, isSubmitted },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    mode: 'onChange',
  })

  const {
    register: registerCodeInput,
    handleSubmit: handleSubmitCode,
    formState: { errors: codeErrors },
  } = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    mode: 'onChange',
  })

  const sendVerificationCode = ({ phoneNumber }: PhoneFormData) => {
    const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    })

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((result) => {
        setConfirmationResult(result)
        toast.success('Verification code sent!')
      })
      .catch((error) => {
        toast.error('Error sending verification code:', { description: error })
      })
  }

  const verifyCode = ({ code }: CodeFormData) => {
    if (confirmationResult) {
      confirmationResult
        .confirm(code)
        .then(() => {
          toast.success('Phone number verified!')
          navigate('/profile')
        })
        .catch((error) => {
          toast.error('Error verifying code:', { description: error.message })
        })
    }
  }

  return (
    <>
      <h2 className="text-naturalcycles-900 text-2xl font-bold">Login</h2>
      <div className="flex w-4/5 max-w-xs flex-col items-center justify-center gap-2 md:w-[300px]">
        <form className="w-full">
          <Input<PhoneFormData>
            type="tel"
            register={registerPhoneInput}
            placeholder="Enter phone number"
            error={phoneErrors.phoneNumber}
            title="Phone Number"
            name="phoneNumber"
          />

          <Button
            type="submit"
            content="Send Code"
            onClick={handleSubmitPhoneNumber(sendVerificationCode)}
          />
        </form>
        <form className="w-full">
          <Input<CodeFormData>
            type="text"
            register={registerCodeInput}
            placeholder="Enter verification code"
            error={codeErrors.code}
            title="Verification Code"
            name="code"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmitCode(verifyCode)()
              }
            }}
          />
          <Button
            type="submit"
            content="Verify Code"
            onClick={handleSubmitCode(verifyCode)}
            disabled={!isSubmitted}
          />
          <div id="recaptcha-container"></div>
        </form>
      </div>
    </>
  )
}
