<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { useConfigStore } from '@/stores/config';
import { Nullable } from '@/interfaces/common';
import { Link } from '@/interfaces/entities/links';
import { FilterOption, LinkFilter } from '@/interfaces/utilities/table';
import { Product, ButtonType, LinkFilterType } from '@/interfaces/utilities/enums';
import * as api from '@/api';
import { DASHBOARD_ORIGIN, LINKS_VIEWED } from '@/constants/analyticsEvents';
import { DOCS_LINKS } from '@/constants/urls';
import { page, trackModal, trackLinkCreated } from '@/services/analytics';
import {
  addFilter,
  removeFilter,
  getIndex,
  getFilterValues,
  resetFilters,
} from '@/utils/table';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericTable from '@/components/table/GenericTable.vue';
import TablePagination from '@/components/table/TablePagination.vue';
import TableAppliedFilters from '@/components/table/TableAppliedFilters.vue';
import GenericButton from '@/components/GenericButton.vue';
import CreateLinkModal from '@/views/links/components/CreateLinkModal.vue';
import NewLinkModal from '@/views/links/components/NewLinkModal.vue';
import LinksTableHead from '@/views/links/components/LinksTableHead.vue';
import LinksTableRow from '@/views/links/components/LinksTableRow.vue';

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

const loadingLinkToken = ref(false);
const errorCreatingLinkToken = ref(false);
const createdLink = ref<Nullable<Link>>(null);
const createdLinkToken = ref<Nullable<string>>(null);

const attemptToCreateLinkToken = async (linkId: string) => {
  const TRIES = 3;
  for (let trying = 0; trying < TRIES; trying += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const regeneratedLink = await api.links.regenerate(linkId);
      return regeneratedLink.linkToken;
    } catch { } // eslint-disable-line no-empty
  }
  return null;
};

const setLinkToken = async () => {
  errorCreatingLinkToken.value = false;
  if (createdLink.value) {
    loadingLinkToken.value = true;
    const regeneratedLinkToken = await attemptToCreateLinkToken(createdLink.value.id);
    if (regeneratedLinkToken) {
      createdLinkToken.value = regeneratedLinkToken;
    } else {
      errorCreatingLinkToken.value = true;
    }
    loadingLinkToken.value = false;
  }
};

const setLink = async (link: Link, product: Product) => {
  createdLink.value = link;
  trackLinkCreated(link, product);
  await linksStore.reloadLinks();
  setLinkToken();
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

const openedPassword = ref(false);
const openedActive = ref(false);

const filters = ref([]);

const passwordFilters = ref<Array<FilterOption<boolean>>>([
  { name: $t('table.filters.password.options.valid'), value: false, checked: false },
  { name: $t('table.filters.password.options.invalid'), value: true, checked: false },
]);
const passwordFilterSelectedValues = computed(() => getFilterValues(passwordFilters.value));

const activeFilters = ref<Array<FilterOption<boolean>>>([
  { name: $t('table.filters.active.options.valid'), value: true, checked: false },
  { name: $t('table.filters.active.options.invalid'), value: false, checked: false },
]);
const activeFilterSelectedValues = computed(() => getFilterValues(activeFilters.value));

const applyFilter = async () => {
  const allFilters: LinkFilter = {
    active: activeFilterSelectedValues.value,
    preventRefresh: passwordFilterSelectedValues.value,
  };
  if (formattedSearch.value !== '') {
    allFilters.push({ rut: formattedSearch.value });
  }
  await linksStore.updateFilters(allFilters);
};

const activeAppliedFilter = computed(() => (
  {
    label: LinkFilterType.Active,
    values: activeFilters.value,
    open: openedActive.value,
  }
));
const passwordAppliedFilter = computed(() => (
  {
    label: LinkFilterType.Password,
    values: passwordFilters.value,
    open: openedPassword.value,
  }
));

const openFilter = (label: string) => {
  const index = getIndex(label, filters.value);
  removeFilter(index, filters.value);
  if (label === 'active') {
    openedActive.value = true;
    addFilter(index, activeAppliedFilter.value, filters.value);
  }
  if (label === 'password') {
    openedPassword.value = true;
    addFilter(index, passwordAppliedFilter.value, filters.value);
  }
};

const toggleFilter = ({ label, open }) => {
  const index = getIndex(label, filters.value);
  removeFilter(index, filters.value);
  if (label === 'active') {
    openedActive.value = open;
    addFilter(index, activeAppliedFilter.value, filters.value);
  }
  if (label === 'password') {
    openedPassword.value = open;
    addFilter(index, passwordAppliedFilter.value, filters.value);
  }
};

const deleteFilter = async (label: string) => {
  const index = getIndex(label, filters.value);
  removeFilter(index, filters.value);
  if (label === 'active') {
    openedActive.value = false;
    activeFilters.value = resetFilters(activeFilters.value);
  }
  if (label === 'password') {
    openedPassword.value = false;
    passwordFilters.value = resetFilters(passwordFilters.value);
  }
  await applyFilter();
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
      :loading="loadingLinkToken"
      :error="errorCreatingLinkToken"
      :link-token="createdLinkToken"
      @retry="setLinkToken"
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
            rel="noopener noreferrer"
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
        <template #top-section>
          <TableAppliedFilters
            :applied-filters="filters"
            @toggle="toggleFilter"
            @delete="deleteFilter"
            @apply="applyFilter"
          />
        </template>

        <template #head>
          <LinksTableHead
            @open="openFilter"
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
