import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

exports.beforeCreate = functions.auth
  .user()
  .beforeCreate(async (user, context) => {
    const screenName = context.additionalUserInfo?.username
    if (!screenName) {
      throw new functions.auth.HttpsError(
        'permission-denied',
        'Permission denied. Screenname is not provided'
      )
    }
    const data = await admin.firestore().doc(`/club-users/${screenName}`).get()
    if (!data.exists) {
      throw new functions.auth.HttpsError(
        'permission-denied',
        'Permission denied. You are not registered to twitter list, or list is not reloaded.'
      )
    }
  })
