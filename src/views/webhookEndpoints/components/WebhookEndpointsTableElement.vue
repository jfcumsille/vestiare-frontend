<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import GenericToggle from '@/components/GenericToggle.vue';

const props = defineProps<{ webhookEndpoint: WebhookEndpoint }>();

const $t = useTranslation('views.webhookEndpoints.table.buttons');

const $webhookEndpointsStore = useWebhookEndpointsStore();

const router = useRouter();

const updating = ref(false);

const toggleActive = async () => {
  updating.value = true;
  await $webhookEndpointsStore.updateWebhookEndpoint(
    props.webhookEndpoint,
    { disabled: (props.webhookEndpoint.status === 'enabled') },
  );
  updating.value = false;
};

const remove = () => {
  $webhookEndpointsStore.removeWebhookEndpoint(props.webhookEndpoint);
};

const openDetailedView = () => {
  router.push({ path: `/webhook-endpoints/${props.webhookEndpoint.id}` });
};
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td
      class="py-4 px-6 text-sm font-medium whitespace-nowrap cursor-pointer"
      @click="openDetailedView"
    >
      <p class="text-gray-900">
        {{ props.webhookEndpoint.url }}
      </p>
    </td>
    <td
      class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap cursor-pointer"
      @click="openDetailedView"
    >
      <p class="font-normal text-gray-600">
        {{ props.webhookEndpoint.description }}
      </p>
    </td>
    <td
      class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap cursor-pointer"
      @click="openDetailedView"
    >
      <p class="font-medium">
        {{ props.webhookEndpoint.enabledEvents.length }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <GenericToggle
        :active="props.webhookEndpoint.status ==='enabled'"
        :loading="updating"
        @toggle="toggleActive"
      />
    </td>
    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
      <a
        class="text-red-600 cursor-pointer hover:underline"
        @click="remove"
      >{{ $t('remove') }}</a>
    </td>
  </tr>
</template>
