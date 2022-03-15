<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { REDIRECT_QUERY_KEY } from '@/constants/router';
import GenericInput from '@/components/GenericInput.vue';
import Circle from '@/components/images/CircleBackground.vue';
import Dots from '@/components/images/DotsGrid.vue';
import Auth0Panel from './components/Auth0Panel.vue';

const $store = useUserStore();
const $tForms = useTranslation('forms.userData');
const $tLogIn = useTranslation('views.logIn.texts');

const route = useRoute();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref(false);
const loading = ref(false);

watch([email, password], () => { error.value = false; });

const logIn = async () => {
  loading.value = true;
  try {
    await $store.logIn({ email: email.value, password: password.value });
    router.push({
      path: (route.query[REDIRECT_QUERY_KEY] as string) || '/',
    });
  } catch (err) {
    error.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-20 h-full w-full flex justify-center">
    <div class="relative">
      <Circle class="h-72 w-72 absolute bottom-0 left-0 -ml-24 z-0 -mb-16" />
      <Dots class="absolute top-0 right-0 -mr-28 -mt-12 z-0" />
      <div class="bg-white relative p-10 rounded-md border border-bg-gray-200 drop-shadow-md z-10">
        <div class="mb-5 font-medium text-2xl text-txt-heading">
          {{ $tLogIn('title') }}
        </div>
        <Auth0Panel />
        <div class="my-7 h-px bg-border-bg-gray-300" />
        <div class="px-4 max-w-screen-md flex flex-col justify-center">
          <GenericInput
            v-model="email"
            :label="$tForms('labels.email')"
            :placeholder="$tForms('placeholders.email')"
            class="mb-3"
          />
          <GenericInput
            v-model="password"
            type="password"
            :right-text="$tLogIn('forgotPassword')"
            right-h-ref="/forgotpassword"
            :label="$tForms('labels.password')"
            :placeholder="$tForms('placeholders.password')"
            class="mb-3"
          />

          <div>
            <button
              class="
                mt-4 items-center w-full px-6 py-2 text-sm font-medium text-center
                rounded text-white bg-primary-main hover:bg-primary-main-hover
                disabled:cursor-default h-12
                disabled:bg-gray-300
              "
              :disabled="loading"
              @click="logIn"
            >
              {{ $tLogIn('logIn') }}
            </button>
            <span
              v-if="error"
              class="ml-4 font-black text-xl text-red-600"
            >
              !
            </span>
          </div>
          <div class="mt-6 text-center text-txt-body text-sm font-normal ">
            {{ $tLogIn('dontHaveAccount') }}
            <a
              href="/signup"
              class="text-primary-main font-medium"
            >
              {{ $tLogIn('signUp') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
