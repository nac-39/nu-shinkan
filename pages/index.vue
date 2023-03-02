<template>
  <PageWrapper class="flex-1 flex">
    <PageBody class="flex-1 flex">
      <PageSection class="flex flex-wrap justify-center">
        <Card
          v-for="user in users"
          :key="user.screenName"
          class="m-2"
          :name="user.name"
          :screen-name="user.screenName"
          :description="user.description"
          :profile-image-url-https="user.profileImageUrlHttps"
          :web-site-url="user.url"
        />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script lang="ts" setup>
import UserData from '@/public/users.json'

// composable
type User = {
  name: string
  description: string
  profileBannerUrl: string
  profileImageUrlHttps: string
  screenName: string
  url: string
}
const { t } = useLang()

// meta
definePageMeta({
  layout: 'page',
})

const shuffleArray = (array: Array<User>) => {
  const dst = array.slice()
  let i = array.length
  while (i > 0) {
    i--
    const j = Math.floor(Math.random() * (i + 1))
    ;[dst[i], dst[j]] = [dst[j], dst[i]]
  }
  return dst
}

const users = computed<User[]>(() => {
  return shuffleArray(UserData as User[])
})
</script>

<style lang="scss"></style>
