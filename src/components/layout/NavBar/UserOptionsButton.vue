<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { track } from '@/services/analytics';
import { USER_LOGGED_OUT } from '@/constants/analyticsEvents';
import { PROFILE_ROUTE } from '@/constants/router';
import PersonIcon from '@/assets/svg/PersonIcon.vue';
import GenericOptionsModal from '@/components/GenericOptionsModal.vue';

const userStore = useUserStore();
const $t = useTranslation('navBar');

const isUserMenuOpen = ref(false);
const pressUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const logOut = async () => {
  track(USER_LOGGED_OUT);
  await userStore.logOut();
};

const userMenuOptions = [
  { label: $t('myProfileSettings'), action: 'goToMyProfile' },
  { label: $t('logOut'), action: 'logout', iconName: 'log_out' },
];

const handleOptionSelected = (value: string) => {
  if (value === 'logout') {
    logOut();
  } else if (value === 'goToMyProfile') {
    router.push(PROFILE_ROUTE);
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
    class="relative cursor-pointer text-primary-main hover:text-primary-hover flex z-50"
    @click="pressUserMenu"
  >
    <PersonIcon class="mr-2 mt-1" />
    <p class="capitalize">
      {{ truncate(userStore.user?.name || $t('myProfile'), 22) }}
    </p>
    <GenericOptionsModal
      v-if="isUserMenuOpen"
      :options="userMenuOptions"
      align-right
      @select="(value: string) => handleOptionSelected(value)"
    />
  </button>
</template>
