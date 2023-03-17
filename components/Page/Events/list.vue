<script setup lang="ts">
import { format } from 'date-fns/esm'
import ja from 'date-fns/locale/ja'
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
      userIds.push(result.id)
    })
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
  const r = await Promise.all(
    userIds.map(async (id) => await getEvents(id)).filter(Boolean)
  )
  return r.flat().filter((v) => !!v) as Event[]
})

const eventComputed = computed(() => {
  if (!events.value) return
  const formated = events.value?.map((event) => {
    return {
      yearMonth: format(event.startDate, 'yyyy/MM'),
      date: format(event.startDate, 'dd'),
      day: format(event.startDate, 'eee', { locale: ja }),
      event,
    }
  })
  const res: Record<
    string,
    Array<{ yearMonth: string; date: string; day: string; event: Event }>
  > = {}
  formated?.forEach((event) => {
    if (res[event.yearMonth]) {
      res[event.yearMonth].push(event)
    } else {
      res[event.yearMonth] = [event]
    }
  })
  return res
})
const dateKeys = computed(() => {
  const dates = events.value?.map((e) => format(e.startDate, 'yyyy/MM'))
  return Array.from(new Set(dates))
})
</script>

<template>
  <div v-if="eventComputed">
    <div v-for="yearMonth in dateKeys" :key="yearMonth">
      <div class="text-xl font-bold mt-8">{{ yearMonth }}</div>
      <div class="flex flex-wrap flex-1">
        <EventCard
          v-for="event in eventComputed[yearMonth]"
          :key="event.event.id"
          :event="event.event"
          class="m-1 h-min"
        />
      </div>
    </div>
  </div>
</template>
