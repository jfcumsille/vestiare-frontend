<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useLinksStore } from '@/stores/links';
import { usePaymentsStore } from '@/stores/payments';
import { ButtonType } from '@/interfaces/utilities/enums';
import { FilterOption } from '@/interfaces/utilities/table';
import GenericCheckbox from '@/components/GenericCheckbox.vue';
import GenericButton from '@/components/GenericButton.vue';
import CrossIcon from '@/assets/svg/CrossIcon.vue';

const props = defineProps<{
  label: string,
  filters: Array<FilterOption<unknown>>,
  opened: boolean,
  optionsTitle?: string,
}>();

const emit = defineEmits<{
  (e: 'apply'): void,
  (e: 'open'): void,
  (e: 'close'): void,
  (e: 'delete'): void,
}>();

const linksStore = useLinksStore();
const paymentsStore = usePaymentsStore();

const appliedFilters = computed(() => props.filters.filter((filter) => filter.checked));

const filterInfo = computed(() => {
  const total = appliedFilters.value.length;
  if (total === 1) {
    return appliedFilters.value[0].name;
  }
  if (total > 1) {
    return `${total} Types`;
  }
  return '';
});

const openFilter = () => {
  emit('open');
};

const applyFilter = () => {
  emit('apply');
};

const deleteFilter = () => {
  if (!linksStore.loading || !paymentsStore.loading) {
    emit('delete');
  }
};

const tableFilter = ref(null);
onClickOutside(tableFilter, () => {
  emit('close');
});
</script>

<template>
  <div ref="tableFilter">
    <div
      class="text-primary-main whitespace-nowrap bg-primary-surface disabled:text-disabled-color
      rounded-full flex flex-row items-center space-x-1 pl-2 pr-1 py-1 capitalize"
      :disabled="linksStore.loading"
      @click="openFilter()"
    >
      <div> {{ props.label }} | {{ filterInfo }} </div>
      <CrossIcon
        class="cursor-pointer h-4 w-4 min-h-4 min-w-4"
        @click.stop="deleteFilter()"
      />
    </div>
    <div
      class="
        absolute mt-2 ml-1 text-base bg-white cursor-pointer
        shadow-lg rounded-lg z-50
      "
      :class="{ 'hidden': !props.opened }"
    >
      <div
        v-if="props.optionsTitle"
        class="py-3 px-4 text-body-color font-semibold text-base"
      >
        {{ props.optionsTitle }}
      </div>
      <GenericCheckbox
        v-for="filter in props.filters"
        :key="filter.name"
        v-model="filter.checked"
        class="py-3 px-4"
        :text="filter.name"
        @click="() => filter.checked = !filter.checked"
      />
      <div class="mx-1.5 mb-1.5">
        <GenericButton
          class="box-border w-full"
          :type="ButtonType.Primary"
          text="Apply"
          @click="applyFilter()"
        />
      </div>
    </div>
  </div>
</template>
