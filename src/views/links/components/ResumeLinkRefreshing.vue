<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from '@/locales';
import GenericModal from '@/components/GenericModal.vue';

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'refresh'): void,
}>();

const $t = useTranslation('views.links.refreshWarningModal');

const loading = ref(false);

const refresh = () => {
  loading.value = true;
  emit('refresh');
};
</script>

<template>
  <GenericModal
    :title="$t('title')"
    @close="emit('close')"
  >
    <p class="text-body-txt-color font-light">
      {{ $t('text') }}
    </p>
    <div class="w-full">
      <button
        :disabled="loading"
        class="
          items-center px-4 py-2 text-sm font-medium text-center
          rounded-md text-white bg-red-600 hover:bg-primary-hover
          shadow-md mt-4 ml-auto block
          disabled:bg-gray-300 disabled:cursor-default
        "
        @click="refresh"
      >
        {{ $t('confirmation') }}
      </button>
    </div>
  </GenericModal>
</template>
