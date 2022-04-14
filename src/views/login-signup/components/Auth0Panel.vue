<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { authenticateWithRedirect } from '@/services/auth0';
import { ButtonType, SizeType, HorizontalPositionType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';

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
      :is-width-full="true"
      :text="`${buttonLabel} Google`"
      icon-name="auth_google"
      :icon-position="HorizontalPositionType.Left"
      @click="() => authenticateWithRedirect('google-oauth2', mode)"
    />
    <GenericButton
      class="mt-5"
      :type="ButtonType.Outline"
      :is-width-full="true"
      :text="`${buttonLabel} Github`"
      :size="SizeType.Medium"
      icon-name="auth_github"
      :icon-position="HorizontalPositionType.Left"
      @click="() => authenticateWithRedirect('github', mode)"
    />
  </div>
</template>
