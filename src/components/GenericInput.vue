<script setup lang="ts">
const props = defineProps<{
  modelValue: string,
  label?: string,
  placeholder?: string,
}>();
const emit = defineEmits<{(e: 'update:modelValue', value: string): void}>();

const onInput = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).value);
};
</script>

<template>
  <label class="block">
    <span
      v-if="props.label"
      data-test="label"
      class="block mb-1 text-sm font-medium text-slate-700"
    >
      {{ props.label }}
    </span>
    <input
      data-test="input"
      class="
        block w-full px-3 py-2 bg-white border border-slate-300 rounded-md
        text-sm shadow-sm placeholder-slate-400 focus:outline-none
        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
      "
      :placeholder="props.placeholder"
      :value="props.modelValue"
      v-bind="$attrs"
      @input="onInput"
    >
  </label>
</template>
