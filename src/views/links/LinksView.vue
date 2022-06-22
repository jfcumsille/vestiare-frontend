<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { Nullable } from '@/interfaces/common';
import { Link, LinkFilter } from '@/interfaces/entities/links';
import { Product, ButtonType } from '@/interfaces/utilities/enums';
import * as api from '@/api';
import { DASHBOARD_ORIGIN, LINKS_VIEWED } from '@/constants/analyticsEvents';
import { DOCS_LINKS } from '@/constants/urls';
import { page, trackModal, trackLinkCreated } from '@/services/analytics';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericTable from '@/components/table/GenericTable.vue';
import TablePagination from '@/components/table/TablePagination.vue';
import GenericButton from '@/components/GenericButton.vue';
import CreateLinkModal from '@/views/links/components/CreateLinkModal.vue';
import NewLinkModal from '@/views/links/components/NewLinkModal.vue';
import LinksTableHead from '@/views/links/components/LinksTableHead.vue';
import LinksTableRow from '@/views/links/components/LinksTableRow.vue';
import { useConfigStore } from '@/stores/config';

const $t = useTranslation('views.links');

const linksStore = useLinksStore();
const configStore = useConfigStore();

const linkCreationButtonText = computed(() => `${$t('createLinkModal.create')} ${configStore.mode} Link`);

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
  linksStore.reloadLinks();
  const regeneratedLink = await api.links.regenerate(link.id);
  createdLinkToken.value = regeneratedLink.linkToken;
  loading.value = false;
};
const stopShowingLink = () => {
  createdLink.value = null;
  createdLinkToken.value = null;
};

const search = ref(linksStore.allFilters.rut || '');
const formattedSearch = computed(() => search.value.replace(/[.-\s]/g, ''));

const filterBySearch = () => {
  const allFilters: LinkFilter = linksStore.allFilters;
  allFilters.rut = formattedSearch.value;
  linksStore.updateFilters(allFilters);
};

const clearSearchFilter = () => {
  if (formattedSearch.value !== '') {
    search.value = '';
    filterBySearch();
  }
};

const updateHeaderFilterValues = (filters: Record<string, unknown>) => {
  const allFilters: LinkFilter = filters;
  if (formattedSearch.value !== '') {
    allFilters.rut = formattedSearch.value;
  }
  linksStore.updateFilters(allFilters);
};

onMounted(() => {
  page(LINKS_VIEWED, {
    origin: DASHBOARD_ORIGIN,
  });
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
          {{ $t('title_other') }}
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
          <GenericInput
            v-model="search"
            :placeholder="$t('table.filters.searchBarPlaceholder')"
            left-icon-name="search"
            right-icon-name="circle-cross"
            class="w-80"
            @key-enter="filterBySearch"
            @click-right-icon="clearSearchFilter"
          />
          <GenericButton
            class="ml-4 capitalize"
            :type="ButtonType.Secondary"
            :disabled="formattedSearch === ''"
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
            v-for="link in linksStore.paginatedlinks"
            :key="link.id"
            :link="link"
          />
        </template>
        <template #pagination>
          <TablePagination
            :loading="linksStore.loading"
            :current-page="linksStore.currentPage"
            :page-size="linksStore.pageSize"
            :total-results="linksStore.total"
            :result-item-text="$t('title', { count: linksStore.total})"
            @update-page-size="linksStore.updatePageSize"
            @change-page-by="linksStore.changeCurrentPageBy"
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
      v-if="!linksStore.links.length && !linksStore.loading"
      class="flex justify-center w-full pt-4"
    >
      <p class="text-heading-color text-3xl font-bold">
        {{ $t('table.noLinksFound') }}
      </p>
    </div>
  </div>
</template>
