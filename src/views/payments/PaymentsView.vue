<script setup lang="ts">
import {
  ref, computed, onMounted, onUnmounted,
} from 'vue';
import { useTranslation } from '@/locales';
import { usePaymentsStore } from '@/stores/payments';
import { useConfigStore } from '@/stores/config';
import { Account } from '@/interfaces/entities/account';
import { PaymentIntent } from '@/interfaces/entities/paymentIntents';
import { Nullable } from '@/interfaces/common';
import { DOCS_PAYMENTS, DOCS_PAYMENTS_LEARN_MORE, DOCS_PAYMENTS_LEARN_HOW } from '@/constants/urls';
import {
  Mode, PaymentStatus, CountryCode, ButtonType,
} from '@/interfaces/utilities/enums';
import { PaymentIntentFilter } from '@/interfaces/utilities/table';
import { page } from '@/services/analytics';
import { DASHBOARD_ORIGIN, PAYMENTS_VIEWED } from '@/constants/analyticsEvents';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericTable from '@/components/table/GenericTable.vue';
import GenericButton from '@/components/GenericButton.vue';
import TablePagination from '@/components/table/TablePagination.vue';
import PaymentsTableHead from '@/views/payments/components/PaymentsTableHead.vue';
import PaymentsTableRow from '@/views/payments/components/PaymentsTableRow.vue';
import PaymentsTableAppliedFilters from '@/views/payments/components/PaymentsTableAppliedFilters.vue';
import PaymentIntentDetailDrawer from '@/views/payments/components/PaymentIntentDetailDrawer.vue';
import PaymentsExportDrawer from '@/views/payments/components/PaymentsExportDrawer.vue';

const $t = useTranslation('views.payments');
const paymentsStore = usePaymentsStore();
const configStore = useConfigStore();
const isLive = computed(() => configStore.mode === Mode.Live);

const applyFilter = async (filters: PaymentIntentFilter) => {
  await paymentsStore.updateFilters(filters);
};

const isTableEmpty = computed(() => (
  paymentsStore.paginatedPaymentIntents.length === 0
));

const emptyTableSubtitle = computed(() => {
  if (paymentsStore.hasAppliedFilters) {
    return $t('table.empty.title.hasFilters');
  }
  if (isLive.value) {
    return $t('table.empty.title.live');
  }
  return $t('table.empty.title.test');
});

const showFakePaymentIntent = computed(() => (
  isTableEmpty.value && !paymentsStore.loading && !isLive.value && !paymentsStore.hasAppliedFilters
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

const detailDrawerOpened = ref(false);
const exportDrawerOpened = ref(false);
const setDetailDrawerOpened = (value: boolean) => {
  detailDrawerOpened.value = value;
};
const setExportDrawerOpened = (value: boolean) => {
  exportDrawerOpened.value = value;
};

const currentPaymentIntent = ref<Nullable<PaymentIntent>>(null);
const openDetailedView = (paymentIntent: PaymentIntent) => {
  currentPaymentIntent.value = paymentIntent;
  setDetailDrawerOpened(true);
  setExportDrawerOpened(false);
};
const openExportDrawer = () => {
  setExportDrawerOpened(true);
  setDetailDrawerOpened(false);
};

onMounted(async () => {
  page(PAYMENTS_VIEWED, {
    origin: DASHBOARD_ORIGIN,
    mode: configStore.mode,
  });
  await paymentsStore.updateFilters({});
});
onUnmounted(async () => {
  paymentsStore.showCreationDate = false;
  paymentsStore.openedCreationDate = false;
});
</script>

<template>
  <div
    data-test="payments-view"
    class="flex items-center p-10"
  >
    <Teleport to="body">
      <PaymentIntentDetailDrawer
        v-if="currentPaymentIntent"
        :open="detailDrawerOpened"
        :payment-intent="currentPaymentIntent"
        @close="() => setDetailDrawerOpened(false)"
      />
      <PaymentsExportDrawer
        :open="exportDrawerOpened"
        @close="() => setExportDrawerOpened(false)"
      />
    </Teleport>
    <div class="w-full">
      <div class="flex flex-row justify-between">
        <div class="text-3xl text-heading-color self-start mb-6 font-semibold">
          {{ $t('title_other') }}
        </div>
      </div>
      <a
        class="text-primary-main"
        :href="DOCS_PAYMENTS"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('urls.whatAre') }}
      </a>
      <div class="flex flex-row justify-between space-x-4">
        <div class="mt-2 mb-6 text-body-color max-w-2xl">
          {{ $t('subtitle') }}
        </div>
        <a
          class="text-primary-main min-w-fit"
          :href="DOCS_PAYMENTS_LEARN_MORE"
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
            <GenericButton
              class="ml-4 capitalize"
              :disabled="paymentsStore.total < 1"
              :type="ButtonType.Primary"
              icon-name="download"
              :text="$t('exportDrawer.title')"
              @click="openExportDrawer"
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
            class="cursor-pointer"
            :payment-intent="paymentIntent"
            @click="openDetailedView(paymentIntent)"
          />
          <PaymentsTableRow
            v-if="showFakePaymentIntent"
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
              v-if="!paymentsStore.hasAppliedFilters"
              class="text-primary-main font-thin"
              :href="DOCS_PAYMENTS_LEARN_HOW"
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
