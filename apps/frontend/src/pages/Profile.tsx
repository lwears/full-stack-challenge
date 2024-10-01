import React, { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import { signOut } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { useAuth, useCallableFunctionResponse, useFunctions } from 'reactfire'
import { toast } from 'sonner'

import { Button, Input, Loading } from '../components'
import { profileSchema } from 'validators'

import type { SubmitHandler } from 'react-hook-form'
import type { Profile as ProfileFormData } from 'validators'

interface UpdateProfileResponse {
  message: string
}

export const Profile: React.FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const functions = useFunctions()

  const logout = useCallback(async () => {
    await signOut(auth)
    navigate('/')
  }, [auth, navigate])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  })

  const { status, data } = useCallableFunctionResponse<
    ProfileFormData,
    ProfileFormData
  >('getUserProfile', { suspense: true })

  useEffect(() => {
    if (status === 'success') {
      reset(data)
    }
  }, [data, reset])

  const updateUserProfile: SubmitHandler<ProfileFormData> = useCallback(
    async (data: ProfileFormData) => {
      try {
        const updateProfile = httpsCallable<
          ProfileFormData,
          UpdateProfileResponse
        >(functions, 'updateUserProfile')
        const result = await updateProfile(data)
        toast.success(result.data.message)
      } catch (error) {
        if (error instanceof FirebaseError) {
          toast.error(error.message)
        } else {
          toast.error('An unknown error occurred')
        }
      }
    },
    [],
  )

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <>
      <h2 className="text-naturalcycles-900 text-2xl font-bold">Profile</h2>
      <div className="flex w-4/5 max-w-xs flex-col items-center justify-center md:w-[300px]">
        <form className="w-full" onSubmit={handleSubmit(updateUserProfile)}>
          <Input<ProfileFormData>
            type="text"
            register={register}
            placeholder="Enter name"
            error={errors.name}
            title="Name"
            name="name"
          />
          <Input<ProfileFormData>
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
