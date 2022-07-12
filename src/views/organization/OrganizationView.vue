<script setup lang="ts">
import {
  onMounted,
  ref,
  computed,
  watch,
} from 'vue';
import { page } from '@/services/analytics';
import { useTranslation } from '@/locales';
import { useOrganizationStore } from '@/stores/organization';
import { useUserStore } from '@/stores/user';
import { ButtonType, SizeType, CountryName } from '@/interfaces/utilities/enums';
import { Nullable } from '@/interfaces/common';
import { GenericFormPublicAPI } from '@/interfaces/components/forms/GenericForm';
import { DOCS_API_CHANGELOG } from '@/constants/urls';
import { DASHBOARD_ORIGIN, ORGANIZATION_VIEWED } from '@/constants/analyticsEvents';
import { countryNames, getCountryId, getCountryName } from '@/utils/country';
import { isValidEmail } from '@/utils/validation';
import GenericButton from '@/components/GenericButton.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericForm from '@/components/forms/GenericForm.vue';
import GenericLabel from '@/components/GenericLabel.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ProductsSection from './components/ProductsSection.vue';
import OrganizationUsers from './components/OrganizationUsers.vue';
import PlanSection from './components/PlanSection.vue';

const $t = useTranslation('views.organization');
const organizationStore = useOrganizationStore();
const userStore = useUserStore();

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

const editFormRef = ref<Nullable<GenericFormPublicAPI>>(null);
const emailValidations = [
  (value: string) => (
    value.trim() === '' || isValidEmail(value)
      || $t('settings.validations.invalidEmail') as string
  ),
];
const billingEmail = ref('');
const technicalEmail = ref('');

const countryName = computed(() => (
  organizationStore.organization ? getCountryName(organizationStore.organization.countryCode) : '------'
));
const selectedCountry = ref<CountryName>(CountryName.Chile);
const selectCountry = (value: string) => {
  selectedCountry.value = value as CountryName;
};
watch(() => organizationStore.organization, () => {
  if (organizationStore.organization) {
    selectedCountry.value = getCountryName(
      organizationStore.organization.countryCode,
    ) as CountryName;
  }
});

const isEditing = ref(false);
const resetEditValues = () => {
  billingEmail.value = '';
  technicalEmail.value = '';
};
const saveSettings = async () => {
  const formIsValid = editFormRef.value?.valid;
  if (formIsValid) {
    const updateData: Record<string, string> = {};
    if (billingEmail.value !== '') {
      updateData.billingMail = billingEmail.value;
    }
    if (technicalEmail.value !== '') {
      updateData.technicalEmail = technicalEmail.value;
    }
    const countryId = getCountryId(selectedCountry.value);
    if (organizationStore.organization && countryId !== undefined
      && countryId !== (organizationStore.organization.countryCode || undefined)) {
      updateData.countryId = countryId as string;
    }
    await organizationStore.updateOrganization(updateData);
    isEditing.value = false;
    resetEditValues();
  }
};
const isSaveEnabled = computed(() => {
  const isBillingDif = organizationStore.organization?.billingMail !== billingEmail.value && billingEmail.value !== '';
  const isTechnicalDif = organizationStore.organization?.technicalEmail !== technicalEmail.value && technicalEmail.value !== '';
  const isCountryDif = organizationStore.organization?.countryCode
    !== getCountryId(selectedCountry.value);
  return (isBillingDif || isTechnicalDif || isCountryDif);
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
    class="flex flex-col p-10 items-left"
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
          rounded-lg drop-shadow min-w-186 min-h-lg"
      >
        <LoadingSpinner />
      </div>
      <div
        v-else
        class="p-5 space-y-10 bg-white rounded-lg drop-shadow border max-w-186 w-full"
      >
        <div class="flex justify-between space-x-8">
          <GenericLabel
            class="w-62"
            label="Settings"
            sub-label="Your general organization settings."
          />
          <div
            v-if="isEditing"
            class="flex flex-row space-x-3 items-center justify-end"
          >
            <GenericButton
              data-test="cancel-button"
              :type="ButtonType.Secondary"
              text="Cancel"
              @click="() => isEditing = false"
            />
            <GenericButton
              :type="ButtonType.Primary"
              :disabled="!isSaveEnabled"
              text="Save"
              @click="saveSettings"
            />
          </div>
          <GenericButton
            v-else
            data-test="edit-button"
            :type="ButtonType.Secondary"
            icon-name="edit"
            text="Edit"
            @click="() => isEditing = true"
          />
        </div>
        <div class="flex justify-between space-x-8">
          <GenericLabel
            class="min-w-62 w-62"
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
            <a
              v-if="isEditing"
              id="my_custom_link"
              data-test="request-change-name"
              class="text-primary-main hover:text-primary-hover text-sm py-2 px-3 whitespace-nowrap"
              href="mailto:soporte@fintoc.com"
              target="_blank"
            > {{ $t('settings.requestChange') }} </a>
          </div>
        </div>
        <div class="flex justify-between space-x-8">
          <GenericLabel
            class="min-w-62 w-62 h-12"
            :label="$t('settings.organizationRutRfc')"
          />
          <div class="flex flex-row space-x-3 items-center w-full justify-between">
            <div class="flex flex-row space-x-2 w-full">
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
            <a
              v-if="isEditing"
              id="my_custom_link"
              data-test="request-change-rut"
              class="text-primary-main hover:text-primary-hover text-sm py-2 px-3 whitespace-nowrap"
              href="mailto:soporte@fintoc.com"
              target="_blank"
            > {{ $t('settings.requestChange') }} </a>
          </div>
        </div>
        <GenericForm
          ref="editFormRef"
          class="space-y-10"
        >
          <div class="flex space-x-8 h-12">
            <GenericLabel
              class="w-62 min-w-62"
              :label="$t('settings.billingEmail')"
              :sub-label="$t('settings.billingSubLabel')"
            />
            <GenericInput
              v-if="isEditing"
              v-model="billingEmail"
              data-test="billing-input"
              :size="SizeType.Large"
              :label="$t('settings.billingEmail')"
              :placeholder="organizationStore.organization?.billingMail || 'Add a billing email'"
              :validations="emailValidations"
            />
            <GenericLabel
              v-else
              data-test="billing-label"
              :sub-label="organizationStore.organization?.billingMail || '------'"
            />
          </div>
          <div class="flex space-x-8 h-12">
            <GenericLabel
              class="w-62 min-w-62"
              :label="$t('settings.technicalEmail')"
              :sub-label="$t('settings.technicalSubLabel')"
            />
            <GenericInput
              v-if="isEditing"
              v-model="technicalEmail"
              data-test="technical-input"
              :size="SizeType.Large"
              :label="$t('settings.technicalEmail')"
              :placeholder="organizationStore.organization?.technicalEmail
                || 'Add a technical email'"
              :validations="emailValidations"
            />
            <GenericLabel
              v-else
              data-test="technical-label"
              :sub-label="organizationStore.organization?.technicalEmail || '------'"
            />
          </div>
        </GenericForm>
        <div class="flex space-x-8 h-12">
          <GenericLabel
            class="w-62 min-w-62"
            :label="$t('settings.defaultCountryApi')"
            :sub-label="$t('settings.defaultCountryApiSubLabel')"
          />
          <GenericDropDown
            v-if="isEditing"
            data-test="country-dropdown"
            label="Country API"
            :size="SizeType.Large"
            :selected="selectedCountry"
            :options="countryNames"
            @select="selectCountry"
          />
          <GenericLabel
            v-else
            data-test="country-label"
            :sub-label="countryName"
          />
        </div>
        <div class="flex space-x-8 h-12">
          <GenericLabel
            v-if="organizationStore.organization?.apiVersion"
            class="w-62"
            :label="$t('settings.apiVersion')"
            :sub-label="$t('settings.apiVersionSubLabel1')"
            :sub-label-href="DOCS_API_CHANGELOG"
          />
          <GenericLabel
            v-else
            class="w-62"
            :label="$t('settings.apiVersion')"
            :sub-label="$t('settings.apiVersionSubLabel2')"
          />
          <GenericLabel
            :sub-label="organizationStore.organization?.apiVersion || '------'"
          />
        </div>
      </div>
      <div class="break-normal flex flex-col space-y-6 min-h-md min-w-xs max-w-sm min-h-lg">
        <div class="border p-5 bg-white rounded-lg drop-shadow h-full">
          <PlanSection />
        </div>
        <div class="border p-5 bg-white rounded-lg drop-shadow h-full">
          <ProductsSection />
        </div>
      </div>
    </div>

    <div class="mt-10 w-full space-y-6 max-w-6xl">
      <OrganizationUsers />
    </div>
  </div>
</template>
