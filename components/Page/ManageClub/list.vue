<script setup lang="ts">
import {
  collection,
  getDocs,
  Firestore,
  query,
  DocumentData,
  doc,
  orderBy,
  deleteDoc,
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

const getEvents = async () => {
  try {
    const user = fGetUser()
    if (!user) return
    const events: Event[] = []
    const q = query(
      collection(db.value, 'events', user.uid, 'events'),
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

const { data: events, reload: reloadEvents } = await useFetch(getEvents)

const onClickDelete = async (eventId: string) => {
  const user = fGetUser()
  if (!user) return
  await deleteDoc(doc(db.value, 'events', user.uid, 'events', eventId))
  reloadEvents()
}
</script>

<template>
  <div v-if="events" class="space-y-2 space-x-2 flex flex-wrap flex-col">
    <SideDelete
      v-for="event in events"
      :key="event.id"
      size="8"
      @on-click-delete="onClickDelete(event.id)"
    >
      <EventCard :event="event" />
    </SideDelete>
  </div>
</template>
