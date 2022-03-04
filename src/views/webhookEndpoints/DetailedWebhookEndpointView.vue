<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import type { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';

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
  {{ webhookEndpoint }}
</template>
