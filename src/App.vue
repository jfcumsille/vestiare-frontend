<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';

import { useLocaleStore } from '@/stores/locale';

const $store = useLocaleStore();

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
</script>

<template>
  <NavBar
    :brand="brandLink"
    :links="navBarLinks"
  />
  <router-view :key="$store.language" />
</template>
