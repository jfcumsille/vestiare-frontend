<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useTranslation } from '@/locales';

const $props = defineProps<{
  name: string,
  selected: string,
  options: Array<string>,
  translationNamespace: string,
}>();

const $emit = defineEmits<{(e: 'select', selected: string): void }>();

const $t = useTranslation(`${$props.translationNamespace}.options`);

const opened = ref(false);
const dropDown = ref(null);

const toggle = () => {
  opened.value = !opened.value;
};

const select = (option: string) => {
  $emit('select', option);
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
      class="
        text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
        focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5
        text-center inline-flex items-center
      "
      @click="toggle"
    >
      {{ name }} - {{ $t(selected) }} <svg
        class="ml-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      /></svg>
    </button>

    <div
      class="
        absolute z-10 w-44 text-base list-none bg-white rounded cursor-pointer
        divide-y divide-gray-100 shadow
      "
      :class="{ hidden: !opened }"
    >
      <ul class="py-1">
        <li
          v-for="option in $props.options"
          :key="option"
        >
          <span
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
            @click="() => select(option)"
          >
            {{ $t(option) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
