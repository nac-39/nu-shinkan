<script setup lang="ts">
// meta
definePageMeta({
  layout: 'page',
})
</script>

<template>
  <PageWrapper class="flex-1 flex md:px-12 px-4">
    <PageBody class="pt-4 space-y-4">
      <div>
        <div class="text-lg font-bold py-2">新歓イベント</div>
        <PageEventsList />
      </div>
    </PageBody>
  </PageWrapper>
</template>
