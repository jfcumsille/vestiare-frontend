<script setup lang="ts">
import { computed, ComponentPublicInstance, ref } from 'vue';
import { useRegistration } from '@/composables/registration';
import {
  ValidatePropType,
  ModelValuePropType,
  makeValidatedModelPropsDefaults,
  useValidatedModel,
} from '@/composables/validatedModel';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import { Nullable } from '@/interfaces/common';
import { icons } from '@/utils/icons';

const props = withDefaults(defineProps<{
  inputId: string,
  label?: string,
  placeholder?: string,
  hint?: string,
  rightText?: string,
  rightHref?: string,
  leftIconName?: string,
  rightIconName?: string,
  // Validated Model
  modelValue: ModelValuePropType<string>,
  validations?: ValidatePropType<string>,
  disabled: boolean,
}>(), {
  disabled: false,
  ...makeValidatedModelPropsDefaults<string>(),
});

const emit = defineEmits<{
   (e: 'update:modelValue', value: string): void
   (e: 'click-left-icon'): void
   (e: 'click-right-icon'): void
}>();

useRegistration();

const {
  startValidating, valid, internalValid, error,
} = useValidatedModel(props);

const isInputActive = ref(false);
const onInput = ($event: Event) => {
  isInputActive.value = true;
  emit('update:modelValue', ($event.target as HTMLInputElement).value);
};

const onBlur = () => {
  startValidating();
  isInputActive.value = false;
};

const leftIconComponent = computed((): Nullable<ComponentPublicInstance> => {
  if (props.leftIconName && (props.leftIconName in icons)) {
    return icons[props.leftIconName];
  }
  return null;
});

const rightIconComponent = computed((): Nullable<ComponentPublicInstance> => {
  if (props.rightIconName && (props.rightIconName in icons)) {
    return icons[props.rightIconName];
  }
  return null;
});

const showLeftIcon = computed(() => (leftIconComponent.value));
const showRightIcon = computed(() => (rightIconComponent.value));

const focusInput = () => {
  document.getElementById(props.inputId).focus();
  if (document.activeElement === document.getElementById(props.inputId)) {
    isInputActive.value = true;
  }
};

const clickIcon = (position: string) => {
  emit(`click-${position}-icon`);
};

const inputColorClasses = computed(() => {
  if (props.disabled) {
    return 'text-disabled-color border-divider-color';
  }
  if (!internalValid.value) {
    return `
      text-body-color border-danger-main placeholder-placeholder-color
      focus:ring-danger-focus focus:border-danger-focus
    `;
  }
  if (isInputActive.value) {
    return `
    text-body-color placeholder-placeholder-color
    ring-primary-focus border-primary-main ring
  `;
  }
  return `
    text-body-color border-main-border placeholder-placeholder-color
    hover:border-primary-main
  `;
});

const hintText = computed(() => {
  if (!internalValid.value) {
    return error.value;
  }
  if (props.hint) {
    return props.hint;
  }
  return '';
});

const warningIconColor = computed(() => {
  if (!internalValid.value) {
    return 'text-danger-main';
  }
  return 'text-success-main';
});

const showHint = computed(() => !internalValid.value || props.hint);
const hasRightLink = computed(() => props.rightText && props.rightHref);
defineExpose({ valid });
</script>

<template>
  <div class="block h-full justify-center items-center">
    <div class="relative w-full min-w-max">
      <label
        v-if="props.label"
        data-test="label"
        class="
          absolute left-0 -mt-3 px-1 mx-2 pointer-events-none
          text-sm text-placeholder-color bg-white min-w-max
        "
        :class="{ 'text-disabled-color': props.disabled }"
      >
        {{ props.label }}
      </label>
      <div
        data-test="input-div"
        :class="`
          flex w-full p-3 border-1.5 border-border-color rounded-lg shadow-sm
          text-sm duration-100 ease-out ${inputColorClasses}
        `"
        tabIndex="0"
        @click="focusInput"
      >
        <component
          :is="leftIconComponent"
          v-if="showLeftIcon"
          data-test="generic-input-icon-left"
          class="mr-1.5 w-4.5 h-4.5 min-w-4.5 min-h-4.5"
          @click="() => emit('click-left-icon')"
        />
        <input
          :id="props.inputId"
          data-test="input"
          class="w-full outline-none placeholder-placeholder-color"
          :class="{ 'text-disabled-color placeholder-disabled-color bg-white': props.disabled }"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          v-bind="$attrs"
          tabIndex="-1"
          :disabled="props.disabled"
          @input="onInput"
          @blur="onBlur"
        >
        <component
          :is="rightIconComponent"
          v-if="showRightIcon"
          data-test="generic-input-icon-right"
          class="ml-1.5 w-4.5 h-4.5 min-w-4.5 min-h-4.5"
          @click="() => emit('click-right-icon')"
        />
      </div>
    </div>
    <div class="my-1 ml-3.5 flex justify-between items-start">
      <div
        v-if="showHint"
        data-test="input-hint"
        :class="`flex flex-row items-start ${warningIconColor}`"
      >
        <WarningIcon
          class="mt-0.5 w-2.5 h-2.5 min-w-2.5 min-h-2.5"
          fill="currentColor"
        />
        <div class="ml-1 text-xs text-body-color">
          {{ hintText }}
        </div>
      </div>
      <a
        v-if="hasRightLink"
        data-test="input-right-href"
        :href="props.rightHref"
        class="font-medium text-primary-main text-xs hover:text-primary-hover min-w-max ml-2"
        tabIndex="-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ props.rightText }}
      </a>
    </div>
  </div>
</template>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: #4a4672 !important;
}
</style>
