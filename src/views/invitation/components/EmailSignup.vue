<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AxiosError } from 'axios';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import * as api from '@/api';
import { ButtonType, SizeType } from '@/interfaces/utilities/enums';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';
import { Nullable } from '@/interfaces/common';
import { GenericFormPublicAPI } from '@/interfaces/components/forms/GenericForm';
import { isValidPassword } from '@/utils/validations';
import { LOGIN_ROUTE } from '@/constants/router';
import VerifyEmail from '@/views/login-signup/components/VerifyEmail.vue';
import GenericForm from '@/components/forms/GenericForm.vue';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import Circle from '@/assets/svg/CircleBackground.vue';

const props = defineProps<{
  organizationUser: OrganizationUser
}>();

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const $t = useTranslation('views.invitations.emailSignup');
const $tSignUp = useTranslation('views.signUp');
const $tForms = useTranslation('forms.userData');

const email = computed(() => props.organizationUser.email);
const name = ref('');
const lastName = ref('');
const password = ref('');
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const form = ref<Nullable<GenericFormPublicAPI>>(null);
const nameValidations = [(value:string) => !!value.trim() || $tForms('hints.name') as string];
const lastNameValidations = [(value:string) => !!value.trim() || $tForms('hints.lastname') as string];

const showPasswordRules = computed(() => !isValidPassword(password.value) && password.value !== '');
const passwordValidations = [(value: string) => isValidPassword(value) || $tForms('hints.password') as string];

const loading = ref(false);
const signUpCompleted = ref(false);
const warningTitle = ref('');

watch([password, name, lastName], () => { warningTitle.value = ''; });
const handleSignUpError = (error: AxiosError) => {
  if (error.code === 'unauthorized') {
    warningTitle.value = $tSignUp('unauthorizedWarning');
  } else {
    warningTitle.value = $tSignUp('invalidSignupWarning');
  }
};

const signUp = async () => {
  if (form.value?.valid) {
    loading.value = true;
    try {
      await userStore.manualSignup({
        email: email.value,
        password: password.value,
        name: name.value,
        lastName: lastName.value,
      });
      signUpCompleted.value = true;
    } catch (err) {
      handleSignUpError(err as AxiosError);
    } finally {
      const token = route.params.token;
      await api.invitations.accept(token as string);
      loading.value = false;
    }
  }
};

const goToLogIn = async () => {
  const token = route.params.token;
  await api.invitations.accept(token as string);
  router.push(LOGIN_ROUTE);
};
</script>

<template>
  <div
    data-test="manual-signup-view"
    class="md:p-20 py-20 px-10 h-full w-full flex justify-center overflow-x-hidden"
  >
    <div
      v-if="signUpCompleted"
      class="md:p-20 py-20 px-10 relative justify-center flex"
    >
      <VerifyEmail
        :email="email"
        :name="name"
      />
    </div>
    <div
      v-else
      class="relative w-full max-w-sm min-w-min"
    >
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
      <div
        class="bg-white relative p-11.5 rounded-lg
        border border-light-gray drop-shadow-md z-10 space-y-8"
      >
        <div class="mb-5 font-medium text-2xl text-heading-color">
          {{ $t('title') }}
        </div>
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
        <GenericForm
          ref="form"
          class="grow flex flex-col justify-center space-y-8"
        >
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
          <GenericInput
            v-model="email"
            :size="SizeType.Large"
            :label="$tForms('labels.email')"
            :disabled="true"
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
              :hint="isValidPassword(password) ? $tForms('hints.validPassword') : undefined"
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
        </GenericForm>
        <GenericButton
          data-test="invite-sign-up-button"
          :type="ButtonType.Primary"
          :text="$tSignUp('signUp')"
          :loading="loading"
          full-width
          @click="signUp"
        />
        <div class="flex flex-row justify-center items-center">
          <p class="text-center text-body-color text-base font-normal mr-2">
            {{ $tSignUp('alreadyHaveAccount') }}
          </p>
          <GenericButton
            :type="ButtonType.Text"
            :size="SizeType.Inline"
            :text="$tSignUp('logIn')"
            @click="goToLogIn"
          />
        </div>
      </div>
    </div>
  </div>
</template>
