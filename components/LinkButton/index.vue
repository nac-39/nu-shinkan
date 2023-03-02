<template>
  <div
    class="w-full p-1 dark:hover:bg-gray-800 text-gray-500 hover:bg-gray-100 hover:text-primary-500 dark:hover:text-primary dark:text-white flex justify-center rounded-md"
  >
    <a :href="href">
      <slot></slot>
    </a>
  </div>
</template>
<script setup lang="ts">
import { ITheme } from '~/utils/theme'

defineProps({
  href: {
    type: String,
    required: true,
  },
})

const theme = useState<ITheme>('theme.current')
</script>
