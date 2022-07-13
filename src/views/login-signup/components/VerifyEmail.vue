<script setup lang="ts">
import { useRouter } from 'vue-router';
import { toStoredRedirectionOrHome } from '@/services/redirections';
import { useTranslation } from '@/locales';
import { ButtonType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
import Circle from '@/assets/svg/CircleBackground.vue';

const props = defineProps<{
  email: string,
  name: string,
}>();

const router = useRouter();
const $tSignUp = useTranslation('views.signUp');
</script>

<template>
  <div class="relative">
    <Circle
      class="w-72 absolute top-0 left-0 -ml-28 -mt-8 z-0"
      fill="#F2F4FF"
      opacity="0.5"
    />
    <Circle
      class="w-40 absolute top-0 left-0 -ml-5 -mt-14 z-0"
      fill="#D7DDFF"
      opacity="0.5"
    />
    <Circle
      class="w-52 absolute bottom-0 right-0 -mr-16 -mb-16 z-0"
      fill="#F2F4FF"
      opacity="0.75"
    />
    <div
      class="flex flex-col bg-white px-20 py-16 relative
          rounded-lg border border-light-gray drop-shadow-md z-10 max-w-xl"
    >
      <div class="font-medium text-2xl text-heading-color">
        {{ $tSignUp('verifyEmail') }}
      </div>
      <div class="mt-4 text-body-color font-normal">
        {{ props.name }},
        {{ $tSignUp('thankYou') }}
        <span class="font-normal">
          {{ props.email }}
        </span>
        {{ $tSignUp('verifyAccount') }}
      </div>
      <GenericButton
        class="mt-8"
        :type="ButtonType.Primary"
        :text="$tSignUp('logIn')"
        @click="toStoredRedirectionOrHome(router)"
      />
    </div>
  </div>
</template>
