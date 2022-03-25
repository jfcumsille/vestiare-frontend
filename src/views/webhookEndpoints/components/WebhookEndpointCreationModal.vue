<script setup lang="ts">
import { ref, watch } from 'vue';
import GenericModal from '@/components/GenericModal.vue';
import GenericInput from '@/components/GenericInput.vue';
import GenericTextArea from '@/components/GenericTextArea.vue';
import GenericCheckbox from '@/components/GenericCheckbox.vue';

const emit = defineEmits<{ (e: 'close'): void }>();

const eventNames = ['link.credentials_changed',
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

const urlError = ref('');

const isValidUrl = (possibleUrl: string) => {
  if (possibleUrl === '') {
    urlError.value = '';
    return true;
  }
  const expression = /^https:\/\/[^ ".]+\.[^ "]+$/;
  if (expression.test(possibleUrl)) {
    urlError.value = '';
    return true;
  }
  urlError.value = 'Invalid URL';
  return false;
};

watch(url, () => isValidUrl(url.value));
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
    </div>
  </GenericModal>
</template>
