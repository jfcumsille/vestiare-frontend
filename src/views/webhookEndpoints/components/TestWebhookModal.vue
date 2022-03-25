<script setup lang="ts">
import { ref } from 'vue';
import { decamelizeKeys } from 'humps';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import type { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import GenericModal from '@/components/GenericModal.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const props = defineProps<{ webhookEndpoint: WebhookEndpoint }>();

const emit = defineEmits<{ (e: 'close'): void }>();

const $t = useTranslation('views.webhookEndpoints.testWebhook');
const webhookEndpointsStore = useWebhookEndpointsStore();

const selectedEvent = ref<string>(props.webhookEndpoint.enabledEvents[0]);
const webhookBody = ref('');
const requestSent = ref(false);
const loading = ref(false);

const selectEvent = (event: string) => {
  selectedEvent.value = event;
};

const sendTestWebhook = async () => {
  requestSent.value = true;
  loading.value = true;

  const response = await webhookEndpointsStore.sendTestWebhook(
    props.webhookEndpoint,
    selectedEvent.value,
  );

  loading.value = false;
  webhookBody.value = JSON.stringify(
    decamelizeKeys(response.requestBody as object),
    null,
    2,
  );
};

const close = () => {
  emit('close');
};
</script>

<template>
  <GenericModal
    :title="$t('modalTitle')"
    @close="close"
  >
    <div
      v-if="!requestSent"
    >
      <GenericDropDown
        class="inline-block"
        :options="props.webhookEndpoint.enabledEvents"
        :selected="selectedEvent"
        @select="selectEvent"
      />
      <button
        class="
            mt-1 ml-2 h-12 px-4 rounded-md cursor-pointer
            text-blue-600 bg-blue-700/20 hover:bg-blue-700/10
          "
        @click="sendTestWebhook"
      >
        {{ $t('buttonText') }}
      </button>
    </div>
    <div v-else>
      <div
        v-if="loading"
        class="w-full flex"
      >
        <div class="mx-auto">
          <LoadingSpinner />
        </div>
      </div>
      <pre><code>{{ webhookBody }}</code></pre>
    </div>
  </GenericModal>
</template>
