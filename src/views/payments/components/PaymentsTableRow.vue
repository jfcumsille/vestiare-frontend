<script setup lang="ts">
import { computed } from 'vue';
import { rutFormat } from 'rut-helpers';
import { PaymentIntent } from '@/interfaces/entities/paymentIntents';
import { BadgeStatus } from '@/interfaces/utilities/enums';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';
import TableLabel from '@/components/table/utils/TableLabel.vue';
import TableDate from '@/components/table/utils/TableDate.vue';
import GenericBadge from '@/components/GenericBadge.vue';
import InstitutionLogo from '@/components/InstitutionLogo.vue';

const props = defineProps<{ paymentIntent: PaymentIntent }>();

const formattedSenderHolderId = computed(() => {
  if (props.paymentIntent.senderAccount) {
    return rutFormat(props.paymentIntent.senderAccount.holderId);
  }
  return '';
});

const formattedPaymentIntentId = computed(() => (
  `...${props.paymentIntent.id.slice(-5)}`
));
const formattedAmount = computed(() => (
  props.paymentIntent.amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
));

const statusBadgeText = computed(() => {
  const texts = {
    succeeded: 'Succeeded',
    rejected: 'Rejected',
    failed: 'Failed',
  } as Record<string, string>;
  return texts[props.paymentIntent.status];
});

const statusBadgeColor = computed(() => {
  const status = {
    succeeded: BadgeStatus.Success,
    rejected: BadgeStatus.Warning,
    failed: BadgeStatus.Danger,
  } as Record<string, BadgeStatus>;
  return status[props.paymentIntent.status];
});
</script>

<template>
  <TableRow>
    <TableData />
    <TableData>
      <TableLabel
        :label="formattedPaymentIntentId"
      />
    </TableData>
    <TableData>
      <TableDate
        :date-string="props.paymentIntent.createdAt"
      />
    </TableData>
    <TableData>
      <TableLabel
        v-if="props.paymentIntent.senderAccount"
        :label="props.paymentIntent.senderAccount.holderName"
        :sub-label="formattedSenderHolderId"
      />
      <p
        v-else
        class="text-disabled-color text-xs"
      >
        N/A
      </p>
    </TableData>
    <TableData
      v-if="props.paymentIntent.senderAccount"
      class="flex space-x-3 items-center"
    >
      <InstitutionLogo
        :institution-id="props.paymentIntent.senderAccount.institution.id"
        class="flex-shrink-0 w-8 h-8 rounded"
      />
      <TableLabel
        class="capitalize"
        :label="props.paymentIntent.senderAccount.institution.name"
        :sub-label="props.paymentIntent.senderAccount.number"
      />
    </TableData>
    <TableData>
      <TableLabel
        :label="formattedAmount"
        :sub-label="props.paymentIntent.currency"
      />
    </TableData>
    <TableData v-if="props.paymentIntent.status">
      <GenericBadge
        data-test="payment-intent-status-badge"
        :text="statusBadgeText"
        :status="statusBadgeColor"
      />
    </TableData>
  </TableRow>
</template>
