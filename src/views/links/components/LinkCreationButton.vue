<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getFintoc, Fintoc } from '@fintoc/fintoc-js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { Link } from '@/api/interfaces/links';

const $props = defineProps({
  live: {
    type: Boolean,
    required: true,
  },
});

const $apiKeysStore = useAPIKeysStore();

const apiKey = computed(() => $apiKeysStore.searchKey(true, $props.live ? 'live' : 'test'));

const widgetOpened = ref(false);
const fintoc = ref<Fintoc | null>(null);

const onSuccess = (link: Link) => {
  widgetOpened.value = false;
  console.log(link);
};

const onExit = () => {
  widgetOpened.value = false;
};

const openWidget = () => {
  if (fintoc.value !== null) {
    const widget = fintoc.value.create({
      holderType: 'individual',
      product: 'movements',
      publicKey: apiKey.value.token,
      webhookUrl: 'https://fintoc.com',
      onSuccess,
      onExit,
    });
    widgetOpened.value = true;
    widget.open();
  }
};

onMounted(async () => {
  fintoc.value = await getFintoc();
});
</script>

<template>
  <button
    :disabled="widgetOpened || (fintoc === null)"
    type="button"
    class="
      py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white
      rounded-lg border border-gray-200 hover:bg-gray-100
      hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700
      focus:text-blue-700 inline-flex items-center
    "
    @click="openWidget"
  >
    <LoadingSpinner
      v-if="widgetOpened || (fintoc === null)"
      class="h-4 mx-0"
    />
    Create Link!
  </button>
</template>
