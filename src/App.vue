<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useLocaleStore } from '@/stores/locale';
import NavBar from '@/components/layout/NavBar.vue';

const $localeStore = useLocaleStore();
const $userStore = useUserStore();

const brandLink = { text: 'Fintoc', path: '/links' };

const navBarLinks = [
  {
    text: 'Links',
    path: '/links',
  },
  {
    text: 'Webhook Endpoints',
    path: '/webhook_endpoints',
  },
];

onMounted(async () => {
  await $userStore.loadUser();
});
</script>

<template>
  <NavBar
    :brand="brandLink"
    :links="navBarLinks"
  />
  <router-view :key="$localeStore.language" />
</template>
