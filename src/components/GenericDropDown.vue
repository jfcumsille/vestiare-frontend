<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ChevronDown from '@/assets/svg/ChevronDown.vue';

const props = withDefaults(defineProps<{
  label?: string,
  selected: string,
  options: Array<string>,
  textPrefix?: string,
  isWidthFull?: boolean,
}>(), {
  isWidthFull: false,
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

const width = computed(() => (props.isWidthFull ? 'w-full' : ''));
</script>

<template>
  <div
    ref="dropDown"
    class="relative h-12"
  >
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
    <button
      data-test="drop-down-button"
      :class="`
        flex items-center justify-between rounded-lg font-medium min-w-max p-3 bg-white
        disabled:bg-light-gray disabled:text-disabled-color
        border-1.5 border-border-color text-sm capitalize
        text-body-color ${width}`
      "
      @click="toggle"
    >
      <div> {{ title }} </div>
      <ChevronDown
        class="ml-1.5 text-placeholder-color w-4 h-4"
      />
    </button>
    <div
      data-test="drop-down-list"
      class="
        absolute z-10 text-base list-none bg-white cursor-pointer mt-1 w-full
        divide-y divide-divider-color shadow-lg rounded-lg capitalize
      "
      :class="{ 'hidden': !opened }"
    >
      <ul class="py-1">
        <li
          v-for="option in props.options"
          :key="option"
        >
          <span
            class="
              block py-2 px-4 text-sm text-body-color font-medium
              hover:bg-light-gray hover:text-primary-hover
            "
            @click="() => select(option)"
          >
            {{ option }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
