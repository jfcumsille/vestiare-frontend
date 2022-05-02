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

const props = withDefaults(defineProps<{
  label?: string,
  placeholder?: string,
  error?: string,
  // Validated Model
  modelValue: ModelValuePropType<string>,
  validations?: ValidatePropType<string>,
}>(), { ...makeValidatedModelPropsDefaults<string>() });

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
        data-test="textarea-div"
        :class="`
          flex w-full p-3 border-1.5 border-border-color rounded-lg text-sm shadow-sm
          duration-100 ease-out cursor-text ${textAreaColorClasses}
        `"
        tabIndex="0"
        @click="focusInput"
      >
        <textarea
          ref="textAreaRef"
          data-test="textarea"
          class="w-full outline-none placeholder-placeholder-color"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          v-bind="$attrs"
          tabIndex="-1"
          @input="onInput"
          @blur="startValidating"
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
