<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import * as api from '@/api';
import { useTranslation } from '@/locales';
import { authenticateWithRedirect } from '@/services/auth0';
import { Auth0Database, ButtonType, HorizontalPositionType } from '@/interfaces/utilities/enums';

import GenericButton from '@/components/GenericButton.vue';
import { USERNAME_PASSWORD_CONNECTION } from '@/constants/api';

const route = useRoute();
const $t = useTranslation('auth0Panel');

const props = defineProps<{
  isSignup?: boolean,
  isInvitation?: boolean,
}>();

const mode = computed(() => (props.isSignup ? 'signup' : 'login'));

const buttonLabel = computed(() => (props.isSignup ? $t('signUpWith') : $t('logInWith')));

const authenticate = async (connection: Auth0Database) => {
  if (props.isInvitation) {
    const token = route.params.token;
    await api.invitations.accept(token as string);
  }
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
      full-width
      @click="() => authenticate(Auth0Database.Google)"
    />
    <GenericButton
      class="mt-5"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Github`"
      icon-name="auth-github"
      :icon-position="HorizontalPositionType.Left"
      full-width
      @click="() => authenticate(Auth0Database.GitHub)"
    />
    <GenericButton
      v-if="!props.isSignup"
      class="mt-5"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Email`"
      icon-name="mail"
      :icon-position="HorizontalPositionType.Left"
      full-width
      @click="() => authenticate(USERNAME_PASSWORD_CONNECTION)"
    />
  </div>
</template>
