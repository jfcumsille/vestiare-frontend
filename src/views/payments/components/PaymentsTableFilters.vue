<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslation } from '@/locales';
import { usePaymentsStore } from '@/stores/payments';
import { Nullable } from '@/interfaces/common';
import { FilterOption, PaymentIntentFilter } from '@/interfaces/utilities/table';
import { PaymentStatus, PaymentIntentFilterType } from '@/interfaces/utilities/enums';
import { resetFilters, getFilterValues } from '@/utils/table';
import { getOrder } from '@/utils/sets';
import DateFilter from '@/components/table/utils/DateFilter.vue';
import SearchFilter from '@/components/table/utils/SearchFilter.vue';
import OptionsFilter from '@/components/table/utils/OptionsFilter.vue';

const $t = useTranslation('views.payments.table.filters');
const $tTable = useTranslation('table.filters');

const paymentsStore = usePaymentsStore();

const emit = defineEmits<{
  (e: 'apply', filters: PaymentIntentFilter): void,
}>();

const statusFilters = ref<Array<FilterOption<PaymentStatus>>>([
  { name: $t('status.options.succeeded'), value: PaymentStatus.Succeeded, checked: false },
  { name: $t('status.options.rejected'), value: PaymentStatus.Rejected, checked: false },
  { name: $t('status.options.failed'), value: PaymentStatus.Failed, checked: false },
]);
const statusFilterSelectedValues = computed(() => getFilterValues(statusFilters.value));
const sinceDatestring = ref<Nullable<string>>(null);
const untilDatestring = ref<Nullable<string>>(null);
const fintocIDSearchString = ref<Nullable<string>>(null);
const senderHolderIDSearchString = ref<Nullable<string>>(null);

const addFilter = (filterType: PaymentIntentFilterType) => {
  paymentsStore.filtersShown.add(filterType);
  paymentsStore.filtersOpened.add(filterType);
};

const changeOpen = (filterType: PaymentIntentFilterType, openValue: boolean) => {
  if (openValue) {
    addFilter(filterType);
  } else {
    paymentsStore.filtersOpened.delete(filterType);
  }
};

const updateFilters = (filterType: Nullable<PaymentIntentFilterType>) => {
  const filterValues: PaymentIntentFilter = {
    status: statusFilterSelectedValues.value,
  };
  if (sinceDatestring.value && untilDatestring.value) {
    filterValues.since = sinceDatestring.value;
    filterValues.until = untilDatestring.value;
  }
  if (fintocIDSearchString.value) {
    filterValues.id = fintocIDSearchString.value;
  }
  if (senderHolderIDSearchString.value) {
    filterValues.senderHolderId = senderHolderIDSearchString.value;
  }
  if (filterType) {
    changeOpen(filterType, false);
  }
  emit('apply', filterValues);
};

const applyDateFilter = (since: string, until: string) => {
  sinceDatestring.value = since;
  untilDatestring.value = until;
  updateFilters(PaymentIntentFilterType.CreationDate);
};

const searchFintocID = (value: string) => {
  fintocIDSearchString.value = value;
  updateFilters(PaymentIntentFilterType.FintocID);
};

const searchSenderHolderID = (value: string) => {
  senderHolderIDSearchString.value = value;
  updateFilters(PaymentIntentFilterType.SenderHolderID);
};

const deleteDateFilter = () => {
  sinceDatestring.value = null;
  untilDatestring.value = null;
};

const deleteFintocIDSearch = async () => {
  fintocIDSearchString.value = null;
};

const deleteSenderHolderIDSearch = async () => {
  senderHolderIDSearchString.value = null;
};

const deleteStatusFilter = async () => {
  statusFilters.value = resetFilters(statusFilters.value);
};

const deleteFilter = (filterType: PaymentIntentFilterType) => {
  paymentsStore.filtersShown.delete(filterType);
  paymentsStore.filtersOpened.delete(filterType);
  if (filterType === PaymentIntentFilterType.CreationDate) {
    deleteDateFilter();
  }
  if (filterType === PaymentIntentFilterType.Status) {
    deleteStatusFilter();
  }
  if (filterType === PaymentIntentFilterType.FintocID) {
    deleteFintocIDSearch();
  }
  if (filterType === PaymentIntentFilterType.SenderHolderID) {
    deleteSenderHolderIDSearch();
  }
  updateFilters(null);
};
</script>

<template>
  <div class="flex flex-row space-x-4 min-h-12">
    <div
      v-if="paymentsStore.filtersShown.size > 0"
      class="min-w-max text-body-color pt-1"
    >
      {{ $tTable('filteredBy') }}
    </div>
    <div class="flex flex-wrap w-full gap-2">
      <OptionsFilter
        v-if="paymentsStore.filtersShown.has(PaymentIntentFilterType.Status)"
        :class="getOrder(PaymentIntentFilterType.Status, paymentsStore.filtersShown)"
        :label="(PaymentIntentFilterType.Status as string)"
        :label-type="$t('status.labelType')"
        :filters="statusFilters"
        :opened="paymentsStore.filtersOpened.has(PaymentIntentFilterType.Status)"
        :title="$t('status.title')"
        @apply="updateFilters(PaymentIntentFilterType.Status)"
        @open="changeOpen(PaymentIntentFilterType.Status, true)"
        @close="changeOpen(PaymentIntentFilterType.Status, false)"
        @delete="deleteFilter(PaymentIntentFilterType.Status)"
      />
      <DateFilter
        v-if="paymentsStore.filtersShown.has(PaymentIntentFilterType.CreationDate)"
        :class="getOrder(PaymentIntentFilterType.CreationDate, paymentsStore.filtersShown)"
        :label="$t('creationDate.label')"
        :opened="paymentsStore.filtersOpened.has(PaymentIntentFilterType.CreationDate)"
        :options-title="$t('creationDate.title')"
        :options-subtitle="$t('creationDate.subtitle')"
        @apply="applyDateFilter"
        @open="changeOpen(PaymentIntentFilterType.CreationDate, true)"
        @close="changeOpen(PaymentIntentFilterType.CreationDate, false)"
        @delete="deleteFilter(PaymentIntentFilterType.CreationDate)"
      />
      <SearchFilter
        v-if="paymentsStore.filtersShown.has(PaymentIntentFilterType.SenderHolderID)"
        :class="getOrder(PaymentIntentFilterType.SenderHolderID, paymentsStore.filtersShown)"
        :title="$t('senderHolderID.title')"
        :label="$t('senderHolderID.label')"
        :opened="paymentsStore.filtersOpened.has(PaymentIntentFilterType.SenderHolderID)"
        @search="searchSenderHolderID"
        @open="changeOpen(PaymentIntentFilterType.SenderHolderID, true)"
        @close="changeOpen(PaymentIntentFilterType.SenderHolderID, false)"
        @delete="deleteFilter(PaymentIntentFilterType.SenderHolderID)"
      />
      <SearchFilter
        v-if="paymentsStore.filtersShown.has(PaymentIntentFilterType.FintocID)"
        :class="getOrder(PaymentIntentFilterType.FintocID, paymentsStore.filtersShown)"
        :title="$t('fintocID.title')"
        :label="$t('fintocID.label')"
        :hint="$t('fintocID.hint')"
        :opened="paymentsStore.filtersOpened.has(PaymentIntentFilterType.FintocID)"
        :disabled="paymentsStore.loading"
        class="min-w-48"
        placeholder="pi_..."
        @search="searchFintocID"
        @open="changeOpen(PaymentIntentFilterType.FintocID, true)"
        @close="changeOpen(PaymentIntentFilterType.FintocID, false)"
        @delete="deleteFilter(PaymentIntentFilterType.FintocID)"
      />
    </div>
  </div>
</template>
