<script setup lang="ts">
import { isSameDay, format } from 'date-fns/esm'
import ja from 'date-fns/locale/ja'
import Avatar from './Card/Avatar.vue'
import type { Event } from '~/entities/Event'

const props = defineProps<{ event: Event }>()
const dateText = computed(() => {
  if (!props.event.startDate || !props.event.endDate) return ''
  if (isSameDay(props.event.startDate, props.event.endDate)) {
    return (
      format(props.event.startDate, 'yyyy年MM月dd日(eee) HH:mm ~ ', {
        locale: ja,
      }) + format(props.event.endDate, 'HH:mm')
    )
  } else {
    return (
      format(props.event.startDate, 'yyyy年MM月dd日(eee) HH:mm ~ ', {
        locale: ja,
      }) +
      format(props.event.endDate, 'yyyy年MM月dd日(eee) HH:mm', { locale: ja })
    )
  }
})
</script>
<template>
  <div v-if="event" class="rounded-md bg-blue-gray-600">
    <div
      v-if="event.clubName || event.clubImagePath"
      class="flex items-center space-x-2 bg-blue-gray-800 pt-4 px-4 pb-2"
    >
      <Avatar
        v-if="event.clubImagePath"
        class="w-8 h-8"
        :src="event.clubImagePath"
      />
      <div class="text-lg font-bold">{{ event.clubName }}</div>
    </div>
    <div class="px-4 pb-4">
      <div class="py-2 font-bold text-xl">
        {{ event.name }}
      </div>
      <div>
        <div v-if="dateText" class="text-sm dark:text-light-900">
          {{ dateText }}
        </div>
        <div v-if="event.place">@ {{ event.place }}</div>
      </div>
      <div>
        <p v-if="event.description">
          {{ event.description }}
        </p>
        <p v-if="event.webSiteUrl">
          関連リンク：
          <a :href="event.webSiteUrl">{{ event.webSiteUrl }}</a>
        </p>
      </div>
    </div>
  </div>
</template>
