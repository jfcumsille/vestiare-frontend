<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTranslation } from '@/locales';
import { useUserStore } from '@/stores/user';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import type { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import WebhookEndpointsTable from './components/WebhookEndpointsTable.vue';
import WebhookEndpointsTableHeader from './components/WebhookEndpointsTableHeader.vue';
import DetailedWebhookEndpointTableContent from './components/DetailedWebhookEndpointTableContent.vue';

const $t = useTranslation('views.webhookEndpoints');

const $userStore = useUserStore();
const $webhookEndpointsStore = useWebhookEndpointsStore();

const route = useRoute();

const webhookEndpoint = ref<WebhookEndpoint | undefined>(undefined);

onMounted(async () => {
  if (!$webhookEndpointsStore.webhookEndpoints.length) {
    await $webhookEndpointsStore.getWebhookEndpoints($userStore.defaultOrganizationId);
  }
  webhookEndpoint.value = $webhookEndpointsStore.getById(route.params.webhookEndpointId as string);
});
</script>

<template>
  <div class="flex justify-center w-full">
    <WebhookEndpointsTable class="grow mt-6 mx-4 max-w-screen-2xl">
      <template #header>
        <WebhookEndpointsTableHeader :headers="[$t('details'), '']" />
      </template>

      <template #content>
        <DetailedWebhookEndpointTableContent
          v-if="webhookEndpoint !== undefined"
          :webhook-endpoint="webhookEndpoint"
        />
      </template>
    </WebhookEndpointsTable>
  </div>
</template>
