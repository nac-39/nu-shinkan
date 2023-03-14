<script setup lang="ts">
import { isSameDay, format, getYear } from 'date-fns/esm'
import ja from 'date-fns/locale/ja'
import Avatar from './Card/Avatar.vue'
import type { Event } from '~/entities/Event'

const { t } = useLang()
const props = defineProps<{ event: Event }>()
const dateText = computed(() => {
  if (!props.event.startDate || !props.event.endDate) return ''
  if (isSameDay(props.event.startDate, props.event.endDate)) {
    return (
      format(props.event.startDate, 'yyyy/MM/dd(eee) HH:mm ~ ', {
        locale: ja,
      }) + format(props.event.endDate, 'HH:mm')
    )
  } else {
    return (
      format(props.event.startDate, 'yyyy/MM/dd(eee) HH:mm ~ ', {
        locale: ja,
      }) + format(props.event.endDate, 'yyyy/MM/dd(eee) HH:mm', { locale: ja })
    )
  }
})
const showReadMore = ref(true)
const onClickReadMore = () => {
  showReadMore.value = !showReadMore.value
}
const readMoreText = computed(() => {
  if (showReadMore.value) return t('components.event_card.read_more')
  return t(t('components.event_card.close'))
})

const descriptionText = computed(() => {
  const max = 100
  if (!props.event.description) return
  if (showReadMore.value)
    return (
      props.event.description.slice(0, max) +
      (props.event.description.length > max ? '…' : '')
    )
  return props.event.description + ' '
})
</script>
<template>
  <div
    v-if="event"
    class="w-full md:w-80 rounded-md bg-light-300 dark:bg-blue-gray-600"
  >
    <div
      v-if="event.clubName || event.clubImagePath"
      class="flex items-center space-x-2 rounded-t-md bg-light-800 dark:bg-blue-gray-800 flex items-center p-2"
    >
      <Avatar
        v-if="event.clubImagePath"
        class="w-8 h-8"
        :src="event.clubImagePath"
      />
      <div class="text-lg font-bold">{{ event.clubName }}</div>
    </div>
    <div class="px-4 pb-4">
      <div class="pt-4 pb-2 font-bold text-xl">
        {{ event.name }}
      </div>
      <div class="py-2 block">
        <div
          v-if="dateText"
          class="text-sm dark:text-light-900 flex items-center space-x-1"
        >
          <IconIc:round-calendar-today class="w-3 h-3" />
          <span>{{ dateText }}</span>
        </div>
        <div
          v-if="event.place"
          class="text-sm dark:text-light-900 flex items-center space-x-1"
        >
          <IconMaterialSymbols:location-on-outline class="w-3 h-3" />
          <span>{{ event.place }}</span>
        </div>
      </div>
      <div class="py-2">
        <p v-if="event.description">
          <span>{{ descriptionText }}</span>
          <a
            v-if="event.description.length > 100"
            class="dark:text-gray-400 text-gray-600 cursor-pointer"
            @click="onClickReadMore"
            >{{ readMoreText }}</a
          >
        </p>
        <p
          v-if="event.webSiteUrl"
          class="pt-1 text-sm inline-flex items-center space-x-1 w-full"
        >
          <IconPh:link-simple-light />
          <a
            :href="event.webSiteUrl"
            class="hover:underline inline-block truncate w-full"
            >{{ event.webSiteUrl }}</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
