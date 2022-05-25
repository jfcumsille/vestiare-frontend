<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { authenticateWithRedirect } from '@/services/auth0';
import { setSelectedLoginMethod } from '@/services/loginMethods';
import { Auth0Database, ButtonType, HorizontalPositionType } from '@/interfaces/utilities/enums';
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

const authenticateAndSetLoginMethod = (connection: Auth0Database) => {
  setSelectedLoginMethod(connection);
  authenticateWithRedirect(connection, mode.value);
};
</script>

<template>
  <div>
    <GenericButton
      class="mt-5"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Google`"
      icon-name="auth-google"
      :icon-position="HorizontalPositionType.Left"
      is-width-full
      @click="() => authenticateAndSetLoginMethod(Auth0Database.Google)"
    />
    <GenericButton
      class="mt-5"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Github`"
      icon-name="auth-github"
      :icon-position="HorizontalPositionType.Left"
      is-width-full
      @click="() => authenticateAndSetLoginMethod(Auth0Database.GitHub)"
    />
    <GenericButton
      v-if="!props.isSignup"
      class="mt-5"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Email`"
      icon-name="mail"
      :icon-position="HorizontalPositionType.Left"
      is-width-full
      @click="() => authenticateAndSetLoginMethod(USERNAME_PASSWORD_CONNECTION)"
    />
  </div>
</template>
