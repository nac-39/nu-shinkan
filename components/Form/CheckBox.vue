<script setup lang="ts">
interface Emits {
  (e: 'update:isChecked', newValue: boolean): void
}
const props = defineProps({
  isChecked: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})
const emit = defineEmits<Emits>()
const value = computed({
  get(): boolean {
    return props.isChecked
  },
  set(value: boolean) {
    emit('update:isChecked', value)
  },
})
</script>

<template>
  <label>
    <input v-model="value" type="checkbox" />
    {{ label }}
  </label>
</template>
