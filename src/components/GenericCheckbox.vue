<script setup lang="ts">
const props = defineProps<{
  text: string,
  modelValue?: boolean,
  description?: string,
}>();

const emit = defineEmits<{(e: 'update:modelValue', value: boolean): void}>();

const toggle = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).checked);
};
</script>

<template>
  <div class="flex space-x-3 items-start">
    <input
      type="checkbox"
      class="
        w-4 h-4 min-w-4 min-h-4 text-primary-main bg-primary-surface rounded hover:cursor-pointer
        border-primary-border focus:ring-primary-main
      "
      :checked="props.modelValue"
      @change="toggle"
    >
    <div class="flex flex-col space-y-2 -mt-1">
      <label
        for="checkbox-1"
        class="text-sm font-medium text-body-color"
      >{{ props.text }}</label>
      <div
        v-if="props.description"
        class="text-xs font-light text-body-color"
      >
        {{ props.description }}
      </div>
    </div>
  </div>
</template>
