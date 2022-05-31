<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTranslation } from '@/locales';
import { useOrganizationStore } from '@/stores/organization';
import { useUserStore } from '@/stores/user';
import { User } from '@/interfaces/entities/user';
import { Organization } from '@/interfaces/entities/organization';
import { ButtonType, SizeType, HorizontalPositionType } from '@/interfaces/utilities/enums';
import GenericTable from '@/components/table/GenericTable.vue';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericLabel from '@/components/GenericLabel.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import SearchBar from '@/components/SearchBar.vue';
import TeamTableHead from '@/views/organization/components/TeamTableHead.vue';
import TeamTableRow from '@/views/organization/components/TeamTableRow.vue';
import ProductsSection from './components/ProductsSection.vue';

const $t = useTranslation('views.organization');
const organizationStore = useOrganizationStore();
const userStore = useUserStore();

const organization: Organization = {
  id: 'org_id',
  name: 'sample name',
  refreshIntervalSec: 100,
  countryCode: 'cl',
};

const member1: User = {
  id: 'id',
  email: 'liliana@serviejemplo.com',
  name: 'Liliana Paul',
  lastName: 'lastName',
  organizations: [organization],
  defaultOrganizationId: 'defaultOrganizationId',
};
const member2: User = {
  id: 'id',
  email: 'nicolle@serviejemplo.com',
  name: 'Nicolle Haz',
  lastName: 'lastName',
  organizations: [organization],
  defaultOrganizationId: 'defaultOrganizationId',
};
const member3: User = {
  id: 'id',
  email: 'pedro@serviejemplo.com',
  name: 'Pedro Saul',
  lastName: 'lastName',
  organizations: [organization],
  defaultOrganizationId: 'defaultOrganizationId',
};

const members = [member1, member2, member3];

const billingEmail = ref('');
const technicalEmail = ref('');

const country = ref('Chile');
const countryOptions = ['Chile', 'México'];
const selectCountryFilter = (value: string) => {
  country.value = value;
};

const search = ref('search');

onMounted(() => {
  organizationStore.loadOrganization();
});
</script>

<template>
  <div
    data-test="links-view"
    class="flex flex-col p-10 items-center max-w-screen-xl w-full"
  >
    <div class="flex flex-col w-full">
      <div class="font-semibold text-2xl text-heading-color self-start">
        {{ $t('title') }}
      </div>
    </div>

    <div class="flex flex-row w-full space-x-6">
      <div class="p-5 space-y-8 w-full bg-white rounded-lg drop-shadow border">
        <div class="flex justify-between space-x-8">
          <GenericLabel
            class="min-w-56"
            label="Name"
            sub-label="As it will appear on your widget."
          />
          <div class="flex flex-row space-x-3 items-center w-full justify-between">
            <GenericLabel
              v-if="userStore.organizationName"
              :sub-label="userStore.organizationName"
            />
            <GenericLabel
              v-else
              sub-label="userStore.user.email"
            />
            <GenericButton
              :type="ButtonType.Secondary"
              :size="SizeType.Small"
              text="Request Change"
              icon-name="mail"
              :icon-position="HorizontalPositionType.Left"
            />
          </div>
        </div>
        <div class="flex justify-between space-x-8">
          <GenericLabel
            class="min-w-56"
            label="Organization RUT/RFC"
          />
          <div class="flex flex-row space-x-3 items-center w-full justify-between">
            <GenericLabel
              sub-label="**.***.***-*"
            />
            <GenericButton
              :type="ButtonType.Text"
              :size="SizeType.Small"
              icon-name="eye"
            />
          </div>
        </div>
        <div class="flex justify-between space-x-8">
          <GenericLabel
            class="min-w-56"
            label="Billing Email"
            sub-label="For Fintoc receipts."
          />
          <GenericInput
            v-model="billingEmail"
            label="Billing Email"
            placeholder="No billing email"
            class="w-full"
          />
        </div>
        <div class="flex justify-between space-x-8">
          <GenericLabel
            class="min-w-56"
            label="Technical Email"
            sub-label="For reports about service interruptions."
          />
          <GenericInput
            v-model="technicalEmail"
            label="Technical Email"
            placeholder="No technical email"
            class="w-full"
          />
        </div>
        <div class="flex justify-between space-x-8">
          <GenericLabel
            class="min-w-56"
            label="Default Country API"
            sub-label="First API that will show up for developers."
          />
          <div class="w-full">
            <GenericDropDown
              label="Country API"
              :selected="country"
              :options="countryOptions"
              :is-width-full="true"
              @select="selectCountryFilter"
            />
          </div>
        </div>
      </div>
      <div class="break-normal border p-5 bg-white rounded-lg drop-shadow min-w-sm min-h-lg">
        <ProductsSection />
      </div>
    </div>

    <div class="mt-10 w-full space-y-6">
      <div class="font-medium text-2xl text-heading-color">
        {{ $t('teamTitle') }}
      </div>
      <div class="flex justify-between">
        <div class="flex flex-row space-x-2">
          <GenericButton
            icon-name="circle-check"
            :type="ButtonType.Secondary"
            :disabled="true"
          />
          <GenericButton
            icon-name="circle-cross"
            :type="ButtonType.Danger"
            :disabled="true"
          />
          <GenericButton
            icon-name="trash"
            :type="ButtonType.Secondary"
            :disabled="true"
          />
        </div>
        <div class="flex flex-row space-x-4">
          <SearchBar
            placeholder="search"
            :model-value="search"
          />
          <GenericButton
            icon-name="add"
            :type="ButtonType.Primary"
            text="Invite Member"
          />
        </div>
      </div>
      <GenericTable>
        <template #head>
          <TeamTableHead />
        </template>

        <template #content>
          <TeamTableRow
            v-for="member in members"
            :key="member.id"
            :member="member"
          />
        </template>
      </GenericTable>
    </div>
  </div>
  <!-- <div
    v-if="organizationStore.loading"
    class="flex justify-center w-full pt-4"
  >
    <LoadingSpinner />
  </div> -->
</template>
