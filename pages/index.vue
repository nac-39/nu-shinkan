<template>
  <PageWrapper class="flex-1 flex">
    <PageBody>
      <PageSection>
        <RouterLink
          to="/events"
          class="md:px-20 px-4 bg-primary-300 dark:bg-primary-900 flex justify-center w-full py-4"
        >
          <div class="flex items-center">
            <span class="text-2xl font-bold">
              イベント一覧ページはこちら！
            </span>
            <IconMaterialSymbols:play-arrow-rounded class="w-8 h-8" />
          </div>
        </RouterLink>
      </PageSection>
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
