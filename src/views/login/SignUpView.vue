<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { REDIRECT_QUERY_KEY } from '@/constants';
import GenericInput from '@/components/GenericInput.vue';
import Spinner from '@/components/LoadingSpinner.vue';
import Auth0Panel from './components/Auth0Panel.vue';
import DropDown from './components/DropDown.vue';
import BulletPoint from './components/BulletPoint.vue';
import Circle from './components/Circle.vue';
import Dots from './components/Dots.vue';

const $store = useUserStore();
const $route = useRoute();
const $router = useRouter();
const $t = useTranslation('forms.userData');

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
const isSignUpEnabled = computed(() => (isChecked.value && name.value !== '' && lastName.value !== '' && email.value !== '' && password.value !== ''));
const isEmailResent = ref(false);

const signUp = async () => {
  loading.value = true;
  try {
    const formData = {
      email: email.value,
      password: password.value,
      token: '',
      name: name.value,
      lastName: lastName.value,
      country: country.value,
      company: company.value,
    };
    await $store.signUp(formData);
    completed.value = true;
  } catch (err) {
    error.value = true;
    completed.value = false;
  } finally {
    loading.value = false;
  }
};

const resendVerificationEmail = async () => {
  try {
    const formData = {
      email: email.value,
    };
    await $store.sendConfirmationEmail(formData);
    isEmailResent.value = true;
  } catch (err) {
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
    <Spinner
      v-if="loading"
    />
    <div
      v-if="!completed"
      class="relative flex flex-row justify-center p-20"
    >
      <div class="relative">
        <Circle class="absolute top-0 left-0 -ml-28 -mt-12 z-0" />
        <Dots class="absolute bottom-0 right-0 -mr-16 -mb-12 z-0" />
        <div class="bg-white relative p-10 rounded-md border border-[#EEEEF2] drop-shadow-md z-10">
          <div class="mb-5 font-medium text-2xl text-[#060235]">
            Build with Fintoc
          </div>

          <Auth0Panel
            :signs-up="true"
          />

          <div class="my-7 h-px bg-[#E2E1E9]" />

          <div class="grow w-full flex flex-col justify-center">
            <div class="flex flex-row mb-4 ">
              <GenericInput
                v-model="name"
                :label="$t('labels.name')"
                :placeholder="$t('placeholders.name')"
                class="mr-3 w-full"
              />
              <GenericInput
                v-model="lastName"
                :label="$t('labels.lastName')"
                :placeholder="$t('placeholders.lastName')"
                class="w-full"
              />
            </div>
            <div class="flex flex-row items-end mb-4 ">
              <GenericInput
                v-model="company"
                :label="$t('labels.company')"
                :placeholder="$t('placeholders.company')"
                class="mr-3 w-full"
              />

              <div class="block w-full">
                <div class="block mb-1 text-sm font-medium text-[#656289]">
                  Country
                </div>
                <DropDown
                  name="Country"
                  :selected="country"
                  :options="countryOptions"
                  @select="selectCountryFilter"
                />
              </div>
            </div>
            <GenericInput
              v-model="email"
              :label="$t('labels.email')"
              :placeholder="$t('placeholders.email')"
              class="mb-2"
            />
            <GenericInput
              v-model="password"
              type="password"
              :label="$t('labels.password')"
              :placeholder="$t('placeholders.password')"
            />

            <div class="block">
              <div class="mt-4">
                <label class="inline-flex items-center hover:bg-clear">
                  <input
                    v-model="isChecked"
                    type="checkbox"
                    class="w-4 h-4 accent-[#3753FF] hover:accent-[#3753FF]"
                  />
                  <label
                    class="ml-2 form-check-label inline-block text-[#4A4672] text-sm font-normal"
                    for="flexCheckDefault"
                  >
                    I accept the
                    <a
                      class="text-[#3753FF]"
                      href="https://fintoc.com/legal/terminos-y-condiciones-para-desarrolladores#terminos-y-condiciones"
                    >
                      Terms & Conditions</a>
                    and
                    <a
                      class="text-[#3753FF]"
                      href="https://fintoc.com/legal/politicas-de-privacidad-para-usuarios-finales"
                    >
                      Privacy Policy</a>
                  </label>
                </label>
              </div>
            </div>

            <div>
              <button
                class="
                  mt-4 items-center w-full px-6 py-2 text-sm font-medium text-center
                  rounded text-white bg-[#3753FF] hover:bg-[#384AC8]
                  disabled:cursor-default h-12
                  disabled:bg-gray-300
                "
                :disabled="!isSignUpEnabled"
                @click="signUp"
              >
                {{ $t('signUp') }}
              </button>
              <span
                v-if="error"
                class="ml-4 font-black text-xl text-red-600"
              >
                !
              </span>
            </div>

            <div
              class="mt-6 text-center text-[#4A4672] text-sm font-normal"
            >
              Already have an account?
              <a
                href="/login"
                class="text-[#3753FF] font-medium"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="relative">
        <Dots class="absolute top-0 right-0 -mr-10 -mt-6 z-0" />
        <Circle class="h-32 w-32 absolute top-0 left-0 ml-5 mt-48 z-0" />
        <div class="ml-20 flex flex-col max-w-200 min-w-200 z-10">
          <div class="text-lg text-[#060235]">
            Start building with a free account:
          </div>
          <div class="z-10">
            <div class="mt-4 flex flex-row justify-start">
              <BulletPoint class="bulletpoint" />
              <div class="ml-3 text-base text-[#4A4672] font-light">
                Immediately begin integrating Fintoc with our
                quickstarts for any stack you are building with
              </div>
            </div>
            <div class="mt-3 flex flex-row justify-start">
              <BulletPoint class="bulletpoint" />
              <div class="ml-3 text-base text-[#4A4672] font-light">
                Connect an unlimited amount of test credentials for Bank or Fiscal Links
              </div>
            </div>
            <div class="mt-3 flex flex-row justify-start">
              <BulletPoint class="bulletpoint" />
              <div class="ml-3 text-base text-[#4A4672] font-light">
                Connect an unlimited amount of live credentials for
                financial or fiscal institutions during the 2 weeks free trial period
              </div>
            </div>
          </div>
          <a
            class="mt-4 text-[#3753FF] font-medium z-10"
            href="https://fintoc.com/contact"
          >
            Contact Sales
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
          rounded-md border border-[#EEEEF2] drop-shadow-md z-10"
        >
          <div class="font-medium text-3xl text-[#060235]">
            Verify your email
          </div>
          <div class="mt-8 text-[#4A4672] font-light max-w-200">
            {{ name }},
            thank you for joining Fintoc! Please check your email and visit the link sent to
            <span class="font-normal">
              {{ email }}
            </span>
            to verify your account.
          </div>
          <div class="text-center font-light mt-4 text-[#4A4672]">
            Didn't receive an email?
            <button
              class="text-[#3753FF] font-normal disabled:text-[#B6B5C2]"
              :disabled="isEmailResent"
              @click="resendVerificationEmail"
            >
              {{ $t('resendEmail') }}
            </button>
          </div>
          <button
            class="mt-8 bg-[#3753FF] text-center text-white font-semibold py-3 rounded w-96"
            :disabled="loading"
            @click="logIn"
          >
            {{ $t('logIn') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bulletpoint {
  width: 10px;
  height: 10px;
  max-width: 10px;
  min-width: 10px;
  margin: 6px 0px 0px 0px;
}

.max-w-200{
  max-width: 400px;
}

.min-w-200{
  min-width: 400px;
}
</style>
