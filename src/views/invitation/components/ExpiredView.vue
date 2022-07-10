<script setup lang="ts">
import { SIGNUP_ROUTE } from '@/constants/router';
import { useTranslation } from '@/locales';
import { ButtonType, SizeType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
import Circle from '@/assets/svg/CircleBackground.vue';

const $t = useTranslation('views.invitations.expired');

</script>
<template>
  <div
    data-test="expired-view"
    class="md:p-20 py-20 px-10 relative justify-center flex"
  >
    <div class="relative">
      <div
        class="flex flex-col p-12 relative max-w-xl space-y-8 z-10 bg-white
        rounded-lg border border-light-gray drop-shadow-md content-center"
      >
        <p class="font-semibold text-2xl text-heading-color text-center">
          {{ $t('title') }}
        </p>
        <GenericButton
          data-test="resend-invitation-button"
          :type="ButtonType.Primary"
          :size="SizeType.Large"
          :text="$t('button')"
        />
        <p class="text-center text-body-color text-sm font-normal ">
          {{ $t('footer') }}
          <a
            :href="SIGNUP_ROUTE"
            class="text-primary-main hover:text-primary-hover"
          >
            {{ $t('signUp') }}
          </a>
        </p>
      </div>
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
    </div>
  </div>
</template>
