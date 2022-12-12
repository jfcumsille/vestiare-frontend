<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTranslation } from '@/locales';
import { usePaymentsStore } from '@/stores/payments';
import { Nullable } from '@/interfaces/common';
import { FilterOption, PaymentIntentFilter } from '@/interfaces/utilities/table';
import { PaymentStatus, PaymentIntentFilterType } from '@/interfaces/utilities/enums';
import {
  addFilter, removeFilter, getIndex, getFilterValues, resetFilters,
} from '@/utils/table';
import TableAppliedFilters from '@/components/table/TableAppliedFilters.vue';
import DateFilter from '@/components/table/utils/DateFilter.vue';

const $t = useTranslation('views.payments.table.filters');
const paymentsStore = usePaymentsStore();

const emit = defineEmits<{
  (e: 'apply', filters: PaymentIntentFilter): void,
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
  if (label === PaymentIntentFilterType.CreationDate) {
    paymentsStore.openedCreationDate = open;
    return;
  }
  const index = getIndex(label, filters.value);
  removeFilter(index, filters.value);
  if (label === PaymentIntentFilterType.Status) {
    paymentsStore.openedStatus = open;
    addFilter(index, statusAppliedFilter.value, filters.value);
  }
};

const sinceDatestring = ref<Nullable<string>>(null);
const untilDatestring = ref<Nullable<string>>(null);

const applyFilter = (label: Nullable<string>) => {
  const filterValues: PaymentIntentFilter = {
    status: statusFilterSelectedValues.value,
  };
  if (sinceDatestring.value && untilDatestring.value) {
    filterValues.since = sinceDatestring.value;
    filterValues.until = untilDatestring.value;
  }
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

const applyDateFilter = (since: string, until: string) => {
  sinceDatestring.value = since;
  untilDatestring.value = until;
  applyFilter(PaymentIntentFilterType.CreationDate);
};

const changeOpenDate = (value: boolean) => {
  paymentsStore.openedCreationDate = value;
};

const deleteDateFilter = async () => {
  paymentsStore.openedCreationDate = false;
  paymentsStore.showCreationDate = false;
  sinceDatestring.value = null;
  untilDatestring.value = null;
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
  <div>
    <TableAppliedFilters
      :show="filters.length > 0 || paymentsStore.showCreationDate"
      :applied-filters="filters"
      :options-title="$t('status.title')"
      @apply="applyFilter"
      @delete="deleteFilter"
      @toggle="toggleFilter"
    >
      <DateFilter
        v-if="paymentsStore.showCreationDate"
        :label="$t('creationDate.label')"
        :opened="paymentsStore.openedCreationDate"
        :options-title="$t('creationDate.title')"
        :options-subtitle="$t('creationDate.subtitle')"
        @apply="applyDateFilter"
        @open="changeOpenDate(true)"
        @close="changeOpenDate(false)"
        @delete="deleteDateFilter"
      />
    </TableAppliedFilters>
  </div>
</template>
