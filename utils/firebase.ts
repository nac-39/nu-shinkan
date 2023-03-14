import { getAuth } from '@firebase/auth'
import {
  getFirestore,
  getDocs,
  collection,
  where,
  query,
} from 'firebase/firestore'
import { User } from '~~/entities/User'
export const fGetUser = () => {
  const auth = getAuth()
  const user = auth.currentUser
  return user
}

export const fGetAllUsers = async () => {
  const db = getFirestore()
  const q = query(collection(db, 'club-users'), where('name', '!=', null))
  const docSnap = await getDocs(q).catch((error) => console.error(error))
  if (!docSnap) return
  if (!docSnap.empty) {
    return docSnap.docs.map((doc) => doc.data() as User)
  } else {
    return undefined
  }
}
