<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { Nullable } from '@/interfaces/common';
import type { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { Mode } from '@/interfaces/utilities/enums';
import TableRow from '@/components/table/TableRow.vue';
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
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-heading-color">
        {{ $t('headers.url') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm whitespace-nowrap">
      <p class="font-normal text-body-color">
        {{ props.webhookEndpoint.url }}
      </p>
    </td>
  </TableRow>
  <TableRow>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-heading-color">
        {{ $t('headers.mode') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm whitespace-nowrap">
      <GenericBadge
        :text="props.webhookEndpoint.mode"
        class="capitalize"
        :color="props.webhookEndpoint.mode === Mode.Live ? 'green' : 'yellow'"
      />
    </td>
  </TableRow>
  <TableRow>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-heading-color">
        {{ $t('headers.active') }}?
      </p>
    </td>
    <td class="py-4 px-6 text-sm whitespace-nowrap">
      <GenericBadge
        :text="props.webhookEndpoint.status === 'enabled' ? 'active' : 'inactive'"
        class="capitalize"
        :color="props.webhookEndpoint.status === 'enabled' ? 'green' : 'red'"
      />
    </td>
  </TableRow>
  <TableRow>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-heading-color">
        {{ $t('headers.webhookEndpointSecret') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p
        v-if="secret"
        class="text-body-color"
      >
        {{ secret }}
      </p>
      <a
        v-else
        class="
          px-4 py-2 rounded-lg cursor-pointer
          text-primary-main bg-primary-main/20 hover:bg-primary-hover/10
        "
        @click="revealWebhookEndpointSecret"
      >{{ $t('buttons.revealWebhookEndpointSecret') }}</a>
    </td>
  </TableRow>
  <TableRow>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-heading-color">
        {{ $t('headers.name') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm whitespace-nowrap">
      <p class="font-normal text-body-color">
        {{ props.webhookEndpoint.name }}
      </p>
    </td>
  </TableRow>
  <TableRow>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-heading-color">
        {{ $t('headers.description') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm whitespace-nowrap">
      <p class="font-normal text-body-color">
        {{ props.webhookEndpoint.description }}
      </p>
    </td>
  </TableRow>
  <TableRow>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <p class="text-heading-color">
        {{ $t('headers.types') }}
      </p>
    </td>
    <td class="py-4 px-6 text-sm whitespace-nowrap">
      <p
        v-for="event in props.webhookEndpoint.enabledEvents"
        :key="event"
        class="font-normal text-body-color"
      >
        {{ event }}
      </p>
    </td>
  </TableRow>
</template>
