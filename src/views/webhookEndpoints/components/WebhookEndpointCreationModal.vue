<script setup lang="ts">
import { ref, watch } from 'vue';
import GenericModal from '@/components/GenericModal.vue';
import GenericInput from '@/components/GenericInput.vue';
import GenericTextArea from '@/components/GenericTextArea.vue';

const emit = defineEmits<{ (e: 'close'): void }>();

const url = ref('');
const urlError = ref('');
const description = ref('');

const validateUrl = () => {
  if (url.value === '') {
    urlError.value = '';
  } else {
    const expression = /^https:\/\/[^ ".]+\.[^ "]+$/;
    urlError.value = expression.test(url.value) ? '' : 'Invalid URL';
  }
};

watch(url, validateUrl);
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
