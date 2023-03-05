<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
// meta
definePageMeta({
  layout: 'page',
})
</script>

<template>
  <PageWrapper class="flex-1 flex px-12">
    <PageBody class="space-y-4">
      <PageManageClubEdit />
    </PageBody>
  </PageWrapper>
</template>
