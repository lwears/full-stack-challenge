import { expect, test } from '@jest/globals'
import { createUserProfile, getUserProfile } from '../index'
import * as admin from 'firebase-admin'
import firebaseFunctionsTest from 'firebase-functions-test'

// Initialize the firebase-functions-test SDK using environment variables.
// These variables are automatically set by firebase emulators:exec
//
// This configuration will be used to initialize the Firebase Admin SDK, so
// when we use the Admin SDK in the tests below we can be confident it will
// communicate with the emulators, not production.
// const test = require('firebase-functions-test')({
//   projectId: process.env.GCLOUD_PROJECT,
// })

const { cleanup, firestore, wrap, auth } = firebaseFunctionsTest()

describe('Unit tests', () => {
  afterAll(() => {
    cleanup()
  })

  it('test getUserProfile', async () => {
    const wrapped = wrap(getUserProfile)

    // Make a fake document snapshot to pass to the function
    const after = firestore.makeDocumentSnapshot(
      {
        name: 'Liam',
        email: 'liam@wears.com',
      },
      '/users/123456789',
    )

    await wrapped(after, {
      auth: { uid: '123', token: { phone_number: '123456789' } },
    })

    // Check the data in the Firestore emulator
    const snap = await admin.firestore().doc('/users/123456789').get()
    expect(snap.data()).toEqual({
      name: 'Liam',
      email: 'liam@wears.com',
    })
  })

  test('test createUserProfile (creates on auth login)', async () => {
    const wrapped = wrap(createUserProfile)

    const phoneNumber = '+46730741743'
    const user = auth.makeUserRecord({ uid: phoneNumber })

    await wrapped(user)

    const snap = await admin
      .firestore()
      .collection('users')
      .doc(phoneNumber)
      .get()

    const data = snap.data()

    expect(data?.uid).toEqual(phoneNumber)
  })
})
