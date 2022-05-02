<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRegistration } from '@/composables/registration';
import {
  ValidatePropType,
  ModelValuePropType,
  makeValidatedModelPropsDefaults,
  useValidatedModel,
} from '@/composables/validatedModel';
import WarningIcon from '@/assets/svg/WarningIcon.vue';

const props = withDefaults(defineProps<{
  textAreaId: string,
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

const isTextAreaActive = ref(false);
const onInput = ($event: Event) => {
  isTextAreaActive.value = true;
  emit('update:modelValue', ($event.target as HTMLInputElement).value);
};

const onBlur = () => {
  startValidating();
  isTextAreaActive.value = false;
};

const focusInput = () => {
  document.getElementById(props.textAreaId).focus();
  if (document.activeElement === document.getElementById(props.textAreaId)) {
    isTextAreaActive.value = true;
  }
};

const textAreaColorClasses = computed(() => {
  if (!internalValid.value) {
    if (isTextAreaActive.value) {
      return `
      text-danger-main placeholder-placeholder-color
      ring-danger-focus border-danger-main ring bg-white
    `;
    }
    return `
      text-danger-main border-danger-border placeholder-placeholder-color
      focus:ring-danger-focus focus:border-danger-focus
    `;
  }
  if (isTextAreaActive.value) {
    return `
    text-body-color placeholder-placeholder-color
    ring-primary-focus border-primary-main ring bg-white
  `;
  }
  return `
    text-body-color border-main-border placeholder-placeholder-color
    hover:border-primary-main bg-white 
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
        data-test="textarea-div"
        :class="`
          flex w-full p-3 border-1.5 border-border-color rounded-lg text-sm shadow-sm
          duration-100 ease-out ${textAreaColorClasses}
        `"
        tabIndex="0"
        @click="focusInput"
      >
        <textarea
          :id="props.textAreaId"
          data-test="textarea"
          class="w-full outline-none"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          v-bind="$attrs"
          tabIndex="-1"
          @input="onInput"
          @blur="onBlur"
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
