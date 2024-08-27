import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import { signOut } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth, useCallableFunctionResponse, useFunctions } from 'reactfire'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button, Input, Loading } from '../components'

const schema = z.object({
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

type FormData = z.infer<typeof schema>

interface UpdateProfileResponse {
  message: string
}

export const Profile: React.FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const functions = useFunctions()

  const logout = () => {
    signOut(auth)
    navigate('/')
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onChange' })

  const { status, data } = useCallableFunctionResponse<FormData, FormData>(
    'getUserProfile',
  )

  useEffect(() => {
    reset(data)
  }, [data])

  if (status === 'loading') {
    return <Loading />
  }

  const updateUserProfile = async (data: FormData) => {
    try {
      const updateProfile = httpsCallable<FormData, UpdateProfileResponse>(
        functions,
        'updateUserProfile',
      )
      const result = await updateProfile(data)
      toast.success(result.data.message)
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message)
      } else {
        toast.error('An unknown error occurred')
      }
    }
  }

  return (
    <>
      <h2 className="text-naturalcycles-900 text-2xl font-bold">Profile</h2>
      <div className="flex w-4/5 max-w-xs flex-col items-center justify-center md:w-[300px]">
        <form className="w-full" onSubmit={handleSubmit(updateUserProfile)}>
          <Input<FormData>
            type="text"
            register={register}
            placeholder="Enter name"
            error={errors.name}
            title="Name"
            name="name"
          />
          <Input<FormData>
            type="text"
            register={register}
            placeholder="Enter email"
            error={errors.email}
            title="Email"
            name="email"
          />
          <Button type="submit" content="Save" className="mt-1" />
        </form>
        <Button className="mt-3" content="Logout" onClick={logout} />
      </div>
    </>
  )
}
