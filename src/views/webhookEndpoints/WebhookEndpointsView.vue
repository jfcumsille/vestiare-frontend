<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { WEBHOOK_ENDPOINTS_VIEWED } from '@/constants/analyticsEvents';
import { DOCS_WEBHOOKS } from '@/constants/urls';
import { page, trackModal } from '@/services/analytics';
import { ButtonType, HorizontalPositionType } from '@/interfaces/utilities/enums';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericTable from '@/components/GenericTable.vue';
import GenericTableHeader from '@/components/GenericTableHeader.vue';
import GenericButton from '@/components/GenericButton.vue';
import WebhookEndpointCreationModal from './components/WebhookEndpointCreationModal.vue';
import WebhookEndpointsTableElement from './components/WebhookEndpointsTableElement.vue';

const $t = useTranslation('views.webhookEndpoints');

const $webhookEndpointsStore = useWebhookEndpointsStore();

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
  trackModal(value, 'webhook_endpoints', 'create');
};

const webhookEndpoints = computed(
  () => ($webhookEndpointsStore.webhookEndpoints),
);

onMounted(() => {
  page(WEBHOOK_ENDPOINTS_VIEWED, { type: 'main' });
});
</script>

<template>
  <div
    data-test="webhook-endpoints-view"
    class="flex flex-col p-10 items-center max-w-screen-xl w-full"
  >
    <WebhookEndpointCreationModal
      v-if="modalOpened"
      @close="() => setModalOpened(false)"
    />
    <div class="flex flex-col w-full">
      <div class="flex justify-between">
        <div class="font-medium text-2xl text-heading-color self-start">
          {{ $t('title') }}
        </div>
        <GenericButton
          data-test="webhook-create-button"
          :type="ButtonType.Primary"
          :text="$t('creation.buttonText')"
          :disabled="modalOpened"
          icon-name="add"
          :icon-position="HorizontalPositionType.Right"
          @click="() => setModalOpened(true)"
        />
      </div>
      <div class="flex justify-between items-end">
        <div
          class="text-body-color font-light max-w-2xl pr-2"
        >
          {{ $t('subtitle') }}
        </div>
        <div>
          <a
            class="text-primary-main hover:text-primary-hover"
            :href="DOCS_WEBHOOKS"
            target="_blank"
          >
            {{ $t('whatisAWebhookEndpoint') }}
          </a>
        </div>
        <a
          class="text-primary-main hover:text-primary-hover"
          :href="DOCS_WEBHOOKS"
          target="_blank"
        >
          {{ $t('learnMore') }}
        </a>
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
