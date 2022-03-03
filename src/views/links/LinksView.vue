<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { rutFormat } from 'rut-helpers';
import { useTranslation } from '@/locales';
import { useUserStore } from '@/stores/user';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { useLinksStore } from '@/stores/links';
import { Link } from '@/interfaces/entities/links';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import LinksTable from './components/LinksTable.vue';
import LinksTableHeader from './components/LinksTableHeader.vue';
import LinksTableElement from './components/LinksTableElement.vue';
import NewLinkModal from './components/NewLinkModal.vue';
import LinkFilters from './components/LinkFilters.vue';
import LinkCreation from './components/LinkCreation.vue';

const $userStore = useUserStore();
const $apiKeysStore = useAPIKeysStore();
const $linksStore = useLinksStore();

const $t = useTranslation('views.links.filters');

const headers = ['User', 'Business', 'Institution', 'Last Refreshed', 'Active', ''];

const createdLinkToken = ref<string | null>(null);
const showLinkToken = (linkToken: string) => {
  createdLinkToken.value = linkToken;
};
const stopShowingLink = () => {
  createdLinkToken.value = null;
};

const widgetOpened = ref(false);
const setWidgetOpened = (value: boolean) => {
  widgetOpened.value = value;
};

const live = ref(true);
const toggleLive = () => {
  live.value = !live.value;
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
const linkMatchesSearchId = (link: Link, searchValue: string) => {
  if (link.holderId.includes(searchValue)) {
    return true;
  }
  if (rutFormat(link.holderId).includes(searchValue)) {
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
  $linksStore.getLinks($userStore.defaultOrganizationId);
  $apiKeysStore.getAPIKeys($userStore.defaultOrganizationId);
});
</script>

<template>
  <NewLinkModal
    v-if="createdLinkToken"
    :link-token="createdLinkToken"
    @close="stopShowingLink"
  />
  <div class="flex justify-center w-full">
    <div class="grow flex justify-between mt-6 mx-4 max-w-screen-2xl">
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

      <LinkCreation
        :live="live"
        :widget-opened="widgetOpened"
        @set-widget-opened="setWidgetOpened"
        @show-link-token="showLinkToken"
      />
    </div>
  </div>
  <div class="flex justify-center w-full">
    <LinksTable class="grow mt-6 mx-4 max-w-screen-2xl">
      <template #header>
        <LinksTableHeader :headers="headers" />
      </template>

      <template #content>
        <LinksTableElement
          v-for="link in filteredLinks"
          :key="link.id"
          :link="link"
        />
      </template>
    </LinksTable>
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
    <p class="text-gray-900 text-3xl font-bold">
      No Links found!
    </p>
  </div>
</template>
