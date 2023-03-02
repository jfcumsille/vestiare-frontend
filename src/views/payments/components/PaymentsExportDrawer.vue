<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocale } from '@/composables/locale';
import { useTranslation } from '@/locales';
import { usePaymentsStore } from '@/stores/payments';
import {
  FileFormat, DateStyle, CountryCode, SizeType,
} from '@/interfaces/utilities/enums';
import { formatDate, formatTime, formatTimezone } from '@/utils/date';
import GenericDrawer from '@/components/GenericDrawer.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import CheckIcon from '@/assets/svg/CheckIcon.vue';

const locale = useLocale();
const $t = useTranslation('views.payments.exportDrawer');
const paymentsStore = usePaymentsStore();

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const close = async () => {
  paymentsStore.exportReady = false;
  paymentsStore.exportTimeout = false;
  emit('close');
};

const hasDateFilter = computed(() => (
  paymentsStore.allFilters.since !== undefined && paymentsStore.allFilters.until !== undefined
));

const hasStatusFilter = computed(() => (
  paymentsStore.allFilters.status !== undefined ? paymentsStore.allFilters.status.length > 0 : false
));

const fileFormat = ref(FileFormat.Csv);
const formats = [FileFormat.Csv, FileFormat.Excel];
const selectFormat = (value: string) => {
  fileFormat.value = value as FileFormat;
};

const columnNames = [
  'Fintoc Payment Id',
  'Reference Id',
  'Creation Date',
  'Transaction Date',
  'Sender Name',
  'Sender Id',
  'Sender Bank',
  'Sender Account Number',
  'Sender Account Type',
  'Recipient Name',
  'Recipient Id',
  'Recipient Bank',
  'Recipient Account Number',
  'Recipient Account Type',
  'Amount',
  'Currency',
  'Status',
  'Fintoc Error Reason',
  'Metadata',
];

const exportPaymentIntents = async () => {
  await paymentsStore.exportPaymentIntents(fileFormat.value);
};

const exportTitle = computed(() => {
  if (paymentsStore.exportReady) {
    return $t('exportReady');
  }
  if (paymentsStore.exportTimeout) {
    return $t('exportTimeout');
  }
  return '';
});

const exportSubtitle = computed(() => {
  if (paymentsStore.exportReady) {
    return $t('exportReadySubtitle');
  }
  if (paymentsStore.exportTimeout) {
    return $t('exportTimeoutSubtitle');
  }
  return '';
});
</script>
<template>
  <GenericDrawer
    :title="$t('title')"
    :button-title="$t('download')"
    :loading-button="paymentsStore.loading"
    :open="props.open"
    class="text-body-color"
    @done="exportPaymentIntents"
    @close="close"
  >
    <div
      v-if="paymentsStore.exportReady || paymentsStore.exportTimeout"
      class="space-y-8 max-w-xs"
    >
      <CheckIcon class="w-12 h-12 min-w-12 min-h-12 text-success-main" />
      <div
        data-test="title"
        class="font-medium"
      >
        {{ exportTitle }}
      </div>
      <div data-test="subtitle">
        {{ exportSubtitle }}
      </div>
      <div
        v-if="paymentsStore.exportTimeout"
        data-test="subtitle2"
      >
        {{ $t('exportTimeoutSubtitle2') }}
      </div>
    </div>
    <div
      v-if="paymentsStore.loading && !paymentsStore.exportReady && !paymentsStore.exportTimeout"
      class="space-y-8 min-w-xs max-w-xs"
    >
      <LoadingSpinner class="min-w-12 min-h-12" />
      <div> {{ $t('downloadBegun') }} </div>
    </div>
    <div
      v-if="!paymentsStore.loading && !paymentsStore.exportReady && !paymentsStore.exportTimeout"
      class="space-y-8 min-w-xs max-w-xs"
    >
      <div class="space-y-4">
        <div>
          {{ $t('download') }}
          <span class="font-semibold">{{ paymentsStore.total }}</span>
          {{ $t('transactions') }}
        </div>
        <div> {{ $t('selectFormat') }} </div>
        <GenericDropDown
          :label="$t('format')"
          :size="SizeType.Medium"
          :selected="fileFormat"
          :options="formats"
          @select="selectFormat"
        />
      </div>
      <div class="space-y-4 text-disabled-color">
        <div>{{ $t('filters') }}</div>
        <div class="flex flex-row space-x-7 text-sm">
          <input
            type="checkbox"
            class="w-4 h-4 shrink-0"
            :checked="hasDateFilter"
            disabled
          >
          <div>
            <div class="mb-2 font-medium">
              {{ $t('dateBetween') }}
            </div>
            <div
              v-if="hasDateFilter"
              class="flex flex-col space-y-1"
            >
              <div>
                {{ formatDate(paymentsStore.allFilters.since!, DateStyle.Short, locale) }}
                - {{ formatTime(paymentsStore.allFilters.since!, locale) }}
              </div>
              <div> {{ $t('and') }} </div>
              <div>
                {{ formatDate(paymentsStore.allFilters.until!, DateStyle.Short, locale) }}
                - {{ formatTime(paymentsStore.allFilters.until!, locale) }}
              </div>
              <div>
                {{ $t('timesIn') }}
                {{ formatTimezone(CountryCode.CL, locale, paymentsStore.allFilters.since!) }}.
              </div>
            </div>
            <div v-else>
              {{ $t('noDateFilter') }}
            </div>
          </div>
        </div>

        <div class="flex flex-row space-x-7 text-sm">
          <input
            type="checkbox"
            class="w-4 h-4 shrink-0"
            :checked="hasStatusFilter"
            disabled
          >
          <div>
            <div class="mb-2 font-medium">
              {{ $t('statusIncludes') }}
            </div>
            <div v-if="!hasStatusFilter">
              {{ $t('noStatusFilter') }}
            </div>
            <div
              v-else
              class="space-y-1"
            >
              <div
                v-for="status in paymentsStore.allFilters.status"
                :key="status"
              >
                {{ status }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-disabled-color">
        {{ $t('columns') }}
        <div class="mt-4 flex flex-row space-x-7 items-start">
          <input
            class="mt-1"
            type="radio"
            checked
            disabled
          >
          <div class="flex flex-col max-w-xs space-y-1">
            <div> {{ $t('default') }} </div>
            <div
              v-for="column in columnNames"
              :key="column"
              class="space-y-2"
            >
              {{ column }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </GenericDrawer>
</template>
