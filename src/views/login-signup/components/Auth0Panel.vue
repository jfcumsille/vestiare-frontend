<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { authenticateWithPopup } from '@/services/auth0';
import { ButtonType, HorizontalPositionType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
import { USERNAME_PASSWORD_CONNECTION } from '@/constants/api';

const $t = useTranslation('auth0Panel');

const props = withDefaults(defineProps<{
  isSignup?: boolean,
}>(), {
  isSignup: false,
});

const buttonLabel = computed(() => (props.isSignup ? $t('signUpWith') : $t('logInWith')));
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
      @click="() => authenticateWithPopup('google-oauth2')"
    />
    <GenericButton
      class="mt-5"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Github`"
      icon-name="auth-github"
      :icon-position="HorizontalPositionType.Left"
      is-width-full
      @click="() => authenticateWithPopup('github')"
    />
    <GenericButton
      v-if="!props.isSignup"
      class="mt-5"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Email`"
      icon-name="mail"
      :icon-position="HorizontalPositionType.Left"
      is-width-full
      @click="() => authenticateWithPopup(USERNAME_PASSWORD_CONNECTION)"
    />
  </div>
</template>
