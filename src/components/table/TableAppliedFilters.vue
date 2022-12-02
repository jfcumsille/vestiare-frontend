<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import AppliedFilter from '@/components/table/utils/AppliedFilter.vue';
import { Filter } from '@/interfaces/utilities/table';

const $t = useTranslation('table.filters');

const props = defineProps<{
  appliedFilters: Array<Filter<unknown>>,
  optionsTitle?: string,
}>();
const emit = defineEmits<{
  (e: 'toggle', label: string, open: boolean): void,
  (e: 'apply', label: string): void,
  (e: 'delete', label: string): void,
}>();

const openFilter = (label: string) => {
  emit('toggle', label, true);
};

const closeFilter = (label: string) => {
  emit('toggle', label, false);
};

const applyFilter = (label: string) => {
  emit('apply', label);
};

const deleteFilter = (label: string) => {
  emit('delete', label);
};

const showFilteredBy = computed(() => props.appliedFilters.length > 0);
</script>

<template>
  <div class="flex flex-row space-x-4 min-h-12">
    <div
      v-if="showFilteredBy"
      class="min-w-max text-body-color pt-1"
    >
      {{ $t('filteredBy') }}
    </div>
    <div class="flex flex-wrap w-full gap-2">
      <div
        v-for="filter in props.appliedFilters"
        :key="filter.label"
      >
        <AppliedFilter
          :label="(filter.label as string)"
          :filters="filter.values"
          :opened="filter.open"
          :options-title="props.optionsTitle"
          @apply="applyFilter(filter.label)"
          @open="openFilter(filter.label)"
          @close="closeFilter(filter.label)"
          @delete="deleteFilter(filter.label)"
        />
      </div>
    </div>
  </div>
</template>
