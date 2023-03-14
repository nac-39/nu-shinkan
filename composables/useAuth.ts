import {
  getAuth,
  TwitterAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  User as FirebaseUser,
} from 'firebase/auth'

export const useAuth = () => {
  const token = useState<string | undefined>('token', () => undefined)
  const user = useState<FirebaseUser | undefined>('user', () => undefined)
  const error = useState<{ code: number; message: string } | undefined>(
    'error',
    () => undefined
  )
  const isLogined = computed(() => !!token.value)

  const signIn = async () => {
    if (process.server) return
    const provider = new TwitterAuthProvider()
    const localeSetting = useState<string>('locale.setting')
    const auth = getAuth()
    auth.languageCode = localeSetting.value
    provider.setCustomParameters({
      lang: localeSetting.value,
    })
    await signInWithRedirect(auth, provider)
  }

  const afterSignIn = async () => {
    if (process.server) return
    const auth = getAuth()
    const result = await getRedirectResult(auth).catch((firebaseError) => {
      // Handle Errors here.
      error.value = { code: firebaseError.code, message: firebaseError.message }
    })
    const credential =
      result != null
        ? await TwitterAuthProvider.credentialFromResult(result)
        : null
    if (!user.value) {
      user.value = result ? result.user : undefined
    }
  }

  const signOut = async () => {
    if (process.server) return
    const auth = getAuth()
    await firebaseSignOut(auth).catch((error) => {
      return error
    })
    token.value = undefined
    user.value = undefined
  }

  const checkAuthState = async () => {
    // client only
    if (process.server) return
    const auth = getAuth()

    await new Promise<void>((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const idToken = await user.getIdToken()
          token.value = idToken
          resolve()
        } else {
          token.value = undefined
          resolve()
        }
      })
    })
  }

  return {
    signIn,
    afterSignIn,
    signOut,
    token,
    checkAuthState,
    user,
    error,
    isLogined,
  }
}
