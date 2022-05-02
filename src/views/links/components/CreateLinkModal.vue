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
import GenericDropDown from '@/components/GenericDropDown.vue';
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

const selectedCountry = ref('Chile');
const selectedCountryCode = ref(CountryCode.CL);
const countries = [
  { countryCode: CountryCode.CL, label: 'Chile' },
  { countryCode: CountryCode.MX, label: 'México' },
];
const countryLabels = countries.map((item) => item.label);
const selectCountry = (value: string) => {
  selectedCountry.value = value;
  countries.forEach((country) => {
    if (country.label === value) {
      selectedCountryCode.value = country.countryCode;
    }
  });
};

const selectedAPIModule = ref<Nullable<APIModule>>(APIModule.Banking);
const APIModules = computed(() => (
  live.value ? [APIModule.Banking, APIModule.Fiscal] : [APIModule.Banking]
));
const selectedProduct = computed(() => {
  if (selectedAPIModule.value === APIModule.Banking) {
    return Product.Movements;
  }
  if (selectedAPIModule.value === APIModule.Fiscal) {
    return Product.Invoices;
  }
  return null;
});
const selectAPIModule = (value: string) => {
  selectedAPIModule.value = value as APIModule;
};

const selectedHolderType = ref<Nullable<HolderType>>(HolderType.Individual);
const holderTypes = computed(() => {
  const selectedMexico = selectedCountryCode.value === CountryCode.MX;
  if (selectedMexico && selectedAPIModule.value === APIModule.Fiscal) {
    return [HolderType.Business];
  }
  if (selectedMexico && selectedAPIModule.value === APIModule.Banking) {
    return [HolderType.Individual];
  }
  return [HolderType.Individual, HolderType.Business];
});
const selectHolderType = (value: string) => {
  selectedHolderType.value = value as HolderType;
};

watch(() => selectedCountry.value, () => {
  selectedAPIModule.value = null;
  selectedHolderType.value = null;
});
watch(() => selectedAPIModule.value, () => {
  selectedHolderType.value = null;
});

const apiKey = computed(() => apiKeysStore.searchKey(true));

const fintoc = ref<Nullable<Fintoc>>(null);

const areAllParamsSelected = computed(() => (
  selectedCountryCode.value && selectedProduct.value && selectedHolderType.value
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
      country: selectedCountryCode.value,
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
    <div class="space-y-6 text-body-color">
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
      <div class="space-y-6">
        <GenericDropDown
          :label="$t('country')"
          :selected="selectedCountry ? selectedCountry : ''"
          :options="countryLabels"
          :is-width-full="true"
          @select="selectCountry"
        />
        <GenericDropDown
          :label="$t('api')"
          :selected="selectedAPIModule ? selectedAPIModule : ''"
          :options="APIModules"
          :is-width-full="true"
          @select="selectAPIModule"
        />
        <GenericDropDown
          :label="$t('holderType')"
          :selected="selectedHolderType ? selectedHolderType : ''"
          :options="holderTypes"
          :is-width-full="true"
          @select="selectHolderType"
        />
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
