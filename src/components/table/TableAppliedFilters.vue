<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import AppliedFilter from '@/components/table/utils/AppliedFilter.vue';

const $t = useTranslation('table.filters');

const props = defineProps<{
  appliedFilters: unknown,
}>();
const emit = defineEmits<{
  (e: 'toggle'): void,
  (e: 'apply'): void,
  (e: 'delete'): void,
}>();

const openFilter = (label: string) => {
  emit('toggle', {
    label,
    open: true,
  });
};

const closeFilter = (label: string) => {
  emit('toggle', {
    label,
    open: false,
  });
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
  <div class="flex flex-row space-x-4">
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
          :label="filters.label"
          :filters="filters.values"
          :opened="filters.open"
          :show="filters.show"
          @apply="applyFilter()"
          @close="closeFilter(filters.label)"
          @delete="deleteFilter(filters.label)"
          @click="openFilter(filters.label)"
        />
      </div>
    </div>
  </div>
</template>
