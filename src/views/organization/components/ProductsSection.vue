<script setup lang="ts">
import { ComponentPublicInstance } from 'vue';
import { useTranslation } from '@/locales';
import { useOrganizationStore } from '@/stores/organization';
import { Nullable } from '@/interfaces/common';
import { HolderType, Product } from '@/interfaces/utilities/enums';
import { SALES_EMAIL } from '@/constants/urls';
import GenericLabel from '@/components/GenericLabel.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { icons } from '@/utils/icons';
import { isProductAvailable } from '@/utils/organization';

const $t = useTranslation('views.organization.products');
const organizationStore = useOrganizationStore();

const bankingCodes = [Product.Movements, Product.Subscriptions, Product.Payments];
const fiscalCodes = [Product.Invoices, Product.TaxReturns, Product.TaxStatements];

const isProductBlocked = (
  code: Product,
  holderType: HolderType,
) => holderType === HolderType.Business && code !== Product.Movements;

const iconComponent = (
  productCode: Product,
  holderType: HolderType,
): Nullable<ComponentPublicInstance> => {
  if (isProductAvailable(
    productCode,
    holderType,
    organizationStore.organization?.organizationProducts,
  )) {
    return icons.check;
  }
  if (isProductBlocked(productCode, holderType)) {
    return icons.ban;
  }
  return icons.lock;
};

const iconClass = (productCode: Product, holderType: HolderType) => {
  const baseClass = 'h-4 w-4';
  if (isProductAvailable(
    productCode,
    holderType,
    organizationStore.organization?.organizationProducts,
  )) {
    return `${baseClass} text-primary-main`;
  }
  return `${baseClass} text-disabled-color`;
};

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
    <GenericLabel
      :label="$t('title')"
      :sub-label="$t('subtitle')"
    />
    <div class="divide-y divide-divider-color text-body-color">
      <GenericLabel :label="$t('bankingAPI')" />
      <div class="mt-2 pt-2 capitalize grid grid-cols-2 gap-2">
        <div
          v-for="productCode in bankingCodes"
          :key="productCode"
          class="text-sm mt-2"
        >
          <span>
            {{ productCode.toLowerCase() }}
          </span>
          <span
            v-for="holderType in [HolderType.Individual, HolderType.Business]"
            :key="holderType"
            class="flex gap-2 text-xs my-1"
          >
            <component
              :is="iconComponent(productCode, holderType)"
              :class="iconClass(productCode, holderType)"
            />
            {{ holderType }}
          </span>
          <span
            v-if="productCode === Product.Movements"
            class="flex gap-2 text-xs"
          >
            <component
              :is="organizationStore.isOnDemandAvailable ? icons.check : icons.lock"
              class="h-4 w-4"
              :class="organizationStore.isOnDemandAvailable
                ? 'text-primary-main' : 'text-disabled-color'"
            />
            Refresh on demand
          </span>
          <span
            v-if="productCode === Product.Subscriptions"
            class="flex gap-2 text-xs"
          >
            <component
              :is="organizationStore.isChargesAvailable ? icons.check : icons.lock"
              class="h-4 w-4"
              :class="organizationStore.isChargesAvailable
                ? 'text-primary-main' : 'text-disabled-color'"
            />
            Charges (Direct Debit)
          </span>
        </div>
      </div>
    </div>
    <div class="divide-y divide-divider-color">
      <GenericLabel :label="$t('fiscalAPI')" />
      <div class="mt-2 pt-2 capitalize grid grid-cols-2 gap-2">
        <div
          v-for="productCode in fiscalCodes"
          :key="productCode"
          class="flex gap-1"
        >
          <component
            :is="iconComponent(productCode, HolderType.Individual)"
            :class="iconClass(productCode, HolderType.Individual)"
          />
          <p class="text-body-color text-sm">
            {{ productCode.toLowerCase().replace('_', ' ') }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <a
        class="text-primary-main text-right text-sm"
        :href="SALES_EMAIL"
      >
        {{ $t('callToAction') }}
      </a>
    </div>
  </div>
</template>
