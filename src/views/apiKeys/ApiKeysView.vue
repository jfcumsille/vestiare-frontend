<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { useConfigStore } from '@/stores/config';
import { APIKey } from '@/interfaces/entities/apiKeys';
import { Mode } from '@/interfaces/utilities/enums';
import { API_KEYS_VIEWED } from '@/constants/analyticsEvents';
import { DOCS_API_KEYS } from '@/constants/urls';
import { page, trackAPIKeyCreated, trackAPIKeyDeleted } from '@/services/analytics';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericTable from '@/components/GenericTable.vue';
import GenericTableHeader from '@/components/GenericTableHeader.vue';
import ApiKeysTableElement from './components/ApiKeysTableElement.vue';

const $t = useTranslation('views.apiKeys');
const apiKeysStore = useAPIKeysStore();

const headers = [
  $t('table.headers.name'),
  $t('table.headers.token'),
  $t('table.headers.created'),
  '',
];
const configStore = useConfigStore();
const mode = computed(() => (configStore.mode));
const publicKey = computed(() => apiKeysStore.searchKey(true));
const secretKey = computed(() => apiKeysStore.searchKey(false));

const createAPIKey = async () => {
  await apiKeysStore.createAPIKey();
  trackAPIKeyCreated();
};
const destroyAPIKey = async (key: APIKey) => {
  await apiKeysStore.destroyAPIKey(key.id);
  trackAPIKeyDeleted(key);
};

const activationRequired = computed(() => (mode.value === Mode.Live && !secretKey.value));
const secretKeyToActivate: APIKey = {
  id: 'liveSecretKeyToActivate',
  token: 'token',
  isPublic: false,
  mode: Mode.Live,
  createdAt: '',
};

onMounted(() => {
  page(API_KEYS_VIEWED);
});
</script>

<template>
  <div
    data-test="api-keys-view"
    class="flex items-center"
  >
    <div class="h-full w-full flex min-w-fit">
      <div
        v-if="apiKeysStore.loading"
        class="flex justify-center h-full w-full pt-4 mt-28"
      >
        <LoadingSpinner />
      </div>
      <div
        v-if="!apiKeysStore.loading"
        class="bg-white relative p-10 z-10 min-w-max"
      >
        <div class="font-medium text-2xl text-heading-color">
          {{ $t('title') }}
        </div>
        <div class="flex flex-row justify-between items-center py-2">
          <a
            class="text-primary-main text-sm"
            :href="DOCS_API_KEYS"
            target="_blank"
          >
            {{ $t('learnMore') }}
          </a>
        </div>
        <div class="flex justify-center w-full">
          <GenericTable
            class="grow max-w-screen-xl"
          >
            <template #header>
              <GenericTableHeader :headers="headers" />
            </template>
            <template #content>
              <ApiKeysTableElement
                v-if="publicKey"
                :key="publicKey.id"
                :api-key="publicKey"
              />
              <ApiKeysTableElement
                v-if="secretKey"
                :key="secretKey.id"
                :api-key="secretKey"
                @destroy-api-key="() => destroyAPIKey(secretKey)"
              />
              <ApiKeysTableElement
                v-if="activationRequired"
                :key="secretKeyToActivate.id"
                :api-key="secretKeyToActivate"
                @activate-secret-key="createAPIKey"
              />
            </template>
          </GenericTable>
        </div>
      </div>
    </div>
  </div>
</template>
