<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { toStoredRedirectionOrHome } from '@/services/redirections';
import GenericInput from '@/components/GenericInput.vue';
import Circle from '@/components/images/CircleBackground.vue';
import Auth0Panel from './components/Auth0Panel.vue';

const router = useRouter();

const userStore = useUserStore();
const $tForms = useTranslation('forms.userData');
const $tLogIn = useTranslation('views.logIn');

const email = ref('');
const password = ref('');
const error = ref(false);
const loading = ref(false);

watch([email, password], () => { error.value = false; });

const logIn = async () => {
  loading.value = true;
  try {
    await userStore.logIn({ email: email.value, password: password.value });
    toStoredRedirectionOrHome(router);
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="md:p-20 py-20 px-10 h-full w-full flex justify-center overflow-x-hidden">
    <div class="relative w-full max-w-md min-w-max">
      <Circle
        class="w-72 absolute top-0 right-0 -mr-28 -mt-10 z-0"
        fill="#F2F4FF"
        opacity="0.5"
      />
      <Circle
        class="w-40 absolute top-0 right-0 -mr-6 -mt-14 z-0"
        fill="#D7DDFF"
        opacity="0.5"
      />
      <Circle
        class="h-64 w-64 absolute bottom-0 left-0 -ml-20 z-0 -mb-16"
        fill="#F2F4FF"
        opacity="0.75"
      />
      <div class="bg-white relative p-10 rounded-md border border-bg-gray-200 drop-shadow-md z-10">
        <div class="mb-5 font-medium text-2xl text-heading-txt-color">
          {{ $tLogIn('title') }}
        </div>
        <Auth0Panel />
        <div class="my-7 h-px bg-gray-300" />
        <div class="flex flex-col justify-center">
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
            right-h-ref="/reset"
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
          <div class="mt-6 text-center text-body-txt-color text-sm font-normal ">
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
