<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useLinksStore } from '@/stores/links';
import LinksTable from './components/LinksTable.vue';
import LinksTableHeader from './components/LinksTableHeader.vue';
import LinksTableElement from './components/LinksTableElement.vue';

const $userStore = useUserStore();
const $linksStore = useLinksStore();

const headers = ['Name', 'Bank', 'Last Refreshed', 'Status', 'Mode'];

onMounted(() => $linksStore.getLinks({
  currentOrganizationId: $userStore.defaultOrganizationId,
}));
</script>

<template>
  <LinksTable v-if="!$linksStore.loading">
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
</template>
