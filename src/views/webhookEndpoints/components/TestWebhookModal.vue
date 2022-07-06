<script setup lang="ts">
import { ref } from 'vue';
import { decamelizeKeys } from 'humps';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import type { WebhookEndpoint } from '@/interfaces/entities/webhookEndpoints';
import { ButtonType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
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
      class="flex flex-col sm:flex-row"
    >
      <GenericDropDown
        class="inline-block"
        :label="$t('event')"
        :options="props.webhookEndpoint.enabledEvents"
        :selected="selectedEvent"
        @select="selectEvent"
      />
      <GenericButton
        class="mt-4 sm:ml-4 sm:mt-0"
        :type="ButtonType.Secondary"
        :text="$t('buttonText')"
        @click="sendTestWebhook"
      />
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
