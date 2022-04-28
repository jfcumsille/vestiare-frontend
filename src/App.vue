<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useLocaleStore } from '@/stores/locale';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { useLinksStore } from '@/stores/links';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { identify } from '@/services/analytics';
import Hotjar from '@/assets/javascripts/hotjar';
import { HOTJAR_ORGANIZATION_IDS } from '@/constants/api';
import Layout from '@/components/layout/Layout.vue';

import '@/assets/javascripts/segment';

const $localeStore = useLocaleStore();
const $userStore = useUserStore();
const $apiKeysStore = useAPIKeysStore();
const $linksStore = useLinksStore();
const $webhookEndpointsStore = useWebhookEndpointsStore();

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

watch(() => $userStore.authenticated, () => {
  loadUserData();
});

onMounted(async () => {
  await $userStore.loadUser();
  loadUserData();
});
</script>

<template>
  <Layout :key="$localeStore.language">
    <router-view />
  </Layout>
</template>
