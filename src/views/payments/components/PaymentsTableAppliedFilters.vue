<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTranslation } from '@/locales';
import { usePaymentsStore } from '@/stores/payments';
import { Nullable } from '@/interfaces/common';
import { FilterOption } from '@/interfaces/utilities/table';
import { PaymentStatus, PaymentIntentFilterType } from '@/interfaces/utilities/enums';
import {
  addFilter, removeFilter, getIndex, getFilterValues, resetFilters,
} from '@/utils/table';
import TableAppliedFilters from '@/components/table/TableAppliedFilters.vue';

const $t = useTranslation('views.payments.table.filters');
const paymentsStore = usePaymentsStore();

const emit = defineEmits<{
  (e: 'apply', filters: Record<string, Array<PaymentStatus>>): void,
  (e: 'reset', label: PaymentIntentFilterType, open: boolean): void,
}>();

const filters = ref([]);

const statusFilters = ref<Array<FilterOption<PaymentStatus>>>([
  { name: $t('status.options.succeeded'), value: PaymentStatus.Succeeded, checked: false },
  { name: $t('status.options.rejected'), value: PaymentStatus.Rejected, checked: false },
  { name: $t('status.options.failed'), value: PaymentStatus.Failed, checked: false },
]);
const statusFilterSelectedValues = computed(() => getFilterValues(statusFilters.value));

const statusAppliedFilter = computed(() => (
  {
    label: PaymentIntentFilterType.Status,
    values: statusFilters.value,
    open: paymentsStore.openedStatus,
  }
));

const toggleFilter = (label: string, open: boolean) => {
  const index = getIndex(label, filters.value);
  removeFilter(index, filters.value);
  if (label === PaymentIntentFilterType.Status) {
    paymentsStore.openedStatus = open;
    addFilter(index, statusAppliedFilter.value, filters.value);
  }
};

const applyFilter = (label: Nullable<string>) => {
  const filterValues = {
    status: statusFilterSelectedValues.value,
  };
  if (label) {
    toggleFilter(label, false);
  }
  emit('apply', filterValues);
};

const deleteFilter = async (label: string) => {
  const index = getIndex(label, filters.value);
  removeFilter(index, filters.value);
  if (label === PaymentIntentFilterType.Status) {
    paymentsStore.openedStatus = false;
    statusFilters.value = resetFilters(statusFilters.value);
  }
  applyFilter(null);
};

watch(() => paymentsStore.openedStatus, () => {
  if (paymentsStore.openedStatus) {
    const index = getIndex(PaymentIntentFilterType.Status as string, filters.value);
    removeFilter(index, filters.value);
    addFilter(index, statusAppliedFilter.value, filters.value);
  }
});
</script>

<template>
  <TableAppliedFilters
    :applied-filters="filters"
    :options-title="$t('title')"
    @toggle="toggleFilter"
    @delete="deleteFilter"
    @apply="applyFilter"
  />
</template>
