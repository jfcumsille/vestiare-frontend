<script setup lang="ts">
import { ref } from 'vue';
import { decamelizeKeys } from 'humps';
import type { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import GenericDropDown from '@/components/GenericDropDown.vue';

const props = defineProps<{ webhookEndpoint: WebhookEndpoint }>();

const webhookEndpointsStore = useWebhookEndpointsStore();

const selectedEvent = ref<string>(props.webhookEndpoint.enabledEvents[0]);
const webhookBody = ref('');

const selectEvent = (event: string) => {
  selectedEvent.value = event;
};

const sendTestWebhook = async () => {
  const response = await webhookEndpointsStore.sendTestWebhook(
    props.webhookEndpoint,
    selectedEvent.value,
  );

  webhookBody.value = JSON.stringify(
    decamelizeKeys(response.requestBody as object),
    null,
    2,
  );
};
</script>

<template>
  <h2 class="text-2xl my-2">
    Send a Test Webhook
  </h2>
  <div class="flex">
    <div class="w-1/2">
      <div class="flex">
        <GenericDropDown
          class="inline-block"
          :options="props.webhookEndpoint.enabledEvents"
          :selected="selectedEvent"
          @select="selectEvent"
        />
        <button
          class="
            mt-1 ml-2 px-4 rounded-md cursor-pointer
            text-blue-600 bg-blue-700/20 hover:bg-blue-700/10
          "
          @click="sendTestWebhook"
        >
          Send Test Webhook
        </button>
      </div>
    </div>
    <div class="w-1/2">
      <pre><code>{{ webhookBody }}</code></pre>
    </div>
  </div>
</template>
