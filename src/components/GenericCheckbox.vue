<script setup lang="ts">
const props = defineProps<{
  text: string,
  modelValue: boolean,
}>();

const emit = defineEmits<{(e: 'update:modelValue', value: boolean): void}>();

const toggle = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).checked);
};
</script>

<template>
  <div class="flex items-center mb-2">
    <input
      type="checkbox"
      class="
        w-4 h-4 text-blue-600 bg-gray-100 rounded hover:cursor-pointer
        border-gray-300 focus:ring-blue-500
      "
      :checked="props.modelValue"
      v-bind="$attrs"
      @change="toggle"
    >
    <label
      for="checkbox-1"
      class="ml-3 text-sm font-medium text-gray-900"
    >{{ props.text }}</label>
  </div>
</template>
