<script setup lang="ts">
// meta
definePageMeta({
  layout: 'page',
})

const { signIn } = useAuth()
</script>

<template>
  <PageWrapper class="flex-1 flex">
    <PageBody class="flex-1 flex">
      <div class="justify-center">
        <ClientOnly>
          <h1 class="text-xl font-bold">団体関係者ログイン</h1>
          <div>
            <p>
              団体関係者はログインすると、イベントの作成ができるようになります！
            </p>
          </div>
          <Button class="bg-special-twitter" @click="signIn"
            >Twitterでログイン</Button
          >
        </ClientOnly>
      </div>
    </PageBody>
  </PageWrapper>
</template>
