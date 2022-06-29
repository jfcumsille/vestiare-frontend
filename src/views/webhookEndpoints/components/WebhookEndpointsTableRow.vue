<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { WEBHOOK_ENDPOINT_DELETED } from '@/constants/analyticsEvents';
import { trackId } from '@/services/analytics';
import GenericToggle from '@/components/GenericToggle.vue';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';
import TableLabel from '@/components/table/utils/TableLabel.vue';

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
  trackId(WEBHOOK_ENDPOINT_DELETED, props.webhookEndpoint.id);
};

const openDetailedView = () => {
  router.push({ path: `/webhook-endpoints/${props.webhookEndpoint.id}` });
};
</script>

<template>
  <TableRow class="cursor-pointer">
    <TableData
      class="max-w-xs"
      @click="openDetailedView"
    >
      <TableLabel
        :label="props.webhookEndpoint.url"
      />
    </TableData>
    <TableData
      class="max-w-xs"
      @click="openDetailedView"
    >
      <TableLabel
        :label="props.webhookEndpoint.description"
      />
    </TableData>
    <TableData
      @click="openDetailedView"
    >
      <TableLabel
        :label="props.webhookEndpoint.enabledEvents.length.toString()"
      />
    </TableData>
    <TableData>
      <GenericToggle
        :active="props.webhookEndpoint.status ==='enabled'"
        :loading="updating"
        @toggle="toggleActive"
      />
    </TableData>
    <TableData>
      <a
        data-test="remove-webhook"
        class="
          text-sm font-medium text-right whitespace-nowrap
          text-danger-main cursor-pointer hover:underline"
        @click="remove"
      >{{ $t('remove') }}</a>
    </TableData>
  </TableRow>
</template>
