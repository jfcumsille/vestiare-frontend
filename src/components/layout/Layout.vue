<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouterStore } from '@/stores/router';
import NavBar from '@/components/layout/NavBar/NavBar.vue';
import SideBar from '@/components/layout/SideBar/SideBar.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const routerStore = useRouterStore();
const route = useRoute();
const shouldDisplaySidebar = computed(() => ['/links', '/api-keys', '/webhook-endpoints'].includes(route.path));

</script>
<template>
  <div class="flex flex-col mx-10">
    <NavBar />
    <div class="flex">
      <SideBar v-if="shouldDisplaySidebar" />
      <div
        v-if="routerStore.loading"
        class="flex justify-center w-full h-96"
      >
        <LoadingSpinner class="mt-auto w-20 h-20" />
      </div>
      <div
        v-else
        class="w-full"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
