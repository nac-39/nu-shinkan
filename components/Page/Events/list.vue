<script setup lang="ts">
import {
  collection,
  getDocs,
  Firestore,
  query,
  DocumentData,
  orderBy,
} from 'firebase/firestore'
import { Event } from '~/entities/Event'

const db = useState<Firestore>('firebase.db')

const convertEvent = (id: string, result: DocumentData): Event => {
  return {
    id,
    name: result.name,
    clubName: result.clubName,
    clubImagePath: result.clubImagePath,
    startDate: result.startDate ? result.startDate.toDate() : null,
    endDate: result.endDate ? result.endDate.toDate() : null,
    place: result.place,
    description: result.description,
    webSiteUrl: result.webSiteUrl,
  }
}

const getUsers = async () => {
  try {
    const userIds: string[] = []
    const q = query(collection(db.value, 'events'))
    const res = await getDocs(q)
    res.forEach((result) => {
      console.log(result.ref.path)
      userIds.push(result.id)
    })
    console.log(userIds)
    return userIds
  } catch (e) {
    console.error(e)
  }
}

const getEvents = async (id: string) => {
  try {
    const events: Event[] = []
    const q = query(
      collection(db.value, 'events', id, 'events'),
      orderBy('startDate')
    )
    const res = await getDocs(q)
    res.forEach((result) => {
      events.push(convertEvent(result.id, result.data()))
    })
    return events
  } catch (e) {
    console.error(e)
  }
}

const { data: events } = await useFetch(async () => {
  const userIds = await getUsers()
  if (!userIds) return
  const r = await Promise.all(userIds.map(async (id) => await getEvents(id)))
  return r.flat()
})
</script>

<template>
  <div v-if="events" class="space-y-2 space-x-2 flex flex-wrap flex-col">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>
