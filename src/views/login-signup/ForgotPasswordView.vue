<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { REDIRECT_QUERY_KEY } from '@/constants/router';
import GenericInput from '@/components/GenericInput.vue';
import Circle from '@/components/images/CircleBackground.vue';

const userStore = useUserStore();
const $tForms = useTranslation('forms.userData');
const $tForgotPassword = useTranslation('views.forgotPassword.texts');

const route = useRoute();
const router = useRouter();

const email = ref('');
const error = ref(false);
const loading = ref(false);
const completed = ref(true);
const isEmailResent = ref(false);

watch(email, () => { error.value = false; });

const resetPassword = async () => {
  loading.value = true;
  try {
    await userStore.sendResetPasswordEmail(email.value);
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
    completed.value = true;
  }
};

const resendResetPasswordEmail = async () => {
  try {
    await userStore.sendResetPasswordEmail(email.value);
    isEmailResent.value = true;
  } catch {
    error.value = true;
  }
};

const logIn = () => {
  router.push({
    path: (route.query[REDIRECT_QUERY_KEY] as string) || '/',
  });
};
</script>

<template>
  <div class="relative justify-center flex p-20">
    <div class="relative">
      <Circle
        class="w-72 absolute top-0 left-0 -ml-28 -mt-8 z-0"
        fill="#F2F4FF"
        opacity="0.5"
      />
      <Circle
        class="w-40 absolute top-0 left-0 -ml-5 -mt-14 z-0"
        fill="#D7DDFF"
        opacity="0.5"
      />
      <Circle
        class="w-52 absolute bottom-0 right-0 -mr-16 -mb-16 z-0"
        fill="#F2F4FF"
        opacity="0.75"
      />
      <div
        class="flex flex-col bg-white px-20 py-16 relative max-w-xl
        rounded-md border border-bg-gray-200 drop-shadow-md z-10"
      >
        <div class="font-medium text-2xl text-heading-txt-color">
          {{ $tForgotPassword('title') }}
        </div>
        <div
          v-if="!completed"
          class="mt-4 mb-6 text-body-txt-color font-light"
        >
          {{ $tForgotPassword('subtitle') }}
        </div>
        <div
          v-if="completed"
          class="text-left font-light mt-4 mb-6 text-body-txt-color"
        >
          {{ $tForgotPassword('checkYourEmail') }}
          <span class="font-medium">{{ email }}</span>
          {{ $tForgotPassword('subtitleCompleted') }}
          <button
            class="text-primary-main font-normal disabled:text-disable-txt-color"
            :disabled="isEmailResent"
            @click="resendResetPasswordEmail"
          >
            {{ $tForgotPassword('resendEmail') }}
          </button>
        </div>
        <GenericInput
          v-if="!completed"
          v-model="email"
          :label="$tForms('labels.email')"
          :placeholder="$tForms('placeholders.email')"
        />
        <button
          v-if="!completed"
          class="mt-4 bg-primary-main text-center text-white font-semibold py-3 rounded"
          :disabled="loading"
          @click="resetPassword"
        >
          {{ $tForgotPassword('continue') }}
        </button>
        <button
          v-if="completed"
          class="mt-4 bg-primary-main text-center text-white font-semibold py-3 rounded"
          :disabled="loading"
          @click="logIn"
        >
          {{ $tForgotPassword('logIn') }}
        </button>
        <a
          v-if="!completed"
          href="/login"
          class="mt-6 text-primary-main text-center font-medium text-sm"
        >
          {{ $tForgotPassword('backToLogin') }}
        </a>
      </div>
    </div>
  </div>
</template>
