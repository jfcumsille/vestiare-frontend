<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { authenticateWithRedirect } from '@/services/auth0';
import GoogleLogo from './GoogleLogo.vue';
import GithubLogo from './GithubLogo.vue';

const $t = useTranslation('auth0Panel');

const props = withDefaults(defineProps<{
  isSignup?: boolean,
}>(), {
  isSignup: false,
});

const mode = computed(() => (props.isSignup ? 'signup' : 'login'));

const buttonLabel = computed(() => (props.isSignup ? $t('signUpWith') : $t('logInWith')));
</script>

<template>
  <div>
    <button
      class="
        p-3 bg-white flex flex-row rounded-md border items-center
        justify-center drop-shadow-md border-light-gray text-center
        text-body-color font-bold w-full
      "
      @click="authenticateWithRedirect('google-oauth2', mode)"
    >
      <GoogleLogo class="mr-4" /> {{ buttonLabel }} Google
    </button>
    <button
      class="
        mt-5 p-3 bg-white flex flex-row rounded-md border items-center
        justify-center drop-shadow-md border-light-gray text-center
        text-body-color font-bold w-full
      "
      @click="authenticateWithRedirect('github', mode)"
    >
      <GithubLogo class="mr-4" /> {{ buttonLabel }} Github
    </button>
  </div>
</template>
