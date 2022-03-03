<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { WebhookEndpoint } from '@/api/interfaces/webhookEndpoints';
import GenericToggle from '@/components/GenericToggle.vue';

const $props = defineProps<{ webhookEndpoint: WebhookEndpoint }>();
const $userStore = useUserStore();
const $webhookEndpointsStore = useWebhookEndpointsStore();
const updating = ref(false);
const toggleActive = async () => {
  updating.value = true;
  await $webhookEndpointsStore.updateWebhook(
    $userStore.defaultOrganizationId,
    $props.webhookEndpoint,
    { disabled: ($props.webhookEndpoint.status === 'enabled') },
  );
  updating.value = false;
};
const remove = () => {
  $webhookEndpointsStore.removeWebhook($userStore.defaultOrganizationId, $props.webhookEndpoint);
};
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-gray-900">
        {{ $props.webhookEndpoint.url }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-normal text-gray-600">
        {{ $props.webhookEndpoint.description }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-medium">
        {{ $props.webhookEndpoint.enabledEvents.length }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-normal">
        {{ $props.webhookEndpoint.status === 'enabled' }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <GenericToggle
        :active="$props.webhookEndpoint.status ==='enabled'"
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
