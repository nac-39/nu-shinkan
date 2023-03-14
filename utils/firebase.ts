import { getAuth } from '@firebase/auth'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { User } from '~~/entities/User'
export const fGetUser = () => {
  const auth = getAuth()
  const user = auth.currentUser
  return user
}

export const fGetAllUsers = async () => {
  const db = getFirestore()
  const usersDocRef = collection(db, 'club-users')
  const docSnap = await getDocs(usersDocRef).catch((error) =>
    console.error(error)
  )
  if (!docSnap) return
  if (!docSnap.empty) {
    return docSnap.docs.map((doc) => doc.data() as User)
  } else {
    return undefined
  }
}
