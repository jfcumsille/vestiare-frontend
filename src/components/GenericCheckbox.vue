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
  <div
    class="flex items-center"
    v-bind="$attrs"
  >
    <input
      type="checkbox"
      class="
        w-4 h-4 text-primary-main bg-primary-surface rounded hover:cursor-pointer
        border-primary-border focus:ring-primary-main
      "
      :checked="props.modelValue"
      @change="toggle"
    >
    <label
      for="checkbox-1"
      class="ml-3 text-sm font-medium text-body-color"
    >{{ props.text }}</label>
  </div>
</template>
