<template>
  <div class="flex justify-between">
    <slot />
    <div class="flex items-center pl-2">
      <IconLineMd:loading-loop v-if="loading" />
      <IconMaterialSymbols:delete
        v-else
        class="cursor-pointer"
        :class="`w-${iconSize} h-${iconSize}`"
        @click="emit('onClickDelete')"
      ></IconMaterialSymbols:delete>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  iconSize: {
    type: Number,
    default: 6,
  },
  classes: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['onClickDelete'])
</script>
