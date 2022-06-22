<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { page } from '@/services/analytics';
import { useTranslation } from '@/locales';
import { useOrganizationStore } from '@/stores/organization';
import { useUserStore } from '@/stores/user';
import { ButtonType, SizeType } from '@/interfaces/utilities/enums';
import { Nullable } from '@/interfaces/common';
import { DOCS_API_CHANGELOG } from '@/constants/urls';
import { DASHBOARD_ORIGIN, ORGANIZATION_VIEWED } from '@/constants/analyticsEvents';
import GenericButton from '@/components/GenericButton.vue';
import GenericLabel from '@/components/GenericLabel.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ProductsSection from './components/ProductsSection.vue';

const $t = useTranslation('views.organization');
const organizationStore = useOrganizationStore();
const userStore = useUserStore();

const countries = {
  cl: 'Chile',
  mx: 'Mexico',
} as Record<string, string>;
const getCountryName = (country: string): Nullable<string> => (
  country && (country in countries) ? countries[country] : null
);
const countryName = computed(() => {
  if (organizationStore.organization) {
    return getCountryName(organizationStore.organization.countryCode) ?? '------';
  }
  return '------';
});

const showRut = ref(false);
const rut = computed(() => {
  if (!organizationStore.organization?.rut) {
    return '------';
  }
  if (showRut.value) {
    return organizationStore.organization.rut;
  }
  return Array(organizationStore.organization.rut.length + 1).join('*');
});

onMounted(() => {
  organizationStore.loadOrganization();
  page(ORGANIZATION_VIEWED, {
    origin: DASHBOARD_ORIGIN,
  });
});
</script>

<template>
  <div
    data-test="organization-view"
    class="flex flex-col p-10 items-center"
  >
    <div class="flex flex-col w-full">
      <div class="font-semibold text-2xl text-heading-color self-start">
        {{ $t('title') }}
      </div>
    </div>

    <div class="flex flex-row w-full space-x-6 mt-5">
      <div
        v-if="organizationStore.loading"
        class="flex justify-center items-center border bg-white
          rounded-lg drop-shadow min-w-xl min-h-lg"
      >
        <LoadingSpinner />
      </div>
      <div
        v-else
        class="p-5 space-y-8 bg-white rounded-lg drop-shadow border max-w-186 w-full"
      >
        <div class="flex justify-between space-x-8">
          <GenericLabel
            class="min-w-56"
            :label="$t('settings.name')"
            :sub-label="$t('settings.nameSubLabel')"
          />
          <div class="flex flex-row space-x-3 items-center w-full justify-between">
            <GenericLabel
              v-if="userStore.organizationName"
              :sub-label="userStore.organizationName"
            />
            <GenericLabel
              v-else
              :sub-label="userStore.user?.email || '------'"
            />
          </div>
        </div>
        <div class="flex justify-between space-x-8">
          <GenericLabel
            class="min-w-56 w-56 h-12"
            :label="$t('settings.organizationRutRfc')"
          />
          <div class="flex flex-row space-x-3 items-center w-full justify-between">
            <div class="flex flex-row">
              <GenericButton
                v-if="organizationStore.organization?.rut"
                :type="ButtonType.Text"
                :size="SizeType.Small"
                :icon-name="showRut ? 'eye-closed' : 'eye'"
                @click="() => showRut = !showRut"
              />
              <GenericLabel
                :sub-label="rut"
              />
            </div>
          </div>
        </div>
        <div class="flex space-x-8 h-12">
          <GenericLabel
            class="w-56"
            :label="$t('settings.billingEmail')"
            :sub-label="$t('settings.billingSubLabel')"
          />
          <GenericLabel
            :sub-label="organizationStore.organization?.billingMail || '------'"
          />
        </div>
        <div class="flex space-x-8 h-12">
          <GenericLabel
            class="w-56"
            :label="$t('settings.technicalEmail')"
            :sub-label="$t('settings.technicalSubLabel')"
          />
          <GenericLabel
            :sub-label="organizationStore.organization?.technicalEmail || '------'"
          />
        </div>
        <div class="flex space-x-8 h-12">
          <GenericLabel
            class="min-w-56"
            :label="$t('settings.defaultCountryApi')"
            :sub-label="$t('settings.defaultCountryApiSubLabel')"
          />
          <GenericLabel
            :sub-label="countryName"
          />
        </div>
        <div class="flex space-x-8 h-12">
          <GenericLabel
            v-if="organizationStore.organization?.apiVersion"
            class="min-w-56"
            :label="$t('settings.apiVersion')"
            :sub-label="$t('settings.apiVersionSubLabel1')"
            :sub-label-href="DOCS_API_CHANGELOG"
          />
          <GenericLabel
            v-else
            class="min-w-56"
            :label="$t('settings.apiVersion')"
            :sub-label="$t('settings.apiVersionSubLabel2')"
          />
          <GenericLabel
            :sub-label="organizationStore.organization?.apiVersion || '------'"
          />
        </div>
      </div>
      <div class="break-normal border p-5 bg-white rounded-lg drop-shadow min-w-sm min-h-md">
        <ProductsSection />
      </div>
    </div>
  </div>
</template>
