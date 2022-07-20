<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { SizeType, PositionType } from '@/interfaces/utilities/enums';
import { DropdownOption } from '@/interfaces/utilities/dropdownOption';
import ChevronIcon from '@/assets/svg/ChevronIcon.vue';
import LockIcon from '@/assets/svg/LockIcon.vue';

const props = withDefaults(defineProps<{
  label?: string,
  selected: string,
  options: Array<string | DropdownOption>,
  textPrefix?: string,
  capitalizeOptions?: boolean,
  size?: SizeType,
  inline?: boolean,
  disabled?: boolean,
  position?: PositionType
}>(), {
  capitalizeOptions: false,
  size: SizeType.Hug,
  position: PositionType.Relative,
});

const emit = defineEmits<{(e: 'select', selected: string): void }>();

const opened = ref(false);
const dropDown = ref(null);

const toggle = () => {
  opened.value = !opened.value;
};

const select = (option: string) => {
  emit('select', option);
  opened.value = false;
};

onClickOutside(dropDown, () => {
  opened.value = false;
});

const title = computed(() => {
  if (props.selected) {
    if (props.textPrefix) {
      return `${props.textPrefix} - ${props.selected}`;
    }
    return props.selected;
  }
  return '';
});

const capitalizeOptionsClass = computed(() => (props.capitalizeOptions ? 'capitalize' : ''));

const sizeClasses = computed(() => {
  switch (props.size) {
    case SizeType.Hug:
      return '';
    case SizeType.Small:
      return 'w-full max-w-50';
    case SizeType.Medium:
      return 'w-full max-w-80';
    case SizeType.Large:
      return 'w-full max-w-104';
    case SizeType.XLarge:
      return 'w-full max-w-158';
    default:
      return 'w-full max-w-80';
  }
});

const optionValue = (option: string | DropdownOption) => (typeof option === 'string' ? option : option.value);
const optionLabel = (option: string | DropdownOption) => (typeof option === 'string' ? option : option.label);

const colorClasses = computed(() => (props.inline ? 'text-primary-main' : 'text-placeholder-color'));
const buttonStyle = computed(() => (props.inline ? 'border-none text-primary-main' : 'bg-white text-body-color'));
const hidden = computed(() => (opened.value ? '' : 'hidden'));
</script>

<template>
  <div
    ref="dropDown"
    :class="`${props.position} h-12 ${sizeClasses}`"
  >
    <label
      v-if="props.label"
      data-test="label"
      class="
          absolute left-0 -mt-3 px-1 mx-2 pointer-events-none whitespace-nowrap
          text-sm text-placeholder-color bg-white capitalize min-w-fit
        "
    >
      {{ props.label }}
    </label>
    <button
      data-test="drop-down-button"
      :disabled="props.disabled"
      :class="`
        flex items-center justify-between rounded-lg font-medium min-w-max p-3
        disabled:bg-light-gray disabled:text-disabled-color
        border-1.5 border-border-color text-sm
        ${buttonStyle} ${sizeClasses} ${capitalizeOptionsClass}`
      "
      type="button"
      @click="toggle"
    >
      <div> {{ title }} </div>
      <ChevronIcon
        v-if="!disabled"
        :class="`ml-1.5 w-4 h-4 rotate-90 ${colorClasses}`"
      />
      <LockIcon
        v-else
        class="ml-1.5 w-4 h-4 text-disabled-color"
        data-test="drop-down-lock-icon"
      />
    </button>
    <div
      data-test="drop-down-list"
      :class="`
        absolute z-10 text-base list-none bg-white cursor-pointer mt-1 ${sizeClasses}
        divide-y divide-divider-color shadow-lg rounded-lg ${hidden}
      `"
    >
      <ul class="py-1">
        <li
          v-for="option in props.options"
          :key="optionValue(option)"
        >
          <span
            :class="`
              block py-2 px-4 text-sm bg-white text-body-color font-medium
              focus:bg-primary-surface focus:text-primary-main
              hover:bg-primary-surface hover:text-primary-hover
              active:bg-primary-border active:text-primary-main
              ${capitalizeOptionsClass}`
            "
            @click="() => select(optionValue(option))"
          >
            {{ optionLabel(option) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
