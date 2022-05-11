<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { WEBHOOK_ENDPOINTS_VIEWED } from '@/constants/analyticsEvents';
import { page } from '@/services/analytics';
import { Mode, ButtonType, SizeType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
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

onMounted(() => {
  page(WEBHOOK_ENDPOINTS_VIEWED, { type: 'detail' });
});
</script>

<template>
  <div data-test="detailed-webhook-endpoints-view">
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
  </div>
  <div
    v-if="showTestButton"
    class="flex justify-center w-full"
  >
    <div class="grow mt-6 mx-4 max-w-screen-xl">
      <GenericButton
        :type="ButtonType.Secondary"
        :text="$t('testWebhook.buttonText')"
        :size="SizeType.Medium"
        @click="toggleWebhookModal"
      />
    </div>
  </div>
</template>
