<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ChevronDown from './images/ChevronDown.vue';

const props = defineProps<{
  name: string,
  selected: string,
  options: Array<string>,
  showName: boolean,
  textColor: string,
  bgColor: string,
  bgHoverColor: string,
  focusRingColor: string,
}>();

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
        text-${textColor} bg-${bgColor} hover:bg-${bgHoverColor} focus:ring-2 justify-between
        focus:ring-${focusRingColor} font-medium rounded-md text-sm px-4 py-2.5 shadow-sm
        text-center inline-flex items-center w-full border border-slate-300 h-12
      `"
      @click="toggle"
    >
      <span
        v-if="showName"
        data-test="dropDownName"
        class="mr-1"
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
