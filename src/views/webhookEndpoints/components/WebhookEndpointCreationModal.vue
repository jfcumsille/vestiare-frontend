<script setup lang="ts">
import { ref, watch } from 'vue';
import GenericModal from '@/components/GenericModal.vue';
import GenericInput from '@/components/GenericInput.vue';
import GenericTextArea from '@/components/GenericTextArea.vue';
import GenericCheckbox from '@/components/GenericCheckbox.vue';

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'create', data: any): void,
}>();

const eventNames = [
  'link.credentials_changed',
  'payment_intent.succeeded',
  'payment_intent.failed',
  'account.refresh_intent.succeeded',
  'link.refresh_intent.succeeded',
  'account.refresh_intent.failed',
  'payment_intent.rejected',
  'link.refresh_intent.failed',
  'account.refresh_intent.rejected',
];

const url = ref('');
const description = ref('');
const events = ref(eventNames.map((name) => ({ name, checked: false })));
const loading = ref(false);

const urlError = ref('');
const eventsError = ref('');

const isValidUrl = (possibleUrl: string) => {
  const expression = /^https:\/\/[^ ".]+\.[^ "]+$/;
  if (expression.test(possibleUrl)) {
    urlError.value = '';
    return true;
  }
  urlError.value = 'Invalid URL';
  return false;
};

const areValidEvents = () => {
  if (events.value.some((event) => event.checked)) {
    return true;
  }
  eventsError.value = 'At least one event is required to be selected';
  return false;
};

const createWebhookEndpoint = () => {
  const urlIsValid = isValidUrl(url.value);
  const eventsAreValid = areValidEvents();
  if (urlIsValid && eventsAreValid) {
    emit('create', {});
  }
};

watch(url, () => isValidUrl(url.value));
watch(events.value, () => { eventsError.value = ''; });
</script>

<template>
  <GenericModal
    title="Create Webhook Endpoint"
    @close="emit('close')"
  >
    <div class="space-y-3">
      <GenericInput
        v-model="url"
        label="Webhook URL"
        placeholder="https://your.backend/webhook"
        :error="urlError"
      />
      <GenericTextArea
        v-model="description"
        label="Description"
        placeholder="Optional description..."
      />
      <p class="text-xl">
        Events
      </p>
      <GenericCheckbox
        v-for="event in events"
        :key="event.name"
        v-model="event.checked"
        :text="event.name"
      />
      <p
        v-if="eventsError"
        class="mt-1 text-sm font-bold text-red-600"
      >
        {{ eventsError }}
      </p>
    </div>
    <div class="w-full flex justify-end">
      <button
        :disabled="loading"
        type="button"
        class="
          py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white
          rounded-lg border border-gray-200 hover:bg-gray-100
          hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700
          focus:text-blue-700 inline-flex items-center
        "
        :class="{ 'opacity-50': loading }"
        @click="createWebhookEndpoint"
      >
        Create Webhook Endpoint
      </button>
    </div>
  </GenericModal>
</template>
