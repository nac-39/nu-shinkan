<script setup lang="ts">
defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <div v-if="errorMessage" class="bg-red-200 rounded-md p-2">
    <p class="text-lg font-bold text-red-900">Error!🥲</p>
    <p class="text-red-900 whitespace-pre-wrap break-words">
      {{ errorMessage }}
    </p>
  </div>
</template>
