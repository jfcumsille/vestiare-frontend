<script setup lang="ts">
import { onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { useOrganizationStore } from '@/stores/organization';
import {
  DRESSES_ROUTE,
} from '@/constants/router';
import LinkIcon from '@/assets/svg/LinksIcon.vue';
import KeyIcon from '@/assets/svg/KeyIcon.vue';
import WebhooksIcon from '@/assets/svg/WebhooksIcon.vue';
import PaymentsIcon from '@/assets/svg/sidebar/PaymentsIcon.vue';
import ModeDropdown from './ModeDropdown.vue';

const $t = useTranslation('sideBar');
const organizationStore = useOrganizationStore();

onMounted(() => {
  organizationStore.loadOrganization();
});
</script>

<template>
  <aside
    class="bg-white flex flex-col w-fit px-4 pt-6 pb-8 overflow-y-none shrink-0"
  >
    <ul class="flex flex-col text-center relative">
      <ModeDropdown />
      <div class="absolute mt-20">
        <router-link
          data-test="links-link"
          class="
            flex items-center px-4 py-3 text-primary-main
            rounded-md hover:text-primary-hover w-40
          "
          active-class="bg-primary-surface"
          :to="DRESSES_ROUTE"
        >
          <LinkIcon />
          <span class="mx-4 font-medium">{{ $t('dresses') }}</span>
        </router-link>
      </div>
    </ul>
  </aside>
</template>
