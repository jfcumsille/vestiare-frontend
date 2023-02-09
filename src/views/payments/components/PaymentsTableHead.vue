<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { usePaymentsStore } from '@/stores/payments';
import { PaymentIntentFilterType } from '@/interfaces/utilities/enums';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import TableFilter from '@/components/table/utils/TableFilter.vue';

const $t = useTranslation('views.payments.table.headers');
const paymentsStore = usePaymentsStore();

const isTableEmpty = computed(() => (
  paymentsStore.paginatedPaymentIntents.length === 0 && !paymentsStore.hasAppliedFilters
));

const showAndOpenFilter = (label: PaymentIntentFilterType) => {
  paymentsStore.filtersShown.add(label);
  paymentsStore.filtersOpened.add(label);
};
</script>

<template>
  <TableHead>
    <TableHeader />
    <TableHeader>
      <div v-if="isTableEmpty">
        {{ $t('fintocId') }}
      </div>
      <TableFilter
        v-else
        :label="$t('fintocId')"
        @toggle="showAndOpenFilter(PaymentIntentFilterType.FintocID)"
      />
    </TableHeader>
    <TableHeader>
      <div v-if="isTableEmpty">
        {{ $t('creationDate') }}
      </div>
      <TableFilter
        v-else
        :label="$t('creationDate')"
        @toggle="showAndOpenFilter(PaymentIntentFilterType.CreationDate)"
      />
    </TableHeader>
    <TableHeader>
      <div v-if="isTableEmpty">
        {{ $t('sender') }}
      </div>
      <TableFilter
        v-else
        :label="$t('sender')"
        @toggle="showAndOpenFilter(PaymentIntentFilterType.SenderHolderID)"
      />
    </TableHeader>
    <TableHeader><div> {{ $t('senderAccount') }} </div></TableHeader>
    <TableHeader><div> {{ $t('amount') }} </div></TableHeader>
    <TableHeader>
      <div v-if="isTableEmpty">
        {{ $t('status') }}
      </div>
      <TableFilter
        v-else
        :label="$t('status')"
        @toggle="showAndOpenFilter(PaymentIntentFilterType.Status)"
      />
    </TableHeader>
  </TableHead>
</template>
