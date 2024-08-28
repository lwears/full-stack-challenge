import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
//import { profileSchema } from '@shared/schemas'
import { profileSchema } from '../../../packages/shared/schemas'
admin.initializeApp()

export const createUserProfile = functions.auth
  .user()
  .onCreate(async (user) => {
    const { email, phoneNumber, displayName } = user

    const userData = {
      email: email || null,
      name: displayName || null,
    }

    await admin.firestore().collection('users').doc(phoneNumber!).set(userData)
  })

export const updateUserProfile = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'The request does not have valid authentication credentials.',
      )
    }

    // I can assert not undefined because we know that is the only login method
    const phoneNumber = context.auth.token.phone_number!

    const parsedData = profileSchema.safeParse(data)

    if (!parsedData.success) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Invalid input data',
        parsedData.error.format(),
      )
    }

    const { name, email } = data

    try {
      await admin.firestore().collection('users').doc(phoneNumber).update({
        name: name,
        email: email,
      })

      return { message: 'User profile updated successfully.' }
    } catch (error) {
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while updating the user profile.',
        error,
      )
    }
  },
)

export const getUserProfile = functions.https.onCall(async (_, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The request does not have valid authentication credentials.',
    )
  }
  const phoneNumber = context.auth.token.phone_number!
  try {
    const user = await admin
      .firestore()
      .collection('users')
      .doc(phoneNumber)
      .get()

    return user.data()
  } catch (error) {
    throw new functions.https.HttpsError(
      'internal',
      'An error occurred while fetching the user profile.',
      error,
    )
  }
})
