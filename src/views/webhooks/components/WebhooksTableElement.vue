<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useWebhooksStore } from '@/stores/webhooks';
import { Webhook } from '@/api/interfaces/webhooks';
import GenericToggle from '@/components/GenericToggle.vue';

const $props = defineProps<{ webhook: Webhook }>();
const $userStore = useUserStore();
const $webhooksStore = useWebhooksStore();
const updating = ref(false);
const toggleActive = async () => {
  updating.value = true;
  await $webhooksStore.updateWebhook(
    $userStore.defaultOrganizationId,
    $props.webhook,
    { disabled: ($props.webhook.status === 'enabled') },
  );
  updating.value = false;
};
const remove = () => {
  $webhooksStore.removeWebhook($userStore.defaultOrganizationId, $props.webhook);
};
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-gray-900">
        {{ $props.webhook.url }}
      </p>
    </td>
    <td>
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
    <td>
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
