<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useRouterStore } from '@/stores/router';
import { useLocaleStore } from '@/stores/locale';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { useLinksStore } from '@/stores/links';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { identify } from '@/services/analytics';
import NavBar from '@/components/layout/NavBar/NavBar.vue';
import SideBar from '@/components/layout/SideBar/SideBar.vue';
import Hotjar from '@/assets/javascripts/hotjar';
import { HOTJAR_ORGANIZATION_IDS } from '@/constants/api';
import LoadingSpinner from './components/LoadingSpinner.vue';

import '@/assets/javascripts/segment';

const $routerStore = useRouterStore();
const $localeStore = useLocaleStore();
const $userStore = useUserStore();
const $apiKeysStore = useAPIKeysStore();
const $linksStore = useLinksStore();
const $webhookEndpointsStore = useWebhookEndpointsStore();
const route = useRoute();

const startHotjarSessionIfNeeded = () => {
  const organizationId = $userStore.user?.defaultOrganizationId;
  if (organizationId && HOTJAR_ORGANIZATION_IDS.split(',').includes(organizationId)) {
    Hotjar.start();
  }
};

const loadUserData = () => {
  if ($userStore.authenticated) {
    startHotjarSessionIfNeeded();
    $apiKeysStore.loadAPIKeys();
    $linksStore.loadLinks();
    $webhookEndpointsStore.loadWebhookEndpoints();
    if ($userStore.user) {
      identify($userStore.user);
    }
  }
};

const shouldDisplaySidebar = computed(() => ['/links', '/api-keys', '/webhook-endpoints'].includes(route.path));

watch(() => $userStore.authenticated, () => {
  loadUserData();
});

onMounted(async () => {
  await $userStore.loadUser();
  loadUserData();
});
</script>

<template>
  <NavBar />
  <div class="flex">
    <SideBar v-if="shouldDisplaySidebar" />
    <div class="w-full">
      <div
        v-if="$routerStore.loading"
        class="flex justify-center w-full h-96"
      >
        <LoadingSpinner class="mt-auto w-20 h-20" />
      </div>
      <router-view
        v-else
        :key="$localeStore.language"
      />
    </div>
  </div>
</template>
