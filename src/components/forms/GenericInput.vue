<script setup lang="ts">
import { computed, ref, ComponentPublicInstance } from 'vue';
import { useRegistration } from '@/composables/registration';
import {
  ValidatePropType,
  ModelValuePropType,
  makeValidatedModelPropsDefaults,
  useValidatedModel,
} from '@/composables/validatedModel';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import { findIcon } from '@/utils/icons';
import { Nullable } from '@/interfaces/common';
import { SizeType } from '@/interfaces/utilities/enums';

const props = withDefaults(defineProps<{
  size?: SizeType,
  label?: string,
  placeholder?: string,
  hint?: string,
  rightText?: string,
  rightHref?: string,
  leftIconName?: string,
  rightIconName?: string,
  boldHint?: boolean,
  // Validated Model
  modelValue: ModelValuePropType<string>,
  validations?: ValidatePropType<string>,
  disabled?: boolean,
}>(), {
  disabled: false,
  size: SizeType.Medium,
  ...makeValidatedModelPropsDefaults<string>(),
});

const emit = defineEmits<{
   (e: 'update:modelValue', value: string): void
   (e: 'click-left-icon'): void
   (e: 'click-right-icon'): void
   (e: 'key-enter'): void
}>();

useRegistration();

const {
  startValidating, valid, internalValid, error, validating,
} = useValidatedModel(props);

const onInput = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).value);
};

const inputRef = ref<HTMLElement | null>(null);
const focusInput = () => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const leftIconComponent = computed((): Nullable<ComponentPublicInstance> => (
  props.leftIconName ? findIcon(props.leftIconName) : null
));
const rightIconComponent = computed((): Nullable<ComponentPublicInstance> => (
  props.rightIconName ? findIcon(props.rightIconName) : null
));

const inputColorClasses = computed(() => {
  if (props.disabled) {
    return 'text-disabled-color border-divider-color';
  }
  if (!internalValid.value) {
    return 'text-body-color border-danger-main focus-within:ring-danger-focus focus-within:ring';
  }
  return `text-body-color border-main-border hover:border-primary-main
    focus-within:text-body-color focus-within:ring-primary-focus focus-within:border-primary-main focus-within:ring`;
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

const hintStyle = computed(() => (props.boldHint ? 'font-semibold' : ''));

const showHint = computed(() => !internalValid.value || props.hint);
const hasRightLink = computed(() => props.rightText && props.rightHref);

const sizeClasses = computed(() => {
  switch (props.size) {
    case SizeType.Small:
      return 'max-w-50';
    case SizeType.Medium:
      return 'max-w-80';
    case SizeType.Large:
      return 'max-w-104';
    case SizeType.XLarge:
      return 'max-w-158';
    default:
      return 'max-w-80';
  }
});

defineExpose({ valid, validating });
</script>

<template>
  <div :class="`block h-full justify-center items-center ${sizeClasses} min-w-50 w-full pt-3 pb-2`">
    <div class="relative">
      <label
        v-if="props.label"
        data-test="label"
        class="
          absolute left-0 -mt-3 px-1 mx-2 pointer-events-none
          text-sm text-placeholder-color bg-white
        "
        :class="{ 'text-disabled-color': props.disabled }"
      >
        {{ props.label }}
      </label>
      <div
        data-test="input-div"
        :class="`
          flex p-3 border-1.5 border-border-color rounded-lg shadow-sm
          text-sm duration-100 ease-out cursor-text ${inputColorClasses}
        `"
        @click="focusInput"
      >
        <component
          :is="leftIconComponent"
          v-if="leftIconComponent"
          data-test="generic-input-icon-left"
          class="mr-1.5 w-4.5 h-4.5 min-w-4.5 min-h-4.5 text-placeholder-color"
          @click="() => emit('click-left-icon')"
        />
        <input
          ref="inputRef"
          data-test="input"
          class="w-full outline-none placeholder-placeholder-color input-autofill"
          :class="{ 'text-disabled-color placeholder-disabled-color bg-white': props.disabled }"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          v-bind="$attrs"
          :disabled="props.disabled"
          @input="onInput"
          @blur="startValidating"
          @keyup.enter="emit('key-enter')"
        >
        <component
          :is="rightIconComponent"
          v-if="rightIconComponent"
          data-test="generic-input-icon-right"
          class="ml-1.5 w-4.5 h-4.5 min-w-4.5 min-h-4.5 cursor-pointer text-placeholder-color"
          @click="() => emit('click-right-icon')"
        />
      </div>
    </div>
    <div class="my-1 ml-3.5 h-2 flex justify-between items-start">
      <div
        v-if="showHint"
        data-test="input-hint"
        :class="`flex flex-row items-start ${warningIconColor} ${hintStyle}`"
      >
        <WarningIcon
          class="mt-0.5 w-2.5 h-2.5 shrink-0"
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
        class="font-medium text-primary-main text-xs hover:text-primary-hover ml-2"
        tabIndex="-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ props.rightText }}
      </a>
    </div>
  </div>
</template>
