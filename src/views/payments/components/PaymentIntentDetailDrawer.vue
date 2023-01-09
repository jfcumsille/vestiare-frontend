<script setup lang="ts">
import { computed } from 'vue';
import { rutFormat } from 'rut-helpers';
import { useLocale } from '@/composables/locale';
import { useTranslation } from '@/locales';
import { PaymentIntent } from '@/interfaces/entities/paymentIntents';
import { BadgeStatus, DateStyle, CountryCode } from '@/interfaces/utilities/enums';
import { formatDate, formatTime, formatTimezone } from '@/utils/date';
import GenericDrawer from '@/components/GenericDrawer.vue';
import GenericBadge from '@/components/GenericBadge.vue';
import CopyIcon from '@/assets/svg/CopyIcon.vue';

const locale = useLocale();
const $t = useTranslation('views.payments.detailDrawer');
const props = defineProps<{ open: boolean, paymentIntent: PaymentIntent }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const paymentCountryCode = computed(() => props.paymentIntent.recipientAccount.institution.country);

const formattedAmount = computed(() => (
  props.paymentIntent.amount.toLocaleString(`es-${paymentCountryCode.value}`, { style: 'currency', currency: props.paymentIntent.currency })
));

const senderHolderId = computed(() => (
  paymentCountryCode.value === CountryCode.CL ? $t('senderRut') : $t('senderHolderId')
));

const formattedSenderHolderId = computed(() => {
  const senderAccount = props.paymentIntent.senderAccount;
  if (senderAccount) {
    return paymentCountryCode.value === CountryCode.CL
      ? rutFormat(senderAccount.holderId) : senderAccount.holderId;
  }
  return '';
});

const formattedRecipientHolderId = computed(() => {
  if (props.paymentIntent.recipientAccount && paymentCountryCode.value === CountryCode.CL) {
    return rutFormat(props.paymentIntent.recipientAccount.holderId);
  }
  return props.paymentIntent.recipientAccount.holderId;
});

const formattedAccountType = (accountType: string) => {
  const texts = {
    sight_account: 'Cuenta Vista',
    checking_account: 'Cuenta Corriente',
    rut_account: 'Cuenta Rut',
    savings_account: 'Cuenta de Ahorro',
  } as Record<string, string>;
  return texts[accountType];
};

const statusBadgeText = computed(() => {
  const texts = {
    succeeded: 'Succeeded',
    rejected: 'Rejected',
    failed: 'Failed',
    in_progress: 'In Progress',
  } as Record<string, string>;
  return texts[props.paymentIntent.status];
});

const statusBadgeColor = computed(() => {
  const status = {
    succeeded: BadgeStatus.Success,
    rejected: BadgeStatus.Warning,
    failed: BadgeStatus.Danger,
    in_progress: BadgeStatus.Main,
  } as Record<string, BadgeStatus>;
  return status[props.paymentIntent.status];
});

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
</script>
<template>
  <GenericDrawer
    :title="$t('title')"
    :open="props.open"
    @close="emit('close')"
  >
    <div class="flex flex-col w-full h-full min-w-sm text-body-color">
      <div class="flex flex-row w-full items-center p-3 space-x-4">
        <div class="text-sm min-w-36 max-w-36 font-medium">
          {{ $t('fintocID') }}
        </div>
        <div class="flex flex-row items-center justify-between w-full">
          <div class="text-sm font-normal">
            {{ props.paymentIntent.id }}
          </div>
          <CopyIcon
            class="w-4 h-4 min-w-4 max-w-4 cursor-pointer
              text-primary-main hover:text-primary-hover"
            @click="copyToClipboard(props.paymentIntent.id)"
          />
        </div>
      </div>
      <div class="h-px bg-divider-color" />
      <div
        v-if="props.paymentIntent.referenceId"
        class="flex flex-row w-full items-center p-3 space-x-4"
      >
        <div class="text-sm min-w-36 max-w-36 font-medium flex flex-col space-y-1">
          <div class="max-w-28">
            {{ $t('senderBankID') }}
          </div>
          <div class="text-xs">
            (reference_id)
          </div>
        </div>
        <div class="flex flex-row w-full justify-between">
          <div class="text-sm">
            {{ props.paymentIntent.referenceId }}
          </div>
          <CopyIcon
            class="w-4 h-4 min-w-4 max-w-4 cursor-pointer
              text-primary-main hover:text-primary-hover"
            @click="copyToClipboard(props.paymentIntent.referenceId)"
          />
        </div>
      </div>
      <div class="h-px bg-divider-color" />
      <div class="flex flex-row w-full items-center p-3 space-x-4">
        <div class="flex flex-col min-w-36 max-w-36 space-y-1.5">
          <div class="text-sm font-medium">
            {{ $t('creationDate') }}
          </div>
          <div class="text-xs">
            {{ $t('creationTime') }}
          </div>
          <div class="text-xs">
            {{ $t('timezone') }}
          </div>
          <div class="text-xs">
            {{ $t('utcTimestamp') }}
          </div>
        </div>
        <div class="flex flex-col w-full space-y-1.5">
          <div class="text-sm">
            {{ formatDate(props.paymentIntent.createdAt, DateStyle.Medium, locale) }}
          </div>
          <div class="text-xs">
            {{ formatTime(props.paymentIntent.createdAt, locale) }}
          </div>
          <div class="text-xs">
            {{ formatTimezone(paymentCountryCode, locale, props.paymentIntent.createdAt) }}
          </div>
          <div class="flex flex-row w-full justify-between">
            <div class="text-xs">
              {{ props.paymentIntent.createdAt }}
            </div>
            <CopyIcon
              class="w-4 h-4 min-w-4 max-w-4 cursor-pointer
                text-primary-main hover:text-primary-hover"
              @click="copyToClipboard(props.paymentIntent.createdAt)"
            />
          </div>
        </div>
      </div>
      <div class="h-px bg-divider-color" />
      <div v-if="props.paymentIntent.senderAccount">
        <div class="flex flex-row w-full items-center p-3 space-x-4">
          <div class="flex flex-col min-w-36 max-w-36 space-y-1.5">
            <div class="text-sm font-medium">
              {{ $t('senderName') }}
            </div>
            <div class="text-xs">
              {{ senderHolderId }}
            </div>
          </div>
          <div class="flex flex-col w-full space-y-1.5">
            <div class="text-sm">
              {{ props.paymentIntent.senderAccount.holderName }}
            </div>
            <div class="flex flex-row w-full justify-between">
              <div class="text-xs">
                {{ formattedSenderHolderId }}
              </div>
              <CopyIcon
                class="w-4 h-4 min-w-4 max-w-4 cursor-pointer
                  text-primary-main hover:text-primary-hover"
                @click="copyToClipboard(formattedSenderHolderId)"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-row w-full items-center p-3 space-x-4">
          <div class="flex flex-col min-w-36 max-w-36 space-y-1.5">
            <div class="text-sm font-medium">
              {{ $t('senderBank') }}
            </div>
            <div class="text-xs">
              {{ $t('accountType') }}
            </div>
            <div class="text-xs">
              {{ $t('senderAccount') }}
            </div>
          </div>
          <div class="flex flex-col w-full space-y-1.5">
            <div class="text-sm">
              {{ props.paymentIntent.senderAccount.institution.name }}
            </div>
            <div class="text-xs">
              {{ formattedAccountType(props.paymentIntent.senderAccount.type) }}
            </div>
            <div class="flex flex-row w-full justify-between">
              <div class="text-xs">
                {{ props.paymentIntent.senderAccount.number }}
              </div>
              <CopyIcon
                class="w-4 h-4 min-w-4 max-w-4 cursor-pointer
                  text-primary-main hover:text-primary-hover"
                @click="copyToClipboard(props.paymentIntent.senderAccount?.number || '')"
              />
            </div>
          </div>
        </div>
        <div class="h-px bg-divider-color" />
      </div>
      <div class="flex flex-row w-full items-center p-3 space-x-4">
        <div class="flex flex-col min-w-36 max-w-36 space-y-1.5">
          <div class="text-sm font-medium">
            {{ $t('recipientName') }}
          </div>
          <div class="text-xs">
            {{ $t('recipientRut') }}
          </div>
        </div>
        <div class="flex flex-col w-full space-y-1.5">
          <div class="text-sm">
            {{ props.paymentIntent.recipientAccount.holderName }}
          </div>
          <div class="text-xs">
            {{ formattedRecipientHolderId }}
          </div>
        </div>
      </div>
      <div class="flex flex-row w-full items-center p-3 space-x-4">
        <div class="flex flex-col min-w-36 max-w-36 space-y-1.5">
          <div class="text-sm font-medium">
            {{ $t('recipientBank') }}
          </div>
          <div class="text-xs">
            {{ $t('accountType') }}
          </div>
          <div class="text-xs">
            {{ $t('recipientAccount') }}
          </div>
        </div>
        <div class="flex flex-col w-full space-y-1.5">
          <div class="text-sm">
            {{ props.paymentIntent.recipientAccount.institution.name }}
          </div>
          <div class="text-xs">
            {{ formattedAccountType(props.paymentIntent.recipientAccount.type) }}
          </div>
          <div class="text-xs">
            {{ props.paymentIntent.recipientAccount.number }}
          </div>
        </div>
      </div>
      <div class="h-px bg-divider-color" />
      <div class="flex flex-row w-full items-center p-3 space-x-4">
        <div class="flex flex-col min-w-36 max-w-36 space-y-1.5">
          <div class="text-sm font-medium">
            {{ $t('amount') }}
          </div>
          <div class="text-xs">
            {{ $t('currency') }}
          </div>
        </div>
        <div class="flex flex-col w-full space-y-1.5">
          <div class="flex flex-row items-center justify-between w-full">
            <div class="text-sm">
              {{ formattedAmount }}
            </div>
            <CopyIcon
              class="w-4 h-4 min-w-4 max-w-4 cursor-pointer
                text-primary-main hover:text-primary-hover"
              @click="copyToClipboard(formattedAmount)"
            />
          </div>
          <div class="text-xs">
            {{ props.paymentIntent.currency }}
          </div>
        </div>
      </div>
      <div class="h-px bg-divider-color" />
      <div class="flex flex-row w-full items-start p-3 space-x-4">
        <div class="flex flex-col min-w-36 max-w-36 space-y-1.5">
          <div class="text-sm font-medium">
            {{ $t('status') }}
          </div>
        </div>
        <div class="space-y-2">
          <GenericBadge
            :text="statusBadgeText"
            :status="statusBadgeColor"
          />
          <p
            v-if="props.paymentIntent.fintocErrorReason"
            class="text-xs"
            data-test="fintoc-error-reason"
          >
            {{ props.paymentIntent.fintocErrorReason }}
          </p>
        </div>
      </div>
    </div>
  </GenericDrawer>
</template>
