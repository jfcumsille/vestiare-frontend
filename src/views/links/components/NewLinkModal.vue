<script setup lang="ts">
import { useTranslation } from '@/locales';
import GenericModal from '@/components/GenericModal.vue';

const $t = useTranslation('views.links.creation.modal');

const props = defineProps<{
  linkToken: string,
}>();

const emit = defineEmits<{(e: 'close'): void}>();

const close = () => {
  emit('close');
};
</script>

<template>
  <GenericModal
    :title="$t('title')"
    @close="close"
  >
    <!-- eslint-disable vue/no-v-html -->
    <p
      class="text-base leading-relaxed text-gray-500"
      v-html="$t('contentHTML')"
    />
    <!-- eslint-enable vue/no-v-html -->
    <p class="text-base leading-relaxed text-black font-bold">
      {{ props.linkToken }}
    </p>
  </GenericModal>
</template>
