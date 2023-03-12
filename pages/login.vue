<script setup lang="ts">
import { getAuth, getRedirectResult } from 'firebase/auth'
// meta
definePageMeta({
  layout: 'page',
})
// client only
const errorMsg = ref('')
if (!process.server) {
  const result = await getRedirectResult(getAuth()).catch((error) => {
    errorMsg.value = error.message
  })
  if (result) {
    // 認証後
    const router = useRouter()
    const route = useRoute()
    const redirectUri = route.query.redirect_uri as string | undefined
    router.push(redirectUri || '/')
  }
}
const { signIn } = useAuth()
</script>

<template>
  <PageWrapper class="flex-1 flex">
    <PageBody class="flex-1 flex">
      <div class="flex justify-center w-full">
        <div>
          <ClientOnly>
            <h1 class="text-xl font-bold">団体関係者ログイン</h1>
            <div class="mt-8">
              <p>
                団体関係者はログインすると、イベントの作成ができるようになります！
              </p>
              <p>
                トップページに表示されていないTwitterアカウントではログインが成功しません。
              </p>
              <p v-if="errorMsg">
                {{ errorMsg }}
              </p>
            </div>
            <Button class="mt-8 bg-primary dark:bg-primary-800" @click="signIn"
              >Twitterでログイン</Button
            >
          </ClientOnly>
        </div>
      </div>
    </PageBody>
  </PageWrapper>
</template>
