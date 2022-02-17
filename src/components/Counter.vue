<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const $store = useCounterStore();
</script>

<template>
  <div class="mt-10 mx-auto flex flex-col max-w-xs">
    <p>
      Counter: {{ $store.counter }}
    </p>

    <p>
      Double Counter: {{ $store.doubleCount }}
    </p>

    <p>
      8th Counter: {{ $store.nthCount(8) }}
    </p>

    <button
      class="mt-4 px-4 py-2 font-semibold text-sm bg-[#42b883] text-white rounded-full shadow-sm"
      @click="$store.increment"
    >
      Increment
    </button>

    <button
      class="mt-4 px-4 py-2 font-semibold text-sm bg-[#42b883] text-white rounded-full shadow-sm"
      @click="$store.randomize"
    >
      Randomize
    </button>

    <button
      class="mt-4 px-4 py-2 font-semibold text-sm bg-[#42b883] text-white rounded-full shadow-sm"
      @click="$store.reset"
    >
      Reset
    </button>
  </div>
</template>
