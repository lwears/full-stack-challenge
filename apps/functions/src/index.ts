import admin from 'firebase-admin'
import functions from 'firebase-functions'
import v1 from 'firebase-functions/v1'

import { profileSchema } from '@shared/schemas'
// import { profileSchema } from '../../../packages/shared/schemas'

admin.initializeApp()

const assertAuthenticated = (
  request: functions.https.CallableRequest,
): void => {
  if (!request.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The request does not have valid authentication credentials.',
    )
  }
}

const handleError = (message: string, error: unknown): never => {
  console.error(message, error)
  throw new functions.https.HttpsError('internal', message, error)
}

export const createUserProfile = v1.auth.user().onCreate(async (user) => {
  const { email, phoneNumber, displayName } = user

  const userData = {
    email: email ?? null,
    name: displayName ?? null,
  }

  try {
    await admin.firestore().collection('users').doc(phoneNumber!).set(userData)
  } catch (error) {
    return handleError(
      'An error occurred while creating the user profile',
      error,
    )
  }
})

export const updateUserProfile = functions.https.onCall(
  async (request: functions.https.CallableRequest) => {
    assertAuthenticated(request)

    // I can assert not undefined because we know that is the only login method
    const phoneNumber = request.auth?.token.phone_number

    const parsedData = profileSchema.safeParse(request.data)

    if (!parsedData.success) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Invalid input data',
        parsedData.error.format(),
      )
    }

    const { name, email } = parsedData.data

    try {
      await admin.firestore().collection('users').doc(phoneNumber!).update({
        name: name,
        email: email,
      })

      return { message: 'User profile updated successfully.' }
    } catch (error) {
      return handleError(
        'An error occurred while updating the user profile',
        error,
      )
    }
  },
)

export const getUserProfile = functions.https.onCall(
  async (request: functions.https.CallableRequest) => {
    assertAuthenticated(request)
    const phoneNumber = request.auth?.token.phone_number

    try {
      const user = await admin
        .firestore()
        .collection('users')
        .doc(phoneNumber!)
        .get()

      return user.data()
    } catch (error) {
      return handleError(
        'An error occurred while fetching the user profile',
        error,
      )
    }
  },
)
