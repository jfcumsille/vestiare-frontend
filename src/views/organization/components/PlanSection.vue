<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { useOrganizationStore } from '@/stores/organization';
import { useLocale } from '@/composables/locale';
import { Plan, DateStyle } from '@/interfaces/utilities/enums';
import { formatDate } from '@/utils/date';
import { EMAIL_ANDRES } from '@/constants/urls';
import GenericLabel from '@/components/GenericLabel.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const $t = useTranslation('views.organization.plan');
const organizationStore = useOrganizationStore();
const locale = useLocale();

const freeTrialExpirationDate = computed(() => (
  organizationStore.organization
    ? new Date(organizationStore.organization.freeTrialExpirationDate) : null
));

const DAY_IN_MILLISECONDS = 86400000;
const daysLeftTrial = computed(() => {
  if (freeTrialExpirationDate.value) {
    const currentDate = new Date();
    const diffTime = freeTrialExpirationDate.value - currentDate;
    return Math.ceil(diffTime / DAY_IN_MILLISECONDS);
  }
  return -1;
});

const FREE_TRIAL_DURATION_DAYS = 14;
const isFreeTrialActive = computed(() => (
  daysLeftTrial.value > 0 && daysLeftTrial.value <= FREE_TRIAL_DURATION_DAYS
));
const plan = computed(() => {
  if (organizationStore.organization?.isPayingCustomer) {
    return Plan.Paid;
  }
  if (isFreeTrialActive.value) {
    return Plan.Trial;
  }
  return Plan.Free;
});

const totalEnabledProducts = computed(() => {
  organizationStore.organization?.organizationProducts.filter(
    (product) => product.enabled === true,
  ).length
});

const planText = computed(() => {
  switch (plan.value) {
    case Plan.Paid:
      return `${$t('paid')}`;
    case Plan.Trial:
      return `${$t('trial')}`;
    default:
      return `${$t('free')}`;
  }
});
const subtitle = computed(() => {
  switch (plan.value) {
    case Plan.Paid:
      return `${$t('paidSubtitle1')}`;
    case Plan.Trial:
      return `${$t('trialSubtitle1')}`;
    default:
      return `${$t('freeSubtitle1')}`;
  }
});

const subtitle2 = computed(() => {
  switch (plan.value) {
    case Plan.Free:
      return `${$t('freeSubtitle2')}`;
    case Plan.Trial:
      return `${$t('trialSubtitle2')}`;
    default:
      return '';
  }
});
</script>

<template>
  <div
    v-if="organizationStore.loading"
    class="w-full h-full flex justify-center items-center"
  >
    <LoadingSpinner />
  </div>
  <div
    v-else
    class="space-y-6"
  >
    <div class="space-y-2">
      <GenericLabel
        :label="$t('title')"
      />
      <div class="text-xs text-body-color break-normal space-y-2">
        <p data-test="plan-subtitle1">
          {{ $t('currently') }} <span class="font-bold"> {{ planText }}</span>
          {{ subtitle }}
          <span
            v-if="plan === Plan.Trial"
            class="font-bold"
          >
            {{ formatDate(freeTrialExpirationDate.toString(), locale, DateStyle.Medium) }}.
          </span>
          <span
            v-if="plan === Plan.Paid"
            class="font-bold"
          >
            {{ totalEnabledProducts }} {{ $t('paidSubtitle2') }}
          </span>
        </p>
        <p data-test="plan-subtitle2">
          {{ subtitle2 }}
        </p>
      </div>
    </div>
    <div class="flex justify-end">
      <a
        class="text-primary-main text-right text-sm"
        :href="EMAIL_ANDRES"
      >
        {{ $t('callToAction') }}
      </a>
    </div>
  </div>
</template>
