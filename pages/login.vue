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
      <div>
        <ClientOnly>
          <div>団体関係者ログイン</div>
          <div>
            <p>
              団体関係者はログインすると、イベントの作成ができるようになります！
            </p>
          </div>
          <Button @click="signIn">Twitterでログイン</Button>
        </ClientOnly>
      </div>
    </PageBody>
  </PageWrapper>
</template>
