<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import GenericToggle from '@/components/GenericToggle.vue';
import WebhookEndpointsTable from './components/WebhookEndpointsTable.vue';
import WebhookEndpointsTableHeader from './components/WebhookEndpointsTableHeader.vue';
import WebhookEndpointsTableElement from './components/WebhookEndpointsTableElement.vue';

const $userStore = useUserStore();
const $webhookEndpointsStore = useWebhookEndpointsStore();

const headers = ['URL', 'Description', '# Subscribed events', 'Active', '', ''];

const live = ref(true);
const toggleLive = () => {
  live.value = !live.value;
};

const webhookEndpoints = computed(
  () => (
    live.value
      ? $webhookEndpointsStore.liveWebhookEndpoints
      : $webhookEndpointsStore.testWebhookEndpoints
  ),
);

onMounted(() => {
  $webhookEndpointsStore.getWebhookEndpoints($userStore.defaultOrganizationId);
});
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
    <WebhookEndpointsTable
      v-if="!$webhookEndpointsStore.loading"
      class="grow mt-6 mx-4 max-w-screen-2xl"
    >
      <template #header>
        <WebhookEndpointsTableHeader :headers="headers" />
      </template>

      <template #content>
        <WebhookEndpointsTableElement
          v-for="webhook in webhookEndpoints"
          :key="webhook.id"
          :webhook="webhook"
        />
      </template>
    </WebhookEndpointsTable>
  </div>
</template>
