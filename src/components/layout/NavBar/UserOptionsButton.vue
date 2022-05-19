<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { track } from '@/services/analytics';
import { USER_LOGGED_OUT } from '@/constants/analyticsEvents';
import { LOGIN_ROUTE } from '@/constants/router';
import PersonIcon from '@/assets/svg/PersonIcon.vue';
import GenericOptionsModal from '@/components/GenericOptionsModal.vue';

const router = useRouter();
const userStore = useUserStore();
const $t = useTranslation('navBar');

const isUserMenuOpen = ref(false);
const pressUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};
const logIn = () => {
  router.push({ path: LOGIN_ROUTE });
};
const logOut = () => {
  userStore.logOut();
  logIn();
  track(USER_LOGGED_OUT);
};

const userMenuOptions = [
  { label: $t('logOut'), action: 'logout' },
];

const handleOptionSelected = (value: string) => {
  if (value === 'logout') {
    logOut();
  }
};
const dropdownMenu = ref(null);

onClickOutside(dropdownMenu, () => {
  isUserMenuOpen.value = false;
});
const truncate = (string: string, maxLen: number) => string.substring(0, maxLen);
</script>

<template>
  <button
    ref="dropdownMenu"
    data-test="nav-bar-profile-settings-link"
    class="cursor-pointer text-primary-main hover:text-primary-hover flex"
    @click="pressUserMenu"
  >
    <PersonIcon class="mr-2 mt-1" />
    <p class="capitalize">
      {{ truncate(userStore.user?.name || $t('myProfile'), 22) }}
    </p>
    <GenericOptionsModal
      v-if="isUserMenuOpen"
      :options="userMenuOptions"
      @select="(value: string) => handleOptionSelected(value)"
    />
  </button>
</template>
