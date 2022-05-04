<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  watch,
} from 'vue';
import { getFintoc, Fintoc } from '@fintoc/fintoc-js';
import { useTranslation } from '@/locales';
import { Nullable } from '@/interfaces/common';
import { Link } from '@/interfaces/entities/links';
import {
  Mode, CountryCode, Product, HolderType, APIModule, ButtonType,
} from '@/interfaces/utilities/enums';
import { useAPIKeysStore } from '@/stores/apiKeys';
import GenericModal from '@/components/GenericModal.vue';
import GenericButton from '@/components/GenericButton.vue';
import { DOCS_LINKS, DOCS_SANDBOX } from '@/constants/urls';
import { useConfigStore } from '@/stores/config';

const props = defineProps<{ widgetOpened: boolean }>();
const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'set-widget-open-status', value: boolean): void,
  (e: 'set-link', link: Link, product: Product): void,
}>();

const apiKeysStore = useAPIKeysStore();
const configStore = useConfigStore();

const $t = useTranslation('views.links.createLinkModal');

const live = computed(() => configStore.mode === Mode.Live);
const title = computed(() => {
  const mode = live.value ? 'Live' : 'Test';
  return `${$t('create')} ${mode} Link`;
});

const selectedCountry = ref(CountryCode.CL);
const countries = [CountryCode.CL, CountryCode.MX];
const countryText = (countryCode: CountryCode) => {
  if (countryCode === CountryCode.MX) {
    return 'Mexico';
  }
  return 'Chile';
};

const selectedAPIModule = ref<Nullable<APIModule>>(APIModule.Banking);
const APIModules = computed(() => (
  live.value ? [APIModule.Banking, APIModule.Fiscal] : [APIModule.Banking]
));
const selectedProduct = ref<Nullable<Product>>(Product.Movements);
const handleChangeAPI = () => {
  if (selectedAPIModule.value === APIModule.Banking) {
    selectedProduct.value = Product.Movements;
  }
  if (selectedAPIModule.value === APIModule.Fiscal) {
    selectedProduct.value = Product.Invoices;
  }
};

const selectedHolderType = ref<Nullable<HolderType>>(HolderType.Individual);
const holderTypes = computed(() => {
  if (selectedCountry.value === CountryCode.MX && selectedAPIModule.value === APIModule.Fiscal) {
    return [HolderType.Business];
  }
  if (selectedCountry.value === CountryCode.MX && selectedAPIModule.value === APIModule.Banking) {
    return [HolderType.Individual];
  }
  return [HolderType.Individual, HolderType.Business];
});

watch(() => selectedCountry.value, () => {
  selectedAPIModule.value = null;
  selectedProduct.value = null;
  selectedHolderType.value = null;
});
watch(() => selectedAPIModule.value, () => {
  selectedHolderType.value = null;
});

const apiKey = computed(() => apiKeysStore.searchKey(true));

const fintoc = ref<Nullable<Fintoc>>(null);

const areAllParamsSelected = computed(() => (
  selectedCountry.value && selectedProduct.value && selectedHolderType.value
));

const disabledButton = computed(() => (
  props.widgetOpened || (fintoc.value === null) || !areAllParamsSelected.value
));

const onSuccess = async (link: Link) => {
  emit('set-widget-open-status', false);
  if (selectedProduct.value) {
    emit('set-link', link, selectedProduct.value);
  }
};

const onExit = () => {
  emit('set-widget-open-status', false);
};

const openWidget = () => {
  if (fintoc.value !== null) {
    const widget = fintoc.value.create({
      holderType: selectedHolderType.value,
      product: selectedProduct.value,
      publicKey: apiKey.value.token,
      country: selectedCountry.value,
      webhookUrl: 'https://fintoc.com',
      onSuccess,
      onExit,
    });
    widget.open();
    emit('set-widget-open-status', true);
  }
};

onMounted(async () => {
  fintoc.value = await getFintoc();
});
</script>

<template>
  <GenericModal
    :title="title"
    @close="emit('close')"
  >
    <div class="space-y-3 text-body-color">
      <div
        v-if="live"
        class="text-left text-body-color font-light"
      >
        {{ $t('subtitleLive') }}
        <a
          class="text-primary-main font-medium cursor-pointer hover:text-primary-hover"
          :href="DOCS_LINKS"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('learnMoreLive') }}
        </a>
      </div>
      <div
        v-else
        class="text-left text-body-color font-light"
      >
        {{ $t('subtitleTest') }}
        <a
          class="text-primary-main font-medium cursor-pointer hover:text-primary-hover"
          :href="DOCS_SANDBOX"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('learnMoreTest') }}
        </a>
      </div>
      <div>
        <div class="font-medium text-body-color text-sm mb-1">
          {{ $t('country') }}
        </div>
        <select
          v-model="selectedCountry"
          class="
            focus:ring-2 justify-between font-normal rounded-md text-sm
            px-2 py-3 shadow-sm text-left inline-flex items-center
            w-full border text-body-color bg-white hover:bg-light-gray
            focus:ring-primary-focus border-border-color
          "
        >
          <option
            selected
            disabled
          >
            {{ $t('chooseCountry') }}
          </option>
          <option
            v-for="(country, index) in countries"
            :key="index"
            :value="country"
          >
            {{ countryText(country) }}
          </option>
        </select>
      </div>
      <div>
        <div class="font-medium text-body-color text-sm mb-1">
          {{ $t('api') }}
        </div>
        <select
          v-model="selectedAPIModule"
          class="
            focus:ring-2 justify-between font-normal rounded-md text-sm
            px-2 py-3 shadow-sm text-left inline-flex items-center
            w-full border text-body-color bg-white hover:bg-light-gray
            focus:ring-primary-focus border-border-color
          "
          @change="handleChangeAPI"
        >
          <option
            selected
            disabled
          >
            {{ $t('chooseApi') }}
          </option>
          <option
            v-for="(apiModule, index) in APIModules"
            :key="index"
            :value="apiModule"
          >
            {{ apiModule }}
          </option>
        </select>
      </div>
      <div>
        <div class="font-medium text-body-color text-sm mb-1">
          {{ $t('holderType') }}
        </div>
        <select
          v-model="selectedHolderType"
          class="
            focus:ring-2 justify-between font-normal rounded-md text-sm
            px-2 py-3 shadow-sm text-left inline-flex items-center
            w-full border text-body-color bg-white hover:bg-light-gray
            focus:ring-primary-focus border-border-color capitalize
          "
        >
          <option
            selected
            disabled
          >
            {{ $t('chooseHolderType') }}
          </option>
          <option
            v-for="holderType in holderTypes"
            :key="holderType"
            :value="holderType"
          >
            {{ holderType }}
          </option>
        </select>
      </div>
    </div>
    <div class="w-full flex justify-end">
      <GenericButton
        class="mt-5"
        :type="ButtonType.Primary"
        :text="title"
        :disabled="disabledButton"
        @click="openWidget"
      />
    </div>
  </GenericModal>
</template>
