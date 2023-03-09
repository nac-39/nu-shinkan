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
      <div class="flex justify-center w-full">
        <div>
          <ClientOnly>
            <h1 class="text-xl font-bold">団体関係者ログイン</h1>
            <div class="mt-8">
              <p>
                団体関係者はログインすると、イベントの作成ができるようになります！
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
