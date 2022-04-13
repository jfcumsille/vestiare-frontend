<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { toStoredRedirectionOrHome } from '@/services/redirections';
import { USER_LOGGED_IN, LOG_IN_SCREEN_VIEWED } from '@/constants/analyticsEvents';
import GenericInput from '@/components/forms/GenericInput.vue';
import Circle from '@/assets/svg/CircleBackground.vue';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import { AxiosError } from 'axios';
import Auth0Panel from './components/Auth0Panel.vue';

const router = useRouter();

const userStore = useUserStore();
const $tForms = useTranslation('forms.userData');
const $tLogIn = useTranslation('views.logIn');

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const isEmailResent = ref(false);

watch([email, password], () => { error.value = ''; isEmailResent.value = false; });

const logIn = async () => {
  loading.value = true;
  try {
    await userStore.logIn({ email: email.value, password: password.value });
    toStoredRedirectionOrHome(router);
  } catch (err) {
    const loginError = err as AxiosError;
    const codeError = loginError?.response?.data?.error?.code;
    if (codeError === 'fintoc_invalid_credentials') {
      error.value = $tLogIn('invalidCredentials');
    } else if (codeError === 'unconfirmed_email') {
      error.value = $tLogIn('unconfirmedEmail');
    }
  } finally {
    loading.value = false;
    window.analytics.track(USER_LOGGED_IN);
  }
};

const resendVerificationEmail = async () => {
  await userStore.sendConfirmationEmail(email.value);
  isEmailResent.value = true;
};

onMounted(async () => {
  window.analytics.page(LOG_IN_SCREEN_VIEWED);
});
</script>

<template>
  <div class="md:p-20 py-20 px-10 h-full w-full flex justify-center overflow-x-hidden">
    <div class="relative w-full max-w-md min-w-min">
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
      <div class="bg-white relative p-10 rounded-md border border-light-gray drop-shadow-md z-10">
        <div class="mb-5 font-medium text-2xl text-heading-color">
          {{ $tLogIn('title') }}
        </div>
        <Auth0Panel />
        <div class="my-7 h-px bg-divider-color" />
        <form
          class="flex flex-col justify-center"
          @submit.prevent="logIn"
        >
          <GenericInput
            v-model="email"
            type="email"
            :label="$tForms('labels.email')"
            :placeholder="$tForms('placeholders.email')"
            class="mb-3"
          />
          <GenericInput
            v-model="password"
            type="password"
            :right-text="$tLogIn('forgotPassword')"
            right-href="/reset"
            :label="$tForms('labels.password')"
            :placeholder="$tForms('placeholders.password')"
            class="mb-3"
          />
          <div
            v-if="error"
            class="flex flex-row rounded-md text-sm mb-1"
          >
            <WarningIcon
              class="mt-1 ml-1 min-w-fit text-danger-main"
              fill="currentColor"
              :size="14"
            />
            <div class="ml-2 text-danger-main font-light">
              {{ error }}
              <button
                v-if="error === $tLogIn('unconfirmedEmail')"
                class="text-primary-main font-normal disabled:text-disabled-color"
                :disabled="isEmailResent"
                @click.prevent="resendVerificationEmail"
              >
                {{ $tLogIn('resendVerificationEmail') }}
              </button>
            </div>
          </div>

          <button
            class="
                mt-4 items-center w-full px-6 py-2 text-sm font-medium text-center
                rounded text-white bg-primary-main hover:bg-primary-hover
                disabled:cursor-default h-12
                disabled:bg-gray-300
              "
            :disabled="loading"
            type="submit"
          >
            {{ $tLogIn('logIn') }}
          </button>
          <div class="mt-6 text-center text-body-color text-sm font-normal">
            {{ $tLogIn('dontHaveAccount') }}
            <a
              href="/signup"
              class="text-primary-main font-medium hover:text-primary-hover"
            >
              {{ $tLogIn('signUp') }}
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
