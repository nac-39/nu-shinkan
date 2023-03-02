<template>
  <PageWrapper class="flex-1 flex">
    <PageBody class="flex-1 flex">
      <PageSection class="flex flex-wrap justify-center">
        <ClientOnly>
          <Card
            v-for="user in shuffleArray(users)"
            :key="user.screenName"
            class="m-2"
            :user="user"
          />
        </ClientOnly>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script lang="ts" setup>
import UserData from '@/public/users.json'
import { User } from 'entities/User'

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

// const users = computed(() => shuffleArray(UserData as User[]))
const users = UserData as User[]
</script>
