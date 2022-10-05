<script setup lang="ts">
import { ButtonType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';

const props = withDefaults(defineProps<{
  title: string,
  allowOverflow?: boolean,
}>(), {
  allowOverflow: false,
});

const emit = defineEmits<{(e: 'close'): void}>();

const close = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed left-0 top-0 z-50 w-screen h-screen">
    <div
      class="
        flex overflow-y-hidden overflow-x-hidden justify-center items-center
        h-full bg-body-color/20
      "
    >
      <div class="px-4 w-full min-w-fit max-w-fit h-auto mx-auto">
        <div class="relative bg-white rounded-lg shadow">
          <div class="flex justify-between items-center p-4 rounded-t border-b">
            <h3
              data-test="modal-title"
              class="text-xl font-semibold text-heading-color"
            >
              {{ props.title }}
            </h3>
            <GenericButton
              :type="ButtonType.Text"
              icon-name="cross"
              @click="close"
            />
          </div>
          <div
            class="p-5 max-h-[85vh]"
            :class="{ 'overflow-y-auto': !props.allowOverflow }"
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
