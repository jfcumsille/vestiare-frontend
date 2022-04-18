<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import {
  ENVIRONMENT_CHANGED,
  MODAL_VIEWED,
  MODAL_CLOSED,
  WEBHOOK_ENDPOINTS_VIEWED,
} from '@/constants/analyticsEvents';
import { page, track } from '@/services/analytics';
import { Mode } from '@/interfaces/utilities/enums';
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
  track(ENVIRONMENT_CHANGED, {
    mode: live.value ? Mode.Live : Mode.Test,
    location: 'webhook_endpoints',
  });
};

const tableHeaders = [
  $t('table.headers.url'),
  $t('table.headers.description'),
  $t('table.headers.subscribedEventsAmount'),
  $t('table.headers.active'),
  '',
];

const trackCreateWebhookModal = (opened: boolean) => {
  if (opened) {
    track(MODAL_VIEWED, {
      location: 'webhook_endpoints',
      action: 'create',
    });
  } else {
    track(MODAL_CLOSED, {
      location: 'webhook_endpoints',
      action: 'create',
    });
  }
};

const modalOpened = ref(false);
const setModalOpened = (value: boolean) => {
  modalOpened.value = value;
  trackCreateWebhookModal(value);
};

const webhookEndpoints = computed(
  () => (
    live.value
      ? $webhookEndpointsStore.liveWebhookEndpoints
      : $webhookEndpointsStore.testWebhookEndpoints
  ),
);

onMounted(async () => {
  page(WEBHOOK_ENDPOINTS_VIEWED, {
    type: 'main',
  });
});
</script>

<template>
  <div class="flex flex-col mx-auto p-6 items-center max-w-screen-xl w-full">
    <WebhookEndpointCreationModal
      v-if="modalOpened"
      :live="live"
      @close="() => setModalOpened(false)"
    />
    <div class="flex flex-col w-full">
      <div class="flex justify-between">
        <WebhookEndpointFilters
          :live="live"
          @toggle-live="toggleLive"
        />
        <WebhookEndpointCreationButton
          :live="live"
          :modal-opened="modalOpened"
          @open-modal="() => setModalOpened(true)"
        />
      </div>
      <GenericTable class="mt-6">
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
      <p class="text-heading-color text-3xl font-bold">
        {{ $t('table.noWebhookEndpointsFound') }}
      </p>
    </div>
  </div>
</template>
