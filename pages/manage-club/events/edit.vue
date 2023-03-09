<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
// meta
definePageMeta({
  layout: 'page',
})
</script>

<template>
  <PageWrapper class="flex-1 flex md:px-12 px-4">
    <PageBody class="space-y-4">
      <PageManageClubEventsEdit />
    </PageBody>
  </PageWrapper>
</template>
