import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as line from '@line/bot-sdk'
import axios from 'axios'

admin.initializeApp()
interface Config {
  channelAccessToken: string
  channelSecret: string
}

const config: Config = {
  channelAccessToken: functions.config().line.channel_access_token,
  channelSecret: functions.config().line.channel_secret,
}
const twitterToken = functions.config().twitter.token

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
    const dataRef = admin.firestore().doc(`/club-users/${screenName}`)
    const data = await dataRef.get()
    if (!data.exists) {
      await dataRef.set({
        screenName,
        name: null,
        description: null,
        profileBannerUrl: null,
        profileImageUrlHttps: null,
        url: null,
        instaId: null,
        isVerified: false,
      })
      const client = new line.Client(config)
      const message: line.FlexMessage = {
        type: 'flex',
        altText: 'nu-shinkanに新しいユーザーが来たよ！',
        contents: {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '新しいユーザーだよ！',
                weight: 'bold',
              },
              {
                type: 'text',
                text: '登録していいかな？',
                margin: 'lg',
              },
              {
                type: 'text',
                text: screenName,
                margin: 'none',
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: 'Twitterを見る',
                  uri: `http://twitter.com/${screenName}`,
                },
              },
              {
                type: 'button',
                action: {
                  type: 'postback',
                  label: '許可する',
                  data: screenName,
                },
              },
            ],
          },
        },
      }

      await client.pushMessage('Ue4b17f9bbe0e93414eaed36e7c032572', message)
      throw new functions.auth.HttpsError(
        'permission-denied',
        'Permission denied. You are not registered to twitter list, or list is not reloaded.'
      )
    }
  })

exports.linePostBack = functions.https.onRequest(async (request, response) => {
  const createUserProfile = async (screenName: string) => {
    const url = `https://api.twitter.com/1.1/users/show.json?screen_name=${screenName}&include_entities=false`
    const result = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${twitterToken}`,
        },
      })
      .catch(() => {
        throw new functions.https.HttpsError(
          'internal',
          'Failed to get Twitter profile.'
        )
      })
    const profile = result.data
    return {
      screenName,
      name: profile.name,
      description: profile.description,
      profileBannerUrl: profile.profile_banner_url,
      profileImageUrlHttps: profile.profile_image_url_https,
      url: profile.url,
      instaId: '',
      isVerified: true,
    }
  }

  const notifyVerified = async (name: string, screenName: string) => {
    const client = new line.Client(config)
    await client
      .pushMessage('Ue4b17f9bbe0e93414eaed36e7c032572', {
        type: 'text',
        text: `${name}を新規ユーザー登録したよ！Twitterはこちら！\nhttps://twitter.com/${screenName}`,
      })
      .catch(() => {
        throw new functions.https.HttpsError(
          'internal',
          'Failed to push LINE notification to admin user.'
        )
      })
  }

  // 実行部
  const res: line.WebhookEvent = request.body.events[0]

  if (res.type !== 'postback') {
    return
  }
  const screenName = res.postback.data
  const profile = await createUserProfile(screenName)
  const dataRef = admin.firestore().doc(`/club-users/${screenName}`)
  await dataRef.set(profile).catch(() => {
    throw new functions.https.HttpsError(
      'internal',
      'Failed to add user to firestore.'
    )
  })
  await notifyVerified(profile.name, profile.screenName)
})
