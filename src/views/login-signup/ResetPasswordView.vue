<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useTranslation } from '@/locales';
import { page, track } from '@/services/analytics';
import { DASHBOARD_ORIGIN, EMAIL_SENT, RESET_PASSWORD_VIEWED } from '@/constants/analyticsEvents';
import { LOGIN_ROUTE } from '@/constants/router';
import { ButtonType, SizeType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import Circle from '@/assets/svg/CircleBackground.vue';

const userStore = useUserStore();
const router = useRouter();
const $tForms = useTranslation('forms.userData');
const $tResetPassword = useTranslation('views.resetPassword');

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
    track(EMAIL_SENT, { type: 'reset_password' });
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
    track(EMAIL_SENT, { type: 'resend_reset_password' });
  } catch {
    error.value = true;
  }
};

const logIn = () => {
  router.push({ path: LOGIN_ROUTE });
};

onMounted(() => {
  page(RESET_PASSWORD_VIEWED, {
    origin: DASHBOARD_ORIGIN,
  });
});
</script>

<template>
  <div
    data-test="reset-password-view"
    class="md:p-20 py-20 px-10 relative justify-center flex"
  >
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
        rounded-lg border border-light-gray drop-shadow-md z-10"
      >
        <div class="font-medium text-2xl text-heading-color">
          {{ $tResetPassword('title') }}
        </div>
        <div
          v-if="!completed"
          class="mt-4 mb-6 text-body-color font-normal"
        >
          {{ $tResetPassword('subtitle') }}
        </div>
        <div
          v-if="completed"
          class="text-left font-normal mt-4 mb-6 text-body-color"
        >
          {{ $tResetPassword('checkYourEmail') }}
          <span class="font-medium">{{ email }}</span>
          {{ $tResetPassword('subtitleCompleted') }}
          <GenericButton
            data-test="resend-reset-pass-button"
            :type="ButtonType.Text"
            :size="SizeType.Inline"
            :text="$tResetPassword('resendEmail')"
            :disabled="isEmailResent"
            @click="resendResetPasswordEmail"
          />
        </div>
        <GenericInput
          v-if="!completed"
          v-model="email"
          :size="SizeType.Large"
          :label="$tForms('labels.email')"
          :placeholder="$tForms('placeholders.email')"
        />
        <GenericButton
          v-if="!completed"
          data-test="reset-pass-button"
          class="mt-4"
          :type="ButtonType.Primary"
          :text="$tResetPassword('continue')"
          :disabled="loading"
          @click="resetPassword"
        />
        <GenericButton
          v-if="completed"
          class="mt-4"
          :type="ButtonType.Primary"
          :text="$tResetPassword('logIn')"
          :disabled="loading"
          @click="logIn"
        />
        <a
          v-if="!completed"
          :href="LOGIN_ROUTE"
          class="mt-6 text-primary-main text-center font-medium text-sm hover:text-primary-hover"
        >
          {{ $tResetPassword('backToLogin') }}
        </a>
      </div>
    </div>
  </div>
</template>
