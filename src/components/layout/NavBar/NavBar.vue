<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { widthType } from '@/services/window';
import { ButtonType, SizeType } from '@/interfaces/utilities/enums';
import {
  DOCS, NEWS, CONTACT, BLOG, FINTOC_HOME,
} from '@/constants/urls';
import FintocLogo from '@/assets/svg/FintocLogo.vue';
import FintocIso from '@/assets/svg/FintocIso.vue';
import MenuIcon from '@/assets/svg/MenuIcon.vue';
import ChileIcon from '@/assets/svg/ChileIcon.vue';
import MexicoIcon from '@/assets/svg/MexicoIcon.vue';
import SettingsIcon from '@/assets/svg/SettingsIcon.vue';
import GenericButton from '@/components/GenericButton.vue';
import UserOptionsButton from './UserOptionsButton.vue';

const userStore = useUserStore();
const router = useRouter();

const $t = useTranslation('navBar');

const isLoggedIn = computed(() => (userStore.authenticated));
const isLargeWidth = computed(() => (widthType.value === 'lg'));

const isMenuOpen = ref(false);
const pressMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const navBarLoggedInLinks = [
  {
    text: $t('docs'),
    href: DOCS,
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

const logIn = () => {
  router.push({ path: '/login' });
};
const signUp = () => {
  router.push({ path: '/signup' });
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
        :href="isLoggedIn ? undefined : FINTOC_HOME"
      >
        <FintocLogo
          v-if="!userStore.organizationName"
          class="h-6 w-min"
        />
        <div class="flex">
          <FintocIso
            v-if="userStore.organizationName"
            class="h-6 w-min"
          />
          <p class="ml-3 -mt-1 text-heading-color font-bold text-2xl">
            {{ userStore.organizationName }}
          </p>
        </div>
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
        class="flex"
      >
        <GenericButton
          :type="ButtonType.Text"
          :size="SizeType.Inline"
          :text="$t('logIn')"
          @click="logIn"
        />
        <GenericButton
          class="ml-4"
          :type="ButtonType.Primary"
          :text="$t('getAPIKeys')"
          @click="signUp"
        />
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
        <div
          class="
            flex flex-row space-x-8 text-sm font-medium
          "
        >
          <a
            v-for="link in navBarLoggedInLinks"
            :key="link.text"
            class="cursor-pointer text-primary-main hover:text-primary-hover"
            :href="link.href"
            target="_blank"
          >
            {{ link.text }}
          </a>
          <button
            data-test="nav-bar-organization-settings-link"
            class="cursor-pointer text-primary-main hover:text-primary-hover flex"
          >
            <SettingsIcon class="mr-2 mt-1" />
            <router-link
              to="/"
            >
              {{ userStore.organizationName || $t('organizationName') }}
            </router-link>
          </button>
          <UserOptionsButton />
        </div>
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
