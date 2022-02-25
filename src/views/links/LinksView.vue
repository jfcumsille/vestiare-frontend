<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { rutFormat } from 'rut-helpers';
import { useUserStore } from '@/stores/user';
import { useLinksStore } from '@/stores/links';
import { Link } from '@/api/interfaces/links';
import GenericToggle from '@/components/GenericToggle.vue';
import LinksTable from './components/LinksTable.vue';
import LinksTableHeader from './components/LinksTableHeader.vue';
import LinksTableElement from './components/LinksTableElement.vue';
import SearchBar from './components/SearchBar.vue';

const $userStore = useUserStore();
const $linksStore = useLinksStore();

const headers = ['User', 'Bank', 'Last Refreshed', 'Active', ''];
const search = ref('');

const live = ref(true);
const toggleLive = () => {
  live.value = !live.value;
};
const links = computed(() => (live.value ? $linksStore.liveLinks : $linksStore.testLinks));

const sameId = (link: Link, searchValue: string) => {
  if (link.holderId.includes(searchValue.trim())) {
    return true;
  }
  if (rutFormat(link.holderId).includes(searchValue.trim())) {
    return true;
  }
  return false;
};

const filteredLinks = computed(() => {
  if (search.value.trim() === '') {
    return links.value;
  }
  return links.value.filter((link) => sameId(link, search.value));
});

onMounted(() => $linksStore.getLinks($userStore.defaultOrganizationId));
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="grow flex justify-between mt-6 mx-4 max-w-screen-2xl">
      <SearchBar
        v-model="search"
        placeholder="Search for a user ID"
      />

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
    <LinksTable
      v-if="!$linksStore.loading"
      class="grow mt-6 mx-4 max-w-screen-2xl"
    >
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
</template>
