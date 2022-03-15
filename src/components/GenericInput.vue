<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string,
  label?: string,
  placeholder?: string,
  rightText?: string,
  rightHRef?: string,
}>();

const hasRightLink = computed(() => props.rightText && props.rightHRef);

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
      class="flex flex-row justify-between mb-1 text-sm font-medium text-sec-cap-txt-color"
    >
      {{ props.label }}
      <a
        v-if="hasRightLink"
        :href="props.rightHRef"
        class="font-medium text-primary-main text-sm"
      >
        {{ props.rightText }}
      </a>
    </span>
    <input
      data-test="input"
      class="
        block w-full px-3 py-2 bg-white border border-slate-300 rounded-md
        text-sm text-body-txt-color shadow-sm placeholder-slate-400 focus:outline-none
        focus:border-primary-main focus:ring-1 focus:ring-primary-main h-12
      "
      :placeholder="props.placeholder"
      :value="props.modelValue"
      v-bind="$attrs"
      @input="onInput"
    >
  </label>
</template>
