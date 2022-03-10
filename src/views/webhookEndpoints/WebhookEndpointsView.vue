<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import GenericToggle from '@/components/GenericToggle.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import WebhookEndpointsTable from './components/WebhookEndpointsTable.vue';
import WebhookEndpointsTableHeader from './components/WebhookEndpointsTableHeader.vue';
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

const webhookEndpoints = computed(
  () => (
    live.value
      ? $webhookEndpointsStore.liveWebhookEndpoints
      : $webhookEndpointsStore.testWebhookEndpoints
  ),
);
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="grow flex justify-end mt-6 mx-4 max-w-screen-2xl">
      <div class="flex">
        <p
          class="pr-4 text-gray-900 text-md font-medium"
          :class="{ 'opacity-25': live }"
        >
          Test Webhook Endpoints
        </p>
        <GenericToggle
          :active="live"
          @toggle="toggleLive"
        />
        <p
          class="pl-4 text-gray-900 text-md font-medium"
          :class="{ 'opacity-25': !live }"
        >
          Live Webhook Endpoints
        </p>
      </div>
    </div>
  </div>
  <div class="flex justify-center w-full">
    <WebhookEndpointsTable class="grow mt-6 mx-4 max-w-screen-2xl">
      <template #header>
        <WebhookEndpointsTableHeader :headers="tableHeaders" />
      </template>

      <template #content>
        <WebhookEndpointsTableElement
          v-for="webhookEndpoint in webhookEndpoints"
          :key="webhookEndpoint.id"
          :webhook-endpoint="webhookEndpoint"
        />
      </template>
    </WebhookEndpointsTable>
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
