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
      class="mt-5 w-full"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Google`"
      image-name="auth_google"
      :image-position="HorizontalPositionType.Left"
      @click="authenticateWithRedirect('google-oauth2', mode)"
    />
    <GenericButton
      class="mt-5 w-full"
      :type="ButtonType.Outline"
      :text="`${buttonLabel} Github`"
      :size="SizeType.Regular"
      image-name="auth_github"
      :image-position="HorizontalPositionType.Left"
      @click="authenticateWithRedirect('github', mode)"
    />
  </div>
</template>
