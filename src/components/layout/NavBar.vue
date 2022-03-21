<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTranslation } from '@/locales';
import { widthType } from '@/services/window';
import {
  DOCS,
  NEWS,
  CONTACT,
  BLOG,
  FINTOC_HOME,
} from '@/constants/texts';

import FintocLogo from '@/components/images/FintocLogo.vue';
import MenuIcon from '@/components/images/MenuIcon.vue';
import ChileIcon from '@/components/images/ChileIcon.vue';
import MexicoIcon from '@/components/images/MexicoIcon.vue';

const props = defineProps<{ isLoggedIn: boolean }>();
const route = useRoute();
const $t = useTranslation('navBar.texts');

const isLargeWidth = computed(() => (widthType.value === 'lg'));

const isMenuOpen = ref(false);
const pressMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const navBarInternalLinks = [
  {
    text: 'Links',
    path: '/links',
  },
  {
    text: 'Webhook Endpoints',
    path: '/webhook_endpoints',
  },
];

const navBarPublicLinks = [
  {
    text: $t('docs'),
    href: DOCS,
  },
  {
    text: $t('news'),
    href: NEWS,
  },
  {
    text: $t('contact'),
    href: CONTACT,
  },
  {
    text: $t('blog'),
    href: BLOG,
  },
];

const selectionClasses = (path: string) => {
  if (route.path === path) {
    return 'text-blue-700';
  }
  return 'text-gray-700 hover:text-blue-700';
};

const emit = defineEmits<{(e: 'log-out'): void }>();

const logOut = () => {
  emit('log-out');
};
</script>

<template>
  <nav>
    <div
      class="
        container flex flex-wrap items-center p-6
        justify-between mx-auto max-w-screen-xl min-w-max
      "
    >
      <a
        data-test="fintocLogo"
        :href="props.isLoggedIn ? '/' : FINTOC_HOME"
      >
        <FintocLogo
          class="h-6 w-min"
        />
      </a>
      <div
        v-if="!props.isLoggedIn && isLargeWidth"
        class="block w-auto text-heading-txt-color font-medium mx-auto"
        data-test="navBarPublicLinks"
      >
        <a
          v-for="link in navBarPublicLinks"
          :key="link.text"
          class="ml-8 hover:text-primary-main"
          :href="link.href"
        >
          {{ link.text }}
        </a>
      </div>
      <div
        v-if="!props.isLoggedIn && isLargeWidth"
      >
        <a
          class="ml-8 text-primary-main hover:text-primary-main-hover font-medium"
          href="/login"
        >
          {{ $t('logIn') }}
        </a>
        <a
          class="
            ml-8 px-6 py-2 text-sm font-medium text-center rounded shadow-sm
            text-white bg-primary-main hover:bg-primary-main-hover justify-center h-12"
          href="/signup"
        >
          {{ $t('getAPIKeys') }}
        </a>
      </div>
      <div
        v-if="!props.isLoggedIn && !isLargeWidth"
        class="flex flex-row"
      >
        <ChileIcon class="h-6 w-6 mr-3" />
        <MexicoIcon class="h-6 w-6 mr-8" />
        <button
          @click="pressMenu"
        >
          <MenuIcon class="h-5 w-5" />
        </button>
      </div>
      <div
        v-if="props.isLoggedIn"
        class="block w-auto"
        data-test="navBarInternalLinks"
      >
        <ul class="flex flex-row space-x-8 text-sm font-medium">
          <li
            v-for="link in navBarInternalLinks"
            :key="link.path"
          >
            <router-link
              :to="link.path"
              :class="`block p-0 ${selectionClasses(link.path)}`"
            >
              {{ link.text }}
            </router-link>
          </li>
          <li
            class="cursor-pointer"
            @click="logOut"
          >
            Log Out
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="!props.isLoggedIn && !isLargeWidth && isMenuOpen"
      class="px-4 w-full bg-white fixed z-20"
    >
      <div
        class="
          pt-1 pb-2 bg-primary-surface flex flex-col
          text-heading-txt-color font-medium rounded-lg transition-all ease-out duration-500
        "
      >
        <a
          v-for="link in navBarPublicLinks"
          :key="link.text"
          class="
            px-3 py-2 border-b-4 border-primary-main border-opacity-0
            hover:border-opacity-100 hover:text-primary-main
          "
          :href="link.href"
        >
          {{ link.text }}
        </a>
        <a
          class="mx-2 px-3 py-2 text-primary-main hover:text-primary-main-hover font-medium"
          href="/login"
        >
          {{ $t('logIn') }}
        </a>
        <a
          class="
              mx-2 mt-1 px-3 py-3 text-sm font-medium text-left rounded shadow-sm vertical-center
              text-white bg-primary-main hover:bg-primary-main-hover justify-center"
          href="/signup"
        >
          {{ $t('getAPIKeys') }}
        </a>
      </div>
    </div>
  </nav>
</template>
