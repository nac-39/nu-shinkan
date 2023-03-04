<script lang="ts" setup>
import { User } from '~/entities/User'

type Props = {
  user: User
}
defineProps<Props>()

const f = {
  autoLink(text?: string) {
    if (!text) return ''
    return text.replace(/(https?:\/\/[^\s]*)/g, "<a href='$1'>$1</a>")
  },
}
</script>

<template>
  <div
    class="flex flex-col justify-between sm:w-80 w-full rounded-md dark:bg-gray-800 bg-white shadow-gray-300 divide-y divide-primary-300 dark:divide-dark-50"
  >
    <div>
      <img
        class="w-full rounded-t-md h-32"
        :src="user.profileBannerUrl"
        :alt="user.name"
      />
      <div class="m-2">
        <CardAvatar
          class="h-0 -top-8 relative"
          :src="user.profileImageUrlHttps"
          :alt="user.name"
        />
        <div class="mt-4">
          <p class="text-xl font-bold">{{ user.name }}</p>
          <p class="text-sm" v-html="f.autoLink(user.description)"></p>
        </div>
      </div>
    </div>
    <div>
      <div class="flex justify-end mt-2">
        <div v-if="user.url" class="w-1/3 p-2">
          <LinkButton :href="user.url"> Web </LinkButton>
        </div>
        <div class="w-1/3 p-2">
          <LinkButton :href="`https://twitter.com/${user.screenName}`">
            Twitter
          </LinkButton>
        </div>
        <div v-if="user.instaId" class="w-1/3 p-2">
          <LinkButton :href="`https://www.instagram.com/${user.instaId}`">
            Instagram</LinkButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
