<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useWebhooksStore } from '@/stores/webhooks';
import GenericToggle from '@/components/GenericToggle.vue';
import WebhooksTable from './components/WebhooksTable.vue';
import WebhooksTableHeader from './components/WebhooksTableHeader.vue';
import WebhooksTableElement from './components/WebhooksTableElement.vue';

const $userStore = useUserStore();
const $webhooksStore = useWebhooksStore();
const headers = ['URL', 'Description', '# Subscribed events', 'Active', '', ''];

const live = ref(true);
const toggleLive = () => {
  live.value = !live.value;
};
onMounted(() => {
  $webhooksStore.get($userStore.defaultOrganizationId, 'live');
  $webhooksStore.get($userStore.defaultOrganizationId, 'test');
});

const webhooksList = computed(
  () => (live.value ? $webhooksStore.liveWebhookEndpoints : $webhooksStore.testWebhookEndpoints),
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
    <WebhooksTable
      v-if="!$webhooksStore.loading"
      class="grow mt-6 mx-4 max-w-screen-2xl"
    >
      <template #header>
        <WebhooksTableHeader :headers="headers" />
      </template>

      <template #content>
        <WebhooksTableElement
          v-for="webhook in webhooksList"
          :key="webhook.id"
          :webhook="webhook"
        />
      </template>
    </WebhooksTable>
  </div>
</template>
