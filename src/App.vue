<script setup lang="ts">
import { watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useLocaleStore } from '@/stores/locale';
import { useAPIKeysStore } from '@/stores/apiKeys';
import { useLinksStore } from '@/stores/links';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { getAuth0Client } from '@/services/auth0';
import { identify } from '@/services/analytics';
import Hotjar from '@/assets/javascripts/hotjar';
import { HOTJAR_ORGANIZATION_IDS } from '@/constants/api';
import Layout from '@/components/layout/Layout.vue';
import { useConfigStore } from '@/stores/config';

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

const loadUserData = async () => {
  if ($userStore.authenticated) {
    startHotjarSessionIfNeeded();
    $apiKeysStore.loadAPIKeys();
    $linksStore.loadLinks();
    $webhookEndpointsStore.loadWebhookEndpoints();
    if ($userStore.user) {
      const metadataKey = `${window.location.origin}/user_metadata`;
      const auth0 = await getAuth0Client();
      const auth0User = await auth0.getUser();
      identify($userStore.user, auth0User?.[metadataKey]?.company);
    }
  }
};

watch(() => $userStore.authenticated, async () => {
  if ($userStore.authenticated) {
    await loadUserData();
  }
});

const configStore = useConfigStore();
watch(() => configStore.mode, () => {
  if ($userStore.authenticated) {
    $linksStore.reloadLinks();
  }
});
</script>

<template>
  <Layout :key="$localeStore.language">
    <router-view />
  </Layout>
</template>
