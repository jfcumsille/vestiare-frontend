<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { authenticateWithRedirect } from '@/services/auth0';
import { ButtonType, HorizontalPositionType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
import { USERNAME_PASSWORD_CONNECTION } from '@/constants/api';

const $t = useTranslation('auth0Panel');

const props = withDefaults(defineProps<{
  isSignup?: boolean,
}>(), {
  isSignup: false,
});

const mode = computed(() => (props.isSignup ? 'signup' : 'login'));

const buttonLabel = computed(() => (props.isSignup ? $t('signUpWith') : $t('logInWith')));
</script>

<template>
  <div>
    <GenericButton
      class="mt-5"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Google`"
      icon-name="auth_google"
      :icon-position="HorizontalPositionType.Left"
      is-width-full
      @click="() => authenticateWithRedirect('google-oauth2', mode)"
    />
    <GenericButton
      class="mt-5"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Github`"
      icon-name="auth_github"
      :icon-position="HorizontalPositionType.Left"
      is-width-full
      @click="() => authenticateWithRedirect('github', mode)"
    />
    <GenericButton
      v-if="!props.isSignup"
      class="mt-5"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Email`"
      icon-name="auth_google"
      :icon-position="HorizontalPositionType.Left"
      is-width-full
      @click="() => authenticateWithRedirect(USERNAME_PASSWORD_CONNECTION, mode)"
    />
  </div>
</template>
