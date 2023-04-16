<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import FintocLogo from '@/assets/svg/FintocLogo.vue';
import FintocIso from '@/assets/svg/FintocIso.vue';
import { HOME_ROUTE } from '@/constants/router';

const userStore = useUserStore();
const isLoggedIn = computed(() => (userStore.authenticated));
</script>

<template>
  <component
    :is="isLoggedIn ? 'router-link' : 'a'"
    data-test="fintoc-logo"
    class="cursor-pointer"
    :to="isLoggedIn ? HOME_ROUTE : undefined"
    :href="undefined"
  >
    <FintocLogo
      v-if="!userStore.organizationName"
      class="h-6"
    />
    <div
      v-else
      class="flex"
    >
      <FintocIso
        class="h-6 w-6"
      />
      <p class="ml-3 -mt-1 text-heading-color font-bold text-2xl select-none">
        {{ userStore.organizationName }}
      </p>
    </div>
  </component>
</template>
