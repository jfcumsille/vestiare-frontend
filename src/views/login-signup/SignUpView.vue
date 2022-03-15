<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { REDIRECT_QUERY_KEY } from '@/constants/router';
import { TERMS_AND_CONDITIONS, PRIVACY_POLICY, CONTACT } from '@/constants/texts';
import GenericInput from '@/components/GenericInput.vue';
import Spinner from '@/components/LoadingSpinner.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import BulletPoint from '@/components/images/BulletPoint.vue';
import Circle from '@/components/images/CircleBackground.vue';
import Dots from '@/components/images/DotsGrid.vue';
import Auth0Panel from './components/Auth0Panel.vue';

const $store = useUserStore();
const $route = useRoute();
const $router = useRouter();
const $tForms = useTranslation('forms.userData');
const $tSignUp = useTranslation('views.signUp.texts');

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
      token: '',
      name: name.value,
      lastName: lastName.value,
      country: country.value,
      company: company.value,
    });
    completed.value = true;
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
  } catch {
    error.value = true;
  }
};

const logIn = () => {
  $router.push({
    path: ($route.query[REDIRECT_QUERY_KEY] as string) || '/',
  });
};

</script>

<template>
  <div class="h-full w-full">
    <div
      v-if="!completed"
      class="relative flex flex-row justify-center p-20 z-10"
    >
      <div class="relative">
        <Circle class="absolute top-0 left-0 -ml-28 -mt-12 z-0" />
        <Dots class="absolute bottom-0 right-0 -mr-16 -mb-12 z-0" />
        <div
          class="bg-white relative p-10 rounded-md border
          border-bg-gray-200 drop-shadow-md z-10"
        >
          <div class="mb-5 font-medium text-2xl text-heading-txt-color">
            {{ $tSignUp('title') }}
          </div>

          <Auth0Panel is-signup />

          <div class="my-7 h-px bg-border-bg-gray-300" />

          <div class="grow w-full flex flex-col justify-center">
            <div class="flex flex-row mb-4 ">
              <GenericInput
                v-model="name"
                :label="$tForms('labels.name')"
                :placeholder="$tForms('placeholders.name')"
                class="mr-3 w-full"
              />
              <GenericInput
                v-model="lastName"
                :label="$tForms('labels.lastName')"
                :placeholder="$tForms('placeholders.lastName')"
                class="w-full"
              />
            </div>
            <div class="flex flex-row items-end mb-4 ">
              <GenericInput
                v-model="company"
                :label="$tForms('labels.company')"
                :placeholder="$tForms('placeholders.company')"
                class="mr-3 w-full"
              />

              <div class="block w-full">
                <div class="block mb-1 text-sm font-medium text-sec-cap-txt-color">
                  Country
                </div>
                <GenericDropDown
                  :name="$tSignUp('country')"
                  :selected="country"
                  :options="countryOptions"
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
                <label class="inline-flex items-center hover:bg-clear">
                  <input
                    v-model="isChecked"
                    type="checkbox"
                    class="w-4 h-4 accent-primary-main hover:accent-primary-main"
                  >
                  <label
                    class="
                      ml-2 form-check-label inline-block
                      text-body-txt-color text-sm font-normal
                    "
                    for="flexCheckDefault"
                  >
                    {{ $tSignUp('accept') }}
                    <a
                      class="text-primary-main"
                      :href="TERMS_AND_CONDITIONS"
                    >
                      {{ $tSignUp('terms') }}
                    </a>
                    {{ $tSignUp('and') }}
                    <a
                      class="text-primary-main"
                      :href="PRIVACY_POLICY"
                    >
                      {{ $tSignUp('privacyPolicy') }}
                    </a>
                  </label>
                </label>
              </div>
            </div>

            <div>
              <button
                class="
                  flex mt-4 items-center w-full px-6 py-2 text-sm font-medium text-center
                  rounded text-white bg-primary-main hover:bg-primary-main-hover
                  disabled:cursor-default disabled:bg-gray-300
                  justify-center h-12
                "
                :disabled="!isSignUpEnabled"
                @click="signUp"
              >
                <Spinner
                  v-if="loading"
                />
                <span
                  v-if="!loading"
                > {{ $tSignUp('signUp') }} </span>
              </button>
              <span
                v-if="error"
                class="ml-4 font-black text-xl text-red-600"
              >
                !
              </span>
            </div>

            <div
              class="mt-6 text-center text-body-txt-color text-sm font-normal"
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

      <div class="relative">
        <Dots class="absolute top-0 right-0 -mr-10 -mt-6 z-0" />
        <Circle class="h-32 w-32 absolute top-0 left-0 ml-5 mt-48 z-0" />
        <div class="ml-20 flex flex-col min-w-400px max-w-400px z-10">
          <div class="text-lg text-heading-txt-color">
            {{ $tSignUp('infoTitle') }}
          </div>
          <div class="z-10">
            <div class="mt-4 flex flex-row justify-start">
              <BulletPoint class="w-3 mt-3 max-w-10px min-w-10px" />
              <div class="ml-3 text-base text-body-txt-color font-light">
                {{ $tSignUp('infoPoint1') }}
              </div>
            </div>
            <div class="mt-3 flex flex-row justify-start">
              <BulletPoint class="w-3 mt-3 max-w-10px min-w-10px" />
              <div class="ml-3 text-base text-body-txt-color font-light">
                {{ $tSignUp('infoPoint2') }}
              </div>
            </div>
            <div class="mt-3 flex flex-row justify-start">
              <BulletPoint class="w-3 mt-3 max-w-10px min-w-10px" />
              <div class="ml-3 text-base text-body-txt-color font-light">
                {{ $tSignUp('infoPoint3') }}
              </div>
            </div>
          </div>
          <a
            class="mt-4 text-primary-main font-medium z-10"
            :href="CONTACT"
          >
            {{ $tSignUp('contactSales') }}
          </a>
        </div>
      </div>
    </div>
    <div
      v-if="completed"
      class="relative justify-center flex p-20"
    >
      <div class="relative">
        <Dots class="absolute top-0 left-0 -ml-20 -mt-12 z-0" />
        <Circle class="h-64 w-72 absolute bottom-0 right-0 -mr-24 -mb-16 z-0" />
        <div
          class="flex flex-col bg-white px-20 py-16 relative
          rounded-md border border-bg-gray-200 drop-shadow-md z-10"
        >
          <div class="font-medium text-3xl text-heading-txt-color">
            {{ $tSignUp('verifyEmail') }}
          </div>
          <div class="mt-8 text-body-txt-color font-light min-w-400px max-w-400px">
            {{ name }},
            {{ $tSignUp('thankYou') }}
            <span class="font-normal">
              {{ email }}
            </span>
            {{ $tSignUp('verifyAccount') }}
          </div>
          <div class="text-center font-light mt-4 text-body-txt-color">
            {{ $tSignUp('didntReceive') }}
            <button
              class="text-primary-main font-normal disabled:text-disable-txt-color"
              :disabled="isEmailResent"
              @click="resendVerificationEmail"
            >
              {{ $tSignUp('resendEmail') }}
            </button>
          </div>
          <button
            class="mt-8 bg-primary-main text-center text-white font-semibold py-3 rounded w-96"
            :disabled="loading"
            @click="logIn"
          >
            {{ $tSignUp('logIn') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
