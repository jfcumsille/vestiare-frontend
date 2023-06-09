<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRegistration } from '@/composables/registration';
import {
  ValidatePropType,
  ModelValuePropType,
  makeValidatedModelPropsDefaults,
  useValidatedModel,
} from '@/composables/validatedModel';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import { SizeType } from '@/interfaces/utilities/enums';

const props = withDefaults(defineProps<{
  size?: SizeType,
  label?: string,
  placeholder?: string,
  error?: string,
  // Validated Model
  modelValue: ModelValuePropType<string>,
  validations?: ValidatePropType<string>,
}>(), {
  size: SizeType.Medium,
  ...makeValidatedModelPropsDefaults<string>(),
});

const emit = defineEmits<{(e: 'update:modelValue', value: string): void}>();

useRegistration();

const {
  startValidating, valid, internalValid, error,
} = useValidatedModel(props);

const onInput = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).value);
};

const textAreaRef = ref<HTMLElement | null>(null);
const focusInput = () => {
  if (textAreaRef.value) {
    textAreaRef.value.focus();
  }
};

const textAreaColorClasses = computed(() => {
  if (!internalValid.value) {
    return 'text-body-color border-danger-main focus-within:ring-danger-focus focus-within:ring';
  }
  return `text-body-color border-main-border hover:border-primary-main bg-white
    focus-within:text-body-color focus-within:ring-primary-focus focus-within:border-primary-main
    focus-within:ring focus-within:bg-white`;
});

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

defineExpose({ valid });
</script>

<template>
  <div :class="`block h-full justify-center items-center ${sizeClasses} pt-3 pb-2`">
    <div class="relative">
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
        data-test="textarea-div"
        :class="`
          flex w-full p-3 border-1.5 border-border-color rounded-lg text-sm shadow-sm
          duration-100 ease-out cursor-text ${textAreaColorClasses}
        `"
        @click="focusInput"
      >
        <textarea
          ref="textAreaRef"
          data-test="textarea"
          class="w-full outline-none placeholder-placeholder-color"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          v-bind="$attrs"
          @input="onInput"
          @blur="startValidating"
        />
      </div>
    </div>
    <div class="my-1 ml-3.5 h-2">
      <div
        v-if="!internalValid"
        class="flex flex-row items-center text-danger-main my-1"
      >
        <WarningIcon
          class="mt-0.5 w-2.5 h-2.5 shrink-0"
          fill="currentColor"
        />
        <div class="text-sm">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>
