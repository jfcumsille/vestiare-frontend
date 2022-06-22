<script setup lang="ts">
import { onMounted } from 'vue';
import { page } from '@/services/analytics';
import { popValidLoginMethod, popSelectedLoginMethod } from '@/services/loginMethods';
import { useTranslation } from '@/locales';
import { DASHBOARD_ORIGIN, LOG_IN_VIEWED } from '@/constants/analyticsEvents';
import { SIGNUP_ROUTE } from '@/constants/router';
import Circle from '@/assets/svg/CircleBackground.vue';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import Auth0Panel from './components/Auth0Panel.vue';

const $tLogIn = useTranslation('views.logIn');

onMounted(() => {
  page(LOG_IN_VIEWED, {
    origin: DASHBOARD_ORIGIN,
  });
});

const validMethod = popValidLoginMethod();
const selectedMethod = popSelectedLoginMethod();
const showInvalidLoginMethodError = !!validMethod;
</script>

<template>
  <div
    data-test="login-view"
    class="md:p-20 py-20 px-10 h-full w-full flex justify-center overflow-x-hidden"
  >
    <div class="relative w-full max-w-sm min-w-min">
      <Circle
        class="w-56 absolute top-0 right-0 -mr-20 -mt-10 z-0"
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
      <div class="bg-white relative p-11.5 rounded-lg border border-light-gray drop-shadow-md z-10">
        <div class="mb-5 font-medium text-2xl text-heading-color">
          {{ $tLogIn('title') }}
        </div>
        <div
          v-if="showInvalidLoginMethodError"
          class="flex flex-row bg-danger-surface p-2 rounded-lg mb-2"
        >
          <WarningIcon
            class="mt-1 ml-1 text-danger-main"
            fill="currentColor"
          />
          <div class="ml-2 text-body-color text-sm">
            <p class="font-bold">
              {{ $tLogIn('invalidMethodWarning', { validMethod }) }}
            </p>
            <p v-if="selectedMethod">
              {{ $tLogIn(
                'invalidMethodWarningSub',
                { invalidMethod: selectedMethod, validMethod }
              ) }}
            </p>
          </div>
        </div>
        <Auth0Panel />
        <div class="mt-6 text-center text-body-color text-sm font-normal ">
          {{ $tLogIn('dontHaveAccount') }}
          <a
            :href="SIGNUP_ROUTE"
            class="text-primary-main hover:text-primary-hover"
          >
            {{ $tLogIn('signUp') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
