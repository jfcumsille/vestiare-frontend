<script setup lang="ts">
import { ButtonType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';

const props = defineProps<{
  title: string,
  buttonTitle: string,
}>();

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'create'): void,
}>();

const close = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed left-0 top-0 z-50 w-screen h-screen bg-black/30">
    <div
      class="
        flex flex-col justify-between w-full min-w-fit max-w-fit h-full
        ml-auto bg-white overflow-y-scroll"
    >
      <div>
        <div
          class="z-10 sticky top-0 flex justify-between items-center
          px-8 pt-6 pb-4 bg-white shadow"
        >
          <div
            data-test="drawer-title"
            class="text-2xl font-semibold text-heading-color"
          >
            {{ props.title }}
          </div>
          <GenericButton
            :type="ButtonType.Text"
            icon-name="cross"
            @click="close"
          />
        </div>
        <div class="px-12 pt-12 z-5">
          <slot />
        </div>
      </div>
      <div class="sticky bottom-0 flex flex-row justify-end bg-white p-4 shadow-t">
        <GenericButton
          :type="ButtonType.Text"
          text="Cancel"
          @click="close"
        />
        <GenericButton
          :type="ButtonType.Primary"
          :text="props.buttonTitle"
          @click="emit('create');"
        />
      </div>
    </div>
  </div>
</template>
