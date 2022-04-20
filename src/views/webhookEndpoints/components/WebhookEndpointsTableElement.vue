<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { WEBHOOK_ENDPOINT_DELETED } from '@/constants/analyticsEvents';
import { track } from '@/services/analytics';
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
  track(WEBHOOK_ENDPOINT_DELETED, {
    id: props.webhookEndpoint.id,
    origin: 'dashboard',
  });
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
        data-test="remove-webhook"
        class="text-danger-main cursor-pointer hover:underline"
        @click="remove"
      >{{ $t('remove') }}</a>
    </td>
  </tr>
</template>
