<script setup lang="ts">
// meta
definePageMeta({
  layout: 'page',
})
</script>

<template>
  <PageWrapper class="flex-1 flex md:px-12 px-4">
    <PageBody class="pt-4 space-y-4">
      <Button :to="'/manage-club/events/edit'">新規イベントを作成</Button>
      <div>
        <div class="text-lg font-bold py-2">登録済みイベント</div>
        <PageManageClubList />
      </div>
    </PageBody>
  </PageWrapper>
</template>
