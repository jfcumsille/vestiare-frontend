<script setup lang="ts">
import {
  ref, watch, computed, onMounted,
} from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { CONTACT, TERMS_AND_CONDITIONS, PRIVACY_POLICY } from '@/constants/urls';
import { USER_SIGNED_UP, EMAIL_SENT, SIGN_UP_VIEWED } from '@/constants/analyticsEvents';
import { page, track } from '@/services/analytics';
import { toStoredRedirectionOrHome } from '@/services/redirections';
import { ButtonType, SizeType } from '@/interfaces/utilities/enums';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericButton from '@/components/GenericButton.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import BulletPoint from '@/assets/svg/BulletPoint.vue';
import Circle from '@/assets/svg/CircleBackground.vue';
import Auth0Panel from './components/Auth0Panel.vue';

const router = useRouter();

const $store = useUserStore();
const $tForms = useTranslation('forms.userData');
const $tSignUp = useTranslation('views.signUp');

const name = ref('');
const lastName = ref('');
const company = ref('');
const country = ref('Chile');
const countryOptions = ['Chile', 'México'];
const selectCountryFilter = (value: string) => {
  country.value = value;
};
const email = ref('');
const password = ref('');
const error = ref(false);
const loading = ref(false);
const completed = ref(false);

watch([email, password], () => { error.value = false; });
const isChecked = ref(false);
const isSignUpEnabled = computed(() => (
  isChecked.value && name.value && lastName.value && email.value && password.value
));
const isEmailResent = ref(false);

const signUp = async () => {
  loading.value = true;
  try {
    await $store.signUp({
      email: email.value,
      password: password.value,
      name: name.value,
      lastName: lastName.value,
      country: country.value,
      company: company.value,
    });
    completed.value = true;
    track(USER_SIGNED_UP);
  } catch {
    error.value = true;
    completed.value = false;
  } finally {
    loading.value = false;
  }
};

const resendVerificationEmail = async () => {
  try {
    await $store.sendConfirmationEmail(email.value);
    isEmailResent.value = true;
    track(EMAIL_SENT, { type: 'resend_verification_email' });
  } catch {
    error.value = true;
  }
};

const logIn = () => {
  toStoredRedirectionOrHome(router);
};

onMounted(() => {
  page(SIGN_UP_VIEWED);
});
</script>

<template>
  <div
    data-test="sign-up-view"
    class="h-full w-full flex justify-center overflow-x-hidden"
  >
    <div
      v-if="!completed"
      class="relative flex flex-col lg:flex-row items-start justify-center px-20 pb-20 pt-12"
    >
      <div class="relative w-full max-w-md min-w-max">
        <Circle
          class="w-72 absolute top-0 left-0 -ml-28 -mt-8 z-0"
          fill="#F2F4FF"
          opacity="0.5"
        />
        <Circle
          class="w-40 absolute top-0 left-0 -ml-5 -mt-12 z-0"
          fill="#D7DDFF"
          opacity="0.5"
        />
        <div
          class="bg-white relative p-10 rounded-md border
          border-light-gray drop-shadow-md z-10"
        >
          <div class="mb-5 font-medium text-2xl text-heading-color">
            {{ $tSignUp('title') }}
          </div>

          <Auth0Panel is-signup />

          <div class="my-7 h-px bg-divider-color" />

          <div class="grow flex flex-col justify-center">
            <div class="flex flex-col lg:flex-row lg:mb-4">
              <GenericInput
                v-model="name"
                :label="$tForms('labels.name')"
                :placeholder="$tForms('placeholders.name')"
                class="mr-3 w-full mb-2 lg:mb-0"
              />
              <GenericInput
                v-model="lastName"
                :label="$tForms('labels.lastName')"
                :placeholder="$tForms('placeholders.lastName')"
                class="w-full mb-2 lg:mb-0"
              />
            </div>
            <div class="flex flex-col lg:flex-row lg:mb-4">
              <GenericInput
                v-model="company"
                :label="$tForms('labels.company')"
                :placeholder="$tForms('placeholders.company')"
                class="mr-3 w-full mb-2 lg:mb-0"
              />

              <div class="block w-full mb-4 lg:mb-0">
                <div class="block mb-1 text-sm font-medium text-secondary-color">
                  {{ $tSignUp('country') }}
                </div>
                <GenericDropDown
                  :selected="country"
                  :options="countryOptions"
                  :is-width-full="true"
                  @select="selectCountryFilter"
                />
              </div>
            </div>
            <GenericInput
              v-model="email"
              :label="$tForms('labels.email')"
              :placeholder="$tForms('placeholders.email')"
              class="mb-2"
            />
            <GenericInput
              v-model="password"
              type="password"
              :label="$tForms('labels.password')"
              :placeholder="$tForms('placeholders.password')"
            />

            <div class="block">
              <div class="mt-4">
                <label class="inline-flex items-center">
                  <input
                    v-model="isChecked"
                    data-test="terms-checkbox"
                    type="checkbox"
                    class="w-4 h-4 accent-primary-main hover:accent-primary-main"
                  >
                  <label
                    class="
                      ml-2 form-check-label inline-block
                      text-body-color text-sm font-normal
                    "
                    for="flexCheckDefault"
                  >
                    {{ $tSignUp('accept') }}
                    <a
                      class="text-primary-main"
                      :href="TERMS_AND_CONDITIONS"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ $tSignUp('terms') }}
                    </a>
                    {{ $tSignUp('and') }}
                    <a
                      class="text-primary-main"
                      :href="PRIVACY_POLICY"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ $tSignUp('privacyPolicy') }}
                    </a>
                  </label>
                </label>
              </div>
            </div>

            <div>
              <GenericButton
                data-test="sign-up-button"
                class="mt-4"
                :type="ButtonType.Primary"
                :is-width-full="true"
                :text="$tSignUp('signUp')"
                :loading="loading"
                :disabled="!isSignUpEnabled"
                @click="signUp"
              />
              <span
                v-if="error"
                class="ml-4 font-black text-xl text-danger-main"
              >
                !
              </span>
            </div>

            <div
              class="mt-6 text-center text-body-color text-sm font-normal"
            >
              {{ $tSignUp('alreadyHaveAccount') }}
              <a
                href="/login"
                class="text-primary-main font-medium"
              >
                {{ $tSignUp('logIn') }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="relative mt-16 mb-20 lg:ml-20 lg:mt-5">
        <Circle
          class="w-48 absolute top-0 right-0 mr-2 mt-40 z-2"
          fill="#D7DDFF"
          opacity="0.3"
        />
        <Circle
          class="w-72 absolute top-0 right-0 -mr-28 -mt-2 z-1"
          fill="#F2F4FF"
          opacity="0.5"
        />
        <div class="flex flex-col min-w-fit max-w-md">
          <div class="text-lg text-heading-color z-10">
            {{ $tSignUp('infoTitle') }}
          </div>
          <div class="z-10">
            <div class="mt-4 flex flex-row justify-start">
              <BulletPoint class="w-3 mt-3 max-w-10px min-w-10px" />
              <div class="ml-3 text-base text-body-color font-light">
                {{ $tSignUp('infoPoint1') }}
              </div>
            </div>
            <div class="mt-3 flex flex-row justify-start">
              <BulletPoint class="w-3 mt-3 max-w-10px min-w-10px" />
              <div class="ml-3 text-base text-body-color font-light">
                {{ $tSignUp('infoPoint2') }}
              </div>
            </div>
            <div class="mt-3 flex flex-row justify-start">
              <BulletPoint class="w-3 mt-3 max-w-10px min-w-10px" />
              <div class="ml-3 text-base text-body-color font-light">
                {{ $tSignUp('infoPoint3') }}
              </div>
            </div>
          </div>
          <a
            class="mt-4 text-primary-main font-medium z-10"
            :href="CONTACT"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ $tSignUp('contactSales') }}
          </a>
        </div>
      </div>
    </div>
    <div
      v-if="completed"
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
          class="flex flex-col bg-white px-20 py-16 relative
          rounded-md border border-light-gray drop-shadow-md z-10 max-w-xl"
        >
          <div class="font-medium text-2xl text-heading-color">
            {{ $tSignUp('verifyEmail') }}
          </div>
          <div class="mt-4 text-body-color font-light">
            {{ name }},
            {{ $tSignUp('thankYou') }}
            <span class="font-normal">
              {{ email }}
            </span>
            {{ $tSignUp('verifyAccount') }}
          </div>
          <div class="text-center font-light mt-4 text-body-color">
            {{ $tSignUp('didntReceive') }}
            <GenericButton
              data-test="resend-verify-email-button"
              :type="ButtonType.Text"
              :size="SizeType.Inline"
              :text="$tSignUp('resendEmail')"
              :disabled="isEmailResent"
              @click="resendVerificationEmail"
            />
          </div>
          <GenericButton
            class="mt-8"
            :type="ButtonType.Primary"
            :text="$tSignUp('logIn')"
            :disabled="loading"
            @click="logIn"
          />
        </div>
      </div>
    </div>
  </div>
</template>