<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { loginWithRedirect } from '@/services/auth0';
import GoogleLogo from './GoogleLogo.vue';
import GithubLogo from './GithubLogo.vue';

const $t = useTranslation('auth0Panel.texts');

const props = withDefaults(defineProps<{
  isSignup?: boolean,
}>(), {
  isSignup: false,
});

const buttonLabel = computed(() => (props.isSignup ? $t('signUpWith') : $t('logInWith')));
</script>

<template>
  <div>
    <button
      class="
        p-3 w-96 bg-white flex flex-row rounded-md border items-center
        justify-center drop-shadow-md border-bg-gray-200 text-center
        text-body-txt-color font-bold
      "
      @click="loginWithRedirect('google-oauth2')"
    >
      <GoogleLogo class="mr-4" /> {{ buttonLabel }} Google
    </button>
    <button
      class="
        mt-5 p-3 w-96 bg-white flex flex-row rounded-md border items-center
        justify-center drop-shadow-md border-bg-gray-200 text-center
        text-body-txt-color font-bold
      "
      @click="loginWithRedirect('github')"
    >
      <GithubLogo class="mr-4" /> {{ buttonLabel }} Github
    </button>
  </div>
</template>
