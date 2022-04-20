<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { APIKey } from '@/interfaces/entities/apiKeys';
import { Mode } from '@/interfaces/utilities/enums';
import { API_KEY_CREATED, API_KEY_DELETED, API_KEYS_VIEWED } from '@/constants/analyticsEvents';
import { page, track } from '@/services/analytics';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericToggle from '@/components/GenericToggle.vue';
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

const isLiveMode = ref(true);
const mode = computed(() => (isLiveMode.value ? Mode.Live : Mode.Test));
const publicKey = computed(() => apiKeysStore.searchKey(true, mode.value));
const secretKey = computed(() => apiKeysStore.searchKey(false, mode.value));

const toggle = () => {
  isLiveMode.value = !isLiveMode.value;
};

const createAPIKey = async () => {
  await apiKeysStore.createAPIKey();
  track(API_KEY_CREATED, {
    mode: Mode.Live,
    is_public: false,
  });
};
const destroyAPIKey = async (key: APIKey) => {
  await apiKeysStore.destroyAPIKey(key.id);
  track(API_KEY_DELETED, {
    id: key.id,
    mode: key.mode,
    is_public: key.isPublic,
  });
};

const activationRequired = computed(() => (isLiveMode.value && !secretKey.value));
const secretKeyToActivate: APIKey = {
  id: 'liveSecretKeyToActivate',
  token: 'token',
  isPublic: false,
  mode: Mode.Live,
  createdAt: '',
};

onMounted(async () => {
  page(API_KEYS_VIEWED);
});
</script>

<template>
  <div
    data-test="api-keys-view"
    class="flex items-center"
  >
    <div class="h-full w-full flex justify-center min-w-fit">
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
        <div class="flex flex-row justify-between items-center">
          <a
            class="text-primary-main text-sm"
            href="https://docs.fintoc.com/docs/api-keys"
          >
            {{ $t('learnMore') }}
          </a>
          <div>
            <div class="flex py-2 px-3 text-sm font-medium">
              <p
                data-test="mode-test"
                class="pr-4 text-body-color"
                :class="{ 'opacity-25 font-normal': isLiveMode }"
              >
                Test
              </p>
              <GenericToggle
                data-test="mode-toggle"
                :active="isLiveMode"
                @toggle="toggle"
              />
              <p
                data-test="mode-live"
                class="pl-4 text-body-color"
                :class="{ 'opacity-25 font-normal': !isLiveMode }"
              >
                Live
              </p>
            </div>
          </div>
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
