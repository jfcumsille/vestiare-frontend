<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { usePaymentsStore } from '@/stores/payments';
import { useConfigStore } from '@/stores/config';
import { Account } from '@/interfaces/entities/account';
import { PaymentIntent } from '@/interfaces/entities/paymentIntents';
import { DOCS_PAYMENTS } from '@/constants/urls';
import {
  Mode, PaymentStatus, CountryCode,
} from '@/interfaces/utilities/enums';
import { PaymentIntentFilter } from '@/interfaces/utilities/table';
import { page } from '@/services/analytics';
import { DASHBOARD_ORIGIN, PAYMENTS_VIEWED } from '@/constants/analyticsEvents';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericTable from '@/components/table/GenericTable.vue';
import TablePagination from '@/components/table/TablePagination.vue';
import PaymentsTableHead from '@/views/payments/components/PaymentsTableHead.vue';
import PaymentsTableRow from '@/views/payments/components/PaymentsTableRow.vue';
import PaymentsTableAppliedFilters from '@/views/payments/components/PaymentsTableAppliedFilters.vue';

const $t = useTranslation('views.payments');
const paymentsStore = usePaymentsStore();
const configStore = useConfigStore();
const isLive = computed(() => configStore.mode === Mode.Live);

const applyFilter = async (filters: Record<string, Array<PaymentStatus>>) => {
  const allFilters: PaymentIntentFilter = filters;
  await paymentsStore.updateFilters(allFilters);
};

const isTableEmpty = computed(() => (
  paymentsStore.paginatedPaymentIntents.length === 0
));

const emptyTableSubtitle = computed(() => (
  isLive.value ? $t('table.empty.title.live') : $t('table.empty.title.test')
));

const fakeAccount: Account = {
  holderId: '111111111',
  holderName: 'Example Name',
  number: '11111111',
  type: 'checking_account',
  institution: {
    id: 'cl_example_bank',
    country: CountryCode.CL,
    name: 'Example Bank',
  },
};
const fakePaymentIntent: PaymentIntent = {
  id: 'pi_123456789',
  amount: 100000,
  currency: 'CLP',
  createdAt: '2022-01-01T18:00:00Z',
  recipientAccount: fakeAccount,
  referenceId: 'id',
  senderAccount: fakeAccount,
  status: PaymentStatus.Succeeded,
};

onMounted(async () => {
  page(PAYMENTS_VIEWED, {
    origin: DASHBOARD_ORIGIN,
  });
  await paymentsStore.updateFilters({});
});
</script>

<template>
  <div
    data-test="payments-view"
    class="flex items-center p-10"
  >
    <div class="w-full">
      <div class="flex flex-row justify-between">
        <div class="text-3xl text-heading-color self-start mb-6 font-semibold">
          {{ $t('title_other') }}
        </div>
      </div>
      <a
        class="text-primary-main font-thin"
        :href="DOCS_PAYMENTS"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('urls.whatAre') }}
      </a>
      <div class="flex flex-row justify-between space-x-4">
        <div class="mt-2 mb-6 text-body-color font-thin max-w-2xl">
          {{ $t('subtitle') }}
        </div>
        <a
          class="text-primary-main font-thin min-w-fit"
          :href="DOCS_PAYMENTS"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('table.empty.learnMore') }}
        </a>
      </div>
      <GenericTable>
        <template #top-section>
          <div class="flex flex-row justify-between items-start space-x-4 w-full mb-6">
            <PaymentsTableAppliedFilters
              @apply="applyFilter"
            />
          </div>
        </template>

        <template #head>
          <PaymentsTableHead />
        </template>

        <template #content>
          <PaymentsTableRow
            v-for="paymentIntent in paymentsStore.paginatedPaymentIntents"
            :key="paymentIntent.id"
            :payment-intent="paymentIntent"
          />
          <PaymentsTableRow
            v-if="isTableEmpty && !paymentsStore.loading && !isLive"
            :key="fakePaymentIntent.id"
            :payment-intent="fakePaymentIntent"
          />
        </template>
        <template
          v-if="isTableEmpty && !paymentsStore.loading"
          #empty-table
        >
          <div
            class="w-full flex flex-col items-center py-8 space-y-4"
          >
            <div class="text-body-color max-w-md text-sm text-center">
              {{ emptyTableSubtitle }}
            </div>
            <a
              class="text-primary-main font-thin"
              :href="DOCS_PAYMENTS"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ $t('table.empty.learnHow') }}
            </a>
          </div>
        </template>
        <template #pagination>
          <TablePagination
            :loading="paymentsStore.loading"
            :current-page="paymentsStore.currentPage"
            :page-size="paymentsStore.pageSize"
            :total-results="paymentsStore.total"
            :result-item-text="$t('title', { count: paymentsStore.total})"
            @update-page-size="paymentsStore.updatePageSize"
            @change-page-by="paymentsStore.changeCurrentPageBy"
          />
        </template>
      </GenericTable>
      <div
        v-if="paymentsStore.loading"
        class="flex justify-center w-full py-20"
      >
        <LoadingSpinner />
      </div>
    </div>
  </div>
</template>
