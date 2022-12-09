<script setup lang="ts">
import { ButtonType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';

const props = defineProps<{
  open: boolean,
  title: string,
  buttonTitle?: string,
}>();

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'done'): void,
}>();

const close = () => {
  emit('close');
};

const done = () => {
  emit('done');
};
</script>

<template>
  <div class="fixed left-0 top-0 z-50 w-screen h-screen invisible">
    <div class="flex relative h-full">
      <Transition
        enter-active-class="animate-fade-in"
        leave-to-class="animate-fade-out"
      >
        <div
          v-if="props.open"
          class="absolute left-0 top-0 z-50 w-screen h-screen bg-body-color/20
          pointer-events-none visible"
        />
      </Transition>
      <Transition
        enter-active-class="animate-slide-in"
        leave-to-class="animate-slide-out"
      >
        <div
          v-if="props.open"
          class="
          flex flex-col justify-between w-full min-w-fit max-w-fit h-full
          ml-auto bg-white overflow-y-scroll z-60 visible"
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
          <div
            v-if="props.buttonTitle"
            class="sticky bottom-0 flex flex-row justify-end bg-white p-4 shadow-t"
          >
            <GenericButton
              :type="ButtonType.Text"
              text="Cancel"
              @click="close"
            />
            <GenericButton
              data-test="drawer-done-button"
              :type="ButtonType.Primary"
              :text="props.buttonTitle"
              @click="done"
            />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
