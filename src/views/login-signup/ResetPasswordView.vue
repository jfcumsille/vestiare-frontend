<script setup lang="ts">
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import GenericInput from '@/components/GenericInput.vue';
import Circle from '@/components/images/CircleBackground.vue';

const userStore = useUserStore();
const $tForms = useTranslation('forms.userData');
const $tResetPassword = useTranslation('views.resetPassword.texts');

const email = ref('');
const error = ref(false);
const loading = ref(false);
const completed = ref(false);
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
  window.location.href = '/login';
};
</script>

<template>
  <div class="md:p-20 py-20 px-10 relative justify-center flex">
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
          {{ $tResetPassword('title') }}
        </div>
        <div
          v-if="!completed"
          class="mt-4 mb-6 text-body-txt-color font-light"
        >
          {{ $tResetPassword('subtitle') }}
        </div>
        <div
          v-if="completed"
          class="text-left font-light mt-4 mb-6 text-body-txt-color"
        >
          {{ $tResetPassword('checkYourEmail') }}
          <span class="font-medium">{{ email }}</span>
          {{ $tResetPassword('subtitleCompleted') }}
          <button
            class="text-primary-main font-normal disabled:text-disable-txt-color"
            :disabled="isEmailResent"
            @click="resendResetPasswordEmail"
          >
            {{ $tResetPassword('resendEmail') }}
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
          {{ $tResetPassword('continue') }}
        </button>
        <button
          v-if="completed"
          class="mt-4 bg-primary-main text-center text-white font-semibold py-3 rounded"
          :disabled="loading"
          @click="logIn"
        >
          {{ $tResetPassword('logIn') }}
        </button>
        <a
          v-if="!completed"
          href="/login"
          class="mt-6 text-primary-main text-center font-medium text-sm"
        >
          {{ $tResetPassword('backToLogin') }}
        </a>
      </div>
    </div>
  </div>
</template>
