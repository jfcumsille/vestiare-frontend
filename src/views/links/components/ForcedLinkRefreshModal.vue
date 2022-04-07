<script setup lang="ts">
import GenericModal from '@/components/GenericModal.vue';

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'refresh'): void,
}>();
</script>

<template>
  <GenericModal
    title="Force Link Refresh"
    @close="emit('close')"
  >
    <div @click="emit('refresh')">
      A
    </div>
  </GenericModal>
</template>
