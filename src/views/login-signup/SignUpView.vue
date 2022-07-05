<script setup lang="ts">
import {
  ref, watch, onMounted, computed,
} from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { LOGIN_ROUTE } from '@/constants/router';
import { CONTACT, TERMS_AND_CONDITIONS, PRIVACY_POLICY } from '@/constants/urls';
import { DASHBOARD_ORIGIN, USER_SIGNED_UP, SIGN_UP_VIEWED } from '@/constants/analyticsEvents';
import { page, track } from '@/services/analytics';
import { toStoredRedirectionOrHome } from '@/services/redirections';
import { Nullable } from '@/interfaces/common';
import { ButtonType, SizeType, CountryName } from '@/interfaces/utilities/enums';
import { GenericFormPublicAPI } from '@/interfaces/components/forms/GenericForm';
import { isValidEmail } from '@/utils/email';
import GenericForm from '@/components/forms/GenericForm.vue';
import { countryNames } from '@/utils/country';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericButton from '@/components/GenericButton.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import BulletPoint from '@/assets/svg/BulletPoint.vue';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import Circle from '@/assets/svg/CircleBackground.vue';
import { AxiosError } from 'axios';
import Auth0Panel from './components/Auth0Panel.vue';

const router = useRouter();

const userStore = useUserStore();
const $tForms = useTranslation('forms.userData');
const $tSignUp = useTranslation('views.signUp');

const name = ref('');
const lastName = ref('');
const company = ref('');
const selectedCountry = ref(CountryName.Chile);
const selectCountry = (value: string) => {
  selectedCountry.value = value;
};

const email = ref('');
const password = ref('');
const loading = ref(false);
const completed = ref(false);
const warningTitle = ref('');

const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const form = ref<Nullable<GenericFormPublicAPI>>(null);

watch([email, password, name, lastName], () => { warningTitle.value = ''; });
const isChecked = ref(false);
const isSignUpEnabled = computed(() => (
  isChecked.value && form.value?.valid
));

const handleSignUpError = (error: AxiosError) => {
  if (error.code === 'unauthorized') {
    warningTitle.value = $tSignUp('unauthorizedWarning');
  } else {
    warningTitle.value = $tSignUp('invalidSignupWarning');
  }
};

const signUp = async () => {
  if (isChecked.value && form.value?.valid) {
    loading.value = true;
    try {
      await userStore.manualSignup({
        email: email.value,
        password: password.value,
        name: name.value,
        lastName: lastName.value,
        country: selectedCountry.value,
        company: company.value,
      });
      completed.value = true;
      track(USER_SIGNED_UP);
    } catch (err) {
      handleSignUpError(err as AxiosError);
      completed.value = false;
    } finally {
      loading.value = false;
    }
  }
};

const goToLogIn = () => {
  toStoredRedirectionOrHome(router);
};

onMounted(() => {
  page(SIGN_UP_VIEWED, {
    origin: DASHBOARD_ORIGIN,
  });
});

const nameValidations = [(value:string) => !!value.trim() || $tForms('hints.name') as string];
const lastNameValidations = [(value:string) => !!value.trim() || $tForms('hints.lastname') as string];
const emailValidations = [(value: string) => isValidEmail(value) || $tForms('hints.email') as string];

const validatePassword = (val: string) => {
  const value = val.trim();
  const lengthValidation = value.length >= 8;
  const lowerCase = Number(!!value.match(/[a-z]/g));
  const upperCase = Number(!!value.match(/[A-Z]/g));
  const number = Number(!!value.match(/[0-9]/g));
  const speacialChar = Number(!!value.match(/[(!@#$%^&*).,:;]/g));
  const chars = lowerCase + upperCase + number + speacialChar;
  const validPassword = lengthValidation && (chars >= 3);
  return validPassword;
};
const isValidPassword = computed(() => validatePassword(password.value));
const showPasswordRules = computed(() => !validatePassword(password.value) && password.value !== '');
const passwordValidations = [(value: string) => validatePassword(value) || $tForms('hints.password') as string];
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
      <div class="relative w-full max-w-sm min-w-max">
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
          class="bg-white relative p-11.5 rounded-lg border
          border-light-gray drop-shadow-md z-10"
        >
          <div class="mb-5 font-medium text-2xl text-heading-color">
            {{ $tSignUp('title') }}
          </div>

          <Auth0Panel is-signup />

          <div class="my-7 h-px bg-divider-color" />

          <GenericForm
            ref="form"
            class="grow flex flex-col justify-center space-y-5"
          >
            <div
              v-if="!!warningTitle"
              class="flex flex-row bg-danger-surface p-2 rounded-lg mb-2"
            >
              <WarningIcon
                class="ml-1 text-danger-main"
                fill="currentColor"
              />
              <div class="ml-2 text-body-color text-sm">
                <p class="font-bold">
                  {{ warningTitle }}
                </p>
                <p>{{ $tSignUp('warningSubtitle') }}</p>
              </div>
            </div>
            <div class="flex flex-col lg:flex-row lg:space-x-2 space-y-5 lg:space-y-0">
              <GenericInput
                v-model="name"
                :size="SizeType.Large"
                :label="$tForms('labels.name')"
                :placeholder="$tForms('placeholders.name')"
                :validations="nameValidations"
              />
              <GenericInput
                v-model="lastName"
                :size="SizeType.Large"
                :label="$tForms('labels.lastName')"
                :placeholder="$tForms('placeholders.lastName')"
                :validations="lastNameValidations"
              />
            </div>
            <div class="flex flex-col lg:flex-row lg:space-x-2 space-y-5 lg:space-y-0">
              <GenericInput
                v-model="company"
                :size="SizeType.Large"
                :label="$tForms('labels.company')"
                :placeholder="$tForms('placeholders.company')"
                class="w-full"
              />
              <div class="w-full">
                <GenericDropDown
                  class="mb-4"
                  :label="$tSignUp('country')"
                  :size="SizeType.Large"
                  :selected="selectedCountry"
                  :options="countryNames"
                  capitalize-options
                  @select="selectCountry"
                />
              </div>
            </div>
            <div class="space-y-5">
              <GenericInput
                v-model="email"
                :size="SizeType.Large"
                :label="$tForms('labels.email')"
                :placeholder="$tForms('placeholders.email')"
                :validations="emailValidations"
              />
              <div class="space-y-2">
                <GenericInput
                  v-model="password"
                  :size="SizeType.Large"
                  :type="showPassword ? '': 'password'"
                  :label="$tForms('labels.password')"
                  :placeholder="$tForms('placeholders.password')"
                  autocomplete="off"
                  :validations="passwordValidations"
                  bold-hint
                  :right-icon-name="showPassword ? 'eye-closed' : 'eye'"
                  :hint="isValidPassword ? $tForms('hints.validPassword') : undefined"
                  @click-right-icon="togglePassword"
                />
                <div
                  v-if="showPasswordRules"
                  class="ml-1 text-xs text-body-color pl-6 max-w-80"
                >
                  {{ $tSignUp('passwordHintLength') }}
                  <ul class="pl-4 list-disc">
                    <li>{{ $tSignUp('passwordHintLowerCase') }}</li>
                    <li>{{ $tSignUp('passwordHintUpperCase') }}</li>
                    <li>{{ $tSignUp('passwordHintNumber') }}</li>
                    <li>{{ $tSignUp('passwordHintSpecialChar') }}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="block">
              <div>
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
                :type="ButtonType.Primary"
                :text="$tSignUp('signUp')"
                :loading="loading"
                :disabled="!isSignUpEnabled"
                full-width
                @click="signUp"
              />
            </div>

            <div
              class="mt-6 text-center text-body-color text-sm font-normal"
            >
              {{ $tSignUp('alreadyHaveAccount') }}
              <a
                :href="LOGIN_ROUTE"
                class="text-primary-main font-medium"
              >
                {{ $tSignUp('logIn') }}
              </a>
            </div>
          </GenericForm>
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
        <div class="flex flex-col min-w-fit max-w-sm">
          <div class="text-lg text-heading-color z-10">
            {{ $tSignUp('infoTitle') }}
          </div>
          <div class="z-10">
            <div class="mt-4 flex flex-row justify-start">
              <BulletPoint class="w-3 mt-3 max-w-2.5 min-w-2.5" />
              <div class="ml-3 text-base text-body-color font-normal">
                {{ $tSignUp('infoPoint1') }}
              </div>
            </div>
            <div class="mt-3 flex flex-row justify-start">
              <BulletPoint class="w-3 mt-3 max-w-2.5 min-w-2.5" />
              <div class="ml-3 text-base text-body-color font-normal">
                {{ $tSignUp('infoPoint2') }}
              </div>
            </div>
            <div class="mt-3 flex flex-row justify-start">
              <BulletPoint class="w-3 mt-3 max-w-2.5 min-w-2.5" />
              <div class="ml-3 text-base text-body-color font-normal">
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
          rounded-lg border border-light-gray drop-shadow-md z-10 max-w-xl"
        >
          <div class="font-medium text-2xl text-heading-color">
            {{ $tSignUp('verifyEmail') }}
          </div>
          <div class="mt-4 text-body-color font-normal">
            {{ name }},
            {{ $tSignUp('thankYou') }}
            <span class="font-normal">
              {{ email }}
            </span>
            {{ $tSignUp('verifyAccount') }}
          </div>
          <GenericButton
            class="mt-8"
            :type="ButtonType.Primary"
            :text="$tSignUp('logIn')"
            :disabled="loading"
            @click="goToLogIn"
          />
        </div>
      </div>
    </div>
  </div>
</template>
