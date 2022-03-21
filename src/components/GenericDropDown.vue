<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ChevronDown from './images/ChevronDown.vue';

const props = withDefaults(defineProps<{
  name: string,
  selected: string,
  options: Array<string>,
  showName?: boolean,
  isColorPrimary?: boolean,
}>(), {
  showName: false,
  isColorPrimary: false,
});

const colorClasses = computed(() => (
  props.isColorPrimary
    ? 'text-white bg-primary-main hover:bg-primary-main-hover focus:ring-primary-border border-primary-border'
    : 'text-body-txt-color bg-white hover:bg-gray-100 focus:ring-bg-gray-300 border-slate-300'
));

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
</script>

<template>
  <div
    ref="dropDown"
    class="mt-1"
  >
    <button
      data-test="dropDownButton"
      :class="`
        focus:ring-2 justify-between font-medium rounded-md text-sm
        px-4 py-2.5 shadow-sm text-center inline-flex items-center
        w-full border h-12 ${colorClasses}
      `"
      @click="toggle"
    >
      <span
        v-if="showName"
        data-test="dropDownName"
        class="mr-1 min-w-fit"
      > {{ name }} - </span>
      {{ selected }}
      <ChevronDown />
    </button>

    <div
      data-test="dropDownList"
      class="
        absolute z-10 w-44 text-base list-none bg-white rounded cursor-pointer
        divide-y divide-gray-100 shadow-lg
      "
      :class="{ hidden: !opened }"
    >
      <ul class="py-1">
        <li
          v-for="option in props.options"
          :key="option"
        >
          <span
            class="block py-2 px-4 text-sm text-gray-700 font-normal hover:bg-gray-100"
            @click="() => select(option)"
          >
            {{ option }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
