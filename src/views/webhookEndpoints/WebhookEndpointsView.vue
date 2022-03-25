<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericTable from '@/components/GenericTable.vue';
import GenericTableHeader from '@/components/GenericTableHeader.vue';
import WebhookEndpointFilters from './components/WebhookEndpointFilters.vue';
import WebhookEndpointCreationButton from './components/WebhookEndpointCreationButton.vue';
import WebhookEndpointCreationModal from './components/WebhookEndpointCreationModal.vue';
import WebhookEndpointsTableElement from './components/WebhookEndpointsTableElement.vue';

const $t = useTranslation('views.webhookEndpoints');

const $webhookEndpointsStore = useWebhookEndpointsStore();

const live = ref(true);
const toggleLive = () => {
  live.value = !live.value;
};

const tableHeaders = [
  $t('table.headers.url'),
  $t('table.headers.description'),
  $t('table.headers.subscribedEventsAmount'),
  $t('table.headers.active'),
  '',
];

const modalOpened = ref(false);
const setModalOpened = (value: boolean) => {
  modalOpened.value = value;
};

const createWebhookEndpoint = () => {
  setModalOpened(false);
};

const webhookEndpoints = computed(
  () => (
    live.value
      ? $webhookEndpointsStore.liveWebhookEndpoints
      : $webhookEndpointsStore.testWebhookEndpoints
  ),
);
</script>

<template>
  <WebhookEndpointCreationModal
    v-if="modalOpened"
    @close="() => setModalOpened(false)"
  />
  <div class="flex justify-center w-full">
    <div class="grow flex justify-between mt-6 mx-4 max-w-screen-xl">
      <WebhookEndpointFilters
        :live="live"
        @toggle-live="toggleLive"
      />
      <WebhookEndpointCreationButton
        :live="live"
        :modal-opened="modalOpened"
        @open-modal="() => setModalOpened(true)"
        @create="createWebhookEndpoint"
      />
    </div>
  </div>
  <div class="flex justify-center w-full">
    <GenericTable class="grow mt-6 mx-4 max-w-screen-xl">
      <template #header>
        <GenericTableHeader :headers="tableHeaders" />
      </template>

      <template #content>
        <WebhookEndpointsTableElement
          v-for="webhookEndpoint in webhookEndpoints"
          :key="webhookEndpoint.id"
          :webhook-endpoint="webhookEndpoint"
        />
      </template>
    </GenericTable>
  </div>
  <div
    v-if="$webhookEndpointsStore.loading"
    class="flex justify-center w-full pt-4"
  >
    <LoadingSpinner />
  </div>
  <div
    v-if="!webhookEndpoints.length && !$webhookEndpointsStore.loading"
    class="flex justify-center w-full pt-4"
  >
    <p class="text-gray-900 text-3xl font-bold">
      {{ $t('table.noWebhookEndpointsFound') }}
    </p>
  </div>
</template>
