<script setup lang="ts">
import { computed } from 'vue';
import { useRegistration } from '@/composables/registration';
import {
  ValidatePropType,
  ModelValuePropType,
  makeValidatedModelPropsDefaults,
  useValidatedModel,
} from '@/composables/validatedModel';

const props = withDefaults(defineProps<{
  label?: string,
  placeholder?: string,
  rightText?: string,
  rightHref?: string,
  // Validated Model
  modelValue: ModelValuePropType<string>,
  validations?: ValidatePropType<string>,
}>(), { ...makeValidatedModelPropsDefaults<string>() });

const emit = defineEmits<{
   (e: 'update:modelValue', value: string): void
}>();

useRegistration();

const {
  startValidating, valid, internalValid, error,
} = useValidatedModel(props);

const labelColorClasses = computed(() => (internalValid.value ? 'text-sec-cap-txt-color' : 'text-red-700'));

const inputColorClasses = computed(() => {
  if (!internalValid.value) {
    return `
      text-red-900 bg-red-50 border-red-500 placeholder-red-700
      focus:ring-red-500 focus:border-red-500
    `;
  }
  return `
    text-body-txt-color bg-white border-slate-300 placeholder-slate-400
    focus:ring-primary-main focus:border-primary-main
  `;
});

const hasRightLink = computed(() => props.rightText && props.rightHref);

const onInput = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).value);
};

defineExpose({ valid });
</script>

<template>
  <label class="block">
    <span
      v-if="props.label"
      data-test="label"
      :class="`
        flex flex-row justify-between mb-1 text-sm font-medium
        ${labelColorClasses}
      `"
    >
      {{ props.label }}
      <a
        v-if="hasRightLink"
        :href="props.rightHref"
        class="font-medium text-primary-main text-sm"
        tabIndex="-1"
      >
        {{ props.rightText }}
      </a>
    </span>
    <input
      data-test="input"
      :class="`
        block w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none
        focus:ring-1 h-12 ${inputColorClasses}
      `"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      v-bind="$attrs"
      @input="onInput"
      @blur="startValidating"
    >
    <p
      v-if="!internalValid"
      class="mt-1 text-sm text-danger-main"
    >
      {{ error }}
    </p>
  </label>
</template>
