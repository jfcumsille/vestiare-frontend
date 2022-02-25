<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useLinksStore } from '@/stores/links';
import LinksTable from './components/LinksTable.vue';
import LinksTableHeader from './components/LinksTableHeader.vue';
import LinksTableElement from './components/LinksTableElement.vue';

const $userStore = useUserStore();
const $linksStore = useLinksStore();

const headers = ['User', 'Bank', 'Last Refreshed', 'Mode', 'Active', ''];

onMounted(() => $linksStore.getLinks($userStore.defaultOrganizationId));
</script>

<template>
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
          v-for="link in $linksStore.links"
          :key="link.id"
          :link="link"
        />
      </template>
    </LinksTable>
  </div>
</template>
