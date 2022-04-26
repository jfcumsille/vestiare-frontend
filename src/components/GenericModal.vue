<script setup lang="ts">
import { ButtonType, SizeType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';

const props = defineProps<{ title: string }>();

const emit = defineEmits<{(e: 'close'): void}>();

const close = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed left-0 top-0 z-50 w-screen h-screen">
    <div
      class="
        flex overflow-y-auto overflow-x-hidden justify-center items-center
        h-full bg-black/30
      "
    >
      <div class="px-4 w-full max-w-2xl h-auto mx-auto">
        <div class="relative bg-white rounded-lg shadow">
          <div class="flex justify-between items-start p-4 rounded-t border-b">
            <h3
              data-test="modal-title"
              class="text-xl font-semibold text-heading-color"
            >
              {{ props.title }}
            </h3>
            <GenericButton
              :type="ButtonType.Secondary"
              :size="SizeType.Small"
              image-name="cross"
              @click="close"
            />
          </div>
          <div class="p-5">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
