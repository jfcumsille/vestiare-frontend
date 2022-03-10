<script setup lang="ts">
import { computed, ref } from 'vue';
import GoogleLogo from './GoogleLogo.vue';
import GithubLogo from './GithubLogo.vue';

const props = defineProps<{ signsUp: boolean }>();

const googleAuthorizeUrl = ref<string | null>(null);
const githubAuthorizeUrl = ref<string | null>(null);

const actionButtonLabel = computed(() => {
  if (props.signsUp) return 'Sign up';
  return 'Login';
});

</script>

<template>
  <div>
    <a
      :href="googleAuthorizeUrl"
      class="p-3 w-96 bg-white flex flex-row rounded-md border items-center w-96
      justify-center drop-shadow-md border-[#EEEEF2] text-center text-[#4A4672] font-bold">
      <GoogleLogo class="mr-4" /> {{ actionButtonLabel }} with Google
    </a>
    <a
      :href="githubAuthorizeUrl"
      class="mt-5 p-3 w-96 bg-white flex flex-row rounded-md border items-center w-96
      justify-center drop-shadow-md border-[#EEEEF2] text-center text-[#4A4672] font-bold">
      <GithubLogo class="mr-4" /> {{ actionButtonLabel }} with Github
    </a>
  </div>

</template>
