<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import type { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';

const $props = defineProps<{ webhookEndpoint: WebhookEndpoint }>();

const $userStore = useUserStore();
const $webhookEndpointsStore = useWebhookEndpointsStore();

const secret = ref<string | null>(null);

const revealWebhookEndpointSecret = async () => {
  secret.value = await $webhookEndpointsStore.getWebhookEndpointSecret(
    $userStore.defaultOrganizationId,
    $props.webhookEndpoint,
  );
};
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <p class="text-gray-900">
        URL
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-normal text-gray-600">
        {{ $props.webhookEndpoint.url }}
      </p>
    </td>
  </tr>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <p class="text-gray-900">
        Webhook Endpoint Secret
      </p>
    </td>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p v-if="secret">
        {{ secret }}
      </p>
      <a
        v-else
        class="
          px-4 py-2 rounded-md cursor-pointer
          text-blue-600 bg-blue-700/20 hover:bg-blue-700/10
        "
        @click="revealWebhookEndpointSecret"
      >Reveal</a>
    </td>
  </tr>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <p class="text-gray-900">
        Descripción
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-normal text-gray-600">
        {{ $props.webhookEndpoint.description }}
      </p>
    </td>
  </tr>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
      <p class="text-gray-900">
        Tipos de evento
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p
        v-for="event in $props.webhookEndpoint.enabledEvents"
        :key="event"
        class="font-normal text-gray-600"
      >
        {{ event }}
      </p>
    </td>
  </tr>
</template>
