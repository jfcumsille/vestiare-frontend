<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale';

const $store = useLocaleStore();
</script>

<template>
  <router-view :key="$store.language" />
</template>
