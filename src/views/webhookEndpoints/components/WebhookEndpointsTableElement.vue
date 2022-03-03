<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { WebhookEndpoint } from '@/api/interfaces/webhookEndpoints';
import GenericToggle from '@/components/GenericToggle.vue';

const $props = defineProps<{ webhook: WebhookEndpoint }>();
const $userStore = useUserStore();
const $webhookEndpointsStore = useWebhookEndpointsStore();
const updating = ref(false);
const toggleActive = async () => {
  updating.value = true;
  await $webhookEndpointsStore.updateWebhook(
    $userStore.defaultOrganizationId,
    $props.webhook,
    { disabled: ($props.webhook.status === 'enabled') },
  );
  updating.value = false;
};
const remove = () => {
  $webhookEndpointsStore.removeWebhook($userStore.defaultOrganizationId, $props.webhook);
};
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-gray-900">
        {{ $props.webhook.url }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-normal text-gray-600">
        {{ $props.webhook.description }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-medium">
        {{ $props.webhook.enabledEvents.length }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-normal">
        {{ $props.webhook.status === 'enabled' }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <GenericToggle
        :active="$props.webhook.status ==='enabled'"
        :loading="updating"
        @toggle="toggleActive"
      />
    </td>
    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
      <a
        class="text-red-600 cursor-pointer hover:underline"
        @click="remove"
      >Remove</a>
    </td>
  </tr>
</template>
