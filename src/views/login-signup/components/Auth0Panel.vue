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
const emit = defineEmits<{(e: 'accept-invitation-with-email'): void }>();

const mode = computed(() => (props.isSignup ? 'signup' : 'login'));

const buttonLabel = computed(() => (props.isSignup ? $t('signUpWith') : $t('logInWith')));

const showEmail = computed(() => (
  !props.isSignup || (props.isSignup && props.isInvitation)
));

const authenticate = async (connection: Auth0Database) => {
  const isEmail = connection === USERNAME_PASSWORD_CONNECTION;
  if (props.isInvitation && !isEmail) {
    const token = route.params.token;
    await api.invitations.accept(token as string);
  }
  if (props.isInvitation && isEmail) {
    emit('accept-invitation-with-email');
  } else {
    authenticateWithRedirect(connection, mode.value);
  }
};
</script>

<template>
  <div class="space-y-5">
    <GenericButton
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Google`"
      icon-name="auth-google"
      :icon-position="HorizontalPositionType.Left"
      full-width
      @click="() => authenticate(Auth0Database.Google)"
    />
    <GenericButton
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Github`"
      icon-name="auth-github"
      :icon-position="HorizontalPositionType.Left"
      full-width
      @click="() => authenticate(Auth0Database.GitHub)"
    />
    <GenericButton
      v-if="showEmail"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Email`"
      icon-name="mail"
      :icon-position="HorizontalPositionType.Left"
      full-width
      @click="() => authenticate(USERNAME_PASSWORD_CONNECTION)"
    />
  </div>
</template>
