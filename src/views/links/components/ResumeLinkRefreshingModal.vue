<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from '@/locales';
import GenericModal from '@/components/GenericModal.vue';
import WarningIcon from '@/assets/svg/WarningIcon.vue';

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
    <div class="flex flex-row bg-danger-surface p-2 rounded-md mb-2">
      <WarningIcon
        class="mt-1 ml-1 text-danger-main"
        fill="currentColor"
      />
      <div class="ml-2 text-body-color font-light">
        {{ $t('warning') }}
      </div>
    </div>
    <p class="text-body-color font-light">
      {{ $t('text') }}
    </p>
    <div class="w-full">
      <button
        :disabled="loading"
        class="
          items-center px-4 py-2 text-sm font-medium text-center
          rounded-md text-white bg-danger-main hover:bg-danger-hover
          shadow-md mt-4 ml-auto block
          disabled:bg-disabled-color disabled:cursor-default
        "
        @click="refresh"
      >
        {{ $t('confirmation') }}
      </button>
    </div>
  </GenericModal>
</template>
