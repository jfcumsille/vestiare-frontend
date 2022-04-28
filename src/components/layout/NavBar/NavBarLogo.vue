<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import FintocLogo from '@/assets/svg/FintocLogo.vue';
import FintocIso from '@/assets/svg/FintocIso.vue';
import { FINTOC_HOME } from '@/constants/urls';

const userStore = useUserStore();
const isLoggedIn = computed(() => (userStore.authenticated));

</script>

<template>
  <a
    data-test="fintoc-logo"
    :href="isLoggedIn ? undefined : FINTOC_HOME"
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
  </a>
</template>
