<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getFintoc, Fintoc } from '@fintoc/fintoc-js';
import { useTranslation } from '@/locales';
import * as api from '@/api';
import { Nullable } from '@/interfaces/common';
import { Link } from '@/interfaces/entities/links';
import { Mode } from '@/interfaces/utilities/enums';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { useLinksStore } from '@/stores/links';

const props = defineProps<{
  widgetOpened: boolean,
  live: boolean,
  product: 'movements' | 'invoices',
  holderType: 'individual' | 'business',
}>();

const emit = defineEmits<{
  (e: 'set-widget-opened', value: boolean): void,
  (e: 'show-link-token', linkToken: string): void,
}>();

const $t = useTranslation('views.links.creation');

const $apiKeysStore = useAPIKeysStore();
const $linksStore = useLinksStore();

const apiKey = computed(() => $apiKeysStore.searchKey(true, props.live ? Mode.Live : Mode.Test));
const buttonText = computed(() => {
  const productTransformation = props.product === 'movements' ? 'Banking' : 'Fiscal';
  return `${$t('createAction')} ${$t(`${props.holderType}${productTransformation}Link`)}!`;
});

const fintoc = ref<Nullable<Fintoc>>(null);

const disabledButton = computed(() => props.widgetOpened || (fintoc.value === null));

const onSuccess = async (link: Link) => {
  emit('set-widget-opened', false);
  $linksStore.loadLinks();
  const regeneratedLink = await api.links.regenerate(link.id);
  emit('show-link-token', regeneratedLink.linkToken);
};

const onExit = () => {
  emit('set-widget-opened', false);
};

const openWidget = () => {
  if (fintoc.value !== null) {
    const widget = fintoc.value.create({
      holderType: props.holderType,
      product: props.product,
      publicKey: apiKey.value.token,
      webhookUrl: 'https://fintoc.com',
      onSuccess,
      onExit,
    });
    emit('set-widget-opened', true);
    widget.open();
  }
};

onMounted(async () => {
  fintoc.value = await getFintoc();
});
</script>

<template>
  <button
    :disabled="disabledButton"
    type="button"
    class="
      py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white
      rounded-lg border border-gray-200 hover:bg-gray-100
      hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700
      focus:text-blue-700 inline-flex items-center
    "
    :class="{ 'opacity-50': disabledButton }"
    @click="openWidget"
  >
    {{ buttonText }}
  </button>
</template>
