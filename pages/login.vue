<script setup lang="ts">
// meta
definePageMeta({
  layout: 'page',
  middleware: 'auth',
})

const { signIn, signOut, token, checkAuthState, user } = useAuth()

const onClickLogin = async () => {
  await signIn()
  console.log(token.value)
}
</script>

<template>
  <PageWrapper class="flex-1 flex">
    <PageBody class="flex-1 flex">
      <div>
        <ClientOnly>
          <Button @click="onClickLogin">Twitterでログイン</Button>
          <div>token: {{ !!token }}</div>
          <div>user: {{ user }}</div>
          <Button @click="signOut">ログアウト</Button>
        </ClientOnly>
      </div>
    </PageBody>
  </PageWrapper>
</template>
