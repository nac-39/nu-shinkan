<template>
  <div class="w-12 h-12">
    <img :src="src" :alt="alt" class="rounded-full border-light-600 border-2" />
  </div>
</template>
<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
})
</script>
