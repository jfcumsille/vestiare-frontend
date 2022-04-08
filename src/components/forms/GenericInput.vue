<script setup lang="ts">
import {
  computed, ref, watch, getCurrentInstance,
} from 'vue';

type Validation = (value: string) => true | string;

const props = withDefaults(defineProps<{
  modelValue: string,
  label?: string,
  placeholder?: string,
  validations?: Array<Validation>,
  rightText?: string,
  rightHref?: string,
}>(), {
  validations: () => [] as Array<Validation>,
});

const emit = defineEmits<{(e: 'update:modelValue', value: string): void}>();

const register = () => {
  const instance = getCurrentInstance();
  instance?.parent?.exposed?.register(instance);
};

register();

const validating = ref(false);
const errorText = ref('');
const valid = computed(() => !errorText.value.trim());

const labelColorClasses = computed(() => (valid.value ? 'text-sec-cap-txt-color' : 'text-red-700'));

const inputColorClasses = computed(() => {
  if (!valid.value) {
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

const startValidating = () => {
  validating.value = true;
};

const validate = () => {
  if (!validating.value) {
    return;
  }
  const validated = props.validations.map((validation) => validation(props.modelValue));
  const errors = validated.filter((possible) => possible !== true) as Array<string>;
  if (!errors.length) {
    errorText.value = '';
  } else {
    errorText.value = errors[0];
  }
};

watch([() => props.modelValue, () => props.validations, validating], validate);

const publicValid = computed(() => {
  startValidating();
  return valid.value;
});

defineExpose({ valid: publicValid });
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
      v-if="!valid"
      class="mt-1 text-sm text-danger-main"
    >
      {{ errorText }}
    </p>
  </label>
</template>
