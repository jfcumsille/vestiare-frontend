<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useRouterStore } from '@/stores/router';
import {
  API_KEYS_ROUTE, LINKS_ROUTE, WEBHOOK_ENDPOINTS_ROUTE, PROFILE_ROUTE, ORGANIZATION_ROUTE,
} from '@/constants/router';
import { ButtonType } from '@/interfaces/utilities/enums';
import NavBar from '@/components/layout/NavBar/NavBar.vue';
import SideBar from '@/components/layout/SideBar/SideBar.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericButton from '@/components/GenericButton.vue';

const routerStore = useRouterStore();
const route = useRoute();
const shouldDisplaySidebar = computed(() => [
  LINKS_ROUTE, API_KEYS_ROUTE, WEBHOOK_ENDPOINTS_ROUTE,
].includes(route.path));
const shouldDisplayBackButton = computed(
  () => [PROFILE_ROUTE, ORGANIZATION_ROUTE].includes(route.path),
);
</script>

<template>
  <div class="flex flex-col mx-10">
    <NavBar />
    <div class="flex">
      <SideBar v-if="shouldDisplaySidebar" />
      <div
        v-if="shouldDisplayBackButton"
        class="pt-10 pl-20"
      >
        <GenericButton
          class="rotate-180"
          icon-name="chevron"
          :type="ButtonType.Secondary"
          @click="router.go(-1)"
        />
      </div>

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
