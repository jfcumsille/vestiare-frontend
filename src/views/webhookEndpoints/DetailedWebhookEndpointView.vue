<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import GenericTable from '@/components/GenericTable.vue';
import GenericTableHeader from '@/components/GenericTableHeader.vue';
import DetailedWebhookEndpointTableContent from './components/DetailedWebhookEndpointTableContent.vue';

const $t = useTranslation('views.webhookEndpoints');

const $webhookEndpointsStore = useWebhookEndpointsStore();

const route = useRoute();

const webhookEndpoint = computed(() => (
  $webhookEndpointsStore.getById(route.params.webhookEndpointId as string)
));
</script>

<template>
  <div class="flex justify-center w-full">
    <GenericTable class="grow mt-6 mx-4 max-w-screen-xl">
      <template #header>
        <GenericTableHeader :headers="[$t('details'), '']" />
      </template>

      <template #content>
        <DetailedWebhookEndpointTableContent
          v-if="webhookEndpoint !== undefined"
          :webhook-endpoint="webhookEndpoint"
        />
      </template>
    </GenericTable>
  </div>
</template>
