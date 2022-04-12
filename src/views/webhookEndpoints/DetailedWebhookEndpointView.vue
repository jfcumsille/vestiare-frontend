<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { Mode } from '@/interfaces/utilities/enums';
import analyticsEvents from '@/constants/analyticsEvents';
import GenericTable from '@/components/GenericTable.vue';
import GenericTableHeader from '@/components/GenericTableHeader.vue';
import DetailedWebhookEndpointTableContent from './components/DetailedWebhookEndpointTableContent.vue';
import TestWebhookModal from './components/TestWebhookModal.vue';

const $t = useTranslation('views.webhookEndpoints');

const $webhookEndpointsStore = useWebhookEndpointsStore();

const route = useRoute();

const testWebhookModalOpened = ref(false);

const webhookEndpoint = computed(() => (
  $webhookEndpointsStore.getById(route.params.webhookEndpointId as string)
));

const showTestButton = computed(() => (
  webhookEndpoint.value && webhookEndpoint.value.mode === Mode.Test
));
const showWebhookModal = computed(() => (
  testWebhookModalOpened.value
    && webhookEndpoint.value
    && webhookEndpoint.value.mode === Mode.Test
));

const toggleWebhookModal = () => {
  testWebhookModalOpened.value = !testWebhookModalOpened.value;
};

onMounted(async () => {
  window.analytics.page(analyticsEvents.DETAILED_WEBHOOK_ENDPOINTS_SCREEN_VIEWED);
});
</script>

<template>
  <TestWebhookModal
    v-if="showWebhookModal"
    :webhook-endpoint="webhookEndpoint!"
    @close="toggleWebhookModal"
  />
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
  <div
    v-if="showTestButton"
    class="flex justify-center w-full"
  >
    <div class="grow mt-6 mx-4 max-w-screen-xl">
      <button
        class="
            h-12 mt-1 ml-2 px-4 rounded-md cursor-pointer
            text-primary-main bg-primary-main/20 hover:bg-primary-hover/10
          "
        @click="toggleWebhookModal"
      >
        {{ $t('testWebhook.buttonText') }}
      </button>
    </div>
  </div>
</template>
