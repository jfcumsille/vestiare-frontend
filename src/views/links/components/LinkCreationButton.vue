<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getFintoc, Fintoc } from '@fintoc/fintoc-js';
import { useUserStore } from '@/stores/user';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { useLinksStore } from '@/stores/links';

const $props = defineProps<{
  widgetOpened: boolean,
  live: boolean,
  product: 'movements' | 'invoices',
  holderType: 'individual' | 'business',
}>();

const $emit = defineEmits<{(e: 'set-widget-opened', value: boolean): void }>();

const $userStore = useUserStore();
const $apiKeysStore = useAPIKeysStore();
const $linksStore = useLinksStore();

const apiKey = computed(() => $apiKeysStore.searchKey(true, $props.live ? 'live' : 'test'));
const buttonText = computed(() => {
  const productTransformation = $props.product === 'movements' ? 'banking' : 'fiscal';
  return `Create ${productTransformation} ${$props.holderType} Link!`;
});

const fintoc = ref<Fintoc | null>(null);

const onSuccess = () => {
  $linksStore.getLinks($userStore.defaultOrganizationId);
  $emit('set-widget-opened', false);
};

const onExit = () => {
  $emit('set-widget-opened', false);
};

const openWidget = () => {
  if (fintoc.value !== null) {
    const widget = fintoc.value.create({
      holderType: $props.holderType,
      product: $props.product,
      publicKey: apiKey.value.token,
      webhookUrl: 'https://fintoc.com',
      onSuccess,
      onExit,
    });
    $emit('set-widget-opened', true);
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
      focus:text-blue-700 inline-flex items-center capitalize
    "
    :class="{ 'opacity-50': widgetOpened || (fintoc === null) }"
    @click="openWidget"
  >
    {{ buttonText }}
  </button>
</template>
