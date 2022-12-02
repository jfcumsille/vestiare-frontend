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
  paymentsStore.paginatedPaymentIntents.length === 0
));

const openFilter = (label: PaymentIntentFilterType) => {
  if (label === PaymentIntentFilterType.Status) {
    paymentsStore.openedStatus = true;
  }
};
</script>

<template>
  <TableHead>
    <TableHeader />
    <TableHeader><div> {{ $t('fintocId') }} </div></TableHeader>
    <TableHeader><div> {{ $t('creationDate') }} </div></TableHeader>
    <TableHeader><div> {{ $t('sender') }} </div></TableHeader>
    <TableHeader><div> {{ $t('senderAccount') }} </div></TableHeader>
    <TableHeader><div> {{ $t('amount') }} </div></TableHeader>
    <TableHeader>
      <div v-if="isTableEmpty">
        {{ $t('status') }}
      </div>
      <TableFilter
        v-else
        :label="$t('status')"
        @toggle="openFilter(PaymentIntentFilterType.Status)"
      />
    </TableHeader>
  </TableHead>
</template>
