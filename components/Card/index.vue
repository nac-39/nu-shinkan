<script lang="ts" setup>
const props = defineProps({
  profileBannerUrl: {
    type: String,
    default: '',
  },
  profileImageUrlHttps: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  screenName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  webSiteUrl: {
    type: String,
    default: '',
  },
  instaId: {
    type: String,
    default: '',
  },
})

const bannerSrc = computed(
  () => 'assets/users/images/' + props.screenName + '_banner.jpg'
)
const profileSrc = computed(
  () => 'assets/users/images/' + props.screenName + '_profile.jpg'
)
</script>

<template>
  <div
    class="flex flex-col justify-between sm:w-80 w-full rounded-md dark:bg-gray-800 bg-white shadow-gray-300 divide-y divide-primary-300 dark:divide-dark-50"
  >
    <div>
      <img class="w-full rounded-t-md h-32" :src="bannerSrc" :alt="name" />
      <div class="m-2">
        <CardAvatar class="h-0 -top-8 relative" :src="profileSrc" :alt="name" />
        <div class="mt-4">
          <p class="text-xl font-bold">{{ name }}</p>
          <p class="text-sm">{{ description }}</p>
        </div>
      </div>
    </div>
    <div>
      <div class="flex justify-end mt-2">
        <div v-show="webSiteUrl" class="w-1/3 p-2">
          <LinkButton :href="webSiteUrl"> Web </LinkButton>
        </div>
        <div class="w-1/3 p-2">
          <LinkButton :href="`https://twitter.com/${screenName}`">
            Twitter
          </LinkButton>
        </div>
        <div v-show="instaId" class="w-1/3 p-2">
          <LinkButton :href="`https://www.instagram.com/${screenName}`">
            Instagram</LinkButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
