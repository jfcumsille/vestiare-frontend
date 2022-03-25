<script setup lang="ts">
import { ref, watch } from 'vue';
import GenericModal from '@/components/GenericModal.vue';
import GenericInput from '@/components/GenericInput.vue';
import GenericTextArea from '@/components/GenericTextArea.vue';

const emit = defineEmits<{ (e: 'close'): void }>();

const url = ref('');
const description = ref('');

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
  </GenericModal>
</template>
