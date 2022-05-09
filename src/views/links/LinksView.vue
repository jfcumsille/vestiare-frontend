<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { rutFormat } from 'rut-helpers';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { Nullable } from '@/interfaces/common';
import { Link } from '@/interfaces/entities/links';
import {
  CountryCode, Product, ButtonType, Mode,
} from '@/interfaces/utilities/enums';
import * as api from '@/api';
import { LINKS_VIEWED } from '@/constants/analyticsEvents';
import { DOCS_LINKS } from '@/constants/urls';
import { page, trackModal, trackLinkCreated } from '@/services/analytics';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericTable from '@/components/table/GenericTable.vue';
import GenericButton from '@/components/GenericButton.vue';
import CreateLinkModal from '@/views/links/components/CreateLinkModal.vue';
import NewLinkModal from '@/views/links/components/NewLinkModal.vue';
import LinkFilters from '@/views/links/components/LinkFilters.vue';
import LinksTableHead from '@/views/links/components/LinksTableHead.vue';
import LinksTableRow from '@/views/links/components/LinksTableRow.vue';
import { useConfigStore } from '@/stores/config';

const $t = useTranslation('views.links');

const linksStore = useLinksStore();
const configStore = useConfigStore();

const live = computed(() => configStore.mode === Mode.Live);

const linkCreationButtonText = computed(() => {
  const mode = live.value ? 'Live' : 'Test';
  return `${$t('createLinkModal.create')} ${mode} Link`;
});

const isCreateLinkOpened = ref(false);
const setCreateLinkOpened = (value: boolean) => {
  isCreateLinkOpened.value = value;
  trackModal(value, 'links', 'create');
};

const isWidgetOpened = ref(false);
const setWidgetOpenStatus = (value: boolean) => {
  isWidgetOpened.value = value;
  if (value) {
    setCreateLinkOpened(false);
  }
};

const loading = ref(false);
const createdLink = ref<Nullable<Link>>(null);
const createdLinkToken = ref<Nullable<string>>(null);
const setLink = async (link: Link, product: Product) => {
  createdLink.value = link;
  loading.value = true;
  trackLinkCreated(link, product);
  linksStore.loadLinks();
  const regeneratedLink = await api.links.regenerate(link.id);
  createdLinkToken.value = regeneratedLink.linkToken;
  loading.value = false;
};
const stopShowingLink = () => {
  createdLink.value = null;
  createdLinkToken.value = null;
};

const links = computed(() => linksStore.links);

const activeFilter = ref('all');
const activeOptions = ['all', 'valid', 'invalid'];
const selectActiveFilter = (value: string) => {
  activeFilter.value = value;
};
const filterByActive = (rawLinks: Array<Link>) => {
  if (activeFilter.value === 'all') {
    return rawLinks;
  }
  if (activeFilter.value === 'valid') {
    return rawLinks.filter((link) => link.active);
  }
  return rawLinks.filter((link) => !link.active);
};

const passwordFilter = ref('all');
const passwordOptions = ['all', 'valid', 'invalid'];
const selectPasswordFilter = (value: string) => {
  passwordFilter.value = value;
};
const filterByPassword = (rawLinks: Array<Link>) => {
  if (passwordFilter.value === 'all') {
    return rawLinks;
  }
  if (passwordFilter.value === 'valid') {
    return rawLinks.filter((link) => !link.preventRefresh);
  }
  return rawLinks.filter((link) => link.preventRefresh);
};

const search = ref('');
const formattedId = (id: string, country: CountryCode) => {
  if (!id) {
    return null;
  }
  if (country === CountryCode.CL) {
    return rutFormat(id);
  }
  return id;
};
const linkMatchesSearchId = (link: Link, searchValue: string) => {
  if (link.holderId?.includes(searchValue)) {
    return true;
  }
  if (link.username?.includes(searchValue)) {
    return true;
  }
  if (formattedId(link.holderId, link.institution.country)?.includes(searchValue)) {
    return true;
  }
  if (formattedId(link.username, link.institution.country)?.includes(searchValue)) {
    return true;
  }
  return false;
};
const filterBySearch = (rawLinks: Array<Link>) => {
  if (search.value.trim() === '') {
    return rawLinks;
  }
  return rawLinks.filter((link) => linkMatchesSearchId(link, search.value.trim()));
};

const filteredLinks = computed(() => filterBySearch(filterByPassword(filterByActive(links.value))));

onMounted(() => {
  page(LINKS_VIEWED);
});
</script>

<template>
  <div
    data-test="links-view"
    class="flex flex-col p-10 items-center max-w-screen-xl w-full"
  >
    <CreateLinkModal
      v-if="isCreateLinkOpened"
      :widget-opened="isWidgetOpened"
      @set-widget-open-status="setWidgetOpenStatus"
      @set-link="setLink"
      @close="() => setCreateLinkOpened(false)"
    />
    <NewLinkModal
      v-if="createdLink"
      :loading="loading"
      :link-token="createdLinkToken"
      @close="stopShowingLink"
    />
    <div class="flex flex-col w-full">
      <div>
        <div class="font-medium text-2xl text-heading-color self-start">
          {{ $t('title') }}
        </div>
        <div class="flex flex-row justify-between items-center py-2 self-start">
          <a
            class="text-primary-main text-sm"
            :href="DOCS_LINKS"
            target="_blank"
          >
            {{ $t('learnMore') }}
          </a>
        </div>
      </div>
      <div class="flex justify-between">
        <LinkFilters
          v-model:search="search"
          :active-filter="activeFilter"
          :active-options="activeOptions"
          :password-filter="passwordFilter"
          :password-options="passwordOptions"
          @select-active-filter="selectActiveFilter"
          @select-password-filter="selectPasswordFilter"
        />
        <GenericButton
          data-test="create-link-button"
          class="ml-4"
          :type="ButtonType.Primary"
          :text="linkCreationButtonText"
          @click="setCreateLinkOpened(true)"
        />
      </div>
      <GenericTable class="mt-6">
        <template #head>
          <LinksTableHead />
        </template>

        <template #content>
          <LinksTableRow
            v-for="link in filteredLinks"
            :key="link.id"
            :link="link"
          />
        </template>
      </GenericTable>
    </div>
    <div
      v-if="linksStore.loading"
      class="flex justify-center w-full pt-4"
    >
      <LoadingSpinner />
    </div>
    <div
      v-if="!filteredLinks.length && !linksStore.loading"
      class="flex justify-center w-full pt-4"
    >
      <p class="text-heading-color text-3xl font-bold">
        {{ $t('table.noLinksFound') }}
      </p>
    </div>
  </div>
</template>
