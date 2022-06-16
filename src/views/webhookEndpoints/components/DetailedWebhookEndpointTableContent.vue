<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { Nullable } from '@/interfaces/common';
import type { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { Mode } from '@/interfaces/utilities/enums';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';
import TableLabel from '@/components/table/utils/TableLabel.vue';
import GenericBadge from '@/components/GenericBadge.vue';

const $t = useTranslation('views.webhookEndpoints.table');

const props = defineProps<{ webhookEndpoint: WebhookEndpoint }>();

const $webhookEndpointsStore = useWebhookEndpointsStore();

const secret = ref<Nullable<string>>(null);
const loading = ref(false);

const revealWebhookEndpointSecret = async () => {
  if (!loading.value) {
    loading.value = true;
    secret.value = await $webhookEndpointsStore.getWebhookEndpointSecret(
      props.webhookEndpoint,
    );
    loading.value = false;
  }
};
</script>

<template>
  <TableRow>
    <TableData>
      <TableLabel
        :label="$t('headers.url')"
      />
    </TableData>
    <TableData>
      <TableLabel
        :sub-label="props.webhookEndpoint.url"
      />
    </TableData>
  </TableRow>
  <TableRow>
    <TableData>
      <TableLabel
        :label="$t('headers.mode')"
      />
    </TableData>
    <TableData>
      <GenericBadge
        :text="props.webhookEndpoint.mode"
        class="capitalize"
        :color="props.webhookEndpoint.mode === Mode.Live ? 'green' : 'yellow'"
      />
    </TableData>
  </TableRow>
  <TableRow>
    <TableData>
      <TableLabel
        :label="$t('headers.active')"
      />
    </TableData>
    <TableData>
      <GenericBadge
        :text="props.webhookEndpoint.status === 'enabled' ? 'active' : 'inactive'"
        class="capitalize"
        :color="props.webhookEndpoint.status === 'enabled' ? 'green' : 'red'"
      />
    </TableData>
  </TableRow>
  <TableRow>
    <TableData>
      <TableLabel
        :label="$t('headers.webhookEndpointSecret')"
      />
    </TableData>
    <TableData>
      <TableLabel
        v-if="secret"
        :sub-label="secret"
      />
      <a
        v-else
        class="
          px-4 py-2 rounded-lg cursor-pointer text-sm
          text-primary-main bg-primary-main/20 hover:bg-primary-hover/10
        "
        @click="revealWebhookEndpointSecret"
      >{{ $t('buttons.revealWebhookEndpointSecret') }}</a>
    </TableData>
  </TableRow>
  <TableRow>
    <TableData>
      <TableLabel
        :label="$t('headers.name')"
      />
    </TableData>
    <TableData>
      <TableLabel
        :sub-label="props.webhookEndpoint.name"
      />
    </TableData>
  </TableRow>
  <TableRow>
    <TableData>
      <TableLabel
        :label="$t('headers.description')"
      />
    </TableData>
    <TableData>
      <TableLabel
        :sub-label="props.webhookEndpoint.description"
      />
    </TableData>
  </TableRow>
  <TableRow>
    <TableData>
      <TableLabel
        :label="$t('headers.types')"
      />
    </TableData>
    <TableData>
      <TableLabel
        v-for="event in props.webhookEndpoint.enabledEvents"
        :key="event"
        :sub-label="event"
      />
    </TableData>
  </TableRow>
</template>
