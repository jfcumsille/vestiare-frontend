<script setup lang="ts">
import { ref } from 'vue';
import { ButtonType } from '@/interfaces/utilities/enums';
import GenericModal from '@/components/GenericModal.vue';
import GenericButton from '@/components/GenericButton.vue';
import WarningIcon from '@/assets/svg/WarningIcon.vue';

const props = withDefaults(defineProps<{
  title: string,
  warning: string,
  subtitle: string,
  confirmation: string,
}>(), {
  loading: false,
});

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'confirm'): void,
}>();

const loading = ref(false);

const confirm = () => {
  loading.value = true;
  emit('confirm');
};

</script>
<template>
  <GenericModal
    :title="props.title"
    @close="emit('close')"
  >
    <div class="flex flex-row bg-danger-surface p-2 rounded-lg mb-2 max-w-lg">
      <WarningIcon
        class="mt-1 ml-1 text-danger-main"
        fill="currentColor"
      />
      <div class="ml-2 text-body-color font-normal">
        {{ props.warning }}
      </div>
    </div>
    <p class="text-body-color font-normal max-w-lg">
      {{ props.subtitle }}
    </p>
    <div class="w-full flex justify-end">
      <GenericButton
        class="mt-4"
        :type="ButtonType.Danger"
        :text="props.confirmation"
        :disabled="loading"
        @click="confirm"
      />
    </div>
  </GenericModal>
</template>
