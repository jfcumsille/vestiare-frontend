<script setup lang="ts">
import CrossIcon from '@/assets/svg/CrossIcon.vue';

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
            <button
              class="
                text-body-color bg-transparent hover:bg-light-gray
                hover:text-heading-color rounded-lg text-sm p-1.5 ml-auto
                inline-flex items-center
              "
              @click="close"
            >
              <CrossIcon
                class="w-5 h-5"
                viewBox="0 0 20 20"
              />
            </button>
          </div>
          <div class="p-5">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
