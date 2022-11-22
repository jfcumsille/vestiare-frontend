<script setup lang="ts">
import { useTranslation } from '@/locales';
import { usePaymentsStore } from '@/stores/payments';
import { DOCS_PAYMENTS } from '@/constants/urls';
import GenericTable from '@/components/table/GenericTable.vue';
import TablePagination from '@/components/table/TablePagination.vue';
import PaymentsTableHead from '@/views/payments/components/PaymentsTableHead.vue';
import PaymentsTableRow from '@/views/payments/components/PaymentsTableRow.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const $t = useTranslation('views.payments');
const paymentsStore = usePaymentsStore();
</script>

<template>
  <div
    data-test="payments-view"
    class="flex items-center p-10"
  >
    <div class="w-full">
      <div class="font-medium text-2xl text-heading-color self-start">
        {{ $t('title_other') }}
      </div>
      <div class="flex flex-row justify-between items-center py-2 self-start">
        <a
          class="text-primary-main text-sm"
          :href="DOCS_PAYMENTS"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('urls.whatAre') }}
        </a>
      </div>
      <div
        v-if="paymentsStore.loading"
        class="flex justify-center w-full py-20"
      >
        <LoadingSpinner />
      </div>
      <GenericTable
        v-else
        class="mt-6"
      >
        <template #head>
          <PaymentsTableHead />
        </template>

        <template #content>
          <PaymentsTableRow
            v-for="paymentIntent in paymentsStore.paginatedPaymentIntents"
            :key="paymentIntent.id"
            :payment-intent="paymentIntent"
          />
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
    </div>
  </div>
</template>
