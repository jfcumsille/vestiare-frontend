<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import FilterIcon from '@/assets/svg/FilterIcon.vue';
import GenericCheckbox from '@/components/GenericCheckbox.vue';

const props = defineProps<{
  label: string,
  options: Record<string, unknown>,
}>();

const opened = ref(false);
const toggle = () => {
  opened.value = !opened.value;
};

const tableFilter = ref(null);
onClickOutside(tableFilter, () => {
  opened.value = false;
});
</script>

<template>
  <div
    ref="tableFilter"
    class="whitespace-nowrap"
  >
    <button
      data-test="generic-button"
      class="flex flex-row items-center justify-center rounded-lg font-medium min-w-max space-x-1"
      @click="toggle"
    >
      <FilterIcon class="w-4 h-4" />
      <div>
        {{ props.label }}
      </div>
    </button>
    <div
      class="
        absolute z-10 text-base bg-white cursor-pointer mt-3.5
        shadow-lg rounded-lg
      "
      :class="{ 'hidden': !opened }"
    >
      <GenericCheckbox
        v-for="option in props.options"
        :key="option.name"
        v-model="option.checked"
        class="py-4 px-5"
        :text="option.name"
      />
    </div>
  </div>
</template>
