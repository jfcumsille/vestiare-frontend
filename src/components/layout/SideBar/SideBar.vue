<script setup lang="ts">
import { useTranslation } from '@/locales';
import LinkIcon from '@/assets/svg/LinksIcon.vue';
import KeyIcon from '@/assets/svg/KeyIcon.vue';
import WebhooksIcon from '@/assets/svg/WebhooksIcon.vue';
import { useConfigStore } from '@/stores/config';
import { Mode } from '@/interfaces/utilities/enums';
import GenericDropDown from '@/components/GenericDropDown.vue';

const configStore = useConfigStore();
const selectMode = (mode: string) => { configStore.updateMode(mode as Mode); };
const $t = useTranslation('sideBar');
</script>

<template>
  <aside
    class="bg-white h-screen flex flex-col w-64 px-4 py-8 overflow-y-auto shrink-0 -mt-2"
  >
    <ul class="flex flex-col text-center">
      <GenericDropDown
        data-test="mode-dropdown"
        :selected="configStore.mode"
        :options="[Mode.Live, Mode.Test]"
        is-color-primary
        class="my-2 p-1"
        is-width-full
        @select="selectMode"
      />
      <router-link
        data-test="links-link"
        class="flex items-center px-4 py-3 text-primary-main rounded-md hover:text-primary-hover"
        active-class="bg-primary-surface"
        to="/links"
      >
        <LinkIcon />
        <span class="mx-4 font-medium">{{ $t('links') }}</span>
      </router-link>
      <router-link
        data-test="api-keys-link"
        class="flex items-center px-4 py-3 text-primary-main rounded-md hover:text-primary-hover"
        to="/api-keys"
        active-class="bg-primary-surface"
      >
        <KeyIcon />
        <span class="mx-4 font-medium">{{ $t('apiKeys') }}</span>
      </router-link>
      <router-link
        data-test="webhook-endpoints-link"
        class="flex items-center px-4 py-3 text-primary-main rounded-md hover:text-primary-hover"
        to="/webhook-endpoints"
        active-class="bg-primary-surface"
      >
        <WebhooksIcon />
        <span class="mx-4 font-medium">{{ $t('webhooks') }}</span>
      </router-link>
    </ul>
  </aside>
</template>
