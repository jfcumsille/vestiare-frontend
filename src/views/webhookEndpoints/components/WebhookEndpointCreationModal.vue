<script setup lang="ts">
import GenericModal from '@/components/GenericModal.vue';

const emit = defineEmits<{ (e: 'close'): void }>();
</script>

<template>
  <GenericModal
    title="Create Webhook Endpoint"
    @close="emit('close')"
  >
    A
  </GenericModal>
</template>
