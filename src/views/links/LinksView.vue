<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { rutFormat } from 'rut-helpers';
import { useUserStore } from '@/stores/user';
import { useLinksStore } from '@/stores/links';
import { Link } from '@/api/interfaces/links';
import GenericToggle from '@/components/GenericToggle.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import LinksTable from './components/LinksTable.vue';
import LinksTableHeader from './components/LinksTableHeader.vue';
import LinksTableElement from './components/LinksTableElement.vue';
import SearchBar from './components/SearchBar.vue';
import DropDown from './components/DropDown.vue';

const $userStore = useUserStore();
const $linksStore = useLinksStore();

const headers = ['User', 'Business', 'Bank', 'Last Refreshed', 'Active', ''];

const live = ref(true);
const toggleLive = () => {
  live.value = !live.value;
};
const links = computed(() => (live.value ? $linksStore.liveLinks : $linksStore.testLinks));

const activeFilter = ref('All');
const activeOptions = ['All', 'Active', 'Inactive'];
const selectActiveFilter = (value: string) => {
  activeFilter.value = value;
};
const filterByActive = (rawLinks: Array<Link>) => {
  if (activeFilter.value === 'All') {
    return rawLinks;
  }
  if (activeFilter.value === 'Active') {
    return rawLinks.filter((link) => link.active);
  }
  return rawLinks.filter((link) => !link.active);
};

const passwordFilter = ref('All');
const passwordOptions = ['All', 'Valid', 'Invalid'];
const selectPasswordFilter = (value: string) => {
  passwordFilter.value = value;
};
const filterByPassword = (rawLinks: Array<Link>) => {
  if (passwordFilter.value === 'All') {
    return rawLinks;
  }
  if (passwordFilter.value === 'Valid') {
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

const filteredLinks = computed(() => filterByActive(filterByPassword(filterBySearch(links.value))));

onMounted(() => $linksStore.getLinks($userStore.defaultOrganizationId));
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="grow flex justify-between mt-6 mx-4 max-w-screen-2xl">
      <div class="flex justify-center">
        <SearchBar
          v-model="search"
          placeholder="Search for a user ID"
        />
        <DropDown
          class="ml-4"
          name="Active"
          :selected="activeFilter"
          :options="activeOptions"
          @select="selectActiveFilter"
        />
        <DropDown
          class="ml-4"
          name="Password"
          :selected="passwordFilter"
          :options="passwordOptions"
          @select="selectPasswordFilter"
        />
      </div>

      <div class="flex flex-col justify-center">
        <div class="flex">
          <p
            class="pr-4 text-gray-900 text-md font-medium"
            :class="{ 'opacity-25': live }"
          >
            Test Links
          </p>
          <GenericToggle
            :active="live"
            @toggle="toggleLive"
          />
          <p
            class="pl-4 text-gray-900 text-md font-medium"
            :class="{ 'opacity-25': !live }"
          >
            Live Links
          </p>
        </div>
      </div>
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
