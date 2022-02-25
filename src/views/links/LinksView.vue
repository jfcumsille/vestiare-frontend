<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { rutFormat } from 'rut-helpers';
import { useUserStore } from '@/stores/user';
import { useLinksStore } from '@/stores/links';
import { Link } from '@/api/interfaces/links';
import LinksTable from './components/LinksTable.vue';
import LinksTableHeader from './components/LinksTableHeader.vue';
import LinksTableElement from './components/LinksTableElement.vue';
import SearchBar from './components/SearchBar.vue';

const $userStore = useUserStore();
const $linksStore = useLinksStore();

const headers = ['User', 'Bank', 'Last Refreshed', 'Mode', 'Active', ''];
const search = ref('');

const sameId = (link: Link, searchValue: string) => {
  if (link.holderId.includes(searchValue.trim())) {
    return true;
  }
  if (rutFormat(link.holderId).includes(searchValue.trim())) {
    return true;
  }
  return false;
};

const links = computed(() => {
  if (search.value.trim() === '') {
    return $linksStore.links;
  }
  return $linksStore.links.filter((link) => sameId(link, search.value));
});

onMounted(() => $linksStore.getLinks($userStore.defaultOrganizationId));
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="grow mt-6 mx-4 max-w-screen-2xl">
      <SearchBar
        v-model="search"
        placeholder="Search for a user ID"
      />
    </div>
  </div>
  <div class="flex justify-center w-full">
    <LinksTable
      v-if="!$linksStore.loading"
      class="grow mt-6 mx-4 max-w-screen-2xl"
    >
      <template #header>
        <LinksTableHeader :headers="headers" />
      </template>

      <template #content>
        <LinksTableElement
          v-for="link in links"
          :key="link.id"
          :link="link"
        />
      </template>
    </LinksTable>
  </div>
</template>
