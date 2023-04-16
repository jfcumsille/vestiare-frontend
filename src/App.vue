<script setup lang="ts">
import { watch } from 'vue';
import { useConfigStore } from '@/stores/config';
import { useUserStore } from '@/stores/user';
import { useDressesStore } from '@/stores/dresses';
import { getAuth0Client } from '@/services/auth0';
import { identify } from '@/services/analytics';
import Layout from '@/components/layout/Layout.vue';

import '@/assets/javascripts/segment';

const configStore = useConfigStore();
const userStore = useUserStore();
const dressesStore = useDressesStore()

const loadUserData = async () => {
  if (userStore.authenticated) {
    if (userStore.user) {
      const metadataKey = `${window.location.origin}/user_metadata`;
      const auth0 = await getAuth0Client();
      const auth0User = await auth0.getUser();
      identify(userStore.user, auth0User?.[metadataKey]?.company);
    }
  }
};

watch(() => userStore.authenticated, async () => {
  if (userStore.authenticated) {
    await loadUserData();
    dressesStore.reloadDresses();
  }
});
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>
