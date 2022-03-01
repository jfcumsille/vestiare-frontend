<script setup lang="ts">
const $props = defineProps<{
  linkToken: string,
}>();

const $emit = defineEmits<{(e: 'close'): void}>();

const close = () => {
  $emit('close');
};
</script>

<template>
  <div class="fixed right-0 left-0 z-50 w-screen h-screen">
    <div
      class="
        flex overflow-y-auto overflow-x-hidden justify-center items-center
        md:h-full bg-black/30
      "
    >
      <div class="px-4 w-full max-w-2xl h-full md:h-auto mx-auto">
        <div class="relative bg-white rounded-lg shadow">
          <div class="flex justify-between items-start p-5 rounded-t border-b">
            <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl">
              Link created succesfully!
            </h3>
            <button
              class="
                text-gray-400 bg-transparent hover:bg-gray-200
                hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto
                inline-flex items-center
              "
              @click="close"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              ><path
                fill-rule="evenodd"
                d="
                  M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414
                  1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293
                  4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z
                "
                clip-rule="evenodd"
              /></svg>
            </button>
          </div>
          <div class="p-6 space-y-6">
            <p class="text-base leading-relaxed text-gray-500">
              This Link Token will <span class="font-bold">only be showed once</span>,
              so <span class="font-bold">make sure to copy and save it</span>.
              Your Link Token is:
            </p>
            <p class="text-base leading-relaxed text-black font-bold">
              {{ $props.linkToken }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
