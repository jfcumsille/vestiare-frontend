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
      py-2.5 px-5 text-sm font-medium text-heading-color bg-white
      rounded-lg border border-gray-200 hover:bg-light-gray
      hover:text-primary-main focus:z-10 focus:ring-2 focus:ring-primary-focus
      focus:text-primary-main inline-flex items-center min-w-max ml-6
    "
    :class="{ 'opacity-50': disabledButton }"
    @click="emit('open-modal')"
  >
    {{ $t('buttonText') }}
  </button>
</template>
