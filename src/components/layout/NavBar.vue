<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import {
  DOCS,
  NEWS,
  CONTACT,
  BLOG,
  FINTOC_HOME,
} from '@/constants/texts';

import FintocLogo from '@/components/images/FintocLogo.vue';

interface Link {
  text: string
  path: string
}

const userStore = useUserStore();
const tr = useTranslation('navBar.texts');
const props = defineProps<{ links: Link[] }>();
const route = useRoute();

const userStore = useUserStore();

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
const isLoggedIn = computed(() => (userStore.authenticated));
</script>

<template>
  <nav class="border-gray-200 px-2 py-6 rounded">
    <div class="container flex flex-wrap items-center justify-between mx-auto max-w-screen-xl">
      <a
        :href="isLoggedIn ? '/' : FINTOC_HOME"
        :class="!isLoggedIn ? 'absolute left-0 ml-64' : ''"
      >
        <FintocLogo class="h-6 w-min" />
      </a>
      <div
        v-if="!isLoggedIn"
        class="block w-auto text-body-txt-color font-medium mx-auto"
      >
        <a
          class="hover:text-primary-main"
          :href="DOCS"
        >
          {{ tr('docs') }}
        </a>
        <a
          class="ml-8 hover:text-primary-main"
          :href="NEWS"
        >
          {{ tr('news') }}
        </a>
        <a
          class="ml-8 hover:text-primary-main"
          :href="CONTACT"
        >
          {{ tr('contact') }}
        </a>
        <a
          class="ml-8 hover:text-primary-main"
          :href="BLOG"
        >
          {{ tr('blog') }}
        </a>
      </div>
      <div
        v-if="!isLoggedIn"
        :class="!isLoggedIn ? 'absolute right-0 mr-64' : ''"
      >
        <a
          class="ml-8 text-primary-main hover:text-primary-main-hover font-medium"
          href="/login"
        >
          {{ tr('logIn') }}
        </a>
        <a
          class="
            ml-8 px-6 py-2 text-sm font-medium text-center rounded shadow-sm
            text-white bg-primary-main hover:bg-primary-main-hover justify-center h-12"
          href="/signup"
        >
          {{ tr('getAPIKeys') }}
        </a>
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
  </nav>
</template>
