<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslation } from '@/locales';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { APIKey } from '@/interfaces/entities/apiKeys';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericToggle from '@/components/GenericToggle.vue';
import LinksTable from '../links/components/LinksTable.vue';
import LinksTableHeader from '../links/components/LinksTableHeader.vue';
import ApiKeysTableElement from './components/ApiKeysTableElement.vue';

const $t = useTranslation('views.apiKeys');
const apiKeysStore = useAPIKeysStore();

const headers = [
  $t('table.headers.name'),
  $t('table.headers.token'),
  '',
];

const isLiveMode = ref(true);
const mode = computed(() => (isLiveMode.value ? 'live' : 'test'));
const publicKey = computed(() => apiKeysStore.searchKey(true, mode.value));
const secretKey = computed(() => apiKeysStore.searchKey(false, mode.value));

const toggle = () => {
  isLiveMode.value = !isLiveMode.value;
};

const createAPIKey = async () => {
  await apiKeysStore.createAPIKey();
};

const destroyAPIKey = async (key: APIKey) => {
  const params: Record<string, string> = {
    id: key.id,
  };
  await apiKeysStore.destroyAPIKey(params);
};

const secretKeyToActivate: APIKey = {
  id: 'liveSecretKeyToActivate',
  token: 'token',
  isPublic: false,
  mode: 'live',
};

</script>

<template>
  <div class="flex justify-center items-center">
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
        <div class="font-medium text-2xl text-heading-txt-color">
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
                class="pr-4 text-gray-900"
                :class="{ 'opacity-25 font-normal': isLiveMode }"
              >
                Test
              </p>
              <GenericToggle
                :active="isLiveMode"
                @toggle="toggle"
              />
              <p
                class="pl-4 text-gray-900"
                :class="{ 'opacity-25 font-normal': !isLiveMode }"
              >
                Live
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <LinksTable
            class="grow max-w-screen-xl"
          >
            <template #header>
              <LinksTableHeader :headers="headers" />
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
                @destroy-api-key="destroyAPIKey"
              />
              <ApiKeysTableElement
                v-if="!secretKey"
                :key="secretKeyToActivate.id"
                :api-key="secretKeyToActivate"
                @activate-secret-key="createAPIKey"
              />
            </template>
          </LinksTable>
        </div>
      </div>
    </div>
  </div>
</template>
