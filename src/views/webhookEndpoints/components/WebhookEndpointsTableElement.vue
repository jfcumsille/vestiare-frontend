<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import analyticsEvents from '@/constants/analyticsEvents';
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
  window.analytics.track(analyticsEvents.WEBHOOK_ENDPOINT_ACTIVE_TOGGLE_CLICKED, {
    id: props.webhookEndpoint.id,
    status: props.webhookEndpoint.status,
  });
};

const remove = () => {
  $webhookEndpointsStore.removeWebhookEndpoint(props.webhookEndpoint);
  window.analytics.track(analyticsEvents.DELETE_WEBHOOK_ENDPOINT_CLICKED);
};

const openDetailedView = () => {
  router.push({ path: `/webhook-endpoints/${props.webhookEndpoint.id}` });
};
</script>

<template>
  <tr class="bg-white border-b hover:bg-light-gray">
    <td
      class="py-4 px-6 text-sm font-medium whitespace-nowrap cursor-pointer"
      @click="openDetailedView"
    >
      <p class="text-heading-color">
        {{ props.webhookEndpoint.url }}
      </p>
    </td>
    <td
      class="py-4 px-6 text-sm text-body-color whitespace-nowrap cursor-pointer"
      @click="openDetailedView"
    >
      <p class="font-normal text-body-color">
        {{ props.webhookEndpoint.description }}
      </p>
    </td>
    <td
      class="py-4 px-6 text-sm text-body-color whitespace-nowrap cursor-pointer"
      @click="openDetailedView"
    >
      <p class="font-medium">
        {{ props.webhookEndpoint.enabledEvents.length }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-body-color whitespace-nowrap">
      <GenericToggle
        :active="props.webhookEndpoint.status ==='enabled'"
        :loading="updating"
        @toggle="toggleActive"
      />
    </td>
    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
      <a
        class="text-danger-main cursor-pointer hover:underline"
        @click="remove"
      >{{ $t('remove') }}</a>
    </td>
  </tr>
</template>
