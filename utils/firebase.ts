import { getAuth } from 'firebase/auth'

export const fGetUser = () => {
  const auth = getAuth()
  const user = auth.currentUser
  return user
}
