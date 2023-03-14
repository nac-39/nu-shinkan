<script setup lang="ts">
// meta
definePageMeta({
  layout: 'page',
})

const { signOut, afterSignIn, checkAuthState } = useAuth()
signOut()
await afterSignIn()
await checkAuthState()

await navigateTo('/', { replace: true })
</script>
<template>
  <div>ログアウト</div>
</template>
