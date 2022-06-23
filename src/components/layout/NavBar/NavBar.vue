<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { widthType } from '@/services/window';
import { ButtonType } from '@/interfaces/utilities/enums';
import { LOGIN_ROUTE, SIGNUP_ROUTE, ORGANIZATION_ROUTE } from '@/constants/router';
import { DOCS } from '@/constants/urls';
import MenuIcon from '@/assets/svg/MenuIcon.vue';
import ChileIcon from '@/assets/svg/ChileIcon.vue';
import MexicoIcon from '@/assets/svg/MexicoIcon.vue';
import SettingsIcon from '@/assets/svg/SettingsIcon.vue';
import GenericButton from '@/components/GenericButton.vue';
import UserOptionsButton from './UserOptionsButton.vue';
import NavBarLogo from './NavBarLogo.vue';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

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

const logIn = () => {
  router.push({ path: LOGIN_ROUTE });
};
const signUp = () => {
  router.push({ path: SIGNUP_ROUTE });
};
</script>

<template>
  <nav>
    <div
      class="flex items-center p-6 justify-between"
    >
      <NavBarLogo />
      <div
        v-if="!isLoggedIn && isLargeWidth"
        class="flex gap-4"
      >
        <a
          class="
            text-primary-main hover:text-primary-hover
            px-5 py-4 h-11 cursor-pointer flex items-center
          "
          :href="DOCS"
          target="_blank"
        >
          {{ $t('docs') }}
        </a>
        <GenericButton
          v-if="!route.path.includes(LOGIN_ROUTE)"
          :type="ButtonType.Secondary"
          :text="$t('logIn')"
          @click="logIn"
        />
        <GenericButton
          v-if="!route.path.includes(SIGNUP_ROUTE)"
          :type="ButtonType.Secondary"
          :text="$t('signUp')"
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
              :to="ORGANIZATION_ROUTE"
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
          class="
            px-3 py-2 border-b-4 border-primary-main border-opacity-0
            hover:border-opacity-100 hover:text-primary-main
          "
          :href="DOCS"
          target="_blank"
        >
          {{ $t('docs') }}
        </a>
        <a
          v-if="!route.path.includes(LOGIN_ROUTE)"
          class="mx-2 px-3 py-2 text-primary-main hover:text-primary-hover font-medium"
          :href="LOGIN_ROUTE"
        >
          {{ $t('logIn') }}
        </a>
        <a
          v-if="!route.path.includes(SIGNUP_ROUTE)"
          class="
              mx-2 mt-1 px-3 py-3 text-sm font-medium text-left rounded shadow-sm vertical-center
              text-white bg-primary-main hover:bg-primary-hover justify-center"
          :href="SIGNUP_ROUTE"
        >
          {{ $t('signUp') }}
        </a>
      </div>
    </div>
  </nav>
</template>
