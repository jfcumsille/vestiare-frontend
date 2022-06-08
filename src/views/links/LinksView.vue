<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { Nullable } from '@/interfaces/common';
import { Link, LinkFilter } from '@/interfaces/entities/links';
import { Product, ButtonType } from '@/interfaces/utilities/enums';
import { Json } from '@/interfaces/utilities/json';
import * as api from '@/api';
import { LINKS_VIEWED } from '@/constants/analyticsEvents';
import { DOCS_LINKS } from '@/constants/urls';
import { page, trackModal, trackLinkCreated } from '@/services/analytics';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericTable from '@/components/table/GenericTable.vue';
import TablePagination from '@/components/table/TablePagination.vue';
import GenericButton from '@/components/GenericButton.vue';
import SearchBar from '@/components/SearchBar.vue';
import CreateLinkModal from '@/views/links/components/CreateLinkModal.vue';
import NewLinkModal from '@/views/links/components/NewLinkModal.vue';
import LinksTableHead from '@/views/links/components/LinksTableHead.vue';
import LinksTableRow from '@/views/links/components/LinksTableRow.vue';
import { useConfigStore } from '@/stores/config';

const $t = useTranslation('views.links');

const linksStore = useLinksStore();
const configStore = useConfigStore();
const mode = computed(() => configStore.mode);

const linkCreationButtonText = computed(() => `${$t('createLinkModal.create')} ${mode.value} Link`);

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
const total = computed(() => linksStore.total);

const pageSize = computed(() => linksStore.pageSize);
const updatePageSize = (value: number) => {
  linksStore.updatePageSize(value);
};

const currentPage = computed(() => linksStore.currentPage);
const updateCurrentPage = (value: number) => {
  linksStore.updateCurrentPage(value);
};

const search = ref('');
const headerFilters = ref({});

const updateHeaderFilterValues = (filters: Record<string, unknown>) => {
  headerFilters.value = filters;
  const allFilters: LinkFilter = filters;
  if (search.value.trim() !== '') {
    allFilters.rut = search.value.trim();
  }
  linksStore.removeLinks();
  linksStore.loadLinks(allFilters as Json);
};

const filterBySearch = () => {
  const allFilters: LinkFilter = headerFilters.value;
  allFilters.rut = search.value.trim();
  linksStore.removeLinks();
  linksStore.loadLinks(allFilters as Json);
};

const paginatedlinks = computed(() => {
  const start = ((currentPage.value - 1) * pageSize.value);
  const end = currentPage.value * pageSize.value;
  return links.value.slice(start, end);
});

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
        <div class="flex flex-row">
          <SearchBar
            v-model="search"
            :placeholder="$t('table.filters.searchBarPlaceholder')"
          />
          <GenericButton
            class="ml-4 capitalize"
            :type="ButtonType.Secondary"
            :disabled="search.trim() === ''"
            icon-name="search"
            text="Search"
            @click="filterBySearch"
          />
        </div>
        <GenericButton
          data-test="create-link-button"
          class="ml-4 capitalize"
          :type="ButtonType.Primary"
          :text="linkCreationButtonText"
          @click="setCreateLinkOpened(true)"
        />
      </div>
      <GenericTable class="mt-6">
        <template #head>
          <LinksTableHead
            @update="updateHeaderFilterValues"
          />
        </template>

        <template #content>
          <LinksTableRow
            v-for="link in paginatedlinks"
            :key="link.id"
            :link="link"
          />
        </template>
        <template #pagination>
          <TablePagination
            :loading="linksStore.loading"
            :current-page="currentPage"
            :page-size="pageSize"
            :total-results="total"
            :result-item-text="$t('title')"
            @update-page-size="updatePageSize"
            @update-page="updateCurrentPage"
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
      v-if="!links.length && !linksStore.loading"
      class="flex justify-center w-full pt-4"
    >
      <p class="text-heading-color text-3xl font-bold">
        {{ $t('table.noLinksFound') }}
      </p>
    </div>
  </div>
</template>
