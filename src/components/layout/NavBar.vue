<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import { useTranslation } from '@/locales';
import { widthType } from '@/services/window';
import {
  DOCS, NEWS, CONTACT, BLOG, FINTOC_HOME,
} from '@/constants/urls';
import { USER_LOGGED_OUT } from '@/constants/analyticsEvents';
import FintocLogo from '@/assets/svg/FintocLogo.vue';
import MenuIcon from '@/assets/svg/MenuIcon.vue';
import ChileIcon from '@/assets/svg/ChileIcon.vue';
import MexicoIcon from '@/assets/svg/MexicoIcon.vue';

const userStore = useUserStore();
const route = useRoute();
const $t = useTranslation('navBar');

const isLoggedIn = computed(() => (userStore.authenticated));
const isLargeWidth = computed(() => (widthType.value === 'lg'));

const isMenuOpen = ref(false);
const pressMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const navBarInternalLinks = [
  {
    text: 'API Keys',
    path: '/api-keys',
  },
  {
    text: 'Links',
    path: '/links',
  },
  {
    text: 'Webhook Endpoints',
    path: '/webhook-endpoints',
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
    return 'text-primary-main';
  }
  return 'text-body-color hover:text-primary-main';
};

const logOut = () => {
  userStore.logOut();
  window.location.href = '/';
  window.analytics.track(USER_LOGGED_OUT);
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
        data-test="fintoc-logo"
        :href="isLoggedIn ? '/' : FINTOC_HOME"
      >
        <FintocLogo
          class="h-6 w-min"
        />
      </a>
      <div
        v-if="!isLoggedIn && isLargeWidth"
        class="block w-auto text-heading-color font-medium mx-auto"
        data-test="nav-bar-public-links"
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
        v-if="!isLoggedIn && isLargeWidth"
      >
        <a
          class="ml-8 text-primary-main hover:text-primary-hover font-medium"
          href="/login"
        >
          {{ $t('logIn') }}
        </a>
        <a
          class="
            ml-8 px-6 py-2 text-sm font-medium text-center rounded shadow-sm
            text-white bg-primary-main hover:bg-primary-hover justify-center h-12"
          href="/signup"
        >
          {{ $t('getAPIKeys') }}
        </a>
      </div>
      <div
        v-if="!isLoggedIn && !isLargeWidth"
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
        v-if="isLoggedIn"
        class="block w-auto ml-4"
        data-test="nav-bar-internal-links"
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
      v-if="!isLoggedIn && !isLargeWidth && isMenuOpen"
      class="px-4 w-full bg-white fixed z-20"
    >
      <div
        class="
          pt-1 pb-2 bg-primary-surface flex flex-col
          text-heading-color font-medium rounded-lg transition-all ease-out duration-500
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
          class="mx-2 px-3 py-2 text-primary-main hover:text-primary-hover font-medium"
          href="/login"
        >
          {{ $t('logIn') }}
        </a>
        <a
          class="
              mx-2 mt-1 px-3 py-3 text-sm font-medium text-left rounded shadow-sm vertical-center
              text-white bg-primary-main hover:bg-primary-hover justify-center"
          href="/signup"
        >
          {{ $t('getAPIKeys') }}
        </a>
      </div>
    </div>
  </nav>
</template>
