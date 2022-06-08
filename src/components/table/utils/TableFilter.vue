<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import FilterIcon from '@/assets/svg/FilterIcon.vue';
import GenericCheckbox from '@/components/GenericCheckbox.vue';
import GenericButton from '@/components/GenericButton.vue';
import { ButtonType } from '@/interfaces/utilities/enums';
import { Filter } from '@/interfaces/utilities/table';

const props = defineProps<{
  label: string,
  filters: Array<Filter<unknown>>,
}>();

const emit = defineEmits<{(e: 'apply'): void }>();

const filtersAmount = computed(() => {
  let total = 0;
  props.filters.forEach((filter) => {
    if (!filter.checked) {
      total += 1;
    }
  });
  return total;
});

const title = computed(() => {
  const amountText = `(${filtersAmount.value})`;
  if (filtersAmount.value > 0) {
    return `${props.label} ${amountText}`;
  }
  return props.label;
});

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
      class="flex flex-row items-center justify-center rounded-lg font-medium min-w-max space-x-1"
      @click="toggle"
    >
      <FilterIcon class="w-4 h-4" />
      <div>
        {{ title }}
      </div>
    </button>
    <div
      class="
        absolute text-base bg-white cursor-pointer mt-3.5
        shadow-lg rounded-lg z-50
      "
      :class="{ 'hidden': !opened }"
    >
      <GenericCheckbox
        v-for="filter in props.filters"
        :key="filter.name"
        v-model="filter.checked"
        class="p-4"
        :text="filter.name"
      />
      <div class="m-1.5">
        <GenericButton
          class="box-border w-full"
          :type="ButtonType.Primary"
          text="Apply"
          @click="() => emit('apply')"
        />
      </div>
    </div>
  </div>
</template>
