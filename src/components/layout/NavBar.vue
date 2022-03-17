<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
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

interface Link {
  text: string
  path: string
}

const userStore = useUserStore();
const $t = useTranslation('navBar.texts');
const props = defineProps<{ links: Link[] }>();
const route = useRoute();

const isLoggedIn = computed(() => (userStore.authenticated));
const isLargeWidth = computed(() => (widthType.value === 'lg'));

const isMenuOpen = ref(false);
const pressMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const navBarFintocLinks = [
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

const selectionClasses = (link: Link) => {
  if (route.path === link.path) {
    return 'text-blue-700';
  }
  return 'text-gray-700 hover:text-blue-700';
};

const logOut = () => {
  userStore.logOut();
  window.location.href = '/';
};
</script>

<template>
  <nav class="border-gray-200 px-2 py-6 rounded mx-4">
    <div
      class="
        container flex flex-wrap items-center
        justify-between mx-auto max-w-screen-lg min-w-max
      "
    >
      <a
        :href="isLoggedIn ? '/' : FINTOC_HOME"
      >
        <FintocLogo
          data-test="fintocLogo"
          class="h-6 w-min"
        />
      </a>
      <div
        v-if="!isLoggedIn && isLargeWidth"
        class="block w-auto text-heading-txt-color font-medium mx-auto"
      >
        <a
          v-for="link in navBarFintocLinks"
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
        class="block w-auto"
      >
        <ul class="flex mt-4 flex-row space-x-8 text-sm font-medium">
          <li
            v-for="link in props.links"
            :key="link.path"
          >
            <router-link
              :to="link.path"
              :class="`block p-0 ${selectionClasses(link)}`"
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
      class="
        mt-4 p-2 flex flex-col text-heading-txt-color
        font-medium bg-primary-surface rounded-lg
      "
    >
      <a
        v-for="link in navBarFintocLinks"
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
        class="px-3 py-2 text-primary-main hover:text-primary-main-hover font-medium"
        href="/login"
      >
        {{ $t('logIn') }}
      </a>
      <a
        class="
            mt-1 px-3 py-3 text-sm font-medium text-left rounded shadow-sm vertical-center
            text-white bg-primary-main hover:bg-primary-main-hover justify-center"
        href="/signup"
      >
        {{ $t('getAPIKeys') }}
      </a>
    </div>
  </nav>
</template>
