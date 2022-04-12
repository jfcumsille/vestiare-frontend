<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouterStore } from '@/stores/router';
import { useLocaleStore } from '@/stores/locale';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { useLinksStore } from '@/stores/links';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import NavBar from '@/components/layout/NavBar.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';

import '@/assets/javascripts/segment';

const $routerStore = useRouterStore();
const $localeStore = useLocaleStore();
const $userStore = useUserStore();
const $apiKeysStore = useAPIKeysStore();
const $linksStore = useLinksStore();
const $webhookEndpointsStore = useWebhookEndpointsStore();

const loadUserData = () => {
  if ($userStore.authenticated) {
    $apiKeysStore.loadAPIKeys();
    $linksStore.loadLinks();
    $webhookEndpointsStore.loadWebhookEndpoints();
    if ($userStore.user) {
      window.analytics.identify($userStore.user.id, {
        email: $userStore.user.email,
        name: $userStore.user.name,
        defaultOrganizationId: $userStore.user.defaultOrganizationId,
      });
    }
  }
};

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
</template>
