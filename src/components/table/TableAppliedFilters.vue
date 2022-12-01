<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import AppliedFilter from '@/components/table/utils/AppliedFilter.vue';
import { Filter } from '@/interfaces/utilities/table';

const $t = useTranslation('table.filters');

const props = defineProps<{
  appliedFilters: Array<Filter<unknown>>,
}>();
const emit = defineEmits<{
  (e: 'toggle', label: string, open: boolean): void,
  (e: 'apply'): void,
  (e: 'delete', label: string): void,
}>();

const openFilter = (label: string) => {
  emit('toggle', label, true);
};

const closeFilter = (label: string) => {
  emit('toggle', label, false);
};

const applyFilter = () => {
  emit('apply');
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
        v-for="filters in props.appliedFilters"
        :key="filters.label"
      >
        <AppliedFilter
          :label="(filters.label as string)"
          :filters="filters.values"
          :opened="filters.open"
          @apply="applyFilter()"
          @close="closeFilter(filters.label)"
          @delete="deleteFilter(filters.label)"
          @click="openFilter(filters.label)"
        />
      </div>
    </div>
  </div>
</template>
