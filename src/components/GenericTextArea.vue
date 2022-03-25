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
      class="font-medium text-sec-cap-txt-color"
    >
      {{ props.label }}
    </span>
    <textarea
      data-test="textarea"
      rows="4"
      class="
        block w-full px-3 py-2 bg-white border border-slate-300 rounded-md
        text-sm text-body-txt-color shadow-sm placeholder-slate-400 focus:outline-none
        focus:border-primary-main focus:ring-1 focus:ring-primary-main resize-none
      "
      :placeholder="props.placeholder"
      :value="props.modelValue"
      v-bind="$attrs"
      @input="onInput"
    />
  </label>
</template>
