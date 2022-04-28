<script setup lang="ts">
import { useTranslation } from '@/locales';
import LinkIcon from '@/assets/svg/LinksIcon.vue';
import KeyIcon from '@/assets/svg/KeyIcon.vue';
import WebhooksIcon from '@/assets/svg/WebhooksIcon.vue';
import ModeDropdown from './ModeDropdown.vue';

const $t = useTranslation('sideBar');
</script>

<template>
  <aside
    class="bg-white flex flex-col w-64 px-4 py-8 overflow-y-auto shrink-0 -mt-2"
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
          to="/links"
        >
          <LinkIcon />
          <span class="mx-4 font-medium">{{ $t('links') }}</span>
        </router-link>
        <router-link
          data-test="api-keys-link"
          class="
            flex items-center px-4 py-3 text-primary-main
            rounded-md hover:text-primary-hover w-40
          "
          active-class="bg-primary-surface"
          to="/api-keys"
        >
          <KeyIcon />
          <span class="mx-4 font-medium">{{ $t('apiKeys') }}</span>
        </router-link>
        <router-link
          data-test="webhook-endpoints-link"
          class="
            flex items-center px-4 py-3 text-primary-main
            rounded-md hover:text-primary-hover w-40
          "
          active-class="bg-primary-surface"
          to="/webhook-endpoints"
        >
          <WebhooksIcon />
          <span class="mx-4 font-medium">{{ $t('webhooks') }}</span>
        </router-link>
      </div>
    </ul>
  </aside>
</template>
