<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useConfigStore } from '@/stores/config';
import { useTranslation } from '@/locales';
import { Mode } from '@/interfaces/utilities/enums';
import ChevronIcon from '@/assets/svg/ChevronIcon.vue';

const $t = useTranslation('sideBar');

const configStore = useConfigStore();
const isLive = computed(() => configStore.mode === Mode.Live);

const optionsOpened = ref(false);
const toggle = () => { optionsOpened.value = !optionsOpened.value; };
const selectMode = (mode: string) => {
  configStore.updateMode(mode as Mode);
  optionsOpened.value = false;
};

const modeDropdown = ref(null);
const liveModeClass = `
        bg-gradient-to-r from-primary-pressed to-primary-hover text-white
        hover:bg-primary-hover
        focus:ring focus:ring-primary-focus
        active:bg-primary-pressed active:ring-0
        `;
const testModeClass = `
        bg-primary-surface text-primary-main
        hover:text-primary-hover
        focus:ring focus:ring-primary-focus focus:text-primary-hover
        active:text-primary-pressed
        `;

onClickOutside(modeDropdown, () => {
  optionsOpened.value = false;
});

</script>
<template>
  <div
    ref="modeDropdown"
    data-test="mode-dropdown"
    class="my-2 flex flex-col z-50 w-40 bg-white"
  >
    <button
      :class="`
        drop-shadow-md items-center justify-between rounded-lg font-medium
        ${isLive? liveModeClass : testModeClass} px-6 py-4
        divide-y-1 divide-primary-border`
      "
      @click="toggle"
    >
      <div class="flex">
        <div
          class="w-full text-left"
          data-test="drop-down-value"
        >
          {{ isLive ? 'Live' : 'Test' }}
        </div>
        <div>
          <ChevronIcon
            class="mt-1 ml-1.5 w-4 h-4 rotate-90"
            :class="{'-rotate-90': optionsOpened}"
          />
        </div>
      </div>
      <div
        v-if="optionsOpened"
        class="text-2xs font-normal text-left pt-0.5"
      >
        {{ isLive ? $t('liveMode') : $t('testMode') }}
      </div>
    </button>
    <button
      v-if="optionsOpened"
      :class="`
        mt-4 drop-shadow-md items-center justify-between rounded-lg font-medium
        ${isLive? testModeClass : liveModeClass} px-6 py-4 w-40
        divide-y-1 divide-primary-border`
      "
      @click="() => selectMode(isLive ? Mode.Test : Mode.Live)"
    >
      <div class="flex">
        <div class="w-full text-left">
          {{ isLive ? 'Test' : 'Live' }}
        </div>
      </div>
      <div class="text-2xs font-normal text-left pt-0.5">
        {{ isLive ? $t('testMode') : $t('liveMode') }}
      </div>
    </button>
  </div>
</template>
