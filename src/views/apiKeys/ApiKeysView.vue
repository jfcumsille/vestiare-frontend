<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslation } from '@/locales';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { useUserStore } from '@/stores/user';
import { APIKey } from '@/interfaces/entities/apiKeys';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericToggle from '@/components/GenericToggle.vue';
import WarningIcon from '@/components/images/WarningIcon.vue';
import LinksTable from '../links/components/LinksTable.vue';
import LinksTableHeader from '../links/components/LinksTableHeader.vue';
import ApiKeysTableElement from './components/ApiKeysTableElement.vue';

const $t = useTranslation('views.apiKeys');
const apiKeysStore = useAPIKeysStore();
const userStore = useUserStore();

const headers = [
  $t('table.headers.name'),
  $t('table.headers.token'),
  // $t('table.headers.created'),
  '',
];

const isLiveMode = ref(false);
const mode = computed(() => (isLiveMode.value ? 'live' : 'test'));
const publicKey = computed(() => apiKeysStore.searchKey(true, mode.value));
const secretKey = computed(() => apiKeysStore.searchKey(false, mode.value));

const toggle = () => {
  isLiveMode.value = !isLiveMode.value;
};

const showRotateKeyModal = ref(false);
// const modalKey = ref(null);
// const modalKeyName = ref('');
// const openRotateKeyModal = (key: APIKey, name: string) => {
//   modalKey.value = key;
//   modalKeyName.value = name;
//   showRotateKeyModal.value = true;
// };
// const closeRotateKeyModal = () => {
//   showRotateKeyModal.value = false;
// };

const createAPIKey = async (params: Record<string, string>) => {
  await apiKeysStore.createAPIKey(params);
};

const destroyAPIKey = async (params: Record<string, string>) => {
  await apiKeysStore.destroyAPIKey(params);
};

const secretKeyToActivate: APIKey = {
  id: 'liveSecretKeyToActivate',
  token: 'token',
  isPublic: false,
  mode: 'live',
};

const activateSecretKey = () => {
  const orgParams = userStore.organizationParams;
  createAPIKey(orgParams);
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
                @open-modal="destroyAPIKey"
              />
              <ApiKeysTableElement
                v-if="!secretKey"
                :key="secretKeyToActivate.id"
                :api-key="secretKeyToActivate"
                @activate-secret-key="activateSecretKey"
              />
            </template>
          </LinksTable>
        </div>
      </div>
    </div>
    <div
      v-if="showRotateKeyModal"
      class="h-full w-full absolute top-0 left-0 bg-heading-txt-color opacity-20 z-20"
    />
    <div
      v-if="showRotateKeyModal"
      class="absolute mt-24 max-w-fit z-30 w-full justify-center content-center"
    >
      <div class="bg-white rounded-md flex flex-col min-w-fit p-8 drop-shadow-sm">
        <div class="text-2xl text-heading-txt-color">
          {{ $t('modal.title') }}
        </div>
        <div class="mt-5 flex flex-row bg-warning-surface p-2 rounded-md">
          <WarningIcon class="mt-1 ml-1" />
          <div class="max-w-xs ml-2 text-body-txt-color font-light">
            {{ $t('modal.warning') }}
          </div>
        </div>
        <div class="mt-5 flex flex-row bg-gray-100 p-4 rounded-md text-body-txt-color">
          <div class="flex flex-col">
            <div>{{ $t('modal.name') }}</div>
            <div>{{ $t('modal.token') }}</div>
            <div>{{ $t('modal.created') }}</div>
          </div>
          <div class="ml-4 flex flex-col font-light">
            <div>
              {{ modalKeyName }}
            </div>
            <div class="max-w-xxs truncate">
              {{ modalKey.token }}
            </div>
            <div>Dec 03 2021 – 09:21</div>
          </div>
        </div>
        <div class="flex justify-end mt-5">
          <button
            class="items-center px-4 py-2 text-sm font-medium text-center border
              rounded text-body-txt-color bg-white hover:bg-gray-100"
            @click="closeRotateKeyModal"
          >
            Cancel
          </button>
          <button
            class="
              ml-3 items-center px-4 py-2 text-sm font-medium text-center
              rounded text-white bg-primary-main hover:bg-primary-main-hover
            "
          >
            {{ $t('modal.title') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
