<script setup lang="ts">
import GenericModal from '@/components/GenericModal.vue';
import GenericInput from '@/components/GenericInput.vue';
import GenericTextArea from '@/components/GenericTextArea.vue';
import { ref } from 'vue';

const url = ref('');
const description = ref('');

const emit = defineEmits<{ (e: 'close'): void }>();
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
    />
    <GenericTextArea
      v-model="description"
      label="Description"
      placeholder="Optional description..."
    />
  </GenericModal>
</template>
