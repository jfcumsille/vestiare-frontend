<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { useTranslation } from '@/locales';

const $store = useCounterStore();
const $t = useTranslation('counter');
</script>

<template>
  <div class="mt-10 mx-auto flex flex-col max-w-xs">
    <p>
      {{ $t('name') }}: {{ $store.counter }}
    </p>

    <p>
      {{ $t('nTimes', { n: 2 }) }}: {{ $store.doubleCount }}
    </p>

    <p>
      {{ $t('nTimes', { n: 8 }) }}: {{ $store.nthCount(8) }}
    </p>

    <button
      class="mt-4 px-4 py-2 font-semibold text-sm bg-[#42b883] text-white rounded-full shadow-sm"
      @click="$store.increment"
    >
      {{ $t('buttons.increment') }}
    </button>

    <button
      class="mt-4 px-4 py-2 font-semibold text-sm bg-[#42b883] text-white rounded-full shadow-sm"
      @click="$store.randomize"
    >
      {{ $t('buttons.randomize') }}
    </button>

    <button
      class="mt-4 px-4 py-2 font-semibold text-sm bg-[#42b883] text-white rounded-full shadow-sm"
      @click="$store.reset"
    >
      {{ $t('buttons.reset') }}
    </button>
  </div>
</template>
