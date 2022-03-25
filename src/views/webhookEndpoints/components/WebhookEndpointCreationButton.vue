<script setup lang="ts">
import { computed } from 'vue';
// import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';

const props = defineProps<{
  modalOpened: boolean,
  live: boolean,
}>();

const emit = defineEmits<{
  (e: 'open-modal'): void,
  (e: 'create'): void,
}>();

// const $webhookEndpointsStore = useWebhookEndpointsStore();

const disabledButton = computed(() => props.modalOpened);
</script>

<template>
  <button
    :disabled="disabledButton"
    type="button"
    class="
      py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white
      rounded-lg border border-gray-200 hover:bg-gray-100
      hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700
      focus:text-blue-700 inline-flex items-center
    "
    :class="{ 'opacity-50': disabledButton }"
    @click="emit('open-modal')"
  >
    Create Webhook Endpoint
  </button>
</template>
