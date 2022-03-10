<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslation } from '@/locales';
import GoogleLogo from './GoogleLogo.vue';
import GithubLogo from './GithubLogo.vue';

const $t = useTranslation('views.auth0Panel.texts');

const props = defineProps<{ signsUp: boolean }>();

const googleAuthorizeUrl = ref<string | null>(null);
const githubAuthorizeUrl = ref<string | null>(null);

const actionButtonLabel = computed(() => {
  if (props.signsUp) return $t('signUpWith');
  return $t('logInWith');
});

</script>

<template>
  <div>
    <a
      :href="googleAuthorizeUrl"
      class="p-3 w-96 bg-white flex flex-row rounded-md border items-center w-96
      justify-center drop-shadow-md border-bg-gray-200 text-center text-txt-body font-bold"
    >
      <GoogleLogo class="mr-4" /> {{ actionButtonLabel }} Google
    </a>
    <a
      :href="githubAuthorizeUrl"
      class="mt-5 p-3 w-96 bg-white flex flex-row rounded-md border items-center w-96
      justify-center drop-shadow-md border-bg-gray-200 text-center text-txt-body font-bold"
    >
      <GithubLogo class="mr-4" /> {{ actionButtonLabel }} Github
    </a>
  </div>
</template>
