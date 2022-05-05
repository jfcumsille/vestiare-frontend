<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from '@/locales';
import { ButtonType } from '@/interfaces/utilities/enums';
import GenericModal from '@/components/GenericModal.vue';
import GenericButton from '@/components/GenericButton.vue';
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
    <div class="flex flex-row bg-danger-surface p-2 rounded-lg mb-2">
      <WarningIcon
        class="mt-1 ml-1 text-danger-main"
        fill="currentColor"
      />
      <div class="ml-2 text-body-color font-normal">
        {{ $t('warning') }}
      </div>
    </div>
    <p class="text-body-color font-normal">
      {{ $t('text') }}
    </p>
    <div class="w-full flex justify-end">
      <GenericButton
        class="mt-5"
        :type="ButtonType.Danger"
        :text="$t('confirmation')"
        :disabled="loading"
        @click="refresh"
      />
    </div>
  </GenericModal>
</template>
