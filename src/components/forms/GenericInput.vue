<script setup lang="ts">
import { computed, ComponentPublicInstance, ref } from 'vue';
import { HorizontalPositionType } from '@/interfaces/utilities/enums';
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
  iconName?: string,
  iconPosition?: HorizontalPositionType,
  // Validated Model
  modelValue: ModelValuePropType<string>,
  validations?: ValidatePropType<string>,
}>(), {
  iconPosition: HorizontalPositionType.Left,
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
  document.getElementById(props.inputId).focus();
  emit('update:modelValue', ($event.target as HTMLInputElement).value);
};

const onBlur = () => {
  isInputActive.value = false;
  startValidating();
};

const iconComponent = computed((): Nullable<ComponentPublicInstance> => {
  if (props.iconName && (props.iconName in icons)) {
    return icons[props.iconName];
  }
  return null;
});

const showLeftIcon = computed(() => {
  const isIconPositionLeft = props.iconPosition === HorizontalPositionType.Left;
  return (iconComponent.value && isIconPositionLeft);
});

const showRightIcon = computed(() => {
  const isIconPositionRight = props.iconPosition === HorizontalPositionType.Right;
  return (iconComponent.value && isIconPositionRight);
});

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
  if (!internalValid.value) {
    return `
      text-danger-main border-danger-main placeholder-placeholder-color
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

defineExpose({ valid });
</script>

<template>
  <div class="block h-full justify-center items-center">
    <div class="relative w-full">
      <label
        v-if="props.label"
        data-test="label"
        class="
          absolute left-0 -mt-3 px-1 mx-2 pointer-events-none
          text-sm text-placeholder-color bg-white
        "
      >
        {{ props.label }}
      </label>
      <div
        :class="`
          flex w-full p-3 border-1.5 border-border-color rounded-lg shadow-sm
          text-sm duration-100 ease-out ${inputColorClasses}
        `"
        tabIndex="0"
        @click="focusInput"
      >
        <component
          :is="iconComponent"
          v-if="showLeftIcon"
          data-test="generic-input-icon-left"
          class="mr-1.5 w-4.5 h-4.5"
          @click="clickIcon('left')"
        />
        <input
          :id="props.inputId"
          data-test="input"
          class="w-full outline-none"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          v-bind="$attrs"
          tabIndex="-1"
          @input="onInput"
          @blur="onBlur"
        >
        <component
          :is="iconComponent"
          v-if="showRightIcon"
          data-test="generic-input-icon-right"
          class="ml-1.5 w-4.5 h-4.5"
          @click="clickIcon('right')"
        />
      </div>
    </div>
    <div
      v-if="!internalValid"
      class="flex flex-row items-center text-danger-main my-1"
    >
      <WarningIcon
        class="mx-1 w-2.5 h-2.5"
        fill="currentColor"
      />
      <div class="text-sm">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #4A4672 !important;
}
</style>
