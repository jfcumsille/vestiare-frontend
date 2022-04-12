<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { rutFormat } from 'rut-helpers';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { Nullable } from '@/interfaces/common';
import { Link } from '@/interfaces/entities/links';
import { CountryCode, Product } from '@/interfaces/utilities/enums';
import * as api from '@/api';
import analyticsEvents from '@/constants/analyticsEvents';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericTable from '@/components/GenericTable.vue';
import GenericTableHeader from '@/components/GenericTableHeader.vue';
import CreateLinkModal from '@/views/links/components/CreateLinkModal.vue';
import NewLinkModal from '@/views/links/components/NewLinkModal.vue';
import LinkFilters from '@/views/links/components/LinkFilters.vue';
import LinksTableElement from '@/views/links/components/LinksTableElement.vue';

const $t = useTranslation('views.links');

const headers = [
  $t('table.headers.institution'),
  $t('table.headers.user'),
  $t('table.headers.business'),
  $t('table.headers.lastRefreshed'),
  $t('table.headers.password'),
  $t('table.headers.active'),
  '',
];

const $linksStore = useLinksStore();

const trackCreateLinkModal = (opened: boolean) => {
  if (opened) {
    window.analytics.track(analyticsEvents.CREATE_LINK_MODAL_VIEWED);
  } else {
    window.analytics.track(analyticsEvents.CREATE_LINK_MODAL_CLOSED);
  }
};
const trackLinkCreated = (link: Link, product: Product) => {
  window.analytics.track(analyticsEvents.LINK_CREATED_SUCCESSFULLY, {
    mode: link.mode,
    linkId: link.id,
    institutionId: link.institution.id,
    holderType: link.holderType,
    holderId: link.holderId,
    username: link.username,
    createdAt: link.createdAt,
    product,
  });
};

const live = ref(true);
const toggleLive = () => {
  live.value = !live.value;
  window.analytics.track(analyticsEvents.LINKS_MODE_TOGGLE_CLICKED, {
    live: live.value,
  });
};

const linkCreationButtonText = computed(() => {
  const mode = live.value ? 'Live' : 'Test';
  return `${$t('createLinkModal.create')} ${mode} Link`;
});

const isCreateLinkOpened = ref(false);
const setCreateLinkOpened = (value: boolean) => {
  isCreateLinkOpened.value = value;
  trackCreateLinkModal(value);
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
  $linksStore.loadLinks();
  const regeneratedLink = await api.links.regenerate(link.id);
  createdLinkToken.value = regeneratedLink.linkToken;
  loading.value = false;
  trackLinkCreated(link, product);
};
const stopShowingLink = () => {
  createdLink.value = null;
  createdLinkToken.value = null;
};

const links = computed(() => (live.value ? $linksStore.liveLinks : $linksStore.testLinks));

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

onMounted(async () => {
  window.analytics.page(analyticsEvents.LINKS_SCREEN_VIEWED);
});
</script>

<template>
  <div class="flex flex-col mx-auto p-6 items-center max-w-screen-xl w-full">
    <CreateLinkModal
      v-if="isCreateLinkOpened"
      :live="live"
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
      <div class="flex justify-between">
        <LinkFilters
          v-model:search="search"
          :active-filter="activeFilter"
          :active-options="activeOptions"
          :password-filter="passwordFilter"
          :password-options="passwordOptions"
          :live="live"
          @select-active-filter="selectActiveFilter"
          @select-password-filter="selectPasswordFilter"
          @toggle-live="toggleLive"
        />

        <button
          class="items-center px-6 py-2 text-sm font-medium text-center
                    rounded-md text-white bg-primary-main hover:bg-primary-hover
                    disabled:cursor-default shadow-md
                    disabled:bg-light-gray disabled:text-disabled-color min-w-fit ml-4"
          :title="linkCreationButtonText"
          @click="setCreateLinkOpened(true)"
        >
          {{ linkCreationButtonText }}
        </button>
      </div>
      <GenericTable class="mt-6">
        <template #header>
          <GenericTableHeader :headers="headers" />
        </template>

        <template #content>
          <LinksTableElement
            v-for="link in filteredLinks"
            :key="link.id"
            :link="link"
          />
        </template>
      </GenericTable>
    </div>
    <div
      v-if="$linksStore.loading"
      class="flex justify-center w-full pt-4"
    >
      <LoadingSpinner />
    </div>
    <div
      v-if="!filteredLinks.length && !$linksStore.loading"
      class="flex justify-center w-full pt-4"
    >
      <p class="text-heading-color text-3xl font-bold">
        {{ $t('table.noLinksFound') }}
      </p>
    </div>
  </div>
</template>
