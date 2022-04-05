<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';

const props = defineProps<{
  modalOpened: boolean,
  live: boolean,
}>();

const emit = defineEmits<{
  (e: 'open-modal'): void,
  (e: 'create'): void,
}>();

const $t = useTranslation('views.webhookEndpoints.creation');

const disabledButton = computed(() => props.modalOpened);
</script>

<template>
  <button
    :disabled="disabledButton"
    type="button"
    class="
      py-2.5 px-5 text-sm font-medium text-gray-900 bg-white
      rounded-lg border border-gray-200 hover:bg-gray-100
      hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700
      focus:text-blue-700 inline-flex items-center min-w-max ml-6
    "
    :class="{ 'opacity-50': disabledButton }"
    @click="emit('open-modal')"
  >
    {{ $t('buttonText') }}
  </button>
</template>
